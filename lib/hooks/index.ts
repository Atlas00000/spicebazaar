/**
 * Animation Hooks Index
 * Central export for all animation hooks
 */

// Spring animations
export * from './useSpringAnimation'

// Scroll reveal
export * from './useScrollReveal'

// Parallax effects
export * from './useParallax'

// Mouse interactions
export * from './useMouseFollow'

// Gesture handling
export * from './useGesture'

// Mobile detection
export * from './useIsMobile'

// Reduced motion
export * from './useReducedMotion'

// Will-change management
export * from './useWillChange'

// Animation performance
export * from './useAnimationPerformance'

// Optimized scroll
export * from './useOptimizedScroll'

// Memory cleanup
export * from './useMemoryCleanup'

// Debounce and throttle
export * from './useDebounce'
export * from './useThrottle'

// Loading screen
export * from './useLoadingScreen'

// Re-export commonly used items
export {
  useSpringAnimation,
  useSpringRange,
  useMultiSpring,
} from './useSpringAnimation'

export {
  useScrollReveal,
  useStaggeredReveal,
  useScrollProgress,
} from './useScrollReveal'

export {
  useParallax,
  useMultiLayerParallax,
  useHorizontalParallax,
  use3DParallax,
} from './useParallax'

export {
  useMouseFollow,
  useMagneticButton,
  useGlobalCursor,
  useCursorTrail,
} from './useMouseFollow'

export {
  useGesture,
  useSwipeCarousel,
  usePullToRefresh,
  usePinchZoom,
} from './useGesture'

