/**
 * AnimatedButton Component
 * Enhanced button with micro-interactions, springs, and magnetic effects
 */

"use client"

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springPresets, hoverSettings, tapSettings } from '@/lib/animation-config'
import { useMagneticButton } from '@/lib/hooks/useMouseFollow'

type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'ghost' 
  | 'outline' 
  | 'destructive'
  | 'glass'
  | 'gradient'

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon'

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  magnetic?: boolean
  glow?: boolean
  ripple?: boolean
  loading?: boolean
  loadingText?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const buttonVariants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md hover:shadow-lg',
  ghost: 'bg-transparent hover:bg-muted text-foreground',
  outline: 'border-2 border-border hover:border-primary bg-transparent text-foreground hover:bg-primary/10',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg',
  glass: 'glass text-foreground hover:bg-white/15',
  gradient: 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg hover:shadow-xl',
}

const buttonSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
  xl: 'h-14 px-8 text-xl',
  icon: 'h-10 w-10 p-0',
}

const buttonGlows = {
  primary: 'hover:glow-primary',
  secondary: 'hover:glow-secondary',
  destructive: 'hover:glow-accent',
  gradient: 'hover:glow-primary',
}

/**
 * AnimatedButton with advanced micro-interactions
 */
export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      magnetic = false,
      glow = false,
      ripple = false,
      loading = false,
      loadingText,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const magneticProps = useMagneticButton(60, 0.2)
    const shouldUseMagnetic = magnetic && !disabled && !loading

    const buttonContent = (
      <>
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
        
        <span className={cn('flex items-center gap-2', loading && 'opacity-0')}>
          {icon && iconPosition === 'left' && (
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={springPresets.snappy}
            >
              {icon}
            </motion.span>
          )}
          
          {loading && loadingText ? loadingText : children}
          
          {icon && iconPosition === 'right' && (
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={springPresets.snappy}
            >
              {icon}
            </motion.span>
          )}
        </span>
      </>
    )

    return (
      <motion.button
        ref={shouldUseMagnetic ? magneticProps.ref : ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center rounded-md font-medium',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'overflow-hidden',
          
          // Variant styles
          buttonVariants[variant],
          
          // Size styles
          buttonSizes[size],
          
          // Glow effect
          glow && buttonGlows[variant as keyof typeof buttonGlows],
          
          // Full width
          fullWidth && 'w-full',
          
          // Custom className
          className
        )}
        disabled={disabled || loading}
        initial="initial"
        whileHover={!disabled && !loading ? "hover" : undefined}
        whileTap={!disabled && !loading ? "tap" : undefined}
        variants={{
          initial: { scale: 1, y: 0 },
          hover: {
            scale: 1.02,
            y: -2,
            transition: springPresets.snappy,
          },
          tap: {
            scale: 0.98,
            y: 0,
            transition: springPresets.stiff,
          },
        }}
        style={
          shouldUseMagnetic
            ? {
                x: magneticProps.x,
                y: magneticProps.y,
              }
            : undefined
        }
        {...props}
      >
        {/* Ripple effect overlay */}
        {ripple && !disabled && !loading && (
          <motion.span
            className="absolute inset-0 bg-white/20 rounded-md"
            initial={{ scale: 0, opacity: 0.6 }}
            whileTap={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        {/* Shimmer effect for gradient variant */}
        {variant === 'gradient' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
        
        {buttonContent}
      </motion.button>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'

/**
 * Preset button variants for common use cases
 */

export const PrimaryButton = (props: Omit<AnimatedButtonProps, 'variant'>) => (
  <AnimatedButton variant="primary" glow magnetic {...props} />
)

export const SecondaryButton = (props: Omit<AnimatedButtonProps, 'variant'>) => (
  <AnimatedButton variant="secondary" {...props} />
)

export const GhostButton = (props: Omit<AnimatedButtonProps, 'variant'>) => (
  <AnimatedButton variant="ghost" {...props} />
)

export const OutlineButton = (props: Omit<AnimatedButtonProps, 'variant'>) => (
  <AnimatedButton variant="outline" {...props} />
)

export const GlassButton = (props: Omit<AnimatedButtonProps, 'variant'>) => (
  <AnimatedButton variant="glass" {...props} />
)

export const GradientButton = (props: Omit<AnimatedButtonProps, 'variant'>) => (
  <AnimatedButton variant="gradient" glow ripple {...props} />
)

export const IconButton = (props: Omit<AnimatedButtonProps, 'size'>) => (
  <AnimatedButton size="icon" {...props} />
)

