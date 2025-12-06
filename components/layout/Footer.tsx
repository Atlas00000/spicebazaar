/**
 * Footer Component
 * Animated footer with sections
 */

"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { EnhancedInput } from '@/components/animated/EnhancedInput'
import { variants } from '@/lib/animation-variants'
import { Sparkles } from 'lucide-react'

interface FooterSection {
  title: string
  links: { label: string; href: string }[]
}

interface FooterProps {
  sections?: FooterSection[]
  newsletter?: boolean
  social?: boolean
  logo?: React.ReactNode
  className?: string
}

/**
 * Footer with animations
 */
export const Footer = ({
  sections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Spices', href: '/shop' },
        { label: 'Spice Blends', href: '/blends' },
        { label: 'Gift Sets', href: '/gifts' },
        { label: 'New Arrivals', href: '/new' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'Recipes', href: '/recipes' },
        { label: 'Spice Guide', href: '/guide' },
        { label: 'Cooking Tips', href: '/tips' },
        { label: 'Cultural Stories', href: '/stories' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Social Media', href: '/social' },
      ],
    },
  ],
  newsletter = true,
  social = true,
  logo,
  className,
}: FooterProps) => {
  return (
    <footer className={cn('bg-card border-t border-border', className)}>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={variants.staggerContainer}
        >
          {/* Brand Section */}
          <motion.div variants={variants.staggerItem}>
            <Link href="/" className="flex items-center gap-2 mb-4">
              {logo || (
                <>
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold font-[family-name:var(--font-playfair)] text-primary">
                    Spice Bazaar
                  </span>
                </>
              )}
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Bringing authentic flavors from the world's finest spice markets to your kitchen.
            </p>
            {social && (
              <div className="flex gap-2">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                  <motion.a
                    key={platform}
                    href={`https://${platform}.com`}
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">{platform}</span>
                    <span className="text-sm">
                      {platform[0].toUpperCase()}
                    </span>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={variants.staggerItem}
            >
              <h6 className="font-semibold text-foreground mb-4">
                {section.title}
              </h6>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        {newsletter && (
          <motion.div
            className="border-t border-border pt-8 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.fadeScale}
          >
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] mb-2">
                Stay Spice-Inspired
              </h3>
              <p className="text-muted-foreground mb-4">
                Get exclusive recipes and spice tips delivered to your inbox
              </p>
              <div className="flex gap-2">
                <EnhancedInput
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <AnimatedButton variant="primary" magnetic glow>
                  Subscribe
                </AnimatedButton>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Join 5,000+ spice enthusiasts. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        )}

        {/* Copyright */}
        <motion.div
          className="border-t border-border pt-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.fade}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Spice Bazaar. All rights reserved. Made with ❤️ for spice lovers everywhere.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

