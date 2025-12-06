/**
 * Lazy Products Component
 * Code-split products section
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyProducts = createLazyComponent(
  () => import('@/components/products/ProductsSection').then(mod => ({ default: mod.ProductsSection })),
  { ssr: false }
)

