"use client"

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
interface SpiceParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
}

interface SpiceParticlesProps {
  count?: number
  intensity?: 'low' | 'medium' | 'high'
}

export const SpiceParticles = ({ count = 30, intensity = 'medium' }: SpiceParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<SpiceParticle[]>([])
  const animationFrameRef = useRef<number>()

  const spiceColors = [
    '#c65d32',      // Burnt orange (primary)
    '#fbbf24',      // Turmeric yellow (secondary)
    '#ef4444',      // Chili red (accent)
    '#d97706',      // Amber
    '#f59e0b',      // Orange
    '#eab308',      // Yellow
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (intensity === 'high' ? 8 : intensity === 'medium' ? 6 : 4) + 2,
        color: spiceColors[Math.floor(Math.random() * spiceColors.length)],
        speedX: (Math.random() - 0.5) * (intensity === 'high' ? 2 : intensity === 'medium' ? 1.5 : 1),
        speedY: (Math.random() - 0.5) * (intensity === 'high' ? 2 : intensity === 'medium' ? 1.5 : 1),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
      }))
    }

    initParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle as spice grain
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)

        // Draw organic spice shape
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size)
        gradient.addColorStop(0, particle.color + 'FF')
        gradient.addColorStop(0.5, particle.color + 'CC')
        gradient.addColorStop(1, particle.color + '00')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2)
        ctx.fill()

        // Add highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.beginPath()
        ctx.ellipse(-particle.size * 0.3, -particle.size * 0.2, particle.size * 0.3, particle.size * 0.2, 0, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [count, intensity])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: intensity === 'high' ? 0.8 : intensity === 'medium' ? 0.6 : 0.4,
        mixBlendMode: 'multiply',
      }}
    />
  )
}

