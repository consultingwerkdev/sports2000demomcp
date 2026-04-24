import { Component, effect, inject, viewChild } from '@angular/core';
import { SmartFormComponent } from '@consultingwerk/smartcomponent-library';
import { CustomerShellFacade } from './customer-shell/customer-shell.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  private readonly facade = inject(CustomerShellFacade);

  protected readonly form = viewChild<SmartFormComponent>('form');
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

  constructor() {
    effect(() => {
      this.facade.setForm(this.form());
    });
  }

  protected onDevCustNumInput(value: string): void {
    this.facade.onDevCustNumInput(value);
  }

  protected loadDevCustomer(): void {
    this.facade.loadDevCustomer();
  }

  protected clearDevCustomer(): void {
    this.facade.clearDevCustomer();
  }

  protected onDevCustNumValueChange(value: number | null): void {
    this.facade.onDevCustNumValueChange(value);
  }
}
