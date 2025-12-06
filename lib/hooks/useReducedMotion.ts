/**
 * useReducedMotion Hook
 * Detects and respects user's motion preferences
 */

"use client"

import { useState, useEffect } from 'react'

export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Get reduced motion animation config for Framer Motion
 */
export const getReducedMotionConfig = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      duration: 0.01,
      delay: 0,
      ease: 'linear',
      transition: {
        duration: 0.01,
        delay: 0,
        ease: 'linear',
      },
    }
  }
  return undefined // Use default animations
}

/**
 * Get reduced motion variants
 */
export const getReducedMotionVariants = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  }
  return undefined
}

/**
 * Check if motion should be disabled
 */
export const shouldDisableMotion = (prefersReducedMotion: boolean): boolean => {
  return prefersReducedMotion
}

