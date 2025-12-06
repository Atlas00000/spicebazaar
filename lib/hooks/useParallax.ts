/**
 * useParallax Hook
 * Multi-layer parallax scrolling effects
 */

import { useEffect, useState, useRef } from 'react'
import { useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import { parallaxSpeeds } from '../animation-config'
import type { ParallaxSpeed } from '../animation-config'

interface UseParallaxOptions {
  speed?: ParallaxSpeed | number
  smooth?: boolean
  reverse?: boolean
}

/**
 * Create a parallax effect based on scroll position
 * @param options Parallax configuration
 * @returns Motion value for transform
 */
export function useParallax({
  speed = 'midground',
  smooth = true,
  reverse = false,
}: UseParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  
  // Get speed factor
  const speedFactor = typeof speed === 'number' 
    ? speed 
    : parallaxSpeeds[speed]
  
  // Calculate parallax range
  const range = 100 * speedFactor * (reverse ? -1 : 1)
  
  // Transform scroll progress to y position
  const y = useTransform(scrollYProgress, [0, 1], [-range, range])
  
  // Optionally smooth with spring
  const ySmooth = smooth ? useSpring(y, { stiffness: 100, damping: 30 }) : y
  
  return { ref, y: ySmooth }
}

/**
 * Create multiple parallax layers with different speeds
 * Useful for complex layered backgrounds
 */
export function useMultiLayerParallax(layers: {
  speed: ParallaxSpeed | number
  reverse?: boolean
}[]) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  
  const transforms = layers.map(({ speed, reverse = false }) => {
    const speedFactor = typeof speed === 'number' 
      ? speed 
      : parallaxSpeeds[speed]
    
    const range = 100 * speedFactor * (reverse ? -1 : 1)
    const y = useTransform(scrollYProgress, [0, 1], [-range, range])
    return useSpring(y, { stiffness: 100, damping: 30 })
  })
  
  return { ref, transforms }
}

/**
 * Create horizontal parallax effect
 * Useful for side-scrolling elements
 */
export function useHorizontalParallax({
  speed = 'midground',
  smooth = true,
  reverse = false,
}: UseParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  
  const speedFactor = typeof speed === 'number' 
    ? speed 
    : parallaxSpeeds[speed]
  
  const range = 100 * speedFactor * (reverse ? -1 : 1)
  const x = useTransform(scrollYProgress, [0, 1], [-range, range])
  const xSmooth = smooth ? useSpring(x, { stiffness: 100, damping: 30 }) : x
  
  return { ref, x: xSmooth }
}

/**
 * Create 3D parallax effect with mouse movement
 * Useful for card tilt effects
 */
export function use3DParallax({
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
}: {
  maxTilt?: number
  perspective?: number
  scale?: number
} = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 })
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate rotation based on mouse position
      const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * maxTilt
      const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt
      
      setRotateX(-rotateXValue)
      setRotateY(rotateYValue)
    }
    
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
      setIsHovered(false)
      setRotateX(0)
      setRotateY(0)
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt])
  
  return {
    ref,
    transform: {
      rotateX: rotateXSpring,
      rotateY: rotateYSpring,
      scale: isHovered ? scale : 1,
    },
    style: {
      perspective,
      transformStyle: 'preserve-3d' as const,
    },
  }
}

