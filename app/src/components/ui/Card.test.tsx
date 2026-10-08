import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders correctly with default variants', () => {
    const { container } = render(<Card />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('bg-surface');
    expect(card.className).toContain('p-4');
  });

  it('renders different types', () => {
    const { container } = render(<Card type="journal" />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('border-l-accent');
  });
});
