import { afterEach } from 'vitest';

afterEach(() => {
  // Cleanup JSDOM after each test if needed
  document.body.innerHTML = '';
});
