import type { ReactNode } from 'react';
/** Off-site links get ↗ and open in a new tab; internal links get →. No exceptions. */
export const isOffsite = (href: string) => /^https?:\/\//.test(href);
export function Arrow({ href }: { href: string }) {
  if (href.startsWith('mailto:')) return null;
  return isOffsite(href) ? <span className="arr out" aria-hidden="true">↗</span> : <span className="arr in" aria-hidden="true">→</span>;
}
export default function SmartLink({ href, children, className = 'link', arrow = true }: { href: string; children: ReactNode; className?: string; arrow?: boolean }) {
  const ext = isOffsite(href);
  return <a className={className} href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
    {children}{arrow && <> <Arrow href={href}/></>}{ext && <span className="sr-only"> (opens in a new tab)</span>}
  </a>;
}
