// .eslintrc.js
module.exports = {
  // Umi 项目
  extends: ['prettier', 'plugin:react/recommended'],
  parser: require.resolve('@babel/eslint-parser'),
  plugins: ['prettier', 'react', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: [require.resolve('@umijs/babel-preset-umi')],
    },
    requireConfigFile: false,
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: require.resolve('@typescript-eslint/parser'),
      extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
  },
};
