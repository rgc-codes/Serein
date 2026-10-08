import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SectionWrapper } from './SectionWrapper';

describe('SectionWrapper', () => {
  it('renders correctly with default variants', () => {
    const { container } = render(<SectionWrapper />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain('bg-canvas');
    const inner = section.querySelector('div');
    expect(inner?.className).toContain('max-w-7xl');
  });

  it('applies custom tone and width', () => {
    const { container } = render(<SectionWrapper tone="glass" width="narrow" />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain('bg-glass');
    const inner = section.querySelector('div');
    expect(inner?.className).toContain('max-w-3xl');
  });
});
