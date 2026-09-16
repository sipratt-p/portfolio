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
 assert.equal(notes.length,8); assert.equal(independentProjects.length,3);
 const all = [...notes,...independentProjects]; assert.equal(new Set(all.map(e=>e.slug)).size,11);
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
 const personal=read('components/portfolio/personal-projects.tsx');assert(personal.includes('<article'));assert(personal.includes("'/projects/'+p.slug"));assert(personal.includes("'https://'+p.domain"));
});
test('Indexing requires both explicit approval flag and Vercel production environment',()=>{
 const url=dataUrl(compile('lib/seo.ts'));
 for(const [flag,environment,expected] of [['','',false],['true','preview',false],['','production',false],['true','production',true]]){
  const r=spawnSync(process.execPath,['--input-type=module','-e',`const s=await import('${url}');process.stdout.write(JSON.stringify(s.indexingEnabled));`],{env:{...process.env,PORTFOLIO_PUBLIC_INDEXING:flag,VERCEL_ENV:environment},encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);assert.equal(r.stdout,String(expected));
 }
});
test('Person identity links are profiles, not product-domain backlink markup',async()=>{
 const {identityGraph}=await import(dataUrl(compile('lib/seo.ts')));
 const person=identityGraph['@graph'].find(e=>e['@type']==='Person');
 assert.deepEqual(person.sameAs,['https://www.linkedin.com/in/sethpratt/', 'https://github.com/sipratt-p', 'https://www.crunchbase.com/person/seth-pratt-0f4e', 'https://www.pinterest.com/sethprattsf/', 'https://www.quora.com/profile/Seth-Pratt', 'https://x.com/sethprattsf', 'https://medium.com/@sethpratt']);
 const footer=read('components/portfolio/footer.tsx');
 for(const url of person.sameAs.slice(2))assert(!footer.includes(url),'Additional profiles must not become promoted footer links');
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
 assert(read('app/studio/[slug]/page.tsx').includes('/notes/fable-creative-experiments'));
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
 const expected=['Building long-running local AI agents','Evaluating H3 and LTX video renders','Benchmarking local coding agents','Fable: experiments in creative expression','LTX, H3, Music3 and ACE-Step: what I learned','Optimizing local AI: kernels, prefill and decode','Ambient clinical documentation on open weights','Finding where songs start inside a DJ mix'];
 assert.deepEqual(notes.map(n=>n.title),expected);
 for(const n of notes){assert(n.summary.length>70);assert(!n.summary.includes('Seth Pratt'));}
 assert(read('components/portfolio/field-notes.tsx').includes('note.summary ?? note.description'));
 assert(read('app/notes/page.tsx').includes('<FieldNotes compact/>'));
 assert(read('components/portfolio/header.tsx').includes("href:'/notes',name:'Notes'"));
});

test('AutoTalent leads with search agents and MCP without implying autonomous hiring decisions',()=>{
 const p=independentProjects.find(p=>p.slug==='autotalent');
 const card=read('components/portfolio/personal-projects.tsx');
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
 for(const slug of ['local-agent-evaluations','local-model-performance-engineering','evaluating-agentic-video','creative-ai-tools-autoresearch'])assert.equal(notes.find(n=>n.slug===slug).updated,'2026-09-16',slug);
 const clinical=notes.find(n=>n.slug==='ambient-clinical-documentation-open-weights');assert(clinical);assert.equal(clinical.prepared,'2026-09-16');
 const c=JSON.stringify(clinical);for(const term of ['PriMock57','ACI-Bench','10.3%','nine points','98.7 to 99.6','Injected errors are not natural errors','Non-commercial','nothing here is clinical advice','github.com/sipratt-p/scribe-bench'])assert(c.includes(term),term);
 assert(read('components/portfolio/editorial-page.tsx').includes('entry.updated'));
});

test('Cue has a sourced project page, a homepage card, its media, and a field note with the per-genre table',()=>{
 const p=independentProjects.find(p=>p.slug==='cue');assert(p);const s=JSON.stringify(p);
 for(const term of ['190','99','62','about 9 seconds','not yet on the App Store','MP4 chapters','0.4 seconds','freely downloadable','/media/cue-demo.mp4','/projects/cue/cue-screens.jpg'])assert(s.includes(term),term);
 assert.equal(p.prepared,'2026-09-16');
 for(const f of ['public/projects/cue/cue-screens.jpg','public/projects/cue/cue-demo-poster.jpg','public/media/cue-demo.mp4'])assert(statSync(f).size>10000,f);
 assert(statSync('public/media/cue-demo.mp4').size<25000000);
 const card=read('components/portfolio/personal-projects.tsx');assert(card.includes("slug:'cue'"));assert(card.includes('three of the projects'));
 const n=notes.find(n=>n.slug==='finding-song-starts-in-dj-mixes');assert(n);const t=JSON.stringify(n);
 for(const term of ['Euphoric hardstyle','Peak-time house','39 s','did not help','novelty curve','beat grid','personal-use only','/projects/cue'])assert(t.includes(term),term);
});
