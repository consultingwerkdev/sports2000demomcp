import { Sports2000AppAuthTarget } from './sports2000-app-auth-target.interface';

/**
 * Describes the per-mode authentication configuration for the shell.
 *
 * @memberof Sports2000AppConfig
 */
export interface Sports2000AppAuthConfig {
  devEmulator: Sports2000AppAuthTarget;
  mcpHost: Sports2000AppAuthTarget;
}
