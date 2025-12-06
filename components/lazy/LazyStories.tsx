/**
 * Lazy Stories Component
 * Code-split stories section
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyStories = createLazyComponent(
  () => import('@/components/stories/StoriesSection').then(mod => ({ default: mod.StoriesSection })),
  { ssr: false }
)

