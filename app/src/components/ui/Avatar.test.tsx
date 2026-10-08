import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials correctly', () => {
    const { container } = render(<Avatar initials="JD" type="initials" />);
    const span = container.querySelector('span');
    expect(span?.textContent).toBe('JD');
  });

  it('renders image correctly', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.jpg" type="image" />);
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('renders status dot when requested', () => {
    const { container } = render(<Avatar status initials="JD" type="initials" />);
    const spans = container.querySelectorAll('span');
    // We expect the first to be initials, second to be status dot
    expect(spans.length).toBeGreaterThan(1);
    const lastSpan = spans[spans.length - 1];
    expect(lastSpan.className).toContain('bg-success');
  });
});
