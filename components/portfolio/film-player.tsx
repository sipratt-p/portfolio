'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Download } from 'lucide-react';
export default function FilmPlayer({title,poster,src,width,height,audio=false,captions}:{title:string;poster:string;src:string;width:number;height:number;audio?:boolean;captions?:string}){
  const [started,setStarted]=useState(false);const [error,setError]=useState(false);const video=useRef<HTMLVideoElement>(null);
  useEffect(()=>{if(started){video.current?.focus();void video.current?.play().catch(()=>{/* Native controls remain available if playback is blocked. */});}},[started]);
  return <div className={"film-player "+(audio?"has-sound":"is-silent")}>{!started?<button type="button" className="film-start" onClick={()=>setStarted(true)} aria-label={'Play '+title}><img src={poster} alt={title+' — still frame'} width={width} height={height}/><span className="film-start-label"><span className="film-play-circle"><Play size={25} aria-hidden="true"/></span>Play film</span></button>:<video ref={video} src={src} poster={poster} controls playsInline preload="none" width={width} height={height} tabIndex={0} aria-label={title+(audio?' — video with sound':' — silent video')} onError={()=>setError(true)}>{captions&&<track kind="captions" src={captions} srcLang="en" label="English"/>}<p>Your browser doesn’t support this video. <a href={src}>Download it here.</a></p></video>}{error&&<div className="film-error" role="alert">The film couldn’t play in this browser. <a href={src} download><Download size={15} aria-hidden="true"/>Download the MP4</a></div>}</div>;
}
