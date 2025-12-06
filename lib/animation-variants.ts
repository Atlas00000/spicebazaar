/**
 * Animation Variants Library
 * Reusable Framer Motion animation variants
 */

import type { Variants } from 'framer-motion'
import { springPresets, tweenPresets, staggerDelays } from './animation-config'

/**
 * Fade animations
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: tweenPresets.normal,
  },
  exit: { 
    opacity: 0,
    transition: tweenPresets.fast,
  },
}

/**
 * Fade + Scale animations
 */
export const fadeScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springPresets.snappy,
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: tweenPresets.fast,
  },
}

/**
 * Slide up animations
 */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springPresets.snappy,
  },
  exit: { 
    opacity: 0, 
    y: -40,
    transition: tweenPresets.normal,
  },
}

/**
 * Slide down animations
 */
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springPresets.snappy,
  },
  exit: { 
    opacity: 0, 
    y: 40,
    transition: tweenPresets.normal,
  },
}

/**
 * Slide from left animations
 */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springPresets.snappy,
  },
  exit: { 
    opacity: 0, 
    x: 40,
    transition: tweenPresets.normal,
  },
}

/**
 * Slide from right animations
 */
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springPresets.snappy,
  },
  exit: { 
    opacity: 0, 
    x: -40,
    transition: tweenPresets.normal,
  },
}

/**
 * Lift animation (for cards)
 */
export const liftVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: springPresets.snappy,
  },
  tap: { 
    scale: 0.98,
    transition: springPresets.stiff,
  },
}

/**
 * Strong lift animation
 */
export const liftStrongVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -12, 
    scale: 1.05,
    transition: springPresets.bouncy,
  },
  tap: { 
    scale: 0.95,
    transition: springPresets.stiff,
  },
}

/**
 * Rotate animations
 */
export const rotateVariants: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: springPresets.bouncy,
  },
  exit: { 
    opacity: 0, 
    rotate: 180,
    transition: tweenPresets.normal,
  },
}

/**
 * Flip animation
 */
export const flipVariants: Variants = {
  front: { 
    rotateY: 0,
    transition: springPresets.snappy,
  },
  back: { 
    rotateY: 180,
    transition: springPresets.snappy,
  },
}

/**
 * Expand animation (for modals/dropdowns)
 */
export const expandVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transformOrigin: 'top center',
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springPresets.bouncy,
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: tweenPresets.fast,
  },
}

/**
 * Stagger container
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelays.normal,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: staggerDelays.tight,
      staggerDirection: -1,
    },
  },
}

/**
 * Stagger item (use with staggerContainer)
 */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springPresets.snappy,
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: tweenPresets.fast,
  },
}

/**
 * Pulse animation (for loading/attention)
 */
export const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * Shake animation (for errors)
 */
export const shakeVariants: Variants = {
  initial: { x: 0 },
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

/**
 * Bounce animation
 */
export const bounceVariants: Variants = {
  initial: { y: 0 },
  bounce: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
}

/**
 * Zoom in animation
 */
export const zoomInVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springPresets.bouncy,
  },
  exit: { 
    opacity: 0, 
    scale: 0,
    transition: tweenPresets.fast,
  },
}

/**
 * Blur fade animation
 */
export const blurFadeVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: tweenPresets.slow,
  },
  exit: { 
    opacity: 0, 
    filter: 'blur(10px)',
    transition: tweenPresets.fast,
  },
}

/**
 * Modal backdrop animation
 */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: tweenPresets.normal,
  },
  exit: { 
    opacity: 0,
    transition: tweenPresets.fast,
  },
}

/**
 * Drawer slide animation
 */
export const drawerVariants = {
  left: {
    hidden: { x: '-100%' },
    visible: { 
      x: 0,
      transition: springPresets.snappy,
    },
    exit: { 
      x: '-100%',
      transition: tweenPresets.normal,
    },
  },
  right: {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: springPresets.snappy,
    },
    exit: { 
      x: '100%',
      transition: tweenPresets.normal,
    },
  },
  top: {
    hidden: { y: '-100%' },
    visible: { 
      y: 0,
      transition: springPresets.snappy,
    },
    exit: { 
      y: '-100%',
      transition: tweenPresets.normal,
    },
  },
  bottom: {
    hidden: { y: '100%' },
    visible: { 
      y: 0,
      transition: springPresets.snappy,
    },
    exit: { 
      y: '100%',
      transition: tweenPresets.normal,
    },
  },
}

/**
 * Progress bar animation
 */
export const progressBarVariants: Variants = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: (progress: number) => ({
    scaleX: progress,
    transition: tweenPresets.normal,
  }),
}

/**
 * Notification toast animation
 */
export const toastVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: springPresets.bouncy,
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: tweenPresets.fast,
  },
}

/**
 * Export all variants
 */
export const variants = {
  fade: fadeVariants,
  fadeScale: fadeScaleVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  lift: liftVariants,
  liftStrong: liftStrongVariants,
  rotate: rotateVariants,
  flip: flipVariants,
  expand: expandVariants,
  staggerContainer: staggerContainerVariants,
  staggerItem: staggerItemVariants,
  pulse: pulseVariants,
  shake: shakeVariants,
  bounce: bounceVariants,
  zoomIn: zoomInVariants,
  blurFade: blurFadeVariants,
  backdrop: backdropVariants,
  drawer: drawerVariants,
  progressBar: progressBarVariants,
  toast: toastVariants,
} as const

