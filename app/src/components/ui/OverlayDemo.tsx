import React, { useState } from 'react';
import { Modal } from './Modal';
import { useToast, ToastProvider } from './Toast';
import { Button } from './Button'; // I need a React button if I use it, but I can use plain HTML.

const OverlayDemoContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-4">
      <button 
        className="px-4 py-2 bg-surface border border-subtle rounded-md hover:bg-surface-raised font-medium text-sm transition-colors"
        onClick={() => setModalOpen(true)}
      >
        Open Dialog
      </button>
      <button 
        className="px-4 py-2 bg-success/10 text-success border border-success/20 rounded-md font-medium text-sm hover:bg-success/20 transition-colors"
        onClick={() => toast({ title: 'Saved successfully', tone: 'success' })}
      >
        Success Toast
      </button>
      <button 
        className="px-4 py-2 bg-warning/10 text-warning border border-warning/20 rounded-md font-medium text-sm hover:bg-warning/20 transition-colors"
        onClick={() => toast({ title: 'Connection lost', description: 'Retrying in 5s...', tone: 'error' })}
      >
        Error Toast
      </button>

      <Modal open={modalOpen} onOpenChange={setModalOpen} title="Example Dialog" description="This is an accessible modal dialog with focus trap.">
        <div className="py-4">
          <p className="text-secondary text-sm">Press Escape or click outside to close.</p>
        </div>
      </Modal>
    </div>
  );
};

export const OverlayDemo = () => {
  return (
    <ToastProvider>
      <OverlayDemoContent />
    </ToastProvider>
  );
};
