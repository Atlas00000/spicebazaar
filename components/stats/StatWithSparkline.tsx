/**
 * StatWithSparkline Component
 * Stat card with mini chart visualization
 */

"use client"

import { motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedCounter } from '@/components/effects/AnimatedCounter'
import { springPresets } from '@/lib/animation-config'

interface StatWithSparklineProps {
  value: number
  label: string
  suffix?: string
  icon?: ReactNode
  color?: string
  data?: number[]
  trend?: 'up' | 'down' | 'neutral'
  description?: string
  className?: string
}

/**
 * Stat with sparkline chart
 */
export const StatWithSparkline = ({
  value,
  label,
  suffix = '',
  icon,
  color = '#c65d32',
  data = [20, 35, 30, 50, 45, 60, 55, 70],
  trend = 'up',
  description,
  className,
}: StatWithSparklineProps) => {
  const [isHovered, setIsHovered] = useState(false)

  // Generate SVG path from data
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 200
  const height = 60
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * height
    return `${x},${y}`
  })
  const pathD = `M ${points.join(' L ')}`

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

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          {icon && (
            <motion.div
              className="flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
                boxShadow: `0 4px 16px ${color}30`,
              }}
              animate={
                isHovered
                  ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }
                  : {}
              }
              transition={{ duration: 0.6 }}
            >
              <div style={{ color }}>
                {icon}
              </div>
            </motion.div>
          )}

          {/* Trend badge */}
          <motion.div
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-semibold',
              trend === 'up' && 'bg-green-500/15 text-green-600',
              trend === 'down' && 'bg-red-500/15 text-red-600',
              trend === 'neutral' && 'bg-muted text-muted-foreground'
            )}
            whileHover={{ scale: 1.1 }}
          >
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trend === 'neutral' && '→'}
          </motion.div>
        </div>

        {/* Value */}
        <motion.div
          className="text-4xl md:text-5xl font-bold mb-2"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          <AnimatedCounter value={value} suffix={suffix} />
        </motion.div>

        {/* Label */}
        <div className="text-sm font-semibold text-foreground mb-4">
          {label}
        </div>

        {/* Sparkline Chart */}
        <div className="relative h-16 rounded-xl overflow-hidden mb-2">
          {/* Chart background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(to top, ${color}40 0%, transparent 100%)`,
            }}
          />

          {/* SVG sparkline */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="relative z-10"
          >
            {/* Area fill */}
            <motion.path
              d={`${pathD} L ${width},${height} L 0,${height} Z`}
              fill={`url(#gradient-${label})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
              style={{
                filter: `drop-shadow(0 2px 4px ${color}40)`,
              }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Data points */}
            {isHovered &&
              data.map((val, i) => {
                const x = (i / (data.length - 1)) * width
                const y = height - ((val - min) / range) * height

                return (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={color}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    style={{
                      filter: `drop-shadow(0 0 4px ${color})`,
                    }}
                  />
                )
              })}
          </svg>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground text-center">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  )
}

