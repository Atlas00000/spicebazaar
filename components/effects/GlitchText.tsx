/**
 * GlitchText Component
 * Glitch effect for text
 */

"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface GlitchTextProps {
  children: string
  trigger?: 'hover' | 'continuous' | 'mount'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

/**
 * GlitchText with cyberpunk effect
 */
export const GlitchText = ({
  children,
  trigger = 'hover',
  intensity = 'medium',
  className,
}: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(trigger === 'continuous')

  const intensityValues = {
    low: { offset: 2, duration: 0.2, iterations: 2 },
    medium: { offset: 4, duration: 0.3, iterations: 3 },
    high: { offset: 8, duration: 0.5, iterations: 5 },
  }

  const { offset, duration, iterations } = intensityValues[intensity]

  useEffect(() => {
    if (trigger === 'continuous') {
      const interval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), duration * 1000)
      }, 3000)

      return () => clearInterval(interval)
    }

    if (trigger === 'mount') {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), duration * 1000)
    }
  }, [trigger, duration])

  const glitchVariants = {
    initial: { x: 0, y: 0 },
    glitch: {
      x: [0, -offset, offset, -offset, 0],
      y: [0, offset, -offset, offset, 0],
      transition: {
        duration,
        repeat: iterations,
      },
    },
  }

  return (
    <span
      className={cn('relative inline-block', className)}
      onMouseEnter={() => trigger === 'hover' && setIsGlitching(true)}
      onMouseLeave={() => trigger === 'hover' && setIsGlitching(false)}
    >
      {/* Main text */}
      <motion.span
        className="relative z-10"
        variants={glitchVariants}
        animate={isGlitching ? 'glitch' : 'initial'}
      >
        {children}
      </motion.span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-red-500 opacity-70"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              mixBlendMode: 'screen',
            }}
            animate={{
              x: [0, -offset * 1.5, offset, -offset, 0],
              y: [0, offset, -offset * 1.5, offset, 0],
            }}
            transition={{
              duration: duration * 0.8,
              repeat: iterations,
            }}
          >
            {children}
          </motion.span>

          <motion.span
            className="absolute inset-0 text-cyan-500 opacity-70"
            style={{
              clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
              mixBlendMode: 'screen',
            }}
            animate={{
              x: [0, offset * 1.5, -offset, offset, 0],
              y: [0, -offset, offset * 1.5, -offset, 0],
            }}
            transition={{
              duration: duration * 0.8,
              repeat: iterations,
            }}
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  )
}

/**
 * Glitch heading (preset for large text)
 */
export const GlitchHeading = ({
  children,
  className,
}: {
  children: string
  className?: string
}) => (
  <GlitchText
    trigger="hover"
    intensity="high"
    className={cn('text-4xl font-bold', className)}
  >
    {children}
  </GlitchText>
)

