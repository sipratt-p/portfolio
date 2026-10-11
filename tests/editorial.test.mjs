import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
import { spawnSync } from 'node:child_process';
const read = p => readFileSync(p,'utf8');
const compile = p => transpileModule(read(p),{compilerOptions:{module:ModuleKind.ESNext,target:ScriptTarget.ES2022}}).outputText;
const dataUrl = code => `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
const {notes,independentProjects} = await import(dataUrl(compile('lib/editorial.ts')));
test('Original editorial content has sources, limitations, unique slugs and working local relationships',()=>{
 assert.equal(notes.length,20); assert.equal(independentProjects.length,3);
 const all = [...notes,...independentProjects]; assert.equal(new Set(all.map(e=>e.slug)).size,23);
 for(const e of all){
  assert(e.basis.length>100); assert(e.limitations.length>80); assert(e.sections.length>=5);
  const count=e.sections.flatMap(s=>s.paragraphs).join(' ').split(/\s+/).length;assert(count>=280,`${e.slug}: ${count} words`);
  assert.equal(new Set(e.sections.map(s=>s.id)).size,e.sections.length);
 }
});
test('Historical video findings keep SKIP, advisory and calibration caveats',()=>{
 const s=JSON.stringify(notes.find(n=>n.slug==='evaluating-agentic-video'));
 for(const term of ['59 clips','26 clips flagged','13 clips flagged','may overlap','SKIP','advisory','uncalibrated','proposed durable fix','no new renders']) assert(s.includes(term),term);
});
test('Agent evaluations do not hide human intervention or turn timeouts into a verdict',()=>{
 const s=JSON.stringify(notes.find(n=>n.slug==='local-agent-evaluations'));
 for(const term of ['17/100','97/100','392/400','359/400','389/400','interrupted','inconclusive','narrow sample'])assert(s.includes(term),term);
});
test('Project pages retain descriptive product links without assigning medical credentials',()=>{
 assert.equal(independentProjects[0].product.url,'https://autotalent.ai');
 assert.equal(independentProjects[1].product.url,'https://drgrey.ai');
 assert.equal(independentProjects[2].product.url,'https://github.com/sipratt-p/cue-engine');
 assert(JSON.stringify(independentProjects[1]).includes('not a claim to medical authorship'));
 const work=read('lib/work.ts');for(const url of ['https://autotalent.ai','https://drgrey.ai',"'/work/autotalent'","'/work/drgrey-ai'"])assert(work.includes(url),url);
});
test('Indexing requires both explicit approval flag and Vercel production environment',()=>{
 const url=dataUrl(compile('lib/seo.ts'));
 for(const [flag,environment,expected] of [['','',false],['true','preview',false],['','production',false],['true','production',true]]){
  const r=spawnSync(process.execPath,['--input-type=module','-e',`const s=await import('${url}');process.stdout.write(JSON.stringify(s.indexingEnabled));`],{env:{...process.env,PORTFOLIO_PUBLIC_INDEXING:flag,VERCEL_ENV:environment},encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);assert.equal(r.stdout,String(expected));
 }
});
test('Person identity links are trimmed to maintained profiles plus Everdust',async()=>{
 const {identityGraph}=await import(dataUrl(compile('lib/seo.ts')));
 const person=identityGraph['@graph'].find(e=>e['@type']==='Person');
 assert.deepEqual(person.sameAs,['https://www.linkedin.com/in/sethpratt/','https://github.com/sipratt-p','https://x.com/sethprattsf','https://everdust.ai']);
 assert.equal(person.jobTitle,'Applied AI Product Leader');
 for(const stale of ['pinterest','quora','medium.com','crunchbase'])assert(!JSON.stringify(identityGraph).includes(stale),stale);
 assert(!JSON.stringify(identityGraph).includes('aggregateRating'));
});

 test('Fable has a sourced creative essay, with the full arc and opt-in Studio links',()=>{
 const n=notes.find(n=>n.slug==='fable-creative-experiments');assert(n);
 const s=JSON.stringify(n);
 for(const name of ['Things I Love','Long Exposure','The Keeper','Fable','Tell Me Again','Second Winter'])assert(s.includes(name),name);
 assert.equal(n.workflow.length,0);assert.equal(n.featureImage.src,'/studio/fable.jpg');
 for(const slug of ['fable','the-keeper','second-winter'])assert(s.includes('/studio/'+slug));
 assert(n.basis.includes('September 2 reflection'));assert(n.limitations.includes('creative record'));
 assert(!read('components/portfolio/editorial-page.tsx').includes('<video'));
 const redirects=JSON.parse(read('vercel.json')).redirects;
 for(const slug of ['fable','the-keeper','second-winter'])assert(redirects.some(r=>r.source==='/studio/'+slug&&r.destination.startsWith('/writing/fable-creative-experiments#')),slug);
 assert(!/"href":"\/studio/.test(s),'no links to the retired Studio pages');
 });

test('Creative-tool post distinguishes adapted research loops, installations and actual results',()=>{
 const n=notes.find(n=>n.slug==='creative-ai-tools-autoresearch');const s=JSON.stringify(n);
 for(const term of ['LTX','H3','ACE-Step','Music3','SoulX-Singer','Qwen-Image-2512','Higgs','SeedVR2','ComfyUI','does not run the unmodified repository','18-word','not a universal','missing evidence'])assert(s.includes(term),term);
 assert(s.includes('https://github.com/karpathy/autoresearch'));
 assert(n.limitations.includes('No new renders'));
});
test('Inference post keeps source dates, suite boundaries, upstream credit and missing time records',()=>{
 const n=notes.find(n=>n.slug==='local-model-performance-engineering');const s=JSON.stringify(n);
 for(const term of ['233.8','9,243','1,712','113.9','10,043','2026','not the four-task Prime','open-source maintainers','not a complete timesheet','inconclusive','queueing'])assert(s.includes(term),term);
 assert(n.limitations.includes('none were remeasured'));
});

test('Field-note titles name the subject and cards use reader-facing summaries',()=>{
 const expected=['Building long-running local AI agents','Evaluating H3 and LTX video renders','Benchmarking local coding agents','Fable: experiments in creative expression','LTX, H3, Music3 and ACE-Step: what I learned','Optimizing local AI: kernels, prefill and decode','Ambient clinical documentation on open weights','Finding where songs start inside a DJ mix','Refusal ablation, measured','A private AI assistant, tested end to end','Chaos with nothing to orbit','Watching a language model think','What running a team of AI agents taught me about applied AI in product management','When the metric says yes and your eyes say no','One sim, seven platforms: porting with agents and tests','Tuning a game with panels of AI playtesters','Create: a language model, a parts list and a validator','Autoresearch at home: eight search-and-score loops, and where the scorer lied','Testing a VR game: our bots knew the answer, a person in a headset didn’t','Tuning an AI recruiting agent: what we measured and what moved'];
 assert.deepEqual(notes.map(n=>n.title),expected);
 for(const n of notes){assert(n.summary.length>70);assert(!n.summary.includes('Seth Pratt'));}
 assert(read('app/writing/page.tsx').includes('n.summary'));
 assert(read('lib/site.ts').includes("href: '/writing', label: 'Writing'"));
});

test('AutoTalent leads with search agents and MCP without implying autonomous hiring decisions',()=>{
 const p=independentProjects.find(p=>p.slug==='autotalent');
 const card=read('lib/work.ts');
 assert(p.title.includes('agentic recruiting'));
 assert(p.seoTitle.includes('Search Agents & MCP'));
 for(const term of ['candidate search agents','MCP integrations']){assert(p.description.includes(term));assert(card.includes(term));}
 assert(p.lede.includes('keeping recruiters in control'));
 assert(p.sections.find(s=>s.id==='workflow').paragraphs.join(' ').includes('Model Context Protocol (MCP)'));
 assert(p.workflow.includes('Review & approve'));
 assert(p.basis.includes('confirmed September 6, 2026'));
});

test('Published repositories are linked from the notes they back, with dates on the additions',()=>{
 const by=slug=>JSON.stringify(notes.find(n=>n.slug===slug));
 assert(by('local-agent-evaluations').includes('github.com/sipratt-p/coding-agent-bench'));
 for(const repo of ['blackwell-serving-kit','dsv4-flash-nvfp4-sm120','omlx-dualane-recipe'])assert(by('local-model-performance-engineering').includes('github.com/sipratt-p/'+repo),repo);
 for(const repo of ['video-rsi','ugc-factory-core'])assert(by('evaluating-agentic-video').includes('github.com/sipratt-p/'+repo),repo);
 assert(by('creative-ai-tools-autoresearch').includes('github.com/sipratt-p/ugc-factory-core'));
 for(const [slug,when] of Object.entries({'local-agent-evaluations':'2026-09-23','local-model-performance-engineering':'2026-09-16','evaluating-agentic-video':'2026-09-16','creative-ai-tools-autoresearch':'2026-09-16'}))assert.equal(notes.find(n=>n.slug===slug).updated,when,slug);
 for(const repo of ['refusal-ablation-eval','model-comparison'])assert(by('local-agent-evaluations').includes('github.com/sipratt-p/'+repo),repo);
 assert(by('local-agent-evaluations').includes('489/500'));
 const clinical=notes.find(n=>n.slug==='ambient-clinical-documentation-open-weights');assert(clinical);assert.equal(clinical.prepared,'2026-09-16');
 const c=JSON.stringify(clinical);for(const term of ['PriMock57','ACI-Bench','10.3%','8.6 points','98.7 to 99.6','Injected errors are not natural errors','Non-commercial','nothing here is clinical advice','github.com/sipratt-p/scribe-bench'])assert(c.includes(term),term);
 assert(read('components/portfolio/editorial-page.tsx').includes('entry.updated'));
});

test('Cue has a sourced project page, a homepage card, its media, and a field note with the per-genre table',()=>{
 const p=independentProjects.find(p=>p.slug==='cue');assert(p);const s=JSON.stringify(p);
 for(const term of ['190','99','62','about 9 seconds','not yet on the App Store','MP4 chapters','0.4 seconds','freely downloadable','/media/cue-demo.mp4','/projects/cue/cue-screens.jpg'])assert(s.includes(term),term);
 assert.equal(p.prepared,'2026-09-16');
 for(const f of ['public/projects/cue/cue-screens.jpg','public/projects/cue/cue-demo-poster.jpg','public/media/cue-demo.mp4'])assert(statSync(f).size>10000,f);
 assert(statSync('public/media/cue-demo.mp4').size<25000000);
 const card=read('lib/work.ts');assert(card.includes("slug: 'cue'"));assert(card.includes('https://github.com/sipratt-p/cue-engine'));
 const n=notes.find(n=>n.slug==='finding-song-starts-in-dj-mixes');assert(n);const t=JSON.stringify(n);
 for(const term of ['Euphoric hardstyle','Peak-time house','39 s','did not help','novelty curve','beat grid','personal-use only','/work/cue'])assert(t.includes(term),term);
});

test('Refusal ablation note carries the matrix, the gate and the open items',()=>{
 const n=notes.find(n=>n.slug==='refusal-ablation-measured');assert(n);assert.equal(n.prepared,'2026-09-23');
 const s=JSON.stringify(n);for(const term of ['489/500','400/500','98 to 13','no-op','483/500','379/500','github.com/sipratt-p/refusal-ablation-eval','No weights are distributed','matched'])assert(s.includes(term),term);
 assert(n.sections.some(sec=>sec.table&&sec.table.rows.length>=7));
});

test('The private AI note links its repository, shows its evidence and states its limits',()=>{
 const n=notes.find(n=>n.slug==='private-local-ai-assistant');assert(n);assert.equal(n.prepared,'2026-09-24');
 const s=JSON.stringify(n);for(const term of ['github.com/sipratt-p/confidential-research-platform','was a Tor relay','onion service','96.9%','scorer’s fault','no external security audit','AGPL-3.0'])assert(s.includes(term),term);
});

test('October 2026 notes keep their measured numbers, lessons and limits',()=>{
 const by=slug=>{const n=notes.find(n=>n.slug===slug);assert(n,slug);assert(['2026-10-10','2026-10-11'].includes(n.prepared),slug);return JSON.stringify(n);};
 const terms={
  'tuning-autotalent':["18 percent", "216 ms", "0.72", "$0.14", "99 tools", "weak labels"],
  'testing-a-vr-game':["550,948", "4,182,198,941", "30 of 30", "4 of 4", "escape rate", "perfect’ bot is not evidence", "ongoing"],
  'running-a-team-of-ai-agents':['18 of them','Lesson learned','27 rows','2,002','36 usage-limit stops','not a controlled study'],
  'when-the-metric-says-yes':['0.74','sock puppet','Goodhart','28 comparison sheets','30 frames per second','No renders were re-run'],
  'one-sim-seven-platforms':['81 minutes','NaN','has run on a headset','validated, not run','everdust.ai/play'],
  'tuning-a-game-with-ai-playtesters':['5.11','7.72','8.5','a little too easy now','±0.5','46'],
  'create-constrained-generation':['20 of 20','$0.29','3.05','winnable','refunded','can’t make'],
  'autoresearch-at-home':['2.5 billion','3,084,347','37 percent','97 survived','24 of 40','all 40','0.77','calibrated against people'],
 };
 for(const [slug,list] of Object.entries(terms)){const s=by(slug);for(const t of list)assert(s.includes(t),`${slug}: ${t}`);}
 const lessons=notes.find(n=>n.slug==='running-a-team-of-ai-agents').sections.filter(s=>s.takeawayLabel==='Lesson learned');
 assert(lessons.length>=6);
});

test('Every writing item is dated to its work: a start and end, never after the page was last edited',()=>{
 for(const e of [...notes,...independentProjects]){
  assert(e.work,`${e.slug}: no work dates`);
  const iso=/^\d{4}-\d{2}-\d{2}$/;assert(iso.test(e.work.start)&&iso.test(e.work.end),e.slug);
  assert(e.work.start<=e.work.end,`${e.slug}: start after end`);
  const edited=[e.updated,e.prepared,'2026-09-05'].filter(Boolean).sort().at(-1);
  assert(e.work.end<=edited,`${e.slug}: work ends ${e.work.end}, after the page was written (${edited})`);
 }
 const page=read('components/portfolio/editorial-page.tsx');
 assert(page.includes('e.work?.end ??'));assert(page.includes('Work: <time'));
 assert(read('scripts/generate-seo.mjs').includes('rfc(workDate(n))'));
});

test('testing-a-vr-game images exist and are small', () => {
 const n=notes.find(n=>n.slug==='testing-a-vr-game');
 const imgs=[n.featureImage,...n.sections.map(s=>s.image).filter(Boolean)];
 assert(imgs.length>=7);
 for(const im of imgs){const f='public'+im.src;assert(statSync(f).size>10000&&statSync(f).size<400000,f);assert(im.alt.length>20&&im.caption.length>20);}
});
