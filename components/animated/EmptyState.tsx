/**
 * EmptyState Component
 * Beautiful empty states with illustrations and actions
 */

"use client"

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springPresets, staggerDelays } from '@/lib/animation-config'
import { AnimatedButton } from './AnimatedButton'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  illustration?: 'search' | 'cart' | 'wishlist' | 'error' | 'success'
  className?: string
}

/**
 * Simple animated icons for empty states
 */
const illustrations = {
  search: (
    <motion.svg
      className="w-24 h-24 text-muted-foreground/30"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={springPresets.bouncy}
    >
      <circle cx="11" cy="11" r="8" />
      <motion.path
        d="m21 21-4.35-4.35"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
    </motion.svg>
  ),
  cart: (
    <motion.svg
      className="w-24 h-24 text-muted-foreground/30"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      initial={{ scale: 0, y: -20 }}
      animate={{ scale: 1, y: 0 }}
      transition={springPresets.bouncy}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <motion.path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
    </motion.svg>
  ),
  wishlist: (
    <motion.svg
      className="w-24 h-24 text-muted-foreground/30"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={springPresets.bouncy}
    >
      <motion.path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        initial={{ pathLength: 0, fill: 'transparent' }}
        animate={{ pathLength: 1, fill: 'currentColor' }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
    </motion.svg>
  ),
  error: (
    <motion.svg
      className="w-24 h-24 text-destructive/30"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={springPresets.bouncy}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.line
        x1="15"
        y1="9"
        x2="9"
        y2="15"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      />
      <motion.line
        x1="9"
        y1="9"
        x2="15"
        y2="15"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      />
    </motion.svg>
  ),
  success: (
    <motion.svg
      className="w-24 h-24 text-green-600/30"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={springPresets.bouncy}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="M9 12l2 2 4-4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
    </motion.svg>
  ),
}

/**
 * EmptyState component
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  illustration,
  className,
}: EmptyStateProps) => {
  return (
    <motion.div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-4',
        className
      )}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelays.normal,
          },
        },
      }}
    >
      {/* Icon or Illustration */}
      <motion.div
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={springPresets.bouncy}
      >
        {icon || (illustration && illustrations[illustration])}
      </motion.div>

      {/* Title */}
      <motion.h3
        className="mt-6 text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={springPresets.snappy}
      >
        {title}
      </motion.h3>

      {/* Description */}
      {description && (
        <motion.p
          className="mt-3 text-base text-muted-foreground max-w-md"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={springPresets.snappy}
        >
          {description}
        </motion.p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-3"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={springPresets.snappy}
        >
          {action && (
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={action.onClick}
              magnetic
              glow
            >
              {action.label}
            </AnimatedButton>
          )}
          {secondaryAction && (
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </AnimatedButton>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

/**
 * Preset empty states
 */

export const EmptySearchResults = ({ onReset }: { onReset: () => void }) => (
  <EmptyState
    illustration="search"
    title="No results found"
    description="We couldn't find any matches for your search. Try adjusting your filters or search terms."
    action={{
      label: 'Clear search',
      onClick: onReset,
    }}
  />
)

export const EmptyCart = ({ onShop }: { onShop: () => void }) => (
  <EmptyState
    illustration="cart"
    title="Your cart is empty"
    description="Looks like you haven't added anything to your cart yet. Explore our spice collection!"
    action={{
      label: 'Start shopping',
      onClick: onShop,
    }}
  />
)

export const EmptyWishlist = ({ onBrowse }: { onBrowse: () => void }) => (
  <EmptyState
    illustration="wishlist"
    title="Your wishlist is empty"
    description="Save your favorite spices and recipes to your wishlist for easy access later."
    action={{
      label: 'Browse spices',
      onClick: onBrowse,
    }}
  />
)

export const ErrorState = ({ 
  onRetry, 
  message = 'Something went wrong' 
}: { 
  onRetry: () => void
  message?: string
}) => (
  <EmptyState
    illustration="error"
    title="Oops! Something went wrong"
    description={message}
    action={{
      label: 'Try again',
      onClick: onRetry,
    }}
  />
)

export const SuccessState = ({ 
  title = 'Success!',
  description,
  onContinue,
}: { 
  title?: string
  description?: string
  onContinue?: () => void
}) => (
  <EmptyState
    illustration="success"
    title={title}
    description={description}
    action={onContinue ? {
      label: 'Continue',
      onClick: onContinue,
    } : undefined}
  />
)

