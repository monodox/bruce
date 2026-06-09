FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
COPY mcp-server/package.json ./mcp-server/
COPY packages/sdk-node/package.json ./packages/sdk-node/
COPY packages/shared-types/package.json ./packages/shared-types/
RUN npm install -g pnpm && pnpm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm run build --filter frontend

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# Set the correct permission for prerender cache
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./frontend/.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "frontend/server.js"]
