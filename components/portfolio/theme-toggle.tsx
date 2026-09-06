'use client';

import { useEffect, useId, useState } from 'react';
import { Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ThemeToggle() {
  const id = useId();
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
    system.addEventListener('change', sync);
    window.addEventListener('storage', onStorage);
    return () => {
      system.removeEventListener('change', sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  function changeTheme(next: boolean) {
    const preference = next ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.dataset.themePreference = preference;
    setDark(next);
    try { localStorage.setItem('sethpratt-theme', preference); } catch { /* Keep working without storage. */ }
  }

  return <div className="theme-toggle">
    <label htmlFor={id}><Moon size={15} aria-hidden="true"/><span>Dark<span className="sr-only"> mode</span></span></label>
    <Switch id={id} checked={dark} onCheckedChange={changeTheme} disabled={!ready} aria-label="Dark mode"/>
  </div>;
}
