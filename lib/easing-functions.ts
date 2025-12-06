/**
 * Custom Easing Functions
 * Mathematical easing functions for advanced animations
 */

/**
 * Linear easing (no acceleration)
 */
export const linear = (t: number) => t

/**
 * Quadratic easing
 */
export const easeInQuad = (t: number) => t * t
export const easeOutQuad = (t: number) => t * (2 - t)
export const easeInOutQuad = (t: number) => 
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

/**
 * Cubic easing
 */
export const easeInCubic = (t: number) => t * t * t
export const easeOutCubic = (t: number) => (--t) * t * t + 1
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

/**
 * Quartic easing
 */
export const easeInQuart = (t: number) => t * t * t * t
export const easeOutQuart = (t: number) => 1 - (--t) * t * t * t
export const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t

/**
 * Quintic easing
 */
export const easeInQuint = (t: number) => t * t * t * t * t
export const easeOutQuint = (t: number) => 1 + (--t) * t * t * t * t
export const easeInOutQuint = (t: number) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t

/**
 * Sine easing
 */
export const easeInSine = (t: number) => 1 - Math.cos((t * Math.PI) / 2)
export const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2)
export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

/**
 * Exponential easing
 */
export const easeInExpo = (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10))
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
export const easeInOutExpo = (t: number) => {
  if (t === 0) return 0
  if (t === 1) return 1
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2
}

/**
 * Circular easing
 */
export const easeInCirc = (t: number) => 1 - Math.sqrt(1 - t * t)
export const easeOutCirc = (t: number) => Math.sqrt(1 - (--t) * t)
export const easeInOutCirc = (t: number) =>
  t < 0.5
    ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
    : (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2

/**
 * Back easing (overshoot)
 */
const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1

export const easeInBack = (t: number) => c3 * t * t * t - c1 * t * t
export const easeOutBack = (t: number) => 
  1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
export const easeInOutBack = (t: number) =>
  t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2

/**
 * Elastic easing (spring-like)
 */
const c4 = (2 * Math.PI) / 3
const c5 = (2 * Math.PI) / 4.5

export const easeInElastic = (t: number) => {
  if (t === 0) return 0
  if (t === 1) return 1
  return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
}

export const easeOutElastic = (t: number) => {
  if (t === 0) return 0
  if (t === 1) return 1
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

export const easeInOutElastic = (t: number) => {
  if (t === 0) return 0
  if (t === 1) return 1
  return t < 0.5
    ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
}

/**
 * Bounce easing
 */
const n1 = 7.5625
const d1 = 2.75

export const easeOutBounce = (t: number) => {
  if (t < 1 / d1) {
    return n1 * t * t
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375
  }
}

export const easeInBounce = (t: number) => 1 - easeOutBounce(1 - t)

export const easeInOutBounce = (t: number) =>
  t < 0.5
    ? (1 - easeOutBounce(1 - 2 * t)) / 2
    : (1 + easeOutBounce(2 * t - 1)) / 2

/**
 * Custom easing: Smooth step (smoother than ease-in-out)
 */
export const smoothStep = (t: number) => t * t * (3 - 2 * t)
export const smootherStep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)

/**
 * Custom easing: Anticipate (slight backwards motion before forward)
 */
export const anticipate = (t: number) => {
  const c = 1.70158
  return t * t * ((c + 1) * t - c)
}

/**
 * Custom easing: Overshoot (goes past 1.0 then settles)
 */
export const overshoot = (t: number) => {
  const c = 1.70158
  return 1 + (--t) * t * ((c + 1) * t + c)
}

/**
 * Lerp (Linear interpolation)
 */
export const lerp = (start: number, end: number, t: number) => 
  start + (end - start) * t

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/**
 * Map value from one range to another
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  const t = (value - inMin) / (inMax - inMin)
  return lerp(outMin, outMax, t)
}

/**
 * Smooth damp (used for smooth camera following)
 */
export const smoothDamp = (
  current: number,
  target: number,
  currentVelocity: number,
  smoothTime: number,
  deltaTime: number,
  maxSpeed: number = Infinity
): { value: number; velocity: number } => {
  // Based on Game Programming Gems 4 Chapter 1.10
  smoothTime = Math.max(0.0001, smoothTime)
  const omega = 2 / smoothTime
  const x = omega * deltaTime
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  
  let change = current - target
  const originalTo = target
  
  // Clamp maximum speed
  const maxChange = maxSpeed * smoothTime
  change = clamp(change, -maxChange, maxChange)
  target = current - change
  
  const temp = (currentVelocity + omega * change) * deltaTime
  let newVelocity = (currentVelocity - omega * temp) * exp
  let output = target + (change + temp) * exp
  
  // Prevent overshooting
  if (originalTo - current > 0.0 === output > originalTo) {
    output = originalTo
    newVelocity = (output - originalTo) / deltaTime
  }
  
  return { value: output, velocity: newVelocity }
}

/**
 * Spring interpolation
 */
export const spring = (
  current: number,
  target: number,
  velocity: number,
  stiffness: number = 170,
  damping: number = 26,
  mass: number = 1,
  deltaTime: number = 1 / 60
): { value: number; velocity: number } => {
  const displacement = current - target
  const springForce = -stiffness * displacement
  const dampingForce = -damping * velocity
  const acceleration = (springForce + dampingForce) / mass
  
  const newVelocity = velocity + acceleration * deltaTime
  const newValue = current + newVelocity * deltaTime
  
  return { value: newValue, velocity: newVelocity }
}

/**
 * Export all easing functions as an object
 */
export const easing = {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInBack,
  easeOutBack,
  easeInOutBack,
  easeInElastic,
  easeOutElastic,
  easeInOutElastic,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce,
  smoothStep,
  smootherStep,
  anticipate,
  overshoot,
} as const

/**
 * Utility functions
 */
export const utils = {
  lerp,
  clamp,
  mapRange,
  smoothDamp,
  spring,
} as const

// Type exports
export type EasingFunction = (t: number) => number
export type EasingName = keyof typeof easing

