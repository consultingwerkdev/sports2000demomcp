import { Injectable, effect, inject, signal } from '@angular/core';
import {
  SmartAuthenticationService,
  SmartServiceAdapter
} from '@consultingwerk/smartcomponent-library';
import { environment } from '../../environments/environment';
import { McpAppViewState } from '../bridge/mcp-app.types';
import { MCP_APP_BRIDGE, McpAppBridgePort } from '../bridge/mcp-app-bridge.port';
import { McpUiAuthSessionService } from './mcp-ui-auth-session.service';

@Injectable({ providedIn: 'root' })
export class Sports2000AuthFacade {
  private readonly authService = inject(SmartAuthenticationService);
  private readonly serviceAdapter = inject(SmartServiceAdapter);
  private readonly bridge = inject<McpAppBridgePort>(MCP_APP_BRIDGE);
  private readonly uiAuthSession = inject(McpUiAuthSessionService);
  private readonly authInitialized = signal(false);

  private authInFlight: Promise<void> | null = null;

  constructor() {
    effect(() => {
      if (this.bridge.isDevEmulator) {
        this.uiAuthSession.clear();
        return;
      }

      this.uiAuthSession.setPayload(this.bridge.uiAuth());
    });
  }

  async ensureAuthenticatedForState(state: McpAppViewState): Promise<void> {
    if (!this.bridge.isDevEmulator && !this.uiAuthSession.hasPayload()) {
      return;
    }

    if (
      this.serviceAdapter.stateSignal().authenticated &&
      state.custNum !== null &&
      state.status === 'authenticating'
    ) {
      this.bridge.setStatus('loadingCustomer');
      return;
    }

    if (this.authInFlight) {
      return this.authInFlight;
    }

    this.authInFlight = this.authenticate(state).finally(() => {
      this.authInFlight = null;
    });

    return this.authInFlight;
  }

  private async authenticate(state: McpAppViewState): Promise<void> {
    try {
      if (!this.authInitialized()) {
        const authConfig = this.bridge.isDevEmulator
          ? environment.app.auth.devEmulator
          : environment.app.auth.mcpHost;
        const serviceOptions =
          authConfig.strategy === 'hybridrealm'
            ? {
                serviceURI: authConfig.serviceUri,
                credentials: authConfig.credentials!
              }
            : {
                serviceURI: authConfig.serviceUri
              };

        await this.authService.initialize(
          {
            strategy: authConfig.strategy
          },
          serviceOptions
        );

        this.authInitialized.set(true);
      }

      await this.serviceAdapter.login();

      if (state.custNum !== null && this.bridge.state().status === 'authenticating') {
        this.bridge.setStatus('loadingCustomer');
      }
    } catch (error) {
      this.bridge.setError(this.toErrorMessage(error, 'Authentication failed.'));
    }
  }

  private toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }
}
