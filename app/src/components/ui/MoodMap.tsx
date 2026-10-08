import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const mapVariants = cva(
  'grid w-full',
  {
    variants: {
      density: {
        dense: 'gap-1 grid-cols-6 sm:grid-cols-10',
        sparse: 'gap-2 sm:gap-3 grid-cols-5 sm:grid-cols-7',
      },
    },
    defaultVariants: {
      density: 'dense',
    },
  }
);

export type MoodType = 'clear' | 'misty' | 'rainy' | 'stormy' | 'sunshower' | null;

export interface MoodEntry {
  date: string;
  mood: MoodType;
  intensity?: number; // 1-10
}

export interface MoodMapProps extends VariantProps<typeof mapVariants> {
  data: MoodEntry[];
  onSelect?: (entry: MoodEntry) => void;
  className?: string;
}

export const MoodMap = ({ data, density, onSelect, className }: MoodMapProps) => {
  // Pad data to ensure at least 30 days if empty
  const days = data.length > 0 ? data : Array.from({ length: 30 }).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
    mood: null as MoodType
  }));

  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case 'clear': return 'bg-[var(--mood-clear-a)]';
      case 'misty': return 'bg-[var(--mood-misty-a)]';
      case 'rainy': return 'bg-[var(--mood-rainy-a)]';
      case 'stormy': return 'bg-[var(--mood-stormy-a)]';
      case 'sunshower': return 'bg-[var(--mood-sunshower-a)]';
      default: return 'bg-surface-raised border border-subtle';
    }
  };

  return (
    <div className={cn(mapVariants({ density }), className)}>
      {days.map((day, i) => (
        <button
          key={day.date || i}
          type="button"
          onClick={() => onSelect?.(day)}
          disabled={!onSelect}
          className={cn(
            'relative aspect-square rounded-sm md:rounded-md transition-all duration-base ease-out',
            getMoodColor(day.mood),
            day.mood ? 'hover:opacity-80 hover:scale-105 shadow-sm' : 'opacity-40 hover:opacity-100',
            onSelect && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 ring-offset-canvas'
          )}
          aria-label={day.mood ? `Mood on ${new Date(day.date).toLocaleDateString()}: ${day.mood}` : `No mood recorded for ${new Date(day.date).toLocaleDateString()}`}
        >
          <span className="sr-only">{day.mood || 'Empty'}</span>
        </button>
      ))}
    </div>
  );
};
