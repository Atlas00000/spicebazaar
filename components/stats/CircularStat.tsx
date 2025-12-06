/**
 * CircularStat Component
 * Stat with circular progress ring
 */

"use client"

import { motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedCounter } from '@/components/effects/AnimatedCounter'
import { springPresets } from '@/lib/animation-config'

interface CircularStatProps {
  value: number
  max?: number
  label: string
  suffix?: string
  icon?: ReactNode
  color?: string
  size?: number
  strokeWidth?: number
  showPercentage?: boolean
  description?: string
  trend?: number
  trendLabel?: string
  className?: string
}

/**
 * Circular stat with animated progress ring
 */
export const CircularStat = ({
  value,
  max = 100,
  label,
  suffix = '',
  icon,
  color = '#c65d32',
  size = 180,
  strokeWidth = 10,
  showPercentage = false,
  description,
  trend,
  trendLabel,
  className,
}: CircularStatProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const percentage = Math.min((value / max) * 100, 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <motion.div
      className={cn('relative group', className)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px ${color}20`,
        borderRadius: '2rem',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -12,
        scale: 1.03,
        boxShadow: `0 20px 60px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), 0 8px 32px ${color}40`,
        transition: springPresets.snappy,
      }}
    >
      {/* Glossy overlays */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col items-center">
        {/* SVG Progress Ring */}
        <div className="relative mb-6">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="stroke-muted/30"
              strokeWidth={strokeWidth}
              fill="none"
            />

            {/* Progress circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
              style={{
                stroke: color,
                filter: `drop-shadow(0 0 8px ${color}60)`,
              }}
            />

            {/* Animated dots along the ring */}
            {isHovered && (
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill={color}
                initial={{ r: 0, opacity: 0 }}
                animate={{
                  r: strokeWidth / 2,
                  opacity: [0, 1, 1, 0],
                }}
                style={{
                  transformOrigin: 'center',
                  offsetPath: `path('M ${size / 2} ${strokeWidth / 2} A ${radius} ${radius} 0 1 1 ${size / 2} ${size - strokeWidth / 2} A ${radius} ${radius} 0 1 1 ${size / 2} ${strokeWidth / 2}')`,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {icon && (
              <motion.div
                className="mb-2"
                style={{ color }}
                animate={
                  isHovered
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                {icon}
              </motion.div>
            )}
            
            <motion.div
              className="text-4xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <AnimatedCounter value={value} suffix={suffix} />
            </motion.div>

            {showPercentage && (
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round(percentage)}%
              </div>
            )}
          </div>
        </div>

        {/* Label */}
        <div className="text-lg font-bold text-foreground mb-1 text-center">
          {label}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground text-center">
            {description}
          </p>
        )}

        {/* Trend */}
        {trend !== undefined && (
          <motion.div
            className={cn(
              'mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold',
              trend > 0 ? 'bg-green-500/15 text-green-600' : 'bg-red-500/15 text-red-600'
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <svg
              className={cn('w-3 h-3', trend > 0 && 'rotate-0', trend < 0 && 'rotate-180')}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            {Math.abs(trend)}% {trendLabel || 'this month'}
          </motion.div>
        )}
      </div>

      {/* Particle burst on hover */}
      {isHovered &&
        [...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2

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
                x: Math.cos(angle) * 120,
                y: Math.sin(angle) * 120,
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          )
        })}
    </motion.div>
  )
}

