import { ConsoleSidebar } from './console-sidebar'
import { ConsoleHeader } from './console-header'

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ConsoleSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ConsoleHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
