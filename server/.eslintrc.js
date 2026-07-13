module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'camelcase': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    'comma-dangle': ['error', 'never'],
    'no-var': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'space-before-function-paren': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 'error'
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['**/models/**/*.js', '**/mappers/**/*.js', '**/dto/**/*.js', '**/queries/**/*.js'],
      rules: {
        'camelcase': 'off'
      }
    },
    {
      files: ['scripts/**/*.js'],
      rules: {
        'no-console': 'off'
      }
    }
  ],
  globals: {
    process: 'readonly',
    console: 'readonly',
    module: 'readonly',
    require: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly'
  }
};