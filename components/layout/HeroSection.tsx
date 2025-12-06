/**
 * HeroSection Component
 * Reusable hero section with multiple variants
 */

"use client"

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { ParticleSystem } from '@/components/effects/ParticleSystem'
import { InteractiveGradient } from '@/components/effects/InteractiveGradient'
import { TypewriterText } from '@/components/effects/TypewriterText'
import { variants } from '@/lib/animation-variants'

interface HeroAction {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
}

interface HeroSectionProps {
  title: string | string[]
  subtitle?: string
  description?: string
  actions?: HeroAction[]
  background?: 'gradient' | 'particles' | 'image' | 'video' | 'none'
  backgroundImage?: string
  backgroundVideo?: string
  overlay?: boolean
  centered?: boolean
  height?: 'screen' | 'tall' | 'medium' | 'auto'
  typewriter?: boolean
  className?: string
  children?: ReactNode
}

/**
 * Hero section with multiple variants
 */
export const HeroSection = ({
  title,
  subtitle,
  description,
  actions,
  background = 'gradient',
  backgroundImage,
  backgroundVideo,
  overlay = true,
  centered = true,
  height = 'screen',
  typewriter = false,
  className,
  children,
}: HeroSectionProps) => {
  const heightClasses = {
    screen: 'min-h-screen',
    tall: 'min-h-[80vh]',
    medium: 'min-h-[60vh]',
    auto: 'py-24',
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden flex items-center',
        heightClasses[height],
        className
      )}
    >
      {/* Background */}
      {background === 'gradient' && <InteractiveGradient />}
      {background === 'particles' && <ParticleSystem mouseAttraction fadeOnScroll />}
      {background === 'image' && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {background === 'video' && backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {overlay && background !== 'none' && (
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/80" />
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className={cn(
            'max-w-4xl',
            centered && 'mx-auto text-center'
          )}
          initial="hidden"
          animate="visible"
          variants={variants.staggerContainer}
        >
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-primary font-semibold text-lg mb-4 uppercase tracking-wider"
              variants={variants.staggerItem}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6"
            variants={variants.staggerItem}
          >
            {typewriter && typeof title === 'string' ? (
              <TypewriterText text={title} speed={80} />
            ) : Array.isArray(title) ? (
              title.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))
            ) : (
              title
            )}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={variants.staggerItem}
            >
              {description}
            </motion.p>
          )}

          {/* Actions */}
          {actions && actions.length > 0 && (
            <motion.div
              className={cn(
                'flex flex-col sm:flex-row gap-4',
                centered && 'justify-center'
              )}
              variants={variants.staggerItem}
            >
              {actions.map((action, index) => (
                <AnimatedButton
                  key={index}
                  variant={action.variant || (index === 0 ? 'primary' : 'outline')}
                  size="lg"
                  magnetic={index === 0}
                  glow={index === 0}
                  onClick={action.onClick}
                >
                  {action.label}
                </AnimatedButton>
              ))}
            </motion.div>
          )}

          {/* Custom children */}
          {children && (
            <motion.div variants={variants.staggerItem}>
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-foreground/30 rounded-full mx-auto"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

/**
 * Hero preset variants
 */

export const SpiceHero = () => (
  <HeroSection
    subtitle="Welcome to"
    title="Spice Bazaar"
    description="Discover authentic spices from the vibrant bazaars of Morocco and India. Each spice tells a story, each flavor awakens your senses."
    background="particles"
    actions={[
      { label: 'Shop Spices', href: '#spices', variant: 'primary' },
      { label: 'Explore Recipes', href: '#recipes', variant: 'outline' },
    ]}
  />
)

export const MinimalHero = ({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) => (
  <HeroSection
    title={title}
    subtitle={subtitle}
    background="none"
    height="medium"
    centered
  />
)

