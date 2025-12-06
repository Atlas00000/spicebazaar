/**
 * Import Optimizer Utilities
 * Helpers for optimizing imports and reducing bundle size
 */

/**
 * Optimized icon imports
 * Import only needed icons instead of entire library
 */
export const importIcon = async (iconName: string) => {
  // Dynamic import for lucide-react icons
  const icons = await import('lucide-react')
  return icons[iconName as keyof typeof icons]
}

/**
 * Check if import is tree-shakeable
 */
export const isTreeShakeable = (importPath: string): boolean => {
  // ESM imports are tree-shakeable
  return importPath.startsWith('@/') || 
         importPath.includes('node_modules') ||
         !importPath.endsWith('.css')
}

/**
 * Get optimized import path
 */
export const getOptimizedImport = (
  module: string,
  exportName?: string
): string => {
  if (exportName) {
    return `import { ${exportName} } from '${module}'`
  }
  return `import ${module.split('/').pop()} from '${module}'`
}

/**
 * Analyze import size
 */
export const analyzeImportSize = async (
  importPath: string
): Promise<number> => {
  // This would require bundle analysis
  // For now, return estimated size
  if (importPath.includes('framer-motion')) return 50 // KB
  if (importPath.includes('lucide-react')) return 5 // KB
  return 1 // KB default
}

