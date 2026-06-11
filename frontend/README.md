# @bruce/frontend

The web console for [Bruce](https://github.com/monodox/bruce) — an open-source AI Observability Copilot.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Theming:** next-themes (dark / light / system)

## Getting Started

### Prerequisites

- Node.js 24+
- npm

### Installation

```bash
git clone https://github.com/monodox/bruce.git
cd bruce/frontend

npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── auth/              # Auth flow (login, signup, forgot, reset)
│   ├── console/           # Main console (all operational pages)
│   ├── legal/             # Legal pages (terms, cookies, privacy)
│   ├── globals.css        # Theme tokens & Tailwind imports
│   ├── layout.tsx         # Root layout (ThemeProvider, fonts)
│   └── page.tsx           # Root redirect → /auth/login
├── components/
│   ├── app/               # App shell (header, footer, layout)
│   │   ├── app-layout.tsx
│   │   ├── app-header.tsx
│   │   ├── app-footer.tsx
│   │   └── index.ts
│   ├── console/           # Console shell (sidebar, header, layout, context)
│   │   ├── console-layout.tsx
│   │   ├── console-header.tsx
│   │   ├── console-sidebar.tsx
│   │   ├── console-context.tsx
│   │   └── index.ts
│   ├── shared/            # Shared components used across app & console
│   │   ├── app-icon.tsx          # Theme-aware app logo
│   │   ├── command-search.tsx    # Universal search (⌘K / Ctrl+K)
│   │   ├── theme-provider.tsx    # next-themes wrapper
│   │   └── theme-toggle.tsx      # Dark/System/Light cycle toggle
│   └── ui/                # shadcn/ui primitives
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       └── textarea.tsx
└── lib/
    └── utils.ts           # cn() utility
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/auth/login` |
| `/auth/login` | Sign in |
| `/auth/signup` | Create account |
| `/auth/forgot` | Request password reset |
| `/auth/reset` | Set new password |
| `/console` | Redirects to `/console/overview` |
| `/console/overview` | System dashboard |
| `/console/agents` | Agent management |
| `/console/alerts` | Alert rules & active alerts |
| `/console/anomalies` | Anomaly detection |
| `/console/diagnose` | Root cause analysis |
| `/console/playbooks` | Automated response workflows |
| `/console/settings` | Workspace settings |
| `/console/tokens` | API token management |
| `/console/traces` | Distributed trace explorer |
| `/legal` | Redirects to `/legal/terms` |
| `/legal/terms` | Terms of service |
| `/legal/cookies` | Cookie policy |
| `/legal/privacy` | Privacy policy |

## Features

- **Responsive** — fully responsive for mobile, tablet, and desktop
- **Collapsible sidebar** — defaults to collapsed (icons only), expands on click, auto-collapses on navigation
- **Universal search** — press ⌘K / Ctrl+K to search and navigate pages instantly
- **Theme switching** — cycles through Dark → System → Light with icon + label
- **Fixed header & sidebar** — only the page content scrolls
- **Skeleton loading** — all console pages show skeleton placeholders (ready for data fetching)
- **Theme-aware logo** — uses `icon-light.png` in dark mode, `icon-dark.png` in light mode
- **Favicon** — uses `public/favicon.png`
- **Title template** — all pages render as `Page Name | Bruce`

## Configuration

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables (API URL, etc.) |
| `components.json` | shadcn/ui configuration |
| `postcss.config.mjs` | PostCSS (Tailwind v4 plugin) |
| `next.config.mjs` | Next.js settings |
| `tsconfig.json` | TypeScript config with `@/` path alias |
| `.npmrc` | npm audit level set to `high` |

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT — see [LICENSE](LICENSE).
