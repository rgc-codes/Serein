import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MoodGlyph } from './MoodGlyph';

describe('MoodGlyph', () => {
  it('renders SVG with default clear mood', () => {
    const { container } = render(<MoodGlyph />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('class')).toContain('text-[var(--mood-clear-b)]');
    expect(svg?.innerHTML).toContain('circle');
  });

  it('renders specific mood', () => {
    const { container } = render(<MoodGlyph mood="rainy" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('text-[var(--mood-rainy-b)]');
  });
});
