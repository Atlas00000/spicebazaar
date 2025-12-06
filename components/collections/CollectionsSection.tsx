/**
 * CollectionsSection Component
 * Featured collections with dynamic layout
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FluidSection } from '@/components/hero/FluidSection'
import { FluidCollectionCard, type CollectionData } from './FluidCollectionCard'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { GlossyCard } from '@/components/hero/GlossyCard'
import { useStaggeredReveal } from '@/lib/hooks/useScrollReveal'
import { variants } from '@/lib/animation-variants'
import { Package } from 'lucide-react'

interface CollectionsSectionProps {
  title?: string
  subtitle?: string
  collections: CollectionData[]
  onAddToCart?: (id: string) => void
  onAddToWishlist?: (id: string) => void
  className?: string
}

/**
 * Collections section with dynamic layout
 */
export const CollectionsSection = ({
  title = 'Curated Collections',
  subtitle = 'Hand-picked spice combinations for every culinary journey',
  collections,
  onAddToCart,
  onAddToWishlist,
  className,
}: CollectionsSectionProps) => {
  const { ref, visibleIndices } = useStaggeredReveal({
    count: collections.length,
    staggerDelay: 150,
    threshold: 'early',
  })

  return (
    <FluidSection variant="vibrant" showOrganic showOrbs gloss className={className}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <AnimatedBadge variant="primary" glow pulse className="mb-4">
              <Package className="w-3 h-3 mr-1" />
              Curated Sets
            </AnimatedBadge>
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Collections Grid */}
        <div
          ref={ref as any}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial="hidden"
              animate={visibleIndices.has(index) ? 'visible' : 'hidden'}
              variants={variants.slideUp}
            >
              <FluidCollectionCard
                {...collection}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            </motion.div>
          ))}
        </div>

        {/* Mini Collections Row */}
        <ScrollReveal delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Starter Kits', icon: '🎁', count: '8 kits', gradient: '#3b82f6, #6366f1' },
              { name: "Chef's Choice", icon: '👨‍🍳', count: '12 sets', gradient: '#8b5cf6, #ec4899' },
              { name: 'Seasonal', icon: '🍂', count: '6 collections', gradient: '#10b981, #14b8a6' },
              { name: 'Limited Edition', icon: '⭐', count: '4 exclusive', gradient: '#fbbf24, #f97316' },
            ].map((mini, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlossyCard
                  glowColor={mini.gradient.split(',')[0]}
                  className="p-6 text-center cursor-pointer"
                >
                  <motion.div
                    className="text-5xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {mini.icon}
                  </motion.div>
                  <h4 className="text-lg font-bold font-[family-name:var(--font-playfair)] text-foreground mb-1">
                    {mini.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{mini.count}</p>
                </GlossyCard>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </FluidSection>
  )
}

