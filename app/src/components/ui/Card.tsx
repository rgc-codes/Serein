import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'rounded-xl border transition-all duration-base overflow-hidden',
  {
    variants: {
      elevation: {
        flat: 'bg-surface border-subtle shadow-none',
        raised: 'bg-surface border-strong shadow-md hover:shadow-lg',
        glass: 'bg-glass backdrop-blur-md border-glass/20 shadow-lg',
      },
      type: {
        base: 'p-4 md:p-6',
        feature: 'p-6 md:p-8',
        stat: 'p-4 flex items-center justify-between',
        journal: 'p-5 border-l-4 border-l-accent border-y-subtle border-r-subtle',
        moodWeather: 'p-6 bg-gradient-to-b from-[var(--mood-clear-a)] to-[var(--mood-clear-b)] text-canvas border-none',
      },
    },
    defaultVariants: {
      elevation: 'flat',
      type: 'base',
    },
  }
);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation, type, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardVariants({ elevation, type, className }))} {...props} />
    );
  }
);

Card.displayName = 'Card';
