module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/no-unknown-property': [
      2,
      {
        ignore: [
          'jsx',
          'global',
        ],
      },
    ],
  },
}
