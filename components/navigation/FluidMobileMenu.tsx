/**
 * FluidMobileMenu Component
 * Stunning mobile menu overlay with fluid animations
 */

"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { X, Search, Heart, ShoppingCart, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { springPresets } from '@/lib/animation-config'

interface NavItem {
  label: string
  href: string
  badge?: number
  icon?: React.ReactNode
}

interface FluidMobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: NavItem[]
  cartCount?: number
  wishlistCount?: number
  onSearch?: () => void
  onCartClick?: () => void
  onWishlistClick?: () => void
}

/**
 * Fluid mobile menu with stunning visuals
 */
export const FluidMobileMenu = ({
  isOpen,
  onClose,
  items,
  cartCount = 0,
  wishlistCount = 0,
  onSearch,
  onCartClick,
  onWishlistClick,
}: FluidMobileMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          >
            {/* Blurred backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(198, 93, 50, 0.3) 0%, rgba(0,0,0,0.7) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Floating gradient orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, #fbbf2460 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                x: [-30, 30, -30],
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-25"
              style={{
                background: 'radial-gradient(circle, #c65d3250 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                x: [30, -30, 30],
                y: [20, -20, 20],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.14) 100%)',
              backdropFilter: 'blur(32px) saturate(200%)',
              WebkitBackdropFilter: 'blur(32px) saturate(200%)',
              borderLeft: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '-8px 0 48px rgba(0,0,0,0.3), inset 2px 0 0 rgba(255,255,255,0.3)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={springPresets.snappy}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Multi-layer glossy overlays */}
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35) 0%, transparent 60%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 0%, transparent 50%)',
              }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/20">
              <motion.h2
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
                Menu
              </motion.h2>

              <motion.button
                className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              >
                <X className="w-6 h-6 text-foreground" />
              </motion.button>
            </div>

            {/* Quick Actions */}
            <div className="relative z-10 p-6 grid grid-cols-3 gap-3 border-b border-white/20">
              {[
                {
                  icon: <Search className="w-5 h-5" />,
                  label: 'Search',
                  onClick: () => {
                    onSearch?.()
                    onClose()
                  },
                  color: '#c65d32',
                },
                {
                  icon: <Heart className="w-5 h-5" />,
                  label: 'Wishlist',
                  badge: wishlistCount,
                  onClick: () => {
                    onWishlistClick?.()
                    onClose()
                  },
                  color: '#ef4444',
                },
                {
                  icon: <ShoppingCart className="w-5 h-5" />,
                  label: 'Cart',
                  badge: cartCount,
                  onClick: () => {
                    onCartClick?.()
                    onClose()
                  },
                  color: '#fbbf24',
                },
              ].map((action, index) => (
                <motion.button
                  key={index}
                  className="relative p-4 rounded-2xl flex flex-col items-center gap-2"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255,255,255,0.18)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.onClick}
                >
                  <motion.div
                    className="relative"
                    style={{ color: action.color }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {action.icon}
                  </motion.div>
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                  {action.badge !== undefined && action.badge > 0 && (
                    <motion.span
                      className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={springPresets.bouncy}
                      style={{
                        boxShadow: '0 2px 12px rgba(239, 68, 68, 0.5)',
                      }}
                    >
                      {action.badge > 99 ? '99+' : action.badge}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Navigation Items */}
            <nav className="relative z-10 p-6 space-y-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.08, ...springPresets.snappy }}
                  onHoverStart={() => setHoveredItem(item.href)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className="relative flex items-center justify-between p-4 rounded-2xl group"
                    style={{
                      background: hoveredItem === item.href
                        ? 'rgba(255,255,255,0.18)'
                        : 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={onClose}
                  >
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                      {item.icon && (
                        <motion.div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #c65d3240 0%, #fbbf2440 100%)',
                            boxShadow: '0 4px 16px rgba(198, 93, 50, 0.3)',
                          }}
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          {item.icon}
                        </motion.div>
                      )}
                      <span className="text-lg font-semibold text-foreground">{item.label}</span>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                      {item.badge !== undefined && item.badge > 0 && (
                        <motion.span
                          className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
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
                      <motion.div
                        animate={{
                          x: hoveredItem === item.href ? 5 : 0,
                        }}
                        transition={springPresets.snappy}
                      >
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>

                    {/* Hover glow */}
                    {hoveredItem === item.href && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(198, 93, 50, 0.2) 0%, transparent 70%)',
                          filter: 'blur(15px)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="relative z-10 p-6 border-t border-white/20">
              <motion.div
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(198, 93, 50, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)',
                  border: '1px solid rgba(198, 93, 50, 0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-muted-foreground mb-3">
                  Discover authentic spices from around the world
                </p>
                <AnimatedButton
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={onClose}
                  magnetic
                  glow
                >
                  Start Shopping
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

