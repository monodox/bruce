FROM node:18-alpine AS base

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY backend/package.json ./backend/
COPY packages/shared-types/package.json ./packages/shared-types/

RUN pnpm install --filter @bruce/backend --filter @bruce/shared-types

COPY backend ./backend
COPY packages/shared-types ./packages/shared-types

WORKDIR /app/backend
RUN pnpm run build

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD ["pnpm", "start"]
