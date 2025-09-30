using Consultingwerk.Sports2000Proxy;
using ModelContextProtocol.Server;
using Progress.Open4GL.DynamicAPI;
using Progress.Open4GL.Proxy;
using sports2000mcpserver;
using System;
using System.ComponentModel;

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

}
