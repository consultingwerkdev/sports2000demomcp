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

/**
 * Exposes UI state and user actions for the customer shell component tree.
 *
 * @memberof CustomerShell
 */
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

  /**
   * Wires theme, dev-emulator, and authentication side effects for the shell.
   *
   * @memberof CustomerShellFacade
   */
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

  /**
   * Reserved hook for future form wiring from the shell component.
   *
   * @memberof CustomerShellFacade
   */
  setForm(): void {}

  /**
   * Stores the raw customer number text entered in the dev toolbar.
   *
   * @param {string} value - The raw toolbar input value.
   * @memberof CustomerShellFacade
   */
  onDevCustNumInput(value: string): void {
    this.devCustNumInputSignal.set(value);
  }

  /**
   * Stores the parsed numeric customer value emitted by the numeric textbox.
   *
   * @param {number | null} value - The parsed numeric customer number.
   * @memberof CustomerShellFacade
   */
  onDevCustNumValueChange(value: number | null): void {
    this.devCustNumInputSignal.set(value === null || Number.isNaN(value) ? '' : String(value));
  }

  /**
   * Starts the local dev-emulator flow for the currently entered customer number.
   *
   * @memberof CustomerShellFacade
   */
  loadDevCustomer(): void {
    const rawValue = this.devCustNumInputSignal().trim();
    const custNum = Number.parseInt(rawValue, 10);

    if (!rawValue || !Number.isInteger(custNum)) {
      this.bridge.setError('Enter a numeric customer number before loading the form.');
      return;
    }

    this.bridge.submitToolArguments({ custNum });
  }

  /**
   * Clears the active dev-emulator customer selection.
   *
   * @memberof CustomerShellFacade
   */
  clearDevCustomer(): void {
    this.devCustNumInputSignal.set('');
    this.bridge.clearToolArguments();
  }

  /**
   * Extracts a numeric customer number from the current tool arguments.
   *
   * @param {Record<string, unknown> | null} toolArguments - The current tool arguments from bridge state.
   * @returns {number | null} - The parsed customer number, if valid.
   * @memberof CustomerShellFacade
   */
  private extractCustNum(toolArguments: Record<string, unknown> | null): number | null {
    const rawCustNum = toolArguments?.['custNum'];

    return typeof rawCustNum === 'number' && Number.isInteger(rawCustNum) ? rawCustNum : null;
  }

  /**
   * Maps a bridge status into the shell-stage variant used by the component template.
   *
   * @param {McpAppStatus} status - The current bridge status.
   * @returns {'loading' | 'error'} - The shell stage for the view.
   * @memberof CustomerShellFacade
   */
  private getShellStage(status: McpAppStatus): 'loading' | 'error' {
    return status === 'error' ? 'error' : 'loading';
  }

  /**
   * Returns the static title shown when the shell cannot display the form.
   *
   * @returns {string} - The shell error title.
   * @memberof CustomerShellFacade
   */
  private getShellTitle(): string {
    return 'Unable to open the form';
  }

  /**
   * Returns the error message shown when the shell cannot display the form.
   *
   * @returns {string} - The shell error message.
   * @memberof CustomerShellFacade
   */
  private getShellMessage(): string {
    return this.state().errorMessage ?? 'An unexpected error occurred while opening the form.';
  }
}
