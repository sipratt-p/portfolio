import type { Metadata } from 'next';
import { pageMetadata, breadcrumbs } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';

import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { films } from '@/lib/portfolio';
import FilmPlayer from '@/components/portfolio/film-player';
export const dynamicParams=false;
export function generateStaticParams(){return films.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const art=films.find(a=>a.slug===slug);return art ? pageMetadata(`/studio/${slug}`,art.title,art.description) : {title:'Page not found',robots:{index:false,follow:false}};}
export default async function Film({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const art=films.find(a=>a.slug===slug);if(!art)notFound();const next=films[(films.indexOf(art)+1)%films.length];
  return <main id="main"><JsonLd data={breadcrumbs([{name:'Home',path:'/'},{name:'Studio',path:'/studio'},{name:art.title,path:`/studio/${slug}`}])}/><article className="wrap film-page"><a href="/studio" className="back-link"><ArrowLeft size={16} aria-hidden="true"/>Back to the Studio</a><div className="film-heading"><div><p className="eyebrow">{art.kind} / {art.year}</p><h1>{art.title}</h1></div><span>{art.duration} · {art.audio?'With sound':'Silent video'}</span></div><FilmPlayer title={art.title} poster={'/studio/'+art.poster+'.jpg'} src={'/media/'+art.video+'.mp4'} width={art.width} height={art.height} audio={art.audio} captions={art.captions}/><div className="film-caption"><p>{art.description}</p><span>{art.kind} · {art.year}</span></div>{art.note && <p className="film-note">{art.note}</p>}<a className="text-link film-download" href={"/media/"+art.video+".mp4"} download>Download viewing copy <ArrowRight size={16} aria-hidden="true"/></a>{['fable','the-keeper','second-winter'].includes(art.slug) && <aside className="film-series-note"><p className="eyebrow">Behind the series</p><h2>Fable’s creative experiments</h2><p>How an open invitation became a series of films, music, and experiments in creative expression.</p><a className="text-link" href="/notes/fable-creative-experiments">Read the story <ArrowRight size={16} aria-hidden="true"/></a></aside>}<nav className="project-next" aria-label="More films"><a href="/studio" className="back-link"><ArrowLeft size={16} aria-hidden="true"/>All films & experiments</a><a href={'/studio/'+next.slug}><span className="eyebrow">Next film</span><strong>{next.title}<ArrowRight size={19} aria-hidden="true"/></strong></a></nav></article></main>;
}
