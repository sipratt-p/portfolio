'use client';
// Figure: the Garden of Forking Paths, explorable. Qwen3.8-27B answered one question 3,072 times (temperature 1.0, full
// vocabulary). Walk the real continuation tree: exact next-token odds at each fork, the ideas the replies below lead to,
// and where those replies land on a 2-D map of meaning.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FigureShell, Tok, tokText, pct, cssVar, useThemeTick, useJSON, DataTable, DEFAULT_BASE } from './common';

type Node = { p: number; t: string; n: number; h: number; m: number[]; g?: 1; top?: [string, number][] };
type Data = { prompt: string; samples: number; greedy: number; ideas: string[]; nodes: Node[]; replies: { x: number[]; y: number[]; c: number[]; k: number[] };
  stats: { distinct: number; trie_nodes: number; mean_len: number; H_mean: number; H_gt2: number }; shares: number[] };
type Texts = { idx: number[]; text: string[] };

function Explorer({ d, base }: { d: Data; base: string }) {
  const { data: tx } = useJSON<Texts>(base + 'forking_texts.json', true);
  const textOf = useMemo(() => { const m = new Map<number, string>(); if (tx) tx.idx.forEach((r, i) => m.set(r, tx.text[i])); return m; }, [tx]);
  const kids = useMemo(() => { const k: number[][] = d.nodes.map(() => []); d.nodes.forEach((nd, i) => { if (nd.p >= 0) k[nd.p].push(i); }); k.forEach(a => a.sort((x, y) => d.nodes[y].n - d.nodes[x].n)); return k; }, [d]);
  const depth = useMemo(() => { const dp = new Int16Array(d.nodes.length); d.nodes.forEach((nd, i) => { dp[i] = nd.p >= 0 ? dp[nd.p] + 1 : 0; }); return dp; }, [d]);
  const [cur, setCur] = useState(0);
  const [roll, setRoll] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [only, setOnly] = useState<number | null>(null);
  const node = d.nodes[cur];
  const path = useMemo(() => { const p: number[] = []; let n = cur; while (n >= 0) { p.unshift(n); n = d.nodes[n].p; } return p; }, [cur, d]);
  const through = useMemo(() => {
    const out: number[] = [];
    for (let r = 0; r < d.replies.k.length; r++) { let n = d.replies.k[r]; while (n >= 0 && depth[n] > depth[cur]) n = d.nodes[n].p; if (n === cur) out.push(r); }
    return out;
  }, [cur, d, depth]);
  const samples = useMemo(() => {
    const withText = through.filter(r => textOf.has(r) && r !== d.greedy);
    if (!withText.length) return [];
    const out: number[] = []; let s = (roll * 2654435761 + cur * 97) >>> 0;
    for (let i = 0; i < Math.min(2, withText.length); i++) { s = (s * 1103515245 + 12345) >>> 0; const r = withText[s % withText.length]; if (!out.includes(r)) out.push(r); }
    return out;
  }, [through, textOf, roll, cur, d.greedy]);
  const onGreedy = through.includes(d.greedy);
  const mixTotal = node.m.reduce((a, b) => a + b, 0) || 1;
  const childByTok = new Map(kids[cur].map(k => [d.nodes[k].t, k]));
  const go = (k: number) => { setCur(k); setPicked(null); };
  const followGreedy = () => { const nx = kids[cur].find(k => d.nodes[k].g); if (nx !== undefined) go(nx); };
  const prefix = path.slice(1).map(k => d.nodes[k].t).join('');
  return <div className="fork">
    <p className="fork-q small"><span className="eyebrow">The question</span> {d.prompt}</p>
    <div className="fork-path" aria-label="Path so far">
      <button type="button" className={'fork-crumb' + (cur === 0 ? ' on' : '')} onClick={() => go(0)}>start</button>
      {path.slice(1).map(k => <button type="button" key={k} className={'fork-crumb' + (k === cur ? ' on' : '')} onClick={() => go(k)} aria-label={`Go back to “${tokText(d.nodes[k].t)}”`}><Tok t={d.nodes[k].t}/></button>)}
      {cur !== 0 && <button type="button" className="llmt-btn ghost small" onClick={() => go(node.p)} aria-label="Back one word">← back</button>}
    </div>
    <div className="fork-grid">
      <div className="fork-left">
        <p className="fork-count"><strong>{node.n.toLocaleString('en-US')}</strong> of {d.samples.toLocaleString('en-US')} replies {cur === 0 ? 'start here' : <>begin “{prefix.trim()}”</>}</p>
        {node.top ? <>
          <p className="eyebrow">The model’s exact odds for the next word{node.h > 0 ? ` · ${node.h.toFixed(2)} bits of uncertainty` : ''}</p>
          <ol className="fork-odds">
            {node.top.map(([t, p]) => { const k = childByTok.get(t);
              return <li key={t}>
                <button type="button" disabled={k === undefined} onClick={() => k !== undefined && go(k)} className={k !== undefined && d.nodes[k].g ? 'greedy' : ''}
                  aria-label={`${tokText(t)}, ${pct(p)}${k !== undefined ? `, ${d.nodes[k].n} replies` : ', too rare to follow'}`}>
                  <Tok t={t}/><span className="guess-bar thin" aria-hidden="true"><span style={{ width: `${Math.max(1, p * 100)}%` }}/></span><span className="mono small">{pct(p)}</span>
                </button>
              </li>; })}
          </ol>
        </> : <p className="small">Fewer than 10 replies pass through here, so the exact odds are not stored; the branches below are what was sampled.</p>}
        {!node.top && kids[cur].length > 0 && <ol className="fork-odds">{kids[cur].map(k => <li key={k}><button type="button" onClick={() => go(k)}><Tok t={d.nodes[k].t}/><span className="mono small">{d.nodes[k].n} replies</span></button></li>)}</ol>}
        {kids[cur].length === 0 && <p className="small">The replies split into single paths from here.</p>}
        <div className="fork-actions">
          {kids[cur].some(k => d.nodes[k].g) && <button type="button" className="llmt-btn" onClick={followGreedy}>Follow the model’s likeliest word →</button>}
          <button type="button" className="llmt-btn ghost" onClick={() => setRoll(r => r + 1)}>Show other replies</button>
        </div>
      </div>
      <div className="fork-right">
        <p className="eyebrow">Where the {node.n.toLocaleString('en-US')} replies below this point end up</p>
        <div className="fork-mix" role="img" aria-label={node.m.map((v, i) => `${d.ideas[i]} ${pct(v / mixTotal, 0)}`).join(', ')}>
          {node.m.map((v, i) => v > 0 && <span key={i} className={`s${i + 1}`} style={{ flexGrow: v }}/>)}
        </div>
        <ul className="fork-legend" aria-label="Ideas; choose one to show only its replies on the map">{d.ideas.map((nm, i) => <li key={i}><button type="button" aria-pressed={only === i} className={only === i ? 'on' : ''} onClick={() => setOnly(only === i ? null : i)}><i className={`lg-dot s${i + 1}`}/><span>{nm}</span><span className="mono small">{pct(node.m[i] / mixTotal, 0)}</span></button></li>)}</ul>
        <IdeaMap d={d} through={through} only={only} picked={picked} onPick={setPicked}/>
      </div>
    </div>
    <div className="fork-replies" aria-live="polite">
      {picked !== null ? <ReplyCard d={d} r={picked} text={textOf.get(picked)} onFollow={() => go(d.replies.k[picked])}/> :
        <>{onGreedy && cur !== 0 && <ReplyCard d={d} r={d.greedy} text={textOf.get(d.greedy)} greedy/>}
          {samples.map(r => <ReplyCard key={r} d={d} r={r} text={textOf.get(r)}/>)}</>}
    </div>
  </div>;
}

function ReplyCard({ d, r, text, greedy, onFollow }: { d: Data; r: number; text?: string; greedy?: boolean; onFollow?: () => void }) {
  const c = d.replies.c[r];
  return <blockquote className={'fork-reply' + (greedy || r === d.greedy ? ' greedy' : '')}>
    <p className="fork-reply-meta tiny"><i className={`lg-dot s${c + 1}`}/>{d.ideas[c]}{(greedy || r === d.greedy) && ' · the reply the model writes if it always takes its likeliest word'}</p>
    <p>{text ?? 'Text not included in this page (the page carries 1,000 of the 3,072 replies).'}</p>
    {onFollow && <button type="button" className="llmt-btn ghost small" onClick={onFollow}>Walk this reply’s path</button>}
  </blockquote>;
}

function IdeaMap({ d, through, only, picked, onPick }: { d: Data; through: number[]; only: number | null; picked: number | null; onPick: (r: number | null) => void }) {
  const wrap = useRef<HTMLDivElement>(null); const cv = useRef<HTMLCanvasElement>(null);
  const tick = useThemeTick();
  const [w, setW] = useState(300);
  const h = Math.round(w * 0.78);
  const set = useMemo(() => { const s = new Uint8Array(d.replies.c.length); through.forEach(r => { if (only === null || d.replies.c[r] === only) s[r] = 1; }); return s; }, [through, d, only]);
  useEffect(() => { const el = wrap.current; if (!el) return; const ro = new ResizeObserver(es => setW(Math.round(es[0].contentRect.width))); ro.observe(el); return () => ro.disconnect(); }, []);
  const X = useCallback((r: number) => 8 + (d.replies.x[r] / 1000) * (w - 16), [d, w]);
  const Y = useCallback((r: number) => 8 + (1 - d.replies.y[r] / 1000) * (h - 16), [d, h]);
  useEffect(() => {
    const c = cv.current; if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); c.width = w * dpr; c.height = h * dpr;
    const g = c.getContext('2d')!; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const root = c.closest('.llmt-fig');
    const cols = [1, 2, 3, 4, 5].map(i => cssVar(root, `--s${i}`)); const muted = cssVar(root, '--muted'); const surf = cssVar(root, '--surface'); const acc = cssVar(root, '--accent');
    g.fillStyle = surf; g.fillRect(0, 0, w, h);
    const N = d.replies.c.length;
    g.fillStyle = muted; g.globalAlpha = 0.16;
    for (let r = 0; r < N; r++) if (!set[r]) g.fillRect(X(r) - 1, Y(r) - 1, 2, 2);
    g.globalAlpha = 0.9;
    for (let r = 0; r < N; r++) if (set[r]) { g.fillStyle = cols[d.replies.c[r]]; g.beginPath(); g.arc(X(r), Y(r), 2.2, 0, 7); g.fill(); }
    g.globalAlpha = 1;
    const ring = (r: number, col: string) => { g.beginPath(); g.arc(X(r), Y(r), 6, 0, 7); g.lineWidth = 2; g.strokeStyle = surf; g.stroke(); g.beginPath(); g.arc(X(r), Y(r), 5, 0, 7); g.strokeStyle = col; g.stroke(); };
    ring(d.greedy, acc);
    if (picked !== null) ring(picked, cssVar(root, '--ink'));
  }, [w, h, set, picked, tick, d, X, Y]);
  const onClick = (e: React.MouseEvent) => {
    const rc = cv.current!.getBoundingClientRect(), mx = e.clientX - rc.left, my = e.clientY - rc.top;
    let best = -1, bd = 18 * 18;
    for (let r = 0; r < d.replies.c.length; r++) { const dx = X(r) - mx, dy = Y(r) - my, dd = dx * dx + dy * dy; if (dd < bd && (set[r] || through.length === d.replies.c.length)) { bd = dd; best = r; } }
    onPick(best >= 0 ? best : null);
  };
  return <div className="fork-map" ref={wrap}>
    <canvas ref={cv} style={{ width: '100%', height: h }} onClick={onClick} role="img"
      aria-label={`Map of all ${d.samples} replies by meaning, coloured by idea. ${through.length} replies pass through the current point and are highlighted. The ringed dot is the model's likeliest reply.`}/>
    <p className="tiny">A 2-D map of the replies by meaning (a projection: nearby means similar, distances are approximate). Tap a dot to read that reply. Ring: the likeliest-word reply.</p>
  </div>;
}

export default function ForkingFigure({ base = DEFAULT_BASE, n = 5 }: { base?: string; n?: number }) {
  return <FigureShell id="fig-forking" n={n} base={base} file="forking.json" title="Walk the garden of forking paths" model="Qwen3.8-27B · 3,072 real replies"
    fallback={{ src: base + 'fig-forking.webp', alt: 'The first fork of the reply tree: Fear 32.5 percent, Your 25.3 percent, It 12 percent, You 10.6 percent, Remember 8.2 percent; a stacked bar of five ideas and a scatter of 3,072 replies coloured by idea.', width: 1020, height: 1552 }}
    caption={<>Qwen3.8-27B (a model 16 times larger than the 1.7B used elsewhere here) answered “What would you want to tell someone who is afraid? Answer in one or two sentences.” 3,072 times, sampling from its full distribution. All 3,072 replies are different. The odds are the model’s exact probabilities at that point in the reply; paths are kept where at least five replies pass. Ideas come from clustering the replies’ meaning with a separate embedding model.</>}>
    {(d: Data) => <><Explorer d={d} base={base}/>
      <DataTable summary="The five ideas as a table" caption="Share of the 3,072 replies in each idea cluster" headers={['Idea', 'Share of replies']} rows={d.ideas.map((nm, i) => [nm, pct(d.shares[i])])}/></>}
  </FigureShell>;
}
