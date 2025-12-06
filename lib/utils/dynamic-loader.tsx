/**
 * Dynamic Component Loader
 * Utility for lazy loading components with loading states
 */

"use client"

import { ComponentType, Suspense, lazy, LazyExoticComponent } from 'react'
import { LoadingSpinner } from '@/components/animated/LoadingSpinner'

interface DynamicLoaderOptions {
  fallback?: React.ReactNode
  loading?: 'spinner' | 'skeleton' | 'none'
  ssr?: boolean
}

/**
 * Create a lazy-loaded component with loading state
 */
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: DynamicLoaderOptions = {}
): LazyExoticComponent<T> => {
  const { ssr = true } = options
  return lazy(importFunc) as LazyExoticComponent<T>
}

/**
 * Dynamic component wrapper with Suspense
 */
export const DynamicComponent = <T extends ComponentType<any>>({
  component: LazyComponent,
  fallback,
  loading = 'spinner',
  ...props
}: {
  component: LazyExoticComponent<T>
  fallback?: React.ReactNode
  loading?: 'spinner' | 'skeleton' | 'none'
} & React.ComponentProps<T>) => {
  const defaultFallback =
    loading === 'spinner' ? (
      <LoadingSpinner />
    ) : loading === 'skeleton' ? (
      <div className="animate-pulse bg-muted rounded-lg h-32" />
    ) : null

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

/**
 * Preload a component
 */
export const preloadComponent = (
  importFunc: () => Promise<any>
): void => {
  // Prefetch the component chunk
  importFunc()
}

