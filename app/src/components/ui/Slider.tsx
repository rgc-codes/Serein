import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  showTicks?: boolean;
  showValue?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  id?: string;
}

export const Slider = ({
  value = 5,
  min = 1,
  max = 10,
  showTicks = false,
  showValue = false,
  disabled = false,
  onChange,
  className,
  id
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const percentage = ((internalValue - min) / (max - min)) * 100;

  const updateValue = (clientX: number) => {
    if (disabled || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let newPercentage = ((clientX - rect.left) / rect.width);
    newPercentage = Math.max(0, Math.min(1, newPercentage));
    const rawValue = min + newPercentage * (max - min);
    const nearestValue = Math.round(rawValue);
    
    if (nearestValue !== internalValue) {
      setInternalValue(nearestValue);
      onChange?.(nearestValue);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || disabled) return;
    updateValue(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    let newValue = internalValue;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      newValue = Math.min(max, internalValue + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      newValue = Math.max(min, internalValue - 1);
    } else if (e.key === 'Home') {
      newValue = min;
    } else if (e.key === 'End') {
      newValue = max;
    }

    if (newValue !== internalValue) {
      e.preventDefault();
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className={cn("w-full flex flex-col gap-2 touch-none", className)}>
      {showValue && (
        <div className="flex justify-between items-center text-sm font-medium text-secondary">
          <span>{min}</span>
          <span className="text-primary text-base font-display">{internalValue}</span>
          <span>{max}</span>
        </div>
      )}
      <div 
        className="relative h-11 flex items-center group cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-disabled={disabled}
      >
        <div 
          ref={trackRef}
          className={cn(
            "w-full h-2 rounded-full relative transition-opacity duration-base",
            disabled ? "bg-border-subtle opacity-50" : "bg-border-strong"
          )}
        >
          {showTicks && (
            <div className="absolute inset-0 flex justify-between px-[4px]">
              {ticks.map((tick) => (
                <div key={tick} className="w-[2px] h-full bg-surface opacity-50" />
              ))}
            </div>
          )}
          
          <div 
            className="absolute top-0 left-0 h-full rounded-full bg-accent transition-all duration-fast ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div
          role="slider"
          id={id}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={internalValue}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute w-6 h-6 -ml-3 rounded-full bg-surface shadow-md border-2 border-accent transition-transform duration-fast ease-out outline-none",
            "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 ring-offset-canvas",
            isDragging ? "scale-110 cursor-grabbing" : "cursor-grab hover:scale-105",
            disabled && "cursor-not-allowed border-border-strong"
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
