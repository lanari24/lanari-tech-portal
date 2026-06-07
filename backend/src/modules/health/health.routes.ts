import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler.js';
import { prisma } from '../../lib/prisma.js';
import { redis } from '../../lib/redis.js';

export const healthRouter = Router();

/** Liveness — process is up. */
healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'lanari-portal-api' });
});

/** Readiness — dependencies reachable. */
healthRouter.get(
  '/ready',
  asyncHandler(async (_req, res) => {
    const checks: Record<string, 'up' | 'down'> = { database: 'down', redis: 'down' };

    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = 'up';
    } catch {
      /* leave down */
    }

    try {
      const pong = await redis.ping();
      checks.redis = pong === 'PONG' ? 'up' : 'down';
    } catch {
      /* leave down */
    }

    const healthy = Object.values(checks).every((s) => s === 'up');
    res.status(healthy ? 200 : 503).json({ status: healthy ? 'ready' : 'degraded', checks });
  }),
);
