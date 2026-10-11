'use client';
// Shared pieces for the "Watching a language model think" figures. Plain React + SVG/canvas, no chart library.
// Data is small precomputed JSON (real model outputs), fetched only when the figure scrolls near the viewport.
import { useEffect, useRef, useState, type ReactNode } from 'react';

export const DEFAULT_BASE = '/media/writing/llm-thought/';

/** True once the element has come within `margin` of the viewport (and stays true). */
export function useNear<T extends Element>(margin = '400px'): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === 'undefined') { setNear(true); return; }
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { setNear(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [near, margin]);
  return [ref, near];
}

const cache = new Map<string, Promise<unknown>>();
export function useJSON<T>(url: string, enabled: boolean): { data: T | null; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled || data) return;
    let live = true;
    if (!cache.has(url)) cache.set(url, fetch(url).then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); }));
    cache.get(url)!.then(d => { if (live) setData(d as T); }, e => { if (live) setError(String(e)); });
    return () => { live = false; };
  }, [url, enabled, data]);
  return { data, error };
}

/** Measured content width of an element (for SVG charts drawn at 1 unit = 1 CSS pixel, so text stays readable). */
export function useWidth<T extends Element>(initial = 640): [React.RefObject<T | null>, number] {
  const ref = useRef<T | null>(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(es => { const v = Math.round(es[0].contentRect.width); if (v > 0) setW(v); });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/** Re-renders when the site theme flips (html.dark) or the OS scheme changes, so canvas colours follow. */
export function useThemeTick(): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick(t => t + 1);
    const mo = new MutationObserver(bump);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', bump);
    return () => { mo.disconnect(); mq.removeEventListener('change', bump); };
  }, []);
  return tick;
}

export function cssVar(el: Element | null, name: string, fallback = '#888'): string {
  if (!el) return fallback;
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}

/** Visible token text: a leading space becomes a faint dot so word pieces read honestly. */
export function Tok({ t, className }: { t: string; className?: string }) {
  const lead = t.startsWith(' ');
  const body = (lead ? t.slice(1) : t).replace(/\n/g, '↵');
  return <span className={'tok' + (className ? ' ' + className : '')}>{lead && <span className="tok-sp" aria-hidden="true">·</span>}{body === '' ? '␣' : body}</span>;
}
/** Plain-text version of a token for aria labels. */
export const tokText = (t: string) => (t.startsWith(' ') ? t.slice(1) : t).replace(/\n/g, ' newline ') || 'space';

export const pct = (p: number, d = 1) => {
  const v = p * 100;
  if (v > 0 && v < 0.1) return '<0.1%';
  return (v >= 10 || d === 0 ? v.toFixed(d === 0 ? 0 : 1) : v.toFixed(d)).replace(/\.0$/, '') + '%';
};

export type Fallback = { src: string; alt: string; width: number; height: number };

/** Figure frame: number, title, model badge, interactive body (lazy) or a static fallback image, caption. */
export function FigureShell({ id, n, title, model, caption, fallback, base, file, children, extraFiles = [] }: {
  id: string; n: number; title: string; model: string; caption: ReactNode; fallback: Fallback; base: string; file: string;
  extraFiles?: string[]; children: (data: any) => ReactNode;
}) {
  const [ref, near] = useNear<HTMLElement>();
  const { data, error } = useJSON<unknown>(base + file, near);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  void extraFiles;
  return <figure className="llmt-fig" id={id} ref={ref} aria-labelledby={id + '-t'}>
    <div className="llmt-head">
      <p className="llmt-n mono">Figure {n}</p>
      <h3 className="llmt-title" id={id + '-t'}>{title}</h3>
      <p className="llmt-model">{model}</p>
    </div>
    <div className="llmt-body">
      {mounted && data && !error ? children(data)
        : error ? <><img className="llmt-fallback" src={fallback.src} alt={fallback.alt} width={fallback.width} height={fallback.height} loading="lazy" decoding="async"/>
            <p className="llmt-err small">The interactive version could not load; this image shows the same data.</p></>
        : <>
            <noscript><img className="llmt-fallback" src={fallback.src} alt={fallback.alt} width={fallback.width} height={fallback.height} loading="lazy" decoding="async"/></noscript>
            <div className="llmt-ph" style={{ aspectRatio: `${fallback.width} / ${fallback.height}` }} role="img" aria-label={fallback.alt}><p className="small">Loading the interactive figure…</p></div>
          </>}
    </div>
    <figcaption>{caption}</figcaption>
  </figure>;
}

/** Small segmented control (radio group) that works with arrow keys. */
export function Segmented<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return <div className="llmt-seg" role="radiogroup" aria-label={label}>
    {options.map((o, i) => <button key={String(o.v)} type="button" role="radio" aria-checked={o.v === value} tabIndex={o.v === value ? 0 : -1}
      className={o.v === value ? 'on' : ''} onClick={() => onChange(o.v)}
      onKeyDown={e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); onChange(options[(i + 1) % options.length].v); (e.currentTarget.parentElement?.children[(i + 1) % options.length] as HTMLElement)?.focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const j = (i - 1 + options.length) % options.length; onChange(options[j].v); (e.currentTarget.parentElement?.children[j] as HTMLElement)?.focus(); }
      }}>{o.label}</button>)}
  </div>;
}

/** A disclosure with the figure's numbers as a plain table (the accessible twin of the chart). */
export function DataTable({ summary, headers, rows, caption }: { summary: string; headers: string[]; rows: (string | number)[][]; caption: string }) {
  return <details className="llmt-table">
    <summary>{summary}</summary>
    <div className="llmt-table-wrap" tabIndex={0} role="region" aria-label={caption}>
      <table><caption className="sr-only">{caption}</caption>
        <thead><tr>{headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  </details>;
}
