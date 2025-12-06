/**
 * Lazy Hero Component
 * Code-split hero section
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyHero = createLazyComponent(
  () => import('@/components/hero/FluidHeroSection').then(mod => ({ default: mod.FluidHeroSection })),
  { ssr: true }
)

