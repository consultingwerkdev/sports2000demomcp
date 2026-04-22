import { Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import {
  SmartAuthenticationService,
  SmartFilterDescriptor,
  SmartFormComponent,
  SmartServiceAdapter
} from '@consultingwerk/smartcomponent-library';
import { firstValueFrom } from 'rxjs';
import { applyDocumentTheme, applyHostStyleVariables, resolveDocumentTheme } from './host-theme-utils';
import { MCP_APP_BRIDGE, McpAppBridgePort } from './mcp-app-bridge.port';
import { McpAppStatus } from './mcp-app.types';

const SPORTS2000_SERVICE_URI = 'https://sfrbo.consultingwerkcloud.com:8821';
const SPORTS2000_FORM_NAME = 'Sports2000Mcp_CustomerForm';
const CUSTOMER_DATASOURCE_NAME = 'CustomerDataSource';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly authService = inject(SmartAuthenticationService);
  protected readonly serviceAdapter = inject(SmartServiceAdapter);
  protected readonly bridge = inject<McpAppBridgePort>(MCP_APP_BRIDGE);
  protected readonly form = viewChild<SmartFormComponent>('form');
  protected readonly formName = SPORTS2000_FORM_NAME;

  protected readonly state = this.bridge.state;
  protected readonly isDevEmulator = this.bridge.isDevEmulator;
  protected readonly devCustNumInput = signal('');
  protected readonly shouldRenderForm = computed(() => {
    const state = this.state();
    return (
      this.serviceAdapter.stateSignal().authenticated &&
      state.custNum !== null &&
      (state.status === 'loadingCustomer' || state.status === 'ready')
    );
  });
  protected readonly isLoadingCustomer = computed(() => this.state().status === 'loadingCustomer');
  protected readonly statusHeadline = computed(() => this.getStatusHeadline(this.state().status));
  protected readonly statusMessage = computed(() => this.getStatusMessage());

  private readonly authInitialized = signal(false);
  private appliedHostVariableNames = new Set<string>();
  private authInFlight: Promise<void> | null = null;
  private customerLoadToken = 0;

  constructor() {
    effect(() => {
      const state = this.state();
      const theme = resolveDocumentTheme(state.hostTheme);

      applyDocumentTheme(theme);
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
      this.devCustNumInput.set(custNum === null ? '' : String(custNum));
    });

    effect(() => {
      const state = this.state();
      if (state.status !== 'authenticating' || state.custNum === null) {
        return;
      }

      void this.ensureAuthenticated();
    });

    effect(() => {
      const state = this.state();
      const form = this.form();
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

  protected onDevCustNumInput(value: string): void {
    this.devCustNumInput.set(value);
  }

  protected loadDevCustomer(): void {
    const rawValue = this.devCustNumInput().trim();
    const custNum = Number.parseInt(rawValue, 10);

    if (!rawValue || !Number.isInteger(custNum)) {
      this.bridge.setError('Enter a numeric customer number before loading the form.');
      return;
    }

    this.bridge.submitCustomerInput(custNum);
  }

  protected clearDevCustomer(): void {
    this.devCustNumInput.set('');
    this.bridge.clearCustomerInput();
  }

  private async ensureAuthenticated(): Promise<void> {
    if (this.serviceAdapter.stateSignal().authenticated) {
      this.bridge.setStatus('loadingCustomer');
      return;
    }

    if (this.authInFlight) {
      return this.authInFlight;
    }

    this.authInFlight = this.authenticate().finally(() => {
      this.authInFlight = null;
    });

    return this.authInFlight;
  }

  private async authenticate(): Promise<void> {
    try {
      if (!this.authInitialized()) {
        await this.authService.initialize(
          {
            strategy: 'hybridrealm'
          },
          {
            serviceURI: SPORTS2000_SERVICE_URI,
            credentials: {
              username: 'admin',
              password: 'password'
            }
          }
        );
        this.authInitialized.set(true);
      }

      await this.serviceAdapter.login();

      const currentState = this.state();
      if (currentState.custNum !== null && currentState.status === 'authenticating') {
        this.bridge.setStatus('loadingCustomer');
      }
    } catch (error) {
      this.bridge.setError(this.toErrorMessage(error, 'Authentication failed.'));
    }
  }

  private async loadCustomer(form: SmartFormComponent, custNum: number): Promise<void> {
    const loadToken = ++this.customerLoadToken;

    try {
      const customerDataSource$ = form.getFormDatasourceAsObservable(CUSTOMER_DATASOURCE_NAME);
      if (!customerDataSource$) {
        this.bridge.setError('The customer form does not expose a CustomerDataSource datasource.');
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

  private getStatusHeadline(status: McpAppStatus): string {
    switch (status) {
      case 'booting':
        return 'Connecting to the MCP host';
      case 'awaitingToolInput':
        return 'Waiting for a customer request';
      case 'authenticating':
        return 'Authenticating with Sports2000';
      case 'loadingCustomer':
        return `Loading customer ${this.state().custNum}`;
      case 'notFound':
        return `Customer ${this.state().custNum} was not found`;
      case 'error':
        return 'Unable to open the customer form';
      case 'ready':
        return `Customer ${this.state().custNum}`;
      default:
        return 'Sports2000 Customer Shell';
    }
  }

  private getStatusMessage(): string {
    const state = this.state();

    switch (state.status) {
      case 'booting':
        return 'The Angular shell is establishing its MCP Apps connection.';
      case 'awaitingToolInput':
        return 'The view is ready. It will stay neutral until an approved show-customer tool call provides a custNum.';
      case 'authenticating':
        return 'Signing in with the PoC credentials before loading the Smart Form.';
      case 'loadingCustomer':
        return `The Smart Form is fetching customer ${state.custNum} through CustomerDataSource.`;
      case 'notFound':
        return `The backend returned no record for customer ${state.custNum}.`;
      case 'error':
        return state.errorMessage ?? 'An unexpected error occurred while opening the customer form.';
      case 'ready':
        return 'The customer form is ready.';
      default:
        return 'Sports2000 Customer Shell';
    }
  }

  private toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }
}
