import { Redis } from 'ioredis';
import { env } from '../env.js';

/**
 * Shared Redis connection — used for refresh-token rotation/denylist, rate
 * limiting and (later) telemetry pub/sub. lazyConnect so import order can't
 * trigger a connection before the app is ready.
 */
export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

redis.on('error', (err) => {
  console.error('[redis] connection error:', err.message);
});

export async function connectRedis(): Promise<void> {
  if (redis.status === 'ready' || redis.status === 'connecting') return;
  await redis.connect();
}
