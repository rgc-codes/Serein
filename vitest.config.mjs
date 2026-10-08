import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tokens/**/*.test.mjs'],
  },
});
