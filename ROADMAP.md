# Roadmap

## Phase 1 — Foundation ✅

- [x] Monorepo setup (pnpm + Turborepo)
- [x] Next.js 14 frontend with shadcn/ui
- [x] Express backend with webhook endpoint
- [x] MCP Server scaffold with `@modelcontextprotocol/sdk`
- [x] GCP Agent Builder system instructions
- [x] Docker Compose for local development
- [x] OpenTelemetry collector config (Bindplane)
- [x] Dynatrace dashboard export
- [x] Terraform scaffolding for GCP
- [x] CI/CD workflows (GitHub Actions)
- [x] Project documentation

## Phase 2 — MCP Server (In Progress)

- [ ] Wire Dynatrace API calls (DQL queries) into MCP tools
- [ ] Add `get_anomalies` tool
- [ ] Add `get_agent_health` tool
- [ ] Add `get_playbook_history` tool
- [ ] Integration tests for MCP tools
- [ ] Publish as standalone npm package

## Phase 3 — Agent & Backend

- [ ] Connect Agent Builder to MCP Server via Cloud Run
- [ ] Implement playbook generation (Gemini)
- [ ] Firestore storage for playbooks
- [ ] Webhook trigger from Bindplane alerts → backend → agent
- [ ] Authentication (API tokens + NextAuth)
- [ ] Rate limiting and error handling

## Phase 4 — Frontend Console

- [ ] Real-time overview dashboard (traces, token spend, error rates)
- [ ] Agent management UI
- [ ] Playbook viewer and executor
- [ ] Anomaly timeline visualization
- [ ] Alert configuration UI
- [ ] Settings and token management
- [ ] Dark/light theme toggle

## Phase 5 — SDKs & Ecosystem

- [ ] `@bruce/sdk-node` — Node.js agent instrumentation
- [ ] `@bruce/sdk-python` — Python agent instrumentation
- [ ] `@bruce/shared-types` — Shared TypeScript interfaces
- [ ] CLI tool for local debugging
- [ ] VS Code / Kiro extension

## Phase 6 — Production & Scale

- [ ] Multi-tenant support
- [ ] RBAC (role-based access control)
- [ ] Audit logging
- [ ] Horizontal scaling (Cloud Run auto-scaling)
- [ ] Performance benchmarks
- [ ] SOC 2 / compliance readiness
- [ ] Public documentation site
