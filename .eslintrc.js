module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'next/core-web-vitals'
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off', // suppress errors for missing 'import React' in files
    'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}], // allow jsx syntax in js files (for next.js project)
    'no-unused-vars': 'error',
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        bracketSpacing: false,
        arrowParens: 'avoid'
      }
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {'ts-ignore': 'allow-with-description'}
    ]
  }
}
