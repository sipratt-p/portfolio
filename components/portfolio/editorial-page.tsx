import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Editorial, ReadingLink } from '@/lib/editorial';
import { breadcrumbs, canonical, PERSON_ID } from '@/lib/seo';
import JsonLd from './json-ld';
import FilmPlayer from './film-player';
import ChunkedFilmPlayer from './chunked-film-player';
import InteractiveStory from './interactive-story';
function ReadingLinks({links}:{links:ReadingLink[]}) {
  return <ul className="editorial-links">{links.map(link => <li key={link.href}><a href={link.href}>{link.label}{link.href.startsWith('https:') ? <ArrowUpRight size={15} aria-hidden="true"/> : <ArrowRight size={15} aria-hidden="true"/>}</a></li>)}</ul>;
}
export default function EditorialPage({entry}:{entry:Editorial}) {
  const isNote = entry.type === 'note';
  const parent = {name: isNote ? 'Field notes' : 'Independent projects', path: isNote ? '/notes' : '/#building'};
  const path = `/${isNote ? 'notes' : 'projects'}/${entry.slug}`;
  const schema = {
    '@context': 'https://schema.org', '@type': isNote ? 'Article' : 'CreativeWork',
    '@id': canonical(path) + '#article', url: canonical(path), name: entry.title, headline: entry.title,
    description: entry.description, inLanguage: 'en-US', author: { '@id': PERSON_ID },
    mainEntityOfPage: canonical(path),
    ...(entry.product ? { about: {
      '@type': 'SoftwareApplication', '@id': entry.product.url + '/#application', name: entry.product.name,
      url: entry.product.url, description: entry.product.description, creator: { '@id': PERSON_ID },
      applicationCategory: 'WebApplication', operatingSystem: 'Web browser'
    }} : {})
  };
  return <main id="main" className="editorial-page wrap"><article>
    <JsonLd data={schema}/><JsonLd data={breadcrumbs([{name:'Home',path:'/'},parent,{name:entry.product?.name ?? entry.title,path}])}/>
    <nav aria-label="Breadcrumb" className="editorial-breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href={parent.path}>{parent.name}</a><span aria-hidden="true">/</span><span>{entry.product?.name ?? 'Field note'}</span></nav>
    <header className="editorial-heading"><p className="eyebrow">{entry.category}</p><h1>{entry.title}</h1><p className="editorial-lede">{entry.lede}</p>
      <p className="editorial-byline"><a href="/#about">Seth Pratt</a><span aria-hidden="true"> · </span>Prepared <time dateTime="2026-09-05">September 5, 2026</time></p>
      <dl className="editorial-facts">{entry.facts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
    </header>
    <div className="editorial-takeaway"><p className="eyebrow">The central idea</p><p>{entry.takeaway}</p></div>
    {entry.featureImage && <figure className="essay-feature"><img src={entry.featureImage.src} alt={entry.featureImage.alt} width={entry.featureImage.width} height={entry.featureImage.height}/><figcaption>{entry.featureImage.caption}</figcaption></figure>}
    {entry.workflow.length > 0 && <figure className="workflow-figure"><ol>{entry.workflow.map((step,i) => <li key={step}><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span><strong>{step}</strong></li>)}</ol><figcaption>{entry.workflowLabel}</figcaption></figure>}
    <div className="editorial-layout">
      <aside className="editorial-contents"><nav aria-label="On this page"><p className="eyebrow">In this {isNote?'note':'project'}</p><ol>{entry.sections.map(s => <li key={s.id}><a href={'#'+s.id}>{s.title}</a></li>)}</ol><a className="text-link" href="#source-note">{entry.sourceTitle ?? 'Sources & scope'} <ArrowRight size={14} aria-hidden="true"/></a></nav></aside>
      <div className="editorial-prose">{entry.sections.map(s => <section key={s.id} id={s.id}><h2>{s.title}</h2>{s.paragraphs.map(p => <p key={p}>{p}</p>)}
        {s.bullets && <ul>{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
        {s.table && <><p className="table-scroll-hint">Scroll the table sideways to see all columns.</p><div className="editorial-table-wrap" tabIndex={0} role="region" aria-label={s.table.caption}><table><caption>{s.table.caption}</caption><thead><tr>{s.table.headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{s.table.rows.map(row => <tr key={row[0]}>{row.map((cell,i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div></>}
        {s.interactive && <InteractiveStory/>}
        {s.film && <div className="essay-media">{s.film.chunks && s.film.bytes && s.film.filename ? <ChunkedFilmPlayer film={{...s.film,chunks:s.film.chunks,bytes:s.film.bytes,filename:s.film.filename}}/> : s.film.src ? <><FilmPlayer title={s.film.title} poster={s.film.poster} src={s.film.src} width={s.film.width} height={s.film.height} audio/><a className="text-link" href={s.film.src} download>Download {s.film.title}</a></> : null}</div>}
        {s.audio && <div className="essay-audio"><p>{s.audio.title}</p><audio controls preload="none" src={s.audio.src} aria-label={s.audio.title}/><a href={s.audio.src} download>Download the song</a></div>}
        {s.links && <ReadingLinks links={s.links}/>}
      </section>)}
      <aside id="source-note" className="source-note" aria-labelledby="source-title"><h2 id="source-title">{entry.sourceTitle ?? 'Sources & scope'}</h2><p>{entry.basis}</p><p>{entry.limitations}</p><p className="editorial-disclosure">{entry.disclosure ?? 'Drafted with AI assistance from source records and documentation. No private logs, candidate data, or internal wiki files are embedded in this page.'}</p></aside>
      {entry.product && <aside className="product-visit"><p className="eyebrow">Explore the product</p><h2>{entry.product.name}</h2><p>{entry.product.description}</p><a href={entry.product.url} className="button-primary">Visit {entry.product.name} <ArrowUpRight size={17} aria-hidden="true"/></a></aside>}
      <nav className="editorial-related" aria-label="Related reading"><h2>Continue exploring</h2><ReadingLinks links={entry.related}/></nav>
      <a href={parent.path} className="back-link"><ArrowLeft size={16} aria-hidden="true"/>{parent.name}</a>
      </div>
    </div>
  </article></main>;
}
