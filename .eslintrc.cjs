module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  extends: [
    'plugin:@next/next/recommended', // Specific to Next.js projects
    'plugin:jest/recommended', // Jest recommendations
    'plugin:@typescript-eslint/recommended', // TypeScript recommendations
    'plugin:prettier/recommended', // Prettier integration
  ],
  plugins: [
    'testing-library', // For testing-library linting
    'jest', // For Jest linting
    '@typescript-eslint', // TypeScript linting
  ],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  root: true,
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.eslintrc.js'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'import/extensions': 'off', // Disable requiring extensions
    '@typescript-eslint/no-shadow': 'off', // Allow shadowing in TS
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
