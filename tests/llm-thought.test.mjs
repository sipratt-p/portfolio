// Guards for /writing/watching-a-language-model-think: every live figure ships its real-data JSON and a still
// fallback, the data stays light, captions name the model, and the corrected Lab numbers stay corrected.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
const read = p => readFileSync(p, 'utf8');
const load = async p => import('data:text/javascript;base64,' + Buffer.from(transpileModule(read(p), { compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2022 } }).outputText).toString('base64'));
const { notes } = await load('lib/editorial.ts');
const { labSeries } = await load('lib/lab.ts');
const SLUG = 'watching-a-language-model-think';
const DIR = 'public/media/writing/llm-thought/';
const FILES = { guess: ['guess.tsx', 'guess.json'], map: ['map3d.tsx', 'map3d.json'], river: ['river.tsx', 'river.json'], attention: ['attention.tsx', 'attention.json'],
  forking: ['forking.tsx', 'forking.json'], search: ['search.tsx', 'search.json'], longctx: ['longctx.tsx', 'longctx.json'] };

test('The LLM-thought note has seven live figures, each with real data, a still fallback and a model named in its header', () => {
  const n = notes.find(n => n.slug === SLUG); assert(n, 'note missing');
  const figs = n.sections.filter(s => s.figure).map(s => s.figure);
  assert.deepEqual(figs, ['guess', 'map', 'river', 'attention', 'forking', 'search', 'longctx']);
  let total = 0;
  for (const id of figs) {
    const [tsx, json] = FILES[id];
    const src = read('components/portfolio/llmt/' + tsx);
    assert(src.includes(`file="${json}"`), `${id} does not load ${json}`);
    assert(/model="[^"]*Qwen/.test(src), `${id}: the figure header must name the model`);
    const m = src.match(/src: base \+ '(fig-[a-z]+\.webp)'/); assert(m, `${id}: no fallback image`);
    assert(statSync(DIR + m[1]).size > 5000, m[1]);
    const size = statSync(DIR + json).size; total += size;
    assert(size < 300_000, `${json} is ${size} bytes`);
    JSON.parse(read(DIR + json));
  }
  total += statSync(DIR + 'forking_texts.json').size;
  assert(total < 1_000_000, `figure data totals ${total} bytes`);
  assert(read('components/portfolio/llmt/common.tsx').includes('<noscript>'), 'no-JS readers need the still image');
  assert(n.sections.every(s => !s.figure || s.takeaway), 'every figure section ends with a takeaway');
});

test('Corrected Lab copy stays corrected and links to the note', () => {
  const s = labSeries.find(s => s.slug === 'inside-the-machine');
  const all = [s.hero, ...s.pieces, ...s.more];
  const get = id => all.find(p => p.id === id);
  assert(get('search').fact.includes('4.7×') && !JSON.stringify(s).includes('4.8×'));
  assert(get('river-of-thought').fact.includes('60 short passages'));
  assert(!get('forking-paths').about.includes('branching points'));
  for (const id of ['river-of-thought', 'search', 'forking-paths', 'ai-games']) assert((get(id).links ?? []).some(l => l.href.startsWith('/writing/' + SLUG + '#')), id);
});

test('The artistic Everdust pieces are labelled as artistic wherever the note links them', () => {
  const n = notes.find(n => n.slug === SLUG);
  for (const l of n.related.filter(l => /everdust\.ai\/play/.test(l.href))) assert(/artistic piece, not model data/.test(l.label), l.href);
});

test('The note’s real-data loops are short, silent, small, flash-gated and never start for reduced-motion readers', () => {
  const n = notes.find(n => n.slug === SLUG);
  const loops = [n.heroLoop, ...n.sections.flatMap(s => [s.loop, s.loopEnd])].filter(Boolean);
  assert(loops.length >= 7, `${loops.length} loops`);
  let total = 0;
  for (const l of loops) {
    const f = `${DIR}loops/${l.id}`;
    const buf = readFileSync(f + '.mp4'); total += buf.length;
    assert(buf.length < 5_200_000, `${l.id}.mp4 is ${buf.length} bytes`);
    for (let i = buf.indexOf('hdlr'); i >= 0; i = buf.indexOf('hdlr', i + 4)) assert.notEqual(buf.toString('latin1', i + 12, i + 16), 'soun', `${l.id} has an audio track`);
    assert(statSync(f + '.webp').size > 3000, `${l.id} poster`);
    const gate = JSON.parse(read(f + '.flashgate.json'));
    assert.equal(gate.verdict, 'PASS', l.id);
    assert(gate.general_flashes_per_s_worst_tile <= 2 && gate.red_flashes_per_s === 0, `${l.id}: ${JSON.stringify(gate)}`);
    assert(l.seconds >= 6 && l.seconds <= 12, `${l.id}: ${l.seconds} s`);
    assert(/real|Real/.test(l.caption), `${l.id}: caption must say what is real`);
  }
  assert(total < 30_000_000, `loops total ${total} bytes`);
  const src = read('components/portfolio/llmt/loop.tsx');
  assert(src.includes('prefers-reduced-motion') && src.includes('muted loop playsInline preload="none"') && !/autoPlay/.test(src));
  assert(statSync(DIR + 'map3d.bin').size < 400_000, 'map3d.bin too large');
});
