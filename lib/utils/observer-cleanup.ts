/**
 * Observer Cleanup Utilities
 * Helpers for managing observers with proper cleanup
 */

/**
 * Create Intersection Observer with cleanup
 */
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): {
  observer: IntersectionObserver
  observe: (element: Element) => void
  unobserve: (element: Element) => void
  disconnect: () => void
  cleanup: () => void
} => {
  const observer = new IntersectionObserver(callback, options)
  const observedElements: Set<Element> = new Set()

  return {
    observer,
    observe: (element: Element) => {
      observer.observe(element)
      observedElements.add(element)
    },
    unobserve: (element: Element) => {
      observer.unobserve(element)
      observedElements.delete(element)
    },
    disconnect: () => {
      observer.disconnect()
      observedElements.clear()
    },
    cleanup: () => {
      observedElements.forEach(element => observer.unobserve(element))
      observer.disconnect()
      observedElements.clear()
    },
  }
}

/**
 * Create Mutation Observer with cleanup
 */
export const createMutationObserver = (
  callback: MutationCallback,
  options?: MutationObserverInit
): {
  observer: MutationObserver
  observe: (target: Node) => void
  disconnect: () => void
  cleanup: () => void
} => {
  const observer = new MutationObserver(callback)
  const observedTargets: Set<Node> = new Set()

  return {
    observer,
    observe: (target: Node) => {
      observer.observe(target, options)
      observedTargets.add(target)
    },
    disconnect: () => {
      observer.disconnect()
      observedTargets.clear()
    },
    cleanup: () => {
      observer.disconnect()
      observedTargets.clear()
    },
  }
}

/**
 * Create Resize Observer with cleanup
 */
export const createResizeObserver = (
  callback: ResizeObserverCallback
): {
  observer: ResizeObserver
  observe: (target: Element) => void
  unobserve: (target: Element) => void
  disconnect: () => void
  cleanup: () => void
} => {
  const observer = new ResizeObserver(callback)
  const observedElements: Set<Element> = new Set()

  return {
    observer,
    observe: (target: Element) => {
      observer.observe(target)
      observedElements.add(target)
    },
    unobserve: (target: Element) => {
      observer.unobserve(target)
      observedElements.delete(target)
    },
    disconnect: () => {
      observer.disconnect()
      observedElements.clear()
    },
    cleanup: () => {
      observedElements.forEach(element => observer.unobserve(element))
      observer.disconnect()
      observedElements.clear()
    },
  }
}

