/**
 * RecipesSection Component
 * Culinary inspirations with dynamic recipe cards
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FluidSection } from '@/components/hero/FluidSection'
import { FluidRecipeCard, type RecipeData } from './FluidRecipeCard'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { GlossyCard } from '@/components/hero/GlossyCard'
import { useStaggeredReveal } from '@/lib/hooks/useScrollReveal'
import { variants } from '@/lib/animation-variants'
import { ChefHat } from 'lucide-react'

interface RecipesSectionProps {
  title?: string
  subtitle?: string
  recipes: RecipeData[]
  onViewRecipe?: (id: string) => void
  onSaveRecipe?: (id: string) => void
  className?: string
}

/**
 * Recipes section with dynamic cards
 */
export const RecipesSection = ({
  title = 'Culinary Inspirations',
  subtitle = 'Traditional recipes that celebrate the art of spice blending',
  recipes,
  onViewRecipe,
  onSaveRecipe,
  className,
}: RecipesSectionProps) => {
  const { ref, visibleIndices } = useStaggeredReveal({
    count: recipes.length,
    staggerDelay: 130,
    threshold: 'early',
  })

  return (
    <FluidSection variant="vibrant" showOrganic showOrbs gloss className={className} id="recipes">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <AnimatedBadge variant="secondary" glow className="mb-4">
              <ChefHat className="w-3 h-3 mr-1" />
              Recipe Collection
            </AnimatedBadge>
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Recipes Grid */}
        <div
          ref={ref as any}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial="hidden"
              animate={visibleIndices.has(index) ? 'visible' : 'hidden'}
              variants={variants.slideUp}
              className="h-full min-h-[500px]"
            >
              <FluidRecipeCard
                {...recipe}
                onView={onViewRecipe}
                onSave={onSaveRecipe}
              />
            </motion.div>
          ))}
        </div>

        {/* Recipe Categories */}
        <ScrollReveal delay={300}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Quick & Easy', icon: '⚡', count: '25 recipes', gradient: '#10b981, #059669' },
              { name: 'Traditional', icon: '🏺', count: '40 recipes', gradient: '#c65d32, #f97316' },
              { name: 'Vegetarian', icon: '🥬', count: '30 recipes', gradient: '#16a34a, #15803d' },
              { name: 'Spice-Forward', icon: '🌶️', count: '35 recipes', gradient: '#dc2626, #ea580c' },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <motion.div
                  className="p-6 rounded-2xl text-center cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${category.gradient})`,
                    boxShadow: `0 4px 20px ${category.gradient.split(',')[0]}30`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 8px 32px ${category.gradient.split(',')[0]}50`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h5 className="font-bold text-white mb-1 text-lg">
                    {category.name}
                  </h5>
                  <p className="text-white/90 text-sm">{category.count}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </FluidSection>
  )
}

