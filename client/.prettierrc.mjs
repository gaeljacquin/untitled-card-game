const config = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.mdx',
      options: {
        printWidth: 70,
      },
    },
  ],
};

export default config;
