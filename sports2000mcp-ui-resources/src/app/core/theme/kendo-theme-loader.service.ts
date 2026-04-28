import { Injectable } from '@angular/core';
import { McpUiTheme } from '../../bridge/mcp-app.types';
import { KENDO_THEME_LINK_ID, KENDO_THEME_PATHS } from './kendo-theme-loader.constants';

/**
 * Loads the host-matching Kendo stylesheet into the document head.
 *
 * @memberof KendoThemeLoader
 */
@Injectable({ providedIn: 'root' })
export class KendoThemeLoaderService {
  private activeTheme: McpUiTheme | null = null;

  /**
   * Applies the requested Kendo theme stylesheet when it is not already active.
   *
   * @param {McpUiTheme} theme - The theme to apply.
   * @memberof KendoThemeLoaderService
   */
  applyTheme(theme: McpUiTheme): void {
    if (this.activeTheme === theme) {
      return;
    }

    const themeLink = this.ensureThemeLink();
    themeLink.href = KENDO_THEME_PATHS[theme];
    this.activeTheme = theme;
  }

  /**
   * Ensures the dedicated Kendo theme link element exists in the document head.
   *
   * @returns {HTMLLinkElement} - The stylesheet link element used for theme switching.
   * @memberof KendoThemeLoaderService
   */
  private ensureThemeLink(): HTMLLinkElement {
    const existingLink = document.getElementById(KENDO_THEME_LINK_ID);
    if (existingLink instanceof HTMLLinkElement) {
      return existingLink;
    }

    const themeLink = document.createElement('link');
    themeLink.id = KENDO_THEME_LINK_ID;
    themeLink.rel = 'stylesheet';
    document.head.appendChild(themeLink);
    return themeLink;
  }
}
