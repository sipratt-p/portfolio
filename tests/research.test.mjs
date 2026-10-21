// Research signal for applied-AI research roles: synthetic data, post-training and benchmark method are visible on the
// home page, About and the résumé, and every number added here comes from a public source with its conditions.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
const read = p => readFileSync(p, 'utf8');
const load = async p => import('data:text/javascript;base64,' + Buffer.from(transpileModule(read(p), { compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2022 } }).outputText).toString('base64'));
const { notes } = await load('lib/editorial.ts');

test('The coding-agent note shows harness, sampling and engine effects from the public README, with run-note caveats', () => {
  const n = notes.find(n => n.slug === 'local-agent-evaluations');
  const s = n.sections.find(s => s.id === 'harness-effects'); assert(s);
  const t = JSON.stringify(s);
  for (const term of ['453 to 459', '481 to 495', '25 to 40 points', '376', '98 and 13', 'temperature 0', '62 to 63', '193', '387', '478', 'run notes'])
    assert(t.includes(term), term);
  assert(s.links.some(l => l.href.startsWith('https://github.com/sipratt-p/coding-agent-bench')));
  assert.equal(n.updated, '2026-10-20');
  assert(n.basis.includes('October 20, 2026'));
  assert(n.findings.length >= 3 && n.findings.length <= 5);
  assert(!t.includes('—'), 'no em dashes in the new section');
});

test('Synthetic data and the open models are on the home page, About and the résumé', () => {
  assert(read('app/page.tsx').includes('train small verifier models on synthetic data'));
  assert(read('app/about/page.tsx').includes('train small verifier models on planted-error synthetic data'));
  const cv = read('app/resume/page.tsx');
  for (const term of ["href: '/work/models'", 'planted-error synthetic data', '73.5% to 94.0%', 'Synthetic data and training', '25 to 40 point harness effect'])
    assert(cv.includes(term), term);
  assert(read('public/llms.txt').includes('small verifier models trained on planted-error synthetic data'));
});
