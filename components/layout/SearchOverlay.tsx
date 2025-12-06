/**
 * SearchOverlay Component
 * Command palette style search
 */

"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { variants } from '@/lib/animation-variants'

interface SearchResult {
  id: string
  title: string
  category: string
  url: string
  icon?: React.ReactNode
}

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  placeholder?: string
  recentSearches?: string[]
  trendingSearches?: string[]
  onSearch?: (query: string) => Promise<SearchResult[]> | SearchResult[]
}

/**
 * SearchOverlay with command palette style
 */
export const SearchOverlay = ({
  isOpen,
  onClose,
  placeholder = 'Search spices, recipes, and more...',
  recentSearches = [],
  trendingSearches = [],
  onSearch,
}: SearchOverlayProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Handle search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || !onSearch) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      const searchResults = await onSearch(searchQuery)
      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [onSearch])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        window.location.href = results[selectedIndex].url
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex])

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Search Panel */}
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[9999] px-4"
            variants={variants.fadeScale}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-11 pr-11 py-3 bg-transparent border-none outline-none text-lg"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isSearching ? (
                  <div className="p-8 text-center text-muted-foreground">
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <motion.a
                        key={result.id}
                        href={result.url}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors',
                          index === selectedIndex && 'bg-muted'
                        )}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        {result.icon && (
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {result.icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {result.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {result.category}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </motion.a>
                    ))}
                  </div>
                ) : query ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Recent Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search) => (
                            <button
                              key={search}
                              onClick={() => setQuery(search)}
                              className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-md text-sm transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Searches */}
                    {trendingSearches.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Trending Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {trendingSearches.map((search) => (
                            <button
                              key={search}
                              onClick={() => setQuery(search)}
                              className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/**
 * Hook to control search overlay
 */
export const useSearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  }
}

