import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import path from 'node:path';
import { PRIV } from './private-terms.mjs';
const read=p=>readFileSync(p,'utf8');
const sources=(dir)=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?sources(path.join(dir,e.name)):[path.join(dir,e.name)]).filter(p=>p.endsWith('.tsx'));
test('All portfolio navigation uses native anchors, not the broken client router',()=>{
 for(const p of [...sources('app'),...sources('components/portfolio')]){const s=read(p);assert(!s.includes("from 'next/link'"),p);assert(!s.includes('<Link'),p);}
 const site=read('lib/site.ts');for(const href of ["'/work'","'/lab'","'/writing'","'/about'"])assert(site.includes('href: '+href),href);
 const header=read('components/portfolio/header.tsx');assert(header.includes('href="/resume"'));assert(header.includes('Get in touch'));assert(!header.includes('/#'),'no anchor-only nav items');
});
test('Homepage has the decided positioning, the shipped row, and no video elements of its own',()=>{
 const home=read('app/page.tsx');
 assert(!home.includes('<video'));
 assert(home.includes('I build AI systems and <em>measure</em> what they actually do.'));
 assert(home.includes('Applied AI product leader, currently on NVIDIA’s GenAI platform.'));
 assert(home.includes('href="/start">Start here'));assert(!/10 minutes/.test(home));
 const work=read('lib/work.ts');for(const domain of ['everdust.ai','elmoseo.com','cue-engine'])assert(work.includes(domain),domain);
 for (const d of PRIV ? PRIV.domains : []) assert(!work.includes(d));
});
test('Playback is opt-in, with native controls and no autoplay or looping',()=>{
 const s=read('components/portfolio/film-player.tsx');assert(s.includes('!started?'));assert(s.includes('onClick={()=>setStarted(true)}'));assert(s.includes('preload="none"'));assert(s.includes('controls playsInline'));assert(!/autoPlay|\bloop\b/.test(s));
});
test('The Fable series films stay in its note; the retired Studio films are gone',()=>{
 for(const slug of ['bridge-fight','matrix-bullet-time','h3-ugc','george-dwight-ai','ego','selfie','marin'])assert(!existsSync(`public/media/${slug}.mp4`),slug);
 for(const slug of ['fable','the-keeper','second-winter']){
  const size=statSync(`public/media/${slug}.mp4`).size;assert(size>1000000);assert(size<25000000);assert(statSync(`public/studio/${slug}.jpg`).size>1000);
 }
});

test('Review fixes preserve responsive film proportions and short-screen navigation access',()=>{
 const css=read('app/globals.css');
 assert(/\.film-start img,\.film-player video\{[^}]*height:auto;min-height:0;max-height:min\(74vh,740px\)/.test(css));
 assert(/\.drawer\{[^}]*overflow-y:auto;overscroll-behavior:contain;max-height:100dvh/.test(css));
});

test('Tab icons use the lowercase brand mark with cache-fresh SVG and raster fallbacks',()=>{
 const layout=read('app/layout.tsx');
 for(const name of ['favicon-sp.svg','favicon-sp-32.png','favicon-sp-192.png','favicon.ico','apple-touch-icon.png']){
  assert(layout.includes(name));assert(statSync('public/'+name).size>100);
 }
 const svg=read('public/favicon-sp.svg');assert(svg.includes('Seth Pratt — sp.'));
 assert(svg.includes('#a86123'));assert(svg.includes('<path'));assert(!svg.includes('<text'));
 const ico=readFileSync('public/favicon.ico');assert.equal(ico.readUInt16LE(2),1);assert.equal(ico.readUInt16LE(4),3);
});

// Google recommends a square raster icon larger than 48 px at a stable URL.
test('Search gets a stable high-resolution PNG of the same sp. brand mark',()=>{
 const png=readFileSync('public/favicon-sp-192.png');
 assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.equal(png.readUInt32BE(16),192);assert.equal(png.readUInt32BE(20),192);
 assert(read('app/layout.tsx').includes("{url:'/favicon-sp-192.png',type:'image/png',sizes:'192x192'}"));
});
