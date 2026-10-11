'use client';
// Figure: Guess the next word. You pick one of four words; then the model's real odds are revealed.
// Data: Qwen3-1.7B (bf16) next-token probabilities, recorded by the Guess the Next Word game build.
import { useMemo, useState } from 'react';
import { FigureShell, Tok, tokText, pct, DataTable, DEFAULT_BASE } from './common';

type Card = { w: string; p: number; human?: boolean };
type Round = { prompt: string; kind: 'odds' | 'trap'; top: [string, number][]; entropy: number; cards: Card[] };
type Data = { model: string; rounds: Round[] };

const ORDER = ['The cat sat on the', 'The Eiffel Tower is located in', 'Roses are red, violets are', "I'm going to the shop to buy some",
  'He drank a cup of hot', 'The colour of the sky is', 'Two plus two equals', 'My favourite animal is the'];

function shuffle<T>(a: T[], seed: number): T[] {
  const r = [...a]; let s = seed;
  for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

function Game({ d }: { d: Data }) {
  const rounds = useMemo(() => ORDER.map(p => d.rounds.find(r => r.prompt === p)).filter(Boolean) as Round[], [d]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState({ hit: 0, played: 0 });
  const r = rounds[i];
  const cards = useMemo(() => shuffle(r.cards.map((c, k) => ({ ...c, k })), i * 7 + 3), [r, i]);
  const best = r.cards.reduce((m, c, k) => (c.p > r.cards[m].p ? k : m), 0);
  const done = pick !== null;
  const choose = (k: number) => { if (done) return; setPick(k); setScore(s => ({ hit: s.hit + (k === best ? 1 : 0), played: s.played + 1 })); };
  const next = () => { setPick(null); setI((i + 1) % rounds.length); if (i + 1 === rounds.length) setScore({ hit: 0, played: 0 }); };
  const maxp = Math.max(...r.cards.map(c => c.p));
  const human = r.cards.find(c => c.human);
  const topTok = r.top[0];
  let note = '';
  if (done) {
    if (topTok[1] < 0.2) note = `Even the model's favourite next token gets only ${pct(topTok[1])}. The rest of its bet is spread over thousands of options.`;
    else if (topTok[1] > 0.9) note = `Almost no doubt: ${pct(topTok[1])} on one token. Fixed phrases are where models are near-certain.`;
    else note = `Its favourite gets ${pct(topTok[1])}; the other ${pct(1 - topTok[1], 0)} is spread across everything else.`;
    if (human && r.cards.indexOf(human) !== best) note += ` Most people would say “${tokText(human.w)}” (our guess, not a survey); the model gives it ${pct(human.p)}.`;
    if (!/^ [A-Za-z]/.test(topTok[0])) note += ` Its single most likely next token is not even a word: “${topTok[0] === ' ' ? 'a space' : tokText(topTok[0])}”.`;
  }
  return <div className="guess">
    <div className="guess-top">
      <p className="small">Round {i + 1} of {rounds.length}</p>
      <p className="small" aria-live="polite">You matched the model’s favourite word {score.hit} of {score.played}</p>
    </div>
    <p className="guess-prompt">{r.prompt} <span className="guess-blank" aria-label="blank">____</span></p>
    <p className="small guess-ask" id={`guess-ask-${i}`}>Which word does the model think comes next?</p>
    <div className="guess-cards" role="group" aria-labelledby={`guess-ask-${i}`}>
      {cards.map(c => {
        const isBest = c.k === best, chosen = c.k === pick;
        return <button key={c.k} type="button" className={'guess-card' + (done ? ' shown' : '') + (chosen ? ' chosen' : '') + (done && isBest ? ' best' : '')}
          onClick={() => choose(c.k)} aria-disabled={done} aria-pressed={chosen}
          aria-label={done ? `${tokText(c.w)}: ${pct(c.p)}${isBest ? ', the model\'s favourite of these four' : ''}${chosen ? ', your pick' : ''}` : tokText(c.w)}>
          <span className="guess-word">{tokText(c.w)}</span>
          {done && <span className="guess-bar" aria-hidden="true"><span style={{ width: `${Math.max(2, (c.p / maxp) * 100)}%` }}/></span>}
          {done && <span className="guess-p mono">{pct(c.p)}</span>}
          {done && (isBest || chosen) && <span className="guess-tag">{isBest && chosen ? 'your pick · model\'s favourite' : isBest ? 'model\'s favourite' : 'your pick'}</span>}
        </button>;
      })}
    </div>
    {done && <div className="guess-after">
      <p className="guess-note">{note}</p>
      <div className="guess-top8" aria-label="The model's eight most likely next tokens">
        <p className="eyebrow">Its eight most likely next tokens</p>
        <ol>{r.top.map(([t, p]) => <li key={t}><Tok t={t}/><span className="guess-bar thin" aria-hidden="true"><span style={{ width: `${Math.max(1, (p / r.top[0][1]) * 100)}%` }}/></span><span className="mono small">{pct(p)}</span></li>)}</ol>
      </div>
      <button type="button" className="llmt-btn" onClick={next}>{i + 1 === rounds.length ? 'Play again' : 'Next prompt'} <span aria-hidden="true">→</span></button>
    </div>}
  </div>;
}

export default function GuessFigure({ base = DEFAULT_BASE, n = 1 }: { base?: string; n?: number }) {
  return <FigureShell id="fig-guess" n={n} base={base} file="guess.json" title="Guess the next word" model="Qwen3-1.7B · real next-token odds"
    fallback={{ src: base + 'fig-guess.webp', alt: 'A prompt reading “The cat sat on the ____” with four word choices, mat, table, floor and chair, and bars showing the model gives mat 11.6 percent, table 8 percent, floor 4.9 percent and chair 4.3 percent.', width: 1020, height: 1191 }}
    caption={<>Pick a word, then see the probabilities Qwen3-1.7B actually assigns. Each card is a whole word; when a word is split into pieces, its probability is the product of the pieces. In some rounds one card is the word we think most people would say (our guess, not a survey). The model sees a hidden start-of-text token before each prompt.</>}>
    {(d: Data) => <>
      <Game d={d}/>
      <DataTable summary="All eight prompts as a table" caption="The model's four candidate words and their probabilities per prompt"
        headers={['Prompt', 'Words and probabilities']} rows={ORDER.map(p => d.rounds.find(r => r.prompt === p)!).map(r => [r.prompt + ' …', r.cards.map(c => `${tokText(c.w)} ${pct(c.p)}`).join(' · ')])}/>
    </>}
  </FigureShell>;
}
