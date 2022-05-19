module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true

  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
  },
  overrides: [
    {
      files: ['src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0
      }
    },
    {
      files: ['src/api/**/*.ts'],
      rules: {
        camelcase: 'off'
      }
    }
  ]
}
