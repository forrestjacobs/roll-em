module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.ts",
    "!**/src/**/*.d.ts",
    "**/src/**/*.pegjs",
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
    },
  },
  transform: {
    "^.+\\.pegjs$": "./pegjs-transformer.js",
  },
};
