'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/** Light/dark switch. Follows the system until the visitor chooses; the choice is saved locally. */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      const preference = root.dataset.themePreference || 'system';
      const next = preference === 'dark' || (preference === 'system' && system.matches);
      root.classList.toggle('dark', next);
      setDark(next);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== 'sethpratt-theme' && event.key !== null) return;
      root.dataset.themePreference = event.newValue === 'dark' || event.newValue === 'light'
        ? event.newValue : 'system';
      sync();
    };
    sync();
    setReady(true);
    // Keep every toggle on the page (desktop bar and mobile bar) showing the same state.
    const observer = new MutationObserver(() => setDark(root.classList.contains('dark')));
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    system.addEventListener('change', sync);
    window.addEventListener('storage', onStorage);
    return () => {
      observer.disconnect();
      system.removeEventListener('change', sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  function toggle() {
    const next = !dark;
    const preference = next ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.dataset.themePreference = preference;
    setDark(next);
    try { localStorage.setItem('sethpratt-theme', preference); } catch { /* Keep working without storage. */ }
  }

  return <button type="button" className="theme-btn" onClick={toggle} disabled={!ready} aria-pressed={dark} aria-label="Dark mode" title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
    {dark ? <Sun aria-hidden="true"/> : <Moon aria-hidden="true"/>}
  </button>;
}
