import React from 'react';
import { Slider, type SliderProps } from './Slider';
import { cn } from '../../lib/utils';
import { Battery, BatteryFull, BatteryMedium, BatteryLow } from 'lucide-react';

export interface EnergySliderProps extends Omit<SliderProps, 'min' | 'max'> {
  showIcons?: boolean;
}

export const EnergySlider = ({ value = 5, onChange, showIcons = true, className, ...props }: EnergySliderProps) => {
  const getIcon = () => {
    if (value <= 3) return <BatteryLow className="text-tertiary" />;
    if (value <= 7) return <BatteryMedium className="text-secondary" />;
    return <BatteryFull className="text-primary" />;
  };

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-secondary">Low Energy</span>
        {showIcons && <div className="hidden sm:block">{getIcon()}</div>}
        <span className="text-secondary">High Energy</span>
      </div>
      
      <Slider
        min={1}
        max={10}
        value={value}
        onChange={onChange}
        showTicks={true}
        showValue={false}
        {...props}
      />
    </div>
  );
};
