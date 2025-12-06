/**
 * FilterBar Component
 * Glossy filter and search bar
 */

"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'

interface FilterBarProps {
  onSearch?: (query: string) => void
  onFilterChange?: (filters: any) => void
  categories?: string[]
  activeFilters?: string[]
  className?: string
}

/**
 * Filter bar with glossy aesthetic
 */
export const FilterBar = ({
  onSearch,
  onFilterChange,
  categories = ['All', 'Warming', 'Aromatic', 'Hot & Spicy', 'Sweet', 'Blends'],
  activeFilters = [],
  className,
}: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    onFilterChange?.({ category })
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search and Filter Controls */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Search Input */}
        <motion.div
          className="flex-1 relative"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
            borderRadius: '1.5rem',
          }}
          whileFocus={{
            boxShadow: '0 8px 24px rgba(198, 93, 50, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          <div className="absolute inset-0 opacity-40 pointer-events-none rounded-3xl">
            <div
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)',
              }}
            />
          </div>

          <div className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search spices, blends, and more..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <motion.button
                className="absolute right-5 text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSearch('')}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Filter Button */}
        <AnimatedButton
          variant="glass"
          size="lg"
          onClick={() => setShowFilters(!showFilters)}
          className="whitespace-nowrap"
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters
          {activeFilters.length > 0 && (
            <AnimatedBadge variant="destructive" className="ml-2">
              {activeFilters.length}
            </AnimatedBadge>
          )}
        </AnimatedButton>
      </motion.div>

      {/* Category Pills */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            className={cn(
              'px-6 py-3 rounded-2xl font-medium transition-all duration-300',
              'border text-sm'
            )}
            style={
              selectedCategory === category
                ? {
                    background: 'linear-gradient(135deg, #c65d3230 0%, #fbbf2430 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(198, 93, 50, 0.4)',
                    boxShadow: '0 4px 16px rgba(198, 93, 50, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
                    color: '#c65d32',
                  }
                : {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }
            }
            whileHover={{
              scale: 1.05,
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategorySelect(category)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Active filters display */}
      {activeFilters.length > 0 && (
        <motion.div
          className="flex items-center gap-3 flex-wrap"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <span className="text-sm text-muted-foreground font-medium">
            Active filters:
          </span>
          {activeFilters.map((filter) => (
            <AnimatedBadge key={filter} variant="primary">
              {filter}
              <button className="ml-1.5 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </AnimatedBadge>
          ))}
          <button
            className="text-sm text-primary hover:text-secondary transition-colors font-medium"
            onClick={() => onFilterChange?.({})}
          >
            Clear all
          </button>
        </motion.div>
      )}
    </div>
  )
}

