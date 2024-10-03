import typescriptEslint from '@typescript-eslint/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import security from 'eslint-plugin-security';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import react from 'eslint-plugin-react'; // Add React plugin
import reactHooks from 'eslint-plugin-react-hooks'; // Add React Hooks plugin
import next from '@next/eslint-plugin-next'; // Add Next.js plugin

const commonRules = {
  // General Best Practices
  'no-cond-assign': 'off',
  'no-irregular-whitespace': 'error',
  curly: ['error', 'multi-line'],
  'guard-for-in': 'error',
  'no-caller': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-invalid-this': 'error',
  'no-multi-spaces': 'error',
  'no-multi-str': 'error',
  'no-new-wrappers': 'error',
  'no-throw-literal': 'error',
  'no-with': 'error',
  'prefer-promise-reject-errors': 'error',
  'prefer-const': ['error', { destructuring: 'all' }],
  'no-var': 'error',

  // Formatting Rules
  'array-bracket-spacing': ['error', 'never'],
  'block-spacing': ['error', 'never'],
  'brace-style': 'error',
  camelcase: ['error', { properties: 'never' }],
  'comma-dangle': ['error', 'always-multiline'],
  'comma-spacing': 'error',
  'comma-style': 'error',
  'computed-property-spacing': 'error',
  'eol-last': 'error',
  'func-call-spacing': 'error',
  'key-spacing': 'error',
  'keyword-spacing': 'error',
  'linebreak-style': 'error',
  'max-len': ['error', { code: 140, ignoreTemplateLiterals: true }],
  'no-mixed-spaces-and-tabs': 'error',
  'no-multiple-empty-lines': ['error', { max: 1 }],
  'no-trailing-spaces': 'error',
  'object-curly-spacing': ['error', 'always'],
  'one-var': ['error', { var: 'never', let: 'never', const: 'never' }],
  'padded-blocks': ['error', 'never'],
  'quote-props': ['error', 'consistent'],
  semi: 'error',
  'semi-spacing': 'error',
  'space-before-blocks': 'error',
  'space-before-function-paren': ['error', { asyncArrow: 'always', anonymous: 'never', named: 'never' }],
  'spaced-comment': ['error', 'always'],

  // JSDoc Rules
  'jsdoc/check-alignment': 'error',
  'jsdoc/check-param-names': 'error',
  'jsdoc/check-tag-names': 'error',
  'jsdoc/check-types': 'error',
  'jsdoc/require-jsdoc': [
    'error',
    {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
        ArrowFunctionExpression: false,
        FunctionExpression: false,
      },
    },
  ],

  // React and React Hooks Rules
  'react/jsx-uses-react': 'error', // Ensure React is used in JSX files (for older React versions)
  'react/react-in-jsx-scope': 'off', // Not needed in React 17+ (Next.js supports this)
  'react/prop-types': 'off', // Disable prop-types check for TypeScript
  'react/jsx-uses-vars': 'error', // Prevent React components from being marked as unused

  // Next.js Rules
  '@next/next/no-img-element': 'off', // Disable no-img-element rule for Next.js

  // ES6+ Rules
  'arrow-parens': ['error', 'always'],
  'constructor-super': 'error',
  'generator-star-spacing': ['error', 'after'],
  'no-new-symbol': 'error',
  'no-this-before-super': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'rest-spread-spacing': 'error',
  'yield-star-spacing': ['error', 'after'],

  // Project-Specific
  'no-param-reassign': ['error', { props: false }],
  'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
  'no-underscore-dangle': ['error', { allow: ['_id'] }],
  'no-void': ['error', { allowAsStatement: true }],
  'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  'import/no-default-export': 'off',
  'import/prefer-default-export': 'off',
  'prettier/prettier': ['error'],
};

const sharedPlugins = {
  typescriptEslint,
  security,
  sonarjs,
  jest,
  importPlugin,
  prettier,
  jsdoc,
  react, // React plugin
  reactHooks, // React Hooks plugin
  next, // Next.js plugin
};

const settings = {
  extends: [
    'plugin:jest/recommended',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended', // Recommended rules for React
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:security/recommended-legacy',
    'plugin:@next/next/recommended', // Next.js recommended rules
    'prettier',
  ],
  react: {
    version: 'detect', // Automatically detect the React version
  },
};

export default [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'], // Include TSX files for React
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: '.',
        project: 'tsconfig.json',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: sharedPlugins,
    rules: commonRules,
    ignores: ['**/node_modules/**'],
    settings,
  },
];
