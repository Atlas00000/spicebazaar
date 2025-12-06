/**
 * AnimatedCard Component
 * Enhanced card with glassmorphism, 3D effects, and interactions
 */

"use client"

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, type ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'
import { use3DParallax } from '@/lib/hooks/useParallax'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'

type CardVariant = 
  | 'default' 
  | 'elevated' 
  | 'outlined' 
  | 'glass'
  | 'gradient'
  | 'interactive'

interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  children: ReactNode
  variant?: CardVariant
  hover3D?: boolean
  glow?: boolean
  glowColor?: 'primary' | 'secondary' | 'accent'
  revealOnScroll?: boolean
  interactive?: boolean
  onClick?: () => void
  className?: string
}

const cardVariants = {
  default: 'bg-card border border-border shadow-sm',
  elevated: 'bg-card border border-border elevation-3',
  outlined: 'bg-transparent border-2 border-border',
  glass: 'glass border-white/20',
  gradient: 'bg-gradient-to-br from-card via-card/95 to-muted border border-border/50',
  interactive: 'bg-card border border-border shadow-sm cursor-pointer hover:elevation-4',
}

const glowColors = {
  primary: 'hover:glow-primary',
  secondary: 'hover:glow-secondary',
  accent: 'hover:glow-accent',
}

/**
 * AnimatedCard with advanced effects
 */
export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      children,
      variant = 'default',
      hover3D = false,
      glow = false,
      glowColor = 'primary',
      revealOnScroll = false,
      interactive = false,
      onClick,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const [isHovered, setIsHovered] = useState(false)
    
    // 3D parallax effect
    const parallax3D = use3DParallax({
      maxTilt: hover3D ? 8 : 0,
      perspective: 1500,
      scale: 1.02,
    })
    
    // Scroll reveal animation
    const scrollReveal = useScrollReveal({
      threshold: 'early',
      triggerOnce: true,
    })
    
    const shouldUse3D = hover3D && !onClick
    const ref = shouldUse3D ? parallax3D.ref : (revealOnScroll ? scrollReveal.ref : forwardedRef)

    return (
      <motion.div
        ref={ref as any}
        className={cn(
          // Base styles
          'rounded-lg overflow-hidden transition-all duration-300',
          
          // Variant styles
          cardVariants[variant],
          
          // Interactive styles
          (interactive || onClick) && 'cursor-pointer hover:scale-[1.02]',
          
          // Glow effect
          glow && glowColors[glowColor],
          
          // Custom className
          className
        )}
        initial={revealOnScroll ? "hidden" : "visible"}
        animate={revealOnScroll ? (scrollReveal.isVisible ? "visible" : "hidden") : "visible"}
        variants={{
          hidden: { 
            opacity: 0, 
            y: 40,
            scale: 0.95,
          },
          visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: springPresets.snappy,
          },
        }}
        whileHover={
          (interactive || onClick) && !hover3D
            ? {
                y: -4,
                transition: springPresets.snappy,
              }
            : undefined
        }
        whileTap={
          (interactive || onClick)
            ? {
                scale: 0.98,
                transition: springPresets.stiff,
              }
            : undefined
        }
        style={
          shouldUse3D
            ? {
                ...parallax3D.style,
                rotateX: parallax3D.transform.rotateX,
                rotateY: parallax3D.transform.rotateY,
                scale: parallax3D.transform.scale,
              }
            : undefined
        }
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        {...props}
      >
        {/* Shine effect on hover */}
        {(interactive || onClick || hover3D) && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 pointer-events-none"
            initial={{ opacity: 0, x: '-100%', y: '-100%' }}
            animate={
              isHovered
                ? { opacity: 1, x: '100%', y: '100%' }
                : { opacity: 0, x: '-100%', y: '-100%' }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
        
        {children}
      </motion.div>
    )
  }
)

AnimatedCard.displayName = 'AnimatedCard'

/**
 * Card sub-components for consistent structure
 */

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={cn('p-6 pb-4', className)}>
    {children}
  </div>
)

export const CardTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h3 className={cn('text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground', className)}>
    {children}
  </h3>
)

export const CardDescription = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn('text-sm text-muted-foreground mt-2', className)}>
    {children}
  </p>
)

export const CardContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('p-6 pt-0', className)}>
    {children}
  </div>
)

export const CardFooter = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('p-6 pt-0 flex items-center gap-2', className)}>
    {children}
  </div>
)

/**
 * Preset card variants
 */

export const GlassCard = (props: Omit<AnimatedCardProps, 'variant'>) => (
  <AnimatedCard variant="glass" {...props} />
)

export const ElevatedCard = (props: Omit<AnimatedCardProps, 'variant'>) => (
  <AnimatedCard variant="elevated" glow {...props} />
)

export const InteractiveCard = (props: Omit<AnimatedCardProps, 'variant' | 'interactive'>) => (
  <AnimatedCard variant="interactive" interactive hover3D glow {...props} />
)

export const GradientCard = (props: Omit<AnimatedCardProps, 'variant'>) => (
  <AnimatedCard variant="gradient" {...props} />
)

