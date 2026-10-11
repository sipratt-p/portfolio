'use client';
import { useEffect, useRef, useState } from 'react';
import type { LabPiece } from '@/lib/lab';
import { EVERDUST } from '@/lib/site';
import PreviewMedia from './preview-media';
import SmartLink from './smart-link';

/** The detail view for every piece on a Lab series page: ONE native modal <dialog>, filled with the piece
 *  that was opened. It opens from any `a[data-detail]` (tile, row, hero) or from the URL hash, so
 *  /lab/strange-attractors#aizawa opens Aizawa directly. Escape, Close, the backdrop and Back all close it;
 *  focus stays inside and returns to the tile; the page behind does not scroll. A click starts the
 *  piece's silent loop; a deep link shows the still until the visitor presses play.
 *  (One client-filled dialog rather than one server-rendered dialog per piece keeps the page light.) */
export default function LabDetails({ series, pieces }: { series: string; pieces: LabPiece[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [id, setId] = useState<string | null>(null);
  const openId = useRef<string | null>(null);
  const pending = useRef<{ play: boolean; trigger: HTMLElement | null }>({ play: false, trigger: null });
  const p = pieces.find(x => x.id === id) ?? null;

  // Show or hide the native dialog when the chosen piece changes.
  useEffect(() => {
    const d = ref.current; if (!d) return;
    openId.current = p?.id ?? null;
    if (!p) { if (d.open) d.close(); return; }
    if (!d.open) { document.documentElement.classList.add('detail-open'); d.showModal(); }
    d.querySelector('.detail-scroll')?.scrollTo(0, 0);
    if (pending.current.play && !matchMedia('(prefers-reduced-motion: reduce)').matches) d.querySelector<HTMLButtonElement>('.preview-btn[aria-pressed="false"]')?.click();
    pending.current.play = false;
  }, [p]);

  useEffect(() => {
    const d = ref.current; if (!d) return;
    const has = (x: string) => pieces.some(q => q.id === x);
    const hashId = () => { try { return decodeURIComponent(location.hash.slice(1)); } catch { return ''; } };
    const sync = () => { const h = hashId(); setId(h && has(h) ? h : null); };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[data-detail]');
      const x = a?.dataset.detail; if (!a || !x || !has(x)) return;
      e.preventDefault();
      pending.current = { play: true, trigger: a };
      if (hashId() !== x) history.pushState({ labDetail: x }, '', '#' + x);
      setId(x);
    };
    const onClose = () => {
      const closed = openId.current;
      document.documentElement.classList.remove('detail-open');
      setId(null);
      // Closed by the visitor (not by Back): take the hash back off the URL.
      if (closed && hashId() === closed) {
        if (history.state?.labDetail === closed) history.back();
        else history.replaceState(history.state, '', location.pathname + location.search);
      }
      const t = pending.current.trigger;
      (t?.isConnected ? t : closed ? document.querySelector<HTMLElement>(`a[data-detail="${CSS.escape(closed)}"]`) : null)?.focus({ preventScroll: true });
      pending.current.trigger = null;
    };
    const onDialogClick = (e: MouseEvent) => { if (e.target === d || (e.target as Element).closest('[data-close]')) d.close(); };
    const onKey = (e: KeyboardEvent) => {
      if (!d.open || e.key !== 'Tab') return;
      const f = [...d.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(el => el.getClientRects().length > 0);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1], a = document.activeElement;
      if (e.shiftKey && (a === first || !d.contains(a))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (a === last || !d.contains(a))) { e.preventDefault(); first.focus(); }
    };
    d.addEventListener('close', onClose); d.addEventListener('click', onDialogClick);
    document.addEventListener('click', onClick); document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', sync); window.addEventListener('hashchange', sync);
    sync();
    return () => {
      d.removeEventListener('close', onClose); d.removeEventListener('click', onDialogClick);
      document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync);
    };
  }, [pieces]);

  const links = p ? [...(p.links ?? []), ...(p.everdust ? [{ label: 'See it in Everdust', href: EVERDUST }] : [])] : [];
  return <dialog ref={ref} className="detail" id="lab-detail" aria-labelledby="lab-detail-h" data-piece={p?.id}>
    {p && <>
      <button type="button" className="detail-close" data-close=""><span className="x" aria-hidden="true"/>Close</button>
      <div className="detail-scroll">
        {p.image && <PreviewMedia key={p.id} className="detail-media" image={p.image} alt={p.alt ?? p.title} loop={p.loop} loopSeconds={p.loopSeconds} sizes="(max-width: 960px) 100vw, 920px" hover={false} eager/>}
        <div className={'detail-body' + (p.image ? '' : ' text-only')}>
          <p className="kicker">{series}</p>
          <h2 className="h2" id="lab-detail-h">{p.title}</h2>
          <p className="label detail-label"><span className="ty">{p.type}</span>&nbsp;<span className="sep" aria-hidden="true">—</span> {p.fact}</p>
          {p.about && <p className="body detail-about">{p.about}</p>}
          {p.note && <p className="detail-note"><span className="eyebrow">Honest note</span>{p.note}</p>}
          {p.status && <p className="status">{p.status}</p>}
          {links.length > 0 && <div className="detail-links">{links.map(l => <SmartLink key={l.href} className="btn btn-sm btn-secondary" href={l.href}>{l.label}</SmartLink>)}</div>}
        </div>
      </div>
    </>}
  </dialog>;
}
