/**
 * FluidNavigation Component
 * Stunning navigation with glossy design and smooth interactions
 */

"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Heart, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { springPresets } from '@/lib/animation-config'

interface NavItem {
  label: string
  href: string
  badge?: number
}

interface FluidNavigationProps {
  items: NavItem[]
  cartCount?: number
  wishlistCount?: number
  onSearch?: () => void
  onCartClick?: () => void
  onWishlistClick?: () => void
  className?: string
}

/**
 * Fluid navigation with glossy aesthetic
 */
export const FluidNavigation = ({
  items,
  cartCount = 0,
  wishlistCount = 0,
  onSearch,
  onCartClick,
  onWishlistClick,
  className,
}: FluidNavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const { scrollY, scrollYProgress } = useScroll()

  // Update scrolled state
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  // Logo scale based on scroll
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85])
  const navPadding = useTransform(scrollY, [0, 100], [24, 16])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          className
        )}
        style={{
          paddingTop: navPadding,
          paddingBottom: navPadding,
        }}
      >
        {/* Navigation Container */}
        <div className="container mx-auto px-4">
          <motion.div
            className="relative"
            style={{
              background: isScrolled
                ? 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: isScrolled
                ? '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
                : '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
              borderRadius: '2rem',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Multi-layer glossy overlays */}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none rounded-[2rem]"
              style={{
                background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-30 pointer-events-none rounded-[2rem]"
              style={{
                background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              }}
            />

            <div className="relative z-10 flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <motion.h1
                  style={{ scale: logoScale }}
                  whileHover={{ scale: 1.05 }}
                  transition={springPresets.snappy}
                  className="text-2xl font-bold font-[family-name:var(--font-playfair)]"
                  style={{
                    background: 'linear-gradient(135deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  Spice Bazaar
                </motion.h1>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="relative text-foreground font-medium transition-colors group"
                      onMouseEnter={() => setActiveItem(item.href)}
                      onMouseLeave={() => setActiveItem(null)}
                    >
                      {item.label}

                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: activeItem === item.href ? 1 : 0 }}
                        transition={springPresets.snappy}
                      />

                      {/* Glow on hover */}
                      {activeItem === item.href && (
                        <motion.div
                          className="absolute inset-0 -z-10 rounded-lg"
                          style={{
                            background: 'radial-gradient(circle, rgba(198, 93, 50, 0.15) 0%, transparent 70%)',
                            filter: 'blur(10px)',
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}

                      {/* Badge */}
                      {item.badge !== undefined && item.badge > 0 && (
                        <motion.span
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={springPresets.bouncy}
                          style={{
                            boxShadow: '0 2px 12px rgba(239, 68, 68, 0.5)',
                          }}
                        >
                          {item.badge > 99 ? '99+' : item.badge}
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Actions */}
              <div className="hidden md:flex items-center gap-3">
                {/* Search */}
                <motion.button
                  className="w-11 h-11 rounded-xl flex items-center justify-center relative"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onSearch}
                >
                  <Search className="w-5 h-5 text-foreground" />
                </motion.button>

                {/* Wishlist */}
                <motion.button
                  className="w-11 h-11 rounded-xl flex items-center justify-center relative"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onWishlistClick}
                >
                  <Heart className="w-5 h-5 text-foreground" />
                  {wishlistCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        boxShadow: '0 2px 12px rgba(239, 68, 68, 0.5)',
                      }}
                    >
                      {wishlistCount > 99 ? '99+' : wishlistCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Cart */}
                <motion.button
                  className="w-11 h-11 rounded-xl flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, #c65d3240 0%, #fbbf2440 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(198, 93, 50, 0.3)',
                    boxShadow: '0 4px 16px rgba(198, 93, 50, 0.3)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 6px 24px rgba(198, 93, 50, 0.4)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onCartClick}
                >
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  {cartCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      style={{
                        boxShadow: '0 2px 12px rgba(198, 93, 50, 0.5)',
                      }}
                    >
                      {cartCount > 99 ? '99+' : cartCount}
                    </motion.span>
                  )}
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={springPresets.snappy}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-foreground" />
                  ) : (
                    <Menu className="w-6 h-6 text-foreground" />
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Scroll progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 rounded-full"
              style={{
                width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                background: 'linear-gradient(90deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
                boxShadow: '0 0 10px rgba(198, 93, 50, 0.5)',
              }}
            />
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <motion.div
            className="absolute top-24 left-4 right-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.12) 100%)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3)',
              borderRadius: '2rem',
            }}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={springPresets.bouncy}
          >
            {/* Glossy overlay */}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none rounded-[2rem]"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)',
              }}
            />

            <nav className="relative z-10 p-6 space-y-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between p-4 rounded-xl transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium text-foreground">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="relative z-10 p-6 pt-0 flex gap-3">
              <motion.button
                className="flex-1 h-12 rounded-xl flex items-center justify-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onSearch}
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onWishlistClick}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, #c65d3240 0%, #fbbf2440 100%)',
                  border: '1px solid rgba(198, 93, 50, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onCartClick}
              >
                <ShoppingCart className="w-5 h-5 text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

