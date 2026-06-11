import { ConsoleSidebar } from './console-sidebar'
import { ConsoleHeader } from './console-header'

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <ConsoleSidebar />
      <ConsoleHeader />
      <main className="pt-[65px] md:pl-64">
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}
