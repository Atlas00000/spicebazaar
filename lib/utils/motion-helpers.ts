/**
 * Motion Helpers
 * Utilities for creating accessible motion variants
 */

import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

/**
 * Create accessible motion variants
 */
export const createAccessibleVariants = (
  defaultVariants: any,
  reducedVariants?: any
) => {
  // This will be used in components
  return { defaultVariants, reducedVariants }
}

/**
 * Get motion props based on reduced motion preference
 */
export const getMotionProps = (
  prefersReducedMotion: boolean,
  defaultProps: any,
  reducedProps?: any
) => {
  if (prefersReducedMotion && reducedProps) {
    return reducedProps
  }
  return defaultProps
}

/**
 * Hook to get accessible animation config
 */
export const useAccessibleAnimation = () => {
  const prefersReducedMotion = useReducedMotion()

  return {
    prefersReducedMotion,
    duration: prefersReducedMotion ? 0.01 : undefined,
    delay: prefersReducedMotion ? 0 : undefined,
    ease: prefersReducedMotion ? 'linear' : undefined,
  }
}

