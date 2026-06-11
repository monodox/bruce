import { ThemeToggle } from '@/components/shared/theme-toggle'

export function ConsoleHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-20 border-b bg-background px-6 py-4 md:left-64">
      <div className="flex items-center justify-between">
        <div className="pl-10 md:pl-0">
          <h2 className="text-lg font-medium">Console</h2>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
