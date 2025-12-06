/**
 * Lazy Recipes Component
 * Code-split recipes section
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyRecipes = createLazyComponent(
  () => import('@/components/recipes/RecipesSection').then(mod => ({ default: mod.RecipesSection })),
  { ssr: false }
)

