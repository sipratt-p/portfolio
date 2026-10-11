'use client';
import { useEffect, useState } from 'react';

/** Topic filters for the Work index. Without JavaScript every card stays visible. */
export default function WorkFilter({ topics, counts, total, label = 'Filter work by topic' }: { topics: string[]; counts: Record<string, number>; total: number; label?: string }) {
  const [active, setActive] = useState<string>('All');
  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.replace('#', '')).toLowerCase();
      const t = topics.find(t => t.toLowerCase() === h);
      if (t) setActive(t);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [topics]);
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-topics]').forEach(card => {
      card.hidden = active !== 'All' && !(card.dataset.topics ?? '').split(' ').includes(active);
    });
  }, [active]);
  const choose = (t: string) => { setActive(t); history.replaceState(null, '', t === 'All' ? location.pathname : '#' + t.toLowerCase()); };
  return <div className="filters" role="group" aria-label={label}>
    {['All', ...topics].map(t => <button key={t} type="button" className="filter" aria-pressed={active === t} onClick={() => choose(t)}>
      {t}<span className="n">{t === 'All' ? total : counts[t] ?? 0}</span>
    </button>)}
    <p className="sr-only" aria-live="polite">{active === 'All' ? `Showing all ${total}` : `Showing ${counts[active] ?? 0} in ${active}`}</p>
  </div>;
}
