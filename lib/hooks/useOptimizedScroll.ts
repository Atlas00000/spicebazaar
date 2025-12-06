/**
 * useOptimizedScroll Hook
 * Optimized scroll hook with performance enhancements
 */

"use client"

import { useEffect, useRef, useState } from 'react'
import { createOptimizedScrollListener, getScrollPosition, getScrollProgress } from '@/lib/utils/scroll-optimizer'

interface UseOptimizedScrollOptions {
  throttle?: boolean
  fps?: number
  debounce?: boolean
  delay?: number
  enabled?: boolean
}

/**
 * Optimized scroll hook with performance optimizations
 */
export const useOptimizedScroll = (
  callback: (scrollY: number, progress: number) => void,
  options: UseOptimizedScrollOptions = {}
) => {
  const {
    throttle = true,
    fps = 60,
    debounce = false,
    delay = 100,
    enabled = true,
  } = options

  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    const handleScroll = () => {
      const { y } = getScrollPosition()
      const progress = getScrollProgress()
      callbackRef.current(y, progress)
    }

    const cleanup = createOptimizedScrollListener(handleScroll, {
      passive: true,
      throttle,
      fps,
      debounce,
      delay,
    })

    return cleanup
  }, [enabled, throttle, fps, debounce, delay])
}

/**
 * Hook to get current scroll position
 */
export const useScrollPosition = (
  options: UseOptimizedScrollOptions = {}
) => {
  const [scrollY, setScrollY] = useState(0)
  const [progress, setProgress] = useState(0)

  useOptimizedScroll(
    (y, prog) => {
      setScrollY(y)
      setProgress(prog)
    },
    options
  )

  return { scrollY, progress }
}

