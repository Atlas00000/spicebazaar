/**
 * Image Utility Functions
 * Helpers for image optimization
 */

/**
 * Generate responsive sizes string for Next.js Image
 */
export const getResponsiveSizes = (
  mobile: number = 100,
  tablet: number = 50,
  desktop: number = 33
): string => {
  return `(max-width: 768px) ${mobile}vw, (max-width: 1200px) ${tablet}vw, ${desktop}vw`
}

/**
 * Get optimal image quality based on device
 */
export const getOptimalQuality = (isMobile: boolean = false): number => {
  // Lower quality on mobile for faster loading
  return isMobile ? 75 : 85
}

/**
 * Check if image should be prioritized (above the fold)
 */
export const shouldPrioritizeImage = (
  isAboveFold: boolean = false,
  isHero: boolean = false
): boolean => {
  return isAboveFold || isHero
}

/**
 * Generate blur data URL for placeholder
 */
export const generateBlurDataURL = (
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * Get image dimensions from aspect ratio
 */
export const getImageDimensions = (
  aspectRatio: string,
  baseWidth: number = 1200
): { width: number; height: number } => {
  const [w, h] = aspectRatio.split('/').map(Number)
  const height = Math.round((baseWidth * h) / w)
  return { width: baseWidth, height }
}

/**
 * Common aspect ratios
 */
export const ASPECT_RATIOS = {
  square: '1/1',
  landscape: '16/9',
  portrait: '9/16',
  card: '4/3',
  wide: '21/9',
} as const

/**
 * Get optimized image src for different sizes
 */
export const getOptimizedImageSrc = (
  src: string,
  width?: number
): string => {
  // If using a CDN or image optimization service, add size params here
  // For now, return original src
  return src
}

