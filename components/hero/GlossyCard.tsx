/**
 * GlossyCard Component
 * Card with milky, oily, glossy aesthetic
 */

"use client"

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'

interface GlossyCardProps {
  children: ReactNode
  hover3D?: boolean
  glow?: boolean
  glowColor?: string
  className?: string
  onClick?: () => void
}

/**
 * GlossyCard with rich, vibrant feel
 */
export const GlossyCard = ({
  children,
  hover3D = true,
  glow = true,
  glowColor = '#c65d32',
  className,
  onClick,
}: GlossyCardProps) => {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-3xl',
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: glow
          ? `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px ${glowColor}30`
          : '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
      }}
      whileHover={
        hover3D
          ? {
              y: -8,
              scale: 1.02,
              boxShadow: glow
                ? `0 20px 60px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), 0 8px 32px ${glowColor}40`
                : '0 20px 60px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3)',
              transition: springPresets.snappy,
            }
          : undefined
      }
      whileTap={
        onClick
          ? {
              scale: 0.98,
              transition: springPresets.stiff,
            }
          : undefined
      }
      onClick={onClick}
    >
      {/* Multi-layer glossy overlays */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

/**
 * Stat card with glossy feel
 */
export const GlossyStatCard = ({
  value,
  label,
  icon,
  color = '#c65d32',
}: {
  value: ReactNode
  label: string
  icon?: ReactNode
  color?: string
}) => {
  return (
    <GlossyCard glow glowColor={color} className="text-center p-8">
      {icon && (
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{
            background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
            boxShadow: `0 4px 20px ${color}30`,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {icon}
        </motion.div>
      )}
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        {value}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">
        {label}
      </div>
    </GlossyCard>
  )
}

