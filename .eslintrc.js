module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    strict: 0,
    'no-console': 0,
    'arrow-parens': 0,
    'quote-props': 0,
    'comma-dangle': 0,
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
