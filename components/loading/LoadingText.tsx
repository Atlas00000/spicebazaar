"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingTextProps {
  messages?: string[]
  variant?: 'default' | 'minimal' | 'elaborate'
}

const defaultMessages = [
  'Discovering exotic flavors...',
  'Gathering the finest spices...',
  'Preparing your journey...',
  'Almost ready...',
]

export const LoadingText = ({ 
  messages = defaultMessages, 
  variant = 'default' 
}: LoadingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const currentMessage = messages[currentIndex]
    let charIndex = 0
    setDisplayText('')

    const typeInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayText(currentMessage.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        // Wait before switching to next message
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % messages.length)
        }, 2000)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentIndex, messages])

  if (variant === 'minimal') {
    return (
      <motion.div
        className="text-2xl font-medium"
        style={{
          background: 'linear-gradient(135deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading...
      </motion.div>
    )
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="text-3xl md:text-4xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #c65d32 0%, #fbbf24 50%, #ef4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(198, 93, 50, 0.3)',
            }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1"
            >
              |
            </motion.span>
          </span>
        </motion.div>
      </AnimatePresence>

      {variant === 'elaborate' && (
        <motion.div
          className="mt-4 text-sm text-center opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Crafting an extraordinary experience
          </motion.span>
        </motion.div>
      )}
    </div>
  )
}

