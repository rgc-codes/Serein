import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const toggleVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-6 w-11',
        md: 'h-8 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  'pointer-events-none block rounded-full bg-surface shadow-sm ring-0 transition-transform duration-fast ease-out',
  {
    variants: {
      size: {
        sm: 'h-5 w-5',
        md: 'h-7 w-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof toggleVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, size, checked = false, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          toggleVariants({ size, className }),
          checked ? 'bg-accent' : 'bg-border-strong'
        )}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            thumbVariants({ size }),
            checked 
              ? size === 'sm' ? 'translate-x-5' : 'translate-x-6' 
              : 'translate-x-0'
          )}
        />
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';
