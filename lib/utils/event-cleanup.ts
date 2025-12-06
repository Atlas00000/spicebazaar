/**
 * Event Listener Cleanup Utilities
 * Helpers for managing event listeners with proper cleanup
 */

/**
 * Create event listener with automatic cleanup
 */
export const createEventListener = (
  element: HTMLElement | Window | Document,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): (() => void) => {
  // Ensure passive for scroll, touch, and wheel events
  const defaultOptions: AddEventListenerOptions = {
    passive: true,
  }

  const finalOptions = {
    ...defaultOptions,
    ...options,
  }

  element.addEventListener(event, handler, finalOptions)

  return () => {
    element.removeEventListener(event, handler, finalOptions)
  }
}

/**
 * Create multiple event listeners
 */
export const createEventListeners = (
  listeners: Array<{
    element: HTMLElement | Window | Document
    event: string
    handler: EventListener
    options?: AddEventListenerOptions
  }>
): (() => void) => {
  const cleanups = listeners.map(({ element, event, handler, options }) =>
    createEventListener(element, event, handler, options)
  )

  return () => {
    cleanups.forEach(cleanup => cleanup())
  }
}

/**
 * Create window event listener
 */
export const createWindowListener = (
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {}
  }

  return createEventListener(window, event, handler, options)
}

/**
 * Create document event listener
 */
export const createDocumentListener = (
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): (() => void) => {
  if (typeof document === 'undefined') {
    return () => {}
  }

  return createEventListener(document, event, handler, options)
}

/**
 * Create resize listener with debounce
 */
export const createResizeListener = (
  handler: () => void,
  debounceMs: number = 150
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {}
  }

  let timeout: NodeJS.Timeout | null = null

  const debouncedHandler = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(handler, debounceMs)
  }

  const cleanup = createWindowListener('resize', debouncedHandler, {
    passive: true,
  })

  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    cleanup()
  }
}

