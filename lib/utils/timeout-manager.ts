/**
 * Timeout and Interval Manager
 * Utilities for managing timeouts and intervals with cleanup
 */

/**
 * Create timeout with cleanup
 */
export const createTimeout = (
  callback: () => void,
  delay: number
): (() => void) => {
  const timeoutId = setTimeout(callback, delay)

  return () => {
    clearTimeout(timeoutId)
  }
}

/**
 * Create interval with cleanup
 */
export const createInterval = (
  callback: () => void,
  delay: number
): (() => void) => {
  const intervalId = setInterval(callback, delay)

  return () => {
    clearInterval(intervalId)
  }
}

/**
 * Create RAF-based interval
 */
export const createRAFInterval = (
  callback: () => void,
  fps: number = 60
): (() => void) => {
  let rafId: number | null = null
  let lastTime = 0
  const interval = 1000 / fps

  const animate = (currentTime: number) => {
    if (currentTime - lastTime >= interval) {
      callback()
      lastTime = currentTime
    }
    rafId = requestAnimationFrame(animate)
  }

  rafId = requestAnimationFrame(animate)

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
  }
}

/**
 * Timeout manager class
 */
export class TimeoutManager {
  private timeouts: Set<NodeJS.Timeout> = new Set()

  /**
   * Create and track a timeout
   */
  setTimeout(callback: () => void, delay: number): NodeJS.Timeout {
    const timeoutId = setTimeout(() => {
      this.timeouts.delete(timeoutId)
      callback()
    }, delay)
    this.timeouts.add(timeoutId)
    return timeoutId
  }

  /**
   * Clear a specific timeout
   */
  clearTimeout(timeoutId: NodeJS.Timeout): void {
    clearTimeout(timeoutId)
    this.timeouts.delete(timeoutId)
  }

  /**
   * Clear all timeouts
   */
  clearAll(): void {
    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId))
    this.timeouts.clear()
  }

  /**
   * Get cleanup function
   */
  getCleanup(): () => void {
    return () => this.clearAll()
  }
}

/**
 * Interval manager class
 */
export class IntervalManager {
  private intervals: Set<NodeJS.Timeout> = new Set()

  /**
   * Create and track an interval
   */
  setInterval(callback: () => void, delay: number): NodeJS.Timeout {
    const intervalId = setInterval(callback, delay)
    this.intervals.add(intervalId)
    return intervalId
  }

  /**
   * Clear a specific interval
   */
  clearInterval(intervalId: NodeJS.Timeout): void {
    clearInterval(intervalId)
    this.intervals.delete(intervalId)
  }

  /**
   * Clear all intervals
   */
  clearAll(): void {
    this.intervals.forEach(intervalId => clearInterval(intervalId))
    this.intervals.clear()
  }

  /**
   * Get cleanup function
   */
  getCleanup(): () => void {
    return () => this.clearAll()
  }
}

