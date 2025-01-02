import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';
import typeScriptESLintParser from '@typescript-eslint/parser';
import js from '@eslint/js';

const compat = new FlatCompat();

export default [
    {
        ignores: ['**/dist/**']
    },
    js.configs.recommended,
    eslintConfigPrettier,
    ...compat.extends(
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:tailwindcss/recommended',
    ),
    {
        plugins: {
            reactRefresh
        },
        languageOptions: {
            parser: typeScriptESLintParser
        },
        rules: {}
    }
]