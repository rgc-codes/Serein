import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { moodStore, setMood, Mood } from '../../lib/moodStore';

const moods: Mood[] = ['clear', 'misty', 'rainy', 'stormy', 'sunshower'];

export const MoodSelect = () => {
  const currentMood = useStore(moodStore);

  // Re-hydrate the local store if SSR initially set it differently
  useEffect(() => {
    const savedMood = localStorage.getItem('serein.mood') as Mood;
    if (savedMood && savedMood !== currentMood) {
      setMood(savedMood);
    }
  }, []);

  return (
    <select
      className="bg-canvas border border-subtle rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-focus transition-all"
      value={currentMood}
      onChange={(e) => setMood(e.target.value as Mood)}
      aria-label="Select mood"
    >
      {moods.map((mood) => (
        <option key={mood} value={mood}>
          {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </option>
      ))}
    </select>
  );
};
