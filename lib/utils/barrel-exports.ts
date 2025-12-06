/**
 * Barrel Export Optimizer
 * Utilities for optimizing barrel exports for tree-shaking
 */

/**
 * Create optimized barrel export
 * Use named exports instead of export * for better tree-shaking
 */
export const createOptimizedExport = <T extends Record<string, any>>(
  exports: T
): T => {
  // Return the exports object as-is
  // The key is to use named exports in the actual files
  return exports
}

/**
 * Check if barrel export is optimized
 */
export const isOptimizedBarrel = (content: string): boolean => {
  // Check if file uses named exports instead of export *
  const hasExportStar = /export\s+\*\s+from/.test(content)
  const hasNamedExports = /export\s+\{[^}]+\}\s+from/.test(content)
  
  // Optimized if it has named exports and no export *
  return hasNamedExports && !hasExportStar
}

/**
 * Get export recommendations
 */
export const getExportRecommendations = (filePath: string): string[] => {
  const recommendations: string[] = []
  
  // Check if file is a barrel export
  if (filePath.includes('index.ts') || filePath.includes('index.tsx')) {
    recommendations.push('Use named exports instead of export *')
    recommendations.push('Limit exports to what is actually used')
    recommendations.push('Consider splitting large barrel files')
  }
  
  return recommendations
}

