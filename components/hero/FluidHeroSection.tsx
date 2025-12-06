/**
 * FluidHeroSection Component
 * Main hero section with fluid, creamy aesthetics and product carousel
 */

"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Sparkles, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { FluidBackground, GlossyOverlay } from './FluidBackground'
import { OrganicBackground } from './OrganicShape'
import { HeroCarousel, type CarouselProduct } from './HeroCarousel'
import { FloatingOrbs, FloatingCircles } from './FloatingElements'
import { TypewriterText } from '@/components/effects/TypewriterText'
import { variants } from '@/lib/animation-variants'

interface FluidHeroSectionProps {
  products: CarouselProduct[]
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
  className?: string
}

/**
 * Fluid Hero Section with product carousel
 */
export const FluidHeroSection = ({
  products,
  onAddToCart,
  onAddToWishlist,
  className,
}: FluidHeroSectionProps) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const currentProduct = products[currentProductIndex]

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'min-h-[75vh] md:min-h-[85vh]',
        'flex items-center',
        className
      )}
    >
      {/* Fluid Background Layers */}
      <FluidBackground variant="spice" intensity="medium" animated />
      <OrganicBackground colors={['#c65d32', '#fbbf24', '#ef4444']} />
      <GlossyOverlay />
      <FloatingOrbs />
      <FloatingCircles />

      {/* Content Container */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={variants.staggerContainer}
          >
            {/* Badge */}
            <motion.div variants={variants.staggerItem}>
              <AnimatedBadge variant="primary" glow pulse className="mb-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                Featured Collection
              </AnimatedBadge>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={variants.staggerItem}>
              <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] leading-tight">
                <span className="block text-foreground">
                  Discover the
                </span>
                <span className="block mt-2">
                  <span
                    className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Essence
                  </span>
                </span>
                <span className="block text-foreground mt-2">
                  of Flavor
                </span>
              </h1>
            </motion.div>

            {/* Current Product Info */}
            <motion.div
              variants={variants.staggerItem}
              className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
              style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: currentProduct.color,
                      boxShadow: `0 0 20px ${currentProduct.color}`,
                    }}
                  />
                  <span className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
                    Now Featuring
                  </span>
                </div>
                <h2 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2">
                  {currentProduct.name}
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  {currentProduct.tagline}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                  <AnimatedBadge variant="success">
                    ⭐ Premium Quality
                  </AnimatedBadge>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={variants.staggerItem}
              className="flex flex-col sm:flex-row gap-4"
            >
              <AnimatedButton
                variant="gradient"
                size="xl"
                magnetic
                glow
                ripple
                onClick={() => onAddToCart?.(currentProduct.id)}
                className="group relative overflow-hidden"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </AnimatedButton>

              <AnimatedButton
                variant="glass"
                size="xl"
                onClick={() => onAddToWishlist?.(currentProduct.id)}
                className="group"
              >
                <Heart className="w-5 h-5 mr-2 group-hover:fill-current group-hover:text-red-500 transition-all" />
                Save for Later
              </AnimatedButton>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              variants={variants.staggerItem}
              className="flex items-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Hand-selected</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="w-4 h-4 text-secondary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span>Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="w-4 h-4 text-secondary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Fast Shipping</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Product Carousel */}
          <motion.div
            className="relative h-[400px] md:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-4 rounded-[3.5rem] opacity-40"
              style={{
                background: `radial-gradient(circle, ${currentProduct.color}30 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Glass container with soft edges */}
            <motion.div
              className="absolute inset-0 rounded-[3rem] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: `
                  0 8px 32px rgba(0,0,0,0.12),
                  inset 0 1px 0 rgba(255,255,255,0.25),
                  0 4px 16px ${currentProduct.color}20
                `,
              }}
              animate={{
                boxShadow: [
                  `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px ${currentProduct.color}20`,
                  `0 12px 48px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3), 0 8px 24px ${currentProduct.color}30`,
                  `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px ${currentProduct.color}20`,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Inner gradient overlay for depth */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)',
                }}
              />
              
              <HeroCarousel
                products={products}
                autoRotate
                rotateInterval={5000}
                onProductChange={setCurrentProductIndex}
              />
            </motion.div>

            {/* Soft reflection effect */}
            <motion.div
              className="absolute -bottom-16 left-1/4 right-1/4 h-32 opacity-40 rounded-full"
              style={{
                background: `radial-gradient(ellipse, ${currentProduct.color}60 0%, transparent 70%)`,
                filter: 'blur(30px)',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background/50 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background/50 to-transparent" />
      </div>
    </section>
  )
}

