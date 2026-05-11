import { Component, inject } from '@angular/core';
import { CustomerShellFacade } from './customer-shell/customer-shell.facade';

/**
 * Hosts the Sports2000 MCP customer shell component tree.
 *
 * @memberof AppShell
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  private readonly facade = inject(CustomerShellFacade);

  protected readonly formName = this.facade.formName;
  protected readonly state = this.facade.state;
  protected readonly isDevEmulator = this.facade.isDevEmulator;
  protected readonly devCustNumInput = this.facade.devCustNumInput;
  protected readonly loadingLogoUrl = this.facade.loadingLogoUrl;
  protected readonly shouldRenderForm = this.facade.shouldRenderForm;
  protected readonly shouldShowLoadingLogo = this.facade.shouldShowLoadingLogo;
  protected readonly shellStage = this.facade.shellStage;
  protected readonly shellTitle = this.facade.shellTitle;
  protected readonly shellMessage = this.facade.shellMessage;

  /**
   * Stores the raw customer number entered in the dev toolbar.
   *
   * @param {string} value - The raw toolbar value.
   * @memberof App
   */
  protected onDevCustNumInput(value: string): void {
    this.facade.onDevCustNumInput(value);
  }

  /**
   * Starts the dev-emulator customer load flow.
   *
   * @memberof App
   */
  protected loadDevCustomer(): void {
    this.facade.loadDevCustomer();
  }

  /**
   * Clears the dev-emulator customer selection.
   *
   * @memberof App
   */
  protected clearDevCustomer(): void {
    this.facade.clearDevCustomer();
  }

  /**
   * Stores the parsed numeric customer number emitted by the numeric textbox.
   *
   * @param {number | null} value - The parsed customer number value.
   * @memberof App
   */
  protected onDevCustNumValueChange(value: number | null): void {
    this.facade.onDevCustNumValueChange(value);
  }
}
