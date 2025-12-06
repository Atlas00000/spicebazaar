/**
 * MobileCard Component
 * Optimized card for mobile touch interactions
 */

"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'

interface MobileCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  glowColor?: string
  variant?: 'default' | 'compact' | 'featured'
}

/**
 * Mobile-optimized card with touch-friendly interactions
 */
export const MobileCard = ({
  children,
  className,
  onClick,
  glowColor = '#c65d32',
  variant = 'default',
}: MobileCardProps) => {
  const isMobile = useIsMobile()

  const variants = {
    default: {
      padding: isMobile ? 'p-4' : 'p-6',
      borderRadius: isMobile ? 'rounded-2xl' : 'rounded-3xl',
    },
    compact: {
      padding: isMobile ? 'p-3' : 'p-4',
      borderRadius: isMobile ? 'rounded-xl' : 'rounded-2xl',
    },
    featured: {
      padding: isMobile ? 'p-5' : 'p-8',
      borderRadius: isMobile ? 'rounded-2xl' : 'rounded-3xl',
    },
  }

  const style = variants[variant]

  return (
    <motion.div
      className={cn(
        'relative',
        style.padding,
        style.borderRadius,
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px ${glowColor}15`,
      }}
      onClick={onClick}
      whileHover={!isMobile ? {
        scale: 1.02,
        y: -4,
        boxShadow: `0 12px 48px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 32px ${glowColor}30`,
      } : undefined}
      whileTap={{
        scale: 0.98,
      }}
      transition={springPresets.snappy}
    >
      {/* Glossy overlay */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          borderRadius: 'inherit',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

