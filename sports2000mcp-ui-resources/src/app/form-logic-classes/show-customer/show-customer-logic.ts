import {
  RuntimeClassName,
  SmartFilterDescriptor
} from '@consultingwerk/smartcomponent-library';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SmartMcpFormLogicBase } from '../base/smart-mcp-form-logic.base';

interface ShowCustomerRequest {
  custNum: number;
}

@RuntimeClassName('Sports2000McpShowCustomerFormLogic')
export class Sports2000McpShowCustomerFormLogic extends SmartMcpFormLogicBase<ShowCustomerRequest> {
  protected override parseRequest(toolArguments: Record<string, unknown> | null): ShowCustomerRequest | null {
    const custNum = this.requireIntegerArgument(
      toolArguments,
      'custNum',
      'The show-customer tool requires a numeric custNum input.'
    );

    return custNum === null ? null : { custNum };
  }

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
