/**
 * RippleEffect Component
 * Material Design ripple effect
 */

"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Ripple {
  id: number
  x: number
  y: number
}

interface RippleEffectProps {
  color?: string
  duration?: number
  className?: string
  children?: React.ReactNode
}

/**
 * Ripple effect container
 */
export const RippleEffect = ({
  color = 'rgba(255, 255, 255, 0.5)',
  duration = 0.6,
  className,
  children,
}: RippleEffectProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const addRipple = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, duration * 1000)
  }, [duration])

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseDown={addRipple}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: color,
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 1,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              width: 500,
              height: 500,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * Ripple button (button with built-in ripple)
 */
export const RippleButton = ({
  children,
  onClick,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <RippleEffect className={cn('inline-block', className)}>
      <button
        onClick={onClick}
        className={cn(
          'relative px-6 py-3 bg-primary text-primary-foreground rounded-md',
          'font-medium transition-colors hover:bg-primary/90',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
        )}
        {...props}
      >
        {children}
      </button>
    </RippleEffect>
  )
}

