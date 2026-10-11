'use client';
// Figure: long context in Qwen3-1.7B. Where attention goes across 8,192 tokens, which heads reach back to a planted
// fact, and five retrieval tests from 1,024 to 32,768 tokens (one of which it fails). All from new extractions.
import { useState } from 'react';
import { FigureShell, Segmented, pct, DataTable, useWidth, DEFAULT_BASE } from './common';

type Cell = { exact?: number; n?: number; p: number; depth?: number; K?: number; layout?: string; new?: number; length?: number; pNew?: number; pOld?: number };
type Data = {
  detail: { T: number; needleDepth: number; needleDist: number; pAnswer: number };
  overall: { sink: number; recent: number; mid: number; far: number };
  layers: { sink: number; recent: number; mid: number; far: number }[];
  sinkByPos: { from: number; to: number; sink: number }[];
  heads: { layer: number; head: number; mass: number; byLength: number[] }[];
  strip: { bins: number; needleBin: number; rows: { label: string; kind?: string; sink: number; v: number[] }[] };
  lens: { layer: number; top: string; p: number; pDigit: number; rank: number }[];
  lengths: number[];
  tests: { control: number; single: { length: number; cells: Cell[] }[]; multi: { length: number; cells: Cell[] }[]; multiFails: { length: number; K: number; depth: number; num: string; otherNum: string; massAsked: number; massOther: number }[];
    para: { length: number; cells: Cell[] }[]; twohop: { length: number; cells: Cell[] }[]; update: { variant: string; cells: Cell[]; headsOld: number; headsNew: number }[] };
  templates: Record<string, string>;
};
const K = (n: number) => (n >= 1024 ? `${n / 1024}K` : String(n));
const SEG = [{ k: 'sink', label: 'first token (sink)', c: 's4' }, { k: 'recent', label: 'last 15 tokens', c: 's1' }, { k: 'mid', label: '16–255 back', c: 's3' }, { k: 'far', label: '256+ back', c: 's2' }] as const;

function Layers({ d }: { d: Data }) {
  const [hi, setHi] = useState<number | null>(null);
  const [wref, W] = useWidth<HTMLDivElement>(640);
  const H = 200, pl = 42, pr = 8, pt = 8, pb = 26, bw = (W - pl - pr) / d.layers.length, gap = Math.max(2, bw * 0.22);
  const y = (v: number) => pt + (1 - v) * (H - pt - pb);
  const l = hi !== null ? d.layers[hi] : d.overall;
  return <div className="lc-layers" ref={wref}>
    <p className="eyebrow">Where each layer’s attention goes (8,192-token passage, 511 reading positions)</p>
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Stacked bars per layer. Overall: ${pct(d.overall.sink, 0)} on the first token, ${pct(d.overall.recent, 0)} on the last 15 tokens, ${pct(d.overall.mid, 0)} 16 to 255 back, ${pct(d.overall.far, 0)} 256 or more back.`}>
      {[0, 0.5, 1].map(v => <g key={v}><line className="grid" x1={pl} x2={W - pr} y1={y(v)} y2={y(v)}/><text className="axis" x={pl - 6} y={y(v) + 4} textAnchor="end">{v * 100}%</text></g>)}
      {d.layers.map((L, i) => { let acc = 0; return <g key={i} className={hi === i ? 'hi' : ''} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}>
        <rect className="hit" x={pl + i * bw} y={pt} width={bw} height={H - pt - pb}/>
        {SEG.map(s => { const v = L[s.k]; const r = <rect key={s.k} className={'seg ' + s.c} x={pl + i * bw + gap / 2} y={y(acc + v) + 1} width={Math.max(1, bw - gap)} height={Math.max(0, y(acc) - y(acc + v) - 2)} rx={1.5}/>; acc += v; return r; })}
        {(i === 0 || (i + 1) % 4 === 0) && <text className="axis" x={pl + i * bw + bw / 2} y={H - 8} textAnchor="middle">{i + 1}</text>}
      </g>; })}
    </svg>
    <div className="map-legend small">{SEG.map(s => <span key={s.k}><i className={`lg-dot ${s.c}`}/>{s.label} <strong className="mono">{pct(l[s.k], 0)}</strong></span>)}<span className="tiny">{hi !== null ? `layer ${hi + 1}` : 'all layers'}</span></div>
    <p className="tiny">Overall, {pct(d.overall.sink, 0)} of all attention parks on the first token: none in layers 1–3, about 70% in layers 24–28. Readers early in the passage park more on it ({pct(d.sinkByPos[0].sink, 0)} in the first 256 tokens) than readers near the end ({pct(d.sinkByPos[3].sink, 0)}).</p>
  </div>;
}

function Strip({ d }: { d: Data }) {
  const [ri, setRi] = useState(1);
  const row = d.strip.rows[ri];
  const [wref, W] = useWidth<HTMLDivElement>(640);
  const H = 130, pt = 24, pb = 22, bw = W / d.strip.bins;
  const vmax = Math.max(...row.v.slice(1), 1e-6);
  const y = (v: number) => H - pb - Math.sqrt(v / vmax) * (H - pt - pb);
  const nx = d.strip.needleBin * bw + bw / 2;
  const onNeedle = row.v[d.strip.needleBin] + (row.v[d.strip.needleBin - 1] ?? 0) + (row.v[d.strip.needleBin + 1] ?? 0);
  return <div className="lc-strip" ref={wref}>
    <div className="llmt-controls">
      <label className="attn-pick small">Whose attention
        <select value={ri} onChange={e => setRi(+e.target.value)}>
          {d.strip.rows.map((r, i) => <option key={i} value={i}>{r.label}{r.kind === 'retrieval' ? ' (retrieval)' : r.kind === 'local' ? ' (looks at neighbours)' : r.kind === 'sink' ? ' (parks on the first token)' : ''}</option>)}
        </select>
      </label>
    </div>
    <p className="eyebrow">Attention from the moment it must say the number, across all 8,192 tokens</p>
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${row.label}: ${pct(onNeedle, 0)} of its attention lands on the planted fact, ${d.detail.needleDist.toLocaleString('en-US')} tokens back; ${pct(row.sink, 0)} on the first token.`}>
      <line className="grid" x1={0} x2={W} y1={H - pb} y2={H - pb}/>
      {row.v.map((v, i) => i > 0 && v > 0 && <rect key={i} className={'bar ' + (Math.abs(i - d.strip.needleBin) <= 1 ? 's2' : 's1')} x={i * bw} y={y(v)} width={Math.max(1, bw - 0.6)} height={H - pb - y(v)}/>)}
      <line className="mark" x1={nx} x2={nx} y1={pt - 6} y2={H - pb}/>
      <text className="axis strong" x={nx + 5} y={pt - 8}>the planted fact</text>
      <text className="axis" x={W - 2} y={pt - 8} textAnchor="end">the question</text>
      <text className="axis" x={0} y={H - 6}>token 1</text>
      <text className="axis" x={W} y={H - 6} textAnchor="end">token {d.detail.T.toLocaleString('en-US')}</text>
    </svg>
    <p className="small"><strong>{pct(onNeedle, 0)}</strong> of this head’s attention lands on the fact, {d.detail.needleDist.toLocaleString('en-US')} tokens back; <strong>{pct(row.sink, 0)}</strong> parks on the first token (not drawn). Bar height uses a square-root scale so small amounts stay visible.</p>
  </div>;
}

function Lens({ d }: { d: Data }) {
  const rows = d.lens.filter(l => l.layer >= 16 && l.layer <= 24);
  return <div className="lc-lens">
    <p className="eyebrow">When does the number appear? The logit lens at the answer position</p>
    <ol className="lc-lens-row">{rows.map(l => <li key={l.layer} className={l.pDigit > 0.5 ? 'got' : ''}>
      <span className="mono tiny">L{l.layer}</span><span className="lc-lens-tok">{l.top.replace(/^ /, '') || '␣'}</span><span className="mono tiny">{pct(l.p, 0)}</span>
    </li>)}</ol>
    <p className="tiny">From layer 18 to 21 the lens reads a blank to fill in (“_____”); the right first digit is in {d.lens[19].rank + 1}th place at layer 20 and {d.lens[20].rank + 1}th at layer 21. At layer 22 it jumps to the top ({pct(d.lens[21].pDigit, 0)}), one layer after the depth where the Rome prediction locks in.</p>
  </div>;
}

function Grid({ title, cols, rows, note }: { title: string; cols: string[]; rows: { label: string; cells: { text: string; v: number; bad?: boolean }[] }[]; note?: string }) {
  return <div className="lc-grid">
    <p className="eyebrow">{title}</p>
    <div className="llmt-table-wrap" tabIndex={0} role="region" aria-label={title}>
      <table className="lc-t"><thead><tr><th scope="col"/>{cols.map(c => <th key={c} scope="col">{c}</th>)}</tr></thead>
        <tbody>{rows.map(r => <tr key={r.label}><th scope="row">{r.label}</th>{r.cells.map((c, i) => <td key={i} className={c.bad ? 'bad' : ''} style={{ ['--v' as string]: String(c.v) }}><span>{c.text}</span></td>)}</tr>)}</tbody>
      </table>
    </div>
    {note && <p className="tiny">{note}</p>}
  </div>;
}

function Tests({ d }: { d: Data }) {
  const t = d.tests;
  const singleTotal = t.single.reduce((a, r) => a + r.cells.reduce((b, c) => b + (c.exact ?? 0), 0), 0);
  const singleN = t.single.reduce((a, r) => a + r.cells.length * 5, 0);
  return <div className="lc-tests">
    <div className="llmt-stats four">
      <div><p className="stat-n">{singleTotal}/{singleN}</p><p className="small">single planted facts recalled exactly, 1K to 32K tokens, every depth</p></div>
      <div><p className="stat-n">87/90</p><p className="small">with up to 50 look-alike facts in the text</p></div>
      <div><p className="stat-n">12 of 15</p><p className="small">times it reported an outdated number when the old sentence matched the question’s wording</p></div>
      <div><p className="stat-n">{Math.max(1, Math.round(t.control * 1e6))} in a million</p><p className="small">its chance of the right number with no fact in the text</p></div>
    </div>
    <Grid title="1 · One fact, same wording as the question (5 facts per cell)" cols={t.single[0].cells.map(c => `${Math.round((c.depth ?? 0) * 100)}%`)}
      rows={t.single.map(r => ({ label: K(r.length), cells: r.cells.map(c => ({ text: `${c.exact}/5`, v: (c.exact ?? 0) / 5 })) }))} note="Columns: where the fact sits, from the start (0%) to just before the question (100%)."/>
    <Grid title="2 · One fact, different wording (“The blue door opens only when you dial 7392.”)" cols={t.para[0].cells.map(c => `${Math.round((c.depth ?? 0) * 100)}%`)}
      rows={t.para.map(r => ({ label: K(r.length), cells: r.cells.map(c => ({ text: `${c.exact}/5`, v: (c.exact ?? 0) / 5, bad: (c.exact ?? 5) < 5 })) }))}
      note="The one weak cell (8K, fact right before the question): the number was right, but the model's first word was “the” instead of the number, so it does not count as exact."/>
    <Grid title="3 · Many look-alike facts (“the silver gate”, “the red lamp”…): asked about one" cols={t.multi[0].cells.map(c => `${c.K} fact${c.K === 1 ? '' : 's'}`)}
      rows={t.multi.map(r => ({ label: K(r.length), cells: r.cells.map(c => ({ text: `${c.exact}/${c.n}`, v: (c.exact ?? 0) / (c.n ?? 1), bad: (c.exact ?? 0) < (c.n ?? 0) })) }))}
      note={`All three misses were facts near the start of the text, and each time the first digit came from a different fact, the one its retrieval heads were looking at most (${t.multiFails.map(f => `${f.num} came out starting with the ${f.otherNum[0]} of ${f.otherNum}`).join('; ')}).`}/>
    <Grid title="4 · Two facts to connect (“the blue door uses the same number as the red gate” + the red gate's number)" cols={t.twohop[0].cells.map(c => c.layout ?? '')}
      rows={t.twohop.map(r => ({ label: K(r.length), cells: r.cells.map(c => ({ text: `${c.exact}/5`, v: (c.exact ?? 0) / 5, bad: (c.exact ?? 5) < 5 })) }))}
      note="Weakest when the number came first and the sentence linking to it came later; small samples (5 per cell)."/>
    <Grid title="5 · An update: the number was changed later in the text. How often does it give the new number?" cols={t.update[0].cells.map(c => K(c.length ?? 0))}
      rows={t.update.map(r => ({ label: r.variant, cells: r.cells.map(c => ({ text: `${c.new}/5`, v: (c.new ?? 0) / 5, bad: (c.new ?? 0) < 3 })) }))}
      note={`The wording decides. When the new number's sentence copies the question's wording, it gives the new number every time; when the old one does, it mostly gives the old one. Its retrieval heads put ${pct(t.update[1].headsNew, 0)} of their attention on the new number in the first case, but split ${pct(t.update[0].headsOld, 0)} old / ${pct(t.update[0].headsNew, 0)} new in the second, and still answer old.`}/>
  </div>;
}

function View({ d }: { d: Data }) {
  const [tab, setTab] = useState<'attn' | 'tests'>('attn');
  return <div className="lc">
    <div className="llmt-controls"><Segmented label="View" value={tab} onChange={setTab} options={[{ v: 'attn', label: 'Where attention goes' }, { v: 'tests', label: 'Five recall tests' }]}/></div>
    {tab === 'attn' ? <><Layers d={d}/><Strip d={d}/><Lens d={d}/>
      <DataTable summary="The strongest retrieval heads as a table" caption="Share of attention on the planted fact's digits at the answer position, by context length"
        headers={['Head', 'Average', ...d.lengths.map(K)]} rows={d.heads.map(h => [`layer ${h.layer}, head ${h.head}`, pct(h.mass, 0), ...h.byLength.map(v => pct(v, 0))])}/></> : <Tests d={d}/>}
  </div>;
}

export default function LongContextFigure({ base = DEFAULT_BASE, n = 7 }: { base?: string; n?: number }) {
  return <FigureShell id="fig-longctx" n={n} base={base} file="longctx.json" title="Reading 32,000 tokens: what holds, and what breaks" model="Qwen3-1.7B · new runs, 1K–32K tokens"
    fallback={{ src: base + 'fig-longctx.webp', alt: 'Stacked bars for 28 layers showing most attention on the first token in later layers, and a strip across 8,192 tokens where one head puts a tall spike on the planted fact about a quarter of the way in.', width: 1020, height: 1432 }}
    caption={<>New measurements for this article on Qwen3-1.7B: a made-up fact (“The secret number for the blue door is 7392.”) is planted in the public-domain text of <em>The Wind in the Willows</em>, and a question at the end asks for it. Attention weights were recomputed exactly for the positions shown. Small samples: 5–10 runs per cell, so single cells are anecdotes; the patterns across cells are the result.</>}>
    {(d: Data) => <View d={d}/>}
  </FigureShell>;
}
