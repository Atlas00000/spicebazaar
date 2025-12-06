/**
 * MobileButton Component
 * Touch-optimized button for mobile
 */

"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'

interface MobileButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  fullWidth?: boolean
}

/**
 * Mobile-optimized button with larger touch targets
 */
export const MobileButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  fullWidth = false,
}: MobileButtonProps) => {
  const isMobile = useIsMobile()

  const sizeClasses = {
    sm: isMobile ? 'px-4 py-2.5 text-sm' : 'px-4 py-2 text-sm',
    md: isMobile ? 'px-6 py-3.5 text-base' : 'px-6 py-3 text-base',
    lg: isMobile ? 'px-8 py-4 text-lg' : 'px-8 py-4 text-lg',
  }

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #c65d32 0%, #f97316 100%)',
      boxShadow: '0 4px 20px rgba(198, 93, 50, 0.4)',
      color: 'white',
    },
    secondary: {
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.25)',
      color: 'inherit',
    },
    ghost: {
      background: 'transparent',
      color: 'inherit',
    },
  }

  return (
    <motion.button
      className={cn(
        'rounded-2xl font-semibold transition-all',
        sizeClasses[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={variantStyles[variant]}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled && !isMobile ? {
        scale: 1.05,
        boxShadow: variant === 'primary' ? '0 6px 28px rgba(198, 93, 50, 0.5)' : undefined,
      } : undefined}
      whileTap={!disabled ? {
        scale: 0.95,
      } : undefined}
      transition={springPresets.snappy}
    >
      {children}
    </motion.button>
  )
}

