/**
 * Lazy Newsletter Component
 * Code-split newsletter section
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyNewsletter = createLazyComponent(
  () => import('@/components/newsletter/NewsletterSection').then(mod => ({ default: mod.NewsletterSection })),
  { ssr: false }
)

