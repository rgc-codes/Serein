import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider, useToast } from './Toast';

const TestComponent = () => {
  const { toast } = useToast();
  return (
    <>
      <button onClick={() => toast({ title: 'Success!', description: 'It worked', tone: 'success' })}>
        Show Toast
      </button>
      <button onClick={() => toast({ title: 'Error', tone: 'error' })}>
        Error Toast
      </button>
      <button onClick={() => toast({ title: 'Info', tone: 'info' })}>
        Info Toast
      </button>
      <button onClick={() => toast({ title: 'Warning', tone: 'warning' })}>
        Warning Toast
      </button>
    </>
  );
};

describe('Toast', () => {
  it('shows toast when triggered', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText('Show Toast'));
    expect(await screen.findByText('Success!')).toBeTruthy();
    expect(await screen.findByText('It worked')).toBeTruthy();
  });
  
  it('shows different tones', async () => {
    render(
      <ToastProvider duration={100}>
        <TestComponent />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Error Toast'));
    expect(await screen.findByText('Error')).toBeTruthy();
    
    fireEvent.click(screen.getByText('Info Toast'));
    expect(await screen.findByText('Info')).toBeTruthy();
    
    fireEvent.click(screen.getByText('Warning Toast'));
    expect(await screen.findByText('Warning')).toBeTruthy();
  });
});
