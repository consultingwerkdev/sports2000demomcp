import {
  AfterSaveChangesEventArgument,
  RuntimeClassName,
  SmartViewerLogic
} from '@consultingwerk/smartcomponent-library';
import { inject } from '@angular/core';
import { MCP_APP_BRIDGE, McpAppBridgePort } from '../../bridge/mcp-app-bridge.port';
import { toMcpJsonValue } from '../../bridge/mcp-json-value.utils';

const CUSTOMER_UPDATED_EVENT = 'sports2000.customer.updated';

@RuntimeClassName('Sports2000McpShowCustomerViewerLogic')
export class Sports2000McpShowCustomerViewerLogic extends SmartViewerLogic {
  protected bridge!: McpAppBridgePort;

  override init(): void {
    this.bridge = inject(MCP_APP_BRIDGE);
    super.init();
  }

  protected override onAfterSaveChanges(args: AfterSaveChangesEventArgument): void {
    const updatedAtUtc = new Date().toISOString();
    const custNum = args.record.CustNum;
    const customerDescription = custNum === null ? 'the current customer' : `customer ${custNum}`;

    void this.bridge.updateModelContext({
      content: [
        {
          type: 'text',
          text: `The user updated ${customerDescription} in the Sports2000 customer viewer at ${updatedAtUtc}. New values: ${JSON.stringify(args.record).trim()}`
        }
      ]
    }).catch((error) => {
      console.warn('[sports2000-mcp-ui] Unable to update model context after save.', error);
    });
  }
}