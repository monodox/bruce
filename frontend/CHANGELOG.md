# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Console layout with sidebar, header, and content area (`ConsoleLayout`, `ConsoleHeader`, `ConsoleSidebar`)
- App layout with header and footer (`AppLayout`, `AppHeader`, `AppFooter`)
- Auth pages: login, signup, forgot password, reset password (`/auth/*`)
- Legal pages: terms, cookies, privacy (`/legal/*`)
- Console pages moved under `/console/*` route group (overview, agents, alerts, anomalies, diagnose, playbooks, settings, tokens, traces)
- Root redirects to `/auth/login`
- `/auth` redirects to `/auth/login`
- `/console` redirects to `/console/overview`
- `/legal` redirects to `/legal/terms`

### Changed

- Restructured app routes into `auth`, `console`, and `legal` groups
- Each route group uses its own nested layout

### Earlier

- Initial project setup with Next.js 14, TypeScript, and Tailwind CSS
- shadcn/ui component library integration (Button, Card, Input, Badge, Avatar, Separator)
- Lucide React icons
- Light and dark theme CSS variables
- Home page with demo components
- ESLint configuration

## [0.1.0] - 2024-01-01

### Added

- Project scaffolding
- Base configuration files
- Core UI components
