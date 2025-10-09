
/*
**
**    Created by PROGRESS ProxyGen (Progress Version 12.8) Thu Oct 09 11:57:46 CEST 2025
**
*/

//
// sports2000mcpao
//


namespace Consultingwerk.Sports2000Proxy
{
    using System;
    using Progress.Open4GL;
    using Progress.Open4GL.Exceptions;
    using Progress.Open4GL.Proxy;
    using Progress.Open4GL.DynamicAPI;
    using Progress.Common.EhnLog;
    using System.Collections.Specialized;
    using System.Configuration;

    /// <summary>
    /// 
    /// @author Consultingwerk Application Modernization Solitions Ltd.
    /// @version 1.1
    /// </summary>
    public class sports2000mcpao : AppObject
    {
        private static int proxyGenVersion = 1;
        private const  int PROXY_VER = 5;

    // Create a MetaData object for each temp-table parm used in any and all methods.
    // Create a Schema object for each method call that has temp-table parms which
    // points to one or more temp-tables used in that method call.



        static sports2000mcpao()
        {

        }


    //---- Constructors
    public sports2000mcpao(Connection connectObj) : this(connectObj, false)
    {       
    }
    
    // If useWebConfigFile = true, we are creating AppObject to use with Silverlight proxy
    public sports2000mcpao(Connection connectObj, bool useWebConfigFile)
    {
        if (RunTimeProperties.DynamicApiVersion != PROXY_VER)
            throw new Open4GLException(WrongProxyVer);

        if ((connectObj.Url == null) || (connectObj.Url.Equals("")))
            connectObj.Url = "sports2000mcpao";

        if (useWebConfigFile == true)
            connectObj.GetWebConfigFileInfo("sports2000mcpao");

        initAppObject("sports2000mcpao",
                        connectObj,
                        RunTimeProperties.tracer,
                        null, // requestID
                        proxyGenVersion);
    }
   
    public sports2000mcpao(string urlString,
                        string userId,
                        string password,
                        string appServerInfo)
    {
        Connection connectObj;

        if (RunTimeProperties.DynamicApiVersion != PROXY_VER)
            throw new Open4GLException(WrongProxyVer);

        connectObj = new Connection(urlString,
                                    userId,
                                    password,
                                    appServerInfo);

        initAppObject("sports2000mcpao",
                        connectObj,
                        RunTimeProperties.tracer,
                        null, // requestID
                        proxyGenVersion);

        /* release the connection since the connection object */
        /* is being destroyed.  the user can't do this        */
        connectObj.ReleaseConnection();
    }


    public sports2000mcpao(string userId,
                        string password,
                        string appServerInfo)
    {
        Connection connectObj;

        if (RunTimeProperties.DynamicApiVersion != PROXY_VER)
            throw new Open4GLException(WrongProxyVer);

        connectObj = new Connection("sports2000mcpao",
                                    userId,
                                    password,
                                    appServerInfo);

        initAppObject("sports2000mcpao",
                        connectObj,
                        RunTimeProperties.tracer,
                        null, // requestID
                        proxyGenVersion);

        /* release the connection since the connection object */
        /* is being destroyed.  the user can't do this        */
        connectObj.ReleaseConnection();
    }

    public sports2000mcpao()
    {
        Connection connectObj;

        if (RunTimeProperties.DynamicApiVersion != PROXY_VER)
            throw new Open4GLException(WrongProxyVer);

        connectObj = new Connection("sports2000mcpao",
                                    null,
                                    null,
                                    null);

        initAppObject("sports2000mcpao",
                        connectObj,
                        RunTimeProperties.tracer,
                        null, // requestID
                        proxyGenVersion);

        /* release the connection since the connection object */
        /* is being destroyed.  the user can't do this        */
        connectObj.ReleaseConnection();

    }

        /// <summary>
	/// 
	/// </summary> 
	public string GetCustomerDetails(string pcAuthKey, int piCustNum, string pcName, out string pcResponse)
	{
		RqContext rqCtx = null;
		if (isSessionAvailable() == false)
			throw new Open4GLException(NotAvailable);

		Object outValue;
		ParameterSet parms = new ParameterSet(4);

		// Set up input parameters
		parms.setStringParameter(1, pcAuthKey, ParameterSet.INPUT);
		parms.setIntegerParameter(2, piCustNum, ParameterSet.INPUT);
		parms.setStringParameter(3, pcName, ParameterSet.INPUT);


		// Set up input/output parameters


		// Set up Out parameters
		parms.setLongCharParameter(4, null, ParameterSet.OUTPUT);


		// Setup local MetaSchema if any params are tables



		// Set up return type
		

		// Run procedure
		rqCtx = runProcedure("Consultingwerk/SmartComponentsDemo/Sports2000McpServer/get-customer-details.p", parms);


		// Get output parameters
		outValue = parms.getOutputParameter(4);
		pcResponse = (string)outValue;


		if (rqCtx != null) rqCtx.Release();


		// Return output value
		return (string)(parms.ProcedureReturnValue);

	}

/// <summary>
	/// 
	/// </summary> 
	public string OpenCustomerForm(string pcAuthKey, int piCustNum, string pcName, out string pcResponse)
	{
		RqContext rqCtx = null;
		if (isSessionAvailable() == false)
			throw new Open4GLException(NotAvailable);

		Object outValue;
		ParameterSet parms = new ParameterSet(4);

		// Set up input parameters
		parms.setStringParameter(1, pcAuthKey, ParameterSet.INPUT);
		parms.setIntegerParameter(2, piCustNum, ParameterSet.INPUT);
		parms.setStringParameter(3, pcName, ParameterSet.INPUT);


		// Set up input/output parameters


		// Set up Out parameters
		parms.setLongCharParameter(4, null, ParameterSet.OUTPUT);


		// Setup local MetaSchema if any params are tables



		// Set up return type
		

		// Run procedure
		rqCtx = runProcedure("Consultingwerk/SmartComponentsDemo/Sports2000McpServer/open_customer_form.p", parms);


		// Get output parameters
		outValue = parms.getOutputParameter(4);
		pcResponse = (string)outValue;


		if (rqCtx != null) rqCtx.Release();


		// Return output value
		return (string)(parms.ProcedureReturnValue);

	}

/// <summary>
	/// 
	/// </summary> 
	public string QueryCustomers(string pcAuthKey, string pcQueryString, out string pcResponse)
	{
		RqContext rqCtx = null;
		if (isSessionAvailable() == false)
			throw new Open4GLException(NotAvailable);

		Object outValue;
		ParameterSet parms = new ParameterSet(3);

		// Set up input parameters
		parms.setStringParameter(1, pcAuthKey, ParameterSet.INPUT);
		parms.setStringParameter(2, pcQueryString, ParameterSet.INPUT);


		// Set up input/output parameters


		// Set up Out parameters
		parms.setLongCharParameter(3, null, ParameterSet.OUTPUT);


		// Setup local MetaSchema if any params are tables



		// Set up return type
		

		// Run procedure
		rqCtx = runProcedure("Consultingwerk/SmartComponentsDemo/Sports2000McpServer/query-customers.p", parms);


		// Get output parameters
		outValue = parms.getOutputParameter(3);
		pcResponse = (string)outValue;


		if (rqCtx != null) rqCtx.Release();


		// Return output value
		return (string)(parms.ProcedureReturnValue);

	}

/// <summary>
	/// 
	/// </summary> 
	public string UpdateCustomerDetails(string pcAuthKey, int piCustNum, string pcName, string pcAddress, string pcAddress2, 
string pcCity, string pcState, string pcPostalCode, string pcCountry, string pcPhone, 
string pcEmailAddress, out string pcResponse)
	{
		RqContext rqCtx = null;
		if (isSessionAvailable() == false)
			throw new Open4GLException(NotAvailable);

		Object outValue;
		ParameterSet parms = new ParameterSet(12);

		// Set up input parameters
		parms.setStringParameter(1, pcAuthKey, ParameterSet.INPUT);
		parms.setIntegerParameter(2, piCustNum, ParameterSet.INPUT);
		parms.setStringParameter(3, pcName, ParameterSet.INPUT);
		parms.setStringParameter(4, pcAddress, ParameterSet.INPUT);
		parms.setStringParameter(5, pcAddress2, ParameterSet.INPUT);
		parms.setStringParameter(6, pcCity, ParameterSet.INPUT);
		parms.setStringParameter(7, pcState, ParameterSet.INPUT);
		parms.setStringParameter(8, pcPostalCode, ParameterSet.INPUT);
		parms.setStringParameter(9, pcCountry, ParameterSet.INPUT);
		parms.setStringParameter(10, pcPhone, ParameterSet.INPUT);
		parms.setStringParameter(11, pcEmailAddress, ParameterSet.INPUT);


		// Set up input/output parameters


		// Set up Out parameters
		parms.setLongCharParameter(12, null, ParameterSet.OUTPUT);


		// Setup local MetaSchema if any params are tables



		// Set up return type
		

		// Run procedure
		rqCtx = runProcedure("Consultingwerk/SmartComponentsDemo/Sports2000McpServer/update-customer-details.p", parms);


		// Get output parameters
		outValue = parms.getOutputParameter(12);
		pcResponse = (string)outValue;


		if (rqCtx != null) rqCtx.Release();


		// Return output value
		return (string)(parms.ProcedureReturnValue);

	}



    }
}

