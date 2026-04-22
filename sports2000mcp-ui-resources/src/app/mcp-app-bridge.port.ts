import { InjectionToken, Signal } from '@angular/core';
import { McpAppStatus, McpAppViewState } from './mcp-app.types';

export interface McpAppBridgePort {
  readonly state: Signal<McpAppViewState>;
  readonly isDevEmulator: boolean;

  setStatus(status: McpAppStatus): void;
  setError(message: string): void;
  clearError(): void;
  submitCustomerInput(custNum: number): void;
  clearCustomerInput(): void;
}

export const MCP_APP_BRIDGE = new InjectionToken<McpAppBridgePort>('MCP_APP_BRIDGE');
