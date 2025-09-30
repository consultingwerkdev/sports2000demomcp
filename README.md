# SmartFramework MCP

MCP Server for SmartComponent Library/SmartFramework development tasks.

## Notes

https://learn.microsoft.com/en-us/dotnet/ai/quickstarts/build-mcp-server

```
dotnet new install Microsoft.Extensions.AI.Templates
```

```
dotnet new mcpserver -n smartframeworkmcpserver
```

```
dotnet run --project smartframeworkmcpserver
```

## Sample MCP Server configuration

### Precompiled

```json
{
    "mcpServers": {
        "smartframeworkmcp": {
            "command": "C:\\Work_STREAM\\SmartComponentLibrary\\smartframeworkmcp\\smartframeworkmcpserver\\bin\\Debug\\net8.0\\smartframeworkmcpserver.exe",
            "args": [
                "--pasoeUrl",
                "https://sfrbo.consultingwerkcloud.com:8821/apsv"
            ],
            "disabledTools": [],
            "disabled": false
        }
    },
}
```

### Compiled on the fly

```json
{
    "mcpServers": {
        "smartframeworkmcp": {
            "command": "dotnet",
            "args": [
                "run",
                "--project",
                "smartframeworkmcpserver",
                "--pasoeUrl",
                "https://sfrbo.consultingwerkcloud.com:8821/apsv"
            ],
            "disabledTools": [],
            "disabled": false
        }
    },
}
```
