'use client';
// A short, silent, seamless loop cut from one of our real-data films. Its poster loads when it comes near the viewport and the video only when it is on screen,
// plays muted while at least a third of it is on screen, pauses when it leaves, and never auto-plays for readers who
// prefer reduced motion. A Pause/Play button is always there (moving content longer than 5 s must be pausable).
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_BASE } from './common';

export type LoopMeta = { id: string; title: string; caption: string; alt: string; width: number; height: number; seconds: number };

/** `bare` drops the caption, for a card that already says what the loop is (the home flagship). */
export default function SectionLoop({ loop, base = DEFAULT_BASE, hero = false, bare = false }: { loop: LoopMeta; base?: string; hero?: boolean; bare?: boolean }) {
  const box = useRef<HTMLDivElement>(null), vid = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [near, setNear] = useState(false);
  const userPaused = useRef(false), reduce = useRef(false), inView = useRef(false);
  const src = `${base}loops/${loop.id}.mp4`, poster = `${base}loops/${loop.id}.webp`;
  useEffect(() => {
    const el = box.current, v = vid.current; if (!el || !v) return;
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) setState('paused');
    const load = () => { if (!v.getAttribute('src')) { v.setAttribute('src', src); v.preload = 'auto'; } };
    const nearObs = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { setNear(true); nearObs.disconnect(); } }, { rootMargin: '900px 0px' });
    const vis = new IntersectionObserver(es => {
      inView.current = es[0].isIntersecting;
      if (inView.current && !userPaused.current && !reduce.current) { load(); v.muted = true; void v.play().then(() => setState('playing'), () => setState('paused')); }
      else if (!inView.current && !v.paused) { v.pause(); if (!userPaused.current && !reduce.current) setState('idle'); }
    }, { threshold: 0.35 });
    nearObs.observe(el); vis.observe(el);
    return () => { nearObs.disconnect(); vis.disconnect(); };
  }, [src]);
  const toggle = () => {
    const v = vid.current; if (!v) return;
    if (v.paused) { userPaused.current = false; if (!v.getAttribute('src')) v.setAttribute('src', src); v.muted = true; void v.play().then(() => setState('playing'), () => {}); }
    else { userPaused.current = true; v.pause(); setState('paused'); }
  };
  const tall = loop.height > loop.width;
  return <figure className={'llmt-loop' + (tall ? ' tall' : '') + (hero ? ' llmt-hero' : '') + (bare ? ' bare' : '')}>
    <div className="llmt-loop-media" ref={box} style={{ aspectRatio: `${loop.width} / ${loop.height}` }}>
      <video ref={vid} muted loop playsInline preload="none" poster={near ? poster : undefined} width={loop.width} height={loop.height} aria-label={loop.alt} disablePictureInPicture/>
      <button type="button" className="llmt-loop-btn" onClick={toggle} aria-label={state === 'playing' ? `Pause ${loop.title}` : `Play ${loop.title}`}>
        <span aria-hidden="true">{state === 'playing' ? '❚❚' : '▶'}</span>{state === 'playing' ? 'Pause' : 'Play'}
      </button>
    </div>
    {!bare && <figcaption><strong>{loop.title}.</strong> {loop.caption} <span className="llmt-loop-meta">{loop.seconds} s silent loop.</span></figcaption>}
  </figure>;
}
