'use client';
import {useEffect} from 'react';
import {pauseOtherMedia} from '@/lib/media-playback';
export default function MediaCoordinator(){
  useEffect(()=>{
    const story=()=>document.querySelector<HTMLIFrameElement>('#tell-me-again-frame');
    const onPlay=(event:Event)=>{
      if(!(event.target instanceof HTMLMediaElement))return;
      pauseOtherMedia(event.target,document.querySelectorAll<HTMLMediaElement>('video,audio'));
      // The story is sandboxed: exchange only this playback signal, never its DOM or data.
      story()?.contentWindow?.postMessage('portfolio:pause-audio','*');
    };
    const onMessage=(event:MessageEvent)=>{
      const frame=story();
      if(frame && event.source===frame.contentWindow && event.data==='portfolio:voice-playing'){
        pauseOtherMedia(null,document.querySelectorAll<HTMLMediaElement>('video,audio'));
      }
    };
    document.addEventListener('play',onPlay,true);
    window.addEventListener('message',onMessage);
    return ()=>{document.removeEventListener('play',onPlay,true);window.removeEventListener('message',onMessage);};
  },[]);
  return null;
}
