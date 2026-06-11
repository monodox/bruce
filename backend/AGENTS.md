# AGENTS.md — Backend

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
- `PORT` — Server port (default 8080)
- `GOOGLE_CLOUD_PROJECT` — GCP project ID (bruce-499005)
- `GEMINI_API_KEY` — Google Gemini API key
- `GEMINI_MODEL` — Gemini model (default gemini-3.5-flash)
- `FIRESTORE_DATABASE` — Firestore database ID
- `DYNATRACE_ENV_URL` — Dynatrace environment URL
- `DYNATRACE_API_TOKEN` — Dynatrace API token

## Architecture
- Express 5 REST API
- Receives alert webhooks from Bindplane/Dynatrace
- Generates fix playbooks via Gemini (gemini-3.5-flash)
- Stores playbooks in Firestore
- Serves playbook data to frontend

## API Endpoints
- `GET /health` — Health check
- `POST /api/webhooks/alert` — Receive alert, generate playbook
- `GET /api/playbooks` — List all playbooks
- `GET /api/playbooks/:id` — Get single playbook
- `GET /api/agents` — List monitored agents
- `GET /api/overview` — Dashboard metrics
