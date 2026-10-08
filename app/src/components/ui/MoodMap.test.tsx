import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MoodMap } from './MoodMap';

describe('MoodMap', () => {
  it('renders 30 empty days when no data provided', () => {
    const { container } = render(<MoodMap data={[]} />);
    expect(container.querySelectorAll('button').length).toBe(30);
  });

  it('renders provided data', () => {
    const data = [
      { date: '2026-10-01', mood: 'clear' as const },
      { date: '2026-10-02', mood: 'stormy' as const }
    ];
    render(<MoodMap data={data} />);
    expect(screen.getByLabelText(/clear/)).toBeTruthy();
    expect(screen.getByLabelText(/stormy/)).toBeTruthy();
  });

  it('handles click when onSelect provided', () => {
    const data = [{ date: '2026-10-01', mood: 'clear' as const }];
    const onSelect = vi.fn();
    render(<MoodMap data={data} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByLabelText(/clear/));
    expect(onSelect).toHaveBeenCalledWith(data[0]);
  });
});
