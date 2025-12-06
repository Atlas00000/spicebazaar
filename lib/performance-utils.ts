/**
 * Performance Monitoring Utilities
 * Tools for measuring and optimizing performance
 */

/**
 * Performance budget thresholds
 */
export const PERFORMANCE_BUDGETS = {
  // Core Web Vitals targets (milliseconds)
  LCP: 1500,        // Largest Contentful Paint
  FID: 50,          // First Input Delay
  CLS: 0.05,        // Cumulative Layout Shift
  
  // Other metrics
  FCP: 1000,        // First Contentful Paint
  TTI: 3000,        // Time to Interactive
  TBT: 200,         // Total Blocking Time
  
  // Animation performance
  FRAME_TIME: 16,   // 60fps budget
  ANIMATION_BUDGET: 100, // Max time for animation frame
} as const

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if device is low-end (for adaptive performance)
 */
export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false
  
  // Check for low memory
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) return true
  
  // Check for slow CPU
  const hardwareConcurrency = navigator.hardwareConcurrency
  if (hardwareConcurrency && hardwareConcurrency < 4) return true
  
  // Check connection speed
  const connection = (navigator as any).connection
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true
  }
  
  return false
}

/**
 * Check if device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Measure component render time
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map()
  private measures: Map<string, number> = new Map()
  
  /**
   * Start measuring
   */
  mark(name: string): void {
    if (typeof performance === 'undefined') return
    this.marks.set(name, performance.now())
  }
  
  /**
   * End measuring and get duration
   */
  measure(name: string, startMark: string): number {
    if (typeof performance === 'undefined') return 0
    
    const startTime = this.marks.get(startMark)
    if (!startTime) return 0
    
    const duration = performance.now() - startTime
    this.measures.set(name, duration)
    
    // Log if exceeds budget
    if (duration > PERFORMANCE_BUDGETS.ANIMATION_BUDGET) {
      console.warn(`Performance: ${name} took ${duration.toFixed(2)}ms (budget: ${PERFORMANCE_BUDGETS.ANIMATION_BUDGET}ms)`)
    }
    
    return duration
  }
  
  /**
   * Get all measurements
   */
  getMeasures(): Map<string, number> {
    return this.measures
  }
  
  /**
   * Clear all marks and measures
   */
  clear(): void {
    this.marks.clear()
    this.measures.clear()
  }
}

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  let lastResult: ReturnType<T>
  
  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      inThrottle = true
      lastResult = func.apply(this, args)
      
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * Request Animation Frame with fallback
 */
export const raf = (callback: FrameRequestCallback): number => {
  if (typeof window === 'undefined') return 0
  return window.requestAnimationFrame?.(callback) || 
         setTimeout(() => callback(Date.now()), 16)
}

/**
 * Cancel Animation Frame with fallback
 */
export const caf = (id: number): void => {
  if (typeof window === 'undefined') return
  window.cancelAnimationFrame?.(id) || clearTimeout(id)
}

/**
 * Measure First Contentful Paint
 */
export const measureFCP = (): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) {
      resolve(0)
      return
    }
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint')
      
      if (fcpEntry) {
        resolve(fcpEntry.startTime)
        observer.disconnect()
      }
    })
    
    observer.observe({ entryTypes: ['paint'] })
    
    // Timeout after 10s
    setTimeout(() => {
      observer.disconnect()
      resolve(0)
    }, 10000)
  })
}

/**
 * Measure Largest Contentful Paint
 */
export const measureLCP = (): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) {
      resolve(0)
      return
    }
    
    let lcpValue = 0
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      lcpValue = lastEntry.startTime
    })
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] })
    
    // Stop observing after page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        observer.disconnect()
        resolve(lcpValue)
      }, 0)
    })
    
    // Timeout after 10s
    setTimeout(() => {
      observer.disconnect()
      resolve(lcpValue)
    }, 10000)
  })
}

/**
 * Measure Cumulative Layout Shift
 */
export const measureCLS = (): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) {
      resolve(0)
      return
    }
    
    let clsValue = 0
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
    })
    
    observer.observe({ entryTypes: ['layout-shift'] })
    
    // Stop observing after page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        observer.disconnect()
        resolve(clsValue)
      }, 0)
    })
    
    // Timeout after 10s
    setTimeout(() => {
      observer.disconnect()
      resolve(clsValue)
    }, 10000)
  })
}

/**
 * Log all Core Web Vitals
 */
export const logCoreWebVitals = async () => {
  const [fcp, lcp, cls] = await Promise.all([
    measureFCP(),
    measureLCP(),
    measureCLS(),
  ])
  
  console.group('📊 Core Web Vitals')
  console.log(`FCP: ${fcp.toFixed(2)}ms ${fcp < PERFORMANCE_BUDGETS.FCP ? '✅' : '❌'}`)
  console.log(`LCP: ${lcp.toFixed(2)}ms ${lcp < PERFORMANCE_BUDGETS.LCP ? '✅' : '❌'}`)
  console.log(`CLS: ${cls.toFixed(4)} ${cls < PERFORMANCE_BUDGETS.CLS ? '✅' : '❌'}`)
  console.groupEnd()
  
  return { fcp, lcp, cls }
}

/**
 * Adaptive loading based on device capabilities
 */
export const getAdaptiveConfig = () => {
  const isLowEnd = isLowEndDevice()
  const isMobile = isMobileDevice()
  const reducedMotion = prefersReducedMotion()
  
  return {
    isLowEnd,
    isMobile,
    reducedMotion,
    
    // Recommended settings
    particleCount: isLowEnd ? 5 : isMobile ? 10 : 20,
    useBlur: !isLowEnd,
    use3DTransforms: !isLowEnd && !isMobile,
    useParallax: !reducedMotion && !isLowEnd,
    animationDuration: reducedMotion ? 0 : isMobile ? 200 : 300,
    useSmoothScrolling: !reducedMotion && !isLowEnd,
    imageQuality: isLowEnd ? 'low' : isMobile ? 'medium' : 'high',
  }
}

/**
 * Check if GPU acceleration is available
 */
export const hasGPUAcceleration = (): boolean => {
  if (typeof document === 'undefined') return false
  
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  
  return !!gl
}

/**
 * Measure component mount time (use in useEffect)
 */
export const measureMountTime = (componentName: string) => {
  const startTime = performance.now()
  
  return () => {
    const mountTime = performance.now() - startTime
    console.log(`🎨 ${componentName} mounted in ${mountTime.toFixed(2)}ms`)
  }
}

/**
 * Global performance monitor instance
 */
export const perfMonitor = new PerformanceMonitor()

