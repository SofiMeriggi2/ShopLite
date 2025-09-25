import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['src/tests/e2e/**', 'node_modules', 'dist', '.next'],
    passWithNoTests: true,
  },
});
