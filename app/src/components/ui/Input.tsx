import React, { useState, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const inputVariants = cva(
  'flex w-full rounded-md border bg-surface px-3 py-2 text-sm text-primary ring-offset-canvas transition-colors placeholder:text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-target-min',
  {
    variants: {
      size: {
        md: 'h-11',
        lg: 'h-14 text-base rounded-lg',
      },
      hasError: {
        true: 'border-warning focus-visible:ring-warning',
        false: 'border-strong',
      }
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, VariantProps<typeof inputVariants> {
  label?: string;
  helper?: string;
  error?: string;
  counter?: number;
  type?: 'text' | 'email' | 'password' | 'search' | 'textarea';
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, size, label, helper, error, counter, type = 'text', onChange, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [charCount, setCharCount] = useState(value ? String(value).length : 0);
    
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const hasError = !!error;
    const inputId = props.id || React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (counter) {
        setCharCount(e.target.value.length);
      }
      onChange?.(e);
    };

    const isTextarea = type === 'textarea';
    const Component = isTextarea ? 'textarea' : 'input';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          <Component
            id={inputId}
            type={inputType as any}
            className={cn(inputVariants({ size, hasError, className }), isTextarea && "min-h-[100px] py-3")}
            ref={ref as any}
            value={value}
            onChange={handleChange}
            {...(props as any)}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        
        <div className="flex items-start justify-between text-xs">
          {(helper || error) && (
            <p className={cn("mt-1", error ? "text-warning" : "text-secondary")}>
              {error || helper}
            </p>
          )}
          {counter && (
            <p className={cn("mt-1 ml-auto shrink-0", charCount > counter ? "text-warning" : "text-tertiary")}>
              {charCount} / {counter}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
