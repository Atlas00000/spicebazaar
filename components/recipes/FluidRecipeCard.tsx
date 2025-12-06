/**
 * FluidRecipeCard Component
 * Stunning recipe card with flip animation and glossy design
 */

"use client"

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Clock, Users, BookOpen, Heart, Share2, ChefHat } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { LazyImage } from '@/components/animated/LazyImage'
import { springPresets } from '@/lib/animation-config'

export interface RecipeData {
  id: string
  title: string
  description?: string
  image: string
  time: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  servings?: number
  spices: string[]
  ingredients?: string[]
  color?: string
}

interface FluidRecipeCardProps extends RecipeData {
  onView?: (id: string) => void
  onSave?: (id: string) => void
  className?: string
}

/**
 * Fluid recipe card with flip animation
 */
export const FluidRecipeCard = ({
  id,
  title,
  description,
  image,
  time,
  difficulty,
  servings,
  spices,
  ingredients = [],
  color = '#c65d32',
  onView,
  onSave,
  className,
}: FluidRecipeCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6])

  useEffect(() => {
    const element = cardRef.current
    if (!element || isFlipped) return

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
  }, [isHovered, isFlipped, mouseX, mouseY])

  const difficultyColors = {
    Easy: { bg: '#10b981', text: 'text-green-600' },
    Medium: { bg: '#f59e0b', text: 'text-amber-600' },
    Hard: { bg: '#ef4444', text: 'text-red-600' },
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.(id)
  }

  return (
    <div className={cn('relative h-full', className)} style={{ perspective: 2000 }}>
      <motion.div
        ref={cardRef}
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          rotateX: !isFlipped && isHovered ? rotateX : 0,
        }}
        transition={springPresets.snappy}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px ${color}15`,
              borderRadius: '2.5rem',
            }}
            whileHover={{
              y: -12,
              boxShadow: `0 20px 60px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), 0 8px 32px ${color}30`,
            }}
          >
            {/* Glossy overlays */}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none rounded-[2.5rem]"
              style={{
                background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 60%)',
              }}
            />

            {/* Image */}
            <div className="relative h-56 overflow-hidden rounded-t-[2.5rem]">
              <LazyImage
                src={image}
                alt={title}
                aspectRatio="16/9"
                className="w-full h-full"
              />

              {/* Difficulty badge */}
              <div className="absolute top-4 left-4">
                <AnimatedBadge
                  variant={
                    difficulty === 'Easy' ? 'success' :
                    difficulty === 'Medium' ? 'warning' : 'destructive'
                  }
                  glow
                >
                  {difficulty}
                </AnimatedBadge>
              </div>

              {/* Save button */}
              <motion.button
                className="absolute top-4 right-4 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
              >
                <Heart
                  className={cn('w-5 h-5', isSaved ? 'fill-red-500 text-red-500' : 'text-foreground')}
                />
              </motion.button>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
              {/* Title */}
              <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>

              {/* Description */}
              {description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {description}
                </p>
              )}

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" style={{ color }} />
                  <span>{time}</span>
                </div>
                {servings && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" style={{ color }} />
                    <span>{servings} servings</span>
                  </div>
                )}
              </div>

              {/* Spices */}
              <div className="flex flex-wrap gap-2 mb-4">
                {spices.slice(0, 3).map((spice, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1 rounded-xl text-xs font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    ✨ {spice}
                  </motion.span>
                ))}
                {spices.length > 3 && (
                  <span className="px-3 py-1 text-xs font-medium text-primary">
                    +{spices.length - 3} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <AnimatedButton
                  variant="gradient"
                  className="flex-1"
                  onClick={() => onView?.(id)}
                  glow
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Recipe
                </AnimatedButton>
                <AnimatedButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <ChefHat className="w-5 h-5" />
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Back Side - Ingredients */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            rotateY: 180,
          }}
        >
          <motion.div
            className="w-full h-full p-8"
            style={{
              background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
              borderRadius: '2.5rem',
            }}
          >
            {/* Glossy overlay */}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none rounded-[2.5rem]"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)',
              }}
            />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold font-[family-name:var(--font-playfair)]">
                  Ingredients
                </h4>
                <AnimatedButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFlipped(false)}
                >
                  ←
                </AnimatedButton>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar space-y-2">
                {ingredients.slice(0, 8).map((ingredient, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: color,
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    />
                    <span className="text-sm text-foreground">{ingredient}</span>
                  </motion.div>
                ))}
              </div>

              <AnimatedButton
                variant="primary"
                className="w-full mt-4"
                onClick={() => onView?.(id)}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Full Recipe
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {isHovered && !isFlipped && (
          [...Array(5)].map((_, i) => {
            const angle = (i / 5) * Math.PI * 2

            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{
                  background: color,
                  boxShadow: `0 0 12px ${color}`,
                  left: '50%',
                  top: '50%',
                  zIndex: -1,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * 140,
                  y: Math.sin(angle) * 140,
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
          })
        )}
      </motion.div>
    </div>
  )
}

