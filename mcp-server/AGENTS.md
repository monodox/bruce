# AGENTS.md — MCP Server

## Setup commands
- Install deps: `pnpm install` (from monorepo root)
- Start dev: `pnpm dev`
- Build: `pnpm build`
- Start production: `pnpm start`

## Requirements
- Node.js 24+
- pnpm 10+

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- ES Modules (`"type": "module"`)
- Use functional patterns where possible

## Environment variables
- `DYNATRACE_ENV_URL` — Dynatrace environment URL
- `DYNATRACE_API_TOKEN` — Dynatrace API token with read scopes

## Architecture
- Uses `@modelcontextprotocol/sdk` for MCP protocol
- Communicates via STDIO transport
- Bridges Dynatrace REST API to AI agents
- Tools: get_failing_traces, get_token_metrics, get_problems, get_agent_health
- Falls back to mock data when Dynatrace is not configured
