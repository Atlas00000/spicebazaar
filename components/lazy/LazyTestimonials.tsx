/**
 * Lazy Testimonials Component
 * Code-split testimonials section
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyTestimonials = createLazyComponent(
  () => import('@/components/testimonials/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })),
  { ssr: false }
)

