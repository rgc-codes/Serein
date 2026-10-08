import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      tone: {
        neutral: 'border-subtle bg-surface text-primary',
        success: 'border-success bg-success/10 text-success',
        warning: 'border-warning bg-warning/10 text-warning',
        error: 'border-warning bg-warning/20 text-warning font-medium',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string;
  title?: string;
  description?: string;
  onClose: (id: string) => void;
  duration?: number;
}

const Toast = ({ id, title, description, tone, onClose, duration }: ToastProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = () => {
    switch (tone) {
      case 'success': return <CheckCircle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'error': return <AlertCircle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  useEffect(() => {
    if (duration === Infinity) return;
    
    let timer: number;
    if (!isHovered) {
      timer = window.setTimeout(() => {
        onClose(id);
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [id, duration, isHovered, onClose]);

  return (
    <div
      className={cn(toastVariants({ tone }))}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="alert"
    >
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex flex-col gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
      </div>
      <button
        onClick={() => onClose(id)}
        className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:text-primary focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

type ToastOptions = Omit<ToastProps, 'id' | 'onClose'>;

interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    
    let defaultDuration = 4000;
    if (options.tone === 'warning') defaultDuration = 6000;
    if (options.tone === 'error') defaultDuration = Infinity;
    
    setToasts((prev) => {
      const newToasts = [...prev, { ...options, id, duration: options.duration || defaultDuration }];
      return newToasts.slice(-3); // Max 3 stacked
    });
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2">
          {toasts.map((t) => (
            <Toast key={t.id} {...t} onClose={closeToast} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
