import {
  RuntimeClassName,
  SmartFilterDescriptor
} from '@consultingwerk/smartcomponent-library';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SmartMcpFormLogicBase } from '../../base/smart-mcp-form-logic.base';
import { ShowCustomerRequest } from './show-customer-request.interface';

/**
 * Loads a single customer record based on the tool arguments supplied by the host.
 *
 * @memberof Sports2000McpShowCustomerFormLogic
 */
@RuntimeClassName('Sports2000McpShowCustomerFormLogic')
export class Sports2000McpShowCustomerFormLogic extends SmartMcpFormLogicBase<ShowCustomerRequest> {
  /**
   * Parses the customer lookup request from the bridge tool arguments.
   *
   * @param {Record<string, unknown> | null} toolArguments - The current tool arguments from the bridge.
   * @returns {ShowCustomerRequest | null} - The normalized customer lookup request, if valid.
   * @memberof Sports2000McpShowCustomerFormLogic
   */
  protected override parseRequest(toolArguments: Record<string, unknown> | null): ShowCustomerRequest | null {
    const custNum = this.requireIntegerArgument(
      toolArguments,
      'custNum',
      'The show-customer tool requires a numeric custNum input.'
    );

    return custNum === null ? null : { custNum };
  }

  /**
   * Loads the customer datasource and prepares the form for the requested customer.
   *
   * @param {ShowCustomerRequest} request - The parsed customer lookup request.
   * @returns {Promise<void>} - Resolves after the initial customer load flow completes.
   * @memberof Sports2000McpShowCustomerFormLogic
   */
  protected override async runInitialLoad(request: ShowCustomerRequest): Promise<void> {
    try {
      const customerDataSource$ = this.form.getFormDatasourceAsObservable(
        environment.app.customerDatasourceName
      );

      if (!customerDataSource$) {
        this.setShellError(
          `The customer form does not expose a ${environment.app.customerDatasourceName} datasource.`
        );
        return;
      }

      const customerDataSource = await firstValueFrom(customerDataSource$);
      const result = await customerDataSource.fetch({
        top: 1,
        skip: 0,
        filter: this.createCustomerFilter(request.custNum)
      });

      if (!this.isCurrentRequest((toolArguments) => toolArguments?.['custNum'] === request.custNum)) {
        return;
      }

      if (result.data.length === 1) {
        this.setShellReady();
        return;
      }

      if (result.data.length === 0) {
        this.setShellError(`Customer ${request.custNum} was not found.`);
        return;
      }

      this.setShellError(`Customer lookup for ${request.custNum} returned multiple records.`);
    } catch (error) {
      if (!this.isCurrentRequest((toolArguments) => toolArguments?.['custNum'] === request.custNum)) {
        return;
      }

      this.setShellError(
        this.toErrorMessage(error, `Unable to load customer ${request.custNum}.`)
      );
    }
  }

  /**
   * Builds the Smart filter used to fetch a single customer by customer number.
   *
   * @param {number} custNum - The customer number to match.
   * @returns {SmartFilterDescriptor} - The Smart datasource filter descriptor.
   * @memberof Sports2000McpShowCustomerFormLogic
   */
  private createCustomerFilter(custNum: number): SmartFilterDescriptor {
    return {
      logic: 'and',
      filters: [
        {
          field: 'CustNum',
          operator: 'eq',
          value: custNum
        }
      ]
    };
  }
}
