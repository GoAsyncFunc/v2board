// ESLint flat config for the recovered admin sources.
// The bundle parity rules live in tests; ESLint guards code hygiene only.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: ['dist/**', 'public/**', 'node_modules/**'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: { react, 'react-hooks': reactHooks },
        languageOptions: {
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        settings: { react: { version: '16.14' } },
        rules: {
            // The TypeScript compiler already reports undefined globals, and the
            // bundle-era code deliberately extends generic interfaces with empty
            // bodies (dva tools contracts), so both base rules are disabled here.
            'no-undef': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react/jsx-key': 'error',
            'react/no-unknown-property': ['error', { ignore: ['for'] }],
            'react/no-deprecated': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrors: 'none',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            // dva effects are generators even when they put nothing (e.g. logout).
            'require-yield': 'off',
            'no-console': ['error', { allow: ['warn', 'error'] }],
        },
    },
    {
        files: ['scripts/**/*.mjs', 'tests/**/*.mjs'],
        languageOptions: {
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                URL: 'readonly',
                fetch: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                structuredClone: 'readonly',
                window: 'readonly',
                document: 'readonly',
                Headers: 'readonly',
                AbortSignal: 'readonly',
                DownloadTest: 'readonly',
            },
        },
        rules: { 'no-console': 'off' },
    },
    prettier,
);
