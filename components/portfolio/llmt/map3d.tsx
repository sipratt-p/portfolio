'use client';
// Figure: Map vs truth, in 3-D. 32,768 real Qwen3-1.7B tokens on the Latent VII map (a UMAP projection of the
// 151,643 x 2,048 embedding matrix), drawn as glowing additive points with a small hand-written WebGL renderer.
// Pick a word: its 15 TRUE nearest neighbours (cosine similarity in the full 2,048-d space) light up, and you see which
// ones the map kept near it. Falls back to a 2-D canvas when WebGL is missing.
import { useEffect, useMemo, useRef, useState } from 'react';
import { FigureShell, Segmented, Tok, tokText, pct, DataTable, DEFAULT_BASE } from './common';

type Anchor = { p: number; w: string; true: number[]; map: number[]; kept: number };
type Meta = { n: number; vocab: number; range: number; labels: Record<string, string>; anchors: Anchor[];
  stats: { tokens: number; kept15: number; within100: number; spearman_random_pairs: number; by_family: { family: string; n: number; kept15: number; within100: number }[] } };
type Pts = { pos: Float32Array; col: Float32Array; size: Float32Array; n: number };
const FEATURED = [' Paris', ' Rome', ' afraid', ' king', ' seven', ' beautiful', ' blue', ' Col', 'um', ' bank', ' Python', ' city'];
const C = { kept: [0.36, 0.66, 1.0], lost: [1.0, 0.48, 0.27], imp: [0.16, 0.8, 0.56], anchor: [1.0, 0.86, 0.6] };
const css = (c: number[]) => `rgb(${c.map(v => Math.round(v * 255)).join(',')})`;

// Latent VII palette (same hues as the film): family -> hue, k-means sub-cluster -> small hue jitter
function hsv(h: number, s: number, v: number): [number, number, number] {
  const k = (n: number) => { const x = Math.abs(((h * 6 + n) % 6 + 6) % 6 - 3) - 1; return Math.min(1, Math.max(0, x)); };
  return [v * (1 - s + s * k(0)), v * (1 - s + s * k(4)), v * (1 - s + s * k(2))];
}
function famCol(f: number, km: number): [number, number, number] {
  const jit = (((km * 0.618) % 1) - 0.5) * 0.1;
  switch (f) {
    case 0: return hsv(0.525 + jit, 0.86, 1.0); case 1: return hsv(0.625 + jit, 0.85, 0.95); case 2: return hsv(0.935 + jit, 0.82, 1.0);
    case 3: return hsv(0.36 + jit, 0.85, 0.95); case 4: return hsv(0.075 + jit * 0.5, 0.9, 1.0); case 5: return hsv(0.14, 0.85, 1.0);
    case 6: return hsv(0.77 + jit, 0.6, 0.95); default: return hsv(0.6, 0.25, 0.45);
  }
}
function decode(buf: ArrayBuffer, n: number, R: number): Pts {
  const i16 = new Int16Array(buf, 0, 3 * n), u8 = new Uint8Array(buf, 6 * n, 3 * n);
  const K = 3, pos = new Float32Array(3 * n * K), col = new Float32Array(3 * n * K), size = new Float32Array(n * K);
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < n; i++) {
    const x = i16[i] / 32767 * R, y = i16[n + i] / 32767 * R, z = i16[2 * n + i] / 32767 * R;
    const c = famCol(u8[i], u8[n + i]), b = 0.5 + 0.25 * (u8[2 * n + i] / 255);
    for (let k = 0; k < K; k++) {
      const j = i * K + k, r = k === 0 ? 0 : 0.006 + 0.012 * rnd(), th = rnd() * 6.283, ph = Math.acos(2 * rnd() - 1);
      pos[3 * j] = x + r * Math.sin(ph) * Math.cos(th); pos[3 * j + 1] = y + r * Math.cos(ph); pos[3 * j + 2] = z + r * Math.sin(ph) * Math.sin(th);
      const g = k === 0 ? b : b * 0.45; col[3 * j] = c[0] * g; col[3 * j + 1] = c[1] * g; col[3 * j + 2] = c[2] * g; size[j] = k === 0 ? 1 : 0.6;
    }
  }
  return { pos, col, size, n: n * K };
}
/** position of token i (the core particle) */
const P3 = (pts: Pts, i: number) => [pts.pos[9 * i], pts.pos[9 * i + 1], pts.pos[9 * i + 2]];

// --- tiny matrix helpers (column-major, like WebGL) ---
const persp = (fov: number, a: number, n: number, f: number) => { const t = 1 / Math.tan(fov / 2); return [t / a, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) / (n - f), -1, 0, 0, 2 * f * n / (n - f), 0]; };
function lookAt(e: number[], c: number[]) {
  let z = [e[0] - c[0], e[1] - c[1], e[2] - c[2]]; const zl = Math.hypot(...z); z = z.map(v => v / zl);
  let x = [z[2], 0, -z[0]]; const xl = Math.hypot(...x) || 1; x = x.map(v => v / xl);   // up = +y
  const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
  return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -(x[0] * e[0] + x[1] * e[1] + x[2] * e[2]), -(y[0] * e[0] + y[1] * e[1] + y[2] * e[2]), -(z[0] * e[0] + z[1] * e[1] + z[2] * e[2]), 1];
}
const mul = (a: number[], b: number[]) => { const o = new Array(16).fill(0); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]; return o; };

type Cam = { yaw: number; pitch: number; dist: number; tx: number; ty: number; tz: number };
const FOV = 0.8;

const VS = `attribute vec3 aPos; attribute vec3 aCol; attribute float aSize; uniform mat4 uM; uniform float uPx; uniform float uMax; uniform float uGain; uniform float uSize; varying vec3 vC;
void main(){ vec4 p = uM * vec4(aPos, 1.0); gl_Position = p; float px = aSize * uSize * uPx / max(p.w, 1e-3); float s = clamp(px, 1.3, uMax);
  float e = min(1.0, (px * px) / (s * s)); vC = aCol * uGain * e * (s > 7.0 ? 7.0 / s + 0.3 : 1.0); gl_PointSize = s; if (p.w <= 0.0) gl_Position = vec4(2.0, 2.0, 2.0, 1.0); }`;
const FS = `precision mediump float; varying vec3 vC; void main(){ vec2 d = gl_PointCoord - 0.5; float r2 = dot(d, d) * 4.0; if (r2 > 1.0) discard; gl_FragColor = vec4(vC * exp(-r2 * 2.6), 1.0); }`;

function useBinary(url: string) {
  const [buf, setBuf] = useState<ArrayBuffer | null>(null); const [err, setErr] = useState<string | null>(null);
  useEffect(() => { let live = true; fetch(url).then(r => { if (!r.ok) throw new Error(String(r.status)); return r.arrayBuffer(); }).then(b => { if (live) setBuf(b); }, e => { if (live) setErr(String(e)); }); return () => { live = false; }; }, [url]);
  return { buf, err };
}

function Cloud({ m, pts }: { m: Meta; pts: Pts }) {
  const wrap = useRef<HTMLDivElement>(null), cv = useRef<HTMLCanvasElement>(null), ov = useRef<HTMLCanvasElement>(null);
  const [w, setW] = useState(640);
  const h = Math.round(Math.min(Math.max(w * 0.82, 320), 540));
  const [sel, setSel] = useState(() => Math.max(0, m.anchors.findIndex(a => a.w === ' Paris')));
  const [mode, setMode] = useState<'whole' | 'close'>('whole');
  const [webgl, setWebgl] = useState(true);
  const [tip, setTip] = useState<string | null>(null);
  const cam = useRef<Cam>({ yaw: 0.7, pitch: 0.25, dist: 2.2, tx: 0, ty: 0, tz: 0 });
  const goal = useRef<Cam | null>(null);
  const idle = useRef(0), visible = useRef(true), last = useRef(0), dirty = useRef(true);
  const drag = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const pinch = useRef<Map<number, { x: number; y: number }>>(new Map());
  const reduce = useRef(false);
  const A = m.anchors[sel];
  const trueSet = useMemo(() => new Set(A.true), [A]); const mapSet = useMemo(() => new Set(A.map), [A]);
  const labelled = useMemo(() => Object.keys(m.labels).map(Number), [m]);
  const anchorOf = useMemo(() => new Map(m.anchors.map((a, k) => [a.p, k])), [m]);

  const frame = (c: Cam) => {   // camera framing for the current mode
    if (mode === 'whole') return { ...c, tx: 0, ty: 0, tz: 0, dist: 2.2 };
    const [ax, ay, az] = P3(pts, A.p);
    const ds = [...A.true, ...A.map].map(t => { const q = P3(pts, t); return Math.hypot(q[0] - ax, q[1] - ay, q[2] - az); }).sort((a, b) => a - b);
    const r = Math.max(ds[Math.floor(ds.length * 0.7)], 0.01);
    return { ...c, tx: ax, ty: ay, tz: az, dist: Math.min(2.7, Math.max(0.06, r / Math.tan(FOV / 2) * 1.25)) };
  };
  useEffect(() => { goal.current = frame(cam.current); dirty.current = true; }, [mode, sel]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { const el = wrap.current; if (!el) return; const ro = new ResizeObserver(es => setW(Math.round(es[0].contentRect.width))); ro.observe(el);
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(es => { visible.current = es[0].isIntersecting; }, { threshold: 0.05 }); io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); }; }, []);

  // GL setup + render loop
  useEffect(() => {
    const c = cv.current, o = ov.current; if (!c || !o) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = w * dpr; c.height = h * dpr; o.width = w * dpr; o.height = h * dpr;
    const gl = c.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'low-power' }) as WebGLRenderingContext | null;
    if (!gl || gl.isContextLost()) { setWebgl(false); return; }
    const sh = (t: number, s: string) => { const x = gl.createShader(t)!; gl.shaderSource(x, s); gl.compileShader(x); return x; };
    const pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { setWebgl(false); return; }
    gl.useProgram(pr);
    const loc = { pos: gl.getAttribLocation(pr, 'aPos'), col: gl.getAttribLocation(pr, 'aCol'), size: gl.getAttribLocation(pr, 'aSize'), m: gl.getUniformLocation(pr, 'uM'), px: gl.getUniformLocation(pr, 'uPx'), max: gl.getUniformLocation(pr, 'uMax'), gain: gl.getUniformLocation(pr, 'uGain'), sz: gl.getUniformLocation(pr, 'uSize') };
    const mk = (data: Float32Array) => { const b = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); return b; };
    const base = { pos: mk(pts.pos), col: mk(pts.col), size: mk(pts.size), n: pts.n };
    // highlight layer: the word, its true neighbours (kept / lost) and the map-only impostors
    const hl: number[] = [], hc: number[] = [], hs: number[] = [];
    const add = (i: number, col: number[], s: number) => { hl.push(...P3(pts, i)); hc.push(...col); hs.push(s); };
    for (const t of A.map) if (!trueSet.has(t)) add(t, C.imp.map(v => v * 0.9), 2.6);
    for (const t of A.true) add(t, (mapSet.has(t) ? C.kept : C.lost).map(v => v * 1.2), 3.2);
    add(A.p, C.anchor.map(v => v * 1.6), 5);
    const hi = { pos: mk(new Float32Array(hl)), col: mk(new Float32Array(hc)), size: mk(new Float32Array(hs)), n: hs.length };
    gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
    const bind = (b: typeof base) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, b.pos); gl.enableVertexAttribArray(loc.pos); gl.vertexAttribPointer(loc.pos, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, b.col); gl.enableVertexAttribArray(loc.col); gl.vertexAttribPointer(loc.col, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, b.size); gl.enableVertexAttribArray(loc.size); gl.vertexAttribPointer(loc.size, 1, gl.FLOAT, false, 0, 0);
    };
    const g2 = o.getContext('2d')!;
    let raf = 0, lost = false;
    const onLost = (e: Event) => { e.preventDefault(); lost = true; setWebgl(false); };
    c.addEventListener('webglcontextlost', onLost);
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (lost) return;
      const dt = Math.min(0.05, (t - (last.current || t)) / 1000); last.current = t;
      const k = cam.current;
      if (goal.current) {   // ease toward the framing goal
        const gq = goal.current, e = reduce.current ? 1 : 1 - Math.exp(-dt * 5);
        k.tx += (gq.tx - k.tx) * e; k.ty += (gq.ty - k.ty) * e; k.tz += (gq.tz - k.tz) * e; k.dist *= Math.pow(gq.dist / k.dist, e);
        if (Math.abs(Math.log(gq.dist / k.dist)) < 1e-3 && Math.hypot(gq.tx - k.tx, gq.ty - k.ty, gq.tz - k.tz) < 1e-4) goal.current = null;
        dirty.current = true;
      }
      idle.current += dt;
      if (!reduce.current && visible.current && idle.current > 2.5 && !drag.current) { k.yaw += dt * 0.07; dirty.current = true; }
      if (!dirty.current || !visible.current) return;
      dirty.current = false;
      const eye = [k.tx + k.dist * Math.cos(k.pitch) * Math.sin(k.yaw), k.ty + k.dist * Math.sin(k.pitch), k.tz + k.dist * Math.cos(k.pitch) * Math.cos(k.yaw)];
      const M = mul(persp(FOV, w / h, 0.005, 20), lookAt(eye, [k.tx, k.ty, k.tz]));
      gl.viewport(0, 0, c.width, c.height); gl.clearColor(0.02, 0.024, 0.04, 1); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniformMatrix4fv(loc.m, false, new Float32Array(M));
      const pxs = (c.height / 2) / Math.tan(FOV / 2);
      gl.uniform1f(loc.px, 0.0065 * pxs); bind(base);
      gl.uniform1f(loc.sz, 4.5); gl.uniform1f(loc.gain, 0.05); gl.uniform1f(loc.max, 26 * dpr); gl.drawArrays(gl.POINTS, 0, base.n);   // soft halo (a cheap bloom)
      gl.uniform1f(loc.sz, 1); gl.uniform1f(loc.gain, 1); gl.uniform1f(loc.max, 9 * dpr); gl.drawArrays(gl.POINTS, 0, base.n);
      bind(hi); gl.uniform1f(loc.sz, 4); gl.uniform1f(loc.gain, 0.12); gl.uniform1f(loc.max, 40 * dpr); gl.drawArrays(gl.POINTS, 0, hi.n);
      gl.uniform1f(loc.sz, 1); gl.uniform1f(loc.gain, 1); gl.uniform1f(loc.max, 22 * dpr); gl.drawArrays(gl.POINTS, 0, hi.n);
      // overlay: lines from the word to its true neighbours, and labels (close-up)
      const P = (i: number) => { const [x, y, zz] = P3(pts, i);
        const cx = M[0] * x + M[4] * y + M[8] * zz + M[12], cy = M[1] * x + M[5] * y + M[9] * zz + M[13], cw = M[3] * x + M[7] * y + M[11] * zz + M[15];
        return cw <= 0 ? null : [(cx / cw * 0.5 + 0.5) * w, (1 - (cy / cw * 0.5 + 0.5)) * h]; };
      (o as HTMLCanvasElement & { _P?: typeof P })._P = P;
      g2.setTransform(dpr, 0, 0, dpr, 0, 0); g2.clearRect(0, 0, w, h);
      const pa = P(A.p);
      if (pa) for (const t of A.true) { const pb = P(t); if (!pb) continue; g2.strokeStyle = css(mapSet.has(t) ? C.kept : C.lost); g2.globalAlpha = mapSet.has(t) ? 0.7 : 0.55; g2.lineWidth = 1.2; g2.beginPath(); g2.moveTo(pa[0], pa[1]); g2.lineTo(pb[0], pb[1]); g2.stroke(); }
      g2.globalAlpha = 1; g2.textBaseline = 'middle';
      const placed: number[][] = [];
      const label = (i: number, text: string, col: string, bold = false) => { const p = P(i); if (!p) return;
        g2.font = `${bold ? 600 : 500} ${bold ? 14 : 12}px Geist, ui-sans-serif, system-ui, sans-serif`; const tw = g2.measureText(text).width, X = p[0] + 8, Yy = p[1];
        if (X < 0 || X + tw > w || Yy < 8 || Yy > h - 8 || placed.some(([x, y, ww, hh]) => X < x + ww && X + tw > x && Math.abs(Yy - y) < hh)) return;
        placed.push([X, Yy, tw, bold ? 18 : 15]); g2.lineWidth = 3; g2.strokeStyle = 'rgba(5,6,10,.85)'; g2.strokeText(text, X, Yy); g2.fillStyle = col; g2.fillText(text, X, Yy); };
      label(A.p, tokText(A.w), '#f2ede3', true);
      if (mode === 'close') { for (const t of A.true) label(t, tokText(m.labels[t] ?? ''), '#f2ede3'); for (const t of A.map) if (!trueSet.has(t)) label(t, tokText(m.labels[t] ?? ''), '#a39e94'); }
    };
    dirty.current = true; raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); c.removeEventListener('webglcontextlost', onLost);
      for (const b of [base.pos, base.col, base.size, hi.pos, hi.col, hi.size]) gl.deleteBuffer(b); gl.deleteProgram(pr); };
  }, [w, h, pts, A, mode, mapSet, trueSet, m]);

  const touch = () => { idle.current = 0; dirty.current = true; };
  const onDown = (e: React.PointerEvent) => { (e.target as Element).setPointerCapture(e.pointerId); pinch.current.set(e.pointerId, { x: e.clientX, y: e.clientY }); drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false }; touch(); };
  const onMove = (e: React.PointerEvent) => {
    const pm = pinch.current;
    if (pm.size === 2 && pm.has(e.pointerId)) {
      const [a, b] = [...pm.values()]; const d0 = Math.hypot(a.x - b.x, a.y - b.y); pm.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a2, b2] = [...pm.values()]; const d1 = Math.hypot(a2.x - b2.x, a2.y - b2.y);
      if (d0 > 0 && d1 > 0) { cam.current.dist = Math.min(4, Math.max(0.05, cam.current.dist * d0 / d1)); goal.current = null; touch(); } return;
    }
    if (drag.current && drag.current.id === e.pointerId) {
      const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
      cam.current.yaw -= dx * 0.006; cam.current.pitch = Math.max(-1.4, Math.min(1.4, cam.current.pitch + dy * 0.006));
      drag.current.x = e.clientX; drag.current.y = e.clientY; pm.set(e.pointerId, { x: e.clientX, y: e.clientY }); touch(); return;
    }
    hoverAt(e, false);
  };
  const hoverAt = (e: React.PointerEvent, click: boolean) => {
    const P = (ov.current as HTMLCanvasElement & { _P?: (i: number) => number[] | null })._P; if (!P) return;
    const r = cv.current!.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
    let best = -1, bd = 16 * 16;
    for (const i of labelled) { const p = P(i); if (!p) continue; const d = (p[0] - mx) ** 2 + (p[1] - my) ** 2; if (d < bd) { bd = d; best = i; } }
    if (best < 0) { setTip(null); return; }
    const t = m.labels[best]; const k = anchorOf.get(best);
    if (click && k !== undefined) { setSel(k); setMode('close'); }
    setTip(`${tokText(t)}${k !== undefined ? ' · tap to pick' : trueSet.has(best) ? (mapSet.has(best) ? ' · true neighbour, kept' : ' · true neighbour, lost by the map') : mapSet.has(best) ? ' · near on the map only' : ''}`);
  };
  const onUp = (e: React.PointerEvent) => { pinch.current.delete(e.pointerId); if (drag.current && !drag.current.moved) hoverAt(e, true); drag.current = null; touch(); };
  const onWheel = (e: React.WheelEvent) => { if (document.activeElement !== cv.current && !e.ctrlKey) return; e.preventDefault(); cam.current.dist = Math.min(4, Math.max(0.05, cam.current.dist * Math.exp(e.deltaY * 0.0012))); goal.current = null; touch(); };
  const onKey = (e: React.KeyboardEvent) => {
    const k = cam.current, s = 0.12;
    const act: Record<string, () => void> = { ArrowLeft: () => { k.yaw += s; }, ArrowRight: () => { k.yaw -= s; }, ArrowUp: () => { k.pitch = Math.min(1.4, k.pitch + s); }, ArrowDown: () => { k.pitch = Math.max(-1.4, k.pitch - s); },
      '+': () => { k.dist = Math.max(0.05, k.dist / 1.2); goal.current = null; }, '=': () => { k.dist = Math.max(0.05, k.dist / 1.2); goal.current = null; }, '-': () => { k.dist = Math.min(4, k.dist * 1.2); goal.current = null; } };
    if (act[e.key]) { e.preventDefault(); act[e.key](); touch(); }
  };
  const zoom = (f: number) => { cam.current.dist = Math.min(4, Math.max(0.05, cam.current.dist * f)); goal.current = null; touch(); };
  const lost = A.true.filter(t => !mapSet.has(t)), keptL = A.true.filter(t => mapSet.has(t)), imp = A.map.filter(t => !trueSet.has(t));
  if (!webgl) return <Map2D m={m} pts={pts} sel={sel} setSel={setSel}/>;
  return <div className="map3d">
    <div className="llmt-controls">
      <div className="map-chips" role="group" aria-label="Pick a word">
        {FEATURED.map(wd => { const k = m.anchors.findIndex(a => a.w === wd); if (k < 0) return null;
          return <button key={wd} type="button" className={'chip' + (k === sel ? ' on' : '')} aria-pressed={k === sel} onClick={() => { setSel(k); setMode('close'); }}>{tokText(wd)}{wd.startsWith(' ') ? '' : ' (piece)'}</button>; })}
        <label className="map-more"><span className="sr-only">More words</span>
          <select value={sel} onChange={e => { setSel(+e.target.value); setMode('close'); }}>{m.anchors.map((a, k) => <option key={k} value={k}>{tokText(a.w)}{a.w.startsWith(' ') ? '' : ' (piece)'}</option>)}</select>
        </label>
      </div>
      <Segmented label="View" value={mode} onChange={setMode} options={[{ v: 'whole', label: 'Whole map' }, { v: 'close', label: 'Close-up' }]}/>
    </div>
    <div className="map-space" ref={wrap} style={{ height: h }}>
      <canvas ref={cv} className="map-gl" style={{ width: '100%', height: h }} tabIndex={0} role="img"
        aria-label={`3-D cloud of ${m.n.toLocaleString('en-US')} of the model's tokens. “${tokText(A.w)}” is picked: ${A.kept} of its 15 true nearest neighbours are also among its 15 nearest points on the map. Drag or use the arrow keys to turn it; plus and minus zoom.`}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={() => setTip(null)} onWheel={onWheel} onKeyDown={onKey}/>
      <canvas ref={ov} className="map-ov" style={{ width: '100%', height: h }} aria-hidden="true"/>
      <div className="map-zoom"><button type="button" aria-label="Zoom in" onClick={() => zoom(1 / 1.35)}>+</button><button type="button" aria-label="Zoom out" onClick={() => zoom(1.35)}>−</button></div>
      <p className="map-tip small" aria-live="polite">{tip ?? 'Drag to orbit · pinch or the buttons to zoom · tap a bright word'}</p>
    </div>
    <div className="map-legend small">
      <span><i className="lg-dot" style={{ background: css(C.anchor) }}/>the word</span>
      <span><i className="lg-line" style={{ background: css(C.kept) }}/>true neighbour, also near on the map</span>
      <span><i className="lg-line" style={{ background: css(C.lost) }}/>true neighbour, elsewhere on the map</span>
      <span><i className="lg-dot" style={{ background: css(C.imp) }}/>near on the map, not a true neighbour</span>
    </div>
    <Lists m={m} A={A} keptL={keptL} lost={lost} imp={imp}/>
  </div>;
}

function Lists({ m, A, keptL, lost, imp }: { m: Meta; A: Anchor; keptL: number[]; lost: number[]; imp: number[] }) {
  return <div className="map-score">
    <p className="map-big"><strong>{A.kept} of 15</strong> true neighbours of “{tokText(A.w)}” are also among its 15 nearest points on the map.</p>
    <div className="map-lists">
      <div><p className="eyebrow">Kept on the map ({keptL.length})</p><p className="tok-list">{keptL.map(t => <span key={t} className="tk s1"><Tok t={m.labels[t]}/></span>)}</p></div>
      <div><p className="eyebrow">Lost: elsewhere on the map ({lost.length})</p><p className="tok-list">{lost.map(t => <span key={t} className="tk s2"><Tok t={m.labels[t]}/></span>)}</p></div>
      <div><p className="eyebrow">On the map, not true neighbours ({imp.length})</p><p className="tok-list">{imp.map(t => <span key={t} className="tk s3"><Tok t={m.labels[t]}/></span>)}</p></div>
    </div>
  </div>;
}

/** 2-D canvas fallback (no WebGL): the same points, orthographic, drag to turn. */
function Map2D({ m, pts, sel, setSel }: { m: Meta; pts: Pts; sel: number; setSel: (k: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null), cv = useRef<HTMLCanvasElement>(null);
  const [w, setW] = useState(640); const h = Math.round(Math.min(Math.max(w * 0.8, 300), 480));
  const [rot, setRot] = useState({ yaw: 0.7, pitch: 0.25 }); const drag = useRef<{ x: number; y: number } | null>(null);
  const A = m.anchors[sel]; const mapSet = useMemo(() => new Set(A.map), [A]); const trueSet = useMemo(() => new Set(A.true), [A]);
  useEffect(() => { const el = wrap.current; if (!el) return; const ro = new ResizeObserver(es => setW(Math.round(es[0].contentRect.width))); ro.observe(el); return () => ro.disconnect(); }, []);
  useEffect(() => {
    const c = cv.current; if (!c) return; const dpr = Math.min(window.devicePixelRatio || 1, 2); c.width = w * dpr; c.height = h * dpr;
    const g = c.getContext('2d')!; g.setTransform(dpr, 0, 0, dpr, 0, 0); g.fillStyle = '#05060a'; g.fillRect(0, 0, w, h);
    const cy = Math.cos(rot.yaw), sy = Math.sin(rot.yaw), cp = Math.cos(rot.pitch), sp = Math.sin(rot.pitch), sc = Math.min(w, h) * 0.46;
    const P = (i: number) => { const [x, y, z] = P3(pts, i); const x1 = cy * x - sy * z, z1 = sy * x + cy * z; return [w / 2 + x1 * sc, h / 2 - (cp * y - sp * z1) * sc]; };
    g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < pts.n / 3; i += 1) { const p = P(i); g.fillStyle = `rgb(${pts.col[9 * i] * 255 | 0},${pts.col[9 * i + 1] * 255 | 0},${pts.col[9 * i + 2] * 255 | 0})`; g.fillRect(p[0], p[1], 1.4, 1.4); }
    g.globalCompositeOperation = 'source-over';
    const pa = P(A.p);
    for (const t of A.true) { const pb = P(t); g.strokeStyle = css(mapSet.has(t) ? C.kept : C.lost); g.beginPath(); g.moveTo(pa[0], pa[1]); g.lineTo(pb[0], pb[1]); g.stroke(); }
    g.fillStyle = css(C.anchor); g.beginPath(); g.arc(pa[0], pa[1], 5, 0, 7); g.fill();
    g.font = '600 14px Geist, ui-sans-serif, system-ui, sans-serif'; g.fillStyle = '#f2ede3'; g.fillText(tokText(A.w), pa[0] + 8, pa[1]);
    void trueSet;
  }, [w, h, rot, pts, A, mapSet, trueSet]);
  const lost = A.true.filter(t => !mapSet.has(t)), keptL = A.true.filter(t => mapSet.has(t)), imp = A.map.filter(t => !trueSet.has(t));
  return <div className="map3d">
    <div className="llmt-controls"><label className="map-more">Word <select value={sel} onChange={e => setSel(+e.target.value)}>{m.anchors.map((a, k) => <option key={k} value={k}>{tokText(a.w)}</option>)}</select></label></div>
    <div className="map-space" ref={wrap} style={{ height: h }}><canvas ref={cv} style={{ width: '100%', height: h }} tabIndex={0} role="img" aria-label={`2-D view of the token map centred on ${tokText(A.w)}; ${A.kept} of 15 true neighbours kept. Arrow keys turn it.`}
      onPointerDown={e => { drag.current = { x: e.clientX, y: e.clientY }; }} onPointerUp={() => { drag.current = null; }}
      onPointerMove={e => { if (!drag.current) return; const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y; drag.current = { x: e.clientX, y: e.clientY }; setRot(r => ({ yaw: r.yaw + dx * 0.008, pitch: Math.max(-1.4, Math.min(1.4, r.pitch + dy * 0.008)) })); }}
      onKeyDown={e => { const s = 0.12; if (e.key === 'ArrowLeft') setRot(r => ({ ...r, yaw: r.yaw - s })); if (e.key === 'ArrowRight') setRot(r => ({ ...r, yaw: r.yaw + s })); }}/></div>
    <Lists m={m} A={A} keptL={keptL} lost={lost} imp={imp}/>
  </div>;
}

function Loader({ m, base }: { m: Meta; base: string }) {
  const { buf, err } = useBinary(base + 'map3d.bin');
  const pts = useMemo(() => (buf ? decode(buf, m.n, m.range) : null), [buf, m.n, m.range]);
  const st = m.stats;
  return <>
    {pts ? <Cloud m={m} pts={pts}/> : <div className="llmt-ph" style={{ aspectRatio: '5 / 4' }}><p className="small">{err ? 'The points could not load.' : `Loading ${m.n.toLocaleString('en-US')} points…`}</p></div>}
    <div className="llmt-stats">
      <div><p className="stat-n">{pct(st.kept15, 0)}</p><p className="small">of every token’s 15 true neighbours are among its 15 nearest on the map ({st.tokens.toLocaleString('en-US')} tokens; chance is about 0.01%)</p></div>
      <div><p className="stat-n">{pct(st.within100, 0)}</p><p className="small">are at least within its 100 nearest on the map</p></div>
      <div><p className="stat-n">{st.spearman_random_pairs.toFixed(2)}</p><p className="small">rank correlation between map distance and true similarity for random pairs: far apart on the map means almost nothing</p></div>
    </div>
    <DataTable summary="Neighbour preservation by kind of token" caption="Share of true neighbours kept by the 3-D map, by script family"
      headers={['Kind of token', 'Tokens', 'Kept in map top 15', 'Within map top 100']}
      rows={st.by_family.filter(f => f.n > 100).map(f => [f.family, f.n.toLocaleString('en-US'), pct(f.kept15, 0), pct(f.within100, 0)])}/>
  </>;
}

export default function MapFigure({ base = DEFAULT_BASE, n = 2 }: { base?: string; n?: number }) {
  return <FigureShell id="fig-map" n={n} base={base} file="map3d.json" title="A map of meaning, and what the map gets wrong" model="Qwen3-1.7B · 32,768 real token embeddings"
    fallback={{ src: base + 'fig-map.webp', alt: 'A glowing cloud of coloured points, the model’s vocabulary in 3-D, with the word Paris highlighted and lines to its true nearest neighbours: four in blue that the map kept close, eleven in orange that it put elsewhere.', width: 1020, height: 1958 }}
    caption={<>Each point is one of the model’s tokens; 32,768 of its 151,643 are drawn, coloured by script as in our Latent VII film (cyan English words, blue word pieces, magenta Chinese and Japanese, violet code). Positions come from a UMAP projection of the real 2,048-number embeddings down to three dimensions, so neighbourhoods are meaningful and distances are not. Lines join a word to its 15 most similar tokens measured in the full 2,048 dimensions: blue where the map kept them close, orange where it put them elsewhere.</>}>
    {(m: Meta) => <Loader m={m} base={base}/>}
  </FigureShell>;
}
