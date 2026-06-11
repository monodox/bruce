import Link from 'next/link'
import { AppIcon } from '@/components/shared/app-icon'

export function AppFooter() {
  return (
    <footer className="border-t bg-background px-4 py-5 md:px-6">
      <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <AppIcon size={32} />
          <span className="text-xl font-semibold text-foreground">Bruce</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/legal/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
        </nav>
        <span>&copy; {new Date().getFullYear()} Bruce</span>
      </div>
    </footer>
  )
}
