# 🌶️ Spice Bazaar

<div align="center">

![Spice Bazaar](https://img.shields.io/badge/Spice-Bazaar-orange?style=for-the-badge&logo=sparkles)
![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)

**A visually stunning, high-performance e-commerce platform for authentic spices from around the world**

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Performance](#-performance) • [Documentation](#-documentation)

</div>

---

## ✨ Overview

Spice Bazaar is a premium e-commerce platform that brings the world's finest spices directly to your kitchen. Built with cutting-edge web technologies and a focus on exceptional user experience, this application showcases a **FAANG-level of professionalism** with stunning animations, interactive components, and a rich, milky aesthetic that makes browsing spices a visual delight.

### 🎨 Design Philosophy

Our UI philosophy centers around creating a **visual marvel** that is:
- **Professional & Clean** - Executive-level polish without being boring
- **Eye-Catching** - Dynamic and engaging, not generic or tacky
- **Fluid & Organic** - Milky, oily, creamy feel with smooth, rounded edges
- **Interactive** - Stunning animations, transitions, and micro-interactions
- **Accessible** - WCAG AAA compliant with reduced motion support

---

## 🚀 Features

### 🎯 Core Features

- 🛒 **Premium Spice Marketplace** - Hand-selected spices from Morocco, India, and beyond
- 🎨 **Stunning Visual Design** - Glassmorphic UI with fluid animations
- 📱 **Fully Responsive** - Optimized for all devices with mobile-first approach
- ⚡ **Lightning Fast** - Optimized performance with code splitting and lazy loading
- ♿ **Accessible** - WCAG AAA compliant with reduced motion support
- 🌍 **International Ready** - Built for global spice trade

### 🎭 Interactive Components

- **3D Product Cards** - Mouse-reactive cards with parallax effects
- **Flip Recipe Cards** - Interactive cards that reveal ingredients
- **Parallax Storytelling** - Immersive cultural stories with scroll effects
- **Particle Systems** - GPU-accelerated particle animations
- **Magnetic Buttons** - Cursor-reactive interactive elements
- **Smooth Scroll Reveals** - Staggered animations on scroll
- **Custom Cursor** - Enhanced cursor with trail effects

### 📊 Performance Features

- **Code Splitting** - Automatic route and component-based splitting
- **Image Optimization** - Next.js Image with WebP/AVIF support
- **Bundle Optimization** - Tree-shaking and optimized imports
- **Scroll Performance** - Passive listeners and RAF throttling
- **Memory Management** - Automatic cleanup of listeners and observers
- **Animation Performance** - GPU acceleration and reduced motion support

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15.2](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### Styling & Design
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12](https://www.framer.com/motion/)** - Production-ready motion library
- **Custom Design System** - Comprehensive token system and animation presets

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **Custom Components** - 70+ custom components with glassmorphic design

### Performance & Optimization
- **Next.js Image** - Automatic image optimization
- **Code Splitting** - Dynamic imports and lazy loading
- **Bundle Analyzer** - Webpack optimization
- **Performance Monitoring** - Core Web Vitals tracking

### Development Tools
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or 20+
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/spicebazaar.git
cd spicebazaar

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start

# Analyze bundle size
pnpm analyze

# Check for unused dependencies
pnpm check-unused
```

### Docker Deployment

The application is fully containerized and ready for deployment:

```bash
# Development environment
./scripts/docker.sh start-dev

# Production environment
./scripts/docker.sh build-prod
./scripts/docker.sh start-prod

# Production with nginx reverse proxy
./scripts/docker.sh start-nginx
```

📖 **See [DOCKER.md](./DOCKER.md) for complete Docker documentation.**

---

## 📁 Project Structure

```
spicebazaar/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── animated/            # Animated components
│   ├── effects/             # Visual effects
│   ├── hero/                # Hero section components
│   ├── products/            # Product components
│   ├── categories/          # Category components
│   ├── collections/         # Collection components
│   ├── recipes/             # Recipe components
│   ├── stories/             # Story components
│   ├── testimonials/        # Testimonial components
│   ├── newsletter/          # Newsletter components
│   ├── navigation/          # Navigation components
│   ├── footer/              # Footer components
│   ├── fab/                 # Floating action buttons
│   ├── stats/               # Statistics components
│   ├── layout/              # Layout components
│   ├── lazy/                # Lazy-loaded components
│   ├── mobile/              # Mobile-optimized components
│   ├── accessibility/       # Accessibility components
│   └── images/              # Image components
├── lib/                      # Utilities and helpers
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── design-tokens.ts     # Design system tokens
│   ├── animation-config.ts  # Animation configuration
│   ├── animation-variants.ts # Framer Motion variants
│   └── easing-functions.ts  # Easing functions
├── scripts/                  # Build and utility scripts
├── public/                   # Static assets
└── next.config.mjs          # Next.js configuration
```

---

## 🎨 Design System

### Color Palette

Our color scheme reflects the warm, vibrant nature of spices:

- **Primary** - Burnt Orange (`#c65d32`) - Moroccan warmth
- **Secondary** - Turmeric Yellow (`#fbbf24`) - Golden spice
- **Accent** - Chili Red (`#ef4444`) - Fiery heat
- **Background** - Soft Cream (`#fefce8`) - Milky base

### Typography

- **Display** - Playfair Display (elegant headings)
- **Body** - Geist Sans (clean, readable)
- **Mono** - Geist Mono (code and data)
- **Script** - Dancing Script (decorative elements)

### Animation Principles

- **Spring Physics** - Natural, bouncy animations
- **Staggered Reveals** - Sequential element animations
- **Parallax Scrolling** - Multi-layer depth effects
- **3D Transforms** - Mouse-reactive perspective
- **GPU Acceleration** - Smooth 60fps performance

---

## ⚡ Performance Optimizations

### Image Optimization

- ✅ Next.js Image component with automatic optimization
- ✅ WebP/AVIF format support
- ✅ Responsive image sizing
- ✅ Lazy loading with blur placeholders
- ✅ Priority loading for above-fold images

### Code Splitting

- ✅ Route-based splitting (automatic)
- ✅ Component-based lazy loading
- ✅ Library chunk separation (Framer Motion, Radix UI)
- ✅ Dynamic imports for heavy components

### Bundle Optimization

- ✅ Tree-shaking enabled
- ✅ Optimized package imports
- ✅ Barrel export optimization
- ✅ Dead code elimination
- ✅ Minification and compression

### Scroll Performance

- ✅ Passive event listeners
- ✅ RAF-based throttling (60fps)
- ✅ Debounced scroll handlers
- ✅ Intersection Observer for lazy loading

### Memory Management

- ✅ Automatic cleanup of event listeners
- ✅ Timeout/interval management
- ✅ Observer cleanup utilities
- ✅ Memory leak prevention

---

## ♿ Accessibility

### Reduced Motion

- ✅ Respects `prefers-reduced-motion` media query
- ✅ Disables animations when requested
- ✅ Provides static fallbacks
- ✅ Smooth transitions to reduced state

### Keyboard Navigation

- ✅ Full keyboard accessibility
- ✅ Focus management
- ✅ Skip links
- ✅ ARIA labels

### Screen Readers

- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Alt text for images
- ✅ Descriptive link text

---

## 📚 Key Components

### Hero Section
```tsx
import { FluidHeroSection } from '@/components/hero'

<FluidHeroSection
  products={heroProducts}
  autoRotate
  showNavigation
/>
```

### Product Cards
```tsx
import { FluidProductCard } from '@/components/products'

<FluidProductCard
  id="1"
  name="Saffron Threads"
  price={24.99}
  image="/saffron.png"
  rating={5}
  onAddToCart={handleAddToCart}
/>
```

### Scroll Reveal
```tsx
import { ScrollReveal } from '@/components/animated'

<ScrollReveal variant="fadeScale" delay={200}>
  <YourContent />
</ScrollReveal>
```

### Optimized Images
```tsx
import { OptimizedImage } from '@/components/images'

<OptimizedImage
  src="/spice.jpg"
  alt="Premium Spice"
  width={800}
  height={600}
  priority
  quality={90}
/>
```

---

## 🎯 Performance Metrics

### Target Metrics

- **LCP (Largest Contentful Paint)** - < 2.5s
- **FID (First Input Delay)** - < 100ms
- **CLS (Cumulative Layout Shift)** - < 0.1
- **FPS** - 60fps consistently
- **Bundle Size** - < 200KB initial JS (gzipped)

### Monitoring

```bash
# Analyze bundle
pnpm analyze

# Check bundle size
pnpm bundle-size

# Performance audit
npm run lighthouse
```

---

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server

# Analysis
pnpm analyze      # Bundle analysis
pnpm check-unused # Check unused dependencies
pnpm bundle-size  # Check bundle sizes

# Code Quality
pnpm lint         # Run ESLint
```

### Environment Variables

Create a `.env.local` file:

```env
# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# API (if needed)
NEXT_PUBLIC_API_URL=your-api-url
```

---

## 📖 Documentation

- **[Docker Guide](./DOCKER.md)** - Complete Docker setup, deployment, and troubleshooting
- **[UI Philosophy Report](./docs/UI_PHILOSOPHY_REPORT.md)** - Complete design system documentation
- **[Bundle Optimization Guide](./docs/BUNDLE_OPTIMIZATION.md)** - Performance optimization strategies
- **[Codebase Report](./docs/SPICE_BAZAAR_CODEBASE_REPORT.md)** - Detailed codebase analysis
- **[Component Documentation](./components/)** - Individual component docs

---

## 🏗️ Architecture

### Component Architecture

- **Atomic Design** - Components organized by complexity
- **Composition** - Small, reusable components
- **Separation of Concerns** - Logic, styling, and presentation separated
- **Type Safety** - Full TypeScript coverage

### State Management

- **React Hooks** - useState, useEffect, useReducer
- **Context API** - For global state (notifications, theme)
- **Local State** - Component-level state where appropriate

### Data Flow

- **Server Components** - Default in Next.js App Router
- **Client Components** - Marked with "use client"
- **API Routes** - Server-side data fetching
- **Static Generation** - Pre-rendered pages

---

## 🎨 Customization

### Theming

Modify design tokens in `lib/design-tokens.ts`:

```typescript
export const colors = {
  primary: '#c65d32',
  secondary: '#fbbf24',
  // ... customize colors
}
```

### Animations

Adjust animation presets in `lib/animation-config.ts`:

```typescript
export const springPresets = {
  snappy: { stiffness: 300, damping: 30 },
  // ... customize animations
}
```

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain component modularity
- Write descriptive commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Framer Motion** - For incredible animation capabilities
- **Radix UI** - For accessible component primitives
- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first approach
- **All Contributors** - For making this project better

---

## 📞 Support

- **Documentation** - Check the docs folder
- **Issues** - [GitHub Issues](https://github.com/yourusername/spicebazaar/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/spicebazaar/discussions)

---

<div align="center">

**Built with ❤️ and lots of 🌶️**

[⬆ Back to Top](#-spice-bazaar)

</div>

