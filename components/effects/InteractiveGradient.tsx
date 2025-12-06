/**
 * InteractiveGradient Component
 * Mesh gradient that responds to mouse movement
 */

"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InteractiveGradientProps {
  colors?: string[]
  intensity?: number
  speed?: number
  blur?: number
  className?: string
}

/**
 * Interactive gradient background with mouse tracking
 */
export const InteractiveGradient = ({
  colors = [
    'rgba(198, 93, 50, 0.2)',   // Primary
    'rgba(251, 191, 36, 0.2)',  // Secondary
    'rgba(239, 68, 68, 0.2)',   // Accent
  ],
  intensity = 0.3,
  speed = 0.5,
  blur = 60,
  className,
}: InteractiveGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Mouse position with spring animation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden', className)}
    >
      {/* Gradient blobs */}
      {colors.map((color, index) => {
        const angle = (index / colors.length) * Math.PI * 2
        const baseX = 50 + Math.cos(angle) * 30
        const baseY = 50 + Math.sin(angle) * 30

        return (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: dimensions.width * 0.4,
              height: dimensions.height * 0.4,
              background: color,
              filter: `blur(${blur}px)`,
              x: smoothMouseX.get() 
                ? `calc(${baseX}% + ${(smoothMouseX.get() - 50) * intensity}px)`
                : `${baseX}%`,
              y: smoothMouseY.get()
                ? `calc(${baseY}% + ${(smoothMouseY.get() - 50) * intensity}px)`
                : `${baseY}%`,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )
      })}

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
        }}
      />
    </div>
  )
}

/**
 * Preset gradients
 */

export const SpiceGradient = () => (
  <InteractiveGradient
    colors={[
      'rgba(198, 93, 50, 0.15)',
      'rgba(251, 191, 36, 0.15)',
      'rgba(239, 68, 68, 0.12)',
      'rgba(249, 115, 22, 0.15)',
    ]}
    intensity={0.4}
    blur={80}
  />
)

export const WarmGradient = () => (
  <InteractiveGradient
    colors={[
      'rgba(251, 191, 36, 0.2)',
      'rgba(249, 115, 22, 0.2)',
      'rgba(239, 68, 68, 0.15)',
    ]}
    intensity={0.3}
    blur={100}
  />
)

export const SubtleGradient = () => (
  <InteractiveGradient
    colors={[
      'rgba(198, 93, 50, 0.08)',
      'rgba(251, 191, 36, 0.08)',
    ]}
    intensity={0.2}
    blur={120}
  />
)

