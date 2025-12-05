using Consultingwerk.SmartMcpAuthentication;
using sports2000mcpserver;

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

builder.Services.AddMcpServer()
    .WithTools<Sports2000CustomerTools>()
    .WithHttpTransport();

var app = builder.Build();

// Enable routing (required for endpoint mapping)
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
