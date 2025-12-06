/**
 * Bundle Analyzer Script
 * Analyzes bundle size and identifies optimization opportunities
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔍 Analyzing bundle size...\n')

try {
  // Run Next.js build with analyze flag
  execSync('ANALYZE=true next build', { stdio: 'inherit' })
  console.log('\n✅ Bundle analysis complete!')
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message)
  process.exit(1)
}

