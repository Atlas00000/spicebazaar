/**
 * FluidTestimonialCard Component
 * Stunning testimonial card with glossy design and animations
 */

"use client"

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Quote, Star, Verified } from 'lucide-react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'

export interface TestimonialData {
  id: string
  name: string
  role: string
  company?: string
  avatar: string
  rating: number
  comment: string
  verified?: boolean
  color?: string
}

interface FluidTestimonialCardProps extends TestimonialData {
  featured?: boolean
  className?: string
}

/**
 * Fluid testimonial card with stunning visuals
 */
export const FluidTestimonialCard = ({
  id,
  name,
  role,
  company,
  avatar,
  rating,
  comment,
  verified = false,
  color = '#c65d32',
  featured = false,
  className,
}: FluidTestimonialCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6])

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) / rect.width
      const y = (e.clientY - centerY) / rect.height
      mouseX.set(x)
      mouseY.set(y)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    if (isHovered) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isHovered, mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative group', featured && 'md:col-span-2', className)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px ${color}15`,
        borderRadius: '2.5rem',
        perspective: 1500,
        transformStyle: 'preserve-3d',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -12,
        scale: 1.02,
        boxShadow: `0 20px 60px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 32px ${color}30`,
        transition: springPresets.snappy,
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      transition={springPresets.snappy}
    >
      {/* Multi-layer glossy overlays */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none rounded-[2.5rem]"
        style={{
          background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-35 pointer-events-none rounded-[2.5rem]"
        style={{
          background: 'radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
      />

      {/* Quote icon background */}
      <motion.div
        className="absolute top-8 right-8 opacity-10"
        animate={{
          rotate: isHovered ? [0, 5, -5, 0] : 0,
          scale: isHovered ? 1.1 : 1,
        }}
      >
        <Quote className="w-24 h-24" style={{ color }} />
      </motion.div>

      {/* Content */}
      <div className={cn('relative z-10', featured ? 'p-10' : 'p-8')}>
        {/* Avatar & Info */}
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar with glow */}
          <motion.div
            className="relative flex-shrink-0"
            whileHover={{ scale: 1.1 }}
          >
            <div
              className="w-16 h-16 rounded-2xl overflow-hidden"
              style={{
                border: `2px solid ${color}40`,
                boxShadow: `0 4px 20px ${color}40`,
              }}
            >
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
                sizes="64px"
                quality={85}
              />
            </div>

            {/* Verified badge */}
            {verified && (
              <motion.div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springPresets.bouncy, delay: 0.3 }}
                style={{
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.5)',
                }}
              >
                <Verified className="w-4 h-4 text-white" />
              </motion.div>
            )}

            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: `2px solid ${color}`,
                opacity: 0,
              }}
              animate={{
                opacity: isHovered ? [0, 0.6, 0] : 0,
                scale: isHovered ? [1, 1.3, 1.5] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
              }}
            />
          </motion.div>

          {/* Name & Role */}
          <div className="flex-1">
            <h4 className="text-lg font-bold text-foreground mb-1">
              {name}
              {verified && (
                <motion.span
                  className="inline-block ml-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  ✓
                </motion.span>
              )}
            </h4>
            <p className="text-sm text-muted-foreground">
              {role}
              {company && ` • ${company}`}
            </p>
          </div>

          {/* Stars */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.05, ...springPresets.bouncy }}
              >
                <Star
                  className={cn(
                    'w-5 h-5',
                    i < rating ? 'fill-secondary text-secondary' : 'text-muted-foreground/30'
                  )}
                  style={{
                    filter: i < rating ? `drop-shadow(0 0 4px #fbbf24)` : 'none',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comment with quote styling */}
        <motion.div
          className={cn(
            'relative p-6 rounded-2xl mb-6',
            featured ? 'text-lg' : 'text-base'
          )}
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full"
            style={{
              background: `${color}20`,
            }}
          >
            <Quote className="w-4 h-4" style={{ color }} />
          </div>
          
          <p className="text-foreground leading-relaxed pl-8 italic">
            "{comment}"
          </p>
        </motion.div>

        {/* Footer metadata */}
        <motion.div
          className="flex items-center justify-between text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Verified Purchase</span>
          <span>2 days ago</span>
        </motion.div>
      </div>

      {/* Floating particles */}
      {isHovered &&
        [...Array(4)].map((_, i) => {
          const angle = (i / 4) * Math.PI * 2

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background: color,
                boxShadow: `0 0 12px ${color}`,
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * 120,
                y: Math.sin(angle) * 120,
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          )
        })}
    </motion.div>
  )
}

