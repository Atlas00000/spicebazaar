# Bundle Optimization Guide

## Overview

This guide covers the bundle optimization strategies implemented to reduce JavaScript bundle size and improve performance.

## Code Splitting

### Lazy Loading Components

Use lazy-loaded components for below-the-fold content:

```tsx
// Before (loads immediately)
import { ProductsSection } from '@/components/products'

// After (lazy loaded)
import { LazyProducts } from '@/components/lazy'
import { DynamicComponent } from '@/lib/utils/dynamic-loader'

<DynamicComponent
  component={LazyProducts}
  loading="spinner"
  {...props}
/>
```

### Available Lazy Components

- `LazyHero` - Hero section
- `LazyProducts` - Products section  
- `LazyTestimonials` - Testimonials section
- `LazyStories` - Stories section
- `LazyRecipes` - Recipes section
- `LazyCollections` - Collections section
- `LazyCategories` - Categories section
- `LazyNewsletter` - Newsletter section
- `LazyParticleSystem` - Particle effects
- `LazyInteractiveGradient` - Interactive gradient

## Tree-Shaking

### Optimized Imports

Use named imports for better tree-shaking:

```tsx
// ✅ Good - Tree-shakeable
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'

// ❌ Bad - Imports entire library
import * as FramerMotion from 'framer-motion'
import * as Icons from 'lucide-react'
```

### Barrel Exports

Optimize barrel exports (`index.ts` files):

```tsx
// ✅ Good - Named exports
export { AnimatedButton } from './AnimatedButton'
export { AnimatedCard } from './AnimatedCard'

// ⚠️ Less optimal - Export all
export * from './animated'
```

## Bundle Analysis

### Analyze Bundle Size

```bash
# Run bundle analyzer
pnpm analyze

# Check for unused dependencies
pnpm check-unused

# Check bundle size
pnpm bundle-size
```

### Webpack Configuration

The `next.config.mjs` includes optimized webpack configuration:

- **Vendor Chunk**: All node_modules separated
- **Framer Motion Chunk**: Animation library isolated
- **Radix UI Chunk**: UI components separated
- **React Spring Chunk**: Animation library isolated
- **Common Chunk**: Shared code (min 2 imports)

## Optimization Strategies

### 1. Remove Unused Dependencies

Check for unused dependencies:
```bash
pnpm check-unused
```

Known unused dependencies:
- `@remix-run/react`
- `@sveltejs/kit`
- `svelte`
- `vue`
- `vue-router`

Remove them:
```bash
pnpm remove @remix-run/react @sveltejs/kit svelte vue vue-router
```

### 2. Optimize Package Imports

Next.js automatically optimizes these packages:
- `lucide-react`
- `framer-motion`
- `@radix-ui/react-icons`
- `date-fns`

### 3. Use Dynamic Imports

For heavy components:
```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

### 4. Compress and Minify

Enabled in `next.config.mjs`:
- `swcMinify: true` - Fast minification
- `compress: true` - Gzip compression

## Performance Metrics

### Target Bundle Sizes

- Initial JS: < 200KB (gzipped)
- Total JS: < 500KB (gzipped)
- Vendor chunk: < 150KB (gzipped)
- Component chunks: < 50KB each (gzipped)

### Monitoring

Use Next.js Analytics or Lighthouse to monitor:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)

## Best Practices

1. **Lazy load below-the-fold content**
2. **Use named imports for tree-shaking**
3. **Split large libraries into separate chunks**
4. **Remove unused dependencies**
5. **Monitor bundle size regularly**
6. **Use dynamic imports for heavy components**
7. **Optimize images (already implemented)**
8. **Enable compression and minification**

## Next Steps

1. Integrate lazy components into homepage
2. Remove unused dependencies
3. Monitor bundle size with `pnpm analyze`
4. Optimize barrel exports
5. Add prefetching for critical routes

