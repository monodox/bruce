import { AppIcon } from '@/components/shared/app-icon'
import { ThemeToggle } from '@/components/shared/theme-toggle'

export function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background px-4 py-5 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AppIcon size={32} />
          <span className="text-xl font-semibold">Bruce</span>
        </div>
        <nav className="flex items-center gap-2">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
