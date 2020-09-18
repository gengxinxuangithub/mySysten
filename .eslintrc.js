module.exports = {
  root: true,

  env: {
    node: true,
    jest: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:vue/essential', '@vue/prettier'],

  rules: {
    'prettier/prettier': 'error',
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    'no-irregular-whitespace': 'off',
    'dot-location': [2, 'property'],
    'comma-spacing': [1],
    'space-before-blocks': [2, 'always'],
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    'array-bracket-spacing': [2, 'never'],
    quotes: [0, 'double'],
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'vue/max-attributes-per-line': 0,
    'vue/require-prop-types': 2,
    'no-var': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-trailing-spaces': 1,
    'no-unexpected-multiline': 2,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'radix': 2, //parseInt必须指定第二个参数
    'eqeqeq': 2, // 必须使用严格类型 === or !==
    'max-params': ["error", 3], // 函数最多传入三个参数, 超出建议拆分or采用对象的形式传参
    'vue/html-indent': [0, 'tab'],
    'vue/html-self-closing': [0],
    'vue/multiline-html-element-content-newline': [0],
    'vue/singleline-html-element-content-newline': [0],
    'vue/html-closing-bracket-newline': [0],
    'vue/no-v-html': [0],
    // vue props名应该总是驼峰命名
    "vue/prop-name-casing": [2, "camelCase"],
    // 组件名应该总是PascalCase, 但是在DOM模板中总是 kebab-case的
    "vue/component-name-in-template-casing": ["error", "kebab-case", {
      "registeredComponentsOnly": false,
      "ignores": []
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
