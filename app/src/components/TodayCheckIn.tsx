import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { moodStore, energyStore, setMood, setEnergy, Mood } from '../../lib/moodStore';
import { MoodChip } from './ui/MoodChip';
import { EnergySlider } from './ui/EnergySlider';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useToast, ToastProvider } from './ui/Toast';
import { SectionWrapper } from './ui/SectionWrapper';
import { Card } from './ui/Card';

const moods: Mood[] = ['clear', 'misty', 'rainy', 'stormy', 'sunshower'];

const TodayCheckInContent = () => {
  const currentMood = useStore(moodStore);
  const currentEnergy = useStore(energyStore);
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    const entry = {
      mood: currentMood,
      energy: currentEnergy,
      note,
      timestamp: new Date().toISOString()
    };
    
    // Persist to localStorage for now
    const existing = JSON.parse(localStorage.getItem('serein.entries') || '[]');
    localStorage.setItem('serein.entries', JSON.stringify([...existing, entry]));
    
    toast({
      title: 'Logged.',
      description: 'However you feel is allowed.',
      tone: 'success'
    });
    
    setNote('');
  };

  return (
    <SectionWrapper tone="canvas">
      <div className="max-w-2xl mx-auto py-16 space-y-12">
        
        <div className="space-y-4 text-center">
          <h1 className="font-display text-4xl">How are you today?</h1>
          <p className="text-secondary">Take a moment to check in with your inner weather.</p>
        </div>

        <Card type="base" className="space-y-10 p-8 shadow-sm border border-subtle">
          
          <div className="space-y-4">
            <label className="block text-sm font-medium">1. Select your mood</label>
            <div className="flex flex-wrap gap-4">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setMood(mood)}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus transition-all"
                  aria-pressed={currentMood === mood}
                >
                  <MoodChip mood={mood} size="lg" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">2. Energy level</label>
            <EnergySlider 
              value={currentEnergy} 
              onChange={setEnergy}
            />
          </div>

          <div className="space-y-4">
            <Input 
              type="textarea" 
              label="3. Add a note (optional)" 
              placeholder="What's contributing to your weather?" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-subtle">
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              label="Save Check-in" 
              onClick={handleSave} 
            />
          </div>

        </Card>
      </div>
    </SectionWrapper>
  );
};

export const TodayCheckIn = () => {
  return (
    <ToastProvider>
      <TodayCheckInContent />
    </ToastProvider>
  );
};
