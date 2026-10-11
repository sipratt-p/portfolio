import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { pageMetadata, breadcrumbs } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
import PreviewMedia from '@/components/portfolio/preview-media';
import LabTile from '@/components/portfolio/lab-tile';
import LabLabel from '@/components/portfolio/lab-label';
import SmartLink from '@/components/portfolio/smart-link';
import LabDetails from '@/components/portfolio/lab-details';
import LiveTile from '@/components/portfolio/live-tile';
import { labSeries, pieceCount, PLAY } from '@/lib/lab';
import { EVERDUST } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return labSeries.map(s => ({ series: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params; const s = labSeries.find(s => s.slug === series);
  if (!s) return { title: 'Not found', robots: { index: false, follow: false } };
  return pageMetadata(`/lab/${s.slug}`, `${s.name} — The Lab`, s.intro);
}

export default async function Series({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params;
  const i = labSeries.findIndex(s => s.slug === series); if (i < 0) notFound();
  const s = labSeries[i]; const next = labSeries[(i + 1) % labSeries.length];
  return <main id="main" className="lab">
    <JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Lab', path: '/lab' }, { name: s.name, path: `/lab/${s.slug}` }])}/>
    <div className="lab-hero">
      <header className="wrap page-head rise">
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/lab">Lab</a><span className="sl" aria-hidden="true">/</span><span aria-current="page">{s.name}</span></nav>
        <h1 className="h1">{s.title ? <>{s.title} </> : null}<em>{s.em}</em></h1>
        <p className="lead">{s.intro}</p>
      </header>
      <section className="wrap" aria-label="Featured piece">
        <figure id={s.hero.id} className="hero-fig rise-late">
          <PreviewMedia className="hero-media" image={s.hero.image!} alt={s.hero.alt!} pos={s.hero.pos} loop={s.hero.loop} loopSeconds={s.hero.loopSeconds} sizes="(max-width: 1200px) 100vw, 1120px" eager/>
          <figcaption><LabLabel className="label hero-label" title={s.hero.title} type={s.hero.type} fact={s.hero.fact} detail={s.hero.id} stretch/>{s.hero.status && <span className="status">{s.hero.status}</span>}</figcaption>
        </figure>
      </section>
    </div>

    {s.funnel && <section className="section" id="found" aria-labelledby="found-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="found-h">How they were found</h2><span className="count">bar length = log of count</span></div>
        <div className="funnel-card" data-reveal="">
          <ol className="funnel">{s.funnel.map((f, k) => <Fragment key={f.w}>
            {k > 0 && <li className="fa" aria-hidden="true"/>}
            <li className="stage"><span className="n">{f.n}</span><span className="w">{f.w}</span><span className="bar" style={{ width: f.pct + '%' }}/></li>
          </Fragment>)}</ol>
          <div className="funnel-cap"><p>{s.funnelNote}</p><SmartLink href="/writing/chaos-with-nothing-to-orbit">Read: Chaos with nothing to orbit</SmartLink></div>
        </div>
      </div>
    </section>}

    <section className={'section' + (s.funnel ? '' : '')} style={s.funnel ? { paddingTop: 0 } : undefined} aria-labelledby="pieces-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="pieces-h">Pieces</h2><span className="count">{pieceCount(s)} in this series</span></div>
        {s.pieces.length > 0 && <div className="tiles3">{s.pieces.map(p => <LabTile key={p.id} piece={p} detail/>)}</div>}
        {s.more.length > 0 && <ul className="more-list" aria-label="More in this series">{s.more.map(p => <li key={p.id} id={p.id} className="more-row">
          <LabLabel title={p.title} type={p.type} fact={p.fact} detail={p.id} stretch/>
          <span className="more-go" aria-hidden="true"><span className="w">Details</span> <span className="arr in">→</span></span>
        </li>)}</ul>}
        <aside className="notes-box" aria-label="Honest notes">
          <p className="eyebrow">Honest notes</p>
          <ul>{s.honest.map(h => <li key={h}>{h}</li>)}</ul>
        </aside>
      </div>
    </section>

    {s.live && s.live.length > 0 && <section className="section live-section" style={{ paddingTop: 0 }} aria-labelledby="live-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="live-h">Try it live</h2><span className="count">in your browser · opens everdust.ai</span></div>
        <p className="lead sec-lead">Lighter live versions that run on a phone, a laptop or in Vision Pro, each under 1 MB to load. They are real-time simulations, so the particle counts are far below the renders above.</p>
        <div className="tiles3">{s.live.map(p => <LiveTile key={p.slug} piece={p}/>)}</div>
        <p className="media-note">More live pieces are at <SmartLink href={PLAY}>everdust.ai/play</SmartLink></p>
      </div>
    </section>}

    <div className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <div className="next-row">
        <SmartLink className="btn btn-primary" href={EVERDUST}>See them in Everdust</SmartLink>
        <div className="nx"><span className="tiny">Next series</span><a href={`/lab/${next.slug}`}>{next.name} <span className="arr in" aria-hidden="true">→</span></a></div>
      </div>
    </div>
    <LabDetails series={s.name} pieces={[s.hero, ...s.pieces, ...s.more]}/>
  </main>;
}
