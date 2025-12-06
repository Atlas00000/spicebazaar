/**
 * LazyImageWrapper Component
 * Lazy loading wrapper with intersection observer
 */

"use client"

import { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { OptimizedImage } from './OptimizedImage'
import { cn } from '@/lib/utils'

interface LazyImageWrapperProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  threshold?: number
  rootMargin?: string
  placeholder?: React.ReactNode
}

/**
 * Lazy loading image wrapper
 */
export const LazyImageWrapper = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder,
}: LazyImageWrapperProps) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  // Show image if in view or priority
  const shouldLoad = priority || inView

  return (
    <div ref={ref} className={cn('relative', className)}>
      {shouldLoad ? (
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full"
        />
      ) : (
        placeholder || (
          <div
            className="w-full h-full bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse"
            style={{ aspectRatio: width && height ? `${width}/${height}` : '16/9' }}
          />
        )
      )}
    </div>
  )
}

