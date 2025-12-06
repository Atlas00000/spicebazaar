/**
 * Memory Cleanup Utilities
 * Helpers for proper memory management and cleanup
 */

/**
 * Cleanup manager for multiple cleanup functions
 */
export class CleanupManager {
  private cleanups: Array<() => void> = []

  /**
   * Add a cleanup function
   */
  add(cleanup: () => void): void {
    this.cleanups.push(cleanup)
  }

  /**
   * Execute all cleanup functions
   */
  cleanup(): void {
    this.cleanups.forEach(fn => {
      try {
        fn()
      } catch (error) {
        console.warn('Cleanup error:', error)
      }
    })
    this.cleanups = []
  }

  /**
   * Get cleanup function for React useEffect
   */
  getCleanup(): () => void {
    return () => this.cleanup()
  }
}

/**
 * Create a cleanup manager instance
 */
export const createCleanupManager = (): CleanupManager => {
  return new CleanupManager()
}

/**
 * Safe cleanup wrapper
 */
export const safeCleanup = (cleanup: () => void): (() => void) => {
  return () => {
    try {
      cleanup()
    } catch (error) {
      console.warn('Cleanup error:', error)
    }
  }
}

