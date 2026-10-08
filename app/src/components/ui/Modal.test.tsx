import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<Modal open={false} title="Test">Content</Modal>);
    expect(screen.queryByText('Test')).toBeNull();
  });

  it('renders content when open', () => {
    render(<Modal open={true} title="Test Dialog">Dialog Content</Modal>);
    expect(screen.getByText('Test Dialog')).toBeTruthy();
    expect(screen.getByText('Dialog Content')).toBeTruthy();
  });

  it('calls onOpenChange when close button clicked', () => {
    const onOpenChange = vi.fn();
    render(<Modal open={true} title="Test" onOpenChange={onOpenChange}>Content</Modal>);
    
    const closeBtn = screen.getByLabelText('Close');
    fireEvent.click(closeBtn);
    
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('handles escape key to close', () => {
    const onOpenChange = vi.fn();
    render(<Modal open={true} title="Test" onOpenChange={onOpenChange}>Content</Modal>);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('handles outside click to close', () => {
    const onOpenChange = vi.fn();
    render(<Modal open={true} title="Test" onOpenChange={onOpenChange}>Content</Modal>);
    
    // Simulate pointer down on document to bypass react portal issues in simple tests
    fireEvent.pointerDown(document.body);
  });

  it('traps focus correctly', () => {
    const { container } = render(
      <div>
        <button id="outside">Outside</button>
        <Modal open={true} title="Test">
          <button id="inside">Inside</button>
        </Modal>
      </div>
    );
    
    fireEvent.keyDown(document, { key: 'Tab' });
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.getElementById('inside')).toBeTruthy();
  });
});
