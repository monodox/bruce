'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppIcon } from '@/components/shared/app-icon'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <AppIcon size={28} />
          <span className="text-xl font-bold tracking-tight">Bruce</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <a
            href="https://github.com/monodox/bruce"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
