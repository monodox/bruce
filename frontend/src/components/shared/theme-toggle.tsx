'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  collapsed?: boolean
}

export function ThemeToggle({ collapsed = false }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()

  const cycle = () => {
    if (theme === 'dark') setTheme('system')
    else if (theme === 'system') setTheme('light')
    else setTheme('dark')
  }

  const label = theme === 'dark' ? 'Dark' : theme === 'system' ? 'System' : 'Light'

  return (
    <Button
      variant="ghost"
      size={collapsed ? 'icon' : 'sm'}
      onClick={cycle}
      title={collapsed ? label : undefined}
      className={cn(!collapsed && 'w-full justify-start gap-2')}
      aria-label={`Theme: ${label}`}
    >
      {theme === 'dark' && <Moon className="h-4 w-4 shrink-0" />}
      {theme === 'system' && <Monitor className="h-4 w-4 shrink-0" />}
      {theme !== 'dark' && theme !== 'system' && <Sun className="h-4 w-4 shrink-0" />}
      {!collapsed && <span>{label}</span>}
    </Button>
  )
}
