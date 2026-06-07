import { createApp } from './app.js';
import { env } from './env.js';
import { prisma } from './lib/prisma.js';
import { connectRedis, redis } from './lib/redis.js';

async function main() {
  // Eagerly connect dependencies so readiness reflects reality immediately.
  await prisma.$connect();
  await connectRedis().catch((err) =>
    console.warn('[startup] Redis not ready yet:', err.message),
  );

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Lanari Portal API listening on :${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received — shutting down...`);
    server.close();
    await prisma.$disconnect();
    redis.disconnect();
    process.exit(0);
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
