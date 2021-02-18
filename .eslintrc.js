module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    wx: true,
    weex: true,
    uni: true,
    plus: true,
    getApp: true,
    getCurrentPages: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier', 'prettier/vue'],
  rules: {
    //  要求使用 === 和 !== ，除了与 null 字面量进行比较时，总是强制使用绝对相等
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // 如果一个变量不会被重新赋值，最好使用const进行声明
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
}
