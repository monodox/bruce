import { ConsoleSidebar } from './console-sidebar'
import { ConsoleHeader } from './console-header'

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <ConsoleSidebar />
      <div className="flex flex-1 flex-col">
        <ConsoleHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
