/**
 * Animation Throttling Utilities
 * Throttle and debounce animation callbacks
 */

/**
 * Throttle function for animations
 */
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Debounce function for animations
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return function (this: any, ...args: Parameters<T>) {
    const context = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

/**
 * Throttle using requestAnimationFrame
 */
export const rafThrottle = <T extends (...args: any[]) => void>(
  func: T
): ((...args: Parameters<T>) => void) => {
  let rafId: number | null = null
  return function (this: any, ...args: Parameters<T>) {
    const context = this
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(context, args)
        rafId = null
      })
    }
  }
}

/**
 * Throttle scroll events for animations
 */
export const throttleScroll = (
  callback: () => void,
  fps: number = 60
): (() => void) => {
  let rafId: number | null = null
  let lastTime = 0
  const interval = 1000 / fps

  return () => {
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
}

