export type Sports2000AppMode = 'dev-emulator' | 'mcp-host';
export type Sports2000AuthStrategy = 'hybridrealm' | 'mcpbearer';

export interface Sports2000AuthCredentials {
  username: string;
  password: string;
}

export interface Sports2000AppConfig {
  mode: Sports2000AppMode;
  assetBaseUrl: string;
  smartComponentLibraryServiceUri: string;
  smartServiceUri: string;
  keycloakServiceUri: string;
  formName: string;
  customerDatasourceName: string;
  auth: {
    devEmulator: {
      strategy: Sports2000AuthStrategy;
      serviceUri: string;
      credentials?: Sports2000AuthCredentials;
    };
    mcpHost: {
      strategy: Sports2000AuthStrategy;
      serviceUri: string;
      credentials?: Sports2000AuthCredentials;
    };
  };
}
