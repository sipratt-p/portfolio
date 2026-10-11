'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '@/components/portfolio/theme-toggle';
import { nav, EMAIL } from '@/lib/site';

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lab = pathname === '/lab' || pathname.startsWith('/lab/');
  const current = (match: readonly string[]) => match.some(m => pathname === m || pathname.startsWith(m + '/'));

  useEffect(() => {
    // The Lab is dark in both modes; keep overscroll and the browser chrome dark there too.
    document.documentElement.dataset.room = lab ? 'lab' : 'work';
  }, [lab]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('drawer-open');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('drawer-open'); document.removeEventListener('keydown', onKey); toggleRef.current?.focus(); };
  }, [open]);

  return <>
    <header className={'site-header' + (lab ? ' lab' : '')}>
      <div className="wrap nav-in">
        <a className="wordmark" href="/"><span className="mark" aria-hidden="true"/>Seth Pratt</a>
        <nav className="nav-links" aria-label="Main navigation">
          {nav.map(item => <a key={item.href} href={item.href} aria-current={current(item.match) ? 'page' : undefined}>{item.label}</a>)}
        </nav>
        <div className="nav-actions">
          <ThemeToggle/>
          <a className="btn btn-sm btn-secondary" href="/resume" aria-current={pathname === '/resume' ? 'page' : undefined}>Résumé</a>
          <a className="btn btn-sm btn-primary" href="#contact">Get in touch</a>
        </div>
        <div className="mobile-tools">
          <ThemeToggle/>
          <button ref={toggleRef} className="nav-toggle" type="button" aria-expanded={open} aria-controls="site-drawer" onClick={() => setOpen(true)}><span className="bars" aria-hidden="true"/>Menu</button>
        </div>
      </div>
    </header>
    <div className={'drawer' + (lab ? ' lab' : '')} id="site-drawer" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
      <div className="drawer-head">
        <a className="wordmark" href="/"><span className="mark" aria-hidden="true"/>Seth Pratt</a>
        <button ref={closeRef} className="drawer-close" type="button" onClick={() => setOpen(false)}><span className="x" aria-hidden="true"/>Close</button>
      </div>
      <nav className="drawer-links" aria-label="Mobile navigation">
        <a href="/" aria-current={pathname === '/' ? 'page' : undefined} onClick={() => setOpen(false)}>Home</a>
        {nav.map(item => <a key={item.href} href={item.href} aria-current={current(item.match) ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <div className="drawer-actions">
        <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>Get in touch</a>
        <a className="btn btn-secondary" href="/resume" onClick={() => setOpen(false)}>Résumé</a>
      </div>
      <p className="drawer-foot"><span>{EMAIL}</span><span>Applied AI Product Leader</span></p>
    </div>
  </>;
}
