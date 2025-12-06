"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FluidProgressProps {
  progress?: number
  showPercentage?: boolean
  variant?: 'linear' | 'circular' | 'wave'
}

export const FluidProgress = ({ 
  progress, 
  showPercentage = true,
  variant = 'linear' 
}: FluidProgressProps) => {
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    if (progress !== undefined) {
      const timer = setTimeout(() => {
        setCurrentProgress(progress)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Simulate progress if not provided
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 95) return prev
          return prev + Math.random() * 5
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [progress])

  if (variant === 'circular') {
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (currentProgress / 100) * circumference

    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(198, 93, 50, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c65d32" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold" style={{ color: '#c65d32' }}>
              {Math.round(currentProgress)}%
            </span>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div className="relative w-full h-2 overflow-hidden rounded-full">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(198, 93, 50, 0.2) 0%, rgba(251, 191, 36, 0.2) 50%, rgba(239, 68, 68, 0.2) 100%)',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
            clipPath: `inset(0 ${100 - currentProgress}% 0 0)`,
          }}
          animate={{
            clipPath: `inset(0 ${100 - currentProgress}% 0 0)`,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>
    )
  }

  // Linear variant (default)
  return (
    <div className="relative w-full">
      <div className="relative h-2 w-full overflow-hidden rounded-full">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(198, 93, 50, 0.15) 0%, rgba(251, 191, 36, 0.15) 50%, rgba(239, 68, 68, 0.15) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        />

        {/* Progress bar */}
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${currentProgress}%`,
            background: 'linear-gradient(90deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
            boxShadow: '0 0 20px rgba(198, 93, 50, 0.5)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${currentProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>

      {showPercentage && (
        <motion.div
          className="mt-2 text-center text-sm font-medium"
          style={{ color: '#c65d32' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(currentProgress)}%
        </motion.div>
      )}
    </div>
  )
}

