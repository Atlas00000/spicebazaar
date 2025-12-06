/**
 * FluidCategoryCard Component
 * Stunning category card with fluid, interactive design
 */

"use client"

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'

interface FluidCategoryCardProps {
  name: string
  description: string
  icon: string | ReactNode
  count: string
  image?: string
  gradient: string
  href?: string
  featured?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Fluid category card with stunning visuals
 */
export const FluidCategoryCard = ({
  name,
  description,
  icon,
  count,
  image,
  gradient,
  href,
  featured = false,
  onClick,
  className,
}: FluidCategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

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
      className={cn(
        'relative group cursor-pointer overflow-hidden',
        featured ? 'md:col-span-2 md:row-span-2' : '',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
        borderRadius: '2.5rem',
        perspective: 1500,
        transformStyle: 'preserve-3d',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -16,
        scale: 1.02,
        boxShadow: '0 24px 70px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.35)',
        transition: springPresets.snappy,
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      transition={springPresets.snappy}
      onClick={onClick}
    >
      {/* Animated gradient background */}
      <motion.div
        className={cn('absolute inset-0 rounded-[2.5rem] opacity-20')}
        style={{
          background: `linear-gradient(135deg, ${gradient})`,
        }}
        animate={{
          opacity: isHovered ? 0.35 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

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

      {/* Floating gradient orbs */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-40"
            style={{
              background: `radial-gradient(circle, ${gradient.split(',')[0]} 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.4, 1],
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, ${gradient.split(',')[1] || gradient.split(',')[0]} 0%, transparent 70%)`,
              filter: 'blur(30px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [20, -20, 20],
              y: [10, -10, 10],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* Content */}
      <div
        className={cn(
          'relative z-10 p-8',
          featured ? 'md:p-12 flex flex-col justify-between min-h-[300px]' : ''
        )}
      >
        {/* Icon */}
        <motion.div
          className={cn(
            'inline-flex items-center justify-center rounded-3xl mb-6',
            featured ? 'w-24 h-24 text-5xl' : 'w-20 h-20 text-4xl'
          )}
          style={{
            background: `linear-gradient(135deg, ${gradient})`,
            boxShadow: `0 8px 32px ${gradient.split(',')[0]}40`,
          }}
          animate={
            isHovered
              ? {
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {typeof icon === 'string' ? (
            <span className="drop-shadow-lg">{icon}</span>
          ) : (
            icon
          )}
        </motion.div>

        <div className="flex-1">
          {/* Name */}
          <h3
            className={cn(
              'font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3 group-hover:text-primary transition-colors',
              featured ? 'text-3xl md:text-4xl' : 'text-2xl'
            )}
          >
            {name}
          </h3>

          {/* Description */}
          <p
            className={cn(
              'text-muted-foreground leading-relaxed mb-4',
              featured ? 'text-lg' : 'text-base'
            )}
          >
            {description}
          </p>

          {/* Count */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">
              {count}
            </span>

            {/* Explore button */}
            <motion.div
              className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors"
              animate={
                isHovered
                  ? {
                      x: [0, 5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {isHovered &&
        [...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = featured ? 180 : 120

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background: gradient.split(',')[0],
                boxShadow: `0 0 12px ${gradient.split(',')[0]}`,
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.12,
                ease: 'easeOut',
              }}
            />
          )
        })}

      {/* Shine effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[2.5rem]"
        style={{
          background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '200% 0%'] : '0% 0%',
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

