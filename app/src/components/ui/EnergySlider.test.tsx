import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EnergySlider } from './EnergySlider';

describe('EnergySlider', () => {
  it('renders correctly', () => {
    render(<EnergySlider value={5} />);
    expect(screen.getByText('Low Energy')).toBeTruthy();
    expect(screen.getByText('High Energy')).toBeTruthy();
    expect(screen.getByRole('slider')).toBeTruthy();
  });

  it('renders different battery icons based on value', () => {
    const { rerender } = render(<EnergySlider value={2} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuenow')).toBe('2');
    
    rerender(<EnergySlider value={9} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuenow')).toBe('9');
  });
});
