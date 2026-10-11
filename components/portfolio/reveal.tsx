'use client';
import { useEffect } from 'react';
/** Subtle entrance motion for [data-reveal] blocks. Off for reduced motion and when JS is unavailable. */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const vh = window.innerHeight;
    // Anything already on screen stays put; only content below the fold animates in.
    const below = items.filter(el => el.getBoundingClientRect().top > vh * 0.92);
    if (!below.length) return;
    root.classList.add('reveal-on');
    items.forEach(el => { if (!below.includes(el)) el.classList.add('in'); });
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    below.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
