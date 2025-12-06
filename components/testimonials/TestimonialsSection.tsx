/**
 * TestimonialsSection Component
 * Customer testimonials with carousel and glossy design
 */

"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FluidSection } from '@/components/hero/FluidSection'
import { FluidTestimonialCard, type TestimonialData } from './FluidTestimonialCard'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { useStaggeredReveal } from '@/lib/hooks/useScrollReveal'
import { variants } from '@/lib/animation-variants'

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials: TestimonialData[]
  autoRotate?: boolean
  showAll?: boolean
  className?: string
}

/**
 * Testimonials section with carousel
 */
export const TestimonialsSection = ({
  title = 'What Our Customers Say',
  subtitle = 'Discover why chefs and home cooks choose our authentic spices',
  testimonials,
  autoRotate = false,
  showAll = true,
  className,
}: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { ref, visibleIndices } = useStaggeredReveal({
    count: testimonials.length,
    staggerDelay: 140,
    threshold: 'early',
  })

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <FluidSection variant="medium" showOrbs gloss className={className}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <AnimatedBadge variant="secondary" glow className="mb-4">
              <MessageCircle className="w-3 h-3 mr-1" />
              Testimonials
            </AnimatedBadge>
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {showAll ? (
          /* Grid Layout - Show All */
          <div
            ref={ref as any}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                animate={visibleIndices.has(index) ? 'visible' : 'hidden'}
                variants={variants.slideUp}
              >
                <FluidTestimonialCard
                  {...testimonial}
                  featured={index === 0}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Carousel Layout */
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={springPresets.snappy}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <FluidTestimonialCard {...testimonial} featured />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <AnimatedButton
                variant="ghost"
                size="icon"
                onClick={goToPrev}
                className="w-12 h-12"
              >
                <ChevronLeft className="w-6 h-6" />
              </AnimatedButton>

              {/* Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === currentIndex ? 'w-12 bg-primary' : 'w-2 bg-muted-foreground/30'
                    )}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>

              <AnimatedButton
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="w-12 h-12"
              >
                <ChevronRight className="w-6 h-6" />
              </AnimatedButton>
            </div>
          </div>
        )}

        {/* Trust indicators */}
        <ScrollReveal delay={500}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: '5.0', label: 'Average Rating', icon: '⭐' },
              { value: '2,500+', label: 'Reviews', icon: '💬' },
              { value: '98%', label: 'Satisfaction', icon: '❤️' },
              { value: '4.9', label: 'Quality Score', icon: '✨' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-primary mb-1">
                  {stat.icon} {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </FluidSection>
  )
}

