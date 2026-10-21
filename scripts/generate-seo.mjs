// Metadata routes work in dev, but this Vinext export does not emit their files.
// Generate ordinary static assets from the same content records before each build:
// sitemap.xml (with lastmod), robots.txt, llms.txt and rss.xml.
import {readFile,writeFile} from 'node:fs/promises';
import {transpileModule,ModuleKind,ScriptTarget} from 'typescript';
async function source(path) {
 const code=transpileModule(await readFile(path,'utf8'),{compilerOptions:{module:ModuleKind.ESNext,target:ScriptTarget.ES2022}}).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}
const [{independentProjects,notes},{SITE_URL},{caseStudies},{labSeries},{workItems}]=await Promise.all([source('lib/editorial.ts'),source('lib/seo.ts'),source('lib/cases.ts'),source('lib/lab.ts'),source('lib/work.ts')]);
// Pages rebuilt in the October 2026 redesign carry its date; notes carry their own.
const REDESIGN='2026-10-09';
// lastmod = the latest real edit; pubDate and sort = when the work's main result was produced.
const workDate=n=>n.work?.end??n.prepared??'2026-09-05';
const noteDate=n=>[n.updated,n.prepared,workDate(n)].filter(Boolean).sort().at(-1);
const latest=dates=>dates.sort().at(-1);
const routes=[
 ['/',REDESIGN],['/start',REDESIGN],['/work',REDESIGN],['/work/archive',REDESIGN],
 ...caseStudies.map(c=>[`/work/${c.slug}`,REDESIGN]),
 ...independentProjects.map(p=>[`/work/${p.slug}`,latest([noteDate(p),REDESIGN])]),
 ['/lab',REDESIGN],...labSeries.map(s=>[`/lab/${s.slug}`,REDESIGN]),
 ['/writing',latest(notes.map(noteDate).concat(REDESIGN))],
 ...notes.map(n=>[`/writing/${n.slug}`,latest([noteDate(n),REDESIGN])]),
 ['/about',REDESIGN],['/resume',REDESIGN],['/how-i-write',REDESIGN],
];
const paths=routes.map(r=>r[0]);
if(new Set(paths).size!==paths.length)throw new Error('Duplicate sitemap route');
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
await writeFile('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(([p,d])=>`  <url><loc>${escape(SITE_URL+p)}</loc><lastmod>${d}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile('public/robots.txt',`# Allow crawling so page-level noindex can be read on previews.\n# Indexing is enabled only in an explicitly approved production build.\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

// llms.txt: a plain map of the site for language-model readers (llmstxt.org format).
const byDate=[...notes].sort((a,b)=>workDate(b).localeCompare(workDate(a)));
const llms=`# Seth Pratt

> Applied AI Product Leader, currently on NVIDIA's GenAI platform. Seth builds AI systems and measures what they actually do: open benchmarks for clinical scribes and coding agents, small verifier models trained on planted-error synthetic data, large open models served on workstation GPUs, and physics simulations at 100 million particles, built with a small studio of AI agents across five machines.

Every number on the site links to the file it came from. Negative results and retractions are kept. Contact: sipratt@gmail.com.

## Start here
- [Start here](${SITE_URL}/start): five things to read, in order (about 18 minutes)
- [scribe-bench case study](${SITE_URL}/work/scribe-bench): ${caseStudies[0].description}
- [Résumé](${SITE_URL}/resume): career at NVIDIA, Lyft, Intuit, Meta and Visa, plus independent work

## Work
${caseStudies.map(c=>`- [${c.h1.join('')}](${SITE_URL}/work/${c.slug}): ${c.description}`).join('\n')}
${workItems.filter(w=>!caseStudies.some(c=>c.slug===w.slug)).map(w=>`- [${w.title}](${/^https?:/.test(w.primary)?w.primary:SITE_URL+w.primary}): ${w.summary} (${w.chips.join('; ')})`).join('\n')}
- [Archive](${SITE_URL}/work/archive): earlier product case studies

## Writing
${byDate.map(n=>`- [${n.title}](${SITE_URL}/writing/${n.slug}) (${workDate(n)}): ${n.summary??n.description}`).join('\n')}

## Lab
- [The Lab](${SITE_URL}/lab): physics simulations, discovered lifeforms and live worlds; the app they live in is Everdust (https://everdust.ai)
${labSeries.map(s=>`- [${s.name}](${SITE_URL}/lab/${s.slug}): ${s.intro}`).join('\n')}

## Elsewhere
- GitHub: https://github.com/sipratt-p
- LinkedIn: https://www.linkedin.com/in/sethpratt/
- X: https://x.com/sethprattsf
- How these pages are written: ${SITE_URL}/how-i-write
`;
await writeFile('public/llms.txt',llms);

// RSS for the writing list.
const rfc=d=>new Date(d+'T16:00:00Z').toUTCString();
const rss=`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Seth Pratt — Writing</title>
  <link>${SITE_URL}/writing</link>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
  <description>Notes on evals, agents, inference and the Lab, with the numbers left in.</description>
  <language>en-us</language>
${byDate.map(n=>`  <item><title>${escape(n.title)}</title><link>${SITE_URL}/writing/${n.slug}</link><guid>${SITE_URL}/writing/${n.slug}</guid><pubDate>${rfc(workDate(n))}</pubDate><description>${escape(n.summary??n.description)}</description></item>`).join('\n')}
</channel>
</rss>
`;
await writeFile('public/rss.xml',rss);

// Route manifest for the static OG cards (scripts/og.py renders public/og/*.png from it).
const ogKey=p=>p==='/'?'home':p.slice(1).replace(/\//g,'-');
const monthYear=d=>new Date(d+'T00:00:00Z').toLocaleDateString('en-US',{month:'short',year:'numeric',timeZone:'UTC'});
const chip=slug=>(workItems.find(w=>w.slug===slug)?.chips??[]).join(' · ');
const og=[
 {path:'/',title:'I build AI systems and measure what they actually do.',em:'measure',eyebrow:'Applied AI · Evals · Agents · Simulation',line:'Seth Pratt · Applied AI Product Leader',portrait:true},
 {path:'/start',title:'Start here: five things, in reading order',eyebrow:'Start here',line:'About 18 minutes, flagship first'},
 {path:'/work',title:'Everything here has a run behind it.',em:'run',eyebrow:'Work',line:'Evals · Agents · Inference · Products'},
 {path:'/work/archive',title:'Earlier product work',eyebrow:'Work · Archive',line:'NVIDIA · Lyft · Intuit'},
 ...caseStudies.map(c=>({path:`/work/${c.slug}`,title:c.h1.join(''),em:c.h1[1],eyebrow:`Case study · ${c.crumb}`,line:chip(c.slug)})),
 ...independentProjects.map(p=>({path:`/work/${p.slug}`,title:p.title.replace(/\.$/,''),eyebrow:p.topics?.includes('Products')?'Work · Products':`Work · ${p.category}`,line:chip(p.slug)})),
 {path:'/lab',title:'The Lab',em:'Lab',eyebrow:'Physics, lifeforms and live worlds',line:'The same measurement habit, pointed at light and gravity',room:'lab',image:'attr-discoveries-ii'},
 ...labSeries.map(s=>({path:`/lab/${s.slug}`,title:s.name,em:s.em,eyebrow:`The Lab · Series ${s.n}`,line:`${s.hero.title} — ${s.hero.fact}`,room:'lab',image:s.hero.image})),
 {path:'/writing',title:'Notes with the numbers left in.',em:'numbers',eyebrow:'Writing',line:'Evals · Agents · Inference · Lab'},
 ...notes.map(n=>({path:`/writing/${n.slug}`,title:n.title,eyebrow:`Writing · ${monthYear(workDate(n))}`,line:(n.findings&&n.findings[0])||n.summary||'',room:n.topics?.includes('Lab')?'lab':undefined,image:n.slug==='chaos-with-nothing-to-orbit'?'conch-post':undefined})),
 {path:'/about',title:'About Seth Pratt',em:'Seth Pratt',eyebrow:'Applied AI Product Leader',line:'Evals · agentic building · product judgment',portrait:true},
 {path:'/resume',title:'Résumé',eyebrow:'Seth Pratt',line:'NVIDIA · Lyft · Intuit · Meta · Visa'},
 {path:'/how-i-write',title:'How I write these',em:'these',eyebrow:'Writing · Method',line:'AI-assisted drafting, every number checked against its source'},
].map(o=>({...o,key:ogKey(o.path)}));
const missing=paths.filter(p=>!og.some(o=>o.path===p));
if(missing.length)throw new Error('OG card missing for '+missing.join(', '));
await writeFile('scripts/og-routes.json',JSON.stringify(og,null,1)+'\n');
console.log(`Prepared sitemap for ${paths.length} routes, llms.txt and rss.xml; preview indexing remains controlled by page metadata.`);
