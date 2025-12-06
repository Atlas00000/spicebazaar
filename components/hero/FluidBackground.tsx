/**
 * FluidBackground Component
 * Layered gradient backgrounds with smooth, creamy feel
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FluidBackgroundProps {
  variant?: 'warm' | 'cool' | 'spice' | 'sunset'
  animated?: boolean
  intensity?: 'subtle' | 'medium' | 'strong'
  className?: string
}

/**
 * Fluid layered gradient background
 */
export const FluidBackground = ({
  variant = 'spice',
  animated = true,
  intensity = 'medium',
  className,
}: FluidBackgroundProps) => {
  const variants = {
    warm: {
      gradient1: 'from-orange-200/40 via-amber-200/30 to-yellow-200/40',
      gradient2: 'from-orange-300/30 via-amber-300/20 to-rose-300/30',
      gradient3: 'from-amber-100/50 to-orange-100/40',
    },
    cool: {
      gradient1: 'from-blue-200/40 via-cyan-200/30 to-teal-200/40',
      gradient2: 'from-blue-300/30 via-cyan-300/20 to-indigo-300/30',
      gradient3: 'from-cyan-100/50 to-blue-100/40',
    },
    spice: {
      gradient1: 'from-orange-300/30 via-amber-300/25 to-red-300/30',
      gradient2: 'from-yellow-200/25 via-orange-200/20 to-red-200/25',
      gradient3: 'from-amber-100/40 via-orange-100/30 to-red-100/35',
    },
    sunset: {
      gradient1: 'from-orange-400/35 via-pink-300/30 to-purple-300/35',
      gradient2: 'from-yellow-300/30 via-orange-300/25 to-pink-300/30',
      gradient3: 'from-orange-200/45 to-pink-200/40',
    },
  }

  const intensityScale = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
  }

  const gradients = variants[variant]
  const scale = intensityScale[intensity]

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Layer 1 - Base gradient */}
      <motion.div
        className={cn('absolute inset-0 bg-gradient-to-br', gradients.gradient1)}
        animate={
          animated
            ? {
                opacity: [0.6 * scale, 0.8 * scale, 0.6 * scale],
              }
            : undefined
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 2 - Moving gradient */}
      <motion.div
        className={cn('absolute inset-0 bg-gradient-to-tl', gradients.gradient2)}
        animate={
          animated
            ? {
                opacity: [0.4 * scale, 0.7 * scale, 0.4 * scale],
                scale: [1, 1.1, 1],
              }
            : undefined
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 3 - Radial gradient */}
      <motion.div
        className={cn('absolute inset-0 bg-gradient-radial', gradients.gradient3)}
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))`,
        }}
        animate={
          animated
            ? {
                opacity: [0.3 * scale, 0.5 * scale, 0.3 * scale],
              }
            : undefined
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
    </div>
  )
}

/**
 * Glossy overlay for "oily" effect
 */
export const GlossyOverlay = ({ className }: { className?: string }) => {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 70% 60%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  )
}

