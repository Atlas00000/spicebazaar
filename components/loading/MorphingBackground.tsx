"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MorphingBackgroundProps {
  variant?: 'primary' | 'secondary' | 'accent'
}

export const MorphingBackground = ({ variant = 'primary' }: MorphingBackgroundProps) => {
  const [paths, setPaths] = useState<string[]>([])

  // Generate organic blob paths
  const generateBlobPath = (seed: number, complexity: number = 4): string => {
    const points: number[] = []
    const numPoints = 8 + complexity * 2
    const centerX = 50
    const centerY = 50
    const baseRadius = 30 + seed * 10

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const radius = baseRadius + Math.sin(angle * 3 + seed) * 8 + Math.cos(angle * 5 + seed * 2) * 5
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      points.push(x, y)
    }

    // Create smooth path
    let path = `M ${points[0]},${points[1]}`
    for (let i = 2; i < points.length; i += 2) {
      const x = points[i]
      const y = points[i + 1]
      const nextX = points[(i + 2) % points.length]
      const nextY = points[(i + 3) % points.length]
      
      const cp1x = x + (nextX - x) * 0.3
      const cp1y = y + (nextY - y) * 0.3
      
      path += ` Q ${x},${y} ${cp1x},${cp1y}`
    }
    path += ' Z'

    return path
  }

  useEffect(() => {
    // Generate initial paths
    const initialPaths = Array.from({ length: 3 }, (_, i) => generateBlobPath(i * 0.5, 4))
    setPaths(initialPaths)

    // Morph paths periodically
    const interval = setInterval(() => {
      setPaths((prev) => 
        prev.map((_, i) => generateBlobPath(Math.random() + i * 0.5, 4))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const colorMap = {
    primary: {
      fill: 'rgba(198, 93, 50, 0.15)',      // Burnt orange
      stroke: 'rgba(198, 93, 50, 0.25)',
    },
    secondary: {
      fill: 'rgba(251, 191, 36, 0.15)',     // Turmeric yellow
      stroke: 'rgba(251, 191, 36, 0.25)',
    },
    accent: {
      fill: 'rgba(239, 68, 68, 0.15)',      // Chili red
      stroke: 'rgba(239, 68, 68, 0.25)',
    },
  }

  const colors = colorMap[variant]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {paths.map((path, index) => (
        <motion.svg
          key={index}
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.3,
            ease: 'easeInOut',
          }}
        >
          <motion.path
            d={path}
            fill={colors.fill}
            stroke={colors.stroke}
            strokeWidth="0.5"
            initial={{ d: path }}
            animate={{ d: path }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.3,
              ease: 'easeInOut',
            }}
          />
        </motion.svg>
      ))}
      
      {/* Additional gradient overlay for milky effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  )
}

