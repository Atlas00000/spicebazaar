/**
 * Tree-Shaking Utilities
 * Helpers for ensuring proper tree-shaking
 */

/**
 * Named export helper for better tree-shaking
 */
export const createNamedExport = <T>(name: string, value: T) => {
  return { [name]: value }
}

/**
 * Check if module supports tree-shaking
 */
export const supportsTreeShaking = (modulePath: string): boolean => {
  // ESM modules support tree-shaking
  const esmModules = [
    'framer-motion',
    'lucide-react',
    '@radix-ui',
  ]
  
  return esmModules.some(module => modulePath.includes(module))
}

/**
 * Get tree-shakeable import pattern
 */
export const getTreeShakeableImport = (
  module: string,
  exports: string[]
): string => {
  // Use named imports for better tree-shaking
  return `import { ${exports.join(', ')} } from '${module}'`
}

/**
 * Avoid default imports when possible
 */
export const preferNamedImports = (module: string): boolean => {
  // These modules should use named imports
  const namedImportModules = [
    'lucide-react',
    'framer-motion',
    '@radix-ui',
  ]
  
  return namedImportModules.some(m => module.includes(m))
}

