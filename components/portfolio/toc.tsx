'use client';
import { useEffect, useState } from 'react';
/** On-page contents with the section in view highlighted. */
export default function Toc({ items, label = 'On this page' }: { items: { id: string; title: string }[]; label?: string }) {
  const [on, setOn] = useState(items[0]?.id);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) setOn(e.target.id);
    }, { rootMargin: '-25% 0px -65% 0px' });
    items.forEach(i => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return <nav className="toc" aria-label={label}>
    <p className="eyebrow">{label}</p>
    <ol>{items.map(i => <li key={i.id}><a href={'#' + i.id} className={on === i.id ? 'on' : undefined} aria-current={on === i.id ? 'location' : undefined}>{i.title}</a></li>)}</ol>
  </nav>;
}
