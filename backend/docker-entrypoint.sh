#!/bin/sh
# Ensures the Prisma client exists and the database schema is in place before
# starting the server. Postgres readiness is guaranteed by compose healthchecks.
set -e

echo "[entrypoint] Generating Prisma client..."
npx prisma generate >/dev/null 2>&1 || true

if [ -d "prisma/migrations" ] && [ -n "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  echo "[entrypoint] Applying migrations (prisma migrate deploy)..."
  npx prisma migrate deploy
else
  echo "[entrypoint] No migration files; syncing schema (prisma db push)..."
  npx prisma db push --skip-generate
fi

echo "[entrypoint] Starting: $*"
exec "$@"
