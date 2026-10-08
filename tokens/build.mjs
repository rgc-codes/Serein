/**
 * tokens/build.mjs
 *
 * Reads tokens.json and emits tokens.css to both landing/ and app/src/styles/.
 * Run with: node tokens/build.mjs (or pnpm tokens)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(resolve(__dirname, 'tokens.json'), 'utf-8'));

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Emit a CSS custom property line */
const prop = (name, value) => `  ${name}: ${value};`;

/** Wrap lines in a selector block */
const block = (selector, lines) =>
  `${selector} {\n${lines.join('\n')}\n}`;

/* ------------------------------------------------------------------ */
/*  Build CSS content                                                  */
/* ------------------------------------------------------------------ */

function buildCSS(tokens) {
  const { color, space, radius, duration, ease } = tokens;
  const lines = [];

  // ---- :root (light theme defaults) ----
  const rootLines = [];

  // Primitive color tokens
  rootLines.push(prop('--color-blue400', color.blue400));
  rootLines.push(prop('--color-lavender300', color.lavender300));
  rootLines.push(prop('--color-amber400', color.amber400));
  rootLines.push(prop('--color-moss400', color.moss400));
  rootLines.push(prop('--color-dusk400', color.dusk400));
  rootLines.push(prop('--color-cloud50', color.cloud50));
  rootLines.push(prop('--color-ink900', color.ink900));
  rootLines.push(prop('--color-night950', color.night950));
  rootLines.push('');

  // Semantic color tokens — light theme
  rootLines.push(prop('--bg-canvas', color.cloud50));
  rootLines.push(prop('--bg-surface', '#FFFFFF'));
  rootLines.push(prop('--bg-surface-raised', '#FFFFFF'));
  rootLines.push(prop('--bg-glass', 'rgba(255, 255, 255, 0.72)'));
  rootLines.push('');
  rootLines.push(prop('--text-primary', color.ink900));
  rootLines.push(prop('--text-secondary', '#4A4D54'));
  rootLines.push(prop('--text-tertiary', '#8A8D94'));
  rootLines.push('');
  rootLines.push(prop('--border-subtle', 'rgba(28, 31, 36, 0.08)'));
  rootLines.push(prop('--border-strong', 'rgba(28, 31, 36, 0.2)'));
  rootLines.push('');
  rootLines.push(prop('--accent-primary', color.blue400));
  rootLines.push(prop('--accent-secondary', color.lavender300));
  rootLines.push(prop('--accent-warm', color.amber400));
  rootLines.push('');
  rootLines.push(prop('--state-success', color.moss400));
  rootLines.push(prop('--state-warning', color.dusk400));
  rootLines.push(prop('--state-focus', color.blue400));
  rootLines.push('');

  // Space tokens
  for (const [key, value] of Object.entries(space)) {
    rootLines.push(prop(`--space-${key}`, `${value}px`));
  }
  rootLines.push('');

  // Radius tokens
  for (const [key, value] of Object.entries(radius)) {
    rootLines.push(prop(`--radius-${key}`, `${value}px`));
  }
  rootLines.push('');

  // Duration tokens
  for (const [key, value] of Object.entries(duration)) {
    rootLines.push(prop(`--duration-${key}`, `${value}ms`));
  }
  rootLines.push('');

  // Easing tokens
  for (const [key, value] of Object.entries(ease)) {
    rootLines.push(prop(`--ease-${key}`, value));
  }
  rootLines.push('');

  // Default mood (Clear)
  rootLines.push(prop('--mood-a', color.mood.clear.a));
  rootLines.push(prop('--mood-b', color.mood.clear.b));

  lines.push(block(':root', rootLines));
  lines.push('');

  // ---- Dark theme overrides ----
  const darkLines = [];
  darkLines.push(prop('--bg-canvas', color.night950));
  darkLines.push(prop('--bg-surface', color.ink900));
  darkLines.push(prop('--bg-surface-raised', '#252830'));
  darkLines.push(prop('--bg-glass', 'rgba(16, 20, 24, 0.78)'));
  darkLines.push('');
  darkLines.push(prop('--text-primary', color.cloud50));
  darkLines.push(prop('--text-secondary', '#B0B3BA'));
  darkLines.push(prop('--text-tertiary', '#6E7178'));
  darkLines.push('');
  darkLines.push(prop('--border-subtle', 'rgba(246, 244, 239, 0.08)'));
  darkLines.push(prop('--border-strong', 'rgba(246, 244, 239, 0.18)'));
  darkLines.push('');
  darkLines.push(prop('--accent-primary', color.blue400));
  darkLines.push(prop('--accent-secondary', color.lavender300));
  darkLines.push(prop('--accent-warm', color.amber400));
  darkLines.push('');
  darkLines.push(prop('--state-success', color.moss400));
  darkLines.push(prop('--state-warning', color.dusk400));
  darkLines.push(prop('--state-focus', color.blue400));

  lines.push(block('[data-theme="dark"]', darkLines));
  lines.push('');

  // ---- Mood overrides ----
  for (const [mood, values] of Object.entries(color.mood)) {
    lines.push(block(`[data-mood="${mood}"]`, [
      prop('--mood-a', values.a),
      prop('--mood-b', values.b),
    ]));
  }

  // ---- Reduced motion ----
  lines.push('');
  lines.push('@media (prefers-reduced-motion: reduce) {');
  lines.push('  :root {');
  lines.push('    --duration-fast: 0ms;');
  lines.push('    --duration-base: 0ms;');
  lines.push('    --duration-slow: 0ms;');
  lines.push('  }');
  lines.push('}');

  return `/* ============================================================\n *  tokens.css — auto-generated by tokens/build.mjs\n *  DO NOT EDIT — modify tokens/tokens.json and run: pnpm tokens\n * ============================================================ */\n\n${lines.join('\n')}\n`;
}

/* ------------------------------------------------------------------ */
/*  Write outputs                                                      */
/* ------------------------------------------------------------------ */

const css = buildCSS(tokens);
const root = resolve(__dirname, '..');

const outputs = [
  resolve(root, 'landing', 'tokens.css'),
  resolve(root, 'app', 'src', 'styles', 'tokens.css'),
];

for (const out of outputs) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, css, 'utf-8');
  console.log(`✓ wrote ${out}`);
}

console.log('✓ tokens build complete');
