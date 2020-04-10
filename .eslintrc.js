"use strict";

const path = require("path");

module.exports = {
  root: true,
  plugins: [
    "import",
    "jest",
    "prettier",
    "@babel/development",
    "@babel/development-internal",
  ],
  extends: "@babel/internal",
  rules: {
    "prettier/prettier": "error",
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        // should be replaced with @typescript-eslint/no-unused-vars,
        // but there is apparently a bug when importing type namespaces
        "no-unused-vars": "off",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": "error",
        "no-undef": "off",
        "no-redeclare": "off",
      },
    },
    {
      files: [
        "packages/*/src/**/*.js",
        "packages/*/src/**/*.ts",
        "codemods/*/src/**/*.js",
        "codemods/*/src/**/*.ts",
        "eslint/*/src/**/*.js",
        "eslint/*/src/**/*.ts",
      ],
      rules: {
        "@babel/development/no-undefined-identifier": "error",
        "@babel/development/no-deprecated-clone": "error",
        "import/no-extraneous-dependencies": "error",
        "guard-for-in": "error",
      },
    },
    {
      files: [
        "packages/*/test/**/*.js",
        "packages/*/test/**/*.ts",
        "codemods/*/test/**/*.js",
        "codemods/*/test/**/*.ts",
        "eslint/*/test/**/*.js",
        "eslint/*/test/**/*.ts",
        "packages/babel-helper-transform-fixture-test-runner/src/helpers.js",
        "packages/babel-helper-transform-fixture-test-runner/src/helpers.ts",
        "test/**/*.js",
        "test/**/*.ts",
      ],
      env: {
        jest: true,
      },
      extends: "plugin:jest/recommended",
      rules: {
        "jest/expect-expect": "off",
        "jest/no-identical-title": "off",
        "jest/no-standalone-expect": "off",
        "jest/no-test-callback": "off",
        "jest/valid-describe": "off",
      },
    },
    {
      files: [
        "packages/babel-plugin-*/src/index.js",
        "packages/babel-plugin-*/src/index.ts",
      ],
      excludedFiles: [
        "packages/babel-plugin-transform-regenerator/**/*.js",
        "packages/babel-plugin-transform-regenerator/**/*.ts",
      ],
      rules: {
        "@babel/development/plugin-name": "error",
        eqeqeq: ["error", "always", { null: "ignore" }],
      },
    },
    {
      files: ["packages/babel-parser/src/**/*.js"],
      rules: {
        "@babel/development-internal/dry-error-messages": [
          "error",
          {
            errorModule: path.resolve(
              __dirname,
              "packages/babel-parser/src/parser/error.js"
            ),
          },
        ],
      },
    },
  ],
};
