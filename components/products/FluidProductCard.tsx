/**
 * FluidProductCard Component
 * Stunning product card with milky, oily aesthetic and 3D effects
 */

"use client"

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Heart, ShoppingCart, Star, Eye, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { LazyImage } from '@/components/animated/LazyImage'
import { springPresets } from '@/lib/animation-config'

export interface FluidProductCardProps {
  id: string
  name: string
  origin?: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
  reviews?: number
  badge?: string
  inStock?: boolean
  color?: string
  description?: string
  onAddToCart?: (id: string) => void
  onAddToWishlist?: (id: string) => void
  onQuickView?: (id: string) => void
  className?: string
}

/**
 * Fluid product card with stunning visuals
 */
export const FluidProductCard = ({
  id,
  name,
  origin,
  price,
  originalPrice,
  image,
  rating = 0,
  reviews = 0,
  badge,
  inStock = true,
  color = '#c65d32',
  description,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className,
}: FluidProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12])

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

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.(id)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative group', className)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px ${color}15`,
        borderRadius: '2rem',
        perspective: 1500,
        transformStyle: 'preserve-3d',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -16,
        scale: 1.03,
        boxShadow: `0 24px 70px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.35), 0 12px 40px ${color}30`,
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
        className="absolute inset-0 opacity-50 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-35 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Image Container */}
      <div className="relative p-6 pb-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          {/* Glow behind image */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(circle, ${color}50 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
              opacity: isHovered ? [0.4, 0.7, 0.4] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />

          {/* Product image */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={springPresets.snappy}
          >
            <LazyImage
              src={image}
              alt={name}
              aspectRatio="1/1"
              className="w-full h-full"
            />
          </motion.div>

          {/* Floating badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-20">
            {badge && (
              <AnimatedBadge variant="primary" glow>
                <Sparkles className="w-3 h-3 mr-1" />
                {badge}
              </AnimatedBadge>
            )}
            {discount > 0 && (
              <AnimatedBadge variant="destructive" pulse>
                -{discount}%
              </AnimatedBadge>
            )}
          </div>

          {/* Quick action buttons on hover */}
          <motion.div
            className="absolute top-3 right-3 z-30 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
            >
              <Heart
                className={cn('w-5 h-5', isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground')}
              />
            </motion.button>

            {onQuickView && (
              <motion.button
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onQuickView(id)}
              >
                <Eye className="w-5 h-5 text-foreground" />
              </motion.button>
            )}
          </motion.div>

          {/* Origin badge */}
          {origin && (
            <motion.div
              className="absolute bottom-3 left-3 z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                📍 {origin}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6">
        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Star
                  className={cn(
                    'w-4 h-4',
                    i < rating ? 'fill-secondary text-secondary' : 'text-muted-foreground/30'
                  )}
                />
              </motion.div>
            ))}
            {reviews > 0 && (
              <span className="text-sm text-muted-foreground ml-1">
                ({reviews})
              </span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Description (show on hover) */}
        {description && (
          <motion.p
            className="text-sm text-muted-foreground mb-3 line-clamp-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <motion.span
            className="text-3xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
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
          </motion.span>
          {originalPrice && (
            <span className="text-base text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <AnimatedButton
            variant="gradient"
            className="flex-1"
            onClick={() => onAddToCart?.(id)}
            disabled={!inStock}
            glow
            ripple
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </AnimatedButton>
        </div>

        {/* Stock status */}
        {!inStock && (
          <motion.p
            className="text-sm text-destructive font-semibold mt-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Out of Stock
          </motion.p>
        )}
      </div>

      {/* Floating particles */}
      {isHovered &&
        [...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const radius = 140

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background: color,
                boxShadow: `0 0 12px ${color}`,
                left: '50%',
                top: '40%',
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
                delay: i * 0.15,
                ease: 'easeOut',
              }}
            />
          )
        })}
    </motion.div>
  )
}

