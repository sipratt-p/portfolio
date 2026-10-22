import type { Editorial, ReadingLink, Section } from '@/lib/editorial';
import { breadcrumbs, canonical, PERSON_ID, SITE_URL, ogImage } from '@/lib/seo';
import { EMAIL } from '@/lib/site';
import JsonLd from './json-ld';
import FilmPlayer from './film-player';
import ChunkedFilmPlayer from './chunked-film-player';
import InteractiveStory from './interactive-story';
import LlmtFigure from './llmt/figure';
import SectionLoop from './llmt/loop';
import { Arrow, isOffsite } from './smart-link';
import Toc from './toc';

const longDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const words = (e: Editorial) => e.sections.flatMap(s => [...s.paragraphs, ...(s.after ?? []), ...(s.bullets ?? []), ...(s.takeaway ? [s.takeaway] : [])]).join(' ').split(/\s+/).length;
export const readMinutes = (e: Editorial) => Math.max(2, Math.round(words(e) / 230));
/** The sort and publication date: when the work's main result was produced, else when the page was written. */
export const published = (e: Editorial) => e.work?.end ?? e.prepared ?? '2026-09-05';
/** The latest real edit to the page: its update date, else the date it was written. */
export const modified = (e: Editorial) => [e.updated, e.prepared, published(e)].filter(Boolean).sort().at(-1) as string;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** "September 20 – October 10, 2026", "October 6 – 9, 2026" or "October 9, 2026"; a label overrides. */
export const workRange = (e: Editorial) => {
  if (!e.work) return null;
  if (e.work.label) return e.work.label;
  const [ys, ms, ds] = e.work.start.split('-').map(Number), [ye, me, de] = e.work.end.split('-').map(Number);
  const a = `${MONTHS[ms - 1]} ${ds}`, b = `${MONTHS[me - 1]} ${de}`;
  if (e.work.start === e.work.end) return `${b}, ${ye}`;
  if (ys !== ye) return `${a}, ${ys} – ${b}, ${ye}`;
  return ms === me ? `${a} – ${de}, ${ye}` : `${a} – ${b}, ${ye}`;
};
export const topicLabel = (e: Editorial) => e.category.replace(/^Field note \d+ \/ /, '').replace(/^Independent product \/ /, '');

function ReadingLinks({ links }: { links: ReadingLink[] }) {
  return <ul className="rel">{links.map(link => <li key={link.href}><a href={link.href} {...(isOffsite(link.href) ? { target: '_blank', rel: 'noreferrer' } : {})}><span>{link.label}</span><Arrow href={link.href}/></a></li>)}</ul>;
}

function DataTable({ table }: { table: NonNullable<Section['table']> }) {
  const textual = table.rows.some(r => r.slice(1).some(c => c.length > 26 && !/^[\d.,%+−\-–→ /]+$/.test(c)));
  return <div className="table-wrap" role="region" aria-label={table.caption} tabIndex={0}>
    <table className={'data' + (textual ? ' textual' : '')}>
      <caption>{table.caption}</caption>
      <thead><tr>{table.headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead>
      <tbody>{table.rows.map((row, ri) => <tr key={ri + row[0]}>{row.map((cell, i) => i === 0
        ? <th scope="row" key={i}>{cell}</th>
        : <td key={i} data-label={table.headers[i]} className={cell.length > 40 ? 'wide' : undefined}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export default function EditorialPage({ entry }: { entry: Editorial }) {
  const isNote = entry.type === 'note';
  const parent = isNote ? { name: 'Writing', path: '/writing' } : { name: 'Work', path: '/work' };
  const path = `${parent.path}/${entry.slug}`;
  const date = published(entry);
  const schema = {
    '@context': 'https://schema.org', '@type': isNote ? 'Article' : 'CreativeWork',
    '@id': canonical(path) + '#article', url: canonical(path), name: entry.title, headline: entry.title,
    description: entry.description, inLanguage: 'en-US', author: { '@id': PERSON_ID },
    datePublished: date, ...(modified(entry) > date ? { dateModified: modified(entry) } : {}),
    image: SITE_URL + ogImage(path), mainEntityOfPage: canonical(path),
    ...(entry.product ? { about: {
      '@type': 'SoftwareApplication', '@id': entry.product.url + '/#application', name: entry.product.name,
      url: entry.product.url, description: entry.product.description, creator: { '@id': PERSON_ID },
      applicationCategory: entry.product.category ?? 'WebApplication', operatingSystem: entry.product.os ?? 'Web browser'
    } } : {})
  };
  const toc = [
    ...(entry.findings?.length ? [{ id: 'found', title: 'What I found' }] : []),
    ...entry.sections.map(s => ({ id: s.id, title: s.title })),
    { id: 'source-note', title: entry.sourceTitle ?? 'Sources & scope' },
  ];
  const figN = new Map<string, number>(); entry.sections.forEach(s => { if (s.figure) figN.set(s.id, figN.size + 1); });
  return <main id="main" className="editorial-page">
    <article>
      <JsonLd data={schema}/><JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, parent, { name: entry.product?.name ?? entry.title, path }])}/>
      <header className="wrap note-head rise">
        <nav aria-label="Breadcrumb" className="crumbs"><a href={parent.path}>{parent.name}</a><span className="sl" aria-hidden="true">/</span><span>{topicLabel(entry)}</span></nav>
        <h1 className="h1-page">{entry.title}</h1>
        <p className="lead">{entry.lede}</p>
        <p className="byline"><a href="/about">Seth Pratt</a><span className="dot" aria-hidden="true">·</span>{entry.work
            ? <span>Work: <time dateTime={entry.work.end}>{workRange(entry)}</time></span>
            : <span>Published <time dateTime={date}>{longDate(date)}</time></span>}
          {entry.updated && <><span className="dot" aria-hidden="true">·</span><span>Updated <time dateTime={entry.updated}>{longDate(entry.updated)}</time></span></>}
          <span className="dot" aria-hidden="true">·</span><span>{readMinutes(entry)} min read</span></p>
        <dl className="facts">{entry.facts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
      </header>

      <div className="wrap">
        {entry.heroLoop && <div className="note-loop top"><SectionLoop loop={entry.heroLoop} hero/></div>}
        {entry.findings && entry.findings.length > 0 && <section className="found" id="found" aria-labelledby="found-h">
          <h2 className="kicker" id="found-h">What I found</h2>
          <ol>{entry.findings.map(f => <li key={f}><p>{f}</p></li>)}</ol>
        </section>}
        <div className="takeaway"><p className="kicker">The central idea</p><p>{entry.takeaway}</p></div>
        {entry.featureImage && <figure className="note-feature"><img src={entry.featureImage.src} alt={entry.featureImage.alt} width={entry.featureImage.width} height={entry.featureImage.height} loading="lazy" decoding="async"/><figcaption>{entry.featureImage.caption}</figcaption></figure>}
        {entry.workflow.length > 0 && <figure className="workflow"><ol className="steps" aria-label={entry.workflowLabel}>{entry.workflow.map((step, i) => <li key={step}><span className="num mono">{String(i + 1).padStart(2, '0')}</span>{step}</li>)}</ol><figcaption>{entry.workflowLabel}</figcaption></figure>}
      </div>

      <div className="wrap art-grid">
        <div className="prose">
          <details className="contents-mobile"><summary>Contents</summary><ol>{toc.map(t => <li key={t.id}><a href={'#' + t.id}>{t.title}</a></li>)}</ol></details>
          {entry.sections.map(s => <section key={s.id} id={s.id}>
            <h2 className="h2">{s.title}</h2>
            {s.loop && <SectionLoop loop={s.loop}/>}
            {s.paragraphs.map(p => <p key={p}>{p}</p>)}
            {s.figure && <LlmtFigure id={s.figure} n={figN.get(s.id)!}/>}
            {s.bullets && <ul className="bullets">{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
            {s.equations && <pre className="equations" aria-label="Equations">{s.equations.join('\n')}</pre>}
            {s.image && <figure><img src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} loading="lazy" decoding="async"/><figcaption>{s.image.caption}</figcaption></figure>}
            {s.table && <DataTable table={s.table}/>}
            {s.after?.map(p => <p key={p}>{p}</p>)}
            {s.interactive && <InteractiveStory/>}
            {s.film && <div className="essay-media">{s.film.chunks && s.film.bytes && s.film.filename
              ? <ChunkedFilmPlayer film={{ ...s.film, chunks: s.film.chunks, bytes: s.film.bytes, filename: s.film.filename }}/>
              : s.film.src ? <><FilmPlayer title={s.film.title} poster={s.film.poster} src={s.film.src} width={s.film.width} height={s.film.height} audio/><a className="link" href={s.film.src} download>Download {s.film.title}</a></> : null}</div>}
            {s.audio && <div className="essay-audio"><p>{s.audio.title}</p><audio controls preload="none" src={s.audio.src} aria-label={s.audio.title}/><a href={s.audio.src} download>Download the song</a></div>}
            {s.loopEnd && <SectionLoop loop={s.loopEnd}/>}
            {s.takeaway && <p className="sec-takeaway"><span className="kicker">{s.takeawayLabel ?? 'Takeaway'}</span>{s.takeaway}</p>}
            {s.links && s.links.length > 0 && <div className="side-card" style={{ marginTop: 20 }}><ReadingLinks links={s.links}/></div>}
          </section>)}
          <aside id="source-note" className="source-note" aria-labelledby="source-title">
            <h2 id="source-title" className="h3">{entry.sourceTitle ?? 'Sources & scope'}</h2>
            <p>{entry.basis}</p><p>{entry.limitations}</p>
            <p><a className="link" href="/how-i-write">How I write these <span className="arr in" aria-hidden="true">→</span></a></p>
          </aside>
          {entry.product && <a className="cta-strip" href={entry.product.url} target="_blank" rel="noreferrer"><p>{entry.product.description}</p><span className="btn btn-primary">Visit {entry.product.name} <span className="arr out" aria-hidden="true">↗</span></span><span className="sr-only"> (opens in a new tab)</span></a>}
          <a className="cta-strip" href={`mailto:${EMAIL}`}><p>Questions about this {isNote ? 'note' : 'project'}? Get in touch.</p><span className="btn btn-secondary">{EMAIL}</span></a>
        </div>
        <aside className="side" aria-label="More">
          <div className="side-sticky">
            <Toc items={toc}/>
            <div className="side-card soft"><p className="eyebrow">New here?</p><p className="say">Start here: five things, in reading order</p><a className="link stretch" href="/start">About 18 minutes <span className="arr in" aria-hidden="true">→</span></a></div>
            <div className="side-card"><p className="eyebrow">Continue reading</p><ReadingLinks links={entry.related}/></div>
          </div>
        </aside>
      </div>
    </article>
  </main>;
}
