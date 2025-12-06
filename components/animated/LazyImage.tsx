/**
 * LazyImage Component
 * Optimized image with lazy loading and blur-up effect using Next.js Image
 */

"use client"

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { springPresets } from '@/lib/animation-config'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { getResponsiveSizes, getOptimalQuality } from '@/lib/utils/image-utils'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  aspectRatio?: string
  blurDataURL?: string
  className?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
  zoom?: boolean
  parallax?: boolean
}

/**
 * LazyImage with blur-up and smooth loading
 */
export const LazyImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio = '16/9',
  blurDataURL,
  className,
  objectFit = 'cover',
  priority = false,
  onLoad,
  onError,
  zoom = false,
  parallax = false,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(priority ? src : null)
  const imgRef = useRef<HTMLImageElement>(null)
  
  // Scroll reveal for lazy loading
  const { ref: revealRef, isVisible } = useScrollReveal({
    threshold: 'early',
    triggerOnce: true,
  })

  // Load image when visible
  useEffect(() => {
    if ((isVisible || priority) && !imageSrc && src) {
      setImageSrc(src)
    }
  }, [isVisible, priority, imageSrc, src])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  return (
    <motion.div
      ref={revealRef as any}
      className={cn(
        'relative overflow-hidden bg-muted',
        className
      )}
      style={{ aspectRatio }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springPresets.normal}
    >
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
          aria-hidden="true"
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 skeleton" />
      )}

      {/* Actual image using Next.js Image */}
      {imageSrc && !hasError && (
        <motion.div
          className={cn(
            'absolute inset-0 w-full h-full',
            zoom && 'hover:scale-110 transition-transform duration-300',
            parallax && 'transform-gpu'
          )}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={
            isLoaded
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 1.1 }
          }
          transition={springPresets.slow}
        >
          <Image
            src={imageSrc}
            alt={alt}
            {...(width && height
              ? { width, height }
              : { fill: true })}
            className={cn(
              'transition-opacity duration-300',
              objectFit === 'contain' && 'object-contain',
              objectFit === 'cover' && 'object-cover',
              objectFit === 'fill' && 'object-fill',
              objectFit === 'none' && 'object-none',
              objectFit === 'scale-down' && 'object-scale-down'
            )}
            quality={getOptimalQuality()}
            sizes={width && height ? undefined : getResponsiveSizes()}
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
            priority={priority}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
          />
        </motion.div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Failed to load image</span>
        </div>
      )}

      {/* Shine effect overlay (on hover for zoom images) */}
      {zoom && isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 pointer-events-none"
          initial={{ x: '-100%', y: '-100%' }}
          whileHover={{ x: '100%', y: '100%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  )
}

/**
 * Image gallery with lightbox support
 */
export const ImageGallery = ({
  images,
  columns = 3,
  gap = 4,
}: {
  images: { src: string; alt: string; blurDataURL?: string }[]
  columns?: number
  gap?: number
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${gap * 0.25}rem`,
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
          >
            <LazyImage
              src={image.src}
              alt={image.alt}
              blurDataURL={image.blurDataURL}
              zoom
              aspectRatio="1/1"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
              quality={90}
              priority
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

