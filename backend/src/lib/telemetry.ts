import { Redis } from 'ioredis';
import { redis } from './redis.js';
import { env } from '../env.js';

/**
 * Telemetry bus backed by Redis pub/sub so the SSE stream works across multiple
 * backend replicas. CRUD services publish events; the SSE route subscribes.
 */
const CHANNEL = 'lanari:telemetry';

export type TelemetryLevel = 'OK' | 'WARN' | 'ERROR' | 'INFO';

export interface TelemetryEvent {
  level: TelemetryLevel;
  text: string;
  ts: string;
}

export async function publishTelemetry(level: TelemetryLevel, text: string): Promise<void> {
  const event: TelemetryEvent = { level, text, ts: new Date().toISOString() };
  try {
    await redis.publish(CHANNEL, JSON.stringify(event));
  } catch (err) {
    console.warn('[telemetry] publish failed:', (err as Error).message);
  }
}

/**
 * Opens a dedicated subscriber connection (a connection in subscribe mode can't
 * issue other commands, hence its own client). Caller must `.disconnect()`.
 */
export function subscribeTelemetry(onEvent: (event: TelemetryEvent) => void): Redis {
  const sub = new Redis(env.REDIS_URL, { lazyConnect: false });
  sub.on('error', (err) => console.warn('[telemetry] subscriber error:', err.message));
  void sub.subscribe(CHANNEL);
  sub.on('message', (_channel, message) => {
    try {
      onEvent(JSON.parse(message) as TelemetryEvent);
    } catch {
      /* ignore malformed */
    }
  });
  return sub;
}
