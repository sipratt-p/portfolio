import { pageMetadata, breadcrumbs } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
import PreviewMedia from '@/components/portfolio/preview-media';
import LabTile from '@/components/portfolio/lab-tile';
import SmartLink from '@/components/portfolio/smart-link';
import LiveTile from '@/components/portfolio/live-tile';
import { lab, labSeries, livePieces, pieceCount, PLAY } from '@/lib/lab';
import { EVERDUST } from '@/lib/site';

export const metadata = pageMetadata('/lab', 'The Lab: Physics, Lifeforms and Live Worlds', 'Physics simulations, discovered lifeforms and live worlds by Seth Pratt, held to the same standard as the evals: exact equations, measured checks, and a photosensitivity gate on every render.');

export default function Lab() {
  const total = labSeries.reduce((n, s) => n + pieceCount(s), 0);
  const [first, ...rest] = labSeries;
  return <main id="main" className="lab">
    <JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Lab', path: '/lab' }])}/>
    <div className="lab-hero">
      <header className="wrap lab-head rise">
        <p className="eyebrow lined">The same measurement habit, pointed at light and gravity</p>
        <h1 className="h1" style={{ marginTop: 20 }}>The <em>Lab</em></h1>
        <p className="lead">{lab.intro}</p>
      </header>
      <section className="wrap" aria-label="Everdust">
        <article className="card everdust hoverable iri-on rise-late">
          <PreviewMedia image="everdust-app" alt="Everdust on Vision Pro and iPhone: a particle galaxy, iridescent soap film, a comet and a gas giant" sizes="(max-width: 640px) 100vw, 60vw" eager/>
          <div className="card-body">
            <p className="kicker">The app</p>
            <h2 className="h2 card-title"><a href={EVERDUST} target="_blank" rel="noreferrer">Everdust<span className="sr-only"> (opens in a new tab)</span></a> <span className="dim">the app these live in</span></h2>
            <p className="body">A particle universe simulator and space science games for iPhone, iPad, Mac, Apple TV and Vision Pro, where every world is a live simulation that moves with music.</p>
            <div className="card-row" style={{ justifyContent: 'flex-start', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
              <SmartLink className="btn btn-sm btn-secondary above" href={EVERDUST}>everdust.ai</SmartLink>
              <span className="tiny">Free TestFlight beta · App Store release pending</span>
            </div>
          </div>
        </article>
      </section>
    </div>

    <section className="section" aria-labelledby="series-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="series-h">Series</h2><span className="count">{labSeries.length} series · {total} pieces</span></div>
        <div className="series-grid">
          <article className="card wide hoverable" data-reveal="">
            <PreviewMedia image={first.hero.image!} alt={first.hero.alt!} loop="aizawa" loopSeconds={5} sizes="(max-width: 640px) 100vw, 60vw"/>
            <div className="card-body">
              <p className="kicker">Series {first.n}</p>
              <h3 className="h3 card-title"><a href={`/lab/${first.slug}`}>{first.name}</a></h3>
              <p className="body">{first.blurb}</p>
            </div>
            <div className="card-foot"><span className="count">{pieceCount(first)} pieces</span><span className="link push" aria-hidden="true">View series <span className="arr in">→</span></span></div>
          </article>
          {rest.map(s => <article className="card hoverable" key={s.slug} data-reveal="">
            <PreviewMedia image={s.hero.image!} alt={s.hero.alt!} pos={s.hero.pos} sizes="(max-width: 640px) 100vw, 50vw"/>
            <div className="card-body">
              <p className="kicker">Series {s.n}</p>
              <h3 className="h3 card-title"><a href={`/lab/${s.slug}`}>{s.name}</a></h3>
              <p className="body">{s.blurb}</p>
            </div>
            <div className="card-foot"><span className="count">{pieceCount(s)} pieces</span><span className="link push" aria-hidden="true">View series <span className="arr in">→</span></span></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section" id="live" style={{ paddingTop: 0 }} aria-labelledby="live-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="live-h">Try it live</h2><span className="count">in your browser · opens everdust.ai</span></div>
        <p className="lead sec-lead">Space and maths pieces you can run right now on a phone, a laptop or in Vision Pro. Each loads in under 1 MB.</p>
        <div className="tiles5 scroller">{livePieces.map(p => <LiveTile key={p.slug} piece={p}/>)}</div>
        <p className="media-note">More at <SmartLink href={PLAY}>everdust.ai/play</SmartLink>. Public hosting is coming for {lab.coming.map((c, i) => <span key={c.href}>{i > 0 && (i === lab.coming.length - 1 ? ' and ' : ', ')}<a className="inline-link" href={c.href}>{c.label}</a></span>)}; until then they are described in their series.</p>
      </div>
    </section>

    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="recent-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="recent-h">Recent</h2></div>
        <div className="tiles4 scroller">{lab.recent.map(p => <LabTile key={p.id} piece={p} sizes="(max-width: 640px) 80vw, 25vw" reveal={false}/>)}</div>
      </div>
    </section>

    <div className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <p className="lab-door"><span>The same habit, aimed at AI systems</span> <SmartLink href="/work">Work</SmartLink></p>
      <p className="media-note">Loops are silent, at most 6 seconds, play only on hover or tap, and pass the same photosensitivity gate as every render.</p>
    </div>
  </main>;
}
