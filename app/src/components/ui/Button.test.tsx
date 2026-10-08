import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button label="Hello" />);
    const btn = screen.getByRole('button');
    expect(btn.textContent).toContain('Hello');
    expect(btn.className).toContain('bg-accent');
  });

  it('renders different variants', () => {
    render(<Button variant="danger" label="Delete" />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-warning');
  });

  it('handles disabled state', () => {
    render(<Button disabled label="No" />);
    const btn = screen.getByRole('button');
    expect(btn.hasAttribute('disabled')).toBe(true);
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });
  
  it('handles loading state', () => {
    const { container } = render(<Button loading label="Loading..." />);
    const btn = screen.getByRole('button');
    expect(btn.hasAttribute('disabled')).toBe(true);
    expect(container.querySelector('svg')).toBeTruthy(); // Loader icon
  });
});
