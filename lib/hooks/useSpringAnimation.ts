/**
 * useSpringAnimation Hook
 * Physics-based spring animations using Framer Motion
 */

import { useSpring, useTransform, type SpringOptions } from 'framer-motion'
import { springPresets } from '../animation-config'
import type { SpringPreset } from '../animation-config'

interface UseSpringAnimationOptions {
  from: number
  to: number
  preset?: SpringPreset
  customSpring?: SpringOptions
}

/**
 * Create a physics-based spring animation value
 * @param options Animation options
 * @returns Animated motion value
 */
export function useSpringAnimation({
  from,
  to,
  preset = 'snappy',
  customSpring,
}: UseSpringAnimationOptions) {
  const springConfig = customSpring || springPresets[preset]
  
  const spring = useSpring(from, springConfig)
  
  // Update spring value
  const updateSpring = (newValue: number) => {
    spring.set(newValue)
  }
  
  // Animate to target value
  const animateTo = (target: number) => {
    spring.set(target)
  }
  
  return {
    value: spring,
    updateSpring,
    animateTo,
  }
}

/**
 * Create a range-mapped spring animation
 * Example: scroll position (0-100) -> scale (0.8-1.0)
 */
export function useSpringRange({
  input,
  output,
  preset = 'gentle',
}: {
  input: [number, number]
  output: [number, number]
  preset?: SpringPreset
}) {
  const springConfig = springPresets[preset]
  const spring = useSpring(input[0], springConfig)
  const transformed = useTransform(spring, input, output)
  
  return {
    value: transformed,
    update: (newValue: number) => spring.set(newValue),
  }
}

/**
 * Create multiple coordinated spring animations
 * Useful for complex multi-property animations
 */
export function useMultiSpring<T extends Record<string, number>>({
  values,
  preset = 'snappy',
}: {
  values: T
  preset?: SpringPreset
}) {
  const springConfig = springPresets[preset]
  
  const springs = Object.entries(values).reduce((acc, [key, value]) => {
    acc[key as keyof T] = useSpring(value, springConfig)
    return acc
  }, {} as Record<keyof T, ReturnType<typeof useSpring>>)
  
  const update = (newValues: Partial<T>) => {
    Object.entries(newValues).forEach(([key, value]) => {
      if (springs[key as keyof T] && typeof value === 'number') {
        springs[key as keyof T].set(value)
      }
    })
  }
  
  return {
    springs,
    update,
  }
}

