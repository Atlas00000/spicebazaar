/**
 * OrganicShape Component
 * Fluid, blob-like shapes with morphing animations
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OrganicShapeProps {
  color: string
  size?: number
  blur?: number
  opacity?: number
  duration?: number
  position?: { x: string; y: string }
  className?: string
}

/**
 * Organic blob shape with morphing animation
 */
export const OrganicShape = ({
  color,
  size = 400,
  blur = 100,
  opacity = 0.3,
  duration = 20,
  position = { x: '50%', y: '50%' },
  className,
}: OrganicShapeProps) => {
  // Multiple organic blob paths for morphing
  const blobPaths = [
    'M50,10 C70,10 80,20 85,35 C90,50 85,65 70,75 C55,85 35,85 20,75 C5,65 0,50 5,35 C10,20 30,10 50,10',
    'M50,5 C75,8 88,25 90,45 C92,65 80,82 60,88 C40,94 18,85 10,65 C2,45 8,22 25,10 C35,3 40,3 50,5',
    'M45,10 C65,12 82,28 88,48 C94,68 85,85 65,88 C45,91 22,82 12,62 C2,42 10,20 28,12 C35,8 40,9 45,10',
  ]

  return (
    <motion.div
      className={cn('absolute pointer-events-none', className)}
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
        opacity,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          fill={color}
          animate={{
            d: blobPaths,
          }}
          transition={{
            duration: duration / 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </svg>
    </motion.div>
  )
}

/**
 * Multi-layer organic background
 */
export const OrganicBackground = ({
  colors = ['#c65d32', '#fbbf24', '#ef4444'],
  className,
}: {
  colors?: string[]
  className?: string
}) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {colors.map((color, index) => {
        const positions = [
          { x: '20%', y: '30%' },
          { x: '80%', y: '60%' },
          { x: '50%', y: '80%' },
          { x: '10%', y: '70%' },
          { x: '90%', y: '20%' },
        ]
        
        return (
          <OrganicShape
            key={index}
            color={color}
            size={300 + index * 100}
            blur={120 + index * 20}
            opacity={0.15 - index * 0.03}
            duration={25 + index * 5}
            position={positions[index % positions.length]}
          />
        )
      })}
    </div>
  )
}

