/**
 * useMouseFollow Hook
 * Cursor-reactive elements and magnetic effects
 */

import { useEffect, useState, useRef } from 'react'
import { useSpring, useMotionValue } from 'framer-motion'

interface UseMouseFollowOptions {
  strength?: number      // 0-1, how strongly element follows cursor
  smooth?: boolean       // Use spring animation
  bounded?: boolean      // Keep within element bounds
  magnetic?: boolean     // Magnetic attraction effect
  magneticRadius?: number // Distance for magnetic effect
}

/**
 * Make an element follow the mouse cursor
 * @param options Configuration options
 * @returns ref and transform values
 */
export function useMouseFollow({
  strength = 0.1,
  smooth = true,
  bounded = true,
  magnetic = false,
  magneticRadius = 100,
}: UseMouseFollowOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      
      if (magnetic) {
        // Calculate distance from center
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
        
        if (distance < magneticRadius) {
          // Apply magnetic attraction
          const forceFactor = 1 - distance / magneticRadius
          const moveX = deltaX * strength * forceFactor
          const moveY = deltaY * strength * forceFactor
          
          x.set(moveX)
          y.set(moveY)
          setPosition({ x: moveX, y: moveY })
        } else {
          x.set(0)
          y.set(0)
          setPosition({ x: 0, y: 0 })
        }
      } else {
        // Normal follow behavior
        const moveX = deltaX * strength
        const moveY = deltaY * strength
        
        if (bounded) {
          const maxMoveX = rect.width * 0.1
          const maxMoveY = rect.height * 0.1
          const boundedX = Math.max(-maxMoveX, Math.min(maxMoveX, moveX))
          const boundedY = Math.max(-maxMoveY, Math.min(maxMoveY, moveY))
          
          x.set(boundedX)
          y.set(boundedY)
          setPosition({ x: boundedX, y: boundedY })
        } else {
          x.set(moveX)
          y.set(moveY)
          setPosition({ x: moveX, y: moveY })
        }
      }
    }
    
    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
      setPosition({ x: 0, y: 0 })
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, bounded, magnetic, magneticRadius, x, y])
  
  return {
    ref,
    position,
    x: smooth ? xSpring : x,
    y: smooth ? ySpring : y,
  }
}

/**
 * Create a magnetic button effect
 * Button is attracted to cursor when nearby
 */
export function useMagneticButton(radius = 80, strength = 0.3) {
  return useMouseFollow({
    magnetic: true,
    magneticRadius: radius,
    strength,
    smooth: true,
    bounded: true,
  })
}

/**
 * Track cursor position globally
 * Useful for custom cursor effects
 */
export function useGlobalCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const xSpring = useSpring(x, { stiffness: 500, damping: 35 })
  const ySpring = useSpring(y, { stiffness: 500, damping: 35 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [x, y])
  
  return {
    position,
    x: xSpring,
    y: ySpring,
  }
}

/**
 * Create cursor trail effect
 * Elements follow cursor with delay
 */
export function useCursorTrail(trailLength = 5, delay = 50) {
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([])
  
  useEffect(() => {
    const positions: { x: number; y: number }[] = []
    let timeouts: NodeJS.Timeout[] = []
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      
      // Add new position with delay
      for (let i = 0; i < trailLength; i++) {
        const timeout = setTimeout(() => {
          setTrail((prev) => {
            const updated = [...prev, newPosition]
            return updated.slice(-trailLength) // Keep only last N positions
          })
        }, i * delay)
        
        timeouts.push(timeout)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      timeouts.forEach(clearTimeout)
    }
  }, [trailLength, delay])
  
  return trail
}

