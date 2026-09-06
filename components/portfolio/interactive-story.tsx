'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {pauseOtherMedia} from '@/lib/media-playback';
export default function InteractiveStory(){
 const [open,setOpen]=useState(false);
 return <div className="interactive-story"><p>Tell Me Again · Interactive fiction with optional voice</p><Button variant="outline" onClick={()=>{if(!open)pauseOtherMedia(null,document.querySelectorAll<HTMLMediaElement>('video,audio'));setOpen(!open);}} aria-expanded={open} aria-controls="tell-me-again-frame">{open?'Close the story':'Read Tell Me Again'}</Button>{open && <iframe id="tell-me-again-frame" src="/experiences/tell-me-again/index.html" title="Tell Me Again — interactive fiction" sandbox="allow-scripts"/>}</div>;
}
