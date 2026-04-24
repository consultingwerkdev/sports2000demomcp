import { Injectable, computed, signal } from '@angular/core';
import { McpUiAuthPayload } from './mcp-ui-auth.types';

@Injectable({ providedIn: 'root' })
export class McpUiAuthSessionService {
  private readonly payloadSignal = signal<McpUiAuthPayload | null>(null);

  readonly payload = this.payloadSignal.asReadonly();
  readonly accessToken = computed(() => this.payloadSignal()?.accessToken ?? null);

  setPayload(payload: McpUiAuthPayload | null): void {
    this.payloadSignal.set(payload);
  }

  clear(): void {
    this.payloadSignal.set(null);
  }

  hasPayload(): boolean {
    return this.payloadSignal() !== null;
  }

  getPayloadOrThrow(): McpUiAuthPayload {
    const payload = this.payloadSignal();
    if (!payload) {
      throw new Error('The MCP bearer token is not available yet.');
    }

    return payload;
  }

  getExpiresAt(): Date | null {
    const expiresAtUtc = this.payloadSignal()?.expiresAtUtc;
    if (!expiresAtUtc) {
      return null;
    }

    const expiresAt = new Date(expiresAtUtc);
    return Number.isNaN(expiresAt.getTime()) ? null : expiresAt;
  }

  secondsUntilExpiry(now = new Date()): number | null {
    const expiresAt = this.getExpiresAt();
    if (!expiresAt) {
      return null;
    }

    return Math.floor((expiresAt.getTime() - now.getTime()) / 1000);
  }

  isExpiringSoon(minValiditySeconds = 30, now = new Date()): boolean {
    const secondsUntilExpiry = this.secondsUntilExpiry(now);
    if (secondsUntilExpiry === null) {
      return true;
    }

    return secondsUntilExpiry <= minValiditySeconds;
  }
}
