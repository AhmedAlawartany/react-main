module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'jsx-a11y', '@typescript-eslint'],
  rules: {
    'react/display-name': 'off',
    'dot-notation': 'off',
    'arrow-body-style': 'off',
    'import/no-named-default': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx', '.ts'] }],
    camelcase: [2, { properties: 'never' }],
    'react/function-component-definition': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/prop-types': 'off',
    'no-var': 'error',
    'brace-style': 'error',
    'prefer-template': 'error',
    radix: 'error',
    'space-before-blocks': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
  },
  overrides: [
    {
      files: [
        '*.ts',
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.spec.tsx',
      ],
      rules: {
        'no-undef': 'off',
      },
      env: {
        jest: true,
      },
    },
  ],
};
