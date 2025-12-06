/**
 * InteractiveStatCard Component
 * Visually stunning stat card with animations and interactions
 */

"use client"

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedCounter } from '@/components/effects/AnimatedCounter'
import { springPresets } from '@/lib/animation-config'

interface InteractiveStatCardProps {
  value: number
  label: string
  suffix?: string
  icon?: ReactNode
  color?: string
  trend?: number
  trendLabel?: string
  description?: string
  className?: string
}

/**
 * Interactive stat card with hover effects and animations
 */
export const InteractiveStatCard = ({
  value,
  label,
  suffix = '',
  icon,
  color = '#c65d32',
  trend,
  trendLabel,
  description,
  className,
}: InteractiveStatCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const x = (e.clientX - centerX) / rect.width
      const y = (e.clientY - centerY) / rect.height

      mouseX.set(x)
      mouseY.set(y)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    if (isHovered) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isHovered, mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative group', className)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px ${color}20`,
        borderRadius: '2rem',
        perspective: 1500,
        transformStyle: 'preserve-3d',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -12,
        scale: 1.03,
        boxShadow: `0 20px 60px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), 0 8px 32px ${color}40`,
        transition: springPresets.snappy,
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      transition={springPresets.snappy}
    >
      {/* Glossy overlays */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)',
        }}
      />

      {/* Animated glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}40 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 text-center">
        {/* Icon */}
        {icon && (
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
            style={{
              background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
              boxShadow: `0 8px 24px ${color}30`,
            }}
            animate={{
              rotate: isHovered ? [0, 5, -5, 0] : 0,
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
          >
            <div className="text-foreground" style={{ color }}>
              {icon}
            </div>
          </motion.div>
        )}

        {/* Value */}
        <motion.div
          className="text-5xl md:text-6xl font-bold mb-3"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={
            isHovered
              ? {
                  scale: [1, 1.05, 1],
                  transition: { duration: 0.4 },
                }
              : {}
          }
        >
          <AnimatedCounter value={value} suffix={suffix} duration={2000} />
        </motion.div>

        {/* Label */}
        <div className="text-base md:text-lg font-semibold text-foreground mb-2">
          {label}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {/* Trend indicator */}
        {trend !== undefined && (
          <motion.div
            className={cn(
              'mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
              trend > 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <svg
              className={cn('w-4 h-4', trend > 0 && 'rotate-0', trend < 0 && 'rotate-180')}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            <span>{Math.abs(trend)}%</span>
            {trendLabel && <span className="opacity-70">{trendLabel}</span>}
          </motion.div>
        )}
      </div>

      {/* Floating particles */}
      {isHovered &&
        [...Array(5)].map((_, i) => {
          const angle = (i / 5) * Math.PI * 2

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background: color,
                boxShadow: `0 0 10px ${color}`,
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * 100,
                y: Math.sin(angle) * 100,
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          )
        })}
    </motion.div>
  )
}

