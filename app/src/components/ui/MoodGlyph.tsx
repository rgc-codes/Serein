import React from 'react';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const glyphVariants = cva(
  'inline-block transition-transform duration-mood',
  {
    variants: {
      mood: {
        clear: 'text-[var(--mood-clear-b)]',
        misty: 'text-[var(--mood-misty-b)]',
        rainy: 'text-[var(--mood-rainy-b)]',
        stormy: 'text-[var(--mood-stormy-b)]',
        sunshower: 'text-[var(--mood-sunshower-b)]',
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      mood: 'clear',
      size: 'md',
    },
  }
);

export interface MoodGlyphProps extends React.SVGProps<SVGSVGElement>, VariantProps<typeof glyphVariants> {
  mood?: 'clear' | 'misty' | 'rainy' | 'stormy' | 'sunshower';
}

export const MoodGlyph = React.forwardRef<SVGSVGElement, MoodGlyphProps>(
  ({ className, mood = 'clear', size, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = !prefersReducedMotion;
    
    const getPath = () => {
      switch (mood) {
        case 'clear':
          return (
            <g style={shouldAnimate ? { animation: 'spin-slow 6s linear infinite' } : { transformOrigin: 'center' }} className="origin-center">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        case 'misty':
          return (
            <g style={shouldAnimate ? { animation: 'drift 5s ease-in-out infinite' } : {}}>
              <path d="M4 10h16M4 14h16M8 18h8M8 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        case 'rainy':
          return (
            <>
              <path d="M8 18l-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={shouldAnimate ? { animation: 'rain-drop 2s linear infinite' } : {}} />
              <path d="M12 18l-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={shouldAnimate ? { animation: 'rain-drop 2s linear infinite 0.12s' } : {}} />
              <path d="M16 18l-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={shouldAnimate ? { animation: 'rain-drop 2s linear infinite 0.24s' } : {}} />
              <path d="M17 14a5 5 0 00-10 0 3 3 0 000 6h10a4 4 0 000-8z" fill="currentColor" />
            </>
          );
        case 'stormy':
          return (
            <>
              <path d="M12 14l-4 4h6l-2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={shouldAnimate ? { animation: 'flash 3s infinite' } : {}} />
              <path d="M17 14a5 5 0 00-10 0 3 3 0 000 6h10a4 4 0 000-8z" fill="currentColor" />
            </>
          );
        case 'sunshower':
          return (
            <>
              <g style={shouldAnimate ? { animation: 'spin-slow 6s linear infinite' } : { transformOrigin: 'center' }} className="origin-center">
                <circle cx="9" cy="9" r="4" fill="currentColor" />
              </g>
              <path d="M17 14a5 5 0 00-10 0 3 3 0 000 6h10a4 4 0 000-8z" fill="currentColor" />
              <path d="M12 20v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={shouldAnimate ? { animation: 'rain-drop 2s linear infinite' } : {}} />
              <path d="M16 20v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={shouldAnimate ? { animation: 'rain-drop 2s linear infinite 0.12s' } : {}} />
            </>
          );
        default:
          return null;
      }
    };

    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(glyphVariants({ mood, size, className }))}
        {...props}
      >
        {getPath()}
      </svg>
    );
  }
);

MoodGlyph.displayName = 'MoodGlyph';
