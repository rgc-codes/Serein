import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { MoodGlyph } from './MoodGlyph';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-raised border border-subtle',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-14 w-14 text-base',
        xl: 'h-20 w-20 text-lg',
      },
      ring: {
        true: 'ring-2 ring-canvas ring-offset-2 ring-offset-accent',
        false: '',
      }
    },
    defaultVariants: {
      size: 'md',
      ring: false,
    },
  }
);

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  initials?: string;
  type?: 'image' | 'initials' | 'mood';
  mood?: 'clear' | 'misty' | 'rainy' | 'stormy' | 'sunshower';
  status?: boolean;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, ring, src, initials, type = 'image', mood = 'clear', status, ...props }, ref) => {
    return (
      <div className="relative inline-block">
        <div ref={ref} className={cn(avatarVariants({ size, ring, className }))} {...props}>
          {type === 'image' && src && (
            <img src={src} alt="Avatar" className="h-full w-full object-cover" />
          )}
          {type === 'initials' && initials && (
            <span className="font-medium text-primary uppercase">{initials.substring(0, 2)}</span>
          )}
          {type === 'mood' && (
            <div className={cn("flex h-full w-full items-center justify-center", `bg-[var(--mood-${mood}-a)]`)}>
              <MoodGlyph mood={mood} size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} />
            </div>
          )}
        </div>
        {status && (
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-success ring-2 ring-canvas" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
