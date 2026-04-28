import { Sports2000Environment } from './sports2000-environment.interface';
import {
  SPORTS2000_CUSTOMER_DATASOURCE_NAME,
  SPORTS2000_DEV_EMULATOR_AUTH_TARGET,
  SPORTS2000_FORM_NAME,
  SPORTS2000_KEYCLOAK_SERVICE_URI,
  SPORTS2000_MCP_HOST_AUTH_TARGET,
  SPORTS2000_SERVICE_URI
} from './sports2000-environment.constants';

/**
 * Represents the local development environment configuration used by `ng serve`.
 *
 * @memberof Sports2000Environment
 */
export const environment: Sports2000Environment = {
  production: false,
  app: {
    mode: 'dev-emulator',
    assetBaseUrl: '',
    smartComponentLibraryServiceUri: SPORTS2000_SERVICE_URI,
    smartServiceUri: SPORTS2000_SERVICE_URI,
    keycloakServiceUri: SPORTS2000_KEYCLOAK_SERVICE_URI,
    formName: SPORTS2000_FORM_NAME,
    customerDatasourceName: SPORTS2000_CUSTOMER_DATASOURCE_NAME,
    auth: {
      devEmulator: SPORTS2000_DEV_EMULATOR_AUTH_TARGET,
      mcpHost: SPORTS2000_MCP_HOST_AUTH_TARGET
    }
  }
};
