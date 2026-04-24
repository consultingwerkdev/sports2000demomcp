import { Injectable, Signal, computed, effect, inject, signal } from '@angular/core';
import {
  SmartFilterDescriptor,
  SmartFormComponent,
  SmartServiceAdapter,
  SmartSessionManagerService
} from '@consultingwerk/smartcomponent-library';
import { firstValueFrom } from 'rxjs';
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

  private readonly formSignal = signal<SmartFormComponent | null>(null);
  private readonly devCustNumInputSignal = signal('');
  private appliedHostVariableNames = new Set<string>();
  private customerLoadToken = 0;

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
      state.custNum !== null &&
      (state.status === 'loadingCustomer' || state.status === 'ready')
    );
  });

  readonly shouldShowLoadingLogo = computed(() => !this.shouldRenderForm());
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

      const custNum = this.state().custNum;
      this.devCustNumInputSignal.set(custNum === null ? '' : String(custNum));
    });

    effect(() => {
      const state = this.state();
      if (state.status !== 'authenticating' || state.custNum === null) {
        return;
      }

      if (!this.bridge.isDevEmulator && !this.bridge.uiAuth()) {
        return;
      }

      void this.authFacade.ensureAuthenticatedForState(state);
    });

    effect(() => {
      const state = this.state();
      const form = this.formSignal();
      if (
        !form ||
        !this.serviceAdapter.stateSignal().authenticated ||
        state.status !== 'loadingCustomer' ||
        state.custNum === null
      ) {
        return;
      }

      void this.loadCustomer(form, state.custNum);
    });
  }

  setForm(form: SmartFormComponent | undefined): void {
    this.formSignal.set(form ?? null);
  }

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

    this.bridge.submitCustomerInput(custNum);
  }

  clearDevCustomer(): void {
    this.devCustNumInputSignal.set('');
    this.bridge.clearCustomerInput();
  }

  private async loadCustomer(form: SmartFormComponent, custNum: number): Promise<void> {
    const loadToken = ++this.customerLoadToken;

    try {
      const customerDataSource$ = form.getFormDatasourceAsObservable(
        environment.app.customerDatasourceName
      );
      if (!customerDataSource$) {
        this.bridge.setError(
          `The customer form does not expose a ${environment.app.customerDatasourceName} datasource.`
        );
        return;
      }

      const customerDataSource = await firstValueFrom(customerDataSource$);
      const result = await customerDataSource.fetch({
        top: 1,
        skip: 0,
        filter: this.createCustomerFilter(custNum)
      });

      if (loadToken !== this.customerLoadToken || this.state().custNum !== custNum) {
        return;
      }

      if (result.data.length === 1) {
        this.bridge.setStatus('ready');
        return;
      }

      if (result.data.length === 0) {
        this.bridge.setStatus('notFound');
        return;
      }

      this.bridge.setError(`Customer lookup for ${custNum} returned multiple records.`);
    } catch (error) {
      if (loadToken !== this.customerLoadToken) {
        return;
      }

      this.bridge.setError(this.toErrorMessage(error, `Unable to load customer ${custNum}.`));
    }
  }

  private createCustomerFilter(custNum: number): SmartFilterDescriptor {
    return {
      logic: 'and',
      filters: [
        {
          field: 'CustNum',
          operator: 'eq',
          value: custNum
        }
      ]
    };
  }

  private getShellStage(status: McpAppStatus): 'loading' | 'notFound' | 'error' | 'ready' {
    switch (status) {
      case 'notFound':
        return 'notFound';
      case 'error':
        return 'error';
      case 'ready':
        return 'ready';
      default:
        return 'loading';
    }
  }

  private getShellTitle(): string {
    const state = this.state();

    switch (this.shellStage()) {
      case 'loading':
        return state.custNum === null ? 'Loading' : `Loading customer ${state.custNum}`;
      case 'notFound':
        return `Customer ${state.custNum} was not found`;
      case 'error':
        return 'Unable to open the customer form';
      case 'ready':
        return `Customer ${state.custNum}`;
    }
  }

  private getShellMessage(): string {
    const state = this.state();

    switch (this.shellStage()) {
      case 'loading':
        return state.custNum === null
          ? 'Preparing the Sports2000 customer shell.'
          : `Fetching customer ${state.custNum} through ${environment.app.customerDatasourceName}.`;
      case 'notFound':
        return `The backend returned no record for customer ${state.custNum}.`;
      case 'error':
        return state.errorMessage ?? 'An unexpected error occurred while opening the customer form.';
      case 'ready':
        return 'The customer form is ready.';
    }
  }

  private toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }
}
