import { pageMetadata } from '@/lib/seo';
import SmartLink from '@/components/portfolio/smart-link';
import { career } from '@/lib/portfolio';
import { EMAIL, LINKEDIN, GITHUB } from '@/lib/site';

export const metadata = pageMetadata('/resume', 'Résumé', 'Résumé of Seth Pratt, Applied AI Product Leader: product at NVIDIA, Lyft, Intuit, Meta and Visa, and independent work on AI evaluation, agents and inference.');

// Independent work, each with one measured result from its case study, note or repo.
const independent = [
  { t: 'scribe-bench', d: 'Open benchmark for ambient clinical documentation: 7 speech recognizers, LoRA, a claim verifier (98.7–99.6% injected-error recall) and an overnight search loop.', href: '/work/scribe-bench' },
  { t: 'Open models: verifiers and readers', d: 'Eleven Apache-2.0 models on Hugging Face, trained by my lab mostly on planted-error synthetic data and tested on held-out and outside sets: encoder fine-tunes, a full vision-language fine-tune and a LoRA on a 9B LLM. Behind a 27B judge, the clinical note detail checker raised changed details caught from 73.5% to 94.0%.', href: '/work/models' },
  { t: 'Video evals (video-rsi, ugc-factory-core)', d: 'A four-tier measurement suite for AI-generated video; its first 59-clip sweep caught 26 extra-speech failures that file checks missed.', href: '/work/video-evals' },
  { t: 'coding-agent-bench', d: '82 scored runs of local models and agent harnesses; found and fixed a grading bug that scored an answer 17/100 (the same answer, re-scored, got 97/100), and measured a 25 to 40 point harness effect on one model.', href: '/writing/local-agent-evaluations' },
  { t: 'Serving kits', d: 'Recipes for 100B+ open models on 2× RTX PRO 6000 and a Mac Studio: NVFP4/FP8, offload, MTP speculative decoding.', href: '/writing/local-model-performance-engineering' },
  { t: 'Confidential Research Platform', d: 'A local, encrypted AI assistant with private search, tested end to end with packet captures; 584 tests.', href: '/writing/private-local-ai-assistant' },
  { t: 'Shipped products', d: 'Decosa (decosa.ai: 86 AI tools on open models, each with published accuracy and a signed receipt per model call), Everdust (iPhone, iPad, Mac, Apple TV and Vision Pro; free TestFlight beta, App Store release pending), Create, ElmoSEO (live, paying customers), Cue, AutoTalent, Dr. Grey.', href: '/work' },
];

export default function Resume() {
  return <main id="main">
    <header className="wrap page-head rise">
      <p className="eyebrow lined">Résumé</p>
      <h1 className="h1-page" style={{ marginTop: 16 }}>Seth Pratt</h1>
      <p className="lead">Applied AI Product Leader · San Francisco · <a className="inline-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      <div className="actions" style={{ marginTop: 24 }}>
        <SmartLink className="btn btn-sm btn-secondary" href={LINKEDIN}>LinkedIn</SmartLink>
        <SmartLink className="btn btn-sm btn-secondary" href={GITHUB}>GitHub</SmartLink>
        {/* TODO(content): add a PDF version (public/resume.pdf) and link it here. Until then, plain text, not a button-shaped pill. */}
        <span className="tiny pending">PDF version coming</span>
      </div>
    </header>
    <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <div className="resume-grid">
        <h2>Summary</h2>
        <div className="prose"><p>Applied AI product leader, currently on NVIDIA’s GenAI platform, with a decade of product work at NVIDIA, Lyft, Intuit, Meta and Visa. Outside work I build and measure AI systems: open benchmarks for clinical scribes and coding agents, small verifier models trained on planted-error synthetic data, large open models served on workstation GPUs, and a small studio of AI agents across five machines.</p></div>
      </div>
      <div className="resume-grid">
        <h2>Experience</h2>
        <div>{career.map(c => <div className="job" key={c.company}>
          <div className="job-top"><h3>{c.company}</h3><span className="y">{c.years}</span></div>
          <p className="r">{c.role}</p>
          <p className="d">{c.detail}</p>
        </div>)}</div>
      </div>
      <div className="resume-grid">
        <h2>Independent work</h2>
        <div>{independent.map(i => <div className="job" key={i.t}>
          <div className="job-top"><h3><a className="inline-link" href={i.href}>{i.t}</a></h3></div>
          <p className="d">{i.d}</p>
        </div>)}</div>
      </div>
      <div className="resume-grid">
        <h2>Tools</h2>
        <div className="prose"><p>Evaluation: golden sets, LLM judges, claim-level verification, injected-error tests, paired bootstrap. Synthetic data and training: planted-error generators with exact labels, held-out splits by document or seed, encoder and vision-language fine-tunes. Models and serving: vLLM, MLX, NVFP4/FP8, LoRA, speculative decoding. Speech and video: Whisper, diarization, SyncNet, LTX, H3. Agents: Claude Code fleets, MCP. Simulation: CUDA, WebGL/WebXR, Metal.</p></div>
      </div>
      <div className="resume-grid">
        <h2>Education</h2>
        {/* TODO(content): confirm degree and year; UC Berkeley is from the public LinkedIn profile. */}
        <div className="prose"><p>University of California, Berkeley <span className="todo-flag">degree and year to confirm</span></p></div>
      </div>
    </section>
  </main>;
}
