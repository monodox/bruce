# AGENTS.md — Frontend

## Setup commands

- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Requirements

- Node.js 24+
- npm

## Code style

- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible
- React 19 + Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4 (CSS-first config via `@import 'tailwindcss'`)
- shadcn/ui components in `src/components/ui/`
- Lucide React icons
- `cn()` utility from `@/lib/utils` for class merging

## Project structure

```
src/
├── app/
│   ├── auth/              # Auth flow — uses AppLayout (header + footer)
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot/
│   │   ├── reset/
│   │   ├── layout.tsx
│   │   └── page.tsx       # Redirect → /auth/login
│   ├── console/           # Console — uses ConsoleLayout (sidebar + header)
│   │   ├── overview/
│   │   ├── agents/
│   │   ├── alerts/
│   │   ├── anomalies/
│   │   ├── diagnose/
│   │   ├── playbooks/
│   │   ├── settings/
│   │   ├── tokens/
│   │   ├── traces/
│   │   ├── layout.tsx
│   │   └── page.tsx       # Redirect → /console/overview
│   ├── legal/             # Legal pages — uses AppLayout
│   │   ├── terms/
│   │   ├── cookies/
│   │   ├── privacy/
│   │   ├── layout.tsx
│   │   └── page.tsx       # Redirect → /legal/terms
│   ├── globals.css        # Theme CSS variables & Tailwind import
│   ├── layout.tsx         # Root layout (ThemeProvider, Inter font, metadata)
│   └── page.tsx           # Root redirect → /auth/login
├── components/
│   ├── app/               # App shell (auth & legal pages)
│   │   ├── app-layout.tsx       # Fixed header + content + footer
│   │   ├── app-header.tsx       # Fixed, logo + theme toggle
│   │   ├── app-footer.tsx       # Logo + legal links + copyright
│   │   └── index.ts             # Barrel export
│   ├── console/           # Console shell
│   │   ├── console-layout.tsx   # Provider + sidebar + header + content
│   │   ├── console-header.tsx   # Fixed, search trigger (no border)
│   │   ├── console-sidebar.tsx  # Collapsible, responsive, nav + theme + toggle
│   │   ├── console-context.tsx  # React context for collapsed state
│   │   └── index.ts             # Barrel export
│   ├── shared/            # Cross-cutting components
│   │   ├── app-icon.tsx         # Theme-aware logo (dark/light images)
│   │   ├── command-search.tsx   # ⌘K universal search popup
│   │   ├── theme-provider.tsx   # next-themes wrapper
│   │   └── theme-toggle.tsx     # Dark → System → Light cycle button
│   └── ui/                # shadcn/ui primitives
│       ├── avatar.tsx, badge.tsx, button.tsx, card.tsx
│       ├── input.tsx, label.tsx, progress.tsx, separator.tsx
│       ├── skeleton.tsx, table.tsx, tabs.tsx, textarea.tsx
│       └── (add more via shadcn CLI as needed)
└── lib/
    └── utils.ts           # cn() — clsx + tailwind-merge
```

## Routing conventions

- Each route group (`auth`, `console`, `legal`) has its own `layout.tsx`
- Root pages in each group redirect to a default sub-page
- Console pages are wrapped with `ConsoleLayout` (collapsible sidebar + header)
- Auth and legal pages are wrapped with `AppLayout` (fixed header + footer)
- All pages export `metadata` with a `title` that feeds into the `%s | Bruce` template

## Component conventions

- Import app shell: `import { AppLayout } from '@/components/app'`
- Import console shell: `import { ConsoleLayout } from '@/components/console'`
- Import shared: `import { AppIcon } from '@/components/shared/app-icon'`
- Import UI: `import { Button } from '@/components/ui/button'`
- Barrel exports exist for `app/` and `console/` folders

## Theme

- Primary color: `#9440dd` (HSL 270 72% 55%) — same for light and dark
- Default theme: `light`
- Modes: dark, system, light (cycled via ThemeToggle)
- CSS variables defined in `globals.css` (`:root` and `.dark`)
- Theme-aware logo: `icon-dark.png` in light mode, `icon-light.png` in dark mode

## Key behaviors

- Sidebar defaults to collapsed (icons only)
- Sidebar auto-collapses when a nav link is clicked
- Console header has no border, contains only the search trigger
- Universal search opens with ⌘K / Ctrl+K, supports keyboard navigation
- All console pages use skeleton loading states (no mock data)
- Mobile: hamburger menu for sidebar, responsive grid layouts
