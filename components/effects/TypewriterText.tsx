/**
 * TypewriterText Component
 * Typewriter animation for text
 */

"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'

interface TypewriterTextProps {
  text: string | string[]
  speed?: number
  deleteSpeed?: number
  delay?: number
  loop?: boolean
  cursor?: boolean
  startOnView?: boolean
  onComplete?: () => void
  className?: string
}

/**
 * TypewriterText with cursor
 */
export const TypewriterText = ({
  text,
  speed = 50,
  deleteSpeed = 30,
  delay = 1000,
  loop = false,
  cursor = true,
  startOnView = true,
  onComplete,
  className,
}: TypewriterTextProps) => {
  const texts = Array.isArray(text) ? text : [text]
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasStarted, setHasStarted] = useState(!startOnView)

  const { ref, isVisible } = useScrollReveal({
    threshold: 'quarter',
    triggerOnce: true,
  })

  useEffect(() => {
    if (startOnView && isVisible && !hasStarted) {
      setHasStarted(true)
    }
  }, [isVisible, startOnView, hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const currentText = texts[currentIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayText === currentText) {
      if (loop || currentIndex < texts.length - 1) {
        timeout = setTimeout(() => setIsDeleting(true), delay)
      } else {
        onComplete?.()
      }
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    } else {
      const nextText = isDeleting
        ? currentText.substring(0, displayText.length - 1)
        : currentText.substring(0, displayText.length + 1)

      timeout = setTimeout(
        () => setDisplayText(nextText),
        isDeleting ? deleteSpeed : speed
      )
    }

    return () => clearTimeout(timeout)
  }, [
    displayText,
    isDeleting,
    currentIndex,
    texts,
    speed,
    deleteSpeed,
    delay,
    loop,
    hasStarted,
    onComplete,
  ])

  return (
    <span ref={ref as any} className={cn('inline-block', className)}>
      {displayText}
      {cursor && (
        <motion.span
          className="inline-block ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}

/**
 * Typewriter with character-by-character animation
 */
export const AnimatedTypewriter = ({
  text,
  delay = 0,
  speed = 0.05,
  className,
}: {
  text: string
  delay?: number
  speed?: number
  className?: string
}) => {
  const letters = Array.from(text)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  return (
    <motion.span
      className={cn('inline-block', className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * Split text animation (words appear one by one)
 */
export const SplitTextAnimation = ({
  text,
  delay = 0,
  staggerDelay = 0.1,
  className,
}: {
  text: string
  delay?: number
  staggerDelay?: number
  className?: string
}) => {
  const words = text.split(' ')

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                damping: 12,
                stiffness: 200,
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

