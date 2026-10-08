import { atom } from 'nanostores';

export type Mood = 'clear' | 'misty' | 'rainy' | 'stormy' | 'sunshower';

export const moodStore = atom<Mood>('clear');
export const energyStore = atom<number>(5);

// Hydrate from localStorage on client-side
if (typeof window !== 'undefined') {
  const savedMood = localStorage.getItem('serein.mood') as Mood;
  if (savedMood && ['clear', 'misty', 'rainy', 'stormy', 'sunshower'].includes(savedMood)) {
    moodStore.set(savedMood);
    document.documentElement.setAttribute('data-mood', savedMood);
  }
}

export const setMood = (mood: Mood) => {
  moodStore.set(mood);
  if (typeof window !== 'undefined') {
    localStorage.setItem('serein.mood', mood);
    document.documentElement.setAttribute('data-mood', mood);
  }
};

export const setEnergy = (energy: number) => {
  energyStore.set(energy);
};
