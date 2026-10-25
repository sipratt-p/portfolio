// Guards for the October 2026 redesign: every internal link resolves, Lab media is silent, short and
// flash-gated, copy rules hold, the type scale stays at eight sizes, and legacy URLs redirect.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
import { PRIV } from './private-terms.mjs';
const read = p => readFileSync(p, 'utf8');
const load = async p => import('data:text/javascript;base64,' + Buffer.from(transpileModule(read(p), { compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2022 } }).outputText).toString('base64'));
const { notes, independentProjects } = await load('lib/editorial.ts');
const { workItems, shipped } = await load('lib/work.ts');
const { labSeries, lab } = await load('lib/lab.ts');
const { caseStudies } = await load('lib/cases.ts');
const { startHere } = await load('lib/site.ts');
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const sources = [...walk('app'), ...walk('components/portfolio'), ...walk('lib')].filter(p => /\.(tsx?|css)$/.test(p));

const routes = new Set(['/', '/start', '/work', '/work/archive', '/lab', '/writing', '/about', '/resume', '/how-i-write',
  ...caseStudies.map(c => `/work/${c.slug}`), ...independentProjects.map(p => `/work/${p.slug}`),
  ...labSeries.map(s => `/lab/${s.slug}`), ...notes.map(n => `/writing/${n.slug}`)]);
const anchors = {
  ...Object.fromEntries(caseStudies.map(c => [`/work/${c.slug}`, ['found', ...c.sections.map(s => s.id)]])),
  ...Object.fromEntries(labSeries.map(s => [`/lab/${s.slug}`, ['found', s.hero.id, ...s.pieces.map(p => p.id), ...s.more.map(p => p.id)]])),
  ...Object.fromEntries([...notes, ...independentProjects].map(n => [`/${n.type === 'note' ? 'writing' : 'work'}/${n.slug}`, ['found', 'source-note', ...n.sections.map(s => s.id)]])),
  '/work': ['archive', ...workItems.map(w => w.slug), 'evals', 'agents', 'inference', 'products'],
  '/about': ['start', 'about-contact'],
};

function checkHref(href, where) {
  if (/^(https?:|mailto:)/.test(href) || href.startsWith('#')) return;
  const [p, hash] = href.split('#');
  if (existsSync('public' + p) && statSync('public' + p).isFile()) return;
  assert(routes.has(p), `${where}: ${href} is not a route`);
  if (hash && anchors[p]) assert(anchors[p].includes(hash), `${where}: #${hash} missing on ${p}`);
}

test('Every internal link in the content data resolves to a route (and anchor)', () => {
  for (const w of workItems) { checkHref(w.primary, w.slug); w.links.forEach(l => checkHref(l.href, w.slug)); }
  for (const s of labSeries) [s.hero, ...s.pieces, ...s.more].forEach(p => { if (p.href) checkHref(p.href, s.slug); (p.links ?? []).forEach(l => checkHref(l.href, `${s.slug}#${p.id}`)); });
  lab.recent.forEach(p => p.href && checkHref(p.href, 'lab.recent'));
  lab.coming.forEach(c => checkHref(c.href, 'lab.coming'));
  for (const c of caseStudies) c.related.forEach(r => checkHref(r.href, c.slug));
  startHere.forEach(s => checkHref(s.href, 'startHere'));
  for (const n of [...notes, ...independentProjects]) {
    n.related.forEach(l => checkHref(l.href, n.slug));
    n.sections.forEach(s => (s.links ?? []).forEach(l => checkHref(l.href, n.slug + '#' + s.id)));
  }
});

test('Every literal internal href in pages and components resolves', () => {
  for (const f of sources.filter(f => f.endsWith('.tsx'))) {
    for (const m of read(f).matchAll(/href=(?:"|\{'|\{`)(\/[^"'`{}$]*)["'`]/g)) checkHref(m[1], f);
    for (const m of read(f).matchAll(/href: '(\/[^']*)'/g)) checkHref(m[1], f);   // tile data inside pages
  }
});

test('Lab stills exist at both sizes; loops are silent, ≤ 6 s, small, and passed the flash gate', () => {
  const images = new Set([...labSeries.flatMap(s => [s.hero, ...s.pieces]), ...lab.recent].filter(p => p.image).map(p => p.image));
  for (const m of read('app/page.tsx').matchAll(/image: '([a-z0-9-]+)'/g)) images.add(m[1]);
  images.add('everdust-app');
  for (const name of images) for (const f of [`${name}.jpg`, `${name}-800.jpg`]) assert(statSync('public/media/lab/img/' + f).size > 5000, f);
  const loops = new Set([...labSeries.flatMap(s => [s.hero, ...s.pieces]), ...lab.recent].filter(p => p.loop).map(p => p.loop));
  for (const m of read('app/page.tsx').matchAll(/loop: '([a-z0-9-]+)'/g)) loops.add(m[1]);
  for (const m of read('app/lab/page.tsx').matchAll(/loop="([a-z0-9-]+)"/g)) loops.add(m[1]);
  assert(loops.size >= 6);
  for (const id of loops) {
    const mp4 = `public/media/lab/loops/${id}.mp4`;
    const buf = readFileSync(mp4);
    assert(buf.length < 2_500_000, `${id} is ${buf.length} bytes`);
    const hdlr = buf.indexOf('hdlr');
    for (let i = hdlr; i >= 0; i = buf.indexOf('hdlr', i + 4)) assert.notEqual(buf.toString('latin1', i + 12, i + 16), 'soun', `${id} has an audio track`);
    const gate = JSON.parse(read(`public/media/lab/loops/${id}.flashgate.json`));
    assert.equal(gate.verdict, 'PASS', id);
    assert(gate.frames / 30 <= 6.01, `${id} runs ${gate.frames / 30} s`);
    assert.equal(gate.general_flashes_per_s_worst_tile, 0, id);
  }
  const total = walk('public/media/lab').reduce((n, f) => n + statSync(f).size, 0);
  assert(total < 45_000_000, `Lab media is ${total} bytes`);
  const preview = read('components/portfolio/preview-media.tsx');
  assert(preview.includes('muted loop playsInline preload="none"'));
  assert(!/autoPlay/.test(preview));
  assert(preview.includes("prefers-reduced-motion: reduce"));
});

test('Copy rules: no private company names, no Studio exit line, no “10 minutes”, no celebrity work', () => {
  for (const f of sources) {
    const s = read(f);
    if (PRIV) assert(!new RegExp(PRIV.company, 'i').test(s), `${f} names a private company`);
    assert(!s.includes('Back to the professional side'), f);
    assert(!/10 minutes/.test(s), f);
    for (const name of PRIV ? PRIV.names : []) assert(!s.includes(name), `${f}: a private name`);
  }
  for (const d of PRIV ? PRIV.domains : []) assert(!read('lib/work.ts').includes(d));
});

test('The live copilot is never described with “diagnoses”, “alerts” or “CDS”', () => {
  const copilot = [
    read('components/portfolio/copilot-panel.tsx').replace(/\/\/.*$/gm, ''),
    JSON.stringify(caseStudies.find(c => c.slug === 'scribe-bench').sections.find(s => s.id === 'copilot')),
    JSON.stringify(workItems.find(w => w.slug === 'live-copilot')),
    read('app/page.tsx').slice(read('app/page.tsx').indexOf('a visit copilot') - 200, read('app/page.tsx').indexOf('a visit copilot') + 300),
  ].join('\n');
  assert(!/diagnos|alert|\bCDS\b/i.test(copilot));
  assert(copilot.includes('Synthetic visits only'));
  assert(read('app/page.tsx').includes('a visit copilot that suggests the next question and drafts a cited note for review, on synthetic visits only'), 'home names the copilot and its synthetic-only basis');
});

test('Eight-size type scale: every font-size in the stylesheet is a scale token', () => {
  const css = read('app/globals.css');
  const sizes = [...css.matchAll(/--fs-(\d+):(\d+)px/g)].map(m => Number(m[2]));
  assert.deepEqual(sizes, [12, 14, 16, 18, 22, 30, 44, 64]);
  for (const m of css.matchAll(/font-size:([^;}!]+)/g)) assert(/^var\(--(fs-\d+|h1|h1-page|lead)\)$/.test(m[1].trim()), `font-size:${m[1]}`);
});

test('Legacy URLs 308 to their new homes, without catch-alls that would swallow media', () => {
  const redirects = JSON.parse(read('vercel.json')).redirects;
  const to = src => redirects.find(r => r.source === src)?.destination;
  assert.equal(to('/notes'), '/writing'); assert.equal(to('/notes/:slug'), '/writing/:slug');
  assert.equal(to('/local-ai'), '/writing'); assert.equal(to('/studio'), '/lab');
  assert.equal(to('/projects/cue'), '/work/cue');
  for (const s of ['bridge-fight', 'matrix-bullet-time', 'h3-ugc', 'george-dwight-ai', 'ego']) assert.equal(to('/studio/' + s), '/lab', s);
  for (const s of ['enterprise-ai', 'universal-search', 'av-validation', 'reconcile', 'experimentation']) assert.equal(to('/work/' + s), '/work/archive#' + s);
  assert(redirects.every(r => r.permanent === true));
  assert(!redirects.some(r => /^\/(studio|projects)\/:/.test(r.source)), 'no catch-all over /studio or /projects (images live there)');
  for (const r of redirects) checkHref(r.destination.replace(':slug', notes[0].slug), 'redirect ' + r.source);
});

test('SEO basics: OG card per route, large Twitter cards, sitemap lastmod, llms.txt and RSS', () => {
  const seo = read('lib/seo.ts');
  assert(seo.includes("card: 'summary_large_image'"));
  for (const r of routes) assert(statSync(`public/og/${r === '/' ? 'home' : r.slice(1).replace(/\//g, '-')}.jpg`).size > 10000, r);
  const sitemap = read('public/sitemap.xml');
  assert.equal((sitemap.match(/<url>/g) || []).length, routes.size);
  assert.equal((sitemap.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) || []).length, routes.size);
  const llms = read('public/llms.txt'); const rss = read('public/rss.xml');
  for (const n of notes) { assert(llms.includes(`/writing/${n.slug}`), n.slug); assert(rss.includes(`/writing/${n.slug}`), n.slug); }
  assert(llms.startsWith('# Seth Pratt'));
});

test('Shipped row and Work index carry the agreed products and statuses', () => {
  assert.deepEqual(shipped.map(s => s.name), ['Everdust', 'Create', 'ElmoSEO', 'Dr. Grey', 'Cue']);
  assert(shipped.find(s => s.name === 'Everdust').status.includes('Live on Apple Vision Pro and Google Play'));
  for (const slug of ['scribe-bench', 'video-evals', 'coding-agent-bench', 'live-copilot', 'serving-kits', 'ai-playtesters', 'confidential-research-platform', 'refusal-ablation', 'cue', 'autotalent', 'drgrey-ai', 'elmoseo', 'everdust', 'create'])
    assert(workItems.some(w => w.slug === slug), slug);
});

test('Built pages (when present): internal links never carry the off-site arrow', () => {
  if (!existsSync('dist/client/index.html')) return;
  for (const f of walk('dist/client').filter(f => f.endsWith('.html'))) {
    for (const m of read(f).matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
      const href = (m[1].match(/href="([^"]*)"/) || [])[1] ?? '';
      if (href.startsWith('/') || href.startsWith('#')) assert(!m[2].includes('↗'), `${f}: ${href}`);
      if (/target="_blank"/.test(m[1])) assert(/^https?:/.test(href), `${f}: new-tab link ${href} is internal`);
    }
  }
});
