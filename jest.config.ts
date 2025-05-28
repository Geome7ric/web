import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // if you have a setup file
  moduleNameMapper: {
     // Handle CSS imports (if any)
     '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
     // Handle module aliases (if you have them in tsconfig.json)
     '^@/components/(.*)$': '<rootDir>/src/components/$1',
     '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
     '^@/app/(.*)$': '<rootDir>/src/app/$1',
     '^@/messages/(.*)$': '<rootDir>/messages/$1',
     '^@/i18n/(.*)$': '<rootDir>/src/i18n/$1',
     '^@/store/(.*)$': '<rootDir>/src/store/$1',
     '^@/types/(.*)$': '<rootDir>/src/types/$1',
     '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  preset: 'ts-jest',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
