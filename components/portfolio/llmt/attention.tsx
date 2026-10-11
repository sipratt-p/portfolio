'use client';
// Figure: three ways to ask "what did the model look at?" for the same prediction. Qwen3-1.7B (bf16).
// raw attention, value-weighted attention, and a knockout (re-run the model with the word made invisible).
import { useState } from 'react';
import { FigureShell, Segmented, Tok, tokText, pct, DataTable, DEFAULT_BASE } from './common';

type KO = { top: string; topP: number; pAns: number };
type P = { prompt: string; words: string[]; answer: string; pAnsFirst: number; top3: [string, number][]; raw: number[]; evidence: number[]; ko: KO[] };
type Data = { prompts: P[] };
type Mode = 'raw' | 'evidence' | 'ko';

const MODES: { v: Mode; label: string }[] = [{ v: 'raw', label: 'Raw attention' }, { v: 'evidence', label: 'Weighted' }, { v: 'ko', label: 'Knockout' }];
const EXPLAIN: Record<Mode, string> = {
  raw: 'Share of attention from the last word to each word, averaged over the top half of the layers and all heads. This is what most attention visualisations draw.',
  evidence: 'The same attention, weighted by how much each word\'s attended content can actually change the output. Words that soak up attention while saying nothing shrink.',
  ko: 'Re-run the model with the word made invisible to every later word, in all 28 layers, and see how the probability of the answer changes. This is a causal test.',
};

function View({ d }: { d: Data }) {
  const [pi, setPi] = useState(6);
  const [mode, setMode] = useState<Mode>('raw');
  const p = d.prompts[pi];
  const n = p.words.length;
  const delta = p.ko.map(k => k.pAns - p.pAnsFirst);
  const vals = mode === 'raw' ? p.raw : mode === 'evidence' ? p.evidence : delta.map((x, i) => (i === n - 1 ? 0 : Math.max(0, -x)));
  const vmax = Math.max(...vals, 1e-6);
  const iRaw = p.raw.indexOf(Math.max(...p.raw));
  const iKo = delta.slice(0, n - 1).indexOf(Math.min(...delta.slice(0, n - 1)));
  const iEv = p.evidence.indexOf(Math.max(...p.evidence));
  const flip = p.ko[iKo].top !== p.answer;
  return <div className="attn">
    <div className="llmt-controls">
      <label className="attn-pick small">Prompt
        <select value={pi} onChange={e => setPi(+e.target.value)}>
          {d.prompts.map((q, k) => <option key={k} value={k}>{q.prompt} …</option>)}
        </select>
      </label>
      <Segmented label="Measure" value={mode} onChange={setMode} options={MODES}/>
    </div>
    <p className="small attn-explain">{EXPLAIN[mode]}</p>
    <p className="attn-answer small">The model’s answer: <strong><Tok t={p.answer}/></strong> at {pct(p.pAnsFirst)} for its first piece.</p>
    <ol className="attn-words" aria-label={`Prompt words shaded by ${MODES.find(m => m.v === mode)!.label.toLowerCase()}`}>
      {p.words.map((w, i) => {
        const v = vals[i], last = i === n - 1;
        const label = mode === 'raw' ? pct(p.raw[i]) : mode === 'evidence' ? pct(p.evidence[i]) : last ? 'n/a' : `${delta[i] > 0 ? '+' : delta[i] < 0 ? '−' : '±'}${Math.abs(Math.round(delta[i] * 100))} pts`;
        return <li key={i} className={mode === 'ko' && last ? 'na' : ''} style={{ ['--v' as string]: String(Math.min(1, v / vmax)) }}
          aria-label={`${tokText(w)}: ${label}${mode === 'ko' && !last && p.ko[i].top !== p.answer ? `, answer flips to ${tokText(p.ko[i].top)}` : ''}`}>
          <span className="attn-w"><Tok t={w}/></span><span className="attn-v mono">{label}</span>
        </li>;
      })}
    </ol>
    <div className="attn-sum">
      <p><span className="attn-k">Raw attention</span><span>most weight on <strong>“{tokText(p.words[iRaw])}”</strong> ({pct(p.raw[iRaw])}), the first word</span></p>
      <p><span className="attn-k">Weighted</span><span>most weight on <strong>“{tokText(p.words[iEv])}”</strong> ({pct(p.evidence[iEv])}){iEv === n - 1 ? ', the word it is reading from' : ''}</span></p>
      <p><span className="attn-k">Knockout</span><span>hiding <strong>“{tokText(p.words[iKo])}”</strong> moves the answer most, {pct(p.pAnsFirst)} → {pct(p.ko[iKo].pAns)}{flip ? <>, and the top answer becomes “{tokText(p.ko[iKo].top)}”</> : ''}</span></p>
    </div>
    <p className="tiny">The knockout cannot test the last word: that is where the model is reading from. Positive numbers mean hiding the word made the answer more likely.</p>
    <DataTable summary="This prompt's numbers as a table" caption={`Raw attention, weighted attention and knockout effect for “${p.prompt}”`}
      headers={['Word', 'Raw attention', 'Weighted', 'Knockout: answer probability']} rows={p.words.map((w, i) => [tokText(w), pct(p.raw[i]), pct(p.evidence[i]), i === n - 1 ? 'n/a' : `${pct(p.pAnsFirst)} → ${pct(p.ko[i].pAns)}`])}/>
  </div>;
}

export default function AttentionFigure({ base = DEFAULT_BASE, n = 4 }: { base?: string; n?: number }) {
  return <FigureShell id="fig-attention" n={n} base={base} file="attention.json" title="Three ways to ask what the model looked at" model="Qwen3-1.7B · 8 prompts"
    fallback={{ src: base + 'fig-attention.webp', alt: 'The prompt “The baker took the hot loaves of bread out of the” with each word shaded by raw attention: “The” is darkest at 57 percent, while “out” and “of” are pale at about 5 percent.', width: 1020, height: 929 }}
    caption={<>Same model, same prediction, three answers. Across the eight prompts, raw attention’s favourite word is the first word every time (52–67%, even though a hidden start token is there to absorb it). The word whose removal moves the answer most never matches raw attention’s favourite, and matches the weighted version in two of eight. Both attention measures rank words only loosely like the knockout does (rank correlation about 0.42 each).</>}>
    {(d: Data) => <View d={d}/>}
  </FigureShell>;
}
