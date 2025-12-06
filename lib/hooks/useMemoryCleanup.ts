/**
 * useMemoryCleanup Hook
 * Hook for managing memory cleanup in components
 */

"use client"

import { useEffect, useRef } from 'react'
import { CleanupManager, createCleanupManager } from '@/lib/utils/memory-cleanup'

/**
 * Hook to manage cleanup functions
 */
export const useMemoryCleanup = () => {
  const cleanupManagerRef = useRef<CleanupManager | null>(null)

  useEffect(() => {
    cleanupManagerRef.current = createCleanupManager()

    return () => {
      cleanupManagerRef.current?.cleanup()
      cleanupManagerRef.current = null
    }
  }, [])

  return {
    addCleanup: (cleanup: () => void) => {
      cleanupManagerRef.current?.add(cleanup)
    },
    cleanup: () => {
      cleanupManagerRef.current?.cleanup()
    },
  }
}

/**
 * Hook for event listener with cleanup
 */
export const useEventListener = (
  element: HTMLElement | Window | Document | null,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
) => {
  useEffect(() => {
    if (!element) return

    element.addEventListener(event, handler, options)

    return () => {
      element.removeEventListener(event, handler, options)
    }
  }, [element, event, handler, options])
}

/**
 * Hook for timeout with cleanup
 */
export const useTimeout = (
  callback: () => void,
  delay: number | null
) => {
  useEffect(() => {
    if (delay === null) return

    const timeoutId = setTimeout(callback, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [callback, delay])
}

/**
 * Hook for interval with cleanup
 */
export const useInterval = (
  callback: () => void,
  delay: number | null
) => {
  useEffect(() => {
    if (delay === null) return

    const intervalId = setInterval(callback, delay)

    return () => {
      clearInterval(intervalId)
    }
  }, [callback, delay])
}

/**
 * Hook for RAF interval with cleanup
 */
export const useRAFInterval = (
  callback: () => void,
  fps: number = 60
) => {
  useEffect(() => {
    let rafId: number | null = null
    let lastTime = 0
    const interval = 1000 / fps

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= interval) {
        callback()
        lastTime = currentTime
      }
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [callback, fps])
}

