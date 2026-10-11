'use client';

import { usePathname } from 'next/navigation';
import { EMAIL, LINKEDIN, GITHUB, X_URL } from '@/lib/site';

export default function Footer() {
  const pathname = usePathname() || '/';
  const lab = pathname === '/lab' || pathname.startsWith('/lab/');
  return <footer className={'site-footer' + (lab ? ' lab' : '')} id="contact">
    <div className="wrap">
      <div className="foot-cta">
        <div>
          <h2 className="foot-title">Get in <em>touch</em></h2>
          <p className="body foot-sub">Questions about the work, a benchmark, or anything in the Lab: email is best.</p>
        </div>
        <div className="foot-contact">
          <a className="foot-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className="actions">
            <a className="btn btn-sm btn-secondary" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <span className="arr out" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            <a className="btn btn-sm btn-secondary" href={GITHUB} target="_blank" rel="noreferrer">GitHub <span className="arr out" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            <a className="btn btn-sm btn-secondary" href={X_URL} target="_blank" rel="noreferrer">X <span className="arr out" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </div>
      <div className="foot-base">
        <span>© {new Date().getFullYear()} Seth Pratt · Applied AI Product Leader</span>
        <nav className="foot-links" aria-label="Footer">
          <a href="/work">Work</a><a href="/lab">Lab</a><a href="/writing">Writing</a><a href="/about">About</a><a href="/resume">Résumé</a><a href="/how-i-write">How I write</a><a href="/rss.xml">RSS</a>
        </nav>
      </div>
    </div>
  </footer>;
}
