import { Sports2000AppConfig } from '../app/core/config/sports2000-app-config';

/**
 * Describes the Angular environment object exported by each build target.
 *
 * @memberof Sports2000Environment
 */
export interface Sports2000Environment {
  production: boolean;
  app: Sports2000AppConfig;
}
