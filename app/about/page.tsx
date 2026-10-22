import { pageMetadata, breadcrumbs } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
import SmartLink from '@/components/portfolio/smart-link';
import StartList, { startMinutes } from '@/components/portfolio/start-list';
import { career } from '@/lib/portfolio';
import { contacts, EVERDUST } from '@/lib/site';

export const metadata = pageMetadata('/about', 'About', 'Seth Pratt, Applied AI Product Leader, currently on NVIDIA’s GenAI platform. Outside work he benchmarks clinical scribes and coding agents, serves large open models, and runs a small studio of AI agents.');

const good = [
  { h: 'Evals & measurement', b: 'Golden sets, claim-level scorers, injected-error tests and paired-bootstrap intervals, synthetic data with exact labels and held-out splits, with the failures written down.', proof: 'Proof: scribe-bench', href: '/work/scribe-bench' },
  { h: 'Agentic building', b: 'A fleet of AI coding agents across five machines, run on written specs and measured gates.', proof: 'Proof: coding-agent-bench', href: '/writing/local-agent-evaluations' },
  { h: 'Product judgment', b: 'Platforms and products shipped at NVIDIA, Lyft, Intuit, Meta and Visa.', proof: 'Proof: the résumé', href: '/resume' },
];

export default function About() {
  return <main id="main">
    <JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])}/>
    <div className="hero-band">
      <section className="wrap about-top">
        <figure className="portrait rise-late"><div className="portrait-ring"><div className="portrait-frame"><img src="/images/profile.webp" alt="Seth Pratt" width="830" height="820" fetchPriority="high"/></div></div></figure>
        <div className="rise">
          <p className="eyebrow dotted">Applied AI Product Leader</p>
          <h1 className="h1-page" style={{ marginTop: 16 }}>About</h1>
          <div className="bio">
            <p>I’m an applied AI product leader, currently on NVIDIA’s GenAI platform. Before that I built products at Lyft, Intuit, Meta and Visa.</p>
            <p>Outside work, I build and measure AI systems: I benchmark clinical scribes and coding agents, train small verifier models on planted-error synthetic data, serve large open models on workstation GPUs, and run a small studio of AI agents that makes <SmartLink className="inline-link" href={EVERDUST}>Everdust</SmartLink> and the physics work in <a className="inline-link" href="/lab">the Lab</a>.</p>
          </div>
        </div>
      </section>
    </div>

    <section className="wrap" id="start" aria-labelledby="start-h">
      <div className="start" data-reveal="">
        <div>
          <h2 className="h2" id="start-h">Start here</h2>
          <p className="lead">Five things, in reading order. About {startMinutes} minutes.</p>
        </div>
        <StartList/>
      </div>
    </section>

    <section className="section" aria-labelledby="good-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="good-h">What I’m good at</h2></div>
        <div className="good">{good.map(g => <article className="card hoverable" key={g.h} data-reveal="">
          <div className="card-body"><h3 className="h3 card-title"><a href={g.href}>{g.h}</a></h3><p className="body">{g.b}</p></div>
          <div className="card-foot"><SmartLink href={g.href}>{g.proof}</SmartLink></div>
        </article>)}</div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="career-h">
      <div className="wrap timeline-wrap">
        <div>
          <div className="sec-head"><h2 className="h2" id="career-h">Career</h2><SmartLink href="/resume">Full résumé</SmartLink></div>
          <ol className="tl">{career.map(c => <li key={c.company} className={'earlier' in c && c.earlier ? 'earlier' : undefined}>
            <span className="y">{'earlier' in c && c.earlier ? 'Earlier' : c.years}</span><span className="c">{c.company}</span><span className="r">{c.role}</span>
          </li>)}</ol>
          <p className="small" style={{ marginTop: 16 }}>Earlier product case studies are in the <a className="inline-link" href="/work/archive">archive</a>.</p>
        </div>
        <div className="contact-list" id="about-contact">
          <div className="sec-head"><h2 className="h2">Contact</h2></div>
          <dl>{contacts.map(c => <div key={c.label}><dt>{c.label}</dt><dd><SmartLink className="link" href={c.href}>{c.value}</SmartLink></dd></div>)}</dl>
        </div>
      </div>
    </section>
  </main>;
}
