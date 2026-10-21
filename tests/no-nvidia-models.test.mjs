// No NVIDIA model or product evaluations or references on the site: names, results and workshop references.
// (The employer line and hardware mentions are a separate decision and are not checked here.)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const BANNED = /nemotron|parakeet|canary-qwen|sortformer|nano omni|\bnemo\b|\bNIM\b|abridge/i;

test('No NVIDIA model or product names in pages, content, generated text or OG card text', () => {
  const files = [...walk('app'), ...walk('components/portfolio'), ...walk('lib')].filter(f => /\.(tsx?|css)$/.test(f))
    .concat(['public/llms.txt', 'public/rss.xml', 'public/sitemap.xml', 'scripts/og-routes.json', 'scripts/generate-seo.mjs']);
  for (const f of files) {
    const m = readFileSync(f, 'utf8').match(BANNED);
    assert(!m, `${f}: ${m && m[0]}`);
  }
  if (existsSync('dist/client')) for (const f of walk('dist/client').filter(f => /\.(html|txt|xml|rsc)$/.test(f))) {
    const m = readFileSync(f, 'utf8').match(BANNED);
    assert(!m, `${f}: ${m && m[0]}`);
  }
});
