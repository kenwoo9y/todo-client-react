import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      exclude: [
        'node_modules',
        'dist',
        'build',
        '**/*.config.*',
        '**/.storybook/**',
        '**/*.d.ts',
        '**/*.test.*',
        '**/*.stories.*',
        '**/main.tsx',
        '**/env.ts',
        '**/src/app/**',
        '**/src/components/**/index.ts',
        '**/src/features/**/index.ts',
        '**/src/lib/**',
        '**/src/stories/**',
      ],
    },
  },
});