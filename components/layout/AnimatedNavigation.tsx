/**
 * AnimatedNavigation Component
 * Sticky navigation with scroll animations
 */

"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { Menu, X, Search, Heart, ShoppingCart } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  badge?: number
}

interface AnimatedNavigationProps {
  logo?: React.ReactNode
  items: NavItem[]
  actions?: React.ReactNode
  transparent?: boolean
  onMenuToggle?: (isOpen: boolean) => void
  className?: string
}

/**
 * AnimatedNavigation with scroll effects
 */
export const AnimatedNavigation = ({
  logo,
  items,
  actions,
  transparent = false,
  onMenuToggle,
  className,
}: AnimatedNavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollHeight, setScrollHeight] = useState(1000)
  const { scrollY } = useScroll()

  // Change nav background on scroll
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  // Update scroll height on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateScrollHeight = () => {
        setScrollHeight(document.body.scrollHeight - window.innerHeight)
      }
      updateScrollHeight()
      window.addEventListener('resize', updateScrollHeight)
      return () => window.removeEventListener('resize', updateScrollHeight)
    }
  }, [])

  // Transform values based on scroll
  const navHeight = useTransform(scrollY, [0, 100], [80, 64])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])
  const progressScaleX = useTransform(scrollY, [0, scrollHeight], [0, 1])

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    onMenuToggle?.(!isMobileMenuOpen)
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || !transparent
            ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent',
          className
        )}
        style={{ height: navHeight }}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div style={{ scale: logoScale }}>
              {logo || (
                <span className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-primary">
                  Spice Bazaar
                </span>
              )}
            </motion.div>
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
                  className={cn(
                    'relative text-foreground hover:text-primary',
                    'transition-colors duration-200 font-medium',
                    'after:absolute after:bottom-0 after:left-0 after:right-0',
                    'after:h-0.5 after:bg-primary after:scale-x-0',
                    'after:transition-transform after:duration-300',
                    'hover:after:scale-x-100'
                  )}
                >
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white text-xs font-bold rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {actions || (
              <>
                <AnimatedButton variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </AnimatedButton>
                <AnimatedButton variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </AnimatedButton>
                <AnimatedButton variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </AnimatedButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <AnimatedButton
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={handleMenuToggle}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </AnimatedButton>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
          style={{
            scaleX: progressScaleX,
          }}
        />
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleMenuToggle}
          />

          {/* Menu Content */}
          <motion.div
            className="absolute top-20 right-4 left-4 bg-card border border-border rounded-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <nav className="p-6 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={handleMenuToggle}
                  >
                    <span className="font-medium text-foreground">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 bg-destructive text-white text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="p-6 pt-0 flex gap-2">
              <AnimatedButton variant="outline" className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Search
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

/**
 * Simple navigation preset
 */
export const SimpleNav = () => (
  <AnimatedNavigation
    items={[
      { label: 'Spices', href: '#spices' },
      { label: 'Recipes', href: '#recipes' },
      { label: 'Stories', href: '#stories' },
      { label: 'About', href: '#about' },
    ]}
  />
)

