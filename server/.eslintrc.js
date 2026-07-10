// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:security/recommended',
    'plugin:node/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended', // This must be last
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['security', 'node', 'import', 'jest'],
  rules: {
    // General best practices
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    
    // Security rules
    'security/detect-object-injection': 'off', // Can be too strict, enable if needed
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-possible-timing-attacks': 'warn',
    'security/detect-pseudoRandomBytes': 'warn',
    
    // Import rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'warn',
    'import/no-self-import': 'error',
    'import/no-cycle': 'warn',
    
    // Node.js rules
    'node/no-unsupported-features/es-syntax': 'off', // We use ES modules
    'node/no-missing-import': 'off', // Handled by import plugin
    'node/exports-style': ['error', 'module.exports'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    
    // Jest rules
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js', 'tests/**/*.js'],
      rules: {
        'security/detect-non-literal-fs-filename': 'off',
        'no-unused-expressions': 'off',
        'node/no-unpublished-require': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['scripts/**/*.js', 'generators/**/*.js', 'plopfile.js'],
      rules: {
        'no-console': 'off',
        'security/detect-child-process': 'off',
      },
    },
  ],
};