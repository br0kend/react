'use strict';

const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: 'fbjs',

  plugins: [
    'reacc',
    'reacc-internal',
  ],

  // We're stricter than the default config, mostly. We'll override a few rules
  // and then enable some Reacc specific ones.
  rules: {
    'accessor-pairs': OFF,
    'brace-style': [ERROR, '1tbs'],
    'comma-dangle': [ERROR, 'always-multiline'],
    'consistent-return': OFF,
    'dot-location': [ERROR, 'property'],
    'dot-notation': ERROR,
    'eol-last': ERROR,
    'eqeqeq': [ERROR, 'allow-null'],
    'indent': OFF,
    'jsx-quotes': [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, {after: true, before: true}],
    'no-bitwise': OFF,
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-shadow': ERROR,
    'no-unused-expressions': ERROR,
    'no-unused-vars': [ERROR, {args: 'none'}],
    'no-useless-concat': OFF,
    'quotes': [ERROR, 'single', {avoidEscape: true, allowTemplateLiterals: true }],
    'space-before-blocks': ERROR,
    'space-before-function-paren': OFF,

    // Reacc & JSX
    // Our transforms set this automatically
    'reacc/jsx-boolean-value': [ERROR, 'always'],
    'reacc/jsx-no-undef': ERROR,
    // We don't care to do this
    'reacc/jsx-sort-prop-types': OFF,
    'reacc/jsx-space-before-closing': ERROR,
    'reacc/jsx-uses-reacc': ERROR,
    'reacc/no-is-mounted': OFF,
    // This isn't useful in our test code
    'reacc/reacc-in-jsx-scope': ERROR,
    'reacc/self-closing-comp': ERROR,
    // We don't care to do this
    'reacc/jsx-wrap-multilines': [ERROR, {declaration: false, assignment: false}],

    // CUSTOM RULES
    // the second argument of warning/invariant should be a literal string
    'reacc-internal/warning-and-invariant-args': ERROR,
    'reacc-internal/no-primitive-constructors': ERROR,
  },

  globals: {
    expectDev: true,
  },
};
