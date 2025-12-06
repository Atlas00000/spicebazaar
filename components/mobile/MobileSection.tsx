/**
 * MobileSection Component
 * Optimized section wrapper for mobile spacing
 */

"use client"

import { ReactNode } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { cn } from '@/lib/utils'

interface MobileSectionProps {
  children: ReactNode
  className?: string
  mobilePadding?: string
  desktopPadding?: string
  mobileSpacing?: string
  desktopSpacing?: string
}

/**
 * Mobile-optimized section with responsive spacing
 */
export const MobileSection = ({
  children,
  className,
  mobilePadding = 'px-4 py-8',
  desktopPadding = 'px-6 py-16',
  mobileSpacing = 'space-y-6',
  desktopSpacing = 'space-y-12',
}: MobileSectionProps) => {
  const isMobile = useIsMobile()

  return (
    <section
      className={cn(
        className,
        isMobile ? mobilePadding : desktopPadding,
        isMobile ? mobileSpacing : desktopSpacing
      )}
    >
      {children}
    </section>
  )
}

