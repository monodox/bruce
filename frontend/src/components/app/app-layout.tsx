import { AppHeader } from './app-header'
import { AppFooter } from './app-footer'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 pt-[72px]">{children}</main>
      <AppFooter />
    </div>
  )
}
