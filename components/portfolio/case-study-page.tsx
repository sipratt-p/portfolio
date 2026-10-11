import type { CaseBlock, CaseStudy } from '@/lib/cases';
import { breadcrumbs, canonical, PERSON_ID, SITE_URL, ogImage } from '@/lib/seo';
import { EMAIL } from '@/lib/site';
import JsonLd from './json-ld';
import CopilotPanel from './copilot-panel';
import SmartLink, { Arrow, isOffsite } from './smart-link';
import Toc from './toc';

function Deltas({ b }: { b: Extract<CaseBlock, { kind: 'deltas' }> }) {
  const span = b.max - b.min;
  const x = (v: number) => ((v - b.min) / span) * 100;
  const zero = x(0);
  return <figure className="figure" aria-labelledby="fig-deltas">
    <div className="fig-head">
      <p className="fig-title" id="fig-deltas">{b.title}</p>
      <p className="legend"><span><i className="lg-new"/>{b.legend[0]}</span><span><i style={{ background: '#b4532a' }}/>{b.legend[1]}</span></p>
    </div>
    <ul className="deltas">
      {b.rows.map(r => {
        const left = Math.min(x(r.value), zero), width = Math.abs(x(r.value) - zero);
        return <li className="delta-row" key={r.label}>
          <span className="dl">{r.label}</span>
          <span className="dtrack" aria-hidden="true">
            <span className="dzero" style={{ left: zero + '%' }}/>
            <span className={'dbar ' + (r.good ? 'good' : 'bad')} style={{ left: left + '%', width: width + '%' }}/>
            <span className="dci" style={{ left: x(r.lo) + '%', width: (x(r.hi) - x(r.lo)) + '%' }}/>
          </span>
          <span className={'dv mono ' + (r.good ? 'good' : 'bad')}>{r.fmt}<span className="sr-only"> points, 95% interval {r.lo} to {r.hi}</span></span>
        </li>;
      })}
    </ul>
    <dl className="callouts">{b.callouts.map(c => <div key={c.k}><dt>{c.k}</dt><dd className="mono">{c.v}</dd></div>)}</dl>
    <figcaption className="fig-cap">{b.caption}</figcaption>
  </figure>;
}

function Block({ b }: { b: CaseBlock }) {
  switch (b.kind) {
    case 'p': return <p>{b.text}</p>;
    case 'bullets': return <ul className="bullets">{b.items.map(i => <li key={i}>{i}</li>)}</ul>;
    case 'steps': return <ol className="steps" aria-label={b.label}>{b.items.map((s, i) => <li key={s}><span className="num mono">{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>;
    case 'table': return <div className="table-wrap" role="region" aria-label={b.caption} tabIndex={0}>
      <table className={'data' + (b.textual ? ' textual' : '')}>
        <caption>{b.caption}{b.note && <small>{b.note}</small>}</caption>
        <thead><tr>{b.headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead>
        <tbody>{b.rows.map((row, ri) => <tr key={row[0]} className={b.highlight?.includes(ri) ? 'hl' : undefined}>{row.map((c, i) => i === 0
          ? <th scope="row" key={i}>{c}</th>
          : <td key={i} data-label={b.headers[i]} className={b.textual && i === b.headers.length - 1 ? 'wide' : undefined}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>;
    case 'deltas': return <Deltas b={b}/>;
    case 'stats': return <figure className="stats-card">
      <dl className="stats">{b.items.map(i => <div key={i.label}><dt className="mono">{i.n}</dt><dd>{i.label}</dd></div>)}</dl>
      {b.note && <figcaption>{b.note}</figcaption>}
    </figure>;
    case 'copilot': return <figure className="copilot-fig"><CopilotPanel/><figcaption>The open copilot view, recreated for a synthetic type 2 diabetes follow-up.</figcaption></figure>;
  }
}

export default function CaseStudyPage({ c }: { c: CaseStudy }) {
  const path = `/work/${c.slug}`;
  const title = c.h1.join('');
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', '@id': canonical(path) + '#article', url: canonical(path),
    headline: title, name: title, description: c.description, inLanguage: 'en-US', author: { '@id': PERSON_ID },
    datePublished: c.published, image: SITE_URL + ogImage(path), mainEntityOfPage: canonical(path),
  };
  const toc = [{ id: 'found', title: 'What I found' }, ...c.sections.map(s => ({ id: s.id, title: s.title }))];
  return <main id="main">
    <JsonLd data={schema}/><JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }, { name: title, path }])}/>
    <header className="wrap page-head rise">
      <nav className="crumbs" aria-label="Breadcrumb"><a href="/work">Work</a><span className="sl" aria-hidden="true">/</span><a href={`/work#${c.crumb.toLowerCase()}`}>{c.crumb}</a></nav>
      <h1 className="h1-page" style={{ maxWidth: 980 }}>{c.h1[0]}<em>{c.h1[1]}</em>{c.h1[2]}</h1>
      <p className="subtitle">{c.subtitle.map((s, i) => <span key={s}>{i > 0 && <span className="dot" aria-hidden="true">·</span>}{s}</span>)}</p>
    </header>
    <div className="wrap">
      <section className="found" id="found" aria-labelledby="found-h" data-reveal="">
        <h2 className="kicker" id="found-h">What I found</h2>
        <ol>{c.findings.map(f => <li key={f}><p>{f}</p></li>)}</ol>
      </section>
      <dl className="meta">{c.meta.map(m => <div key={m.label}><dt>{m.label}</dt><dd>{m.href ? <SmartLink href={m.href}>{m.value}</SmartLink> : m.value}</dd></div>)}</dl>
    </div>
    <div className="wrap art-grid">
      <article className="prose">
        <details className="contents-mobile"><summary>Contents</summary><ol>{toc.map(t => <li key={t.id}><a href={'#' + t.id}>{t.title}</a></li>)}</ol></details>
        {c.sections.map(s => <section key={s.id} id={s.id}>
          <h2 className="h2">{s.title}</h2>
          {s.blocks.map((b, i) => <Block key={i} b={b}/>)}
        </section>)}
        <section className="source-note" aria-labelledby="sources-h">
          <h2 className="h3" id="sources-h">Sources</h2>
          <ul className="rel">{c.sources.map(s => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer"><span>{s.label}</span><span className="arr out" aria-hidden="true">↗</span></a></li>)}</ul>
        </section>
        <a className="cta-strip" href={`mailto:${EMAIL}`}><p>{c.cta}</p><span className="btn btn-secondary">{EMAIL}</span></a>
        <p className="footnote">How I write these: numbers link to their source files; drafting is AI-assisted and every result is checked by hand. <a href="/how-i-write">More on method <span className="arr in" aria-hidden="true">→</span></a></p>
      </article>
      <aside className="side" aria-label="Related">
        <div className="side-sticky">
          <Toc items={toc}/>
          <div className="side-card soft"><p className="eyebrow">New here?</p><p className="say">Start here: five things, in reading order</p><a className="link stretch" href="/start">About 18 minutes <span className="arr in" aria-hidden="true">→</span></a></div>
          <div className="side-card"><p className="eyebrow">Related</p>
            <ul className="rel">{c.related.map(r => <li key={r.href}><a href={r.href} {...(isOffsite(r.href) ? { target: '_blank', rel: 'noreferrer' } : {})}><span>{r.label}<span className="tiny">{r.sub}</span></span><Arrow href={r.href}/></a></li>)}</ul>
          </div>
        </div>
      </aside>
    </div>
  </main>;
}
