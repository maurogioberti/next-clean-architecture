import nextJest from 'next/jest.js';

// next/jest compiles TypeScript and JSX with SWC and reads next.config.mjs,
// so there is no ts-jest, ts-node or babel configuration to maintain.
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(customJestConfig);
