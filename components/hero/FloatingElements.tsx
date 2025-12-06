/**
 * FloatingElements Component
 * Decorative floating elements for hero section
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  range?: number
  className?: string
}

/**
 * Single floating element with organic motion
 */
export const FloatingElement = ({
  children,
  delay = 0,
  duration = 6,
  range = 20,
  className,
}: FloatingElementProps) => {
  return (
    <motion.div
      className={cn('absolute', className)}
      animate={{
        y: [-range, range, -range],
        x: [-range / 2, range / 2, -range / 2],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Decorative spice icons floating around
 */
export const FloatingSpiceIcons = ({ className }: { className?: string }) => {
  const spices = [
    { emoji: '🌶️', x: '10%', y: '20%', size: 40, delay: 0 },
    { emoji: '⭐', x: '90%', y: '30%', size: 30, delay: 0.5 },
    { emoji: '🍃', x: '15%', y: '70%', size: 35, delay: 1 },
    { emoji: '☀️', x: '85%', y: '75%', size: 45, delay: 1.5 },
    { emoji: '🌸', x: '50%', y: '10%', size: 25, delay: 2 },
  ]

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {spices.map((spice, index) => (
        <FloatingElement
          key={index}
          delay={spice.delay}
          duration={8 + index}
          range={30}
          className={cn('opacity-20')}
          style={{
            left: spice.x,
            top: spice.y,
            fontSize: spice.size,
          }}
        >
          <motion.span
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {spice.emoji}
          </motion.span>
        </FloatingElement>
      ))}
    </div>
  )
}

/**
 * Floating circular decorations
 */
export const FloatingCircles = ({ className }: { className?: string }) => {
  const circles = [
    { size: 100, x: '5%', y: '15%', opacity: 0.1, duration: 8 },
    { size: 150, x: '92%', y: '25%', opacity: 0.08, duration: 10 },
    { size: 80, x: '10%', y: '80%', opacity: 0.12, duration: 12 },
    { size: 120, x: '88%', y: '85%', opacity: 0.09, duration: 9 },
  ]

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {circles.map((circle, index) => (
        <FloatingElement
          key={index}
          delay={index * 0.5}
          duration={circle.duration}
          range={40}
          className="opacity-0"
          style={{
            left: circle.x,
            top: circle.y,
          }}
        >
          <motion.div
            className="rounded-full border-2 border-primary"
            style={{
              width: circle.size,
              height: circle.size,
              opacity: circle.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [circle.opacity, circle.opacity * 1.5, circle.opacity],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </FloatingElement>
      ))}
    </div>
  )
}

/**
 * Floating gradient orbs
 */
export const FloatingOrbs = ({ className }: { className?: string }) => {
  const orbs = [
    { color: '#c65d32', size: 200, x: '15%', y: '25%', blur: 80 },
    { color: '#fbbf24', size: 250, x: '75%', y: '35%', blur: 100 },
    { color: '#ef4444', size: 180, x: '50%', y: '70%', blur: 90 },
  ]

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {orbs.map((orb, index) => (
        <FloatingElement
          key={index}
          delay={index * 0.8}
          duration={15 + index * 2}
          range={50}
          style={{
            left: orb.x,
            top: orb.y,
          }}
        >
          <motion.div
            className="rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}40 0%, transparent 70%)`,
              filter: `blur(${orb.blur}px)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          />
        </FloatingElement>
      ))}
    </div>
  )
}

