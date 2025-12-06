/**
 * MobileLayout Component
 * Optimized layout wrapper for mobile devices
 */

"use client"

import { ReactNode } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { cn } from '@/lib/utils'

interface MobileLayoutProps {
  children: ReactNode
  className?: string
  mobileClassName?: string
  desktopClassName?: string
}

/**
 * Mobile-optimized layout wrapper
 */
export const MobileLayout = ({
  children,
  className,
  mobileClassName,
  desktopClassName,
}: MobileLayoutProps) => {
  const isMobile = useIsMobile()

  return (
    <div
      className={cn(
        className,
        isMobile ? mobileClassName : desktopClassName
      )}
    >
      {children}
    </div>
  )
}

