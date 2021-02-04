module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:jest/recommended", "plugin:prettier/recommended", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["import", "jest", "prettier", "eslint-plugin-node"],
  rules: {
    "jest/no-mocks-import": "off",
  },
};
