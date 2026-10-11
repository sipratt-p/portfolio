'use client';
import { useEffect, useRef, useState } from 'react';
import { img, loopSrc } from '@/lib/lab';

/** A poster still with an optional silent loop (≤ 6 s, muted, no audio track) that plays only on
 *  hover (desktop) or when the button is pressed (touch). Never autoplays; respects reduced motion.
 *  `hover={false}` turns hover-to-play off (the detail dialog starts the loop from the click that opened it). */
export default function PreviewMedia({ image, alt, pos, loop, loopSeconds = 6, sizes = '(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw', className = '', eager = false, hover = true }:
  { image: string; alt: string; pos?: string; loop?: string; loopSeconds?: number; sizes?: string; className?: string; eager?: boolean; hover?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = video.current; if (!v || !loop) return;
    if (!v.getAttribute('src')) v.setAttribute('src', loopSrc(loop));
    v.muted = true;
    void v.play().catch(() => {});
    setPlaying(true);
  };
  const stop = () => {
    const v = video.current; if (!v) return;
    v.pause(); try { v.currentTime = 0; } catch { /* not loaded yet */ }
    setPlaying(false);
  };

  useEffect(() => {
    const el = box.current; if (!el || !loop || !hover) return;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduce) return;
    // Hover anywhere on the card (or the hero figure, whose caption link covers it) plays the loop.
    const card = el.closest('.card, .hero-fig') ?? el;
    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    return () => { card.removeEventListener('mouseenter', play); card.removeEventListener('mouseleave', stop); };
  }, [loop, hover]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={box} className={'media ' + className + (playing ? ' is-playing' : '')}>
    <img src={img(image)} srcSet={`${img(image, 800)} 800w, ${img(image)} 1600w`} sizes={sizes} alt={alt} width={1600} height={900}
      loading={eager ? 'eager' : 'lazy'} decoding="async" style={pos ? { objectPosition: pos } : undefined}/>
    {loop && <>
      <video ref={video} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture/>
      <button type="button" className="preview-btn" aria-pressed={playing} onClick={e => { e.preventDefault(); e.stopPropagation(); if (playing) stop(); else play(); }}>
        <span className="tri" aria-hidden="true"/>{loopSeconds} s silent preview
      </button>
    </>}
  </div>;
}
