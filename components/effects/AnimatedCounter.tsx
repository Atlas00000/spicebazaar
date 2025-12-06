/**
 * AnimatedCounter Component
 * Animated number counter with easing
 */

"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { easeOutExpo } from '@/lib/easing-functions'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  startOnView?: boolean
  className?: string
}

/**
 * AnimatedCounter with smooth counting animation
 */
export const AnimatedCounter = ({
  value,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  startOnView = true,
  className,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(!startOnView)
  const { ref, isVisible } = useScrollReveal({
    threshold: 'quarter',
    triggerOnce: true,
  })

  useEffect(() => {
    if (startOnView && isVisible && !hasStarted) {
      setHasStarted(true)
    }
  }, [isVisible, startOnView, hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    const startValue = displayValue

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = easeOutExpo(progress)
      const currentValue = startValue + (value - startValue) * easedProgress

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasStarted, value, duration])

  const formattedValue = displayValue.toFixed(decimals)
  const [integerPart, decimalPart] = formattedValue.split('.')
  
  // Add thousand separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  const finalValue = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger

  return (
    <span ref={ref as any} className={cn('font-bold tabular-nums', className)}>
      {prefix}
      {finalValue}
      {suffix}
    </span>
  )
}

/**
 * Spring-based counter (smoother for frequently updating values)
 */
export const SpringCounter = ({
  value,
  ...props
}: Omit<AnimatedCounterProps, 'duration'>) => {
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  const display = useTransform(spring, (latest) =>
    Math.round(latest).toLocaleString()
  )

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return (
    <motion.span className={cn('font-bold tabular-nums', props.className)}>
      {props.prefix}
      {display}
      {props.suffix}
    </motion.span>
  )
}

/**
 * Odometer-style counter (digits flip individually)
 */
export const OdometerCounter = ({
  value,
  digits = 6,
  className,
}: {
  value: number
  digits?: number
  className?: string
}) => {
  const valueStr = value.toString().padStart(digits, '0')

  return (
    <div className={cn('inline-flex gap-1', className)}>
      {valueStr.split('').map((digit, index) => (
        <motion.div
          key={index}
          className="relative w-8 h-12 bg-card border border-border rounded overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-start"
            animate={{ y: `-${parseInt(digit) * 3}rem` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div
                key={num}
                className="flex items-center justify-center h-12 text-2xl font-bold"
              >
                {num}
              </div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Percentage counter with progress ring
 */
export const PercentageCounter = ({
  value,
  size = 120,
  strokeWidth = 12,
  showValue = true,
  color = 'stroke-primary',
  className,
}: {
  value: number
  size?: number
  strokeWidth?: number
  showValue?: boolean
  color?: string
  className?: string
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="none"
        />
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
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedCounter
            value={value}
            suffix="%"
            className="text-3xl"
          />
        </div>
      )}
    </div>
  )
}

