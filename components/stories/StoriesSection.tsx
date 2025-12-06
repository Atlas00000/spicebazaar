/**
 * StoriesSection Component
 * Cultural stories with immersive storytelling
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FluidSection } from '@/components/hero/FluidSection'
import { FluidStoryCard, type StoryData } from './FluidStoryCard'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { GlossyCard } from '@/components/hero/GlossyCard'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { BookOpen, Globe, Heart, Sparkles } from 'lucide-react'

interface StoriesSectionProps {
  title?: string
  subtitle?: string
  stories: StoryData[]
  onReadMore?: (id: string) => void
  className?: string
}

/**
 * Stories section with immersive design
 */
export const StoriesSection = ({
  title = 'Stories Behind the Spices',
  subtitle = 'Every spice carries centuries of tradition, culture, and heritage',
  stories,
  onReadMore,
  className,
}: StoriesSectionProps) => {
  return (
    <FluidSection variant="vibrant" showOrganic showOrbs gloss className={className} id="stories">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <AnimatedBadge variant="primary" glow pulse className="mb-4">
              <Globe className="w-3 h-3 mr-1" />
              Cultural Heritage
            </AnimatedBadge>
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Stories Timeline */}
        <div className="space-y-32 relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-1 hidden lg:block"
            style={{
              background: 'linear-gradient(to bottom, #c65d3240 0%, #fbbf2440 50%, #ef444440 100%)',
            }}
          />

          {stories.map((story, index) => (
            <FluidStoryCard
              key={story.id}
              {...story}
              index={index}
              onReadMore={onReadMore}
            />
          ))}
        </div>

        {/* Heritage Values */}
        <ScrollReveal delay={400}>
          <div className="mt-24">
            <h3 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-center text-foreground mb-12">
              Our Heritage Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: 'Tradition',
                  description: 'Honoring centuries-old spice trade routes and family recipes',
                  gradient: '#c65d32, #f97316',
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: 'Authenticity',
                  description: 'Direct partnerships with farmers and spice merchants',
                  gradient: '#fbbf24, #f59e0b',
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: 'Sustainability',
                  description: 'Supporting local communities and eco-friendly practices',
                  gradient: '#10b981, #059669',
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlossyCard
                    glowColor={value.gradient.split(',')[0]}
                    className="p-8 text-center h-full"
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${value.gradient})`,
                        boxShadow: `0 4px 20px ${value.gradient.split(',')[0]}40`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className="text-white">
                        {value.icon}
                      </div>
                    </motion.div>
                    <h4 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </GlossyCard>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={600}>
          <div className="mt-16 text-center">
            <GlossyCard glowColor="#c65d32" className="inline-block p-8">
              <h4 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
                Want to learn more about our journey?
              </h4>
              <AnimatedButton
                variant="gradient"
                size="lg"
                magnetic
                glow
                ripple
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Discover Our Story
              </AnimatedButton>
            </GlossyCard>
          </div>
        </ScrollReveal>
      </div>
    </FluidSection>
  )
}

