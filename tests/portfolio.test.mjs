import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import path from 'node:path';
const read=p=>readFileSync(p,'utf8');
const sources=(dir)=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?sources(path.join(dir,e.name)):[path.join(dir,e.name)]).filter(p=>p.endsWith('.tsx'));
test('All portfolio navigation uses native anchors, not the broken client router',()=>{
 for(const p of [...sources('app'),...sources('components/portfolio')]){const s=read(p);assert(!s.includes("from 'next/link'"),p);assert(!s.includes('<Link'),p);}
 for(const href of ['/#work','/#about','/#building','/studio'])assert(read('components/portfolio/header.tsx').includes(href));
});
test('Homepage provides real personal project links and no video elements',()=>{
 assert(!read('app/page.tsx').includes('<video'));
 const s=read('components/portfolio/personal-projects.tsx');for(const domain of ['autotalent.ai','drgrey.ai'])assert(s.includes(domain));
});
test('Playback is opt-in, with native controls and no autoplay or looping',()=>{
 const s=read('components/portfolio/film-player.tsx');assert(s.includes('!started?'));assert(s.includes('onClick={()=>setStarted(true)}'));assert(s.includes('preload="none"'));assert(s.includes('controls playsInline'));assert(!/autoPlay|\bloop\b/.test(s));
});
test('Six new full-length viewing files are present and within static asset limits',()=>{
 for(const slug of ['bridge-fight','matrix-bullet-time','h3-ugc','fable','the-keeper','second-winter']){
  const size=statSync(`public/media/${slug}.mp4`).size;assert(size>1000000);assert(size<25000000);assert(statSync(`public/studio/${slug}.jpg`).size>1000);
 }
});

test('Review fixes preserve responsive film proportions and short-screen navigation access',()=>{
 const css=read('app/globals.css');
 assert(css.includes('.film-start img,.film-player video{height:auto;min-height:0;max-height:min(74vh,740px)}'));
 assert(css.includes('.portfolio-menu{overflow-y:auto;overscroll-behavior:contain;max-height:100dvh}'));
});
