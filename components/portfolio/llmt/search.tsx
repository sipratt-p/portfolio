'use client';
// Figure: search, honestly measured. A real two-model step-by-step beam search on GSM8K maths word problems
// (Qwen3-1.7B and Qwen3.5-4B-Base writing into the same solution), against each model's majority vote of 32 blind tries.
import { useMemo, useState } from 'react';
import { FigureShell, Segmented, pct, DataTable, useWidth, DEFAULT_BASE } from './common';

type B = { id: number; s: number; v: number; a: number; b: number; ak: number; bk: number; st: number; at: number; bt: number; ans: number; gold: number };
type N = { i: number; p: number; m: 'A' | 'B' | 'root'; w: number; d: number; s: string; x: string; sc: number; j: number; ar: boolean | null; g?: 1 };
type T = { id: number; q: string; gold: number; answer: number; correct: boolean; waves: number; tally: { w: number; t: Record<string, number> }[]; nodes: N[]; base: Record<'A' | 'B', { k: number; n: number; maj: number }> };
type Data = { models: Record<'A' | 'B', string>; summary: Record<string, number>; board: B[]; trees: T[] };
const fmt = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(1)).replace(/\.0$/, '');
const STATUS: Record<string, string> = { p: 'pruned', o: 'kept, still open', e: 'kept at the last wave', t: 'finished', r: 'start' };

function Board({ d }: { d: Data }) {
  const [hi, setHi] = useState<number | null>(null);
  const rows: { key: keyof B; label: string; total: number }[] = [
    { key: 's', label: 'Two-model search', total: d.summary.search_correct },
    { key: 'b', label: '4B, majority of 32', total: d.summary.B_maj },
    { key: 'a', label: '1.7B, majority of 32', total: d.summary.A_maj },
    { key: 'v', label: 'Search said “verified”', total: d.summary.search_verified },
  ];
  const cw = 100 / d.board.length;
  const p = hi !== null ? d.board[hi] : null;
  return <div className="sb">
    <div className="sb-grid" role="table" aria-label="Forty hard problems: which method got each one right">
      {rows.map(r => <div className="sb-row" role="row" key={r.key}>
        <span className="sb-label small" role="rowheader">{r.label}</span>
        <span className="sb-cells" role="cell" aria-label={`${r.label}: ${r.total} of ${d.board.length}`}>
          {d.board.map((b, i) => <button type="button" key={b.id} className={'sb-cell' + (b[r.key] ? ' yes' : '') + (r.key === 'v' ? ' flag' : '') + (hi === i ? ' hi' : '')}
            style={{ width: `${cw}%` }} onMouseEnter={() => setHi(i)} onFocus={() => setHi(i)} onClick={() => setHi(i)} tabIndex={r.key === 's' ? 0 : -1}
            aria-label={`Problem ${b.id}: ${r.label} ${b[r.key] ? (r.key === 'v' ? 'yes' : 'right') : 'wrong'}`}><span/></button>)}
        </span>
        <span className="sb-total mono">{r.total}/{d.board.length}</span>
      </div>)}
    </div>
    <p className="small sb-detail" aria-live="polite">{p ? <>Problem #{p.id}: search answered {fmt(p.ans)} (truth {fmt(p.gold)}), {p.s ? 'right' : 'wrong'}. The 4B got {p.bk}/32 single tries right, the 1.7B {p.ak}/32. Search used {(p.st / 1000).toFixed(1)}k tokens; 32 tries of the 4B used {(p.bt / 1000).toFixed(1)}k.</> : <>Filled squares are right answers. Hover, tap or tab across a row for each problem.</>}</p>
    <div className="llmt-stats four">
      <div><p className="stat-n">24 vs 25</p><p className="small">search vs the 4B’s own majority vote, out of 40</p></div>
      <div><p className="stat-n">{(d.summary.search_tokens_mean / d.summary.B_tokens_mean).toFixed(1)}×</p><p className="small">the tokens: {(d.summary.search_tokens_mean / 1000).toFixed(1)}k per problem vs {(d.summary.B_tokens_mean / 1000).toFixed(1)}k</p></div>
      <div><p className="stat-n">40/40</p><p className="small">problems marked “verified”, including all 16 it got wrong</p></div>
      <div><p className="stat-n">3 → 24</p><p className="small">what search did for the weak 1.7B; pooling both models’ 64 blind tries gave 13</p></div>
    </div>
  </div>;
}

function Tree({ t, models }: { t: T; models: Data['models'] }) {
  const [sel, setSel] = useState<number | null>(null);
  const L = useMemo(() => {
    const kids = new Map<number, number[]>(); t.nodes.forEach(n => { if (n.p >= 0) { if (!kids.has(n.p)) kids.set(n.p, []); kids.get(n.p)!.push(n.i); } });
    const byId = new Map(t.nodes.map(n => [n.i, n]));
    const y = new Map<number, number>(); let leaf = 0;
    const order = (i: number): number => { const k = (kids.get(i) ?? []).sort((a, b) => (byId.get(b)!.g ? 1 : 0) - (byId.get(a)!.g ? 1 : 0) || byId.get(b)!.sc - byId.get(a)!.sc);
      if (!k.length) { y.set(i, leaf++); return y.get(i)!; } const ys = k.map(order); y.set(i, (ys[0] + ys[ys.length - 1]) / 2); return y.get(i)!; };
    order(0);
    const maxD = Math.max(...t.nodes.map(n => n.d));
    return { y, leaves: leaf, maxD, byId };
  }, [t]);
  const [wref, W] = useWidth<HTMLDivElement>(640);
  const H = Math.max(320, Math.min(560, L.leaves * 1.15)), pl = 14, pr = 56, pt = 10, pb = 26;
  const X = (dd: number) => pl + (dd / L.maxD) * (W - pl - pr), Y = (i: number) => pt + (L.y.get(i)! / Math.max(1, L.leaves - 1)) * (H - pt - pb);
  const gold = t.nodes.filter(n => n.g);
  const termLabels: { i: number; x: number; y: number; v: string }[] = [];
  for (const n of t.nodes.filter(n => n.s === 't').sort((a, b) => Y(a.i) - Y(b.i))) {
    const m = n.x.match(/=\s*\$?(-?[\d.,]+)\$?\s*$/) ?? n.x.match(/Answer:\s*\$?(-?[\d.,]+)/);
    const yy = Y(n.i) + 4;
    if (termLabels.length && yy - termLabels[termLabels.length - 1].y < 13) continue;
    termLabels.push({ i: n.i, x: X(n.d) + 7, y: yy, v: m ? m[1] : '?' });
  }
  const s = sel !== null ? L.byId.get(sel)! : null;
  const counts = { A: t.nodes.filter(n => n.m === 'A').length, B: t.nodes.filter(n => n.m === 'B').length, pr: t.nodes.filter(n => n.s === 'p').length, fin: t.nodes.filter(n => n.s === 't').length };
  return <div className="st">
    <p className="small st-q"><span className="eyebrow">Problem #{t.id}</span> {t.q} <strong>Truth: {fmt(t.gold)}.</strong> Search answered <strong>{fmt(t.answer)}</strong> ({t.correct ? 'right' : 'wrong'}).</p>
    <div className="st-svg" ref={wref}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Search tree for problem ${t.id}: ${t.nodes.length - 1} steps over ${L.maxD} waves, ${counts.pr} pruned, ${counts.fin} finished. The chosen path is highlighted.`}>
        {Array.from({ length: L.maxD + 1 }, (_, dd) => <text key={dd} className="axis" x={X(dd)} y={H - 8} textAnchor="middle">{dd === 0 ? 'start' : `step ${dd}`}</text>)}
        {t.nodes.filter(n => n.p >= 0).map(n => <line key={n.i} className={'edge ' + (n.s === 'p' ? 'pruned' : 'kept')} x1={X(n.d - 1)} y1={Y(n.p)} x2={X(n.d)} y2={Y(n.i)}/>)}
        {gold.filter(n => n.p >= 0).map(n => <line key={'g' + n.i} className="edge gold" x1={X(n.d - 1)} y1={Y(n.p)} x2={X(n.d)} y2={Y(n.i)}/>)}
        {t.nodes.filter(n => n.p >= 0).map(n => <circle key={'c' + n.i} className={`tnode ${n.m === 'A' ? 's1' : 's2'} ${n.s === 'p' ? 'pruned' : ''} ${n.g ? 'gold' : ''} ${sel === n.i ? 'sel' : ''}`}
          cx={X(n.d)} cy={Y(n.i)} r={n.g || sel === n.i ? 4.5 : n.s === 't' ? 3.5 : 2} onClick={() => setSel(n.i)}/>)}
        {termLabels.map(l => <text key={'t' + l.i} className="axis" x={l.x} y={l.y}>= {l.v}</text>)}
      </svg>
    </div>
    <div className="map-legend small">
      <span><i className="lg-dot s1"/>{models.A} wrote the step ({counts.A})</span>
      <span><i className="lg-dot s2"/>{models.B} wrote the step ({counts.B})</span>
      <span><i className="lg-line gold"/>chosen path</span>
      <span><i className="lg-line faint"/>pruned ({counts.pr})</span>
    </div>
    <div className="st-path">
      <p className="eyebrow">The chosen path, step by step (tap any dot in the tree to read it)</p>
      <ol>{gold.filter(n => n.p >= 0).map(n => <li key={n.i}><button type="button" onClick={() => setSel(n.i)} className={sel === n.i ? 'on' : ''}>
        <i className={`lg-dot ${n.m === 'A' ? 's1' : 's2'}`}/><span>{n.x}</span><span className="tiny">{n.m === 'A' ? '1.7B' : '4B'}</span></button></li>)}</ol>
    </div>
    {s && <div className="st-sel small" aria-live="polite"><strong>{s.m === 'A' ? models.A : models.B}</strong> · {STATUS[s.s] ?? s.s} · step score {s.sc.toFixed(2)} · other model’s yes/no check {s.j.toFixed(2)}{s.ar === true ? ' · arithmetic checks out' : s.ar === false ? ' · arithmetic error caught' : ''}<br/>“{s.x}”</div>}
    <div className="st-tally">
      <p className="eyebrow">What the look-ahead rollouts agreed on, wave by wave</p>
      <ol>{t.tally.map(w => { const tot = Object.values(w.t).reduce((a, b) => a + b, 0); const top = Object.entries(w.t).sort((a, b) => b[1] - a[1]).slice(0, 3);
        return <li key={w.w}><span className="mono tiny">wave {w.w}</span>{top.map(([a, c]) => <span key={a} className={'st-chip' + (+a === t.gold ? ' right' : '')}>{fmt(+a)} <span className="mono">{pct(c / tot, 0)}</span></span>)}</li>; })}</ol>
      <p className="tiny">Outlined chip: the true answer. The search never sees the truth; it was checked afterwards.</p>
    </div>
  </div>;
}

function View({ d }: { d: Data }) {
  const [ti, setTi] = useState(0);
  return <div className="search">
    <Board d={d}/>
    <div className="llmt-controls st-ctl">
      <p className="eyebrow">Inside one search</p>
      <Segmented label="Problem" value={ti} onChange={setTi} options={[{ v: 0, label: '#177: right' }, { v: 1, label: '#259: confidently wrong' }]}/>
    </div>
    <Tree t={d.trees[ti]} models={d.models}/>
    <DataTable summary="All 40 problems as a table" caption="Per-problem results for search and the two majority-vote baselines"
      headers={['Problem', 'Search', '4B majority', '1.7B majority', '4B right of 32', 'Search tokens']}
      rows={d.board.map(b => [`#${b.id}`, b.s ? 'right' : 'wrong', b.b ? 'right' : 'wrong', b.a ? 'right' : 'wrong', b.bk, b.st.toLocaleString('en-US')])}/>
  </div>;
}

export default function SearchFigure({ base = DEFAULT_BASE, n = 6 }: { base?: string; n?: number }) {
  return <FigureShell id="fig-search" n={n} base={base} file="search.json" title="Search, honestly measured" model="Qwen3-1.7B + Qwen3.5-4B-Base · 40 maths problems"
    fallback={{ src: base + 'fig-search.webp', alt: 'Four rows of forty squares: two-model search right on 24, the 4B majority vote on 25, the 1.7B majority vote on 3, and “verified” marked on all 40. Below, a search tree of 550 steps with one highlighted chosen path.', width: 1020, height: 2640 }}
    caption={<>Forty hard GSM8K problems (chosen because the 1.7B got at most 3 of 8 blind tries right). Search: two models propose one line of working at a time, both models finish each candidate quickly as a look-ahead, the other model checks the line, and Python re-checks the arithmetic; the best 8 paths survive each wave (24 in the two trees shown). Baselines: each model answers 32 times and the most common answer wins. The trees are wide-beam reruns; #177 is the film’s problem, picked from six reruns.</>}>
    {(d: Data) => <View d={d}/>}
  </FigureShell>;
}
