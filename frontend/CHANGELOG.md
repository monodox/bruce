# Changelog

All notable changes to the `@bruce/frontend` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Console layout with sidebar, header, and content area (`ConsoleLayout`, `ConsoleHeader`, `ConsoleSidebar`)
- App layout with header and footer (`AppLayout`, `AppHeader`, `AppFooter`)
- Auth pages: login, signup, forgot password, reset password (`/auth/*`)
- Legal pages: terms, cookies, privacy (`/legal/*`)
- Console pages under `/console/*` (overview, agents, alerts, anomalies, diagnose, playbooks, settings, tokens, traces)
- Root redirects to `/auth/login`
- Route group layouts with nested navigation

### Changed

- Restructured app routes into `auth`, `console`, and `legal` groups

## [0.1.0] - 2024-06-01

### Added

- Initial Next.js 14 setup with TypeScript
- Tailwind CSS with light/dark theme CSS variables
- shadcn/ui components (Button, Card, Input, Badge, Avatar, Separator)
- Lucide React icons
- ESLint configuration
- Project scaffolding

[Unreleased]: https://github.com/monodox/bruce/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/monodox/bruce/releases/tag/v0.1.0
