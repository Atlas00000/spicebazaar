/**
 * Lazy Collections Component
 * Code-split collections section
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyCollections = createLazyComponent(
  () => import('@/components/collections/CollectionsSection').then(mod => ({ default: mod.CollectionsSection })),
  { ssr: false }
)

