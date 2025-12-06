/**
 * RAF Optimizer Utilities
 * Optimized requestAnimationFrame helpers
 */

/**
 * Throttled RAF callback
 */
export class RAFThrottle {
  private rafId: number | null = null
  private lastTime = 0

  constructor(
    private callback: () => void,
    private fps: number = 60
  ) {}

  start(): void {
    if (this.rafId !== null) return

    const interval = 1000 / this.fps
    const animate = (currentTime: number) => {
      if (currentTime - this.lastTime >= interval) {
        this.callback()
        this.lastTime = currentTime
      }
      this.rafId = requestAnimationFrame(animate)
    }

    this.rafId = requestAnimationFrame(animate)
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
}

/**
 * Batch multiple RAF callbacks
 */
export class RAFBatcher {
  private callbacks: Set<() => void> = new Set()
  private rafId: number | null = null

  add(callback: () => void): () => void {
    this.callbacks.add(callback)
    this.start()
    return () => this.remove(callback)
  }

  remove(callback: () => void): void {
    this.callbacks.delete(callback)
    if (this.callbacks.size === 0) {
      this.stop()
    }
  }

  private start(): void {
    if (this.rafId !== null) return

    const animate = () => {
      this.callbacks.forEach(callback => callback())
      this.rafId = requestAnimationFrame(animate)
    }

    this.rafId = requestAnimationFrame(animate)
  }

  private stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
}

/**
 * Global RAF batcher instance
 */
export const globalRAFBatcher = new RAFBatcher()

