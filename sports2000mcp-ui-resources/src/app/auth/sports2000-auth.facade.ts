import { Injectable, effect, inject, signal } from '@angular/core';
import {
  SmartAuthenticationService,
  SmartServiceAdapter
} from '@consultingwerk/smartcomponent-library';
import { environment } from '../../environments/environment';
import { McpAppViewState } from '../bridge/mcp-app.types';
import { MCP_APP_BRIDGE, McpAppBridgePort } from '../bridge/mcp-app-bridge.port';
import { McpUiAuthSessionService } from './mcp-ui-auth-session.service';

/**
 * Coordinates host authentication, SmartComponent login, and shell status transitions.
 *
 * @memberof Sports2000Auth
 */
@Injectable({ providedIn: 'root' })
export class Sports2000AuthFacade {
  private readonly authService = inject(SmartAuthenticationService);
  private readonly serviceAdapter = inject(SmartServiceAdapter);
  private readonly bridge = inject<McpAppBridgePort>(MCP_APP_BRIDGE);
  private readonly uiAuthSession = inject(McpUiAuthSessionService);
  private readonly authInitialized = signal(false);

  private authInFlight: Promise<void> | null = null;

  /**
   * Synchronizes bridge-provided auth payloads into the local auth session cache.
   *
   * @memberof Sports2000AuthFacade
   */
  constructor() {
    effect(() => {
      if (this.bridge.isDevEmulator) {
        this.uiAuthSession.clear();
        return;
      }

      this.uiAuthSession.setPayload(this.bridge.uiAuth());
    });
  }

  /**
   * Ensures the shell is authenticated for the current bridge state.
   *
   * @param {McpAppViewState} state - The current bridge state that triggered auth handling.
   * @returns {Promise<void>} - Resolves when authentication work for the state has completed.
   * @memberof Sports2000AuthFacade
   */
  async ensureAuthenticatedForState(state: McpAppViewState): Promise<void> {
    if (!this.bridge.isDevEmulator && !this.uiAuthSession.hasPayload()) {
      return;
    }

    if (
      this.serviceAdapter.stateSignal().authenticated &&
      state.toolArguments !== null &&
      state.status === 'authenticating'
    ) {
      this.bridge.setStatus('loadingForm');
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

  /**
   * Runs the SmartComponent authentication flow for the current bridge mode.
   *
   * @param {McpAppViewState} state - The current bridge state being authenticated.
   * @returns {Promise<void>} - Resolves when the form can proceed to loading or an error is published.
   * @memberof Sports2000AuthFacade
   */
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

      if (state.toolArguments !== null && this.bridge.state().status === 'authenticating') {
        this.bridge.setStatus('loadingForm');
      }
    } catch (error) {
      this.bridge.setError(this.toErrorMessage(error, 'Authentication failed.'));
    }
  }

  /**
   * Converts an unknown thrown value into a user-facing error message.
   *
   * @param {unknown} error - The thrown value to inspect.
   * @param {string} fallback - The fallback message when no Error message is available.
   * @returns {string} - The resolved error text.
   * @memberof Sports2000AuthFacade
   */
  private toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }
}
