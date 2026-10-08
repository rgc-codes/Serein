import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-canvas active:scale-95 duration-fast ease-out touch-target-min',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-canvas hover:bg-accent-secondary shadow-sm',
        secondary: 'bg-surface-raised text-primary border border-subtle hover:bg-surface hover:border-strong',
        ghost: 'hover:bg-surface-raised hover:text-primary text-secondary',
        danger: 'bg-warning text-canvas hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-11 px-4 py-2 text-sm',
        lg: 'h-14 px-8 text-base rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  label?: string;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, label, loading, disabled, iconLeft, iconRight, children, ...props }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && iconLeft && <span className="mr-2">{iconLeft}</span>}
        {label ? label : children}
        {!loading && iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
