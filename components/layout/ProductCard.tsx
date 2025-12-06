/**
 * ProductCard Component
 * Enhanced product card with 3D effects
 */

"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { LazyImage } from '@/components/animated/LazyImage'
import { springPresets } from '@/lib/animation-config'
import { Heart, ShoppingCart, Star } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
  reviews?: number
  badge?: string
  inStock?: boolean
  onAddToCart?: (id: string) => void
  onAddToWishlist?: (id: string) => void
  className?: string
}

/**
 * ProductCard with enhanced interactions
 */
export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating = 0,
  reviews = 0,
  badge,
  inStock = true,
  onAddToCart,
  onAddToWishlist,
  className,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.(id)
  }

  return (
    <motion.div
      className={cn('relative group', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
        borderRadius: '1.5rem',
        overflow: 'hidden',
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3)',
        transition: springPresets.snappy,
      }}
    >
      {/* Glossy overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
      />

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl m-4 mb-0">
        <LazyImage
          src={image}
          alt={name}
          zoom
          aspectRatio="1/1"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          {badge && (
            <AnimatedBadge variant="primary" glow>
              {badge}
            </AnimatedBadge>
          )}
          {discount > 0 && (
            <AnimatedBadge variant="destructive">
              -{discount}%
            </AnimatedBadge>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          className={cn(
            'absolute top-3 right-3 w-10 h-10 rounded-full z-20',
            'flex items-center justify-center',
            'transition-colors duration-200'
          )}
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
        >
          <Heart
            className={cn('w-5 h-5', isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground')}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < rating
                    ? 'fill-secondary text-secondary'
                    : 'text-muted-foreground'
                )}
              />
            ))}
            {reviews > 0 && (
              <span className="text-sm text-muted-foreground ml-1">
                ({reviews})
              </span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 className="text-lg font-bold font-[family-name:var(--font-playfair)] text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <AnimatedButton
            variant="gradient"
            className="flex-1"
            size="sm"
            onClick={() => onAddToCart?.(id)}
            disabled={!inStock}
            glow
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            {inStock ? 'Add' : 'Out of Stock'}
          </AnimatedButton>
          <AnimatedButton
            variant="ghost"
            size="icon"
            onClick={handleWishlist}
          >
            <Heart className={cn('w-4 h-4', isWishlisted && 'fill-red-500 text-red-500')} />
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Product Grid
 */
export const ProductGrid = ({
  products,
  columns = 4,
  className,
}: {
  products: ProductCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

