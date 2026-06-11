FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY mcp-server/package.json ./mcp-server/
RUN pnpm install --filter @bruce/mcp-server

COPY mcp-server ./mcp-server
WORKDIR /app/mcp-server
RUN pnpm run build

ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
