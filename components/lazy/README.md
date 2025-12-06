# Lazy Components

Code-split components for improved performance and faster initial load times.

## Usage

### Basic Usage

```tsx
import { LazyProducts } from '@/components/lazy'
import { DynamicComponent } from '@/lib/utils/dynamic-loader'

// In your component
<DynamicComponent
  component={LazyProducts}
  loading="spinner" // or 'skeleton' or 'none'
  // ... other props
/>
```

### With Custom Fallback

```tsx
<DynamicComponent
  component={LazyProducts}
  fallback={<CustomLoadingState />}
  // ... props
/>
```

### Direct Usage (with Suspense)

```tsx
import { Suspense } from 'react'
import { LazyProducts } from '@/components/lazy'
import { LoadingSpinner } from '@/components/animated/LoadingSpinner'

<Suspense fallback={<LoadingSpinner />}>
  <LazyProducts {...props} />
</Suspense>
```

## Available Lazy Components

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
- `LazyCustomCursor` - Custom cursor

## Benefits

- **Faster Initial Load** - Components load only when needed
- **Smaller Bundle** - Reduces initial JavaScript bundle size
- **Better Performance** - Improves Core Web Vitals
- **Progressive Loading** - Content loads as user scrolls

