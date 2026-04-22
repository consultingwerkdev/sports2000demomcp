import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideSmartComponentLibrary, SmartComponentLibraryModule } from '@consultingwerk/smartcomponent-library';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { McpFormComponent } from '../mcp-form/mcp-form.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';

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
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
