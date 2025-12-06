/**
 * FluidSection Component
 * Reusable section wrapper with fluid, glossy aesthetic
 */

"use client"

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FluidBackground } from './FluidBackground'
import { OrganicBackground } from './OrganicShape'
import { FloatingOrbs } from './FloatingElements'

interface FluidSectionProps {
  children: ReactNode
  variant?: 'subtle' | 'medium' | 'vibrant'
  showOrbs?: boolean
  showOrganic?: boolean
  gloss?: boolean
  className?: string
  id?: string
}

/**
 * FluidSection with layered backgrounds and glossy feel
 */
export const FluidSection = ({
  children,
  variant = 'subtle',
  showOrbs = false,
  showOrganic = false,
  gloss = true,
  className,
  id,
}: FluidSectionProps) => {
  const variantIntensity = {
    subtle: 'subtle' as const,
    medium: 'medium' as const,
    vibrant: 'strong' as const,
  }

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden py-20',
        className
      )}
    >
      {/* Fluid background */}
      <FluidBackground
        variant="spice"
        intensity={variantIntensity[variant]}
        animated
      />

      {/* Organic shapes */}
      {showOrganic && (
        <OrganicBackground colors={['#c65d32', '#fbbf24', '#ef4444']} />
      )}

      {/* Floating orbs */}
      {showOrbs && <FloatingOrbs />}

      {/* Glossy overlay */}
      {gloss && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)',
            }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0%, transparent 50%)',
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </>
      )}

      {/* Edge gradients for smooth blending */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

/**
 * Glossy content container
 */
export const GlossyContainer = ({
  children,
  color = 'rgba(255,255,255,0.1)',
  blur = 20,
  padding = 6,
  rounded = '2xl',
  className,
}: {
  children: ReactNode
  color?: string
  blur?: number
  padding?: number
  rounded?: 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  className?: string
}) => {
  const roundedClasses = {
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden',
        roundedClasses[rounded],
        `p-${padding}`,
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,0.05) 100%)`,
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
      whileHover={{
        boxShadow: '0 12px 48px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Inner shine */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

