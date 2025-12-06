/**
 * Scroll Performance Optimizer
 * Utilities for optimizing scroll performance
 */

/**
 * Create passive event listener
 */
export const createPassiveListener = (
  element: HTMLElement | Window,
  event: string,
  handler: EventListener,
  options: AddEventListenerOptions = {}
): (() => void) => {
  const opts: AddEventListenerOptions = {
    passive: true,
    ...options,
  }

  element.addEventListener(event, handler, opts)

  return () => {
    element.removeEventListener(event, handler, opts)
  }
}

/**
 * Throttled scroll handler using requestAnimationFrame
 */
export const createThrottledScrollHandler = (
  callback: () => void,
  fps: number = 60
): (() => void) => {
  let rafId: number | null = null
  let lastTime = 0
  const interval = 1000 / fps

  const handler = () => {
    const currentTime = performance.now()
    
    if (currentTime - lastTime >= interval) {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        callback()
        lastTime = currentTime
      })
    }
  }

  return handler
}

/**
 * Debounced scroll handler
 */
export const createDebouncedScrollHandler = (
  callback: () => void,
  delay: number = 100
): (() => void) => {
  let timeout: NodeJS.Timeout | null = null

  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      callback()
    }, delay)
  }
}

/**
 * Optimized scroll listener with passive and throttling
 */
export const createOptimizedScrollListener = (
  callback: () => void,
  options: {
    passive?: boolean
    throttle?: boolean
    fps?: number
    debounce?: boolean
    delay?: number
  } = {}
): (() => void) => {
  const {
    passive = true,
    throttle = true,
    fps = 60,
    debounce = false,
    delay = 100,
  } = options

  let handler: () => void

  if (throttle) {
    handler = createThrottledScrollHandler(callback, fps)
  } else if (debounce) {
    handler = createDebouncedScrollHandler(callback, delay)
  } else {
    handler = callback
  }

  return createPassiveListener(window, 'scroll', handler, { passive })
}

/**
 * Check if element is in viewport
 */
export const isInViewport = (
  element: HTMLElement,
  threshold: number = 0
): boolean => {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  )
}

/**
 * Get scroll position
 */
export const getScrollPosition = (): { x: number; y: number } => {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 }
  }

  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }
}

/**
 * Get scroll progress (0 to 1)
 */
export const getScrollProgress = (): number => {
  if (typeof window === 'undefined') {
    return 0
  }

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight

  return scrollTop / (scrollHeight - clientHeight)
}

