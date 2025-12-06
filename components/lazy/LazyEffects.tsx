/**
 * Lazy Effects Components
 * Code-split heavy effects components
 */

import { createLazyComponent } from '@/lib/utils/dynamic-loader'

export const LazyParticleSystem = createLazyComponent(
  () => import('@/components/effects/ParticleSystem').then(mod => ({ default: mod.ParticleSystem })),
  { ssr: false }
)

export const LazyInteractiveGradient = createLazyComponent(
  () => import('@/components/effects/InteractiveGradient').then(mod => ({ default: mod.InteractiveGradient })),
  { ssr: false }
)

export const LazyCustomCursor = createLazyComponent(
  () => import('@/components/effects/CustomCursor').then(mod => ({ default: mod.CustomCursor })),
  { ssr: false }
)

