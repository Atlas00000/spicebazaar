"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SpiceParticles } from './SpiceParticles'
import { MorphingBackground } from './MorphingBackground'
import { LoadingText } from './LoadingText'
import { FluidProgress } from './FluidProgress'
import { useReducedMotion } from '@/lib/hooks'

interface FluidLoadingScreenProps {
  isLoading?: boolean
  progress?: number
  onComplete?: () => void
  variant?: 'full' | 'minimal'
  duration?: number
}

export const FluidLoadingScreen = ({
  isLoading = true,
  progress,
  onComplete,
  variant = 'full',
  duration = 3000,
}: FluidLoadingScreenProps) => {
  const [internalProgress, setInternalProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(isLoading)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isLoading) {
      // Fade out when loading completes
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(true)
    }
  }, [isLoading, onComplete])

  useEffect(() => {
    if (progress === undefined && isLoading) {
      // Simulate progress if not provided
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const calculatedProgress = Math.min((elapsed / duration) * 100, 95)
        setInternalProgress(calculatedProgress)

        if (calculatedProgress >= 95) {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    } else if (progress !== undefined) {
      setInternalProgress(progress)
    }
  }, [isLoading, progress, duration])

  const currentProgress = progress !== undefined ? progress : internalProgress

  if (variant === 'minimal') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              background: 'rgba(254, 252, 232, 0.95)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          >
            <div className="flex flex-col items-center gap-4">
              <LoadingText variant="minimal" />
              <FluidProgress progress={currentProgress} variant="linear" showPercentage={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(254, 252, 232, 0.98) 0%, rgba(255, 250, 240, 0.98) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
        >
          {/* Morphing background blobs */}
          <MorphingBackground variant="primary" />
          <MorphingBackground variant="secondary" />
          <MorphingBackground variant="accent" />

          {/* Spice particles */}
          {!prefersReducedMotion && (
            <SpiceParticles count={40} intensity="medium" />
          )}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4">
            {/* Logo/Brand area */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.8,
                ease: 'easeOut',
              }}
            >
              <div
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(198, 93, 50, 0.2) 0%, rgba(251, 191, 36, 0.2) 50%, rgba(239, 68, 68, 0.2) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(198, 93, 50, 0.3)',
                  boxShadow: '0 20px 60px rgba(198, 93, 50, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Animated spice icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <span className="text-4xl md:text-5xl">🌶️</span>
                </motion.div>

                {/* Pulsing rings */}
                {!prefersReducedMotion && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: '2px solid rgba(198, 93, 50, 0.3)',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: '2px solid rgba(251, 191, 36, 0.3)',
                      }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.3,
                      }}
                    />
                  </>
                )}
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.6,
                delay: 0.2,
              }}
            >
              <LoadingText variant="elaborate" />
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="w-full max-w-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.6,
                delay: 0.4,
              }}
            >
              <FluidProgress 
                progress={currentProgress} 
                variant="wave"
                showPercentage={true}
              />
            </motion.div>

            {/* Decorative elements */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -bottom-20 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1 }}
              >
                <div className="flex gap-4">
                  {['🌶️', '🧄', '🥘', '🌿', '🍛'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Glossy overlay for milky effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              mixBlendMode: 'overlay',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

