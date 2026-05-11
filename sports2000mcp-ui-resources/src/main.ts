/// <reference types="@angular/localize" />

import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

/**
 * Bootstraps the Sports2000 Angular shell in the browser.
 *
 * @memberof Main
 */
platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
