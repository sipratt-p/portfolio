'use client';
// Figure: the logit lens, layer by layer. At every layer, the running state of every word is read through the model's
// own output head: "if you had to answer now, what comes next?" Real recorded runs: Qwen3-1.7B (fp32) and Qwen3.8-27B (bf16).
import { useMemo, useState } from 'react';
import { FigureShell, Segmented, Tok, tokText, pct, DataTable, useWidth, DEFAULT_BASE } from './common';

type Model = { name: string; precision: string; layers: number; tokens: string[]; promptLen: number; lens: [string, number][][][]; settle: (number | null)[] };
type Data = { prompt: string; models: Model[] };

function track(m: Model, t: number) {
  const fin = m.lens[m.layers][t][0][0];
  return m.lens.map(L => { const hit = L[t].find(([w]) => w === fin); return hit ? hit[1] : 0; });
}

function Lens({ d }: { d: Data }) {
  const [mi, setMi] = useState(0);
  const m = d.models[mi];
  const answerPos = m.promptLen - 1;
  const [layer, setLayer] = useState(21);
  const [pos, setPos] = useState(answerPos);
  const L = Math.min(layer, m.layers);
  const switchModel = (k: number) => { setMi(k); const mm = d.models[k]; setLayer(mm.settle[mm.promptLen - 1] ?? mm.layers); setPos(mm.promptLen - 1); };
  const tr = useMemo(() => track(m, pos), [m, pos]);
  const fin = m.lens[m.layers][pos][0][0];
  const st = m.settle[pos];
  const [cref, W] = useWidth<HTMLDivElement>(560);
  const H = 160, pl = 40, pr = 12, pt = 14, pb = 26;
  const xs = (l: number) => pl + (l / m.layers) * (W - pl - pr);
  const ys = (p: number) => pt + (1 - p) * (H - pt - pb);
  const path = tr.map((p, l) => `${l ? 'L' : 'M'}${xs(l).toFixed(1)},${ys(p).toFixed(1)}`).join('');
  const top = m.lens[L][pos];
  return <div className="river">
    <div className="llmt-controls">
      <Segmented label="Model" value={mi} onChange={switchModel} options={d.models.map((mm, k) => ({ v: k, label: `${mm.name} · ${mm.layers} layers` }))}/>
    </div>
    <div className="river-slider">
      <label htmlFor="river-layer" className="small"><strong className="mono">Layer {L}</strong> of {m.layers}{L === 0 ? ' (the raw word embeddings)' : ''}</label>
      <div className="river-step">
        <button type="button" className="llmt-btn ghost" aria-label="Previous layer" onClick={() => setLayer(Math.max(0, L - 1))}>−</button>
        <input id="river-layer" type="range" min={0} max={m.layers} step={1} value={L} onChange={e => setLayer(+e.target.value)}
          aria-valuetext={`Layer ${L} of ${m.layers}. Guess after “${tokText(m.tokens[pos])}”: ${tokText(top[0][0])}, ${pct(top[0][1])}`}/>
        <button type="button" className="llmt-btn ghost" aria-label="Next layer" onClick={() => setLayer(Math.min(m.layers, L + 1))}>+</button>
      </div>
    </div>
    <p className="small river-how">Each word below, with the lens’s guess for the <em>next</em> word underneath it at this layer. Darker means more confident. Tap a word to follow it.</p>
    <ol className="river-strip" aria-label={`Lens guesses at layer ${L}`}>
      {m.tokens.slice(0, -1).map((t, k) => {
        const [g, p] = m.lens[L][k][0];
        const locked = m.settle[k] !== null && L >= (m.settle[k] as number);
        return <li key={k} className={(k === pos ? 'on ' : '') + (k >= m.promptLen ? 'gen ' : '') + (locked ? 'locked' : '')}>
          <button type="button" onClick={() => setPos(k)} aria-pressed={k === pos} aria-label={`${tokText(t)}: at layer ${L} the lens guesses ${tokText(g)} next, ${pct(p)}${locked ? ', settled' : ''}`}>
            <span className="river-word"><Tok t={t}/></span>
            <span className="river-guess" style={{ ['--p' as string]: String(Math.min(1, p)) }}><Tok t={g}/></span>
          </button>
        </li>;
      })}
    </ol>
    <p className="tiny river-key">Words after “{tokText(m.tokens[m.promptLen - 1])}” were written by the model itself (greedy decoding). A solid outline means the guess has settled on the model’s final answer for good.</p>
    <div className="river-detail">
      <div>
        <p className="eyebrow">After “…{m.tokens.slice(Math.max(0, pos - 3), pos + 1).join('')}”, layer {L} guesses</p>
        <ol className="river-top">{top.map(([w, p]) => <li key={w + p}><Tok t={w}/><span className="guess-bar thin" aria-hidden="true"><span style={{ width: `${Math.max(1, p * 100)}%` }}/></span><span className="mono small">{pct(p)}</span></li>)}</ol>
      </div>
      <div className="river-chart" ref={cref}>
        <p className="eyebrow">Probability of the final answer, “{tokText(fin)}”, at each layer</p>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Line chart: the probability of ${tokText(fin)} by layer. ${st !== null ? `It settles at layer ${st} of ${m.layers}.` : ''}`}>
          {[0, 0.5, 1].map(v => <g key={v}><line className="grid" x1={pl} x2={W - pr} y1={ys(v)} y2={ys(v)}/><text className="axis" x={pl - 6} y={ys(v) + 4} textAnchor="end">{v * 100}%</text></g>)}
          {Array.from({ length: Math.floor(m.layers / (m.layers > 40 ? 16 : 7)) + 1 }, (_, i) => i * (m.layers > 40 ? 16 : 7)).map(l => <text key={l} className="axis" x={xs(l)} y={H - 8} textAnchor="middle">{l}</text>)}
          {st !== null && <g><line className="mark" x1={xs(st)} x2={xs(st)} y1={pt} y2={H - pb}/><text className="axis strong" x={xs(st) - 10} y={H - pb - 8} textAnchor="end">settles at layer {st}</text></g>}
          <path className="line s1" d={path}/>
          <line className="cursor" x1={xs(L)} x2={xs(L)} y1={pt} y2={H - pb}/>
          <circle className="pt s1" cx={xs(L)} cy={ys(tr[L])} r={4.5}/>
        </svg>
        <p className="tiny">0 where the answer is outside the lens’s top five at that layer. Layer axis: 0 = embeddings, {m.layers} = the real output.</p>
      </div>
    </div>
    <DataTable summary={`Top guess at every layer after “${tokText(m.tokens[pos])}”`} caption="Logit lens top guess and probability per layer"
      headers={['Layer', 'Top guess', 'Probability', 'Second guess']} rows={m.lens.map((Lr, l) => [l, tokText(Lr[pos][0][0]), pct(Lr[pos][0][1]), `${tokText(Lr[pos][1][0])} ${pct(Lr[pos][1][1])}`])}/>
  </div>;
}

export default function RiverFigure({ base = DEFAULT_BASE, n = 3 }: { base?: string; n?: number }) {
  return <FigureShell id="fig-river" n={n} base={base} file="river.json" title="A prediction locking in, layer by layer" model="Qwen3-1.7B and Qwen3.8-27B · logit lens"
    fallback={{ src: base + 'fig-river.webp', alt: 'The prompt “The Eiffel Tower is in Paris. The Colosseum is in” with the lens guess under each word at layer 21; after “in” the guess is Rome at 85.5 percent. A line chart shows the probability of Rome near zero until layer 20, then jumping to 85 percent at layer 21.', width: 1020, height: 1241 }}
    caption={<>The logit lens reads each layer’s running state through the model’s own final output step. Real recorded runs on one prompt: Qwen3-1.7B in 32-bit precision (Germany 69% at layer 19, Rome 85.5% at layer 21, 97.4% at the output) and Qwen3.8-27B in 16-bit (Rome first leads at layer 57 of 64). Early layers read as noise, which is normal for this method, not a sign the model knows nothing yet.</>}>
    {(d: Data) => <Lens d={d}/>}
  </FigureShell>;
}
