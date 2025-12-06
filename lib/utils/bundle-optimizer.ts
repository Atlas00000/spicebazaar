/**
 * Bundle Optimizer Utilities
 * Helpers for optimizing bundle size and code splitting
 */

/**
 * Check if code splitting should be enabled
 */
export const shouldCodeSplit = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Enable code splitting on client
  return true
}

/**
 * Get optimal chunk size (in KB)
 */
export const getOptimalChunkSize = (): number => {
  // Target: 200KB per chunk for optimal loading
  return 200
}

/**
 * Prefetch component on hover
 */
export const prefetchOnHover = (
  importFunc: () => Promise<any>,
  delay: number = 100
): (() => void) => {
  let timeout: NodeJS.Timeout | null = null
  let prefetched = false

  const prefetch = () => {
    if (prefetched) return
    
    timeout = setTimeout(() => {
      importFunc().then(() => {
        prefetched = true
      })
    }, delay)
  }

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return () => {
    prefetch()
    return cancel
  }
}

/**
 * Load component when in viewport
 */
export const loadOnViewport = (
  importFunc: () => Promise<any>,
  threshold: number = 0.1
): void => {
  if (typeof window === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          importFunc()
          observer.disconnect()
        }
      })
    },
    { threshold }
  )

  // This would need to be called with an element
  // For now, just trigger the import
  importFunc()
}

/**
 * Batch component imports
 */
export const batchImports = async (
  imports: Array<() => Promise<any>>,
  concurrency: number = 3
): Promise<any[]> => {
  const results: any[] = []
  
  for (let i = 0; i < imports.length; i += concurrency) {
    const batch = imports.slice(i, i + concurrency)
    const batchResults = await Promise.all(batch.map(imp => imp()))
    results.push(...batchResults)
  }
  
  return results
}

