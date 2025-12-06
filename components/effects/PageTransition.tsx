/**
 * PageTransition Component
 * Smooth page transitions with multiple variants
 */

"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'
import { pageTransitions } from '@/lib/animation-config'

type TransitionVariant = 'fade' | 'fadeScale' | 'slideUp' | 'slideRight'

interface PageTransitionProps {
  children: ReactNode
  variant?: TransitionVariant
}

/**
 * PageTransition wrapper for route changes
 */
export const PageTransition = ({
  children,
  variant = 'fadeScale',
}: PageTransitionProps) => {
  const pathname = usePathname()
  const transition = pageTransitions[variant]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={transition.initial}
        animate={transition.animate}
        exit={transition.exit}
        transition={transition.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Curtain transition effect
 */
export const CurtainTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Top curtain */}
        <motion.div
          className="fixed inset-x-0 top-0 h-1/2 bg-primary z-50"
          initial={{ y: '-100%' }}
          animate={{ y: '-100%' }}
          exit={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Bottom curtain */}
        <motion.div
          className="fixed inset-x-0 bottom-0 h-1/2 bg-primary z-50"
          initial={{ y: '100%' }}
          animate={{ y: '100%' }}
          exit={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Wipe transition effect
 */
export const WipeTransition = ({ 
  children,
  color = 'bg-primary',
}: { 
  children: ReactNode
  color?: string
}) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Wipe overlay */}
        <motion.div
          className={cn('fixed inset-0 z-50', color)}
          initial={{ x: '-100%' }}
          animate={{ x: '-100%' }}
          exit={{ x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Circle expand transition
 */
export const CircleTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Circle overlay */}
        <motion.div
          className="fixed inset-0 z-50 bg-primary"
          style={{
            clipPath: 'circle(0% at 50% 50%)',
          }}
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(0% at 50% 50%)' }}
          exit={{ clipPath: 'circle(150% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Add missing import
import { cn } from '@/lib/utils'

