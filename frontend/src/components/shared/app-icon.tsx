'use client'

import { Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AppIconProps {
  size?: number
  className?: string
}

export function AppIcon({ size = 32, className }: AppIconProps) {
  return (
    <Shield
      style={{ width: size, height: size }}
      className={cn('text-primary', className)}
    />
  )
}
