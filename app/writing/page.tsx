import { pageMetadata, breadcrumbs } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
import WorkFilter from '@/components/portfolio/work-filter';
import { notes } from '@/lib/editorial';
import { published } from '@/components/portfolio/editorial-page';

export const metadata = pageMetadata('/writing', 'Writing: Notes on Evals, Agents, Inference and the Lab', 'Dated notes by Seth Pratt with real numbers and real failures: clinical-scribe and coding-agent evaluations, video evals, local inference, refusal ablation, privacy testing and strange attractors.');

/** The single most surprising measured result per note, for the list. Falls back to the summary. */
const rowFinding: Record<string, string> = {
  'tuning-autotalent': 'Guessed company filters were removing the best candidates: filtered searches qualified about 2 percent, unfiltered ones 18 percent.',
  'testing-a-vr-game': 'Every build passed its bots (40 of 40 feature checks, 0 stuck), and about 30 of the 30 issues found in the headset had escaped every eval.',
  'autoresearch-at-home': 'Two small models searching together marked their answer verified on 40 of 40 maths problems; 16 of those answers were wrong.',
  'running-a-team-of-ai-agents': 'One weekly usage limit stopped 18 agents at once; across 21 days, quota ran out before compute or ideas did.',
  'when-the-metric-says-yes': 'A nebula look-dev scored 0.74 on shape overlap with the photo and still looked like a sock puppet.',
  'one-sim-seven-platforms': 'Four interactive nebulas went from WebGL to native Metal and Swift in 81 minutes, with zero invalid particles in the tests.',
  'tuning-a-game-with-ai-playtesters': 'AI testers called the auto-locking throw the best design in the game; a noisy bot and my first headset play found it too easy.',
  'create-constrained-generation': 'All 20 games generated in the eval were proven winnable and losable before anyone played them, at $0.29 median each.',
  'watching-a-language-model-think': 'A 3-D map of a model’s vocabulary kept 43% of each word’s true neighbours, and raw attention’s favourite word was never the one that mattered.',
  'chaos-with-nothing-to-orbit': 'A 7-term strange attractor with no fixed points at all, and an earlier “discovery” we had to retract.',
  'private-local-ai-assistant': 'The earlier build passed hundreds of unit tests while its Tor mode fetched pages from the real IP address.',
  'refusal-ablation-measured': 'Leaving the token embedding unedited kept the coding suite at 489/500; the original recipe’s embedding edit dropped it to 400/500.',
  'finding-song-starts-in-dj-mixes': 'Median song-start error was 3 seconds on hardstyle but 39 seconds on peak-time house, against DJ-published timestamps.',
  'ambient-clinical-documentation-open-weights': 'A LoRA fine-tune lifted ROUGE-L by 8.6 points while speaker misattributions doubled to tripled.',
  'local-model-performance-engineering': 'Direct cross-GPU copies mismatched in all 20 recorded trials while the driver reported peer access as available.',
  'local-agent-evaluations': 'The same final answer scored 17/100, then 97/100 after the extractor was fixed; the model hadn’t changed.',
  'evaluating-agentic-video': 'All 59 clips passed basic integrity checks, yet 26 were flagged for extraneous speech and 13 for prompt echo.',
  'creative-ai-tools-autoresearch': 'An early audio-quality heuristic didn’t distinguish an improvement listening made apparent; the evaluator itself needed evaluation.',
};
const fmt = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export default function Writing() {
  const list = [...notes].sort((a, b) => published(b).localeCompare(published(a)) || a.title.localeCompare(b.title));
  const topics = ['Evals', 'Agents', 'Inference', 'Products', 'Lab', 'Creative'];
  const counts = Object.fromEntries(topics.map(t => [t, notes.filter(n => n.topics?.includes(t as never)).length]));
  return <main id="main">
    <JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Writing', path: '/writing' }])}/>
    <div className="hero-band">
      <header className="wrap page-head rise">
        <p className="eyebrow lined">Writing</p>
        <h1 className="h1-page" style={{ marginTop: 16 }}>Notes with the <em>numbers</em> left in.</h1>
        <p className="lead">What I measured, what broke, and what I’d check next. Each note is dated and links to the files behind it. <a className="inline-link" href="/how-i-write">How I write these</a>.</p>
      </header>
    </div>
    <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <WorkFilter topics={topics} counts={counts} total={notes.length} label="Filter writing by topic"/>
      <ol className="writing-list">
        {list.map(n => <li key={n.slug} className="note-row" data-topics={(n.topics ?? []).join(' ')}>
          <time dateTime={published(n)}>{fmt(published(n))}</time>
          <div><a className="post-title" href={`/writing/${n.slug}`}>{n.title}</a><p className="post-find">{rowFinding[n.slug] ?? n.summary}</p></div>
          <span className="tags">{(n.topics ?? []).map(t => <span key={t} className={'tag' + (t === 'Lab' ? ' tag-lab' : t === 'Evals' ? ' tag-accent' : '')}>{t}</span>)}</span>
        </li>)}
      </ol>
    </section>
  </main>;
}
