/**
 * StatsGrid Component
 * Grid layout for stats with staggered animations
 */

"use client"

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useStaggeredReveal } from '@/lib/hooks/useScrollReveal'
import { variants } from '@/lib/animation-variants'

interface StatsGridProps {
  children: ReactNode[]
  columns?: 2 | 3 | 4
  gap?: number
  staggerDelay?: number
  className?: string
}

/**
 * Stats grid with staggered reveal animations
 */
export const StatsGrid = ({
  children,
  columns = 4,
  gap = 6,
  staggerDelay = 150,
  className,
}: StatsGridProps) => {
  const { ref, visibleIndices } = useStaggeredReveal({
    count: children.length,
    staggerDelay,
    threshold: 'early',
  })

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div
      ref={ref as any}
      className={cn('grid', gridCols[columns], `gap-${gap}`, className)}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate={visibleIndices.has(index) ? 'visible' : 'hidden'}
          variants={variants.slideUp}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

