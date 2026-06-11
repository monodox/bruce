# AGENTS.md

## Setup commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Run tests: `pnpm test`

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible

## Project structure

```
src/
├── app/
│   ├── auth/           # Auth pages (login, signup, forgot, reset) — uses AppLayout
│   ├── console/        # Console pages (overview, agents, alerts, etc.) — uses ConsoleLayout
│   ├── legal/          # Legal pages (terms, cookies, privacy) — uses AppLayout
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Root redirect → /auth/login
├── components/
│   ├── ui/             # shadcn/ui primitives
│   ├── app-layout.tsx  # Header + footer wrapper
│   ├── app-header.tsx  # Top-level site header
│   ├── app-footer.tsx  # Site footer
│   ├── console-layout.tsx   # Sidebar + header + content wrapper
│   ├── console-header.tsx   # Console header
│   └── console-sidebar.tsx  # Console sidebar navigation
└── lib/
    └── utils.ts        # Utility functions
```

## Routing conventions
- Each route group (`auth`, `console`, `legal`) has its own `layout.tsx`
- Root pages in each group redirect to a default sub-page
- Console pages are wrapped with `ConsoleLayout` (sidebar + header)
- Auth and legal pages are wrapped with `AppLayout` (header + footer)
