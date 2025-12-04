using Consultingwerk.SmartMcpAuthentication;
using Consultingwerk.Sports2000Proxy;
using ModelContextProtocol.Server;
using Progress.Open4GL.Proxy;
using sports2000mcpserver;
using System.ComponentModel;

/// <summary>
/// Sample MCP tools for demonstration purposes.
/// These tools can be invoked by MCP clients to perform various operations.
/// </summary>
public class Sports2000CustomerTools
{
    private readonly ISmartMcpAccessTokenProvider? _tokenProvider = null;

    /// <summary>
    /// Initializes a new instance of the Sports2000CustomerTools class.
    /// </summary>
    /// <param name="tokenProvider">The provider for retrieving the current access token.</param>
    public Sports2000CustomerTools(ISmartMcpAccessTokenProvider tokenProvider)
    {
        _tokenProvider = tokenProvider; //?? throw new ArgumentNullException(nameof(tokenProvider));
    }

    // Empty default - constructor, as when executed via .exe (stdio) we do not inject the ISmartMcpAccessTokenProvider
    public Sports2000CustomerTools() 
    {
    }

    private sports2000mcpao GetAppServerConnection ()
    {
        string connectionStr = Configuration.ConnectionString;

        Connection m_Conn = new Connection(connectionStr, "", "", "");
        m_Conn.SessionModel = 1;

        sports2000mcpao appserver = new sports2000mcpao(m_Conn);

        return appserver;
    }

    [McpServerTool]
    [Description("Returns details (Name, Address, City, Country, CreditLimit, Ballance, Salesrep) about customers based on a Customer Number (CustNum) or the customer name. When multiple customers are found using the customer name, a list is returned instead of details")]
    public string GetCustomerDetails(
        [Description("Customer Number (optional)")] int piCustNum = 0,
        [Description("Customer Name filter (optional)")] string pcName = "",
        [Description("jwtToken for authentication (optional)")] string? pcJwtToken = "")
    {
        try
        {
            sports2000mcpao appserver = this.GetAppServerConnection();

            // Use JWT token from context if available, otherwise use parameter
            string? jwtToken = string.IsNullOrEmpty(pcJwtToken) ? _tokenProvider?.GetAccessToken() : pcJwtToken;

            appserver.GetCustomerDetails(Configuration.AuthKey,
                                         jwtToken,
                                         piCustNum,
                                         pcName,
                                         out string response);

            appserver.Dispose();

            return response;
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    [McpServerTool]
    [Description("Returns details (Item Number, Item Name, Price, On Hand, Catalog Page, Catalog Description, Category 1, Category2, Special, Weight) for the items matching the provided search string. Leave the search string empty to return all items (ca. 70). It's preferabls to search for short words, singular words. This tool provides catalog, product information including quantity on stock (at hand).")]
    public string GetItemDetails(
        [Description("Item Name filter (optional)")] string pcItemNameFilter = "",
        [Description("jwtToken for authentication (optional)")] string? pcJwtToken = "")
    {
        try
        {
            sports2000mcpao appserver = this.GetAppServerConnection();

            // Use JWT token from context if available, otherwise use parameter
            string? jwtToken = string.IsNullOrEmpty(pcJwtToken) ? _tokenProvider?.GetAccessToken() : pcJwtToken;

            appserver.GetItemDetails(Configuration.AuthKey,
                                     jwtToken,                                     
                                     pcItemNameFilter,
                                     out string response);

            appserver.Dispose();

            return response;
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    [McpServerTool]
    [Description("Returns the current users (my) profile including details like the customer number, email address and company name.")]
    public string GetUserProfile(
        [Description("jwtToken for authentication (optional)")] string? pcJwtToken = "")
    {
        try
        {
            sports2000mcpao appserver = this.GetAppServerConnection();

            // Use JWT token from context if available, otherwise use parameter
            string? jwtToken = string.IsNullOrEmpty(pcJwtToken) ? _tokenProvider?.GetAccessToken() : pcJwtToken;

            appserver.GetUserProfile(Configuration.AuthKey,
                                     jwtToken,
                                     out string response);

            appserver.Dispose();

            return response;
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    [McpServerTool]
    [Description("Opens a Customer Form in the Browser web application, either based on the Customer Number (CustNum) or the customer name. When multiple customers are found using the customer name, a list is returned instead of opening the form directly")]
    public string OpenCustomerForm(
        [Description("Customer Number (optional)")] int piCustNum = 0,
        [Description("Customer Name filter (optional)")] string pcName = "",
        [Description("jwtToken for authentication (optional)")] string? pcJwtToken = "")
    {
        try
        {
            sports2000mcpao appserver = this.GetAppServerConnection();

            // Use JWT token from context if available, otherwise use parameter
            string? jwtToken = string.IsNullOrEmpty(pcJwtToken) ? _tokenProvider?.GetAccessToken() : pcJwtToken;
            
            appserver.OpenCustomerForm(Configuration.AuthKey,
                                       jwtToken,
                                       piCustNum,
                                       pcName,
                                       out string response);

            appserver.Dispose();

            return response;
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    [McpServerTool]
    [Description("Queries/searches customers based on an OpenEdge ABL Query string (FOR EACH) for the eCustomer table. Fields of the table are: CustNum (integer), Country (character), Name (character), Address (character), Address2 (character), City (character), State (character), PostalCode (character), Contact (character), Phone (character), SalesRep (character), CreditLimit (decimal), Balance (decimal), Terms (character), Discount (integer), Comments (character), Fax (character), EmailAddress (character)")]
    public string QueryCustomers(
        [Description("The OpenEdge ABL Query string for the eCustomer table (mandatory)")] string pcQueryString = "",
        [Description("jwtToken for authentication (optional)")] string? pcJwtToken = "")
    {
        try
        {
            sports2000mcpao appserver = this.GetAppServerConnection();

            // Use JWT token from context if available, otherwise use parameter
            string? jwtToken = string.IsNullOrEmpty(pcJwtToken) ? _tokenProvider?.GetAccessToken() : pcJwtToken;

            appserver.QueryCustomers (Configuration.AuthKey,
                                      jwtToken,
                                      pcQueryString,
                                      out string response);

            appserver.Dispose();

            return response;
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    [McpServerTool]
    [Description("Updates fields of a customer record (Name, Address, City, Country, CreditLimit, Ballance, Salesrep) only provide values for the fields that the user instructs you to change")]
    public string UpdateCustomerDetails(
        [Description("Customer Number (optional)")] int piCustNum = 0,
        [Description("The updated value for the Customer Name filter (optional)")] string pcName = "",
        [Description("The updated value for the address (street) (optional)")] string pcAddress = "",
        [Description("The updated value for the address (street) (optional)")] string pcAddress2 = "",
        [Description("The updated value for the City (optional)")] string pcCity = "",
        [Description("The updated value for the State (optional)")] string pcState = "",
        [Description("The updated value for the Postal Code (optional)")] string pcPostalCode = "",
        [Description("The updated value for the Country (optional)")] string pcCountry = "",
        [Description("The updated value for the Phone (optional)")] string pcPhone = "",
        [Description("The updated value for the Email address(optional)")] string pcEmailAddress = "",
        [Description("jwtToken for authentication (optional)")] string? pcJwtToken = ""
        )
    {
        try
        {
            sports2000mcpao appserver = this.GetAppServerConnection();

            // Use JWT token from context if available, otherwise use parameter
            string? jwtToken = string.IsNullOrEmpty(pcJwtToken) ? _tokenProvider?.GetAccessToken() : pcJwtToken;
            appserver.UpdateCustomerDetails(Configuration.AuthKey,
                                            jwtToken,
                                            piCustNum,
                                            pcName,
                                            pcAddress,
                                            pcAddress2,
                                            pcCity,
                                            pcState ,
                                            pcPostalCode,
                                            pcCountry,
                                            pcPhone,
                                            pcEmailAddress,
                                            out string response);
                
            appserver.Dispose();

            return response;
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }


}
