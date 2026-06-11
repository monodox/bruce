# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- MCP Server (`@bruce/mcp-server`) using `@modelcontextprotocol/sdk` as a bridge to Dynatrace API
- GCP Agent Builder system instructions for the Gemini diagnostic agent
- Scaffolding for `packages/sdk-node` and `packages/sdk-python` OpenTelemetry wrappers
- Express backend with webhook endpoint for Bindplane alerts
- Docker Compose for full-stack local development (frontend, backend, MCP server, OTel collector)
- GitHub Actions workflows (CodeQL, dependency review, stale issues)
- Infrastructure configs (Terraform for GCP, Bindplane pipelines, Dynatrace dashboards)
- Comprehensive documentation (AGENTS.md, ARCHITECTURE.md)

## [0.2.0] - 2024-06-09

### Changed

- Transitioned to AI observability copilot architecture
- Monorepo workspace expanded to include `mcp-server` and `packages/*`
- Backend scaffolded with Express and webhook routes
- Frontend restructured with `auth`, `console`, and `legal` route groups

## [0.1.0] - 2024-06-01

### Added

- Initial project scaffolding
- pnpm + Turborepo monorepo structure
- Next.js 14 frontend with shadcn/ui components
- Tailwind CSS with light/dark theme
- Base configuration files

[Unreleased]: https://github.com/monodox/bruce/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/monodox/bruce/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/monodox/bruce/releases/tag/v0.1.0
