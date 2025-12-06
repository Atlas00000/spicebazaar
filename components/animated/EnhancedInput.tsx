/**
 * EnhancedInput Component
 * Input with advanced focus states and animations
 */

"use client"

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'

interface EnhancedInputProps extends Omit<HTMLMotionProps<'input'>, 'size'> {
  label?: string
  error?: string
  success?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  helperText?: string
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const inputSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
}

/**
 * EnhancedInput with micro-interactions
 */
export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  (
    {
      label,
      error,
      success,
      icon,
      iconPosition = 'left',
      helperText,
      fullWidth = false,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const hasError = !!error
    const hasSuccess = success && !hasError

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <motion.label
            className={cn(
              'block text-sm font-medium mb-2 transition-colors duration-200',
              hasError ? 'text-destructive' : hasSuccess ? 'text-green-600' : 'text-foreground',
              isFocused && !hasError && !hasSuccess && 'text-primary'
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.snappy}
          >
            {label}
          </motion.label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {icon && iconPosition === 'left' && (
            <motion.div
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200',
                hasError ? 'text-destructive' : hasSuccess ? 'text-green-600' : 'text-muted-foreground',
                isFocused && !hasError && !hasSuccess && 'text-primary'
              )}
              animate={
                isFocused
                  ? { scale: 1.1, rotate: [0, -5, 5, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={springPresets.bouncy}
            >
              {icon}
            </motion.div>
          )}

          {/* Input field */}
          <motion.input
            ref={ref}
            className={cn(
              // Base styles
              'w-full rounded-md border bg-background',
              'text-foreground placeholder:text-muted-foreground',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              
              // Size
              inputSizes[size],
              
              // Icon padding
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              
              // States
              hasError && 'border-destructive focus:ring-destructive',
              hasSuccess && 'border-green-600 focus:ring-green-600',
              !hasError && !hasSuccess && 'border-border focus:ring-primary',
              
              // Disabled
              props.disabled && 'opacity-50 cursor-not-allowed',
              
              className
            )}
            initial={{ scale: 1 }}
            animate={{
              scale: isFocused ? 1.01 : 1,
            }}
            transition={springPresets.snappy}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e as any)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e as any)
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0)
              props.onChange?.(e as any)
            }}
            {...props}
          />

          {/* Right icon */}
          {icon && iconPosition === 'right' && (
            <motion.div
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200',
                hasError ? 'text-destructive' : hasSuccess ? 'text-green-600' : 'text-muted-foreground',
                isFocused && !hasError && !hasSuccess && 'text-primary'
              )}
              animate={
                isFocused
                  ? { scale: 1.1, rotate: [0, 5, -5, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={springPresets.bouncy}
            >
              {icon}
            </motion.div>
          )}

          {/* Success checkmark */}
          {hasSuccess && !icon && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={springPresets.bouncy}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>
          )}

          {/* Focus ring animation */}
          {isFocused && (
            <motion.div
              className={cn(
                'absolute inset-0 rounded-md pointer-events-none',
                hasError ? 'ring-2 ring-destructive' : hasSuccess ? 'ring-2 ring-green-600' : 'ring-2 ring-primary'
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={springPresets.snappy}
            />
          )}
        </div>

        {/* Helper text or error */}
        {(helperText || error) && (
          <motion.p
            className={cn(
              'mt-2 text-sm',
              hasError ? 'text-destructive' : 'text-muted-foreground'
            )}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.snappy}
          >
            {error || helperText}
          </motion.p>
        )}
      </div>
    )
  }
)

EnhancedInput.displayName = 'EnhancedInput'

