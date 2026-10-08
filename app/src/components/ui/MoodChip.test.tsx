import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MoodChip } from './MoodChip';

describe('MoodChip', () => {
  it('renders correctly with default variants', () => {
    const { container } = render(<MoodChip />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('bg-[var(--mood-clear-a)]');
    expect(div.textContent).toContain('Clear');
  });

  it('renders different moods', () => {
    const { container } = render(<MoodChip mood="stormy" />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('bg-[var(--mood-stormy-a)]');
    expect(div.textContent).toContain('Stormy');
  });
});
