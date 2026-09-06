'use client';
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { loadArchivedFilm } from '@/lib/film-archive';
export type ChunkedFilm = {title:string;poster:string;chunks:string[];bytes:number;width:number;height:number;filename:string};
export default function ChunkedFilmPlayer({film}:{film:ChunkedFilm}) {
 const [url,setUrl]=useState(''); const [loaded,setLoaded]=useState(0); const [loading,setLoading]=useState(false);const [error,setError]=useState('');
 const controller=useRef<AbortController|null>(null);const objectUrl=useRef('');const player=useRef<HTMLVideoElement>(null);
 useEffect(()=>()=>{controller.current?.abort();if(objectUrl.current)URL.revokeObjectURL(objectUrl.current);},[]);
 useEffect(()=>{if(url){player.current?.focus();void player.current?.play().catch(()=>{});}},[url]);
 async function start(){
  if(controller.current)return;
  const ctrl=new AbortController();controller.current=ctrl;setLoading(true);setLoaded(0);setError('');
  try {
   const blob=await loadArchivedFilm(film.chunks,film.bytes,ctrl.signal,setLoaded);
   if(ctrl.signal.aborted)return;
   const next=URL.createObjectURL(blob);objectUrl.current=next;setUrl(next);
  }catch{if(!ctrl.signal.aborted)setError('The film could not finish loading. Please try again.');}
  finally{if(!ctrl.signal.aborted)setLoading(false);if(controller.current===ctrl)controller.current=null;}
 }
 function cancel(){controller.current?.abort();controller.current=null;setLoading(false);setLoaded(0);}
 return <div className="chunked-film">
  <div className="film-player has-sound">{url ? <video ref={player} src={url} poster={film.poster} width={film.width} height={film.height} controls playsInline preload="none" tabIndex={0} aria-label={film.title} onError={()=>setError('Your browser could not play this format. Download the assembled film below to open it in a video player.')}/> : <button type="button" className="film-start" onClick={()=>void start()} disabled={loading} aria-label={'Play '+film.title}><img src={film.poster} alt={film.title+' — still frame'} width={film.width} height={film.height}/><span className="film-start-label"><span className="film-play-circle"><Play size={25} aria-hidden="true"/></span>{loading?'Loading full-quality film…':'Play full-quality film'}</span></button>}</div>
  {loading && <div className="film-load-progress"><Progress value={Math.round(100*loaded/film.bytes)}><ProgressLabel>Loading {film.title}</ProgressLabel><ProgressValue/></Progress><Button variant="outline" onClick={cancel}>Cancel</Button></div>}
  {error && <p role="alert">{error}</p>}
  <p className="media-delivery-note">Original archived picture and sound, without recompression. Loads only when selected ({Math.round(film.bytes/1_000_000)} MB); playback is available after the full file loads.</p>
  {url && <a className="text-link" href={url} download={film.filename}>Download the complete film</a>}
 </div>;
}
