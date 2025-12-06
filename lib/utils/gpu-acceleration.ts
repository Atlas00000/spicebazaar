/**
 * GPU Acceleration Utilities
 * Helpers for forcing GPU acceleration on elements
 */

/**
 * Force GPU acceleration on an element
 */
export const forceGPUAcceleration = (element: HTMLElement): void => {
  element.style.transform = 'translateZ(0)'
  element.style.willChange = 'transform'
  element.style.backfaceVisibility = 'hidden'
  element.style.perspective = '1000px'
}

/**
 * Remove GPU acceleration hints
 */
export const removeGPUAcceleration = (element: HTMLElement): void => {
  element.style.transform = ''
  element.style.willChange = ''
  element.style.backfaceVisibility = ''
  element.style.perspective = ''
}

/**
 * Check if element is GPU accelerated
 */
export const isGPUAccelerated = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element)
  return (
    style.transform !== 'none' ||
    style.willChange !== 'auto' ||
    style.backfaceVisibility === 'hidden'
  )
}

/**
 * CSS classes for GPU acceleration
 */
export const GPU_CLASSES = {
  accelerate: 'gpu-accelerate',
  transform: 'gpu-transform',
  opacity: 'gpu-opacity',
} as const

