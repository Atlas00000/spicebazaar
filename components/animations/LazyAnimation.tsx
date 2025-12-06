/**
 * LazyAnimation Component
 * Load animations only when in viewport
 */

"use client"

import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, MotionProps } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface LazyAnimationProps extends MotionProps {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  fallback?: ReactNode
  disabled?: boolean
}

/**
 * Lazy load animations when element enters viewport
 */
export const LazyAnimation = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback,
  disabled = false,
  ...motionProps
}: LazyAnimationProps) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  })
  const prefersReducedMotion = useReducedMotion()

  // Don't animate if disabled or reduced motion
  if (disabled || prefersReducedMotion) {
    return <div ref={ref}>{children}</div>
  }

  // Show fallback until in view
  if (!inView && fallback) {
    return <div ref={ref}>{fallback}</div>
  }

  return (
    <motion.div
      ref={ref}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

