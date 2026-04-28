import { InjectionToken, Signal } from '@angular/core';
import {
  McpAppStatus,
  McpAppViewState,
  McpModelContextUpdate,
  McpToolArguments
} from './mcp-app.types';
import { McpUiAuthPayload } from '../auth/mcp-ui-auth.types';

export interface McpAppBridgePort {
  readonly state: Signal<McpAppViewState>;
  readonly uiAuth: Signal<McpUiAuthPayload | null>;
  readonly isDevEmulator: boolean;

  setStatus(status: McpAppStatus): void;
  setError(message: string): void;
  clearError(): void;
  submitToolArguments(argumentsRecord: McpToolArguments): void;
  clearToolArguments(): void;
  refreshUiAuthToken(): Promise<McpUiAuthPayload>;
  updateModelContext(update: McpModelContextUpdate): Promise<void>;
}

export const MCP_APP_BRIDGE = new InjectionToken<McpAppBridgePort>('MCP_APP_BRIDGE');
