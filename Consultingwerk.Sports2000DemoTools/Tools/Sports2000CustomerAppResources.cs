using ModelContextProtocol.Protocol;
using System.Text.Json.Nodes;

public sealed class Sports2000CustomerAppResources
{
    public const string ShowCustomerResourceUri = "ui://sports2000/customer/show-customer.html";
    public const string ShowCustomerResourceName = "Sports2000 Show Customer";
    public const string ShowCustomerResourceMimeType = "text/html;profile=mcp-app";

    public const string LocalHttpOrigin = "http://localhost:5118";
    public const string LocalHttpsOrigin = "https://localhost:7269";
    private const string Sports2000BackendOrigin = "https://sfrbo.consultingwerkcloud.com:8821";
    private const string AngularIndexRelativePath = "wwwroot/ui-resources/sports2000-customer/index.html";

    public static TextResourceContents GetShowCustomerPage()
    {
        var angularIndexPath = ResolveAngularIndexPath()
            ?? throw CreateMissingBuildException();

        return new TextResourceContents
        {
            Uri = ShowCustomerResourceUri,
            MimeType = ShowCustomerResourceMimeType,
            Text = File.ReadAllText(angularIndexPath)
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

    private static string? ResolveAngularIndexPath()
    {
        foreach (var candidatePath in GetAngularIndexCandidates())
        {
            if (File.Exists(candidatePath))
            {
                return candidatePath;
            }
        }

        return null;
    }

    private static IEnumerable<string> GetAngularIndexCandidates()
    {
        var currentDirectory = Directory.GetCurrentDirectory();
        yield return Path.GetFullPath(Path.Combine(currentDirectory, AngularIndexRelativePath));

        var appBaseDirectory = AppContext.BaseDirectory;
        yield return Path.GetFullPath(Path.Combine(appBaseDirectory, "..", "..", "..", AngularIndexRelativePath));
        yield return Path.GetFullPath(Path.Combine(appBaseDirectory, "..", "..", "..", "..", "sports2000mcpserverweb", AngularIndexRelativePath));
    }

    private static FileNotFoundException CreateMissingBuildException()
    {
        var expectedPaths = string.Join(
            Environment.NewLine,
            GetAngularIndexCandidates().Select(candidate => $" - {candidate}"));

        return new FileNotFoundException(
            $"The Sports2000 MCP Angular build output was not found. Expected '{AngularIndexRelativePath}'. Checked:{Environment.NewLine}{expectedPaths}");
    }
}
