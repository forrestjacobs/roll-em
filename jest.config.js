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
  moduleFileExtensions: ["ts", "svelte", "pegjs", "js", "json", "css"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.css$": "./css-transformer.js",
    "^.+\\.pegjs$": "./pegjs-transformer.js",
    "^.+\\.svelte$": ["svelte-jester", { "preprocess": true }],
    "^.+\\.ts$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!codemirror/)",
  ],
};
