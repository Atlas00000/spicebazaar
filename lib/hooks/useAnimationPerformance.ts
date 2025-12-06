/**
 * useAnimationPerformance Hook
 * Monitor and optimize animation performance
 */

"use client"

import { useEffect, useRef, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  frameTime: number
  droppedFrames: number
}

/**
 * Hook to monitor animation performance
 */
export const useAnimationPerformance = (
  enabled: boolean = true,
  targetFPS: number = 60
) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    droppedFrames: 0,
  })

  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const rafIdRef = useRef<number | null>(null)
  const droppedFramesRef = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const measure = (currentTime: number) => {
      const delta = currentTime - lastTimeRef.current
      frameCountRef.current++

      // Check for dropped frames (frame time > 20ms for 60fps)
      const expectedFrameTime = 1000 / targetFPS
      if (delta > expectedFrameTime * 1.5) {
        droppedFramesRef.current++
      }

      // Update metrics every second
      if (delta >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / delta)
        const frameTime = delta / frameCountRef.current

        setMetrics({
          fps,
          frameTime,
          droppedFrames: droppedFramesRef.current,
        })

        frameCountRef.current = 0
        droppedFramesRef.current = 0
        lastTimeRef.current = currentTime
      }

      rafIdRef.current = requestAnimationFrame(measure)
    }

    rafIdRef.current = requestAnimationFrame(measure)

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [enabled, targetFPS])

  return metrics
}

/**
 * Hook to detect low performance and reduce animations
 */
export const useAdaptiveAnimations = () => {
  const { fps, droppedFrames } = useAnimationPerformance(true)
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false)

  useEffect(() => {
    // Reduce animations if FPS < 30 or too many dropped frames
    const shouldReduce = fps < 30 || droppedFrames > 10
    setShouldReduceAnimations(shouldReduce)
  }, [fps, droppedFrames])

  return {
    shouldReduceAnimations,
    fps,
    droppedFrames,
  }
}

