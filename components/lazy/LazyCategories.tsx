/**
 * Lazy Categories Component
 * Code-split categories section
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyCategories = createLazyComponent(
  () => import('@/components/categories/CategoriesSection').then(mod => ({ default: mod.CategoriesSection })),
  { ssr: false }
)

