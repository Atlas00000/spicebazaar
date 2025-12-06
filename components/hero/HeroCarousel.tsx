/**
 * HeroCarousel Component
 * Auto-rotating product showcase with smooth transitions
 */

"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'
import { getResponsiveSizes } from '@/lib/utils/image-utils'

export interface CarouselProduct {
  id: string
  name: string
  tagline: string
  image: string
  color: string
  price: number
}

interface HeroCarouselProps {
  products: CarouselProduct[]
  autoRotate?: boolean
  rotateInterval?: number
  showControls?: boolean
  showIndicators?: boolean
  onProductChange?: (index: number) => void
  className?: string
}

/**
 * Hero carousel with smooth product transitions
 */
export const HeroCarousel = ({
  products,
  autoRotate = true,
  rotateInterval = 5000,
  showControls = true,
  showIndicators = true,
  onProductChange,
  className,
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentProduct = products[currentIndex]

  // Auto-rotate
  useEffect(() => {
    if (!autoRotate || isPaused) return

    const timer = setInterval(() => {
      goToNext()
    }, rotateInterval)

    return () => clearInterval(timer)
  }, [currentIndex, autoRotate, isPaused, rotateInterval])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % products.length)
    onProductChange?.((currentIndex + 1) % products.length)
  }, [currentIndex, products.length, onProductChange])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    onProductChange?.((currentIndex - 1 + products.length) % products.length)
  }, [currentIndex, products.length, onProductChange])

  const goToIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    onProductChange?.(index)
  }, [currentIndex, onProductChange])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  return (
    <div
      className={cn('relative h-full', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            ...springPresets.slow,
            duration: 0.8,
          }}
          className="absolute inset-0 flex items-center justify-center p-8"
          style={{
            perspective: 2000,
            transformStyle: 'preserve-3d',
          }}
        >
          {currentProduct && (
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Glow behind image */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${currentProduct.color}60 0%, transparent 70%)`,
                  filter: 'blur(60px)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Product image - soft, no edges */}
              <motion.div
                className="relative z-10 w-full h-full"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                  maxWidth: '85%',
                  maxHeight: '85%',
                }}
                initial={{ 
                  filter: 'blur(10px) drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                  scale: 0.9,
                }}
                animate={{ 
                  filter: 'blur(0px) drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                  scale: 1,
                }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={90}
                  priority
                />
              </motion.div>
              
              {/* Floating particles around product */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2
                const radius = 140

                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full pointer-events-none"
                    style={{
                      background: currentProduct.color,
                      boxShadow: `0 0 15px ${currentProduct.color}`,
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [
                        Math.cos(angle) * radius,
                        Math.cos(angle + 0.3) * (radius + 30),
                        Math.cos(angle) * radius,
                      ],
                      y: [
                        Math.sin(angle) * radius,
                        Math.sin(angle + 0.3) * (radius + 30),
                        Math.sin(angle) * radius,
                      ],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.15,
                    }}
                  />
                )
              })}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {showControls && (
        <>
          <motion.button
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-10',
              'w-12 h-12 rounded-full bg-white/10 backdrop-blur-md',
              'border border-white/20 text-white',
              'flex items-center justify-center',
              'hover:bg-white/20 transition-colors'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10',
              'w-12 h-12 rounded-full bg-white/10 backdrop-blur-md',
              'border border-white/20 text-white',
              'flex items-center justify-center',
              'hover:bg-white/20 transition-colors'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {products.map((_, index) => (
            <motion.button
              key={index}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-12 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoRotate && !isPaused && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: rotateInterval / 1000,
            ease: 'linear',
          }}
          key={currentIndex}
        />
      )}
    </div>
  )
}

