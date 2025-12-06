/**
 * ScrollProgressIndicator Component
 * Visual scroll progress indicators
 */

"use client"

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  color?: string
  height?: number
  position?: 'top' | 'bottom'
  showPercentage?: boolean
  smooth?: boolean
  className?: string
}

/**
 * Linear scroll progress bar
 */
export const ScrollProgressIndicator = ({
  color = 'bg-primary',
  height = 3,
  position = 'top',
  showPercentage = false,
  smooth = true,
  className,
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll()
  const scaleX = smooth 
    ? useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
    : scrollYProgress

  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100))
    })
  }, [scrollYProgress])

  return (
    <>
      <motion.div
        className={cn(
          'fixed left-0 right-0 z-50 origin-left',
          position === 'top' ? 'top-0' : 'bottom-0',
          color,
          className
        )}
        style={{
          height: `${height}px`,
          scaleX,
        }}
      />
      {showPercentage && (
        <motion.div
          className="fixed top-20 right-4 z-50 px-3 py-1.5 bg-card border border-border rounded-full shadow-lg text-sm font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {percentage}%
        </motion.div>
      )}
    </>
  )
}

/**
 * Circular scroll progress indicator
 */
export const CircularScrollProgress = ({
  size = 60,
  strokeWidth = 4,
  color = 'stroke-primary',
  position = { bottom: 24, right: 24 },
}: {
  size?: number
  strokeWidth?: number
  color?: string
  position?: { bottom?: number; right?: number; top?: number; left?: number }
}) => {
  const { scrollYProgress } = useScroll()
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  const [offset, setOffset] = useState(circumference)

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setOffset(circumference - latest * circumference)
    })
  }, [scrollYProgress, circumference])

  return (
    <motion.div
      className="fixed z-50 cursor-pointer"
      style={position}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.1 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
    </motion.div>
  )
}

/**
 * Reading progress indicator (for articles)
 */
export const ReadingProgress = ({
  targetRef,
  color = 'bg-primary',
}: {
  targetRef: React.RefObject<HTMLElement>
  color?: string
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      if (!targetRef.current) return

      const element = targetRef.current
      const rect = element.getBoundingClientRect()
      const elementHeight = rect.height
      const elementTop = rect.top
      const windowHeight = window.innerHeight

      const scrolled = Math.max(0, windowHeight - elementTop)
      const total = elementHeight + windowHeight
      const percentage = Math.min(100, (scrolled / total) * 100)

      setProgress(percentage)
    }

    window.addEventListener('scroll', calculateProgress, { passive: true })
    calculateProgress()

    return () => window.removeEventListener('scroll', calculateProgress)
  }, [targetRef])

  return (
    <motion.div
      className={cn('fixed top-0 left-0 right-0 h-1 z-50 origin-left', color)}
      style={{ scaleX: progress / 100 }}
    />
  )
}

/**
 * Section navigation dots
 */
export const SectionDots = ({
  sections,
  activeColor = 'bg-primary',
  inactiveColor = 'bg-muted-foreground/30',
}: {
  sections: string[]
  activeColor?: string
  inactiveColor?: string
}) => {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((id) =>
        document.getElementById(id)
      )

      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((_, index) => (
        <motion.button
          key={index}
          className={cn(
            'w-3 h-3 rounded-full transition-all duration-300',
            index === activeSection ? activeColor : inactiveColor,
            index === activeSection && 'scale-125'
          )}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection(index)}
        />
      ))}
    </div>
  )
}

