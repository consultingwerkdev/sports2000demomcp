using Consultingwerk.SmartMcpAuthentication;
using ModelContextProtocol.Server;
using Microsoft.AspNetCore.StaticFiles;
using sports2000mcpserver;
using System.IO;
using System.Text;
using System.Threading;

var builder = WebApplication.CreateBuilder(args);

var pasoeUrl = Environment.GetEnvironmentVariable("SMARTFRAMEWORKMCP_PASOE_URL") ?? "https://sfrbo.consultingwerkcloud.com:8821/apsv";

Console.WriteLine(Environment.Version);
Console.WriteLine (string.Format("Using PASOE URL (--pasoeUrl): {0}", pasoeUrl));

Configuration.ConnectionString = pasoeUrl;
string? authKey = Environment.GetEnvironmentVariable("SMARTFRAMEWORKMCP_AUTH_KEY");

if (authKey != null)
{
    Configuration.AuthKey = authKey;
}

// Configure OAuth2 authentication if enabled
builder.Services.AddSmartMcpOAuth2Authentication(builder.Configuration);

builder.Services.AddMcpServer(McpUiServerSupport.EnableUiCapability)
    .WithTools<Sports2000CustomerTools>()
    .WithTools(Sports2000CustomerAppRegistrations.CreateTools())
    .WithResources(Sports2000CustomerAppRegistrations.CreateResources())
    .WithHttpTransport(options =>
    {
        options.ConfigureSessionOptions = static (_, serverOptions, _) =>
        {
            McpUiServerSupport.EnableUiCapability(serverOptions);
            return Task.CompletedTask;
        };
    });

var app = builder.Build();

var webLogPath = Path.Combine(AppContext.BaseDirectory, "sports2000mcpserverweb.http.log");
var webLogLock = new SemaphoreSlim(1, 1);
var staticFileContentTypeProvider = new FileExtensionContentTypeProvider();

app.Use(async (context, next) =>
{
    if (HttpMethods.IsPost(context.Request.Method) &&
        string.Equals(context.Request.Path.Value, "/", StringComparison.Ordinal))
    {
        context.Request.EnableBuffering();

        using var requestReader = new StreamReader(
            context.Request.Body,
            Encoding.UTF8,
            detectEncodingFromByteOrderMarks: false,
            bufferSize: 4096,
            leaveOpen: true);

        var requestBody = await requestReader.ReadToEndAsync();
        context.Request.Body.Position = 0;

        await AppendWebLogAsync(
            webLogLock,
            webLogPath,
            $"[{DateTimeOffset.Now:O}] REQUEST {context.Request.Method} {context.Request.Path} Session={context.Request.Headers["Mcp-Session-Id"]}{Environment.NewLine}{requestBody}{Environment.NewLine}");

        var originalResponseBody = context.Response.Body;
        await using var responseBuffer = new MemoryStream();
        context.Response.Body = responseBuffer;

        try
        {
            await next();

            responseBuffer.Position = 0;
            using var responseReader = new StreamReader(responseBuffer, Encoding.UTF8, detectEncodingFromByteOrderMarks: false, leaveOpen: true);
            var responseBody = await responseReader.ReadToEndAsync();

            await AppendWebLogAsync(
                webLogLock,
                webLogPath,
                $"[{DateTimeOffset.Now:O}] RESPONSE {context.Response.StatusCode} {context.Request.Path} Session={context.Response.Headers["Mcp-Session-Id"]}{Environment.NewLine}{responseBody}{Environment.NewLine}");

            responseBuffer.Position = 0;
            await responseBuffer.CopyToAsync(originalResponseBody);
        }
        catch (Exception ex)
        {
            await AppendWebLogAsync(
                webLogLock,
                webLogPath,
                $"[{DateTimeOffset.Now:O}] EXCEPTION {context.Request.Method} {context.Request.Path} Session={context.Request.Headers["Mcp-Session-Id"]}{Environment.NewLine}{ex}{Environment.NewLine}");

            throw;
        }
        finally
        {
            context.Response.Body = originalResponseBody;
        }

        return;
    }

    await next();
});

// Enable routing (required for endpoint mapping)
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = staticFileContentTypeProvider,
    OnPrepareResponse = context =>
    {
        if (!context.Context.Request.Path.StartsWithSegments("/ui-resources", StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        context.Context.Response.Headers["Access-Control-Allow-Origin"] = "*";
        context.Context.Response.Headers["Access-Control-Allow-Methods"] = "GET, HEAD, OPTIONS";
        context.Context.Response.Headers["Access-Control-Allow-Headers"] = "*";
        context.Context.Response.Headers["Cross-Origin-Resource-Policy"] = "cross-origin";
    }
});
app.UseRouting();

// Use OAuth2 authentication middleware (must be before MapMcp)
app.UseSmartMcpOAuth2Authentication();

// Add MCP middleware
// Note: When authentication is enabled, most MCP requests require authentication
// (except 'initialize' and .well-known endpoints for OAuth2 discovery)
app.MapMcp();

// Map OAuth2 discovery endpoints (these are publicly accessible)
app.MapSmartMcpOAuth2Metadata();

app.Run();

static async Task AppendWebLogAsync(SemaphoreSlim logLock, string path, string entry)
{
    var lockAcquired = false;

    try
    {
        await logLock.WaitAsync();
        lockAcquired = true;

        var directory = Path.GetDirectoryName(path);
        if (!string.IsNullOrWhiteSpace(directory))
        {
            Directory.CreateDirectory(directory);
        }

        await using var stream = new FileStream(
            path,
            FileMode.Append,
            FileAccess.Write,
            FileShare.ReadWrite | FileShare.Delete,
            bufferSize: 4096,
            useAsync: true);

        await using var writer = new StreamWriter(stream, Encoding.UTF8);
        await writer.WriteLineAsync(entry);
        await writer.WriteLineAsync();
        await writer.FlushAsync();
    }
    catch (IOException ioException)
    {
        Console.WriteLine($"HTTP log write skipped: {ioException.Message}");
    }
    catch (UnauthorizedAccessException unauthorizedAccessException)
    {
        Console.WriteLine($"HTTP log write skipped: {unauthorizedAccessException.Message}");
    }
    finally
    {
        if (lockAcquired)
        {
            logLock.Release();
        }
    }
}
