# AGENTS.md

## Setup commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Run tests: `pnpm test`
- Build all: `pnpm build`
- Lint all: `pnpm lint`

## Requirements
- Node.js 24+
- pnpm 10+

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible
- ES Modules (`"type": "module"`)

## Architecture
- Monorepo: pnpm workspaces + Turborepo
- Frontend: Next.js 16, React 19, Tailwind CSS v4, shadcn/ui
- Backend: Express 5, TypeScript
- MCP Server: @modelcontextprotocol/sdk
- AI Model: gemini-3.5-flash (Google Cloud Agent Builder)
- Observability: Dynatrace + Bindplane + OpenTelemetry
