# Contributing to Bruce Frontend

Thank you for your interest in contributing to the Bruce frontend! This package is part of the [monodox/bruce](https://github.com/monodox/bruce) monorepo.

## Getting Started

1. Fork the repository at https://github.com/monodox/bruce
2. Clone your fork: `git clone https://github.com/your-username/bruce.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies from root: `pnpm install`
5. Make your changes in `frontend/`
6. Run lint: `pnpm lint`
7. Build the project: `pnpm build`
8. Commit your changes: `git commit -m "feat(frontend): add your feature"`
9. Push to your fork: `git push origin feature/your-feature-name`
10. Open a Pull Request

## Development Setup

```bash
git clone https://github.com/monodox/bruce.git
cd bruce
pnpm install
cp frontend/.env.example frontend/.env.local
cd frontend && pnpm dev
```

## Branch Naming

- `feature/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation changes
- `refactor/` — Code refactoring
- `chore/` — Maintenance tasks

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) with scopes:

- `feat(frontend):` — A new frontend feature
- `fix(frontend):` — A frontend bug fix
- `docs(frontend):` — Documentation only changes
- `style(frontend):` — Formatting changes
- `refactor(frontend):` — Code refactoring

## Code Style

- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible
- Use Tailwind CSS for styling
- Use shadcn/ui components when applicable
- Add Lucide React icons where appropriate

## Reporting Bugs

Open an issue at https://github.com/monodox/bruce/issues with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS details

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.
