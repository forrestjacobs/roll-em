module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.ts", "!**/src/**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
    },
  },
};
