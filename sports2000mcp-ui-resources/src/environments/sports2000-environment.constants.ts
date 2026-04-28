import { Sports2000AuthCredentials } from '../app/core/config/sports2000-auth-credentials.interface';
import { Sports2000AppAuthTarget } from '../app/core/config/sports2000-app-auth-target.interface';

/**
 * Represents the base SmartService endpoint shared by all environments.
 *
 * @memberof Sports2000Environment
 */
export const SPORTS2000_SERVICE_URI = 'https://sfrbo.consultingwerkcloud.com:8821';

/**
 * Represents the Keycloak-enabled service endpoint shared by hosted environments.
 *
 * @memberof Sports2000Environment
 */
export const SPORTS2000_KEYCLOAK_SERVICE_URI = `${SPORTS2000_SERVICE_URI}/smartkeycloak`;

/**
 * Represents the SmartForm name rendered by the customer shell.
 *
 * @memberof Sports2000Environment
 */
export const SPORTS2000_FORM_NAME = 'Sports2000Mcp_CustomerForm';

/**
 * Represents the datasource name used to load a single customer record.
 *
 * @memberof Sports2000Environment
 */
export const SPORTS2000_CUSTOMER_DATASOURCE_NAME = 'CustomerDataSource';

/**
 * Represents the static emulator credentials used for local development flows.
 *
 * @memberof Sports2000Environment
 */
export const SPORTS2000_DEV_EMULATOR_CREDENTIALS: Sports2000AuthCredentials = {
  username: 'admin',
  password: 'password'
};

/**
 * Represents the shared local-emulator authentication target configuration.
 *
 * @memberof Sports2000Environment
 */
export const SPORTS2000_DEV_EMULATOR_AUTH_TARGET: Sports2000AppAuthTarget = {
  strategy: 'hybridrealm',
  serviceUri: SPORTS2000_SERVICE_URI,
  credentials: SPORTS2000_DEV_EMULATOR_CREDENTIALS
};

/**
 * Represents the shared MCP-host authentication target configuration.
 *
 * @memberof Sports2000Environment
 */
export const SPORTS2000_MCP_HOST_AUTH_TARGET: Sports2000AppAuthTarget = {
  strategy: 'mcpbearer',
  serviceUri: SPORTS2000_KEYCLOAK_SERVICE_URI
};
