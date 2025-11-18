using sports2000mcpserver;

var builder = WebApplication.CreateBuilder(args);

var pasoeUrl = builder.Configuration["pasoeUrl"] ?? "http://localhost:8810/apsv";

Console.WriteLine(Environment.Version);
Console.WriteLine (string.Format("Using PASOE URL (--pasoeUrl): {0}", pasoeUrl));

Configuration.ConnectionString = pasoeUrl;
string? authKey = Environment.GetEnvironmentVariable("SMARTFRAMEWORKMCP_AUTH_KEY");

if (authKey != null)
{
    Configuration.AuthKey = authKey;
}

builder.Services.AddMcpServer()
    .WithTools<Sports2000CustomerTools>()
    .WithHttpTransport();

var app = builder.Build();

// Add MCP middleware
app.MapMcp();

app.Run();
