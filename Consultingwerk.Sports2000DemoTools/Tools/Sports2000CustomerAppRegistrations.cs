using ModelContextProtocol.Protocol;
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Text.Json.Nodes;

public static class Sports2000CustomerAppRegistrations
{
    private const string ShowCustomerDescription = "Opens the Sports2000 Angular customer shell and loads one customer by customer number.";
    private const string ShowCustomerResourceDescription = "Returns the Angular bootstrap page used by the Sports2000 show-customer MCP App.";

    public static IEnumerable<McpServerTool> CreateTools()
    {
        yield return McpServerTool.Create(
            (Func<int, CallToolResult>)ShowCustomer,
            new McpServerToolCreateOptions
            {
                Name = "show-customer",
                Title = "Show Customer",
                Description = ShowCustomerDescription,
                Meta = CreateToolMeta()
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
        [Description("Customer number to load in the Sports2000 Smart Form (required)")] int custNum)
    {
        return new CallToolResult
        {
            Content =
            [
                new TextContentBlock
                {
                    Text = $"Opening customer {custNum} in the Sports2000 customer app."
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

    private static JsonObject CreateToolMeta()
    {
        return new JsonObject
        {
            ["ui"] = new JsonObject
            {
                ["resourceUri"] = Sports2000CustomerAppResources.ShowCustomerResourceUri
            }
        };
    }
}
