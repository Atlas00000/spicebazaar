/**
 * FluidNewsletterCard Component
 * Stunning newsletter card with interactive elements
 */

"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Send, CheckCircle, Sparkles, TrendingUp, Gift } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedCounter } from '@/components/effects/AnimatedCounter'
import { springPresets } from '@/lib/animation-config'

interface FluidNewsletterCardProps {
  onSubscribe?: (email: string) => void
  subscriberCount?: number
  className?: string
}

/**
 * Fluid newsletter card with rich visuals
 */
export const FluidNewsletterCard = ({
  onSubscribe,
  subscriberCount = 5247,
  className,
}: FluidNewsletterCardProps) => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onSubscribe?.(email)
      setIsSubscribed(true)
      setTimeout(() => {
        setEmail('')
        setIsSubscribed(false)
      }, 3000)
    }
  }

  const perks = [
    { icon: <Sparkles className="w-5 h-5" />, text: 'Exclusive recipes weekly', color: '#fbbf24' },
    { icon: <TrendingUp className="w-5 h-5" />, text: 'Spice pairing tips', color: '#c65d32' },
    { icon: <Gift className="w-5 h-5" />, text: 'Early access to sales', color: '#ef4444' },
  ]

  return (
    <motion.div
      className={cn('relative', className)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 100%)',
        backdropFilter: 'blur(28px) saturate(200%)',
        WebkitBackdropFilter: 'blur(28px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 12px 48px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.3)',
        borderRadius: '3rem',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.01,
        boxShadow: '0 20px 70px rgba(0,0,0,0.25), inset 0 3px 0 rgba(255,255,255,0.4)',
      }}
    >
      {/* Multi-layer glossy overlays */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none rounded-[3rem]"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none rounded-[3rem]"
        style={{
          background: 'radial-gradient(circle at 70% 80%, rgba(255,255,255,0.25) 0%, transparent 50%)',
        }}
      />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #fbbf2460 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [-20, 20, -20],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #c65d3250 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [20, -20, 20],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-12">
        {/* Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8"
          style={{
            background: 'linear-gradient(135deg, #fbbf2440 0%, #c65d3240 100%)',
            boxShadow: '0 8px 32px #fbbf2440',
          }}
          animate={{
            rotate: isHovered ? [0, 5, -5, 0] : 0,
            scale: isHovered ? [1, 1.08, 1] : 1,
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        >
          <Mail className="w-12 h-12 text-secondary" />
        </motion.div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
          Stay Spice-Inspired
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl">
          Get exclusive recipes, spice tips, and cultural stories delivered to your inbox
        </p>

        {/* Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                backgroundColor: 'rgba(255,255,255,0.15)',
              }}
            >
              <motion.div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${perk.color}30`,
                  boxShadow: `0 2px 12px ${perk.color}30`,
                }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <div style={{ color: perk.color }}>
                  {perk.icon}
                </div>
              </motion.div>
              <span className="text-sm font-medium text-foreground">
                {perk.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Success State */}
        {isSubscribed ? (
          <motion.div
            className="p-6 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, #10b98130 0%, #05966930 100%)',
              border: '1px solid #10b98140',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springPresets.bouncy}
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Welcome to the Spice Club! 🎉
            </h3>
            <p className="text-muted-foreground">
              Check your inbox for a confirmation email
            </p>
          </motion.div>
        ) : (
          /* Subscription Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <motion.div
              className="relative"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                border: isFocused ? '2px solid #c65d32' : '2px solid rgba(255,255,255,0.25)',
                boxShadow: isFocused
                  ? '0 8px 32px rgba(198, 93, 50, 0.25), inset 0 2px 8px rgba(0,0,0,0.1)'
                  : 'inset 0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: '1.5rem',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                boxShadow: '0 4px 20px rgba(198, 93, 50, 0.15), inset 0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <div
                className="absolute inset-0 opacity-40 pointer-events-none rounded-3xl"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)',
                }}
              />
              
              <div className="relative flex items-center gap-3 p-5">
                <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground"
                />
                <motion.button
                  type="submit"
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #c65d32 0%, #f97316 100%)',
                    boxShadow: '0 4px 20px #c65d3250',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 6px 28px #c65d3260',
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!email}
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </motion.div>

            {/* Submit Button (Alternative) */}
            <AnimatedButton
              type="submit"
              variant="gradient"
              size="xl"
              className="w-full md:w-auto md:px-12"
              magnetic
              glow
              ripple
              disabled={!email}
            >
              <Send className="w-5 h-5 mr-2" />
              Subscribe Now
            </AnimatedButton>
          </form>
        )}

        {/* Subscriber count */}
        <motion.p
          className="text-sm text-muted-foreground mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Join{' '}
          <span className="text-primary font-bold">
            <AnimatedCounter value={subscriberCount} separator="," />+
          </span>{' '}
          spice enthusiasts • Unsubscribe anytime
        </motion.p>
      </div>

      {/* Floating particles */}
      {isHovered &&
        [...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const colors = ['#c65d32', '#fbbf24', '#ef4444']
          const color = colors[i % colors.length]

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background: color,
                boxShadow: `0 0 12px ${color}`,
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * 180,
                y: Math.sin(angle) * 180,
                opacity: [0, 0.9, 0],
                scale: [0, 1.8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeOut',
              }}
            />
          )
        })}
    </motion.div>
  )
}

