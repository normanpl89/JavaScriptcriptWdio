module.exports = {
  env: {
    es2021: true,
    node: true
  },

  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {},
  plugins: ['wdio', 'prettier', 'import'],
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:wdio/recommended',
    'plugin:import/recommended'
  ]
};
