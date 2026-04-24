import { Sports2000AppConfig } from '../app/core/config/sports2000-app-config';

const SPORTS2000_SERVICE_URI = 'https://sfrbo.consultingwerkcloud.com:8821';
const SPORTS2000_KEYCLOAK_SERVICE_URI = `${SPORTS2000_SERVICE_URI}/smartkeycloak`;

export const environment: { production: boolean; app: Sports2000AppConfig } = {
  production: false,
  app: {
    mode: 'dev-emulator',
    assetBaseUrl: '',
    smartComponentLibraryServiceUri: SPORTS2000_SERVICE_URI,
    smartServiceUri: SPORTS2000_SERVICE_URI,
    keycloakServiceUri: SPORTS2000_KEYCLOAK_SERVICE_URI,
    formName: 'Sports2000Mcp_CustomerForm',
    customerDatasourceName: 'CustomerDataSource',
    auth: {
      devEmulator: {
        strategy: 'hybridrealm',
        serviceUri: SPORTS2000_SERVICE_URI,
        credentials: {
          username: 'admin',
          password: 'password'
        }
      },
      mcpHost: {
        strategy: 'mcpbearer',
        serviceUri: SPORTS2000_KEYCLOAK_SERVICE_URI
      }
    }
  }
};
