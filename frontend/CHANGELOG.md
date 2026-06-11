# Changelog

All notable changes to the `@bruce/frontend` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Theme system** — next-themes integration with dark/system/light mode cycling
- **Theme-aware app icon** — shows `icon-light.png` in dark mode, `icon-dark.png` in light mode
- **Favicon & title template** — `favicon.png`, all pages render as `Page Name | Bruce`
- **Universal search** — ⌘K / Ctrl+K command palette to navigate pages instantly
- **Collapsible sidebar** — defaults collapsed (icons only), expands with toggle, auto-collapses on navigation
- **Responsive layouts** — fully responsive for mobile, tablet, and desktop
- **Mobile sidebar** — hamburger menu with overlay for small screens
- **Console context** — shared state for sidebar collapsed/expanded across header and content
- **Skeleton loading states** — all console pages show skeleton placeholders
- **UI components** — added Table, Tabs, Progress, Skeleton, Label, Textarea to `components/ui`
- **App shell** (`components/app/`) — AppLayout, AppHeader (fixed), AppFooter with logo + legal links
- **Console shell** (`components/console/`) — ConsoleLayout, ConsoleHeader (search bar), ConsoleSidebar (collapsible)
- **Shared components** (`components/shared/`) — AppIcon, ThemeProvider, ThemeToggle, CommandSearch
- **Auth pages** — login, signup, forgot password, reset password with AppIcon branding
- **Legal pages** — terms, cookies, privacy with Card-based layouts
- **Console pages** — overview, agents, alerts, anomalies, diagnose, playbooks, settings, tokens, traces
- **Route redirects** — `/` → `/auth/login`, `/auth` → `/auth/login`, `/console` → `/console/overview`, `/legal` → `/legal/terms`
- **Primary color** — `#9440dd` (270° 72% 55%) for both light and dark themes
- `.npmrc` with `audit-level=high` to suppress non-actionable moderate vulnerabilities

### Changed

- Restructured components into `app/`, `console/`, `shared/`, and `ui/` folders with barrel exports
- Console header — removed text label and bottom border, replaced with search trigger
- App header — fixed positioning with theme toggle
- Sidebar nav items use active route highlighting with primary color

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
