import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Note: We do NOT put transformIgnorePatterns here because 
  // Next.js will just overwrite it.
}

// Export an async function to manually override the config
export default async function jestConfig() {
  // 1. Generate Next.js's default config
  const nextJestConfig = await createJestConfig(config)()

  // 2. Force overwrite the transformIgnorePatterns
  // This ensures your specific packages are NOT ignored by Babel
  nextJestConfig.transformIgnorePatterns = [
    'node_modules/(?!(msw|@mswjs|until-async)/)'
  ]

  return nextJestConfig
}