/**
 * Animation Configuration
 * Centralized animation settings and constants
 */

import { duration, easingCurves } from './design-tokens'

// Spring Physics Presets (for Framer Motion & React Spring)
export const springPresets = {
  // Gentle, smooth spring
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
  
  // Snappy, responsive spring
  snappy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
  
  // Bouncy, playful spring
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
    mass: 1,
  },
  
  // Stiff, fast spring
  stiff: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
    mass: 0.8,
  },
  
  // Wobbly, expressive spring
  wobbly: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 12,
    mass: 1,
  },
  
  // Slow, dramatic spring
  slow: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 25,
    mass: 1.5,
  },
} as const

// Tween (Duration-based) Presets
export const tweenPresets = {
  fast: {
    type: 'tween' as const,
    duration: duration.fast / 1000, // Convert to seconds
    ease: easingCurves.standard,
  },
  
  normal: {
    type: 'tween' as const,
    duration: duration.normal / 1000,
    ease: easingCurves.standard,
  },
  
  slow: {
    type: 'tween' as const,
    duration: duration.slow / 1000,
    ease: easingCurves.expressive,
  },
  
  slower: {
    type: 'tween' as const,
    duration: duration.slower / 1000,
    ease: easingCurves.expressive,
  },
  
  slowest: {
    type: 'tween' as const,
    duration: duration.slowest / 1000,
    ease: easingCurves.smooth,
  },
} as const

// Scroll Animation Thresholds
export const scrollThresholds = {
  immediate: 0.05,    // Trigger almost immediately
  early: 0.1,         // Trigger when 10% visible
  quarter: 0.25,      // Trigger when 25% visible
  half: 0.5,          // Trigger when 50% visible
  full: 1,            // Trigger when fully visible
} as const

// Parallax Speed Factors
export const parallaxSpeeds = {
  background: 0.1,    // Far background, slowest
  midground: 0.3,     // Middle layer
  foreground: 0.5,    // Near foreground
  normal: 1,          // Same speed as scroll
  fast: 1.5,          // Faster than scroll
} as const

// Stagger Children Delays (in seconds)
export const staggerDelays = {
  tight: 0.05,        // Very tight stagger
  snug: 0.1,          // Snug stagger
  normal: 0.15,       // Normal stagger
  relaxed: 0.2,       // Relaxed stagger
  loose: 0.3,         // Loose stagger
} as const

// Hover Animation Settings
export const hoverSettings = {
  // Lift effect
  lift: {
    y: -8,
    scale: 1.02,
    transition: springPresets.snappy,
  },
  
  // Strong lift
  liftStrong: {
    y: -12,
    scale: 1.05,
    transition: springPresets.bouncy,
  },
  
  // Subtle lift
  liftSubtle: {
    y: -4,
    scale: 1.01,
    transition: springPresets.gentle,
  },
  
  // Scale only
  scale: {
    scale: 1.05,
    transition: springPresets.snappy,
  },
  
  // Glow (applied via CSS)
  glow: {
    filter: 'brightness(1.1)',
    transition: tweenPresets.fast,
  },
} as const

// Tap/Active Animation Settings
export const tapSettings = {
  // Scale down on tap
  scaleDown: {
    scale: 0.95,
    transition: springPresets.stiff,
  },
  
  // Strong scale down
  scaleDownStrong: {
    scale: 0.9,
    transition: springPresets.stiff,
  },
  
  // Subtle scale down
  scaleDownSubtle: {
    scale: 0.98,
    transition: springPresets.stiff,
  },
} as const

// Page Transition Settings
export const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: tweenPresets.normal,
  },
  
  fadeScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: tweenPresets.slow,
  },
  
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: springPresets.snappy,
  },
  
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
    transition: springPresets.snappy,
  },
} as const

// Particle Animation Settings
export const particleSettings = {
  // Desktop settings
  desktop: {
    count: 20,
    minSize: 3,
    maxSize: 8,
    minSpeed: 0.8,
    maxSpeed: 2.5,
    opacity: { min: 0.3, max: 0.8 },
  },
  
  // Mobile settings (optimized)
  mobile: {
    count: 8,
    minSize: 2,
    maxSize: 5,
    minSpeed: 1,
    maxSpeed: 2,
    opacity: { min: 0.3, max: 0.6 },
  },
  
  // Tablet settings
  tablet: {
    count: 12,
    minSize: 3,
    maxSize: 6,
    minSpeed: 0.9,
    maxSpeed: 2,
    opacity: { min: 0.3, max: 0.7 },
  },
} as const

// Performance Settings
export const performanceSettings = {
  // Reduce motion preferences
  reducedMotion: {
    skipAnimations: true,
    instantTransitions: true,
    disableParallax: true,
    disableParticles: true,
  },
  
  // Mobile optimizations
  mobileOptimizations: {
    reducedParticles: true,
    simplifiedShadows: true,
    disableHeavyEffects: true,
    reduceBlur: true,
  },
  
  // Performance budgets (in ms)
  budgets: {
    animationFrame: 16,      // 60fps
    layoutShift: 100,        // CLS budget
    interaction: 100,        // TBT budget
  },
} as const

// Gesture Settings
export const gestureSettings = {
  // Drag constraints
  drag: {
    dragElastic: 0.2,
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    dragTransition: { bounceStiffness: 300, bounceDamping: 20 },
  },
  
  // Swipe thresholds
  swipe: {
    velocity: 500,           // px/s
    distance: 50,            // px
    direction: 'horizontal' as const,
  },
  
  // Pan thresholds
  pan: {
    threshold: 10,           // px before pan starts
  },
} as const

// Loading Animation Settings
export const loadingSettings = {
  // Skeleton shimmer
  skeleton: {
    duration: 1.5,
    ease: 'linear' as const,
    repeat: Infinity,
  },
  
  // Spinner
  spinner: {
    duration: 1,
    ease: 'linear' as const,
    repeat: Infinity,
  },
  
  // Progress bar
  progressBar: {
    duration: 0.5,
    ease: easingCurves.smooth,
  },
  
  // Pulse
  pulse: {
    duration: 2,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'reverse' as const,
  },
} as const

// Export all animation config
export const animationConfig = {
  springPresets,
  tweenPresets,
  scrollThresholds,
  parallaxSpeeds,
  staggerDelays,
  hoverSettings,
  tapSettings,
  pageTransitions,
  particleSettings,
  performanceSettings,
  gestureSettings,
  loadingSettings,
} as const

// Type exports
export type SpringPreset = keyof typeof springPresets
export type TweenPreset = keyof typeof tweenPresets
export type ScrollThreshold = keyof typeof scrollThresholds
export type ParallaxSpeed = keyof typeof parallaxSpeeds
export type StaggerDelay = keyof typeof staggerDelays

