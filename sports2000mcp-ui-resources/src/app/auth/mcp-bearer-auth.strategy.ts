import { Injectable, inject } from '@angular/core';
import { progress } from '@consultingwerk/smartcomponents-jsdo-core';
import { SmartAuthenticationStrategyWithTokenBase } from '@consultingwerk/smartcomponent-library';
import { MCP_APP_BRIDGE, McpAppBridgePort } from '../bridge/mcp-app-bridge.port';
import { McpUiAuthSessionService } from './mcp-ui-auth-session.service';

@Injectable()
export class McpBearerAuthenticationStrategy extends SmartAuthenticationStrategyWithTokenBase {
  private readonly bridge = inject<McpAppBridgePort>(MCP_APP_BRIDGE);
  private readonly authSession = inject(McpUiAuthSessionService);

  override readonly strategy = 'mcpbearer';

  override async login(): Promise<progress.data.JSDOSession> {
    const token = await this.acquireToken(false);

    this.stopTokenRefreshTimer();
    this.resetJsdoAuthProvider();
    this.prepareForLogin();

    await this.jsdoAuthProvider.login(token);

    this._jsdoSession = this.getOrCreateJsdoSession();
    this.startTokenRefreshTimer();

    return this._jsdoSession;
  }

  override async logout(): Promise<void> {
    this.stopTokenRefreshTimer();
    this.authSession.clear();

    try {
      this._jsdoSession?.invalidate();
    } catch {
      // Ignore invalidation failures during a best-effort PoC logout.
    }

    this._jsdoSession = null!;
    this.clearJsdoLocalStorage();
    this.resetJsdoAuthProvider();
  }

  protected override async isAuthorized(): Promise<boolean> {
    return this.authSession.hasPayload();
  }

  protected override async acquireToken(_silentOnly = false): Promise<string> {
    if (!this.authSession.hasPayload()) {
      throw new Error('The MCP bearer token is not available yet.');
    }

    if (this.authSession.isExpiringSoon()) {
      await this.performTokenRefresh(30);
    }

    return this.authSession.getPayloadOrThrow().accessToken;
  }

  protected override calculateRefreshSettings(): {
    intervalMs: number;
    minValidity: number;
  } {
    const secondsUntilExpiry = this.authSession.secondsUntilExpiry();
    if (secondsUntilExpiry === null || secondsUntilExpiry <= 0) {
      return {
        intervalMs: SmartAuthenticationStrategyWithTokenBase.DEFAULT_REFRESH_INTERVAL_MS,
        minValidity: SmartAuthenticationStrategyWithTokenBase.DEFAULT_MIN_VALIDITY_SEC
      };
    }

    const minValidity = Math.max(
      Math.floor(secondsUntilExpiry * SmartAuthenticationStrategyWithTokenBase.MIN_VALIDITY_PERCENTAGE),
      SmartAuthenticationStrategyWithTokenBase.MIN_VALIDITY_SEC
    );

    const intervalMs = Math.max(
      Math.floor(
        secondsUntilExpiry *
          SmartAuthenticationStrategyWithTokenBase.TOKEN_REFRESH_PERCENTAGE *
          1000
      ),
      SmartAuthenticationStrategyWithTokenBase.MIN_REFRESH_INTERVAL_SEC * 1000
    );

    return { intervalMs, minValidity };
  }

  protected override async performTokenRefresh(minValidity: number): Promise<void> {
    if (!this.authSession.hasPayload() || !this.authSession.isExpiringSoon(minValidity)) {
      return;
    }

    const refreshedPayload = await this.bridge.refreshUiAuthToken();
    this.authSession.setPayload(refreshedPayload);
    await this.updateJsdoToken(refreshedPayload.accessToken);
  }

  protected override async performLoginRedirect(): Promise<void> {
    throw new Error('The mcpbearer strategy uses host-managed auth only and cannot redirect the browser to log in.');
  }
}
