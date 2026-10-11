import { pageMetadata, breadcrumbs } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
import { projects } from '@/lib/portfolio';

export const metadata = pageMetadata('/work/archive', 'Archive: Earlier Product Work', 'Short case studies of Seth Pratt’s earlier product work: NVIDIA’s NGC and API catalogs, AV test management, Lyft universal search, and Intuit reconciliation and experimentation.');

export default function Archive() {
  return <main id="main">
    <JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }, { name: 'Archive', path: '/work/archive' }])}/>
    <header className="wrap page-head rise">
      <nav className="crumbs" aria-label="Breadcrumb"><a href="/work">Work</a><span className="sl" aria-hidden="true">/</span><span>Archive</span></nav>
      <h1 className="h1-page">Earlier <em>product</em> work</h1>
      <p className="lead">Five projects from my product career, kept short. Product imagery is from my original portfolio, and interfaces may have changed since. Unverified impact numbers are left out on purpose.</p>
    </header>
    <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      {projects.map(p => <article key={p.slug} id={p.slug} className="archive-item">
        <div>
          <p className="kicker">{p.company} · {p.category}</p>
          <h2 className="h3" style={{ marginTop: 8 }}>{p.title}</h2>
          <p className="body" style={{ marginTop: 6 }}>{p.name}</p>
          <dl>
            <div><dt>My role</dt><dd>{p.role}</dd></div>
            <div><dt>Context</dt><dd>{p.context}</dd></div>
            <div><dt>My contribution</dt><dd>{p.contribution}</dd></div>
            <div><dt>Areas of focus</dt><dd>{p.focus.join(' · ')}</dd></div>
          </dl>
        </div>
        <figure><img src={'/images/' + p.image + '.webp'} alt={p.imageAlt} width="1200" height="800" loading="lazy" decoding="async"/></figure>
      </article>)}
    </section>
  </main>;
}
