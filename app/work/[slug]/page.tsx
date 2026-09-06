import type { Metadata } from 'next';
import { pageMetadata, breadcrumbs } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';

import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '@/lib/portfolio';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(p=>p.slug===slug);return p ? pageMetadata(`/work/${slug}`,p.name,p.summary) : {title:'Page not found',robots:{index:false,follow:false}};}
export default async function Project({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const project=projects.find(p=>p.slug===slug);if(!project)notFound();const next=projects[(projects.indexOf(project)+1)%projects.length];
  return <main id="main"><JsonLd data={breadcrumbs([{name:'Home',path:'/'},{name:'Selected work',path:'/#work'},{name:project.name,path:`/work/${slug}`}])}/><article><header className="wrap detail-heading"><a className="back-link" href="/#work"><ArrowLeft size={16} aria-hidden="true"/>Selected work</a><p className="eyebrow">{project.company} <span aria-hidden="true">/</span> {project.category}</p><h1>{project.title}</h1><p className="detail-subtitle">{project.name}</p><dl className="project-facts"><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Built for</dt><dd>{project.audience}</dd></div></dl></header>
  <figure className="wrap project-figure"><div className="project-figure-mat"><img src={'/images/'+project.image+'.webp'} alt={project.imageAlt} width="1200" height="800"/></div><figcaption>Product imagery from my original portfolio. Interfaces shown may have changed.</figcaption></figure>
  <div className="wrap project-story"><div><p className="eyebrow">Project overview</p><h2>The work behind<br/>the experience.</h2></div><div className="project-prose"><section><h3>Context</h3><p>{project.context}</p></section><section><h3>My contribution</h3><p>{project.contribution}</p></section><section><h3>Areas of focus</h3><ul className="focus-list">{project.focus.map(item=><li key={item}>{item}</li>)}</ul></section></div></div>
  <nav aria-label="More work" className="wrap project-next"><a className="back-link" href="/#work"><ArrowLeft size={16} aria-hidden="true"/>All selected work</a><a href={'/work/'+next.slug}><span className="eyebrow">Next project · {next.company}</span><strong>{next.name} <ArrowRight size={19} aria-hidden="true"/></strong></a></nav></article></main>;
}
