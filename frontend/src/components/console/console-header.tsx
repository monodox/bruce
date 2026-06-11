'use client'

import { cn } from '@/lib/utils'
import { useConsole } from './console-context'
import { SearchTrigger } from '@/components/shared/command-search'

export function ConsoleHeader() {
  const { collapsed } = useConsole()

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-20 bg-background px-6 py-4 transition-all duration-200',
        'left-0 md:left-64',
        collapsed && 'md:left-[72px]'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="pl-10 md:pl-0 flex-1 max-w-sm">
          <SearchTrigger />
        </div>
      </div>
    </header>
  )
}
