# syntax=docker/dockerfile:1

# ---------- Build stage ----------
# Full toolchain: install all deps, generate the Prisma client, compile to dist.
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
# The `prisma-client` generator is Rust-free (driver adapter), so no query
# engine or OpenSSL is needed. prisma.config.ts resolves DATABASE_URL eagerly,
# but generation never connects, so a build-only placeholder satisfies it — the
# real URL is injected at runtime. build = tsc && tsc-alias (rewrites @/ aliases).
RUN DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
    yarn prisma generate && \
    yarn build

# ---------- Development stage ----------
# Used by docker-compose for the hot-reload workflow: it carries the full
# toolchain (tsx, prisma CLI) so compose's command override
# (prisma migrate deploy && prisma generate && prisma db push && yarn dev) works.
# Source is bind-mounted at runtime by compose; this image supplies node_modules.
FROM node:22-alpine AS development
WORKDIR /app
ENV NODE_ENV=development

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
EXPOSE 4000
CMD ["yarn", "dev"]

# ---------- Production stage ----------
# Slim runtime: production deps only + the compiled output. No source, no tsx,
# no dev toolchain. Render builds this final stage by default.
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Runtime dependencies only (the compiled Prisma client ships inside dist/).
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Compiled application (dist/src + dist/prisma/generated).
COPY --from=build /app/dist ./dist

# Schema, migrations, and config so the Render preDeployCommand can run
# `prisma migrate deploy` against the production database before traffic switches.
COPY --from=build /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=build /app/prisma/migrations ./prisma/migrations
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

# Drop root privileges.
USER node

EXPOSE 4000

# Liveness probe for the container runtime (Node 22 has global fetch). Uses the
# runtime PORT (Render injects its own) and falls back to 4000 for local runs.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "const p=process.env.PORT||4000; fetch('http://localhost:'+p+'/healthz').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# node as PID 1 receives SIGTERM directly, so graceful shutdown works.
CMD ["node", "dist/src/index.js"]
