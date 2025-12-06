/**
 * FABCluster Component
 * Cluster of floating action buttons with stunning design
 */

"use client"

import { motion, useScroll } from 'framer-motion'
import { useState, useEffect, type ReactNode } from 'react'
import { ArrowUp, ShoppingCart, Heart, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMagneticButton } from '@/lib/hooks/useMouseFollow'
import { springPresets } from '@/lib/animation-config'

interface FABClusterProps {
  cartCount?: number
  wishlistCount?: number
  onCartClick?: () => void
  onWishlistClick?: () => void
  onChatClick?: () => void
  position?: 'bottom-right' | 'bottom-left'
  className?: string
}

/**
 * FAB cluster with multiple actions
 */
export const FABCluster = ({
  cartCount = 0,
  wishlistCount = 0,
  onCartClick,
  onWishlistClick,
  onChatClick,
  position = 'bottom-right',
  className,
}: FABClusterProps) => {
  const [showFAB, setShowFAB] = useState(false)
  const { scrollYProgress } = useScroll()

  // Show FAB after scrolling
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setShowFAB(latest > 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Calculate progress for scroll-to-top
  const circumference = 2 * Math.PI * 26
  const offset = circumference - scrollYProgress.get() * circumference

  const positions = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
  }

  const fabs = [
    {
      icon: <ArrowUp className="w-5 h-5" />,
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      color: '#c65d32',
      tooltip: 'Scroll to top',
      showProgress: true,
    },
    {
      icon: <Heart className="w-5 h-5" />,
      onClick: onWishlistClick,
      badge: wishlistCount,
      color: '#ef4444',
      tooltip: 'Wishlist',
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      onClick: onCartClick,
      badge: cartCount,
      color: '#fbbf24',
      tooltip: 'Cart',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: onChatClick,
      color: '#10b981',
      tooltip: 'Help',
    },
  ]

  if (!showFAB) return null

  return (
    <div className={cn('fixed z-50 flex flex-col gap-4', positions[position], className)}>
      {fabs.map((fab, index) => (
        <FABButton
          key={index}
          {...fab}
          delay={index * 0.05}
          circumference={circumference}
          progressOffset={offset}
        />
      ))}
    </div>
  )
}

/**
 * Individual FAB button
 */
const FABButton = ({
  icon,
  onClick,
  badge,
  color,
  tooltip,
  showProgress,
  delay,
  circumference,
  progressOffset,
}: {
  icon: ReactNode
  onClick?: () => void
  badge?: number
  color: string
  tooltip?: string
  showProgress?: boolean
  delay?: number
  circumference?: number
  progressOffset?: number
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const magneticProps = useMagneticButton(60, 0.25)

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ ...springPresets.bouncy, delay }}
    >
      {/* Tooltip */}
      {showTooltip && tooltip && (
        <motion.div
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl whitespace-nowrap"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          <span className="text-sm font-medium text-foreground">{tooltip}</span>
        </motion.div>
      )}

      {/* Button */}
      <motion.button
        ref={magneticProps.ref as any}
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.12) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: `0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 20px ${color}20`,
          x: magneticProps.x,
          y: magneticProps.y,
        }}
        onHoverStart={() => {
          setIsHovered(true)
          setShowTooltip(true)
        }}
        onHoverEnd={() => {
          setIsHovered(false)
          setShowTooltip(false)
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: `0 12px 48px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.4), 0 8px 32px ${color}40`,
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
      >
        {/* Progress ring for scroll-to-top */}
        {showProgress && circumference && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="26"
              className="stroke-muted/20"
              strokeWidth="2"
              fill="none"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="26"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{
                strokeDashoffset: progressOffset,
                stroke: color,
                filter: `drop-shadow(0 0 4px ${color})`,
              }}
            />
          </svg>
        )}

        {/* Glossy overlay */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none rounded-2xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }}
        />

        {/* Icon */}
        <div className="relative z-10" style={{ color }}>
          {icon}
        </div>

        {/* Badge */}
        {badge !== undefined && badge > 0 && (
          <motion.span
            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={springPresets.bouncy}
            style={{
              boxShadow: '0 4px 16px rgba(239, 68, 68, 0.5)',
            }}
          >
            {badge > 99 ? '99+' : badge}
          </motion.span>
        )}

        {/* Pulse ring on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              border: `2px solid ${color}`,
            }}
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </motion.button>

      {/* Floating particles on hover */}
      {isHovered &&
        [...Array(4)].map((_, i) => {
          const angle = (i / 4) * Math.PI * 2

          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                background: color,
                boxShadow: `0 0 8px ${color}`,
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * 50,
                y: Math.sin(angle) * 50,
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeOut',
              }}
            />
          )
        })}
    </motion.div>
  )
}

