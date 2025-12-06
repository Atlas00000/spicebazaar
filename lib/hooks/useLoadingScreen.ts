"use client"

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseLoadingScreenOptions {
  initialLoading?: boolean
  minDisplayTime?: number
  onComplete?: () => void
}

export const useLoadingScreen = ({
  initialLoading = true,
  minDisplayTime = 2000,
  onComplete,
}: UseLoadingScreenOptions = {}) => {
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef(Date.now())
  const completeCalledRef = useRef(false)

  const complete = useCallback(() => {
    if (completeCalledRef.current) return
    completeCalledRef.current = true

    const elapsed = Date.now() - startTimeRef.current
    const remainingTime = Math.max(0, minDisplayTime - elapsed)

    setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        onComplete?.()
      }, 300)
    }, remainingTime)
  }, [minDisplayTime, onComplete])

  const setProgressValue = useCallback((value: number) => {
    setProgress((prev) => {
      const newProgress = Math.min(100, Math.max(0, value))
      return Math.max(prev, newProgress) // Only allow progress to increase
    })
  }, [])

  // Reset when loading starts
  useEffect(() => {
    if (isLoading) {
      startTimeRef.current = Date.now()
      completeCalledRef.current = false
      setProgress(0)
    }
  }, [isLoading])

  return {
    isLoading,
    progress,
    setProgress: setProgressValue,
    complete,
    setIsLoading,
  }
}

