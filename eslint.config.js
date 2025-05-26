import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
  },
  {
    files: ['**/*.test.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
]);
