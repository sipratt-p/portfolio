import { pageMetadata, breadcrumbs } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
import SmartLink from '@/components/portfolio/smart-link';
import WorkFilter from '@/components/portfolio/work-filter';
import { workItems, workTopics } from '@/lib/work';

export const metadata = pageMetadata('/work', 'Work: Evals, Agents, Inference and Products', 'Every piece of evidence in one place: scribe-bench, video evals, coding-agent-bench, a live visit copilot, serving kits, AI playtesters, refusal ablation, and shipped products.');

const month = (ym: string) => new Date(ym + '-01T00:00:00Z').toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function Work() {
  const counts = Object.fromEntries(workTopics.map(t => [t, workItems.filter(w => w.topics.includes(t)).length]));
  return <main id="main">
    <JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }])}/>
    <div className="hero-band">
      <header className="wrap page-head rise">
        <p className="eyebrow lined">Work</p>
        <h1 className="h1-page" style={{ marginTop: 16 }}>Everything here has a <em>run</em> behind it.</h1>
        <p className="lead">Benchmarks, agents, inference and the products they turned into. Each card carries one measured result and a link to the code, the notes or the product.</p>
      </header>
    </div>
    <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <WorkFilter topics={workTopics} counts={counts} total={workItems.length}/>
      <div className="work-grid">
        {workItems.map(w => <article key={w.slug} id={w.slug} className="card work-card hoverable" data-topics={w.topics.join(' ')}>
          <div className="card-body">
            <div className="card-row"><p className="kicker">{w.kicker}</p><span className="date">{month(w.date)}</span></div>
            <h2 className="h3 card-title"><a href={w.primary} {...(/^https?:/.test(w.primary) ? { target: '_blank', rel: 'noreferrer' } : {})}>{w.title}</a></h2>
            <p className="body">{w.summary}</p>
            <div className="chips">{w.chips.map(c => <span key={c} className="chip num">{c}</span>)}</div>
            {w.note && <p className="tiny">{w.note}</p>}
          </div>
          <div className="card-foot">{w.links.map(l => <SmartLink key={l.href + l.label} href={l.href}>{l.label}</SmartLink>)}</div>
        </article>)}
      </div>
      <div className="archive-row" id="archive">
        <div>
          <p className="kicker">Archive</p>
          <h2 className="h3" style={{ marginTop: 6 }}>Earlier product work at NVIDIA, Lyft and Intuit</h2>
          <p className="body" style={{ marginTop: 6 }}>Five short case studies from the previous version of this site: enterprise AI catalogs, universal search, AV validation, and experimentation platforms.</p>
        </div>
        <SmartLink className="link stretch" href="/work/archive">Open the archive</SmartLink>
      </div>
    </section>
  </main>;
}
