import { Injectable, Signal, computed, effect, inject, signal } from '@angular/core';
import { SmartServiceAdapter, SmartSessionManagerService } from '@consultingwerk/smartcomponent-library';
import { environment } from '../../environments/environment';
import { Sports2000AuthFacade } from '../auth/sports2000-auth.facade';
import { MCP_APP_BRIDGE, McpAppBridgePort } from '../bridge/mcp-app-bridge.port';
import { McpAppStatus } from '../bridge/mcp-app.types';
import {
  applyDocumentTheme,
  applyHostStyleVariables,
  resolveDocumentTheme
} from '../core/theme/host-theme-utils';
import { KendoThemeLoaderService } from '../core/theme/kendo-theme-loader.service';

@Injectable({ providedIn: 'root' })
export class CustomerShellFacade {
  private readonly serviceAdapter = inject(SmartServiceAdapter);
  private readonly sessionManager = inject(SmartSessionManagerService);
  private readonly bridge = inject<McpAppBridgePort>(MCP_APP_BRIDGE);
  private readonly authFacade = inject(Sports2000AuthFacade);
  private readonly kendoThemeLoader = inject(KendoThemeLoaderService);

  private readonly devCustNumInputSignal = signal('');
  private appliedHostVariableNames = new Set<string>();

  readonly formName = environment.app.formName;
  readonly loadingLogoUrl = `${environment.app.assetBaseUrl}cwlogo.png`;
  readonly state = this.bridge.state;
  readonly isDevEmulator = this.bridge.isDevEmulator;
  readonly sessionContext: Signal<unknown> = this.sessionManager.sessionContextSignal;
  readonly devCustNumInput = this.devCustNumInputSignal.asReadonly();

  readonly shouldRenderForm = computed(() => {
    const state = this.state();
    return (
      this.serviceAdapter.stateSignal().authenticated &&
      state.toolArguments !== null &&
      (state.status === 'loadingForm' || state.status === 'ready')
    );
  });

  readonly shouldShowLoadingLogo = computed(() => this.getShellStage(this.state().status) === 'loading');
  readonly shellStage = computed(() => this.getShellStage(this.state().status));
  readonly shellTitle = computed(() => this.getShellTitle());
  readonly shellMessage = computed(() => this.getShellMessage());

  constructor() {
    effect(() => {
      const state = this.state();
      const theme = resolveDocumentTheme(state.hostTheme);

      applyDocumentTheme(theme);
      this.kendoThemeLoader.applyTheme(theme);
      this.appliedHostVariableNames = applyHostStyleVariables(
        state.hostStyleVariables,
        this.appliedHostVariableNames
      );
    });

    effect(() => {
      if (!this.bridge.isDevEmulator) {
        return;
      }

      const custNum = this.extractCustNum(this.state().toolArguments);
      this.devCustNumInputSignal.set(custNum === null ? '' : String(custNum));
    });

    effect(() => {
      const state = this.state();
      if (state.status !== 'authenticating' || state.toolArguments === null) {
        return;
      }

      if (!this.bridge.isDevEmulator && !this.bridge.uiAuth()) {
        return;
      }

      void this.authFacade.ensureAuthenticatedForState(state);
    });
  }

  setForm(): void {}

  onDevCustNumInput(value: string): void {
    this.devCustNumInputSignal.set(value);
  }

  onDevCustNumValueChange(value: number | null): void {
    this.devCustNumInputSignal.set(value === null || Number.isNaN(value) ? '' : String(value));
  }

  loadDevCustomer(): void {
    const rawValue = this.devCustNumInputSignal().trim();
    const custNum = Number.parseInt(rawValue, 10);

    if (!rawValue || !Number.isInteger(custNum)) {
      this.bridge.setError('Enter a numeric customer number before loading the form.');
      return;
    }

    this.bridge.submitToolArguments({ custNum });
  }

  clearDevCustomer(): void {
    this.devCustNumInputSignal.set('');
    this.bridge.clearToolArguments();
  }

  private extractCustNum(toolArguments: Record<string, unknown> | null): number | null {
    const rawCustNum = toolArguments?.['custNum'];

    return typeof rawCustNum === 'number' && Number.isInteger(rawCustNum) ? rawCustNum : null;
  }

  private getShellStage(status: McpAppStatus): 'loading' | 'error' {
    return status === 'error' ? 'error' : 'loading';
  }

  private getShellTitle(): string {
    return 'Unable to open the form';
  }

  private getShellMessage(): string {
    return this.state().errorMessage ?? 'An unexpected error occurred while opening the form.';
  }
}
