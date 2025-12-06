/**
 * MotionWrapper Component
 * Wrapper that respects reduced motion preferences
 */

"use client"

import { ReactNode } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { useReducedMotion, getReducedMotionConfig } from '@/lib/hooks/useReducedMotion'

interface MotionWrapperProps extends MotionProps {
  children: ReactNode
  fallback?: ReactNode
  disableOnReducedMotion?: boolean
}

/**
 * Motion wrapper that respects reduced motion
 */
export const MotionWrapper = ({
  children,
  fallback,
  disableOnReducedMotion = false,
  animate,
  transition,
  ...props
}: MotionWrapperProps) => {
  const prefersReducedMotion = useReducedMotion()

  // If motion should be disabled, return static content
  if (prefersReducedMotion && disableOnReducedMotion) {
    return <>{fallback || children}</>
  }

  // Apply reduced motion config
  const reducedMotionConfig = getReducedMotionConfig(prefersReducedMotion)
  const finalTransition = prefersReducedMotion
    ? { ...reducedMotionConfig?.transition, ...transition }
    : transition

  const finalAnimate = prefersReducedMotion && reducedMotionConfig
    ? { ...reducedMotionConfig, ...animate }
    : animate

  return (
    <motion.div
      {...props}
      animate={finalAnimate}
      transition={finalTransition}
    >
      {children}
    </motion.div>
  )
}

