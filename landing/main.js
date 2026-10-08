/**
 * main.js — Serein Landing
 * Mood switcher + theme toggle. ≤ 5KB.
 */

(function () {
  'use strict';

  const html = document.documentElement;

  /* ------------------------------------------------------------------ */
  /*  Theme toggle                                                       */
  /* ------------------------------------------------------------------ */

  const themeToggle = document.getElementById('theme-toggle');

  /** Read persisted or system theme */
  function getInitialTheme() {
    const stored = localStorage.getItem('serein-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    html.dataset.theme = theme;
    localStorage.setItem('serein-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  // Initialize theme
  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Mood switcher                                                      */
  /* ------------------------------------------------------------------ */

  const moodChips = document.querySelectorAll('.mood-chip[data-mood-value]');

  /** Read persisted mood or default to clear */
  function getInitialMood() {
    const stored = localStorage.getItem('serein-mood');
    const valid = ['clear', 'misty', 'rainy', 'stormy', 'sunshower'];
    return valid.includes(stored) ? stored : 'clear';
  }

  function applyMood(mood) {
    html.dataset.mood = mood;
    localStorage.setItem('serein-mood', mood);

    moodChips.forEach(function (chip) {
      const isActive = chip.dataset.moodValue === mood;
      chip.classList.toggle('mood-chip--active', isActive);
      chip.setAttribute('aria-checked', String(isActive));
    });
  }

  // Initialize mood
  applyMood(getInitialMood());

  moodChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      applyMood(chip.dataset.moodValue);
    });

    // Keyboard navigation for radio group
    chip.addEventListener('keydown', function (e) {
      var chips = Array.from(moodChips);
      var index = chips.indexOf(chip);
      var next = -1;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next = (index + 1) % chips.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        next = (index - 1 + chips.length) % chips.length;
      }

      if (next !== -1) {
        e.preventDefault();
        chips[next].focus();
        applyMood(chips[next].dataset.moodValue);
      }
    });
  });
})();
