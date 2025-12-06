/**
 * Accessibility Utilities
 * Helpers for accessibility features
 */

/**
 * Check if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get accessible animation duration
 */
export const getAccessibleDuration = (
  defaultDuration: number,
  reducedDuration: number = 0.01
): number => {
  return prefersReducedMotion() ? reducedDuration : defaultDuration
}

/**
 * Get accessible transition config
 */
export const getAccessibleTransition = (
  defaultConfig: { duration?: number; delay?: number; ease?: string }
) => {
  if (prefersReducedMotion()) {
    return {
      duration: 0.01,
      delay: 0,
      ease: 'linear',
    }
  }
  return defaultConfig
}

/**
 * Check if high contrast is preferred
 */
export const prefersHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-contrast: high)').matches
}

/**
 * Check if dark mode is preferred
 */
export const prefersDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

