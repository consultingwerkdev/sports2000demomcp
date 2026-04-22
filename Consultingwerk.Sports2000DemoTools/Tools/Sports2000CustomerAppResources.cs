using ModelContextProtocol.Protocol;
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Text.Json.Nodes;

[McpServerResourceType]
public sealed class Sports2000CustomerAppResources
{
    public const string ShowCustomerResourceUri = "ui://sports2000/customer/show-customer.html";
    public const string ShowCustomerResourceName = "Sports2000 Show Customer";
    public const string ShowCustomerResourceMimeType = "text/html;profile=mcp-app";

    public const string LocalHttpOrigin = "http://localhost:5118";
    public const string LocalHttpsOrigin = "https://localhost:7269";
    private const string AngularAssetBasePath = LocalHttpOrigin + "/ui-resources/sports2000-customer/";
    private const string Sports2000BackendOrigin = "https://sfrbo.consultingwerkcloud.com:8821";

    [McpServerResource(
        UriTemplate = ShowCustomerResourceUri,
        Name = ShowCustomerResourceName,
        Title = "Sports2000 Show Customer",
        MimeType = ShowCustomerResourceMimeType)]
    [Description("Returns the Angular bootstrap page used by the show-customer MCP App proof of concept.")]
    public static TextResourceContents GetShowCustomerPage()
    {
        return new TextResourceContents
        {
            Uri = ShowCustomerResourceUri,
            MimeType = ShowCustomerResourceMimeType,
            Meta = CreateUiMeta(),
            Text = $$"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sports2000 Customer Shell</title>
    <meta name="color-scheme" content="dark light">
    <link rel="stylesheet" href="{{AngularAssetBasePath}}styles.css">
    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background: #081426;
        }

        body {
            color: #eff6ff;
            font-family: "Segoe UI", sans-serif;
        }

        app-root {
            display: block;
            min-height: 100vh;
        }
    </style>
</head>
<body>
    <app-root>
        <section style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;">
            <div style="max-width:640px;padding:32px;border:1px solid rgba(191,219,254,0.25);border-radius:24px;background:rgba(8,20,38,0.78);box-shadow:0 24px 60px rgba(15,23,42,0.45);">
                <p style="margin:0 0 12px;color:#93c5fd;letter-spacing:0.12em;font-size:12px;font-weight:700;text-transform:uppercase;">Sports2000 MCP Shell</p>
                <h1 style="margin:0 0 12px;font-size:32px;line-height:1.1;">Loading Angular customer shell</h1>
                <p style="margin:0;color:#dbeafe;line-height:1.6;">
                    The MCP resource loaded successfully. If this message stays on screen, the Angular build assets are missing from
                    <code>{{AngularAssetBasePath}}</code>.
                </p>
            </div>
        </section>
    </app-root>
    <script type="module" src="{{AngularAssetBasePath}}polyfills.js"></script>
    <script src="{{AngularAssetBasePath}}scripts.js" defer></script>
    <script type="module" src="{{AngularAssetBasePath}}main.js"></script>
</body>
</html>
"""
        };
    }

    public static JsonObject CreateUiMeta()
    {
        var resourceDomains = new JsonArray();
        resourceDomains.Add(LocalHttpOrigin);
        resourceDomains.Add(LocalHttpsOrigin);

        var connectDomains = new JsonArray();
        connectDomains.Add(LocalHttpOrigin);
        connectDomains.Add(LocalHttpsOrigin);
        connectDomains.Add(Sports2000BackendOrigin);

        return new JsonObject
        {
            ["ui"] = new JsonObject
            {
                ["prefersBorder"] = true,
                ["csp"] = new JsonObject
                {
                    ["resourceDomains"] = resourceDomains,
                    ["connectDomains"] = connectDomains
                }
            }
        };
    }
}
