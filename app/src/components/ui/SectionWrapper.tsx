import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const wrapperVariants = cva(
  'w-full py-12 md:py-24',
  {
    variants: {
      tone: {
        canvas: 'bg-canvas',
        surface: 'bg-surface',
        glass: 'bg-glass backdrop-blur-xl',
      },
      width: {
        narrow: 'max-w-3xl',
        default: 'max-w-7xl',
        full: 'max-w-full px-0',
      }
    },
    defaultVariants: {
      tone: 'canvas',
      width: 'default',
    },
  }
);

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof wrapperVariants> {}

export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ className, tone = 'canvas', width = 'default', children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn(wrapperVariants({ tone, className }))} {...props}>
        <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", {
          'max-w-3xl': width === 'narrow',
          'max-w-7xl': width === 'default',
          'max-w-full px-0 sm:px-0 lg:px-0': width === 'full'
        })}>
          {children}
        </div>
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';
