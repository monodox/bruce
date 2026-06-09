# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initialization of `mcp-server` directory using `@modelcontextprotocol/sdk` to act as an bridge to Dynatrace.
- Setup of `agent-builder` with system instructions for the Gemini diagnostic agent.
- Scaffolding for `packages/sdk-node` and `packages/sdk-python` OpenTelemetry wrappers.
- Initialization of Express backend to receive webhook events.
- Updated documentation across monorepo packages (added `AGENTS.md` guidelines).

## [0.2.0] - 2024-06-09

### Changed

- Transitioned the project to an observability copilot architecture based on hackathon requirements.
- Updated the monorepo workspace to include `mcp-server` and `packages/*`.
- Replaced `.gitkeep` with structured scaffolding in `backend` and `infra`.

## [0.1.0] - 2024-01-01

### Added

- Project scaffolding
- Monorepo structure with Next.js frontend package
- Base configuration files
- Core UI components (shadcn/ui)
