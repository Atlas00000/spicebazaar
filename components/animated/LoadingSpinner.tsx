/**
 * LoadingSpinner Component
 * Animated spinner with multiple variants
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type SpinnerVariant = 'circle' | 'dots' | 'bars' | 'pulse' | 'ring'
type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

interface LoadingSpinnerProps {
  variant?: SpinnerVariant
  size?: SpinnerSize
  color?: string
  className?: string
}

const sizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

/**
 * Circle spinner (default)
 */
const CircleSpinner = ({ size, color }: { size: number; color: string }) => (
  <motion.div
    className={cn('border-2 border-t-transparent rounded-full', color)}
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
)

/**
 * Dots spinner
 */
const DotsSpinner = ({ size, color }: { size: number; color: string }) => {
  const dotSize = size / 4
  
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn('rounded-full', color)}
          style={{ width: dotSize, height: dotSize }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/**
 * Bars spinner
 */
const BarsSpinner = ({ size, color }: { size: number; color: string }) => {
  const barWidth = size / 8
  const barHeight = size
  
  return (
    <div className="flex items-end gap-1" style={{ height: size }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={cn('rounded-sm', color)}
          style={{ width: barWidth }}
          animate={{
            height: [barHeight * 0.3, barHeight, barHeight * 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/**
 * Pulse spinner
 */
const PulseSpinner = ({ size, color }: { size: number; color: string }) => (
  <motion.div
    className={cn('rounded-full', color)}
    style={{ width: size, height: size }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

/**
 * Ring spinner (dual ring)
 */
const RingSpinner = ({ size, color }: { size: number; color: string }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <motion.div
      className={cn('absolute inset-0 border-2 border-t-transparent rounded-full', color)}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
    <motion.div
      className={cn('absolute inset-2 border-2 border-b-transparent rounded-full', color)}
      animate={{ rotate: -360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </div>
)

/**
 * LoadingSpinner with multiple variants
 */
export const LoadingSpinner = ({
  variant = 'circle',
  size = 'md',
  color = 'border-primary bg-primary',
  className,
}: LoadingSpinnerProps) => {
  const sizeValue = sizes[size]
  
  const spinnerComponents = {
    circle: <CircleSpinner size={sizeValue} color={color} />,
    dots: <DotsSpinner size={sizeValue} color={color} />,
    bars: <BarsSpinner size={sizeValue} color={color} />,
    pulse: <PulseSpinner size={sizeValue} color={color} />,
    ring: <RingSpinner size={sizeValue} color={color} />,
  }

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      {spinnerComponents[variant]}
    </div>
  )
}

/**
 * Loading overlay (full screen or container)
 */
export const LoadingOverlay = ({
  visible = true,
  message,
  variant = 'circle',
  blur = true,
}: {
  visible?: boolean
  message?: string
  variant?: SpinnerVariant
  blur?: boolean
}) => {
  if (!visible) return null

  return (
    <motion.div
      className={cn(
        'absolute inset-0 z-50 flex flex-col items-center justify-center gap-4',
        'bg-background/80',
        blur && 'backdrop-blur-sm'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <LoadingSpinner variant={variant} size="lg" />
      {message && (
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  )
}

/**
 * Inline loading indicator
 */
export const InlineLoader = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="inline-flex items-center gap-2">
    <LoadingSpinner size="sm" />
    <span className="text-sm text-muted-foreground">{text}</span>
  </div>
)

