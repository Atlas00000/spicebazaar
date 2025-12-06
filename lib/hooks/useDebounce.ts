/**
 * useDebounce Hook
 * React hook for debouncing values and callbacks
 */

"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { debounce as debounceFn } from '@/lib/utils/debounce'

/**
 * Debounce a value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Debounce a callback function
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  immediate: boolean = false
): T & { cancel: () => void; flush: () => void } => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const debounced = useMemo(
    () => debounceFn((...args: Parameters<T>) => {
      callbackRef.current(...args)
    }, delay, immediate),
    [delay, immediate]
  )

  useEffect(() => {
    return () => {
      debounced.cancel()
    }
  }, [debounced])

  return debounced as any
}

