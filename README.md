# Bruce

Bruce is an AI-powered observability copilot that watches your AI agents in production — detecting anomalies, diagnosing root causes, and generating fix playbooks automatically, so your agents behave the way you expect, at every scale.

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui, Lucide React
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bruce.git
cd bruce

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start development server |
| `pnpm build`   | Build for production     |
| `pnpm start`   | Start production server  |
| `pnpm test`    | Run tests                |
| `pnpm lint`    | Run ESLint               |

## Project Structure

```
bruce/
├── frontend/       # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Pages and layouts
│   │   ├── components/ui/  # shadcn/ui components
│   │   └── lib/            # Utility functions
│   └── ...
├── AGENTS.md
├── README.md
├── LICENSE
└── ...
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Security

Please see [SECURITY.md](SECURITY.md) for reporting vulnerabilities.
