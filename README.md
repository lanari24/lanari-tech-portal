# Lanari Tech Portal

The next-generation Lanari Tech Ltd portal — a public ecosystem showcase plus a
secure gateway/dashboard for **clients** and **students**. Successor to
`lanari-web`. Orchestrated entirely with Docker.

## Architecture

```
                     ┌──────────── Nginx edge ────────────┐
  browser ─────────► │  /     → frontend (React/Vite)      │
                     │  /api  → backend  (Express/TS)      │
                     └───────────────┬─────────────────────┘
            ┌──────────────┬─────────┼──────────┬───────────────┐
        frontend       backend     postgres    redis          minio
       (Vite/React)   (Node/TS)   (Prisma)   (sessions/   (document
                                              rate-limit)  storage)
```

| Service   | Tech                          | Dev port | Purpose                          |
|-----------|-------------------------------|----------|----------------------------------|
| nginx     | Nginx 1.27                    | 8080     | Edge reverse proxy / static host |
| frontend  | React 19 + Vite 6 + Tailwind 4| 3000     | Portal UI                        |
| backend   | Node 20 + Express + TypeScript| 4000     | REST API                         |
| postgres  | PostgreSQL 16 + Prisma        | 5432     | Primary datastore                |
| redis     | Redis 7                       | 6379     | Tokens / rate limit / telemetry  |
| minio     | MinIO                         | 9000/9001| S3-compatible document storage   |

## Quick start (development)

```bash
cp .env.example .env          # adjust secrets if you like
docker compose up --build     # builds + starts the full stack
```

Then open **http://localhost:8080**. The API is reachable at
`http://localhost:8080/api` (e.g. `GET /api/health`). The backend auto-syncs the
Prisma schema to Postgres on boot.

Seed demo data (admin user + sample projects/resources):

```bash
docker compose exec backend npm run db:seed
```

## Production

```bash
cp .env.example .env          # set strong secrets + real CORS_ORIGIN
docker compose -f docker-compose.prod.yml up -d --build
```

`web` (Nginx) serves the compiled frontend and proxies `/api` to the backend.

## Layout

```
.
├── docker-compose.yml         # dev stack
├── docker-compose.prod.yml    # prod stack
├── nginx/                     # edge proxy configs + prod image
├── frontend/                  # React + Vite app
└── backend/                   # Express + TypeScript API
    ├── prisma/schema.prisma   # data model
    └── src/
        ├── modules/           # feature modules (auth, health, …)
        ├── middleware/        # auth, validation, error handling
        └── lib/               # prisma, redis, helpers
```

## API (current)

| Method | Path                | Auth   | Description                         |
|--------|---------------------|--------|-------------------------------------|
| GET    | `/api/health`       | —      | Liveness                            |
| GET    | `/api/health/ready` | —      | Readiness (db + redis)              |
| POST   | `/api/auth/register`| —      | Create client/student account       |
| POST   | `/api/auth/login`   | —      | Login by access identifier or email |
| POST   | `/api/auth/refresh` | —      | Rotate tokens                       |
| POST   | `/api/auth/logout`  | —      | Revoke a refresh token              |
| GET    | `/api/auth/me`      | Bearer | Current user                        |

## Roadmap

- [x] Monorepo + Docker topology (frontend, backend, postgres, redis, minio, nginx)
- [x] Backend foundation + JWT auth (client/student roles)
- [ ] Wire frontend auth to the API (replace mocked login)
- [ ] Projects / resources / documents / events CRUD
- [ ] MinIO-backed document uploads
- [ ] Live telemetry stream (SSE/WebSocket)
- [ ] Claude-powered AI features
- [ ] CI image builds + deploy (retire `lanari-web`)
