import dotenv from 'dotenv'

dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/jest/__mocks__/styleMock.ts',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
