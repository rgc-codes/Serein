/**
 * tokens/build.test.mjs
 *
 * Validates that the token build script generates correct CSS
 * with all required custom properties.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const landingCSS = resolve(root, 'landing', 'tokens.css');
const appCSS = resolve(root, 'app', 'src', 'styles', 'tokens.css');

beforeAll(() => {
  // Run the build script
  execSync('node tokens/build.mjs', { cwd: root, stdio: 'pipe' });
});

describe('Token build', () => {
  it('generates tokens.css in landing/', () => {
    expect(existsSync(landingCSS)).toBe(true);
  });

  it('generates tokens.css in app/src/styles/', () => {
    expect(existsSync(appCSS)).toBe(true);
  });

  it('produces identical output in both locations', () => {
    const landing = readFileSync(landingCSS, 'utf-8');
    const app = readFileSync(appCSS, 'utf-8');
    expect(landing).toBe(app);
  });

  it('is idempotent (running twice produces same output)', () => {
    const before = readFileSync(landingCSS, 'utf-8');
    execSync('node tokens/build.mjs', { cwd: root, stdio: 'pipe' });
    const after = readFileSync(landingCSS, 'utf-8');
    expect(before).toBe(after);
  });
});

describe('Required CSS variables — :root', () => {
  let css;

  beforeAll(() => {
    css = readFileSync(landingCSS, 'utf-8');
  });

  // Semantic background tokens
  const bgVars = ['--bg-canvas', '--bg-surface', '--bg-surface-raised', '--bg-glass'];
  bgVars.forEach((name) => {
    it(`contains ${name}`, () => {
      expect(css).toContain(name);
    });
  });

  // Semantic text tokens
  const textVars = ['--text-primary', '--text-secondary', '--text-tertiary'];
  textVars.forEach((name) => {
    it(`contains ${name}`, () => {
      expect(css).toContain(name);
    });
  });

  // Border tokens
  const borderVars = ['--border-subtle', '--border-strong'];
  borderVars.forEach((name) => {
    it(`contains ${name}`, () => {
      expect(css).toContain(name);
    });
  });

  // Accent tokens
  const accentVars = ['--accent-primary', '--accent-secondary', '--accent-warm'];
  accentVars.forEach((name) => {
    it(`contains ${name}`, () => {
      expect(css).toContain(name);
    });
  });

  // State tokens
  const stateVars = ['--state-success', '--state-warning', '--state-focus'];
  stateVars.forEach((name) => {
    it(`contains ${name}`, () => {
      expect(css).toContain(name);
    });
  });

  // Space scale
  for (let i = 1; i <= 8; i++) {
    it(`contains --space-${i}`, () => {
      expect(css).toContain(`--space-${i}`);
    });
  }

  // Radius tokens
  const radiusVars = ['--radius-sm', '--radius-md', '--radius-lg', '--radius-full'];
  radiusVars.forEach((name) => {
    it(`contains ${name}`, () => {
      expect(css).toContain(name);
    });
  });

  // Duration tokens
  const durationVars = ['--duration-fast', '--duration-base', '--duration-slow'];
  durationVars.forEach((name) => {
    it(`contains ${name}`, () => {
      expect(css).toContain(name);
    });
  });

  // Easing
  it('contains --ease-out', () => {
    expect(css).toContain('--ease-out');
  });

  // Default mood
  it('contains --mood-a', () => {
    expect(css).toContain('--mood-a');
  });

  it('contains --mood-b', () => {
    expect(css).toContain('--mood-b');
  });
});

describe('Dark theme overrides', () => {
  let css;

  beforeAll(() => {
    css = readFileSync(landingCSS, 'utf-8');
  });

  it('contains [data-theme="dark"] selector', () => {
    expect(css).toContain('[data-theme="dark"]');
  });

  it('dark theme overrides --bg-canvas', () => {
    const darkBlock = css.split('[data-theme="dark"]')[1]?.split('}')[0] ?? '';
    expect(darkBlock).toContain('--bg-canvas');
  });

  it('dark theme overrides --text-primary', () => {
    const darkBlock = css.split('[data-theme="dark"]')[1]?.split('}')[0] ?? '';
    expect(darkBlock).toContain('--text-primary');
  });
});

describe('Mood overrides', () => {
  let css;

  beforeAll(() => {
    css = readFileSync(landingCSS, 'utf-8');
  });

  const moods = ['clear', 'misty', 'rainy', 'stormy', 'sunshower'];

  moods.forEach((mood) => {
    it(`contains [data-mood="${mood}"] selector`, () => {
      expect(css).toContain(`[data-mood="${mood}"]`);
    });

    it(`[data-mood="${mood}"] sets --mood-a and --mood-b`, () => {
      const moodBlock = css.split(`[data-mood="${mood}"]`)[1]?.split('}')[0] ?? '';
      expect(moodBlock).toContain('--mood-a');
      expect(moodBlock).toContain('--mood-b');
    });
  });
});

describe('Reduced motion', () => {
  let css;

  beforeAll(() => {
    css = readFileSync(landingCSS, 'utf-8');
  });

  it('contains prefers-reduced-motion media query', () => {
    expect(css).toContain('prefers-reduced-motion');
  });

  it('sets durations to 0ms in reduced motion', () => {
    const motionBlock = css.split('prefers-reduced-motion')[1]?.split('@media')[0] ?? '';
    expect(motionBlock).toContain('0ms');
  });
});

describe('Snapshot', () => {
  it('matches the snapshot', () => {
    const css = readFileSync(landingCSS, 'utf-8');
    expect(css).toMatchSnapshot();
  });
});
