import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    expect(screen.getByPlaceholderText('Enter username')).toBeTruthy();
  });

  it('handles onChange and counter', () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} counter={10} data-testid="input" value="test" />);
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'testing12345' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders with error', () => {
    render(<Input error="This is required" data-testid="input" />);
    expect(screen.getByText('This is required')).toBeTruthy();
    expect(screen.getByTestId('input').className).toContain('border-warning');
  });

  it('toggles password visibility', () => {
    render(<Input type="password" label="Password" id="password-input" placeholder="Pass" />);
    const input = screen.getByPlaceholderText('Pass');
    expect(input.getAttribute('type')).toBe('password');

    const toggleBtn = screen.getByRole('button');
    fireEvent.click(toggleBtn);
    expect(input.getAttribute('type')).toBe('text');
  });

  it('renders as textarea', () => {
    render(<Input type="textarea" label="Notes" id="notes-input" placeholder="Notes" />);
    const textarea = screen.getByPlaceholderText('Notes');
    expect(textarea.tagName).toBe('TEXTAREA');
  });
});
