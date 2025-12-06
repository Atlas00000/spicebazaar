/**
 * Design Tokens System
 * Centralized design tokens for Spice Bazaar
 * Following FAANG-level design system architecture
 */

// Spacing Scale (8px base)
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px
} as const

// Duration Scale
export const duration = {
  instant: 0,
  fast: 150,        // micro-interactions
  normal: 300,      // standard transitions
  slow: 500,        // emphasized transitions
  slower: 800,      // page-level changes
  slowest: 1200,    // complex orchestrations
} as const

// Border Radius Scale
export const radius = {
  none: '0',
  sm: '0.25rem',    // 4px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  full: '9999px',   // pill/circle
} as const

// Z-Index Scale
export const zIndex = {
  below: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
} as const

// Elevation/Shadow System
export const elevation = {
  none: 'none',
  sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
  lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
  xl: '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
  '2xl': '0 20px 40px rgba(0,0,0,0.20), 0 10px 15px rgba(0,0,0,0.15)',
  '3xl': '0 25px 50px rgba(0,0,0,0.25), 0 12px 20px rgba(0,0,0,0.20)',
} as const

// Typography Scale
export const typography = {
  ultraDisplay: 'clamp(3rem, 8vw, 7rem)',        // 48px → 112px
  display: 'clamp(2.5rem, 6vw, 5rem)',           // 40px → 80px
  h1: 'clamp(2rem, 5vw, 4rem)',                  // 32px → 64px
  h2: 'clamp(1.75rem, 4vw, 3rem)',               // 28px → 48px
  h3: 'clamp(1.5rem, 3vw, 2.25rem)',             // 24px → 36px
  h4: 'clamp(1.25rem, 2.5vw, 1.75rem)',          // 20px → 28px
  bodyLarge: 'clamp(1.125rem, 2vw, 1.5rem)',     // 18px → 24px
  body: 'clamp(1rem, 1.5vw, 1.125rem)',          // 16px → 18px
  small: 'clamp(0.875rem, 1.25vw, 1rem)',        // 14px → 16px
  tiny: '0.75rem',                                // 12px
} as const

// Font Weights
export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const

// Line Heights
export const lineHeight = {
  none: 1,
  tight: 1.1,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const

// Letter Spacing
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

// Breakpoints (for reference, mainly use Tailwind's)
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const

// Animation Curves (for CSS)
export const easingCurves = {
  // Material Design
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  
  // Expressive
  expressive: 'cubic-bezier(0.22, 1, 0.36, 1)',
  dramatic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Smooth
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  
  // Elastic
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  
  // Bounce
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const

// Blur Values
export const blur = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '40px',
} as const

// Opacity Scale
export const opacity = {
  invisible: 0,
  barely: 0.05,
  subtle: 0.1,
  light: 0.2,
  medium: 0.4,
  semitransparent: 0.6,
  translucent: 0.8,
  almostOpaque: 0.95,
  opaque: 1,
} as const

// Transform Scale
export const scale = {
  shrink: 0.95,
  normal: 1,
  slightGrow: 1.02,
  grow: 1.05,
  largeGrow: 1.1,
  huge: 1.2,
} as const

// Color Tokens (refer to CSS variables but available in JS)
export const colors = {
  primary: 'var(--color-primary)',
  primaryForeground: 'var(--color-primary-foreground)',
  secondary: 'var(--color-secondary)',
  secondaryForeground: 'var(--color-secondary-foreground)',
  accent: 'var(--color-accent)',
  accentForeground: 'var(--color-accent-foreground)',
  background: 'var(--color-background)',
  foreground: 'var(--color-foreground)',
  card: 'var(--color-card)',
  cardForeground: 'var(--color-card-foreground)',
  muted: 'var(--color-muted)',
  mutedForeground: 'var(--color-muted-foreground)',
  border: 'var(--color-border)',
  input: 'var(--color-input)',
  ring: 'var(--color-ring)',
} as const

// Export all tokens as a single object
export const tokens = {
  spacing,
  duration,
  radius,
  zIndex,
  elevation,
  typography,
  fontWeight,
  lineHeight,
  letterSpacing,
  breakpoints,
  easingCurves,
  blur,
  opacity,
  scale,
  colors,
} as const

// Type exports for TypeScript users
export type Spacing = keyof typeof spacing
export type Duration = keyof typeof duration
export type Radius = keyof typeof radius
export type ZIndex = keyof typeof zIndex
export type Elevation = keyof typeof elevation
export type Typography = keyof typeof typography
export type FontWeight = keyof typeof fontWeight
export type LineHeight = keyof typeof lineHeight
export type LetterSpacing = keyof typeof letterSpacing
export type Breakpoint = keyof typeof breakpoints
export type EasingCurve = keyof typeof easingCurves
export type Blur = keyof typeof blur
export type Opacity = keyof typeof opacity
export type Scale = keyof typeof scale
export type Color = keyof typeof colors

