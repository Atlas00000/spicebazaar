/**
 * FloatingActionButton Component
 * FAB with expandable menu and animations
 */

"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'
import { useMagneticButton } from '@/lib/hooks/useMouseFollow'

interface FABAction {
  icon: ReactNode
  label: string
  onClick: () => void
  color?: string
}

interface FloatingActionButtonProps {
  icon: ReactNode
  actions?: FABAction[]
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size?: 'md' | 'lg'
  color?: string
  badge?: number
  tooltip?: string
  onClick?: () => void
}

const positions = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6',
}

const sizes = {
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
}

/**
 * FloatingActionButton with expandable menu
 */
export const FloatingActionButton = ({
  icon,
  actions,
  position = 'bottom-right',
  size = 'lg',
  color = 'bg-primary text-primary-foreground',
  badge,
  tooltip,
  onClick,
}: FloatingActionButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const magneticProps = useMagneticButton(80, 0.3)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (actions && actions.length > 0) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className={cn('fixed z-50', positions[position])}>
      {/* Expandable action menu */}
      <AnimatePresence>
        {isExpanded && actions && (
          <motion.div
            className={cn(
              'absolute flex flex-col gap-3 mb-3',
              position.includes('bottom') ? 'bottom-full' : 'top-full',
              position.includes('right') ? 'right-0' : 'left-0'
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={springPresets.snappy}
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-full shadow-lg',
                  'backdrop-blur-sm border border-border/50',
                  action.color || 'bg-card text-foreground hover:bg-muted'
                )}
                initial={{ opacity: 0, x: position.includes('right') ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: position.includes('right') ? 20 : -20 }}
                transition={{
                  ...springPresets.snappy,
                  delay: index * 0.05,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  action.onClick()
                  setIsExpanded(false)
                }}
              >
                {position.includes('right') ? (
                  <>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {action.label}
                    </span>
                    {action.icon}
                  </>
                ) : (
                  <>
                    {action.icon}
                    <span className="text-sm font-medium whitespace-nowrap">
                      {action.label}
                    </span>
                  </>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        ref={magneticProps.ref as any}
        className={cn(
          'relative rounded-full shadow-lg',
          'flex items-center justify-center',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'transition-colors duration-200',
          sizes[size],
          color
        )}
        style={{
          x: magneticProps.x,
          y: magneticProps.y,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: isExpanded ? 45 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={springPresets.bouncy}
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon}

        {/* Badge */}
        {badge !== undefined && badge > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs font-bold rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={springPresets.bouncy}
          >
            {badge > 99 ? '99+' : badge}
          </motion.span>
        )}

        {/* Ripple effect */}
        <motion.span
          className="absolute inset-0 rounded-full bg-current opacity-20"
          initial={{ scale: 1, opacity: 0 }}
          whileTap={{ scale: 0, opacity: 0.3 }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && tooltip && !isExpanded && (
          <motion.div
            className={cn(
              'absolute whitespace-nowrap px-3 py-2 rounded-md',
              'bg-card border border-border shadow-lg text-sm font-medium',
              position.includes('bottom') ? 'bottom-full mb-2' : 'top-full mt-2',
              position.includes('right') ? 'right-0' : 'left-0'
            )}
            initial={{ opacity: 0, y: position.includes('bottom') ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position.includes('bottom') ? 10 : -10 }}
            transition={springPresets.fast}
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Scroll to top FAB
 */
export const ScrollToTopFAB = ({ threshold = 300 }: { threshold?: number }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  if (!isVisible) return null

  return (
    <FloatingActionButton
      icon={
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      }
      tooltip="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    />
  )
}

// Import useEffect
import { useEffect } from 'react'

