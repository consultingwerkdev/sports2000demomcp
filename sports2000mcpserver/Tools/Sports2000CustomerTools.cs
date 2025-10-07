using Consultingwerk.Sports2000Proxy;
using ModelContextProtocol.Server;
using Progress.Open4GL.DynamicAPI;
using Progress.Open4GL.Proxy;
using sports2000mcpserver;
using System;
using System.ComponentModel;
using System.Net;
using System.Net.NetworkInformation;

/// <summary>
/// Sample MCP tools for demonstration purposes.
/// These tools can be invoked by MCP clients to perform various operations.
/// </summary>
public class Sports2000CustomerTools
{
    [McpServerTool]
    [Description("Returns details (Name, Address, City, Country, CreditLimit, Ballance, Salesrep) about customers based on a Customer Number (CustNum) or the customer name. When multiple customers are found using the customer name, a list is returned instead of details")]
    public string GetCustomerDetails(
        [Description("Customer Number (optional)")] int piCustNum = 0,
        [Description("Customer Name filter (optional)")] string pcName = "")
    {
        try
        {
            string connectionStr = Configuration.ConnectionString;

            Connection m_Conn = new Connection(connectionStr, "", "", "");
            m_Conn.SessionModel = 1;

            sports2000mcpao appserver = new sports2000mcpao(m_Conn);

            appserver.GetCustomerDetails(Configuration.AuthKey,
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
        [Description("The OpenEdge ABL Query string for the eCustomer table (mandatory)")] string pcQueryString = "")
    {
        try
        {
            string connectionStr = Configuration.ConnectionString;

            Connection m_Conn = new Connection(connectionStr, "", "", "");
            m_Conn.SessionModel = 1;

            sports2000mcpao appserver = new sports2000mcpao(m_Conn);

            appserver.QueryCustomers (Configuration.AuthKey,
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
        [Description("The updated value for the Email address(optional)")] string pcEmailAddress = ""
        )
    {
        try
        {
            string connectionStr = Configuration.ConnectionString;

            Connection m_Conn = new Connection(connectionStr, "", "", "");
            m_Conn.SessionModel = 1;

            sports2000mcpao appserver = new sports2000mcpao(m_Conn);

            appserver.UpdateCustomerDetails(Configuration.AuthKey,
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
