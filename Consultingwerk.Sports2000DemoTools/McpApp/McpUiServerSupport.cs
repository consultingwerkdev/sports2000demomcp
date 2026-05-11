using ModelContextProtocol.Protocol;
using ModelContextProtocol.Server;
using System.Dynamic;
using System.Text.Json;

public static class McpUiServerSupport
{
    public static void EnableUiCapability(McpServerOptions serverOptions)
    {
#pragma warning disable MCPEXP001
        serverOptions.Capabilities ??= new ServerCapabilities();
        serverOptions.Capabilities.Extensions ??= new ExpandoObject();
        serverOptions.Capabilities.Extensions["io.modelcontextprotocol/ui"] = JsonDocument.Parse("{}").RootElement.Clone();
#pragma warning restore MCPEXP001
    }
}
