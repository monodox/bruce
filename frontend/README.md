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
├── app/            # Next.js App Router pages and layouts
├── components/
│   └── ui/         # shadcn/ui components
└── lib/            # Utility functions
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Security

Please see [SECURITY.md](SECURITY.md) for reporting vulnerabilities.
