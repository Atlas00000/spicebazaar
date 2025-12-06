/**
 * ProductsSection Component
 * Complete products section with filter and grid
 */

"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FluidSection } from '@/components/hero/FluidSection'
import { FluidProductCard, type FluidProductCardProps } from './FluidProductCard'
import { FilterBar } from './FilterBar'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { variants } from '@/lib/animation-variants'
import { useStaggeredReveal } from '@/lib/hooks/useScrollReveal'

interface ProductsSectionProps {
  title?: string
  subtitle?: string
  products: FluidProductCardProps[]
  showFilter?: boolean
  columns?: 2 | 3 | 4
  onAddToCart?: (id: string) => void
  onAddToWishlist?: (id: string) => void
  onQuickView?: (id: string) => void
  className?: string
}

/**
 * Products section with filters and grid
 */
export const ProductsSection = ({
  title = 'Premium Spice Collection',
  subtitle = 'Hand-selected from the finest spice markets across Morocco and India',
  products,
  showFilter = true,
  columns = 4,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className,
}: ProductsSectionProps) => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState('')

  const { ref, visibleIndices } = useStaggeredReveal({
    count: filteredProducts.length,
    staggerDelay: 100,
    threshold: 'early',
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      )
    }
  }

  const handleFilterChange = (filters: any) => {
    // Simple category filter implementation
    if (filters.category && filters.category !== 'All') {
      // You can expand this based on your product data structure
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products)
    }
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <FluidSection variant="medium" showOrbs gloss className={className} id="spices">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <AnimatedBadge variant="primary" glow pulse className="mb-4">
              <motion.svg
                className="w-3 h-3 mr-1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M5 3l14 9-14 9V3z" />
              </motion.svg>
              Featured Collection
            </AnimatedBadge>
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Bar */}
        {showFilter && (
          <ScrollReveal delay={200}>
            <FilterBar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              categories={['All', 'Warming', 'Aromatic', 'Hot & Spicy', 'Sweet', 'Blends']}
            />
          </ScrollReveal>
        )}

        {/* Products Grid */}
        <div
          ref={ref as any}
          className={cn('grid gap-6 mt-12', gridCols[columns])}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial="hidden"
              animate={visibleIndices.has(index) ? 'visible' : 'hidden'}
              variants={variants.slideUp}
            >
              <FluidProductCard
                {...product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                onQuickView={onQuickView}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No spices found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </FluidSection>
  )
}

