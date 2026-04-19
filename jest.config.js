module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.spec.[jt]s?(x)",
    "**/tests/**/*.spec.[jt]s?(x)",
  ],
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.vue$": "@vue/vue2-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-transform-stub",
    "\\.(css|less|scss|sass)$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["/node_modules/(?!(vue|vue-router|vuex)/)"],
  collectCoverageFrom: [
    "src/components/**/*.vue",
    "src/views/**/*.vue",
    "!src/**/*.spec.ts",
    "!src/main.ts",
    "!src/router/index.ts",
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: {
        jsx: 'preserve',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        target: 'es2015'
      }
    }
  }
};