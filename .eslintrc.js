const a = require('@umijs/max/eslint');
// .eslintrc.js
module.exports = {
  // Umi 项目
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
