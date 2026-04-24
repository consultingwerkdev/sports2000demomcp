import { Injectable, signal } from '@angular/core';
import { McpAppBridgePort } from './mcp-app-bridge.port';
import { McpAppStatus, McpAppViewState } from './mcp-app.types';
import { McpUiAuthPayload } from '../auth/mcp-ui-auth.types';

const INITIAL_DEV_STATE: McpAppViewState = {
  status: 'awaitingToolInput',
  custNum: null,
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
      status: this.stateSignal().custNum === null ? 'awaitingToolInput' : 'authenticating',
      errorMessage: null
    });
  }

  submitCustomerInput(custNum: number): void {
    if (!Number.isInteger(custNum)) {
      this.setError('The show-customer tool requires a numeric custNum input.');
      return;
    }

    this.patchState({
      status: 'authenticating',
      custNum,
      toolResultText: `Dev emulator opening customer ${custNum}.`,
      errorMessage: null
    });
  }

  clearCustomerInput(): void {
    this.patchState({
      status: 'awaitingToolInput',
      custNum: null,
      toolResultText: null,
      errorMessage: null
    });
  }

  refreshUiAuthToken(): Promise<McpUiAuthPayload> {
    return Promise.reject(
      new Error('The ng serve emulator does not support MCP-managed bearer token refresh.')
    );
  }

  private patchState(patch: Partial<McpAppViewState>): void {
    this.stateSignal.update((state) => ({
      ...state,
      ...patch
    }));
  }
}
