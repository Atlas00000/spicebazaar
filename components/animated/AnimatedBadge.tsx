/**
 * AnimatedBadge Component
 * Badge with pulse, glow, and count animations
 */

"use client"

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'

type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'destructive'
  | 'success'
  | 'warning'
  | 'outline'

interface AnimatedBadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  pulse?: boolean
  glow?: boolean
  count?: boolean
  animate?: boolean
  className?: string
  onClick?: () => void
}

const badgeVariants = {
  default: 'bg-muted text-muted-foreground border border-border',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  success: 'bg-green-600 text-white',
  warning: 'bg-amber-500 text-white',
  outline: 'border-2 border-primary text-primary bg-transparent',
}

const badgeGlows = {
  primary: 'shadow-lg shadow-primary/30',
  secondary: 'shadow-lg shadow-secondary/30',
  destructive: 'shadow-lg shadow-destructive/30',
  success: 'shadow-lg shadow-green-600/30',
  warning: 'shadow-lg shadow-amber-500/30',
}

/**
 * AnimatedBadge with effects
 */
export const AnimatedBadge = ({
  children,
  variant = 'default',
  pulse = false,
  glow = false,
  count = false,
  animate = true,
  className,
  onClick,
}: AnimatedBadgeProps) => {
  const isClickable = !!onClick

  return (
    <motion.span
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-full px-2.5 py-0.5',
        'text-xs font-semibold whitespace-nowrap',
        'transition-all duration-200',
        
        // Variant styles
        badgeVariants[variant],
        
        // Glow effect
        glow && badgeGlows[variant as keyof typeof badgeGlows],
        
        // Clickable
        isClickable && 'cursor-pointer hover:scale-110',
        
        className
      )}
      initial={animate ? { scale: 0, opacity: 0 } : undefined}
      animate={
        animate
          ? pulse
            ? {
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }
            : { scale: 1, opacity: 1 }
          : undefined
      }
      whileHover={
        isClickable
          ? {
              scale: 1.1,
              transition: springPresets.snappy,
            }
          : undefined
      }
      whileTap={
        isClickable
          ? {
              scale: 0.95,
              transition: springPresets.stiff,
            }
          : undefined
      }
      transition={springPresets.bouncy}
      onClick={onClick}
    >
      {/* Ping effect for count badges */}
      {(count || pulse) && (
        <span className="absolute inline-flex h-full w-full rounded-full opacity-75">
          <motion.span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full',
              variant === 'destructive' ? 'bg-destructive' : 
              variant === 'primary' ? 'bg-primary' :
              variant === 'success' ? 'bg-green-600' :
              'bg-secondary'
            )}
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </span>
      )}
      
      {children}
    </motion.span>
  )
}

/**
 * Notification badge (with count)
 */
export const NotificationBadge = ({ 
  count, 
  max = 99,
  ...props 
}: Omit<AnimatedBadgeProps, 'children'> & { 
  count: number
  max?: number 
}) => {
  const displayCount = count > max ? `${max}+` : count
  
  return (
    <AnimatedBadge variant="destructive" pulse glow count {...props}>
      {displayCount}
    </AnimatedBadge>
  )
}

/**
 * Status badge (online/offline/away)
 */
export const StatusBadge = ({ 
  status,
  showText = false,
  ...props 
}: Omit<AnimatedBadgeProps, 'children' | 'variant'> & { 
  status: 'online' | 'offline' | 'away'
  showText?: boolean
}) => {
  const statusConfig = {
    online: { variant: 'success' as const, text: 'Online', pulse: true },
    offline: { variant: 'default' as const, text: 'Offline', pulse: false },
    away: { variant: 'warning' as const, text: 'Away', pulse: false },
  }
  
  const config = statusConfig[status]
  
  return (
    <AnimatedBadge 
      variant={config.variant} 
      pulse={config.pulse}
      glow={config.pulse}
      {...props}
    >
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-current" />
        {showText && <span>{config.text}</span>}
      </span>
    </AnimatedBadge>
  )
}

/**
 * Tag badge (for filtering, categories)
 */
export const TagBadge = (props: AnimatedBadgeProps) => (
  <AnimatedBadge variant="outline" {...props} />
)

