import { pageMetadata } from '@/lib/seo';
import FieldNotes from '@/components/portfolio/field-notes';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata = pageMetadata('/local-ai', 'Local AI — Agents, Models & Creative Work', 'Seth Pratt’s local AI practice: long-running agents, open-source model adaptation and evaluation, H3 and LTX video, and original music on two RTX PRO 6000 GPUs.');

const practices = [
  {
    number: '01', title: 'Long-running, purpose-built AI agents', tools: 'Video Rendering Agents · Personal Assistant · Media Management Agent · Coding Agent',
    description: 'My primary focus is building long-running AI agents tailored to specific jobs. I design their workflows, tools, and task context so they can carry work forward over time—not just answer a single prompt. That includes agents for video rendering, personal assistance, media management, and coding.',
  },
  {
    number: '02', title: 'Model adaptation & evaluation', tools: 'Fine-tuning · LoRA training · Abliteration',
    description: 'I fine-tune models, train LoRAs, and work with abliteration to study and modify model behavior. I compare adapted models with their base versions: a change in behavior is not, by itself, an improvement in capability.',
  },
  {
    number: '03', title: 'Making local inference practical', tools: 'GPU memory · Quantization · Serving · Benchmarks',
    description: 'Getting models to run well on hardware I own means working through memory limits, serving configurations, and performance tradeoffs. I test against real tasks, not just tokens per second.',
  },
  {
    number: '04', title: 'From models to moving pictures', tools: 'MiniMax H3 · LTX · Character consistency · Lip-sync',
    description: 'I build rendering workflows with H3 and LTX for conversational UGC, action sequences, and multi-shot stories. The work extends beyond a prompt: references, character and voice consistency, shot assembly, and quality checks all matter.',
  },
  {
    number: '05', title: 'Custom songs & soundtracks', tools: 'MiniMax Music 3 (M3) · ACE-Step',
    description: 'I make custom songs with M3 and ACE-Step, exploring lyrics, vocal direction, arrangements, and musical styles. Sometimes the result stands on its own; sometimes it becomes the soundtrack for a film.',
  },
];

export default function LocalAI() {
  return <main id="main" className="lab-page">
    <div className="wrap">
      <a href="/" className="back-link"><ArrowLeft size={16} aria-hidden="true"/>Back to the professional side</a>
      <header className="lab-intro">
        <div>
          <p className="eyebrow">Independent research & creative engineering</p>
          <h1>I like AI I can<br/><span className="serif">get my hands on.</span></h1>
          <p className="lab-lede">My main focus is long-running AI agents tailored to real tasks—from video rendering and personal assistance to media management and coding. I want AI that can keep working on something, not just respond to a prompt.</p>
          <p className="lab-personal">Open-source tools and open-weight models let me look under the hood and tailor these systems to the work. What keeps me interested is the loop: understand a model, try something, test it, and turn the result into a useful tool—or a piece of art.</p>
        </div>
        <aside className="lab-workbench" aria-label="Local AI hardware">
          <p className="eyebrow">The workbench</p>
          <p className="lab-hardware-number">2×</p>
          <h2>NVIDIA RTX PRO 6000</h2>
          <p>Blackwell Workstation GPUs</p>
          <div className="lab-workbench-rule"/>
          <p>Agent workflows, local inference, training, video, and music. A place to experiment all the way from model weights to a working system or a finished piece.</p>
          <span>My independent practice, separate from my role at NVIDIA.</span>
        </aside>
      </header>
      <section className="lab-practices" aria-labelledby="lab-practices-title">
        <div className="section-heading"><div><p className="eyebrow">Hands-on work</p><h2 id="lab-practices-title">What I’m working on.</h2></div></div>
        <div className="lab-practice-grid">{practices.map(practice => <article key={practice.number} className={practice.number === '01' ? 'lab-practice-featured' : undefined}>
          <span className="lab-practice-number">{practice.number}</span>
          <h3>{practice.title}</h3>
          <p>{practice.description}</p>
          <p className="lab-tools">{practice.tools}</p>
        </article>)}</div>
      </section>
      <FieldNotes/>
      <section className="lab-open" aria-labelledby="lab-open-title">
        <div><p className="eyebrow">Why open matters to me</p><h2 id="lab-open-title">Share the method.<br/>Not just the demo.</h2></div>
        <div><p>I’m passionate about open source because it gives independent builders room to explore. Being able to inspect the code, reproduce a result, and build on someone else’s work changes what’s possible outside a large lab.</p><p>I keep notes on what works, what fails, and how to repeat it. I want more people to be able to build with these tools—not just watch the results.</p><a href="https://github.com/sipratt-p" target="_blank" rel="noreferrer" className="text-link">Find me on GitHub <ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a></div>
      </section>
      <section className="lab-output" aria-labelledby="lab-output-title">
        <div className="section-heading"><div><p className="eyebrow">A few things that came out of it</p><h2 id="lab-output-title">The serious work.<br/>And the less serious.</h2></div><p>The Studio holds the finished pieces. Some are reflective. Some are George Costanza arguing with Dwight Schrute about AI.</p></div>
        <div className="lab-output-links">
          <a href="/studio/george-dwight-ai"><span><strong>George & Dwight on AI</strong><span>A diner, a disagreement, and the future of work.</span></span><ArrowUpRight size={21} aria-hidden="true"/></a>
          <a href="/studio/fable"><span><strong>Fable</strong><span>An ACE-Step song film, told through H3 imagery.</span></span><ArrowUpRight size={21} aria-hidden="true"/></a>
          <a href="/studio"><span><strong>Explore the Studio</strong><span>Action shorts, UGC, songs, and visual experiments.</span></span><ArrowUpRight size={21} aria-hidden="true"/></a>
        </div>
      </section>
    </div>
  </main>;
}
