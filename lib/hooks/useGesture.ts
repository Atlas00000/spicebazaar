/**
 * useGesture Hook
 * Touch/swipe gesture handling with smooth animations
 */

import { useEffect, useRef, useState } from 'react'
import { PanInfo, useAnimation } from 'framer-motion'
import { gestureSettings } from '../animation-config'

interface UseGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPan?: (info: PanInfo) => void
  threshold?: number
  velocity?: number
}

/**
 * Hook for handling swipe and pan gestures
 * @param options Gesture handlers and configuration
 * @returns Gesture event handlers for Framer Motion
 */
export function useGesture({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPan,
  threshold = gestureSettings.swipe.distance,
  velocity = gestureSettings.swipe.velocity,
}: UseGestureOptions = {}) {
  const controls = useAnimation()
  
  const handleDragEnd = (_event: any, info: PanInfo) => {
    const { offset, velocity: panVelocity } = info
    
    // Check horizontal swipe
    if (Math.abs(offset.x) > threshold || Math.abs(panVelocity.x) > velocity) {
      if (offset.x > 0) {
        onSwipeRight?.()
      } else {
        onSwipeLeft?.()
      }
    }
    
    // Check vertical swipe
    if (Math.abs(offset.y) > threshold || Math.abs(panVelocity.y) > velocity) {
      if (offset.y > 0) {
        onSwipeDown?.()
      } else {
        onSwipeUp?.()
      }
    }
    
    // Reset position with spring animation
    controls.start({
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    })
  }
  
  const handleDrag = (_event: any, info: PanInfo) => {
    onPan?.(info)
  }
  
  return {
    drag: true,
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    dragElastic: gestureSettings.drag.dragElastic,
    dragTransition: gestureSettings.drag.dragTransition,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
    animate: controls,
  }
}

/**
 * Hook for horizontal swipe carousel
 * Returns current index and handlers
 */
export function useSwipeCarousel(itemCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  
  const handleSwipeLeft = () => {
    if (currentIndex < itemCount - 1) {
      setDirection(1)
      setCurrentIndex((prev) => prev + 1)
    }
  }
  
  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((prev) => prev - 1)
    }
  }
  
  const goToIndex = (index: number) => {
    if (index >= 0 && index < itemCount) {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    }
  }
  
  const gestureHandlers = useGesture({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
  })
  
  return {
    currentIndex,
    direction,
    goToIndex,
    gestureHandlers,
    canGoNext: currentIndex < itemCount - 1,
    canGoPrev: currentIndex > 0,
  }
}

/**
 * Hook for pull-to-refresh gesture
 * Returns pull distance and refresh state
 */
export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  enabled = true,
}: {
  onRefresh: () => Promise<void> | void
  threshold?: number
  enabled?: boolean
}) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)
  
  useEffect(() => {
    if (!enabled) return
    
    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && !isRefreshing) {
        const currentY = e.touches[0].clientY
        const distance = Math.max(0, currentY - startY.current)
        setPullDistance(distance)
      }
    }
    
    const handleTouchEnd = async () => {
      if (pullDistance > threshold && !isRefreshing) {
        setIsRefreshing(true)
        await onRefresh()
        setIsRefreshing(false)
      }
      setPullDistance(0)
    }
    
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enabled, onRefresh, pullDistance, threshold, isRefreshing])
  
  return {
    pullDistance,
    isRefreshing,
    isPulling: pullDistance > 0,
    shouldRefresh: pullDistance > threshold,
    progress: Math.min(1, pullDistance / threshold),
  }
}

/**
 * Hook for pinch-to-zoom gesture
 * Returns zoom level and handlers
 */
export function usePinchZoom({
  minZoom = 1,
  maxZoom = 3,
  initialZoom = 1,
}: {
  minZoom?: number
  maxZoom?: number
  initialZoom?: number
} = {}) {
  const [zoom, setZoom] = useState(initialZoom)
  const [isPinching, setIsPinching] = useState(false)
  const lastDistance = useRef(0)
  
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        setIsPinching(true)
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        lastDistance.current = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        )
      }
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isPinching) {
        e.preventDefault()
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        )
        
        const delta = distance - lastDistance.current
        const zoomDelta = delta * 0.01
        
        setZoom((prev) => {
          const newZoom = prev + zoomDelta
          return Math.max(minZoom, Math.min(maxZoom, newZoom))
        })
        
        lastDistance.current = distance
      }
    }
    
    const handleTouchEnd = () => {
      setIsPinching(false)
    }
    
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPinching, minZoom, maxZoom])
  
  const reset = () => setZoom(initialZoom)
  
  return {
    zoom,
    isPinching,
    reset,
    setZoom: (newZoom: number) => setZoom(Math.max(minZoom, Math.min(maxZoom, newZoom))),
  }
}

