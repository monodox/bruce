# Bruce Frontend

A modern web application built with Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, and Lucide React.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bruce.git
cd bruce/frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start development server   |
| `npm run build` | Build for production       |
| `npm run start` | Start production server    |
| `npm run lint`  | Run ESLint                 |

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
    └── utils.ts        # Utility functions
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Redirects to `/auth/login` |
| `/auth/login` | Login page |
| `/auth/signup` | Sign up page |
| `/auth/forgot` | Forgot password |
| `/auth/reset` | Reset password |
| `/console/overview` | Console dashboard |
| `/console/agents` | Agent management |
| `/console/alerts` | Alert rules |
| `/console/anomalies` | Anomaly detection |
| `/console/diagnose` | Root cause analysis |
| `/console/playbooks` | Automated playbooks |
| `/console/settings` | App settings |
| `/console/tokens` | API tokens |
| `/console/traces` | Distributed traces |
| `/legal/terms` | Terms of service |
| `/legal/cookies` | Cookie policy |
| `/legal/privacy` | Privacy policy |

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Security

Please see [SECURITY.md](SECURITY.md) for reporting vulnerabilities.
