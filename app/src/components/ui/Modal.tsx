import React, { useEffect, useRef, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const modalVariants = cva(
  'fixed z-50 bg-surface shadow-lg outline-none transition-all duration-base ease-out',
  {
    variants: {
      type: {
        dialog: 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border border-subtle data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        sheet: 'bottom-0 left-0 right-0 rounded-t-xl border-t border-subtle data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full sm:right-0 sm:left-auto sm:top-0 sm:bottom-0 sm:h-full sm:rounded-none sm:rounded-l-xl sm:border-l sm:border-t-0 sm:data-[state=closed]:slide-out-to-right-full sm:data-[state=open]:slide-in-from-right-full',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      }
    },
    compoundVariants: [
      { type: 'dialog', size: 'sm', className: 'w-full max-w-sm' },
      { type: 'dialog', size: 'md', className: 'w-full max-w-lg' },
      { type: 'dialog', size: 'lg', className: 'w-full max-w-2xl' },
      { type: 'sheet', size: 'sm', className: 'sm:w-full sm:max-w-xs' },
      { type: 'sheet', size: 'md', className: 'sm:w-full sm:max-w-md' },
      { type: 'sheet', size: 'lg', className: 'sm:w-full sm:max-w-xl' },
    ],
    defaultVariants: {
      type: 'dialog',
      size: 'md',
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal = ({
  open = false,
  onOpenChange,
  type,
  size,
  title,
  description,
  children
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle ESC and Focus trap
  useEffect(() => {
    if (!open) return;

    // Store previous focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the modal content or first focusable element
    const focusableElements = contentRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    } else {
      contentRef.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange?.(false);
      }
      
      if (e.key === 'Tab' && contentRef.current) {
        const elements = contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = elements[0] as HTMLElement;
        const last = elements[elements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const content = (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={() => onOpenChange?.(false)}
        data-state={open ? "open" : "closed"}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        tabIndex={-1}
        ref={contentRef}
        data-state={open ? "open" : "closed"}
        className={cn(modalVariants({ type, size }))}
      >
        <div className="flex flex-col gap-4 p-6 relative h-full">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h2 id="modal-title" className="text-lg font-semibold font-display tracking-tight text-primary">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="text-sm text-secondary">
                {description}
              </p>
            )}
          </div>
          
          <button
            type="button"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-canvas transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:pointer-events-none"
            onClick={() => onOpenChange?.(false)}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
};
