/**
 * CategoriesSection Component
 * Spice categories with bento-style layout
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FluidSection } from '@/components/hero/FluidSection'
import { FluidCategoryCard } from './FluidCategoryCard'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { useStaggeredReveal } from '@/lib/hooks/useScrollReveal'
import { variants } from '@/lib/animation-variants'

export interface Category {
  id: string
  name: string
  description: string
  icon: string | React.ReactNode
  count: string
  gradient: string
  href?: string
  featured?: boolean
}

interface CategoriesSectionProps {
  title?: string
  subtitle?: string
  categories: Category[]
  onCategoryClick?: (categoryId: string) => void
  className?: string
}

/**
 * Categories section with bento-style layout
 */
export const CategoriesSection = ({
  title = 'Explore Spice Categories',
  subtitle = 'From warming spices to exotic blends, discover the perfect flavor for every dish',
  categories,
  onCategoryClick,
  className,
}: CategoriesSectionProps) => {
  const { ref, visibleIndices } = useStaggeredReveal({
    count: categories.length,
    staggerDelay: 120,
    threshold: 'early',
  })

  return (
    <FluidSection variant="medium" showOrganic showOrbs gloss className={className}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <AnimatedBadge variant="secondary" glow className="mb-4">
              <motion.svg
                className="w-3 h-3 mr-1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </motion.svg>
              Categories
            </AnimatedBadge>
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Bento-style Grid */}
        <div
          ref={ref as any}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial="hidden"
              animate={visibleIndices.has(index) ? 'visible' : 'hidden'}
              variants={variants.slideUp}
              className={category.featured ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <FluidCategoryCard
                {...category}
                onClick={() => onCategoryClick?.(category.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="relative mt-16 flex items-center justify-center">
          <motion.div
            className="px-8 py-4 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 12px 48px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,0.35)',
            }}
          >
            <p className="text-sm text-muted-foreground">
              Can't find what you're looking for?{' '}
              <span className="text-primary font-semibold cursor-pointer hover:text-secondary transition-colors">
                Browse all categories →
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </FluidSection>
  )
}

