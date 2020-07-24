module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.pegjs",
    "**/src/**/*.svelte",
    "**/src/**/*.ts",
    "!**/src/**/*.d.ts",
    "!**/src/**/Mock*.svelte",
  ],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "svelte", "pegjs", "js", "json"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.pegjs$": "./pegjs-transformer.js",
    "^.+\\.svelte$": ["svelte-jester", { "preprocess": true }],
    "^.+\\.ts$": "ts-jest",
  },
};
