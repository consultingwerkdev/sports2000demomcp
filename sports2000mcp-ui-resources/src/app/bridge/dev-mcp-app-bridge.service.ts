import { Injectable, signal } from '@angular/core';
import { McpAppBridgePort } from './mcp-app-bridge.port';
import {
  McpAppStatus,
  McpAppViewState,
  McpModelContextUpdate,
  McpToolArguments
} from './mcp-app.types';
import { McpUiAuthPayload } from '../auth/mcp-ui-auth.types';

const INITIAL_DEV_STATE: McpAppViewState = {
  status: 'awaitingToolInput',
  toolArguments: null,
  toolResultText: null,
  lastHostContext: null,
  hostTheme: 'light',
  hostStyleVariables: {},
  errorMessage: null
};

@Injectable({ providedIn: 'root' })
export class DevMcpAppBridgeService implements McpAppBridgePort {
  private readonly stateSignal = signal<McpAppViewState>(INITIAL_DEV_STATE);
  private readonly uiAuthSignal = signal<McpUiAuthPayload | null>(null);

  readonly state = this.stateSignal.asReadonly();
  readonly uiAuth = this.uiAuthSignal.asReadonly();
  readonly isDevEmulator = true;

  setStatus(status: McpAppStatus): void {
    this.patchState({
      status,
      errorMessage: status === 'error' ? this.stateSignal().errorMessage : null
    });
  }

  setError(message: string): void {
    this.patchState({
      status: 'error',
      errorMessage: message
    });
  }

  clearError(): void {
    if (this.stateSignal().status !== 'error') {
      this.patchState({ errorMessage: null });
      return;
    }

    this.patchState({
      status: this.stateSignal().toolArguments === null ? 'awaitingToolInput' : 'authenticating',
      errorMessage: null
    });
  }

  submitToolArguments(argumentsRecord: McpToolArguments): void {
    const custNum = this.extractCustNum(argumentsRecord);
    if (custNum === null) {
      this.setError('The show-customer tool requires a numeric custNum input.');
      return;
    }

    this.patchState({
      status: 'authenticating',
      toolArguments: { custNum },
      toolResultText: `Dev emulator opening customer ${custNum}.`,
      errorMessage: null
    });
  }

  clearToolArguments(): void {
    this.patchState({
      status: 'awaitingToolInput',
      toolArguments: null,
      toolResultText: null,
      errorMessage: null
    });
  }

  refreshUiAuthToken(): Promise<McpUiAuthPayload> {
    return Promise.reject(
      new Error('The ng serve emulator does not support MCP-managed bearer token refresh.')
    );
  }

  updateModelContext(update: McpModelContextUpdate): Promise<void> {
    console.debug('[sports2000-mcp-ui] Dev model context update', update);
    return Promise.resolve();
  }

  private patchState(patch: Partial<McpAppViewState>): void {
    this.stateSignal.update((state) => ({
      ...state,
      ...patch
    }));
  }

  private extractCustNum(argumentsRecord: McpToolArguments): number | null {
    const rawCustNum = argumentsRecord['custNum'];

    if (typeof rawCustNum === 'number' && Number.isInteger(rawCustNum)) {
      return rawCustNum;
    }

    if (typeof rawCustNum === 'string') {
      const parsedCustNum = Number.parseInt(rawCustNum, 10);
      if (Number.isInteger(parsedCustNum)) {
        return parsedCustNum;
      }
    }

    return null;
  }
}
