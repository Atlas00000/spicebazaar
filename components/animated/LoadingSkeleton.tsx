/**
 * LoadingSkeleton Component
 * Skeleton screens with shimmer effect
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  count?: number
  animate?: boolean
}

/**
 * LoadingSkeleton with shimmer animation
 */
export const LoadingSkeleton = ({
  className,
  variant = 'rectangular',
  width,
  height,
  count = 1,
  animate = true,
}: LoadingSkeletonProps) => {
  const skeletonClasses = cn(
    'bg-muted overflow-hidden relative',
    variant === 'text' && 'h-4 rounded',
    variant === 'circular' && 'rounded-full',
    variant === 'rectangular' && 'rounded-md',
    className
  )

  const skeletonStyle = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  }

  const skeleton = (
    <div className={skeletonClasses} style={skeletonStyle}>
      {animate && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            translateX: ['100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  )

  if (count === 1) {
    return skeleton
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{skeleton}</div>
      ))}
    </div>
  )
}

/**
 * Preset skeleton patterns
 */

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <LoadingSkeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? '60%' : '100%'}
      />
    ))}
  </div>
)

export const SkeletonCard = () => (
  <div className="border border-border rounded-lg p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <LoadingSkeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton variant="text" width="40%" />
        <LoadingSkeleton variant="text" width="60%" />
      </div>
    </div>
    <SkeletonText lines={3} />
    <LoadingSkeleton height={200} />
  </div>
)

export const SkeletonProduct = () => (
  <div className="space-y-4">
    <LoadingSkeleton height={200} className="rounded-t-lg" />
    <div className="space-y-2 px-4">
      <LoadingSkeleton variant="text" width="80%" />
      <LoadingSkeleton variant="text" width="60%" />
      <div className="flex items-center justify-between pt-2">
        <LoadingSkeleton variant="text" width={60} />
        <LoadingSkeleton variant="rectangular" width={100} height={36} />
      </div>
    </div>
  </div>
)

export const SkeletonAvatar = ({ size = 40 }: { size?: number }) => (
  <LoadingSkeleton variant="circular" width={size} height={size} />
)

export const SkeletonButton = ({ width = 100 }: { width?: number }) => (
  <LoadingSkeleton variant="rectangular" width={width} height={40} />
)

