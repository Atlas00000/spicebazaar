/**
 * Throttle Utilities
 * Enhanced throttle functions with cleanup
 */

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let inThrottle: boolean
  let lastResult: ReturnType<T>

  const throttled = function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      lastResult = func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
    return lastResult
  } as any

  throttled.cancel = () => {
    inThrottle = false
  }

  return throttled
}

/**
 * Throttle using requestAnimationFrame
 */
export const throttleRAF = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let rafId: number | null = null
  let lastArgs: Parameters<T> | null = null

  const throttled = function (this: any, ...args: Parameters<T>) {
    lastArgs = args

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          func.apply(this, lastArgs)
        }
        rafId = null
        lastArgs = null
      })
    }
  } as any

  throttled.cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    lastArgs = null
  }

  return throttled
}

/**
 * Throttle with leading and trailing options
 */
export const throttleWithOptions = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: {
    leading?: boolean
    trailing?: boolean
  } = {}
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  const { leading = true, trailing = true } = options
  let timeout: NodeJS.Timeout | null = null
  let previous = 0
  let result: ReturnType<T>

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (!previous && leading === false) previous = now
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(this, args)
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(() => {
        previous = leading === false ? 0 : Date.now()
        timeout = null
        result = func.apply(this, args)
      }, remaining)
    }

    return result
  } as any

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
  }

  return throttled
}

/**
 * Throttle scroll events specifically
 */
export const throttleScroll = <T extends (...args: any[]) => any>(
  callback: T,
  fps: number = 60
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let rafId: number | null = null
  let lastTime = 0
  const interval = 1000 / fps

  const throttled = function (this: any, ...args: Parameters<T>) {
    const currentTime = performance.now()

    if (currentTime - lastTime >= interval) {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        callback.apply(this, args)
        lastTime = currentTime
        rafId = null
      })
    }
  } as any

  throttled.cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  return throttled
}

