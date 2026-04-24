import { Injector, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { environment } from '../environments/environment';
import {
  provideSmartComponentLibrary,
  SMART_AUTHENTICATION_STRATEGY,
  SmartComponentLibraryModule
} from '@consultingwerk/smartcomponent-library';
import { McpFormComponent } from '../mcp-form/mcp-form.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DevToolbarCustomerToolComponent } from './dev-toolbar-customer-tool.component';
import { McpBearerAuthenticationStrategy } from './auth/mcp-bearer-auth.strategy';
import { DevMcpAppBridgeService } from './bridge/dev-mcp-app-bridge.service';
import { MCP_APP_BRIDGE } from './bridge/mcp-app-bridge.port';
import { McpAppBridgeService } from './bridge/mcp-app-bridge.service';

@NgModule({
  declarations: [
    App,
    McpFormComponent,
    DevToolbarCustomerToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SmartComponentLibraryModule,
    BrowserAnimationsModule,
    DialogsModule,
    InputsModule,
    LayoutModule,
    ToolBarModule,
    ButtonsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSmartComponentLibrary({
      serviceURI: environment.app.smartComponentLibraryServiceUri
    }),
    {
      provide: MCP_APP_BRIDGE,
      useFactory: (injector: Injector) =>
        environment.app.mode === 'dev-emulator'
          ? injector.get(DevMcpAppBridgeService)
          : injector.get(McpAppBridgeService),
      deps: [Injector]
    },
    {
      provide: SMART_AUTHENTICATION_STRATEGY,
      useClass: McpBearerAuthenticationStrategy,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
