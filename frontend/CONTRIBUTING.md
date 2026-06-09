# Contributing to Bruce

Thank you for your interest in contributing! Here's how you can help.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/bruce.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Make your changes
6. Run lint: `npm run lint`
7. Build the project: `npm run build`
8. Commit your changes: `git commit -m "feat: add your feature"`
9. Push to your fork: `git push origin feature/your-feature-name`
10. Open a Pull Request

## Development Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
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

- Use TypeScript for all new files
- Follow the existing code patterns
- Use Tailwind CSS for styling
- Use shadcn/ui components when applicable
- Add Lucide React icons where appropriate

## Reporting Bugs

Open an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.
