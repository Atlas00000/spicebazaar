/**
 * OptimizedScrollContainer Component
 * Scroll container with performance optimizations
 */

"use client"

import { ReactNode, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { createPassiveListener } from '@/lib/utils/scroll-optimizer'

interface OptimizedScrollContainerProps {
  children: ReactNode
  className?: string
  onScroll?: (scrollTop: number) => void
  throttle?: boolean
  fps?: number
}

/**
 * Optimized scroll container with passive listeners
 */
export const OptimizedScrollContainer = ({
  children,
  className,
  onScroll,
  throttle = true,
  fps = 60,
}: OptimizedScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafIdRef = useRef<number | null>(null)
  const lastScrollTopRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !onScroll) return

    let lastTime = 0
    const interval = 1000 / fps

    const handleScroll = () => {
      if (throttle) {
        const currentTime = performance.now()
        if (currentTime - lastTime >= interval) {
          if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current)
          }
          rafIdRef.current = requestAnimationFrame(() => {
            const scrollTop = container.scrollTop
            if (scrollTop !== lastScrollTopRef.current) {
              onScroll(scrollTop)
              lastScrollTopRef.current = scrollTop
            }
            lastTime = currentTime
          })
        }
      } else {
        onScroll(container.scrollTop)
      }
    }

    const cleanup = createPassiveListener(container, 'scroll', handleScroll, {
      passive: true,
    })

    return cleanup
  }, [onScroll, throttle, fps])

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  )
}

