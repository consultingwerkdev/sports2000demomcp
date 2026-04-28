import { Sports2000AppAuthConfig } from './sports2000-app-auth-config.interface';
import { Sports2000AppMode } from './sports2000-app-mode.type';

/**
 * Describes the configuration consumed by the Sports2000 Angular shell.
 *
 * @memberof Sports2000AppConfig
 */
export interface Sports2000AppConfig {
  mode: Sports2000AppMode;
  assetBaseUrl: string;
  smartComponentLibraryServiceUri: string;
  smartServiceUri: string;
  keycloakServiceUri: string;
  formName: string;
  customerDatasourceName: string;
  auth: Sports2000AppAuthConfig;
}
