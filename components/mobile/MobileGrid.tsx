/**
 * MobileGrid Component
 * Responsive grid optimized for mobile
 */

"use client"

import { ReactNode } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { cn } from '@/lib/utils'

interface MobileGridProps {
  children: ReactNode
  className?: string
  mobileCols?: number
  desktopCols?: number
  gap?: string
}

/**
 * Mobile-optimized responsive grid
 */
export const MobileGrid = ({
  children,
  className,
  mobileCols = 1,
  desktopCols = 3,
  gap = 'gap-4',
}: MobileGridProps) => {
  const isMobile = useIsMobile()

  const cols = isMobile ? mobileCols : desktopCols

  return (
    <div
      className={cn(
        'grid',
        `grid-cols-${cols}`,
        gap,
        className
      )}
    >
      {children}
    </div>
  )
}

