FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY backend/package.json ./backend/
COPY packages/shared-types/package.json ./packages/shared-types/
RUN pnpm install --filter @bruce/backend --filter @bruce/shared-types

COPY backend ./backend
COPY packages/shared-types ./packages/shared-types

WORKDIR /app/backend
RUN pnpm run build

ENV NODE_ENV=production
EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist/index.js"]
