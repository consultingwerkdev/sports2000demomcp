import { Sports2000AuthCredentials } from './sports2000-auth-credentials.interface';
import { Sports2000AuthStrategy } from './sports2000-auth-strategy.type';

/**
 * Describes the authentication settings for a single runtime target.
 *
 * @memberof Sports2000AppConfig
 */
export interface Sports2000AppAuthTarget {
  strategy: Sports2000AuthStrategy;
  serviceUri: string;
  credentials?: Sports2000AuthCredentials;
}
