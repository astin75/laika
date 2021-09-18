module.exports = {
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'simple-import-sort', 'import'],
  rules: {
    'prettier/prettier': 'warn',
    'simple-import-sort/sort': 'warn',
    'react/no-unescaped-entities': 'warn',
    'no-constant-condition': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error', 'info', 'table'] }],
    'import/newline-after-import': 'error',
    'react/prop-types': 'off',

    // React 17 react-jsx
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
