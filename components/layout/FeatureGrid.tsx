/**
 * FeatureGrid Component
 * Grid layout with staggered animations
 */

"use client"

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedCard } from '@/components/animated/AnimatedCard'
import { variants } from '@/lib/animation-variants'
import { useStaggeredReveal } from '@/lib/hooks/useScrollReveal'

interface Feature {
  icon: ReactNode
  title: string
  description: string
  link?: {
    label: string
    href: string
  }
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3 | 4
  variant?: 'card' | 'simple' | 'minimal'
  centered?: boolean
  className?: string
}

/**
 * Feature grid with animations
 */
export const FeatureGrid = ({
  features,
  columns = 3,
  variant = 'card',
  centered = false,
  className,
}: FeatureGridProps) => {
  const { ref, visibleIndices } = useStaggeredReveal({
    count: features.length,
    staggerDelay: 100,
    threshold: 'early',
  })

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div
      ref={ref as any}
      className={cn(
        'grid gap-8',
        gridCols[columns],
        className
      )}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate={visibleIndices.has(index) ? 'visible' : 'hidden'}
          variants={variants.slideUp}
        >
          {variant === 'card' ? (
            <AnimatedCard
              hover3D
              glow
              className="h-full"
            >
              <div className="p-6 space-y-4">
                <motion.div
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
                {feature.link && (
                  <a
                    href={feature.link.href}
                    className="inline-flex items-center text-primary hover:underline font-medium"
                  >
                    {feature.link.label}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </AnimatedCard>
          ) : (
            <div className={cn('space-y-4', centered && 'text-center')}>
              <motion.div
                className={cn(
                  'inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary',
                  'items-center justify-center text-white',
                  centered && 'mx-auto'
                )}
                whileHover={{ scale: 1.1 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">
                {feature.title}
              </h3>
              <p className="text-lg text-muted-foreground">
                {feature.description}
              </p>
              {feature.link && (
                <a
                  href={feature.link.href}
                  className="inline-flex items-center text-primary hover:underline font-medium"
                >
                  {feature.link.label}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

