"use client"

import { useEffect, useState } from 'react'
import { FluidLoadingScreen } from './FluidLoadingScreen'
import { useLoadingScreen } from '@/lib/hooks/useLoadingScreen'

interface LoadingScreenProviderProps {
  children: React.ReactNode
  minDisplayTime?: number
}

export const LoadingScreenProvider = ({ 
  children, 
  minDisplayTime = 2500 
}: LoadingScreenProviderProps) => {
  const { isLoading, progress, setProgress, complete } = useLoadingScreen({
    initialLoading: true,
    minDisplayTime,
    onComplete: () => {
      // Loading complete
    },
  })

  useEffect(() => {
    if (!isLoading) return

    const startTime = Date.now()
    const duration = minDisplayTime

    // Simulate progress based on time
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const calculatedProgress = Math.min((elapsed / duration) * 90, 90) // Cap at 90% until complete
      setProgress(calculatedProgress)
    }, 50)

    // Complete loading when page is ready
    const handleLoad = () => {
      setProgress(100)
      setTimeout(() => {
        complete()
      }, 500)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handleLoad)
    }
  }, [isLoading, minDisplayTime, setProgress, complete])

  return (
    <>
      <FluidLoadingScreen 
        isLoading={isLoading} 
        progress={progress}
        duration={minDisplayTime}
      />
      {children}
    </>
  )
}

