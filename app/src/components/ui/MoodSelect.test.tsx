import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MoodSelect } from './MoodSelect';

describe('MoodSelect', () => {
  it('renders select with options and handles change', () => {
    render(<MoodSelect />);
    const select = screen.getByLabelText('Select mood');
    expect(select).toBeTruthy();
    
    // Test that we can fire change
    fireEvent.change(select, { target: { value: 'rainy' } });
    expect((select as HTMLSelectElement).value).toBe('rainy');
  });
});
