# Production edge image: build the frontend, then serve it from Nginx with an
# /api reverse proxy. Build context is the repo root (see docker-compose.prod.yml).

# ---- Stage 1: build the frontend static bundle ----
FROM node:20-alpine AS frontend-build
WORKDIR /app

# API base URL is baked into the bundle at build time.
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: nginx serving the bundle ----
FROM nginx:1.27-alpine
COPY nginx/prod.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
