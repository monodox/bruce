FROM node:18-alpine AS base

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY mcp-server/package.json ./mcp-server/

RUN pnpm install --filter @bruce/mcp-server

COPY mcp-server ./mcp-server

WORKDIR /app/mcp-server
RUN pnpm run build

ENV NODE_ENV=production

# MCP Servers communicate over STDIO, so we just run the index file.
CMD ["pnpm", "start"]
