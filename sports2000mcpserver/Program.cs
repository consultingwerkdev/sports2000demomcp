using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Protocol;
using ModelContextProtocol.Server;
using sports2000mcpserver;
using System.Collections;
using System.IO;
using System.Text.Json;

var builder = Host.CreateApplicationBuilder(args);

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

// Add the MCP services: the transport to use (stdio) and the tools to register.
builder.Services
    .AddMcpServer(EnableUiExtensionCapability)
    .WithStdioServerTransport()
    .WithTools<Sports2000CustomerTools>()
    .WithTools(Sports2000CustomerAppRegistrations.CreateTools())
    .WithResources(Sports2000CustomerAppRegistrations.CreateResources());

await builder.Build().RunAsync();

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

static void EnableUiExtensionCapability(McpServerOptions serverOptions)
{
#pragma warning disable MCPEXP001
    serverOptions.Capabilities ??= new ServerCapabilities();
    serverOptions.Capabilities.Extensions ??= new StringObjectMap();
    serverOptions.Capabilities.Extensions["io.modelcontextprotocol/ui"] = JsonDocument.Parse("{}").RootElement.Clone();
#pragma warning restore MCPEXP001
}

internal sealed class StringObjectMap : IDictionary<string, object>
{
    private readonly Dictionary<string, object> _inner = new(StringComparer.Ordinal);

    public object this[string key]
    {
        get => _inner[key];
        set => _inner[key] = value;
    }

    public ICollection<string> Keys => _inner.Keys;

    public ICollection<object> Values => _inner.Values;

    public int Count => _inner.Count;

    public bool IsReadOnly => false;

    public void Add(string key, object value) => _inner.Add(key, value);

    public void Add(KeyValuePair<string, object> item) => ((IDictionary<string, object>)_inner).Add(item);

    public void Clear() => _inner.Clear();

    public bool Contains(KeyValuePair<string, object> item) => ((IDictionary<string, object>)_inner).Contains(item);

    public bool ContainsKey(string key) => _inner.ContainsKey(key);

    public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex) => ((IDictionary<string, object>)_inner).CopyTo(array, arrayIndex);

    public IEnumerator<KeyValuePair<string, object>> GetEnumerator() => _inner.GetEnumerator();

    public bool Remove(string key) => _inner.Remove(key);

    public bool Remove(KeyValuePair<string, object> item) => ((IDictionary<string, object>)_inner).Remove(item);

    public bool TryGetValue(string key, out object value) => _inner.TryGetValue(key, out value!);

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
