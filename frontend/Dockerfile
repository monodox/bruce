FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
COPY mcp-server/package.json ./mcp-server/
COPY packages/sdk-node/package.json ./packages/sdk-node/
COPY packages/sdk-python/pyproject.toml ./packages/sdk-python/
COPY packages/shared-types/package.json ./packages/shared-types/
RUN pnpm install

# Build the frontend
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @bruce/frontend build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/frontend/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./frontend/.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "frontend/server.js"]
