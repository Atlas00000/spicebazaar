/**
 * useThrottle Hook
 * React hook for throttling values and callbacks
 */

"use client"

import { useState, useEffect, useRef } from 'react'
import { throttle as throttleFn, throttleRAF } from '@/lib/utils/throttle'

/**
 * Throttle a value
 */
export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, limit - (Date.now() - lastRan.current))

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

/**
 * Throttle a callback function
 */
export const useThrottledCallback = <T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T & { cancel: () => void } => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const throttled = useRef(
    throttleFn((...args: Parameters<T>) => {
      callbackRef.current(...args)
    }, limit)
  )

  useEffect(() => {
    return () => {
      throttled.current.cancel()
    }
  }, [])

  return throttled.current as any
}

/**
 * Throttle callback using requestAnimationFrame
 */
export const useRAFThrottledCallback = <T extends (...args: any[]) => any>(
  callback: T
): T & { cancel: () => void } => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const throttled = useRef(
    throttleRAF((...args: Parameters<T>) => {
      callbackRef.current(...args)
    })
  )

  useEffect(() => {
    return () => {
      throttled.current.cancel()
    }
  }, [])

  return throttled.current as any
}

