import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { MoodGlyph } from './MoodGlyph';

const chipVariants = cva(
  'inline-flex items-center gap-2 rounded-full font-medium transition-colors border shadow-sm',
  {
    variants: {
      mood: {
        clear: 'bg-[var(--mood-clear-a)] text-[var(--mood-clear-b)] border-[var(--mood-clear-b)]/20',
        misty: 'bg-[var(--mood-misty-a)] text-[var(--mood-misty-b)] border-[var(--mood-misty-b)]/20',
        rainy: 'bg-[var(--mood-rainy-a)] text-[var(--mood-rainy-b)] border-[var(--mood-rainy-b)]/20',
        stormy: 'bg-[var(--mood-stormy-a)] text-[var(--mood-stormy-b)] border-[var(--mood-stormy-b)]/20',
        sunshower: 'bg-[var(--mood-sunshower-a)] text-[var(--mood-sunshower-b)] border-[var(--mood-sunshower-b)]/20',
      },
      size: {
        sm: 'h-6 px-2.5 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
    },
    defaultVariants: {
      mood: 'clear',
      size: 'md',
    },
  }
);

export interface MoodChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  mood?: 'clear' | 'misty' | 'rainy' | 'stormy' | 'sunshower';
  showLabel?: boolean;
}

export const MoodChip = React.forwardRef<HTMLDivElement, MoodChipProps>(
  ({ className, mood = 'clear', size, showLabel = true, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(chipVariants({ mood, size, className }))} {...props}>
        <MoodGlyph mood={mood} size={size === 'lg' ? 'md' : 'sm'} className="opacity-80" />
        {showLabel && <span>{mood.charAt(0).toUpperCase() + mood.slice(1)}</span>}
      </div>
    );
  }
);

MoodChip.displayName = 'MoodChip';
