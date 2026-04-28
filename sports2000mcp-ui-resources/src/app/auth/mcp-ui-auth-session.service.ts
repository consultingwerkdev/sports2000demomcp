import { Injectable, computed, signal } from '@angular/core';
import { McpUiAuthPayload } from './mcp-ui-auth.types';

/**
 * Stores the current host-managed bearer token payload for the Angular shell.
 *
 * @memberof McpUiAuth
 */
@Injectable({ providedIn: 'root' })
export class McpUiAuthSessionService {
  private readonly payloadSignal = signal<McpUiAuthPayload | null>(null);

  readonly payload = this.payloadSignal.asReadonly();
  readonly accessToken = computed(() => this.payloadSignal()?.accessToken ?? null);

  /**
   * Replaces the current auth payload with a fresh host-issued token payload.
   *
   * @param {McpUiAuthPayload | null} payload - The payload to store for later token access.
   * @memberof McpUiAuthSessionService
   */
  setPayload(payload: McpUiAuthPayload | null): void {
    this.payloadSignal.set(payload);
  }

  /**
   * Clears the stored host-managed bearer token payload.
   *
   * @memberof McpUiAuthSessionService
   */
  clear(): void {
    this.payloadSignal.set(null);
  }

  /**
   * Indicates whether a bearer token payload is currently cached.
   *
   * @returns {boolean} - True when a payload is present.
   * @memberof McpUiAuthSessionService
   */
  hasPayload(): boolean {
    return this.payloadSignal() !== null;
  }

  /**
   * Returns the current payload or throws when no bearer token is available.
   *
   * @returns {McpUiAuthPayload} - The current host-managed bearer token payload.
   * @memberof McpUiAuthSessionService
   */
  getPayloadOrThrow(): McpUiAuthPayload {
    const payload = this.payloadSignal();
    if (!payload) {
      throw new Error('The MCP bearer token is not available yet.');
    }

    return payload;
  }

  /**
   * Parses the payload expiry timestamp into a Date value.
   *
   * @returns {Date | null} - The parsed expiry date, if valid.
   * @memberof McpUiAuthSessionService
   */
  getExpiresAt(): Date | null {
    const expiresAtUtc = this.payloadSignal()?.expiresAtUtc;
    if (!expiresAtUtc) {
      return null;
    }

    const expiresAt = new Date(expiresAtUtc);
    return Number.isNaN(expiresAt.getTime()) ? null : expiresAt;
  }

  /**
   * Calculates the remaining lifetime of the cached bearer token.
   *
   * @param {Date} now - The reference time used for the calculation.
   * @returns {number | null} - The number of whole seconds until expiry, if known.
   * @memberof McpUiAuthSessionService
   */
  secondsUntilExpiry(now = new Date()): number | null {
    const expiresAt = this.getExpiresAt();
    if (!expiresAt) {
      return null;
    }

    return Math.floor((expiresAt.getTime() - now.getTime()) / 1000);
  }

  /**
   * Indicates whether the current token is missing or near expiry.
   *
   * @param {number} minValiditySeconds - The minimum acceptable remaining lifetime in seconds.
   * @param {Date} now - The reference time used for the calculation.
   * @returns {boolean} - True when the token should be considered expiring soon.
   * @memberof McpUiAuthSessionService
   */
  isExpiringSoon(minValiditySeconds = 30, now = new Date()): boolean {
    const secondsUntilExpiry = this.secondsUntilExpiry(now);
    if (secondsUntilExpiry === null) {
      return true;
    }

    return secondsUntilExpiry <= minValiditySeconds;
  }
}
