'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

interface AppIconProps {
  size?: number
  className?: string
}

export function AppIcon({ size = 32, className }: AppIconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Image
      src={resolvedTheme === 'dark' ? '/icon-light.png' : '/icon-dark.png'}
      alt="Bruce"
      width={size}
      height={size}
      className={className}
    />
  )
}
