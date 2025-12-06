/**
 * ProgressBar Component
 * Animated progress indicators
 */

"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'

interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  showPercentage?: boolean
  variant?: 'default' | 'gradient' | 'striped'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  animated?: boolean
  className?: string
}

const sizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-4',
}

/**
 * ProgressBar with smooth animations
 */
export const ProgressBar = ({
  value,
  max = 100,
  showLabel = false,
  showPercentage = false,
  variant = 'default',
  size = 'md',
  color = 'bg-primary',
  animated = true,
  className,
}: ProgressBarProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {showLabel && (
            <span className="text-sm font-medium text-foreground">Progress</span>
          )}
          {showPercentage && (
            <motion.span
              className="text-sm font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={Math.floor(displayValue)}
            >
              {Math.round(displayValue)}%
            </motion.span>
          )}
        </div>
      )}

      <div
        className={cn(
          'w-full bg-muted rounded-full overflow-hidden relative',
          sizes[size]
        )}
      >
        <motion.div
          className={cn(
            'h-full rounded-full',
            variant === 'gradient' 
              ? 'bg-gradient-to-r from-primary via-secondary to-accent'
              : color,
            variant === 'striped' && 'bg-stripes'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={animated ? springPresets.snappy : { duration: 0 }}
        >
          {/* Shimmer effect */}
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}

/**
 * Circular progress indicator
 */
export const CircularProgress = ({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  showPercentage = true,
  color = 'stroke-primary',
  className,
}: {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  showPercentage?: boolean
  color?: string
  className?: string
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={springPresets.snappy}
        />
      </svg>
      
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-lg font-bold text-foreground">
            {Math.round(percentage)}%
          </span>
        </motion.div>
      )}
    </div>
  )
}

/**
 * Step progress indicator
 */
export const StepProgress = ({
  steps,
  currentStep,
  className,
}: {
  steps: string[]
  currentStep: number
  className?: string
}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            {/* Step circle */}
            <motion.div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                'border-2 transition-colors duration-300',
                index < currentStep
                  ? 'bg-primary text-primary-foreground border-primary'
                  : index === currentStep
                  ? 'bg-primary/10 text-primary border-primary'
                  : 'bg-muted text-muted-foreground border-muted'
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, ...springPresets.bouncy }}
            >
              {index < currentStep ? (
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <path d="M5 13l4 4L19 7" />
                </motion.svg>
              ) : (
                index + 1
              )}
            </motion.div>
            
            {/* Step label */}
            <motion.span
              className={cn(
                'mt-2 text-sm text-center',
                index <= currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {step}
            </motion.span>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-0.5 -z-10">
                <div className="h-full bg-muted" />
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={springPresets.snappy}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Indeterminate progress bar (for unknown duration)
 */
export const IndeterminateProgress = ({ className }: { className?: string }) => (
  <div className={cn('w-full h-1 bg-muted rounded-full overflow-hidden', className)}>
    <motion.div
      className="h-full w-1/3 bg-primary rounded-full"
      animate={{
        x: ['-100%', '400%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </div>
)

