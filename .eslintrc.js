// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],

  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    semi: [2, 'always'],
    curly: 2,
    camelcase: 0,
    'no-trailing-spaces': [
      'error', {
        skipBlankLines: true,
        ignoreComments: false
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  globals: {
    __typecheck: true,
    __type: true
  }
};
