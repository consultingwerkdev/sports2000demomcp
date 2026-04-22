import { Injector, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideSmartComponentLibrary, SmartComponentLibraryModule } from '@consultingwerk/smartcomponent-library';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { McpFormComponent } from '../mcp-form/mcp-form.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DevMcpAppBridgeService } from './dev-mcp-app-bridge.service';
import { MCP_APP_BRIDGE } from './mcp-app-bridge.port';
import { McpAppBridgeService } from './mcp-app-bridge.service';

declare const __SPORTS2000_NG_SERVE_EMULATOR__: boolean;

@NgModule({
  declarations: [
    App,
    McpFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SmartComponentLibraryModule,
    BrowserAnimationsModule,
    DialogsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSmartComponentLibrary({
      serviceURI: 'https://sfrbo.consultingwerkcloud.com:8821'
    }),
    {
      provide: MCP_APP_BRIDGE,
      useFactory: (injector: Injector) =>
        __SPORTS2000_NG_SERVE_EMULATOR__
          ? injector.get(DevMcpAppBridgeService)
          : injector.get(McpAppBridgeService),
      deps: [Injector]
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
