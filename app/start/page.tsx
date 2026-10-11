import { pageMetadata } from '@/lib/seo';
import StartList, { startMinutes } from '@/components/portfolio/start-list';

export const metadata = pageMetadata('/start', 'Start Here', 'Five things to read, in order, to see what Seth Pratt builds and measures: the scribe-bench case study, its code, one post, one Lab series and the résumé.');

export default function Start() {
  return <main id="main">
    <div className="hero-band">
      <header className="wrap page-head rise">
        <p className="eyebrow lined">Start here</p>
        <h1 className="h1-page" style={{ marginTop: 16 }}>Five things, in <em>reading order</em></h1>
        <p className="lead">If you have a few minutes and want to know what I measure and whether I build it myself, this is the shortest path. About {startMinutes} minutes end to end; the first one is the one that matters.</p>
      </header>
    </div>
    <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <div className="start">
        <div>
          <h2 className="h2">The path</h2>
          <p className="lead">Read the flagship, check the code, sample one post, look at one piece of visual work, then the résumé.</p>
        </div>
        <StartList/>
      </div>
    </section>
  </main>;
}
