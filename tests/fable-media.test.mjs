import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {transpileModule, ModuleKind, ScriptTarget} from 'typescript';
const read=p=>readFileSync(p,'utf8');
const moduleUrl=p=>'data:text/javascript;base64,'+Buffer.from(transpileModule(read(p),{compilerOptions:{module:ModuleKind.ESNext,target:ScriptTarget.ES2022}}).outputText).toString('base64');
const {notes}=await import(moduleUrl('lib/editorial.ts'));
const {loadArchivedFilm}=await import(moduleUrl('lib/film-archive.ts'));
const fable=notes.find(n=>n.slug==='fable-creative-experiments');
const hashes={
 'long-exposure':'57a8309e76b54adb5f8b41b22e92c65ea5ecc83327c33322e1d567b2b8b202b2',
 'in-stereo':'34ee52ed3dc0265a5696f6d08e6150e1d057d099a8712f0ab27f760a07a6b266',
};
test('Fable includes all five completed flat films, interactive fiction, songs and the VR variant',()=>{
 for(const id of ['things-i-love','long-exposure','the-keeper','fable','later-experiments','in-stereo','lighthouse-sketch']){
  const {film}=fable.sections.find(s=>s.id===id);assert(film);
  assert(statSync('public'+film.poster).size>1000);
  if(film.src)assert(statSync('public'+film.src).size>1000000);
 }
 assert(fable.sections.find(s=>s.id==='later-experiments').interactive);
 const songs=fable.sections.filter(s=>s.audio);assert.equal(songs.length,2);
 for(const {audio} of songs)assert(statSync('public'+audio.src).size>1000000);
});
test('Large film parts preserve original master bytes and stay below static asset limits',()=>{
 for(const [id,sha256] of Object.entries(hashes)){
  const {film}=fable.sections.find(s=>s.id===id);const hash=createHash('sha256');let bytes=0;
  for(const path of film.chunks){const b=readFileSync('public'+path);assert(b.length<25_000_000);hash.update(b);bytes+=b.length;}
  assert.equal(bytes,film.bytes);assert.equal(hash.digest('hex'),sha256);
 }
});
test('Archive assembler preserves order and reports progress',async()=>{
 const progress=[];const calls=[];
 const blob=await loadArchivedFilm(['/a','/b'],5,new AbortController().signal,n=>progress.push(n),async(path)=>{
  calls.push(path);return new Response(path==='/a'?new Uint8Array([0,1]):new Uint8Array([2,3,4]));
 });
 assert.deepEqual(calls,['/a','/b']);assert.deepEqual(progress,[2,5]);
 assert.equal(blob.type,'video/mp4');assert.deepEqual([...new Uint8Array(await blob.arrayBuffer())],[0,1,2,3,4]);
});
test('Archive assembler rejects missing, oversized or incomplete media',async()=>{
 const signal=new AbortController().signal;
 await assert.rejects(loadArchivedFilm(['/a'],5,signal,()=>{},async()=>new Response('',{status:404})),/Download failed/);
 await assert.rejects(loadArchivedFilm(['/a'],5,signal,()=>{},async()=>new Response('a')),/Incomplete/);
 await assert.rejects(loadArchivedFilm(['/a'],1,signal,()=>{},async()=>new Response('abc')),/Unexpected/);
});
test('Cancel stops an archive before requesting the next part',async()=>{
 const ctrl=new AbortController();let calls=0;
 await assert.rejects(loadArchivedFilm(['/a','/b'],2,ctrl.signal,()=>ctrl.abort(),async()=>{calls++;return new Response('x');}),{name:'AbortError'});
 assert.equal(calls,1);
});
test('Large films and story are user-initiated, cancellable and isolated',()=>{
 const player=read('components/portfolio/chunked-film-player.tsx');
 assert(player.includes('onClick={()=>void start()}'));assert(player.includes('onClick={cancel}'));
 assert(player.includes('preload="none"'));assert(!/autoPlay|\bloop\b/.test(player));
 assert(player.includes('URL.revokeObjectURL'));assert(player.includes('AbortController'));
 const story=read('components/portfolio/interactive-story.tsx');assert(story.includes('{open && <iframe'));assert(story.includes('sandbox="allow-scripts"'));
 assert(!story.includes('allow-same-origin'));
});
test('Tell Me Again is archived with local runtime/fonts, licenses and noindex',()=>{
 const p='public/experiences/tell-me-again/'; const s=read(p+'index.html');
 assert(s.includes('noindex,nofollow'));assert(s.includes('src="/experiences/tell-me-again/ink-full.js"'));assert(s.includes('href="/experiences/tell-me-again/fonts.css"'));
 assert(!/(?:src|href)=["']https?:/.test(s));assert(read(p+'fonts.css').includes('data:font/ttf;base64,'));
 for(const f of ['ink-full.js','inkjs-LICENSE.txt','EB-Garamond-OFL.txt','THIRD-PARTY.txt'])assert(statSync(p+f).size>100);
});

test('Starting one player pauses its peers without touching the active player',async()=>{
 const {pauseOtherMedia}=await import(moduleUrl('lib/media-playback.ts'));
 const a={pause(){this.paused=true;},paused:false};const b={pause(){this.paused=true;},paused:false};
 pauseOtherMedia(a,[a,b]);assert.equal(a.paused,false);assert.equal(b.paused,true);
 pauseOtherMedia(null,[a,b]);assert(a.paused && b.paused);
 const coordinator=read('components/portfolio/media-coordinator.tsx');assert(coordinator.includes("addEventListener('play',onPlay,true)"));assert(coordinator.includes('event.source===frame.contentWindow'));
 assert(read('app/layout.tsx').includes('<MediaCoordinator/>'));
});

// Vercel cleanUrls redirects index.html to an extensionless, slashless URL.
test('Story assets survive Vercel clean URL redirects',()=>{
 const html=read('public/experiences/tell-me-again/index.html');
 for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(match[1].startsWith('data:'))continue;
  const resolved=new URL(match[1],'https://www.sethpratt.com/experiences/tell-me-again');
  assert(resolved.pathname.startsWith('/experiences/tell-me-again/'));
  assert(statSync('public'+resolved.pathname).isFile());
 }
});
