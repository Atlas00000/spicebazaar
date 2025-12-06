/**
 * ProductShowcase Component
 * Interactive 3D product display for hero
 */

"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'
import type { CarouselProduct } from './HeroCarousel'

interface ProductShowcaseProps {
  product: CarouselProduct
  interactive?: boolean
  className?: string
}

/**
 * 3D interactive product showcase
 */
export const ProductShowcase = ({
  product,
  interactive = true,
  className,
}: ProductShowcaseProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animations for smooth movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  // Transform mouse position to rotation values
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15])
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10])

  useEffect(() => {
    const element = ref.current
    if (!element || !interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalize to -0.5 to 0.5
      const x = (e.clientX - centerX) / rect.width
      const y = (e.clientY - centerY) / rect.height

      mouseX.set(x)
      mouseY.set(y)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [interactive, mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={{
        perspective: 1500,
        transformStyle: 'preserve-3d',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect behind product */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${product.color}40 0%, transparent 70%)`,
          scale: isHovered ? 1.3 : 1,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: isHovered ? [1.2, 1.4, 1.2] : [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Product container */}
      <motion.div
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Product image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={springPresets.bouncy}
        />

        {/* Floating particles around product */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const radius = 120

          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: product.color,
                left: '50%',
                top: '50%',
                boxShadow: `0 0 20px ${product.color}`,
              }}
              animate={{
                x: [
                  Math.cos(angle) * radius,
                  Math.cos(angle + 0.5) * (radius + 20),
                  Math.cos(angle) * radius,
                ],
                y: [
                  Math.sin(angle) * radius,
                  Math.sin(angle + 0.5) * (radius + 20),
                  Math.sin(angle) * radius,
                ],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          )
        })}

        {/* Shine effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 pointer-events-none"
            initial={{ x: '-100%', y: '-100%', opacity: 0 }}
            animate={{ x: '100%', y: '100%', opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

