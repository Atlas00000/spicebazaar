/**
 * useWillChange Hook
 * Manages will-change property for performance
 */

"use client"

import { useEffect, useRef } from 'react'

interface UseWillChangeOptions {
  property?: string
  autoRemove?: boolean
  removeDelay?: number
}

/**
 * Hook to manage will-change CSS property
 * Automatically removes after animation completes
 */
export const useWillChange = (
  isAnimating: boolean,
  options: UseWillChangeOptions = {}
) => {
  const {
    property = 'transform',
    autoRemove = true,
    removeDelay = 500,
  } = options

  const elementRef = useRef<HTMLElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (isAnimating) {
      // Set will-change
      element.style.willChange = property

      // Clear any pending removal
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    } else if (autoRemove) {
      // Remove will-change after animation
      timeoutRef.current = setTimeout(() => {
        if (element) {
          element.style.willChange = 'auto'
        }
      }, removeDelay)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (element) {
        element.style.willChange = 'auto'
      }
    }
  }, [isAnimating, property, autoRemove, removeDelay])

  return elementRef
}

