/**
 * Check Unused Dependencies
 * Identifies potentially unused dependencies
 */

const fs = require('fs')
const path = require('path')

const packageJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
)

const dependencies = Object.keys(packageJson.dependencies || {})
const devDependencies = Object.keys(packageJson.devDependencies || {})

// Known unused dependencies for Next.js projects
const potentiallyUnused = [
  '@remix-run/react',
  '@sveltejs/kit',
  'svelte',
  'vue',
  'vue-router',
]

console.log('🔍 Checking for unused dependencies...\n')

const foundUnused = dependencies.filter(dep => 
  potentiallyUnused.includes(dep)
)

if (foundUnused.length > 0) {
  console.log('⚠️  Potentially unused dependencies found:')
  foundUnused.forEach(dep => {
    console.log(`   - ${dep}`)
  })
  console.log('\n💡 Consider removing these if not needed:')
  console.log(`   pnpm remove ${foundUnused.join(' ')}`)
} else {
  console.log('✅ No obviously unused dependencies found')
}

