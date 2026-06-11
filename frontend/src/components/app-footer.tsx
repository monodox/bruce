'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { AppIcon } from '@/components/shared/app-icon'

export function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <AppIcon size={24} />
              <span className="text-lg font-bold">Bruce</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open-source AI Observability Copilot. Monitor your agents, detect anomalies, and fix issues automatically.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/auth/login" className="hover:text-foreground transition-colors">Console</Link></li>
              <li><a href="https://github.com/monodox/bruce" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="https://github.com/monodox/bruce/releases" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com/monodox/bruce" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li><a href="https://github.com/monodox/bruce/issues" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Report an Issue</a></li>
              <li><a href="https://github.com/monodox/bruce/discussions" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discussions</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>&copy; {currentYear} Monodox. All rights reserved.</span>
          <span>Open source under the MIT License.</span>
        </div>
      </div>
    </footer>
  )
}
