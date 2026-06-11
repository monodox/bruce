'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import {
  LayoutDashboard,
  Bot,
  Bell,
  Activity,
  Stethoscope,
  BookOpen,
  Settings,
  Key,
  Route,
} from 'lucide-react'
import { AppIcon } from '@/components/shared/app-icon'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { href: '/console/overview', label: 'Overview', icon: LayoutDashboard },
  { href: '/console/agents', label: 'Agents', icon: Bot },
  { href: '/console/alerts', label: 'Alerts', icon: Bell },
  { href: '/console/anomalies', label: 'Anomalies', icon: Activity },
  { href: '/console/diagnose', label: 'Diagnose', icon: Stethoscope },
  { href: '/console/playbooks', label: 'Playbooks', icon: BookOpen },
  { href: '/console/traces', label: 'Traces', icon: Route },
  { href: '/console/tokens', label: 'Tokens', icon: Key },
  { href: '/console/settings', label: 'Settings', icon: Settings },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      <div className="mb-6 flex items-center gap-2 px-2">
        <AppIcon size={28} />
        <span className="text-lg font-semibold">Bruce</span>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </>
  )
}

export function ConsoleSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 border-r bg-background p-4 transition-transform md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar - fixed */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background p-4 md:block">
        <SidebarContent />
      </aside>
    </>
  )
}
