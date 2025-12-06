/**
 * FluidCollectionCard Component
 * Stunning collection card with spice preview bubbles
 */

"use client"

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect, type ReactNode } from 'react'
import { ShoppingCart, Heart, Star, Package, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { springPresets } from '@/lib/animation-config'

export interface CollectionData {
  id: string
  name: string
  description: string
  icon: string | ReactNode
  spices: string[]
  price: number
  originalPrice?: number
  savings?: string
  gradient: string
  benefits?: string[]
  featured?: boolean
}

interface FluidCollectionCardProps extends CollectionData {
  onAddToCart?: (id: string) => void
  onAddToWishlist?: (id: string) => void
  className?: string
}

/**
 * Fluid collection card with stunning visuals
 */
export const FluidCollectionCard = ({
  id,
  name,
  description,
  icon,
  spices,
  price,
  originalPrice,
  savings,
  gradient,
  benefits = [],
  featured = false,
  onAddToCart,
  onAddToWishlist,
  className,
}: FluidCollectionCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])

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

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative group',
        featured ? 'md:col-span-2' : '',
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
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 rounded-[2.5rem]"
        style={{
          background: `linear-gradient(135deg, ${gradient})`,
          opacity: 0.15,
        }}
        animate={{
          opacity: isHovered ? 0.25 : 0.15,
          scale: isHovered ? 1.05 : 1,
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

      {/* Content */}
      <div className={cn('relative z-10', featured ? 'p-10' : 'p-8')}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon */}
          <motion.div
            className={cn(
              'flex items-center justify-center rounded-3xl',
              featured ? 'w-24 h-24' : 'w-20 h-20'
            )}
            style={{
              background: `linear-gradient(135deg, ${gradient})`,
              boxShadow: `0 8px 32px ${gradient.split(',')[0]}40`,
            }}
            animate={
              isHovered
                ? {
                    rotate: [0, -8, 8, 0],
                    scale: [1, 1.15, 1],
                  }
                : {}
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {typeof icon === 'string' ? (
              <span className={cn('drop-shadow-lg', featured ? 'text-5xl' : 'text-4xl')}>
                {icon}
              </span>
            ) : (
              icon
            )}
          </motion.div>

          {/* Badges */}
          <div className="flex flex-col gap-2">
            {discount > 0 && (
              <AnimatedBadge variant="destructive" pulse>
                Save {discount}%
              </AnimatedBadge>
            )}
            {featured && (
              <AnimatedBadge variant="primary" glow>
                <Star className="w-3 h-3 mr-1" />
                Featured
              </AnimatedBadge>
            )}
          </div>
        </div>

        {/* Collection Name */}
        <h3
          className={cn(
            'font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3 group-hover:text-primary transition-colors',
            featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
          )}
        >
          {name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Spices Preview Bubbles */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Includes {spices.length} Premium Spices:
          </div>
          <div className="flex flex-wrap gap-2">
            {spices.map((spice, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 rounded-2xl text-sm font-medium"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, ...springPresets.bouncy }}
              >
                ✨ {spice}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        {benefits.length > 0 && (
          <motion.div
            className="mb-6 p-4 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-sm text-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: gradient.split(',')[0],
                      boxShadow: `0 0 8px ${gradient.split(',')[0]}`,
                    }}
                  />
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <motion.div
              className={cn('font-bold', featured ? 'text-4xl' : 'text-3xl')}
              style={{
                background: `linear-gradient(135deg, ${gradient})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={
                isHovered
                  ? { scale: [1, 1.05, 1], transition: { duration: 0.4 } }
                  : {}
              }
            >
              ${price.toFixed(2)}
            </motion.div>
            {originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </div>
            )}
            {savings && (
              <div className="text-xs text-green-600 font-semibold mt-1">
                {savings}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <AnimatedButton
              variant="gradient"
              size={featured ? 'lg' : 'md'}
              onClick={() => onAddToCart?.(id)}
              glow
              ripple
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add Set
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              size={featured ? 'lg' : 'icon'}
              onClick={() => {
                setIsWishlisted(!isWishlisted)
                onAddToWishlist?.(id)
              }}
            >
              <Heart
                className={cn('w-5 h-5', isWishlisted && 'fill-red-500 text-red-500')}
              />
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Floating spice particles with colors */}
      {isHovered &&
        [...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const colors = gradient.split(',').map(c => c.trim())
          const color = colors[i % colors.length]

          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full pointer-events-none"
              style={{
                background: color,
                boxShadow: `0 0 16px ${color}`,
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * 160,
                y: Math.sin(angle) * 160,
                opacity: [0, 0.9, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 2.5,
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

