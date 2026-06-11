'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const pages = [
  { id: 'overview', label: 'Overview', href: '/console/overview', icon: LayoutDashboard },
  { id: 'agents', label: 'Agents', href: '/console/agents', icon: Bot },
  { id: 'alerts', label: 'Alerts', href: '/console/alerts', icon: Bell },
  { id: 'anomalies', label: 'Anomalies', href: '/console/anomalies', icon: Activity },
  { id: 'diagnose', label: 'Diagnose', href: '/console/diagnose', icon: Stethoscope },
  { id: 'playbooks', label: 'Playbooks', href: '/console/playbooks', icon: BookOpen },
  { id: 'traces', label: 'Traces', href: '/console/traces', icon: Route },
  { id: 'tokens', label: 'Tokens', href: '/console/tokens', icon: Key },
  { id: 'settings', label: 'Settings', href: '/console/settings', icon: Settings },
]

export function CommandSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()

  const filtered = pages.filter((p) =>
    p.label.toLowerCase().includes(query.toLowerCase())
  )

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const navigate = useCallback((href: string) => {
    router.push(href)
    close()
  }, [router, close])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        close()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [close])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      navigate(filtered[activeIndex].href)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={close} />

      {/* Dialog */}
      <div className="relative w-full max-w-lg rounded-lg border bg-background shadow-lg">
        <div className="flex items-center border-b px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages..."
            className="h-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <kbd className="ml-2 hidden shrink-0 rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground sm:inline-block">
            Esc
          </kbd>
        </div>

        {filtered.length > 0 ? (
          <div className="max-h-64 overflow-y-auto p-2">
            {filtered.map((page, i) => {
              const Icon = page.icon
              return (
                <button
                  key={page.id}
                  onClick={() => navigate(page.href)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                    i === activeIndex
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{page.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{page.href}</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No results found.
          </div>
        )}
      </div>
    </div>
  )
}

export function SearchTrigger() {
  const [, setOpen] = useState(false)

  const handleClick = () => {
    // Dispatch keyboard event to trigger the command search
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
    )
  }

  return (
    <button
      onClick={handleClick}
      className="flex h-9 w-full max-w-sm items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent"
    >
      <Search className="h-4 w-4" />
      <span className="flex-1 text-left">Search...</span>
      <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 text-xs sm:inline-block">
        ⌘K
      </kbd>
    </button>
  )
}
