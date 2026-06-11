'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
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
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useConsole } from './console-context'

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

function SidebarContent({
  collapsed,
  onToggle,
  onNavigate,
}: {
  collapsed: boolean
  onToggle?: () => void
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn('mb-6 flex items-center gap-2', collapsed ? 'justify-center px-0' : 'px-2')}>
        <AppIcon size={28} />
        {!collapsed && <span className="text-lg font-semibold">Bruce</span>}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              collapsed && 'justify-center px-2',
              pathname === href
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && label}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className={cn('mt-auto flex flex-col gap-1 border-t pt-4', collapsed ? 'items-center' : '')}>
        <ThemeToggle collapsed={collapsed} />
        {onToggle && (
          <Button
            variant="ghost"
            size={collapsed ? 'icon' : 'sm'}
            onClick={onToggle}
            title={collapsed ? 'Expand' : undefined}
            className={cn(!collapsed && 'w-full justify-start gap-2')}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

export function ConsoleSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { collapsed, setCollapsed } = useConsole()

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

      {/* Mobile sidebar - always expanded */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 border-r bg-background p-4 transition-transform md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent
          collapsed={false}
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>

      {/* Desktop sidebar - fixed, collapsible */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 hidden border-r bg-background p-4 transition-all duration-200 md:block',
          collapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onNavigate={() => setCollapsed(true)}
        />
      </aside>
    </>
  )
}
