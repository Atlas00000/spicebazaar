/**
 * ScrollReveal Component
 * Wrapper component for scroll-triggered animations
 */

"use client"

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useScrollReveal, useStaggeredReveal } from '@/lib/hooks/useScrollReveal'
import { useReducedMotion, getReducedMotionConfig } from '@/lib/hooks/useReducedMotion'
import { variants } from '@/lib/animation-variants'
import type { ScrollThreshold } from '@/lib/animation-config'

interface ScrollRevealProps {
  children: ReactNode
  variant?: keyof typeof variants
  threshold?: ScrollThreshold | number
  triggerOnce?: boolean
  delay?: number
  className?: string
}

/**
 * ScrollReveal wrapper for animating elements on scroll
 */
export const ScrollReveal = ({
  children,
  variant = 'fadeScale',
  threshold = 'early',
  triggerOnce = true,
  delay = 0,
  className,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({
    threshold,
    triggerOnce,
    delay,
  })
  const prefersReducedMotion = useReducedMotion()
  const reducedMotionConfig = getReducedMotionConfig(prefersReducedMotion)

  const animationVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : (variants[variant] || variants.fadeScale)

  return (
    <motion.div
      ref={ref as any}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
      transition={reducedMotionConfig?.transition}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollReveal with staggered children
 */
export const StaggeredScrollReveal = ({
  children,
  staggerDelay = 100,
  threshold = 'early',
  triggerOnce = true,
  className,
}: {
  children: ReactNode[]
  staggerDelay?: number
  threshold?: ScrollThreshold | number
  triggerOnce?: boolean
  className?: string
}) => {
  const { ref, visibleIndices } = useStaggeredReveal({
    count: Array.isArray(children) ? children.length : 1,
    staggerDelay,
    threshold,
    triggerOnce,
  })

  return (
    <div ref={ref as any} className={className}>
      {Array.isArray(children) &&
        children.map((child, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={visibleIndices.has(index) ? 'visible' : 'hidden'}
            variants={variants.staggerItem}
          >
            {child}
          </motion.div>
        ))}
    </div>
  )
}

/**
 * Preset reveal animations
 */

export const FadeInUp = ({ children, ...props }: Omit<ScrollRevealProps, 'variant'>) => (
  <ScrollReveal variant="slideUp" {...props}>
    {children}
  </ScrollReveal>
)

export const FadeInDown = ({ children, ...props }: Omit<ScrollRevealProps, 'variant'>) => (
  <ScrollReveal variant="slideDown" {...props}>
    {children}
  </ScrollReveal>
)

export const FadeInLeft = ({ children, ...props }: Omit<ScrollRevealProps, 'variant'>) => (
  <ScrollReveal variant="slideLeft" {...props}>
    {children}
  </ScrollReveal>
)

export const FadeInRight = ({ children, ...props }: Omit<ScrollRevealProps, 'variant'>) => (
  <ScrollReveal variant="slideRight" {...props}>
    {children}
  </ScrollReveal>
)

export const ZoomIn = ({ children, ...props }: Omit<ScrollRevealProps, 'variant'>) => (
  <ScrollReveal variant="zoomIn" {...props}>
    {children}
  </ScrollReveal>
)

export const BlurFadeIn = ({ children, ...props }: Omit<ScrollRevealProps, 'variant'>) => (
  <ScrollReveal variant="blurFade" {...props}>
    {children}
  </ScrollReveal>
)

/**
 * Parallax scroll reveal (combines scroll reveal with parallax)
 */
export const ParallaxReveal = ({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode
  speed?: number
  className?: string
}) => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 'early',
    triggerOnce: false,
  })

  return (
    <motion.div
      ref={ref as any}
      className={className}
      style={{
        y: isVisible ? 0 : 100 * speed,
      }}
      animate={{
        y: isVisible ? 0 : 100 * speed,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Section reveal with decorative elements
 */
export const SectionReveal = ({
  children,
  title,
  subtitle,
  centered = true,
  className,
}: {
  children: ReactNode
  title?: string
  subtitle?: string
  centered?: boolean
  className?: string
}) => {
  return (
    <ScrollReveal className={cn('py-20', className)}>
      <div className={cn('container mx-auto px-4', centered && 'text-center')}>
        {(title || subtitle) && (
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={variants.staggerContainer}
          >
            {title && (
              <motion.h2
                className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4"
                variants={variants.staggerItem}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                className={cn(
                  'text-xl text-muted-foreground',
                  centered && 'max-w-2xl mx-auto'
                )}
                variants={variants.staggerItem}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </ScrollReveal>
  )
}

