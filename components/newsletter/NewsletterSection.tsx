/**
 * NewsletterSection Component
 * Newsletter signup with stunning visuals
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FluidSection } from '@/components/hero/FluidSection'
import { FluidNewsletterCard } from './FluidNewsletterCard'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { GlossyCard } from '@/components/hero/GlossyCard'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { Mail, Award, Users, Zap } from 'lucide-react'

interface NewsletterSectionProps {
  onSubscribe?: (email: string) => void
  subscriberCount?: number
  showStats?: boolean
  className?: string
}

/**
 * Newsletter section with rich visuals
 */
export const NewsletterSection = ({
  onSubscribe,
  subscriberCount = 5247,
  showStats = true,
  className,
}: NewsletterSectionProps) => {
  return (
    <FluidSection variant="vibrant" showOrganic showOrbs gloss className={className}>
      <div className="container mx-auto px-4">
        {/* Main Newsletter Card */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <FluidNewsletterCard
              onSubscribe={onSubscribe}
              subscriberCount={subscriberCount}
            />
          </div>
        </ScrollReveal>

        {/* Social Proof Stats */}
        {showStats && (
          <ScrollReveal delay={300}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: <Users className="w-6 h-6" />,
                  value: subscriberCount,
                  label: 'Subscribers',
                  suffix: '+',
                  color: '#c65d32',
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  value: 52,
                  label: 'Emails Sent',
                  suffix: 'k+',
                  color: '#fbbf24',
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  value: 98,
                  label: 'Satisfaction',
                  suffix: '%',
                  color: '#10b981',
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  value: 4.9,
                  label: 'Rating',
                  suffix: '/5',
                  color: '#ef4444',
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlossyCard glowColor={stat.color} className="p-6 text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
                      style={{
                        background: `${stat.color}30`,
                        boxShadow: `0 4px 16px ${stat.color}30`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div style={{ color: stat.color }}>
                        {stat.icon}
                      </div>
                    </motion.div>
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {typeof stat.value === 'number' && !stat.suffix?.includes('/') 
                        ? <motion.span>{stat.value}{stat.suffix}</motion.span>
                        : `${stat.value}${stat.suffix}`
                      }
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </GlossyCard>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Trust badges */}
        <ScrollReveal delay={500}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <AnimatedBadge variant="outline" className="text-sm py-2 px-4">
              🔒 Privacy Protected
            </AnimatedBadge>
            <AnimatedBadge variant="outline" className="text-sm py-2 px-4">
              📧 No Spam Ever
            </AnimatedBadge>
            <AnimatedBadge variant="outline" className="text-sm py-2 px-4">
              ⚡ Weekly Updates
            </AnimatedBadge>
            <AnimatedBadge variant="outline" className="text-sm py-2 px-4">
              🎁 Exclusive Offers
            </AnimatedBadge>
          </div>
        </ScrollReveal>
      </div>
    </FluidSection>
  )
}

