using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Net;

public sealed class Sports2000CustomerAppAssetServer(
    ILogger<Sports2000CustomerAppAssetServer>? logger = null) : BackgroundService
{
    private const string UrlPrefix = "http://localhost:5118/";
    private const string UiResourcePathPrefix = "/ui-resources/sports2000-customer/";

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var assetDirectory = Sports2000CustomerAppResources.ResolveAngularAssetDirectory();
        if (string.IsNullOrWhiteSpace(assetDirectory) || !Directory.Exists(assetDirectory))
        {
            logger?.LogWarning("Sports2000 UI asset server not started because the Angular asset directory was not found.");
            return;
        }

        using var listener = new HttpListener();
        listener.Prefixes.Add(UrlPrefix);

        try
        {
            listener.Start();
        }
        catch (HttpListenerException ex)
        {
            logger?.LogInformation(ex, "Sports2000 UI asset server not started. Another process may already be serving {UrlPrefix}.", UrlPrefix);
            return;
        }
        catch (InvalidOperationException ex)
        {
            logger?.LogInformation(ex, "Sports2000 UI asset server not started for {UrlPrefix}.", UrlPrefix);
            return;
        }

        logger?.LogInformation("Sports2000 UI asset server listening on {UrlPrefix} from {AssetDirectory}.", UrlPrefix, assetDirectory);

        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var context = await listener.GetContextAsync().WaitAsync(stoppingToken).ConfigureAwait(false);
                _ = Task.Run(() => ServeAsync(context, assetDirectory, stoppingToken), stoppingToken);
            }
        }
        catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
        {
        }
        finally
        {
            listener.Stop();
        }
    }

    private static async Task ServeAsync(HttpListenerContext context, string assetDirectory, CancellationToken cancellationToken)
    {
        AddCorsHeaders(context.Response);

        if (string.Equals(context.Request.HttpMethod, "OPTIONS", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = StatusCodes.Status204NoContent;
            context.Response.Close();
            return;
        }

        if (!string.Equals(context.Request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(context.Request.HttpMethod, "HEAD", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = StatusCodes.Status405MethodNotAllowed;
            context.Response.Close();
            return;
        }

        var requestPath = context.Request.Url?.AbsolutePath ?? string.Empty;
        if (!requestPath.StartsWith(UiResourcePathPrefix, StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            context.Response.Close();
            return;
        }

        var relativePath = Uri.UnescapeDataString(requestPath[UiResourcePathPrefix.Length..])
            .Replace('/', Path.DirectorySeparatorChar);
        var filePath = Path.GetFullPath(Path.Combine(assetDirectory, relativePath));
        var assetRoot = Path.GetFullPath(assetDirectory);

        if (!filePath.StartsWith(assetRoot, StringComparison.OrdinalIgnoreCase) || !File.Exists(filePath))
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            context.Response.Close();
            return;
        }

        context.Response.ContentType = GetContentType(filePath);
        context.Response.Headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
        context.Response.Headers["Pragma"] = "no-cache";
        context.Response.Headers["Expires"] = "0";

        var fileInfo = new FileInfo(filePath);
        context.Response.ContentLength64 = fileInfo.Length;

        if (string.Equals(context.Request.HttpMethod, "HEAD", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.Close();
            return;
        }

        await using var fileStream = File.OpenRead(filePath);
        await fileStream.CopyToAsync(context.Response.OutputStream, cancellationToken).ConfigureAwait(false);
        context.Response.Close();
    }

    private static void AddCorsHeaders(HttpListenerResponse response)
    {
        response.Headers["Access-Control-Allow-Origin"] = "*";
        response.Headers["Access-Control-Allow-Methods"] = "GET, HEAD, OPTIONS";
        response.Headers["Access-Control-Allow-Headers"] = "*";
        response.Headers["Cross-Origin-Resource-Policy"] = "cross-origin";
    }

    private static string GetContentType(string filePath)
    {
        return Path.GetExtension(filePath).ToLowerInvariant() switch
        {
            ".css" => "text/css; charset=utf-8",
            ".html" => "text/html; charset=utf-8",
            ".js" => "text/javascript; charset=utf-8",
            ".json" => "application/json; charset=utf-8",
            ".map" => "application/json; charset=utf-8",
            ".png" => "image/png",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".svg" => "image/svg+xml",
            ".woff" => "font/woff",
            ".woff2" => "font/woff2",
            _ => "application/octet-stream"
        };
    }
}
