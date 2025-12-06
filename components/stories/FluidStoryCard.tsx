/**
 * FluidStoryCard Component
 * Stunning story card with parallax and glossy design
 */

"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { springPresets } from '@/lib/animation-config'
import { getResponsiveSizes } from '@/lib/utils/image-utils'

export interface StoryData {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  location?: string
  date?: string
  icon: string | React.ReactNode
  color: string
  gradient: string
}

interface FluidStoryCardProps extends StoryData {
  index?: number
  onReadMore?: (id: string) => void
  className?: string
}

/**
 * Fluid story card with parallax effect
 */
export const FluidStoryCard = ({
  id,
  title,
  subtitle,
  description,
  image,
  location,
  date,
  icon,
  color,
  gradient,
  index = 0,
  onReadMore,
  className,
}: FluidStoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  // Alternating layout (left/right)
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={cn('relative group', className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ ...springPresets.snappy, delay: 0.2 }}
    >
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-8 items-center',
          isEven ? '' : 'lg:grid-flow-dense'
        )}
      >
        {/* Image Side */}
        <motion.div
          className={cn('relative', isEven ? '' : 'lg:col-start-2')}
          style={{ y }}
        >
          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 24px ${color}20`,
              borderRadius: '2.5rem',
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: `0 20px 60px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 40px ${color}30`,
            }}
          >
            {/* Glossy overlays */}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none rounded-[2.5rem] z-10"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)',
              }}
            />

            {/* Parallax image */}
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </motion.div>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 rounded-[2.5rem]"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
              }}
            />

            {/* Floating badge */}
            {location && (
              <motion.div
                className="absolute bottom-4 left-4 z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <MapPin className="w-4 h-4" />
                  {location}
                </div>
              </motion.div>
            )}

            {/* Glow effect */}
            <motion.div
              className="absolute -inset-2 rounded-[2.5rem]"
              style={{
                background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                filter: 'blur(30px)',
                opacity: 0,
              }}
              animate={{
                opacity: isHovered ? 0.6 : 0,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          className={cn('space-y-6', isEven ? '' : 'lg:col-start-1 lg:row-start-1')}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${gradient})`,
              boxShadow: `0 8px 32px ${color}40`,
            }}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ ...springPresets.bouncy, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            {typeof icon === 'string' ? (
              <span className="text-4xl drop-shadow-lg">{icon}</span>
            ) : (
              icon
            )}
          </motion.div>

          {/* Badge */}
          {date && (
            <AnimatedBadge variant="outline">
              <Calendar className="w-3 h-3 mr-1" />
              {date}
            </AnimatedBadge>
          )}

          {/* Title */}
          <motion.h3
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground"
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            className="text-xl font-semibold"
            style={{
              background: `linear-gradient(135deg, ${gradient})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>

          {/* Read More Button */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <AnimatedButton
              variant="gradient"
              size="lg"
              onClick={() => onReadMore?.(id)}
              glow
              magnetic
            >
              Read Full Story
              <ArrowRight className="w-5 h-5 ml-2" />
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative line connector */}
      <div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-1 h-16 hidden lg:block"
        style={{
          background: `linear-gradient(to bottom, ${color}60 0%, transparent 100%)`,
        }}
      />
    </motion.div>
  )
}

