"use client"

import { useEffect, useState, useRef } from 'react'
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
  const [isMounted, setIsMounted] = useState(false)
  const loadHandledRef = useRef(false)
  
  const { isLoading, progress, setProgress, complete } = useLoadingScreen({
    initialLoading: true,
    minDisplayTime,
    onComplete: () => {
      // Loading complete
    },
  })

  // Ensure we're on the client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isLoading || !isMounted) return

    const startTime = Date.now()
    const duration = minDisplayTime

    // Complete loading when page is ready
    const handleLoad = () => {
      if (loadHandledRef.current) return
      loadHandledRef.current = true
      setProgress(100)
      setTimeout(() => {
        complete()
      }, 500)
    }

    // Simulate progress based on time
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const calculatedProgress = Math.min((elapsed / duration) * 90, 90) // Cap at 90% until complete
      setProgress(calculatedProgress)
    }, 50)

    // Check ready state immediately (handles Vercel static generation case)
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        // Page already loaded - complete after minimum display time
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minDisplayTime - elapsed)
        setTimeout(() => {
          handleLoad()
        }, remainingTime + 100) // Small buffer
      } else {
        // Wait for load event
        window.addEventListener('load', handleLoad, { once: true })
      }
    }

    // CRITICAL: Fallback timeout to ensure loading screen ALWAYS completes
    // This prevents the screen from getting stuck on Vercel
    const fallbackTimeout = setTimeout(() => {
      if (!loadHandledRef.current) {
        console.warn('[LoadingScreen] Fallback: forcing completion after timeout')
        handleLoad()
      }
    }, minDisplayTime + 2000) // 2 second buffer beyond minDisplayTime

    return () => {
      clearInterval(interval)
      clearTimeout(fallbackTimeout)
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad)
      }
    }
  }, [isLoading, minDisplayTime, setProgress, complete, isMounted])

  return (
    <>
      {isMounted && (
        <FluidLoadingScreen 
          isLoading={isLoading} 
          progress={progress}
          duration={minDisplayTime}
        />
      )}
      {children}
    </>
  )
}

