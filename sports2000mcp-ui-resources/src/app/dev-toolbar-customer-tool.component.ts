import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';

@Component({
  selector: 'app-dev-toolbar-customer-tool',
  standalone: false,
  providers: [
    {
      provide: ToolBarToolComponent,
      useExisting: forwardRef(() => DevToolbarCustomerToolComponent)
    }
  ],
  template: `
    <ng-template #toolbarTemplate>
        <kendo-numerictextbox
          class="dev-toolbar__input"
          format="n0"
          class="w-100"
          [min]="1"
          [spinners]="false"
          [value]="value"
          (valueChange)="valueChange.emit($event)"
        ></kendo-numerictextbox>
    </ng-template>

    <ng-template #sectionTemplate>
      <ng-container [ngTemplateOutlet]="toolbarTemplate"></ng-container>
    </ng-template>

    <ng-template #popupTemplate>
      <ng-container [ngTemplateOutlet]="toolbarTemplate"></ng-container>
    </ng-template>
  `
})
export class DevToolbarCustomerToolComponent extends ToolBarToolComponent {
  @Input() value: number | null = null;
  @Output() valueChange = new EventEmitter<number | null>();
}
