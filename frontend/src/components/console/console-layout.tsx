'use client'

import { ConsoleSidebar } from './console-sidebar'
import { ConsoleHeader } from './console-header'
import { ConsoleProvider, useConsole } from './console-context'
import { CommandSearch } from '@/components/shared/command-search'
import { cn } from '@/lib/utils'

function ConsoleContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useConsole()

  return (
    <main
      className={cn(
        'pt-[65px] transition-all duration-200',
        'md:pl-64',
        collapsed && 'md:pl-[72px]'
      )}
    >
      <div className="p-4 md:p-6">{children}</div>
    </main>
  )
}

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsoleProvider>
      <div className="min-h-screen">
        <ConsoleSidebar />
        <ConsoleHeader />
        <ConsoleContent>{children}</ConsoleContent>
        <CommandSearch />
      </div>
    </ConsoleProvider>
  )
}
