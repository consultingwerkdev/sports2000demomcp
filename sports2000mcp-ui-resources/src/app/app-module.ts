import { Injector, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {
  provideSmartComponentLibrary,
  SMART_AUTHENTICATION_STRATEGY,
  SmartComponentLibraryModule
} from '@consultingwerk/smartcomponent-library';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { McpFormComponent } from '../mcp-form/mcp-form.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DevToolbarCustomerToolComponent } from './dev-toolbar-customer-tool.component';
import { DevMcpAppBridgeService } from './dev-mcp-app-bridge.service';
import { MCP_APP_BRIDGE } from './mcp-app-bridge.port';
import { McpAppBridgeService } from './mcp-app-bridge.service';
import { McpBearerAuthenticationStrategy } from './mcp-bearer-auth.strategy';

declare const __SPORTS2000_NG_SERVE_EMULATOR__: boolean;

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
      serviceURI: 'https://sfrbo.consultingwerkcloud.com:8821/smartkeycloak'
    }),
    {
      provide: MCP_APP_BRIDGE,
      useFactory: (injector: Injector) =>
        __SPORTS2000_NG_SERVE_EMULATOR__
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
