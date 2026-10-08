import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders correctly', () => {
    render(<Toggle checked={false} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });

  it('handles click', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onCheckedChange={onChange} />);
    
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    
    expect(onChange).toHaveBeenCalledWith(true);
  });



  it('handles disabled state', () => {
    render(<Toggle checked={false} disabled={true} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.hasAttribute('disabled')).toBe(true);
  });
});
