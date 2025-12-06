/**
 * CustomCursor Component
 * Animated cursor with trail effects
 */

"use client"

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CustomCursorProps {
  showTrail?: boolean
  trailLength?: number
  color?: string
  size?: number
  blend?: boolean
}

/**
 * Custom animated cursor
 */
export const CustomCursor = ({
  showTrail = true,
  trailLength = 8,
  color = 'rgb(198, 93, 50)',
  size = 12,
  blend = true,
}: CustomCursorProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([])

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)

      // Update trail
      if (showTrail) {
        setTrail((prev) => {
          const newTrail = [{ x: e.clientX, y: e.clientY }, ...prev]
          return newTrail.slice(0, trailLength)
        })
      }
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Check for hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('button') ||
        target.closest('a')
      
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, showTrail, trailLength])

  if (!isVisible) return null

  return (
    <>
      {/* Trail */}
      {showTrail &&
        trail.map((point, index) => (
          <motion.div
            key={index}
            className="fixed pointer-events-none rounded-full z-[9999]"
            style={{
              left: point.x,
              top: point.y,
              width: size * (1 - index / trailLength),
              height: size * (1 - index / trailLength),
              backgroundColor: color,
              opacity: 0.3 * (1 - index / trailLength),
              transform: 'translate(-50%, -50%)',
              mixBlendMode: blend ? 'difference' : 'normal',
            }}
          />
        ))}

      {/* Main cursor */}
      <motion.div
        className={cn(
          'fixed pointer-events-none rounded-full z-[10000]',
          'transition-all duration-200'
        )}
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: isHovering ? size * 2 : size,
          height: isHovering ? size * 2 : size,
          backgroundColor: isHovering ? 'transparent' : color,
          border: isHovering ? `2px solid ${color}` : 'none',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: blend ? 'difference' : 'normal',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none rounded-full z-[10001]"
        style={{
          left: cursorX,
          top: cursorY,
          width: 4,
          height: 4,
          backgroundColor: color,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: blend ? 'difference' : 'normal',
        }}
      />
    </>
  )
}

/**
 * Enable/disable custom cursor hook
 */
export const useCustomCursor = (enabled: boolean = true) => {
  useEffect(() => {
    if (enabled) {
      document.documentElement.style.cursor = 'none'
      document.body.style.cursor = 'none'
    } else {
      document.documentElement.style.cursor = ''
      document.body.style.cursor = ''
    }

    return () => {
      document.documentElement.style.cursor = ''
      document.body.style.cursor = ''
    }
  }, [enabled])
}

