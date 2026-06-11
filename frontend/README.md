# @bruce/frontend

The web console for [Bruce](https://github.com/monodox/bruce) — an open-source AI Observability Copilot.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 10+

### Installation

```bash
# From the monorepo root
git clone https://github.com/monodox/bruce.git
cd bruce
pnpm install

# Or run frontend only
cd frontend
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── auth/           # Login, signup, forgot & reset password
│   ├── console/        # Main app console (overview, agents, alerts, anomalies, diagnose, playbooks, settings, tokens, traces)
│   ├── legal/          # Terms, cookies, privacy
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Redirects to /auth/login
├── components/
│   ├── ui/             # shadcn/ui primitives
│   ├── app-layout.tsx  # Header + footer layout (auth, legal)
│   ├── app-header.tsx  # Site header
│   ├── app-footer.tsx  # Site footer
│   ├── console-layout.tsx   # Sidebar + header layout (console)
│   ├── console-header.tsx   # Console header
│   └── console-sidebar.tsx  # Console sidebar
└── lib/
    └── utils.ts        # Utility functions (cn helper)
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/auth/login` |
| `/auth/login` | Login page |
| `/auth/signup` | Sign up page |
| `/auth/forgot` | Forgot password |
| `/auth/reset` | Reset password |
| `/console/overview` | Dashboard overview |
| `/console/agents` | Agent management |
| `/console/alerts` | Alert rules |
| `/console/anomalies` | Anomaly detection |
| `/console/diagnose` | Root cause analysis |
| `/console/playbooks` | Automated fix playbooks |
| `/console/settings` | App settings |
| `/console/tokens` | API tokens |
| `/console/traces` | Distributed traces |
| `/legal/terms` | Terms of service |
| `/legal/cookies` | Cookie policy |
| `/legal/privacy` | Privacy policy |

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT — see [LICENSE](LICENSE).
