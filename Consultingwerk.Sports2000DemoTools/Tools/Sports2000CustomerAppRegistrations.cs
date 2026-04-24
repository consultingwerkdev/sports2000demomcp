using Consultingwerk.SmartMcpAuthentication;
using ModelContextProtocol.Protocol;
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Text.Json.Nodes;

public static class Sports2000CustomerAppRegistrations
{
    private const string ShowCustomerDescription = "Opens the Sports2000 Angular customer shell and loads one customer by customer number.";
    private const string RefreshUiAuthTokenDescription = "Refreshes the bearer token used internally by the Sports2000 MCP app iframe.";
    private const string ShowCustomerResourceDescription = "Returns the Angular bootstrap page used by the Sports2000 show-customer MCP App.";

    public static IEnumerable<McpServerTool> CreateTools(IServiceProvider services)
    {
        yield return McpServerTool.Create(
            (Func<int, ISmartMcpAccessTokenProvider?, CallToolResult>)ShowCustomer,
            new McpServerToolCreateOptions
            {
                Name = "show-customer",
                Title = "Show Customer",
                Description = ShowCustomerDescription,
                Meta = CreateToolMeta(Sports2000CustomerAppResources.ShowCustomerResourceUri),
                Services = services
            });

        yield return McpServerTool.Create(
            (Func<ISmartMcpAccessTokenProvider?, CallToolResult>)RefreshUiAuthToken,
            new McpServerToolCreateOptions
            {
                Name = "refresh-ui-auth-token",
                Title = "Refresh UI Auth Token",
                Description = RefreshUiAuthTokenDescription,
                Meta = CreateToolMeta(visibility: new[] { "app" }),
                Services = services
            });
    }

    public static IEnumerable<McpServerResource> CreateResources()
    {
        yield return McpServerResource.Create(
            (Func<ReadResourceResult>)GetShowCustomerPage,
            new McpServerResourceCreateOptions
            {
                Name = Sports2000CustomerAppResources.ShowCustomerResourceName,
                Title = "Sports2000 Show Customer",
                Description = ShowCustomerResourceDescription,
                MimeType = Sports2000CustomerAppResources.ShowCustomerResourceMimeType,
                UriTemplate = Sports2000CustomerAppResources.ShowCustomerResourceUri,
                Meta = Sports2000CustomerAppResources.CreateUiMeta()
            });
    }

    public static CallToolResult ShowCustomer(
        [Description("Customer number to load in the Sports2000 Smart Form (required)")] int custNum,
        ISmartMcpAccessTokenProvider? tokenProvider)
    {
        return new CallToolResult
        {
            Meta = Sports2000McpUiAuthPayloads.CreateResultMeta(tokenProvider),
            Content =
            [
                new TextContentBlock
                {
                    Text = $"Opening customer {custNum} in the Sports2000 customer app."
                }
            ]
        };
    }

    public static CallToolResult RefreshUiAuthToken(ISmartMcpAccessTokenProvider? tokenProvider)
    {
        return new CallToolResult
        {
            Meta = Sports2000McpUiAuthPayloads.CreateResultMeta(tokenProvider),
            Content =
            [
                new TextContentBlock
                {
                    Text = "Refreshing the Sports2000 UI bearer token."
                }
            ]
        };
    }

    public static ReadResourceResult GetShowCustomerPage()
    {
        return new ReadResourceResult
        {
            Contents = [Sports2000CustomerAppResources.GetShowCustomerPage()]
        };
    }

    private static JsonObject CreateToolMeta(string? resourceUri = null, params string[] visibility)
    {
        var uiMeta = new JsonObject();
        if (!string.IsNullOrWhiteSpace(resourceUri))
        {
            uiMeta["resourceUri"] = resourceUri;
        }

        if (visibility.Length > 0)
        {
            var visibilityValues = new JsonArray();
            foreach (var visibilityValue in visibility)
            {
                visibilityValues.Add(visibilityValue);
            }

            uiMeta["visibility"] = visibilityValues;
        }

        return new JsonObject
        {
            ["ui"] = uiMeta
        };
    }
}
