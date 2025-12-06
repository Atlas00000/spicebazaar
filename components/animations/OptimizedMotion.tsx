/**
 * OptimizedMotion Component
 * Motion component with performance optimizations
 */

"use client"

import { motion, MotionProps } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { useWillChange } from '@/lib/hooks/useWillChange'
import { forceGPUAcceleration, removeGPUAcceleration } from '@/lib/utils/gpu-acceleration'

interface OptimizedMotionProps extends MotionProps {
  children: React.ReactNode
  gpuAccelerate?: boolean
  autoWillChange?: boolean
  className?: string
}

/**
 * Optimized motion component with performance enhancements
 */
export const OptimizedMotion = ({
  children,
  gpuAccelerate = true,
  autoWillChange = true,
  className,
  animate,
  ...props
}: OptimizedMotionProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isAnimating = animate !== undefined && animate !== false

  // Manage will-change
  useWillChange(isAnimating, {
    property: 'transform, opacity',
    autoRemove: autoWillChange,
  })

  // GPU acceleration
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (gpuAccelerate) {
      forceGPUAcceleration(element)
    }

    return () => {
      if (gpuAccelerate) {
        removeGPUAcceleration(element)
      }
    }
  }, [gpuAccelerate])

  // Reduce motion support
  const reducedMotionProps = prefersReducedMotion
    ? {
        transition: { duration: 0.01 },
        animate: undefined,
      }
    : {}

  return (
    <motion.div
      ref={elementRef}
      className={className}
      {...reducedMotionProps}
      {...props}
    >
      {children}
    </motion.div>
  )
}

