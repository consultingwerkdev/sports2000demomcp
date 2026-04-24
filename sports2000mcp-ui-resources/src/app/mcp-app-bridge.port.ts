import { InjectionToken, Signal } from '@angular/core';
import { McpAppStatus, McpAppViewState } from './mcp-app.types';
import { McpUiAuthPayload } from './mcp-ui-auth.types';

export interface McpAppBridgePort {
  readonly state: Signal<McpAppViewState>;
  readonly uiAuth: Signal<McpUiAuthPayload | null>;
  readonly isDevEmulator: boolean;

  setStatus(status: McpAppStatus): void;
  setError(message: string): void;
  clearError(): void;
  submitCustomerInput(custNum: number): void;
  clearCustomerInput(): void;
  refreshUiAuthToken(): Promise<McpUiAuthPayload>;
}

export const MCP_APP_BRIDGE = new InjectionToken<McpAppBridgePort>('MCP_APP_BRIDGE');
