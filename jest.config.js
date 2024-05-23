/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',
    '!src/**/*.d.ts',
    '!src/main.ts',
  ],
};