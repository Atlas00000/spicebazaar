/**
 * useScrollReveal Hook
 * Intersection Observer-powered scroll reveal animations
 */

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { scrollThresholds } from '../animation-config'
import type { ScrollThreshold } from '../animation-config'

interface UseScrollRevealOptions {
  threshold?: ScrollThreshold | number
  triggerOnce?: boolean
  rootMargin?: string
  delay?: number
  onEnter?: () => void
  onLeave?: () => void
}

/**
 * Hook for scroll-triggered reveal animations
 * @param options Configuration options
 * @returns ref to attach to element and visibility state
 */
export function useScrollReveal({
  threshold = 'early',
  triggerOnce = true,
  rootMargin = '0px',
  delay = 0,
  onEnter,
  onLeave,
}: UseScrollRevealOptions = {}) {
  const [hasTriggered, setHasTriggered] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  const thresholdValue = typeof threshold === 'number' 
    ? threshold 
    : scrollThresholds[threshold]
  
  const { ref, inView, entry } = useInView({
    threshold: thresholdValue,
    triggerOnce: false,
    rootMargin,
  })
  
  const isVisible = triggerOnce ? (hasTriggered || inView) : inView
  
  useEffect(() => {
    if (inView && !hasTriggered) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setHasTriggered(true)
          onEnter?.()
        }, delay)
      } else {
        setHasTriggered(true)
        onEnter?.()
      }
    } else if (!inView && !triggerOnce) {
      onLeave?.()
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [inView, hasTriggered, triggerOnce, delay, onEnter, onLeave])
  
  return {
    ref,
    isVisible,
    inView,
    entry,
  }
}

/**
 * Hook for staggered children reveals
 * Returns an array of visibility states for multiple children
 */
export function useStaggeredReveal({
  count,
  staggerDelay = 100,
  threshold = 'early',
  triggerOnce = true,
}: {
  count: number
  staggerDelay?: number
  threshold?: ScrollThreshold | number
  triggerOnce?: boolean
}) {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set())
  const { ref, inView } = useScrollReveal({ threshold, triggerOnce: false })
  
  useEffect(() => {
    if (inView) {
      // Stagger reveal children
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          setVisibleIndices((prev) => new Set([...prev, i]))
        }, i * staggerDelay)
      }
    } else if (!triggerOnce) {
      // Reset if not trigger once
      setVisibleIndices(new Set())
    }
  }, [inView, count, staggerDelay, triggerOnce])
  
  return {
    ref,
    visibleIndices,
    isVisible: (index: number) => visibleIndices.has(index),
  }
}

/**
 * Hook for scroll progress tracking
 * Returns 0-1 value representing scroll progress through element
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const updateProgress = () => {
      const rect = element.getBoundingClientRect()
      const elementHeight = rect.height
      const elementTop = rect.top
      const windowHeight = window.innerHeight
      
      // Calculate progress (0 when top enters, 1 when bottom exits)
      const scrolled = windowHeight - elementTop
      const total = windowHeight + elementHeight
      const progressValue = Math.max(0, Math.min(1, scrolled / total))
      
      setProgress(progressValue)
    }
    
    // Throttle for performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress() // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return { ref, progress }
}

