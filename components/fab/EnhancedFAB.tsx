/**
 * EnhancedFAB Component
 * Stunning floating action button with glossy design
 */

"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, type ReactNode } from 'react'
import { ArrowUp, ShoppingCart, Heart, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMagneticButton } from '@/lib/hooks/useMouseFollow'
import { springPresets } from '@/lib/animation-config'

interface FABAction {
  icon: ReactNode
  label: string
  onClick: () => void
  badge?: number
  color?: string
}

interface EnhancedFABProps {
  actions?: FABAction[]
  showScrollTop?: boolean
  position?: 'bottom-right' | 'bottom-left'
  className?: string
}

/**
 * Enhanced FAB with glossy design and expandable menu
 */
export const EnhancedFAB = ({
  actions = [],
  showScrollTop = true,
  position = 'bottom-right',
  className,
}: EnhancedFABProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showFAB, setShowFAB] = useState(false)
  const { scrollYProgress } = useScroll()
  const magneticProps = useMagneticButton(80, 0.3)

  // Show FAB after scrolling
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setShowFAB(latest > 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Calculate progress for scroll-to-top
  const circumference = 2 * Math.PI * 22 // radius = 22
  const offset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  )

  const positions = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showFAB) return null

  return (
    <div className={cn('fixed z-50 flex flex-col items-end gap-4', positions[position], className)}>
      {/* Expandable Actions */}
      {isExpanded && (
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={springPresets.snappy}
        >
          {actions.map((action, index) => (
            <motion.button
              key={index}
              className="group relative flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, ...springPresets.snappy }}
              onClick={() => {
                action.onClick()
                setIsExpanded(false)
              }}
            >
              {/* Label */}
              <motion.span
                className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                {action.label}
              </motion.span>

              {/* Action button */}
              <motion.div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: action.color
                    ? `linear-gradient(135deg, ${action.color}dd 0%, ${action.color} 100%)`
                    : 'linear-gradient(135deg, #c65d32 0%, #f97316 100%)',
                  boxShadow: action.color
                    ? `0 4px 20px ${action.color}50`
                    : '0 4px 20px #c65d3250',
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: action.color
                    ? `0 6px 28px ${action.color}60`
                    : '0 6px 28px #c65d3260',
                }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="text-white">
                  {action.icon}
                </div>

                {/* Badge */}
                {action.badge !== undefined && action.badge > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={springPresets.bouncy}
                    style={{
                      boxShadow: '0 2px 12px rgba(239, 68, 68, 0.5)',
                    }}
                  >
                    {action.badge > 99 ? '99+' : action.badge}
                  </motion.span>
                )}
              </motion.div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Main FAB - Menu Toggle or Scroll Top */}
      {actions.length > 0 ? (
        /* Menu Toggle FAB */
        <motion.button
          ref={magneticProps.ref as any}
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.12) 100%)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
            x: magneticProps.x,
            y: magneticProps.y,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 12px 48px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.4)',
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Glossy overlay */}
          <div
            className="absolute inset-0 opacity-50 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />

          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={springPresets.snappy}
          >
            {isExpanded ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </motion.div>
        </motion.button>
      ) : (
        /* Scroll to Top FAB */
        showScrollTop && (
          <motion.button
            ref={magneticProps.ref as any}
            className="relative w-16 h-16 flex items-center justify-center"
            style={{
              x: magneticProps.x,
              y: magneticProps.y,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleScrollTop}
          >
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-muted/20"
                strokeWidth="3"
                fill="none"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-primary"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ strokeDashoffset: offset }}
              />
            </svg>

            {/* Main button */}
            <motion.div
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.12) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
              whileHover={{
                boxShadow: '0 12px 48px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.4)',
              }}
            >
              {/* Glossy overlay */}
              <div
                className="absolute inset-0 opacity-50 pointer-events-none rounded-2xl"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
                }}
              />

              <ArrowUp className="w-6 h-6 text-foreground relative z-10" />
            </motion.div>
          </motion.button>
        )
      )}
    </div>
  )
}

