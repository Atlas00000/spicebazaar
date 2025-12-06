/**
 * MorphingShape Component
 * Animated SVG shape morphing
 */

"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface MorphingShapeProps {
  shapes?: string[]
  duration?: number
  colors?: string[]
  size?: number
  blur?: boolean
  className?: string
}

/**
 * Morphing shape with smooth transitions
 */
export const MorphingShape = ({
  shapes = [
    'M50,10 Q90,50 50,90 Q10,50 50,10',
    'M10,50 Q50,10 90,50 Q50,90 10,50',
    'M30,10 L70,10 L90,50 L70,90 L30,90 L10,50 Z',
    'M20,20 L80,20 L80,80 L20,80 Z',
  ],
  duration = 4,
  colors = ['#c65d32', '#fbbf24', '#ef4444', '#f97316'],
  size = 200,
  blur = true,
  className,
}: MorphingShapeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shapes.length)
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [shapes.length, duration])

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('overflow-visible', className)}
    >
      <defs>
        {blur && (
          <filter id="morphBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        )}
        <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          {colors.map((color, index) => (
            <stop
              key={index}
              offset={`${(index / (colors.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      </defs>
      
      <motion.path
        d={shapes[currentIndex]}
        fill="url(#morphGradient)"
        opacity={0.3}
        filter={blur ? 'url(#morphBlur)' : undefined}
        animate={{
          d: shapes.map((shape, index) => 
            index === currentIndex ? shape : undefined
          ).filter(Boolean),
        }}
        transition={{
          duration,
          ease: 'easeInOut',
        }}
      />
    </svg>
  )
}

/**
 * Blob morphing (organic shapes)
 */
export const MorphingBlob = ({
  size = 300,
  color = '#c65d32',
  className,
}: {
  size?: number
  color?: string
  className?: string
}) => {
  const blobs = [
    'M60.5,-59.6C75.7,-47.5,83.9,-23.7,82.7,-1.1C81.5,21.5,71,42.9,55.8,57.2C40.6,71.5,20.3,78.7,-1.4,80.1C-23.1,81.5,-46.2,77.1,-60.8,62.8C-75.4,48.5,-81.5,24.2,-79.9,1.9C-78.3,-20.4,-69,-40.9,-54.4,-53C-39.9,-65.1,-19.9,-68.9,2.1,-71C24.2,-73.1,45.3,-71.7,60.5,-59.6Z',
    'M54.8,-57.9C69.9,-45.6,80.2,-22.8,79.8,-0.5C79.4,21.8,68.3,43.6,53.2,58.6C38.1,73.6,19.1,81.8,-1.8,83.6C-22.6,85.4,-45.3,80.8,-60.3,65.8C-75.3,50.8,-82.7,25.4,-81.8,1.2C-80.9,-23,-71.8,-46,-56.8,-58.3C-41.8,-70.6,-20.9,-72.3,1.3,-73.6C23.5,-74.9,39.7,-70.2,54.8,-57.9Z',
    'M47.3,-51.5C60.7,-39.1,70.4,-19.6,71.3,1.2C72.2,22,64.3,44,50.9,58.3C37.5,72.6,18.7,79.3,-1.9,81.2C-22.6,83.1,-45.1,80.2,-59.5,65.9C-73.9,51.6,-80.1,25.8,-78.8,1.3C-77.5,-23.2,-68.7,-46.4,-54.3,-58.8C-39.9,-71.2,-19.9,-72.8,0.4,-73.2C20.7,-73.6,33.9,-63.9,47.3,-51.5Z',
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        fill={color}
        opacity={0.2}
        transform="translate(100 100)"
        animate={{
          d: blobs,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </svg>
  )
}

/**
 * Floating shapes background
 */
export const FloatingShapes = ({
  count = 5,
  className,
}: {
  count?: number
  className?: string
}) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${(index / count) * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <MorphingBlob size={100 + index * 50} />
        </motion.div>
      ))}
    </div>
  )
}

