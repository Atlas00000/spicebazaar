/**
 * ParticleSystem Component
 * GPU-accelerated particle effects with mouse interaction
 */

"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { particleSettings } from '@/lib/animation-config'
import { getAdaptiveConfig } from '@/lib/performance-utils'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
}

interface ParticleSystemProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  speed?: number
  interactive?: boolean
  mouseAttraction?: boolean
  fadeOnScroll?: boolean
  className?: string
}

/**
 * ParticleSystem with GPU acceleration and mouse interaction
 */
export const ParticleSystem = ({
  count,
  colors = ['#c65d32', '#fbbf24', '#ef4444'],
  minSize = 2,
  maxSize = 8,
  speed = 1,
  interactive = true,
  mouseAttraction = false,
  fadeOnScroll = true,
  className,
}: ParticleSystemProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const [opacity, setOpacity] = useState(1)

  // Get adaptive config based on device
  const adaptiveConfig = getAdaptiveConfig()
  const particleCount = count || adaptiveConfig.particleCount

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * (maxSize - minSize) + minSize,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        life: 1,
      })
    }
    
    return particles
  }, [particleCount, colors, minSize, maxSize, speed])

  // Update particles
  const updateParticles = useCallback((
    particles: Particle[],
    width: number,
    height: number,
    mouseX: number,
    mouseY: number
  ) => {
    particles.forEach((particle) => {
      // Mouse attraction/repulsion
      if (interactive && mouseAttraction) {
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const attractionRadius = 200
        
        if (distance < attractionRadius) {
          const force = (attractionRadius - distance) / attractionRadius
          particle.vx += (dx / distance) * force * 0.05
          particle.vy += (dy / distance) * force * 0.05
        }
      }

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off edges
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -0.9
        particle.x = Math.max(0, Math.min(width, particle.x))
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -0.9
        particle.y = Math.max(0, Math.min(height, particle.y))
      }

      // Apply friction
      particle.vx *= 0.99
      particle.vy *= 0.99

      // Add some randomness
      particle.vx += (Math.random() - 0.5) * 0.1 * speed
      particle.vy += (Math.random() - 0.5) * 0.1 * speed

      // Clamp velocity
      const maxVelocity = 3 * speed
      particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx))
      particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy))
    })
  }, [interactive, mouseAttraction, speed])

  // Draw particles
  const drawParticles = useCallback((
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    globalOpacity: number
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    particles.forEach((particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity * globalOpacity
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      
      // Add glow effect
      if (adaptiveConfig.useBlur) {
        ctx.shadowBlur = particle.size * 2
        ctx.shadowColor = particle.color
      }
      
      ctx.restore()
    })
  }, [adaptiveConfig.useBlur])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    updateParticles(
      particlesRef.current,
      canvas.width,
      canvas.height,
      mouseRef.current.x,
      mouseRef.current.y
    )

    drawParticles(ctx, particlesRef.current, opacity)

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [updateParticles, drawParticles, opacity])

  // Handle mouse move
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  // Handle scroll fade
  useEffect(() => {
    if (!fadeOnScroll) return

    const handleScroll = () => {
      const scrollPercentage = Math.min(window.scrollY / 500, 1)
      setOpacity(1 - scrollPercentage * 0.7)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [fadeOnScroll])

  // Initialize and start animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    const updateSize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
        
        // Reinitialize particles when size changes
        particlesRef.current = initParticles(canvas.width, canvas.height)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    // Start animation
    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [initParticles, animate])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'absolute inset-0 pointer-events-none',
        className
      )}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  )
}

/**
 * Preset particle effects
 */

export const SpiceParticles = () => (
  <ParticleSystem
    colors={['#c65d32', '#fbbf24', '#ef4444', '#f97316']}
    mouseAttraction
    fadeOnScroll
  />
)

export const GoldenParticles = () => (
  <ParticleSystem
    colors={['#fbbf24', '#f59e0b', '#fcd34d']}
    minSize={3}
    maxSize={10}
    speed={0.8}
    mouseAttraction
  />
)

export const FloatingDust = () => (
  <ParticleSystem
    count={15}
    colors={['rgba(255,255,255,0.3)', 'rgba(251,191,36,0.2)']}
    minSize={1}
    maxSize={3}
    speed={0.5}
    mouseAttraction={false}
  />
)

