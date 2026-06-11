# Contributing to Bruce

Thank you for your interest in contributing to Bruce! This is an open-source project and we welcome contributions of all kinds.

## Getting Started

1. Fork the repository at https://github.com/monodox/bruce
2. Clone your fork: `git clone https://github.com/your-username/bruce.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `pnpm install`
5. Make your changes
6. Run lint: `pnpm lint`
7. Run tests: `pnpm test`
8. Build the project: `pnpm build`
9. Commit your changes: `git commit -m "feat: add your feature"`
10. Push to your fork: `git push origin feature/your-feature-name`
11. Open a Pull Request against `main`

## Development Setup

```bash
git clone https://github.com/monodox/bruce.git
cd bruce
pnpm install
cp .env.example .env.local
pnpm dev
```

## Monorepo Structure

Bruce is a pnpm + Turborepo monorepo. Each package can be developed independently:

```bash
# Frontend only
cd frontend && pnpm dev

# Backend only
cd backend && pnpm dev

# MCP Server only
cd mcp-server && pnpm dev
```

## Branch Naming

- `feature/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation changes
- `refactor/` — Code refactoring
- `chore/` — Maintenance tasks

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — A new feature
- `fix:` — A bug fix
- `docs:` — Documentation only changes
- `style:` — Formatting, missing semicolons, etc.
- `refactor:` — Code change that neither fixes a bug nor adds a feature
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks

## Pull Request Guidelines

- Keep PRs focused and small
- Include a clear description of what changed and why
- Reference any related issues
- Ensure all checks pass before requesting review
- Update documentation if needed

## Code Style

- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible
- Use Tailwind CSS for styling (frontend)
- Use shadcn/ui components when applicable (frontend)
- Add Lucide React icons where appropriate (frontend)

## Reporting Bugs

Open an issue at https://github.com/monodox/bruce/issues with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, browser)

## Feature Requests

Open a discussion at https://github.com/monodox/bruce/discussions with your proposal. We love hearing ideas from the community.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.
