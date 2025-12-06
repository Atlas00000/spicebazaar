/**
 * Debounce Utilities
 * Enhanced debounce functions with cleanup
 */

/**
 * Debounce function with immediate option
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): ((...args: Parameters<T>) => void) & { cancel: () => void; flush: () => void } => {
  let timeout: NodeJS.Timeout | null = null
  let result: ReturnType<T> | undefined

  const debounced = function (this: any, ...args: Parameters<T>) {
    const context = this
    const callNow = immediate && !timeout

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
      }
    }, wait)

    if (callNow) {
      result = func.apply(context, args)
    }

    return result
  } as any

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  debounced.flush = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
      if (!immediate) {
        result = func()
      }
    }
    return result
  }

  return debounced
}

/**
 * Debounce with leading edge
 */
export const debounceLeading = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  return debounce(func, wait, true) as any
}

/**
 * Debounce with trailing edge
 */
export const debounceTrailing = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  return debounce(func, wait, false) as any
}

/**
 * Debounce with max wait (ensures function is called at least once per maxWait)
 */
export const debounceMaxWait = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  maxWait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: NodeJS.Timeout | null = null
  let maxTimeout: NodeJS.Timeout | null = null
  let lastCallTime = 0

  const debounced = function (this: any, ...args: Parameters<T>) {
    const context = this
    const now = Date.now()

    if (timeout) {
      clearTimeout(timeout)
    }

    if (!maxTimeout || now - lastCallTime >= maxWait) {
      if (maxTimeout) {
        clearTimeout(maxTimeout)
      }
      maxTimeout = setTimeout(() => {
        func.apply(context, args)
        lastCallTime = Date.now()
        maxTimeout = null
      }, maxWait)
    }

    timeout = setTimeout(() => {
      func.apply(context, args)
      lastCallTime = Date.now()
      timeout = null
    }, wait)

    lastCallTime = now
  } as any

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    if (maxTimeout) {
      clearTimeout(maxTimeout)
      maxTimeout = null
    }
  }

  return debounced
}

