using Consultingwerk.SmartMcpAuthentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using sports2000mcpserver;
using System.IO;

var builder = Host.CreateApplicationBuilder(args);
builder.Configuration.AddJsonFile(
    Path.Combine(AppContext.BaseDirectory, "appsettings.json"),
    optional: true,
    reloadOnChange: false);
builder.Configuration.AddJsonFile(
    Path.Combine(GetProjectDirectory(), "appsettings.json"),
    optional: true,
    reloadOnChange: false);
builder.Configuration.AddEnvironmentVariables();
builder.Configuration.AddCommandLine(args);

var pasoeUrl = builder.Configuration["pasoeUrl"] ?? "http://localhost:8810/apsv";

Configuration.ConnectionString = pasoeUrl;
string? authKey = builder.Configuration["authKey"];
                                                      
if (authKey != null)
{
    Configuration.AuthKey = authKey;
}

// Write logs to a file next to the running server binary so stdout stays reserved for MCP messages.
var logFilePath = Path.Combine(AppContext.BaseDirectory, "sports2000mcpserver.log");
builder.Logging.ClearProviders();
builder.Logging.SetMinimumLevel(LogLevel.Trace);
builder.Logging.AddProvider(new FileLoggerProvider(logFilePath));

builder.Services.AddSmartMcpLocalAuthentication(builder.Configuration);
builder.Services.AddHostedService<Sports2000CustomerAppAssetServer>();

// Add the MCP services: the transport to use (stdio) and the tools to register.
builder.Services
    .AddMcpServer(McpUiServerSupport.EnableUiCapability)
    .WithStdioServerTransport()
    .WithTools<SmartMcpAuthTools>()
    .WithTools<Sports2000CustomerTools>()
    .WithTools(Sports2000CustomerAppRegistrations.CreateTools(builder.Services.BuildServiceProvider()))
    .WithResources(Sports2000CustomerAppRegistrations.CreateResources());

await builder.Build().RunAsync();

static string GetProjectDirectory()
{
    var directory = new DirectoryInfo(AppContext.BaseDirectory);

    while (directory is not null)
    {
        if (File.Exists(Path.Combine(directory.FullName, "sports2000mcpserver.csproj")))
        {
            return directory.FullName;
        }

        directory = directory.Parent;
    }

    return AppContext.BaseDirectory;
}

internal sealed class FileLoggerProvider(string logFilePath) : ILoggerProvider
{
    private readonly StreamWriter _writer = CreateWriter(logFilePath);
    private readonly object _syncRoot = new();

    public ILogger CreateLogger(string categoryName) => new FileLogger(categoryName, _writer, _syncRoot);

    public void Dispose()
    {
        _writer.Dispose();
    }

    private static StreamWriter CreateWriter(string logFilePath)
    {
        var directory = Path.GetDirectoryName(logFilePath);
        if (!string.IsNullOrWhiteSpace(directory))
        {
            Directory.CreateDirectory(directory);
        }

        return new StreamWriter(new FileStream(logFilePath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
        {
            AutoFlush = true
        };
    }
}

internal sealed class FileLogger(string categoryName, StreamWriter writer, object syncRoot) : ILogger
{
    public IDisposable BeginScope<TState>(TState state) where TState : notnull => NullScope.Instance;

    public bool IsEnabled(LogLevel logLevel) => logLevel != LogLevel.None;

    public void Log<TState>(
        LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception? exception,
        Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        var message = formatter(state, exception);
        var logLine = $"{DateTimeOffset.Now:O} [{logLevel}] {categoryName} ({eventId.Id}): {message}";

        lock (syncRoot)
        {
            writer.WriteLine(logLine);
            if (exception is not null)
            {
                writer.WriteLine(exception);
            }
        }
    }
}

internal sealed class NullScope : IDisposable
{
    public static NullScope Instance { get; } = new();

    public void Dispose()
    {
    }
}
