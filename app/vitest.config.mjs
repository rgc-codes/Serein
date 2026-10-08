import { getViteConfig } from 'astro/config';
import react from '@vitejs/plugin-react';

export default getViteConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx,astro}'],
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    coverage: {
      include: ['src/components/ui/**/*'],
      exclude: ['src/components/ui/OverlayDemo.tsx'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70
      }
    }
  },
});
