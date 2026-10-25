import { pageMetadata, SITE_URL, PERSON_ID } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
import CopilotPanel from '@/components/portfolio/copilot-panel';
import LabTile from '@/components/portfolio/lab-tile';
import SmartLink from '@/components/portfolio/smart-link';
import SectionLoop from '@/components/portfolio/llmt/loop';
import { shipped } from '@/lib/work';
import { notes } from '@/lib/editorial';
import { EVERDUST } from '@/lib/site';

export const metadata = pageMetadata('/', 'Seth Pratt — Applied AI Product Leader', 'Seth Pratt builds AI systems and measures what they actually do: clinical-scribe and coding-agent benchmarks, small verifier models trained on synthetic data, large open models on workstation GPUs, and physics at 100 million particles.', { absolute: true });

const note = (slug: string) => {
  const n = notes.find(x => x.slug === slug);
  if (!n) throw new Error('missing note ' + slug);
  return n;
};
const PAPER = '/writing/watching-a-language-model-think';
const TEAM = '/writing/running-a-team-of-ai-agents';
// The card names the loop itself, so its long caption isn't sent to the browser.
const paperLoop = { ...note('watching-a-language-model-think').heroLoop!, caption: '' };

// Three stories instead of three bare numbers: each card is one link, with at most one small number.
const stories = [
  {
    kicker: 'Agents · Product', date: 'Oct 2026', href: TEAM, go: 'Read the six stories',
    title: 'Ran ~2,000 AI agents for 3 weeks: what it taught me about applied AI in product management',
    body: 'Two lead agents handed work to their helpers almost around the clock. The limit wasn’t compute or ideas. It was subscription quota.',
  },
  {
    kicker: 'Interactive paper', date: 'Oct 2026', href: PAPER, go: 'Read and explore',
    title: 'Watching a language model think (interactive)',
    body: 'Real numbers from Qwen models, turned into 3-D films and figures you can poke. Some pictures showed real mechanisms. Some were artefacts of the drawing.',
  },
  {
    kicker: 'Evals · VR', date: 'Oct 2026', href: '/writing/testing-a-vr-game', go: 'How each miss became a test',
    title: 'Every build passed its bots. In the headset I still hit about 30 problems they missed',
    body: 'The bots knew the answer and followed a scripted path. A person in a headset didn’t. Each problem became a new test the same day.',
  },
];

// Newest first. The copilot card left the home page: it was a second card for the flagship’s own case study,
// and the flagship already shows the copilot (panel + one line).
const supporting = [
  {
    kicker: 'Evals · Agents', date: 'Apr–Oct 2026', title: 'Autoresearch at home: where the scorer lied', href: '/writing/autoresearch-at-home',
    body: 'Eight loops that generate candidates, score them on local GPUs and keep the winners, from video and games to strange attractors and artificial life. The search was the easy part. The scorer needed the rigor.',
    chips: ['largest search: 2.5 B candidates', '40 of 40 marked verified, 16 wrong'],
    links: [{ label: 'Notes', href: '/writing/autoresearch-at-home' }, { label: 'The attractor search', href: '/lab/strange-attractors#found' }],
  },
  {
    kicker: 'Evals · Agents', date: 'Sep 2026', title: 'coding-agent-bench', href: '/writing/local-agent-evaluations',
    body: '82 scored runs of local models and agent harnesses, and the grading bugs that had to be fixed first, including one that scored an answer 17/100 until a fixed extractor gave the same answer 97/100.',
    chips: ['82 runs · task set v4', '17/100 → 97/100 after one fix'],
    links: [{ label: 'Notes', href: '/writing/local-agent-evaluations' }, { label: 'Code', href: 'https://github.com/sipratt-p/coding-agent-bench' }],
  },
  {
    kicker: 'Evals · Video', date: 'Aug 2026', title: 'When the lip-sync score picked the worse take', href: '/work/video-evals',
    body: 'Best-of-N on SyncNet chose lip-smacking takes, because SyncNet can’t hear mouth noise. Which faces can talk, and the tiered suite that now checks every render.',
    chips: ['26 of 59 clips: extra speech', '~35% of shot cuts missing'],
    links: [{ label: 'Case study', href: '/work/video-evals' }, { label: 'Code', href: 'https://github.com/sipratt-p/video-rsi' }],
  },
];

// The four newest, strongest notes, dated by when the work happened (newest first).
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortRange = (start: string, end: string) => {
  const [, ms, ds] = start.split('-').map(Number), [, me, de] = end.split('-').map(Number);
  return ms === me ? `${MON[me - 1]} ${ds}–${de}` : `${MON[ms - 1]} ${ds} – ${MON[me - 1]} ${de}`;
};
const writing = [
  { slug: 'testing-a-vr-game', tag: 'Evals', find: 'Half a million bot episodes a night proved the game worked, not that a person could play it.' },
  { slug: 'watching-a-language-model-think', tag: 'Lab', find: 'A 3-D map of a model’s vocabulary kept fewer than half of each word’s true neighbours, and raw attention pointed at the wrong word.' },
  { slug: 'running-a-team-of-ai-agents', tag: 'Agents', find: 'One usage limit stopped 18 agents at once. The lesson: make every task resumable, and write every handoff down.' },
  { slug: 'autoresearch-at-home', tag: 'Evals', find: 'Two small models searching together marked 40 of 40 maths answers verified. 16 of them were wrong.' },
].map(w => { const n = note(w.slug); return { ...w, title: n.title, href: `/writing/${w.slug}`, end: n.work!.end, label: shortRange(n.work!.start, n.work!.end) }; });

export default function Home() {
  return <main id="main">
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': SITE_URL + '/#profile', url: SITE_URL + '/', mainEntity: { '@id': PERSON_ID } }}/>
    <div className="hero-band">
      <section className="wrap hero">
        <div className="rise">
          <p className="eyebrow dotted">Applied AI · Evals · Agents · Simulation</p>
          <h1 className="h1">I build AI systems and <em>measure</em> what they actually do.</h1>
          <p className="lead">Applied AI product leader, currently on NVIDIA’s GenAI platform. Outside work I benchmark clinical scribes and coding agents, train small verifier models on synthetic data, look inside language models, and simulate physics at 100 million particles.</p>
          <p className="hero-team">I do it with a team of AI agents: two leads and their helpers, working almost around the clock. <a className="inline-link" href={TEAM}>What it taught me about applied AI in product management</a></p>
          <div className="actions">
            <a className="btn btn-primary" href="/start">Start here <span className="arr in" aria-hidden="true">→</span></a>
            <a className="btn btn-secondary" href="/work/scribe-bench">Read the flagship <span className="arr in" aria-hidden="true">→</span></a>
          </div>
        </div>
        <figure className="portrait rise-late">
          <div className="portrait-ring"><div className="portrait-frame"><img src="/images/profile.webp" alt="Seth Pratt" width="830" height="820" fetchPriority="high"/></div></div>
          <figcaption>San Francisco</figcaption>
        </figure>
      </section>
      <section className="wrap proof" aria-labelledby="stories-h">
        <h2 className="eyebrow lined proof-head" id="stories-h">Three recent stories</h2>
        <div className="proof-cards">
          {stories.map(s => <article className="card story hoverable" key={s.href}>
            <div className="card-row s-kick"><p className="kicker">{s.kicker}</p><span className="date">{s.date}</span></div>
            <h3 className="h3 s-title card-title"><a href={s.href}>{s.title}</a></h3>
            <p className="body s-body">{s.body}</p>
            <span className="link s-go" aria-hidden="true">{s.go} <span className="arr in">→</span></span>
          </article>)}
        </div>
      </section>
    </div>

    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="work-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="work-h">Selected work</h2><SmartLink href="/work">All work</SmartLink></div>
        <div className="flagships">
          <article className="card flagship hoverable" data-reveal="">
            <CopilotPanel compact/>
            <div className="card-body">
              <div className="card-row"><p className="kicker">Flagship · Evals</p><span className="date">Sep 2026</span></div>
              <h3 className="h2 card-title"><a href="/work/scribe-bench">scribe-bench: when ROUGE goes up and the notes get worse</a></h3>
              <p className="body">An open benchmark for ambient clinical documentation: seven speech recognizers, note generation, a LoRA fine-tune and a claim-level verifier. Then the same pipeline, live: a visit copilot that suggests the next question and drafts a cited note for review, on synthetic visits only.</p>
              <dl className="result">
                <div><dt>LoRA</dt><dd>ROUGE-L <span className="num">+8.6</span>, but <span className="num">+0.11</span> misattributions per note and follow-up recall <span className="num">97.4% → 92.9%</span></dd></div>
                <div><dt>Verifier</dt><dd><span className="num">98.7–99.6%</span> of injected errors caught, across three splits</dd></div>
              </dl>
            </div>
            <div className="card-foot">
              <SmartLink href="/work/scribe-bench">Case study</SmartLink>
              <SmartLink href="https://github.com/sipratt-p/scribe-bench">Code</SmartLink>
              <SmartLink href="https://github.com/sipratt-p/scribe-bench/blob/main/paper/paper.md">Paper draft</SmartLink>
            </div>
          </article>
          <article className="card flagship flag-paper hoverable" data-reveal="">
            <div className="flag-media"><SectionLoop loop={paperLoop} bare/></div>
            <div className="card-body">
              <div className="card-row"><p className="kicker">Flagship · Interactive paper</p><span className="date">Oct 2026</span></div>
              <h3 className="h2 card-title"><a href={PAPER}>Watching a language model think</a></h3>
              <p className="body">Real activations, attention weights and replies from Qwen models, turned into 3-D films, walk-in VR scenes and seven live figures you can poke, including a map of the model’s vocabulary you can fly through. Each picture was checked against a measurement.</p>
              <dl className="result">
                <div><dt>3-D map</dt><dd>kept <span className="num">43%</span> of each word’s true neighbours</dd></div>
                <div><dt>Attention</dt><dd>its favourite word was never the one that mattered</dd></div>
              </dl>
            </div>
            <div className="card-foot">
              <SmartLink href={PAPER}>Read the paper</SmartLink>
              <SmartLink href="/lab/inside-the-machine">Inside the Machine series</SmartLink>
            </div>
          </article>
        </div>
        <div className="cards3">
          {supporting.map(c => <article className="card hoverable" key={c.title} data-reveal="">
            <div className="card-row c-kick"><p className="kicker">{c.kicker}</p><span className="date">{c.date}</span></div>
            <h3 className="h3 c-title card-title"><a href={c.href}>{c.title}</a></h3>
            <p className="body c-body">{c.body}</p>
            <div className="c-chip">{c.chips.map(ch => <span className="chip num" key={ch}>{ch}</span>)}</div>
            <div className="card-foot">{c.links.map(l => <SmartLink key={l.href} href={l.href}>{l.label}</SmartLink>)}</div>
          </article>)}
        </div>
        <div className="archive-row" data-reveal="">
          <div>
            <p className="kicker">Open models · Sep 2026</p>
            <h3 className="h3" style={{ marginTop: 6 }}>Eleven small models on Hugging Face, mostly trained on planted-error synthetic data</h3>
            <p className="body" style={{ marginTop: 6 }}>Verifiers and readers for clinical notes, tables, citations, translations and agent clicks, each with held-out results and its measured limits. One lost to its baseline until real data was added.</p>
          </div>
          <SmartLink className="link stretch" href="/work/models">See the models</SmartLink>
        </div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="building-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="building-h">What I’m building</h2><span className="small">My company and my app, built by my lab: a team of AI agents I direct</span></div>
        <div className="flagships">
          <article className="card flagship hoverable" data-reveal="">
            <div className="flag-media"><img src="/projects/decosa/decosa-home.jpg" srcSet="/projects/decosa/decosa-home-800.jpg 800w, /projects/decosa/decosa-home.jpg 1600w" sizes="(max-width: 900px) 100vw, 50vw" alt="The decosa.ai home page: “AI that does the job, and shows its work”, beside a sample brief check that lists problems before filing and a signed record" width="1600" height="900" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto' }}/></div>
            <div className="card-body">
              <div className="card-row"><p className="kicker">My company · decosa.ai</p><span className="date">Oct 2026</span></div>
              <h3 className="h2 card-title"><a href="/work/decosa">Decosa: AI tools that do one job and show their work</a></h3>
              <p className="body">86 tools on open models, from checking a brief before filing to filling a form from your own papers, and an API in the OpenAI format. Every hosted model call comes back with a signed receipt, and every tool publishes its accuracy, cost and time.</p>
              <dl className="result">
                <div><dt>Measured</dt><dd><span className="num">69</span> of <span className="num">86</span> tools scored on held-out cases</dd></div>
                <div><dt>Brief check</dt><dd><span className="num">17</span> of <span className="num">19</span> planted fake citations caught, held out</dd></div>
              </dl>
            </div>
            <div className="card-foot">
              <SmartLink href="/work/decosa">About Decosa</SmartLink>
              <SmartLink href="https://decosa.ai">decosa.ai</SmartLink>
              <SmartLink href="/work/models">Its open models</SmartLink>
            </div>
          </article>
          <article className="card flagship hoverable" data-reveal="">
            <div className="flag-media"><img src="/media/lab/img/everdust-app.jpg" srcSet="/media/lab/img/everdust-app-800.jpg 800w, /media/lab/img/everdust-app.jpg 1600w" sizes="(max-width: 900px) 100vw, 50vw" alt="Everdust on Vision Pro and iPhone: a particle galaxy, iridescent soap film, a comet and a gas giant" width="1600" height="900" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto' }}/></div>
            <div className="card-body">
              <div className="card-row"><p className="kicker">My app · Everdust</p><span className="date">Oct 2026</span></div>
              <h3 className="h2 card-title"><a href="/work/everdust">Everdust: live physics worlds that move with your music</a></h3>
              <p className="body">A particle universe simulator with 11 space science games and 14 narrated science stories, live on Apple Vision Pro and Google Play, with iPhone, iPad, Mac and Apple TV in a free TestFlight beta.</p>
              <dl className="result">
                <div><dt>Reels</dt><dd><span className="num">3.17M</span> views on 21 reels in its first week (Oct 13–18, 2026)</dd></div>
                <div><dt>Top reel</dt><dd><span className="num">754K</span> views</dd></div>
              </dl>
            </div>
            <div className="card-foot">
              <SmartLink href="/work/everdust">About Everdust</SmartLink>
              <SmartLink href="https://everdust.ai">everdust.ai</SmartLink>
              <SmartLink href="https://www.instagram.com/everdustapp/">Instagram</SmartLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="how-h">
      <div className="wrap how" data-reveal="">
        <div>
          <h2 className="h2" id="how-h">How I work</h2>
          <p className="body">I lead a fleet of AI coding agents the way I’d lead a product team: clear specs, measured gates, and nothing ships on vibes.</p>
          <p className="body">Every handoff is written down, every job has one owner, and automatic gates catch regressions. That leaves me the parts agents can’t own: taste, priorities and anything public. <a className="inline-link" href={TEAM}>Six stories from three weeks of it</a></p>
          <ul className="gates">
            <li>every number reproducible, with the file it came from</li>
            <li>every render passes a photosensitivity gate</li>
            <li>every claim dated, every negative result kept</li>
          </ul>
        </div>
        <figure className="fleet" aria-label="Diagram: five machines sharing one pool of AI agents">
          <div className="fleet-hub">agents</div>
          <ul className="fleet-nodes">
            <li><span className="node"><b>Beast</b> — 2× RTX PRO 6000<span className="role">training · inference · renders</span></span></li>
            <li><span className="node"><b>Cosmo</b> — Mac Studio<span className="role">coordination · Apple builds</span></span></li>
            <li className="node-row"><span className="node node-sm">Mac Studio</span><span className="node node-sm">Mac mini</span><span className="node node-sm">Mac mini</span></li>
          </ul>
        </figure>
      </div>
    </section>

    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="shipped-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="shipped-h">Shipped</h2><span className="small">Products built with the same agent team</span></div>
        <div className="shipped">
          {shipped.map(s => <article className="card ship hoverable" key={s.name} data-reveal="">
            <p className="status">{s.status}</p>
            <h3 className="h3 card-title"><a href={s.href} target="_blank" rel="noreferrer">{s.name}<span className="sr-only"> (opens in a new tab)</span></a></h3>
            <p className="body">{s.body}</p>
            {'stores' in s
              ? <span className="link ship-stores">{s.stores.map(l => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <span className="arr out" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>)}</span>
              : <span className="link" aria-hidden="true">{s.linkLabel} <span className="arr out">↗</span></span>}
          </article>)}
        </div>
      </div>
    </section>

    <section className="band lab" aria-labelledby="lab-band">
      <div className="wrap">
        <div className="band-head">
          <div>
            <p className="eyebrow lined" style={{ marginBottom: 16 }}>The Lab</p>
            <h2 className="h2" id="lab-band">The same measurement habit, pointed at light and gravity.</h2>
          </div>
        </div>
        <div className="tiles4 scroller">
          <LabTile sizes="(max-width: 640px) 80vw, (max-width: 900px) 50vw, 25vw" piece={{ id: 'home-discoveries', title: 'Discoveries II', type: 'Strange attractors, searched', fact: '8 found in 2.5 billion random flows', image: 'attr-discoveries-ii', alt: 'Discoveries II: a translucent violet and gold strange attractor on black', loop: 'discoveries-ii', loopSeconds: 6, href: '/lab/strange-attractors#discoveries-ii' }}/>
          <LabTile sizes="(max-width: 640px) 80vw, (max-width: 900px) 50vw, 25vw" piece={{ id: 'home-nebula', title: 'Ring Nebula', type: 'Simulated nebula', fact: '250M particles, built from stellar-wind physics, not a photo', image: 'nebula-ring', alt: 'The simulated Ring Nebula seen face-on: a blue core inside a thick ring of pink and gold gas knots, in a faint violet halo on black', loop: 'nebula-ring', loopSeconds: 6, href: '/lab/cosmos#nebulae' }}/>
          <LabTile sizes="(max-width: 640px) 80vw, (max-width: 900px) 50vw, 25vw" piece={{ id: 'home-merger', title: 'Binary Black Hole Merger', type: 'GR ray tracer', fact: 'two black holes feed, spiral in, merge and ring down', image: 'cosmos-bh-merger', alt: 'Two black holes spiralling inside a bright accretion disk', loop: 'bh-merger', loopSeconds: 6, href: '/lab/cosmos#bh-merger' }}/>
          <LabTile sizes="(max-width: 640px) 80vw, (max-width: 900px) 50vw, 25vw" piece={{ id: 'home-bestiary', title: 'Bestiary', type: 'Lifeforms found by search', fact: '24 species, one predator', image: 'bestiary', alt: 'Plates of glowing Flow-Lenia creatures labelled with Latin names', pos: '50% 0%', loop: 'bestiary', loopSeconds: 6, href: '/lab/life#bestiary' }}/>
        </div>
        <div className="band-foot">
          <div className="actions">
            <a className="btn btn-secondary" href="/lab">Enter the Lab <span className="arr in" aria-hidden="true">→</span></a>
            <a className="btn btn-secondary" href="/lab#live">Try it live <span className="arr in" aria-hidden="true">→</span></a>
          </div>
          <p>Space and maths pieces run in your browser or in Vision Pro. Most of the Lab lives in Everdust, a particle universe simulator for iPhone, iPad, Mac, Apple TV and Vision Pro. <SmartLink href={EVERDUST}>everdust.ai</SmartLink></p>
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="writing-h">
      <div className="wrap">
        <div className="sec-head"><h2 className="h2" id="writing-h">Writing</h2><SmartLink href="/writing">All writing</SmartLink></div>
        <ol className="posts">
          {writing.map(w => <li className="post" key={w.href} data-reveal="">
            <time dateTime={w.end}>{w.label}</time>
            <div><a className="post-title" href={w.href}>{w.title}</a><p className="post-find">{w.find}</p></div>
            <span className="tags"><span className={'tag' + (w.tag === 'Lab' ? ' tag-lab' : ' tag-accent')}>{w.tag}</span></span>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <div className="career-strip" data-reveal="">
        <p><span className="m">Before and alongside this:</span> product at NVIDIA (GenAI platform), Lyft, Intuit, Meta and Visa.</p>
        <SmartLink href="/resume">Full résumé</SmartLink>
      </div>
    </section>
  </main>;
}
