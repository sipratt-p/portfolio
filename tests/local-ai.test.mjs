import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
const read = path => readFileSync(path, 'utf8');

test('Local AI is discoverable from the homepage and shared navigation', () => {
  assert(read('components/portfolio/header.tsx').includes("href:'/local-ai'"));
  assert(read('components/portfolio/personal-projects.tsx').includes('<LocalAINote/>'));
  assert(read('components/portfolio/local-ai-note.tsx').includes('href="/local-ai"'));
});
test('Local AI covers the requested practice without embedding a media feed', () => {
  const page = read('app/local-ai/page.tsx');
  for (const topic of ['RTX PRO 6000','Blackwell','open-source','open-weight','fine-tune','LoRA','abliteration','H3','LTX','MiniMax Music 3 (M3)','ACE-Step']) assert(page.includes(topic),topic);
  assert(page.includes('2×'));
  assert(!/<video|<iframe/.test(page));
  assert(!/<video|<iframe/.test(read('components/portfolio/local-ai-note.tsx')));
});
test('The final George/Dwight comedy has its own opt-in Studio entry', () => {
  const data = read('lib/portfolio.ts');
  assert(data.includes("slug:'george-dwight-ai'"));
  assert(data.includes("duration:'0:41'"));
  assert(data.includes('AI-generated fan parody'));
  assert.equal(statSync('public/media/george-dwight-ai.mp4').size,4806855);
  assert(statSync('public/studio/george-dwight-ai.jpg').size>1000);
  assert(read('app/local-ai/page.tsx').includes('href="/studio/george-dwight-ai"'));
  assert(read('app/studio/page.tsx').includes('Featured renders <span>04</span>'));
});

test('Long-running agents are the first and visually featured Local AI priority', () => {
  const page = read('app/local-ai/page.tsx');
  const entries = [...page.matchAll(/number: '(\d+)', title: '([^']+)'/g)];
  assert.deepEqual(entries.map(entry=>entry[1]),['01','02','03','04','05']);
  assert.equal(entries[0][2],'Long-running, purpose-built AI agents');
  for (const task of ['Video Rendering Agents','Personal Assistant','Media Management Agent','Coding Agent']) assert(page.includes(task),task);
  assert(page.includes("practice.number === '01' ? 'lab-practice-featured'"));
  assert(page.includes('My main focus is long-running AI agents'));
  assert(read('components/portfolio/local-ai-note.tsx').includes('Long-running AI agents, tailored to'));
});
