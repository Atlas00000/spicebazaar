/**
 * FluidFooter Component
 * Stunning footer with glossy design and interactive elements
 */

"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone, 
  Heart,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FluidSection } from '@/components/hero/FluidSection'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { springPresets } from '@/lib/animation-config'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FluidFooterProps {
  columns?: FooterColumn[]
  showNewsletter?: boolean
  onNewsletterSubscribe?: (email: string) => void
  className?: string
}

/**
 * Fluid footer with stunning visuals
 */
export const FluidFooter = ({
  columns = [],
  showNewsletter = true,
  onNewsletterSubscribe,
  className,
}: FluidFooterProps) => {
  const defaultColumns: FooterColumn[] = [
    {
      title: 'Shop',
      links: [
        { label: 'All Spices', href: '/spices' },
        { label: 'Spice Collections', href: '/collections' },
        { label: 'Recipes', href: '/recipes' },
        { label: 'Gift Sets', href: '/gifts' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Shipping', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { icon: Youtube, href: '#', label: 'YouTube', color: '#FF0000' },
  ]

  return (
    <FluidSection variant="vibrant" showOrganic showOrbs gloss className={className}>
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/" className="inline-block mb-6">
              <motion.div
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="h-10 w-10 text-primary drop-shadow-lg" />
                </motion.div>
                <h3
                  className="text-3xl font-bold font-[family-name:var(--font-playfair)]"
                  style={{
                    background: 'linear-gradient(135deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Spice Bazaar
                </h3>
              </motion.div>
            </Link>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Bringing you the world's finest spices, sourced directly from their origins. 
              Experience authentic flavors that tell stories.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-3 text-sm text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>123 Spice Street, Flavor City, FC 12345</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-sm text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-sm text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>hello@spicebazaar.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Link Columns */}
          {(columns.length > 0 ? columns : defaultColumns).map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + colIndex * 0.1 }}
            >
              <h4 className="text-lg font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + colIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <motion.span
                        className="w-0 h-0.5 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
                        }}
                        whileHover={{ width: '12px' }}
                        transition={springPresets.snappy}
                      />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        {showNewsletter && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div
              className="p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              {/* Glossy overlay */}
              <div
                className="absolute inset-0 opacity-50 pointer-events-none rounded-3xl"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)',
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h4 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2">
                    Stay Spice-Inspired
                  </h4>
                  <p className="text-muted-foreground">
                    Get exclusive recipes and spice tips delivered weekly
                  </p>
                </div>
                <form
                  className="flex gap-3 w-full md:w-auto"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const email = formData.get('email') as string
                    if (email) {
                      onNewsletterSubscribe?.(email)
                      e.currentTarget.reset()
                    }
                  }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="px-6 py-4 rounded-2xl border-none outline-none text-base flex-1 md:w-80"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <AnimatedButton
                    type="submit"
                    variant="gradient"
                    size="lg"
                    magnetic
                    glow
                  >
                    Subscribe
                  </AnimatedButton>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* Social Links */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-lg font-semibold text-foreground mb-6 text-center">
            Follow Us
          </h4>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, ...springPresets.bouncy }}
                whileHover={{
                  scale: 1.15,
                  backgroundColor: 'rgba(255,255,255,0.18)',
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-6 h-6" style={{ color: social.color }} />
                
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${social.color}40 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-sm text-muted-foreground flex items-center gap-2"
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              © {new Date().getFullYear()} Spice Bazaar. Made with{' '}
              <Heart className="w-4 h-4 text-red-500 inline" />{' '}
              for spice lovers worldwide.
            </motion.p>

            <div className="flex items-center gap-6 flex-wrap justify-center">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/cookies' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </FluidSection>
  )
}

