// Results-first case studies for /work/<slug>. Every number below comes from a public file
// (scribe-bench paper/paper.md and RESULTS.md; video-rsi and ugc-factory-core READMEs and reports)
// or, where marked, from a private build measured on synthetic data only. Self-contained module.
export type CaseBlock =
  | { kind: 'p'; text: string }
  | { kind: 'bullets'; items: string[] }
  | { kind: 'steps'; label: string; items: string[] }
  | { kind: 'table'; caption: string; note?: string; headers: string[]; rows: string[][]; highlight?: number[]; textual?: boolean }
  | { kind: 'deltas'; title: string; legend: [string, string]; rows: { label: string; value: number; lo: number; hi: number; good: boolean; fmt: string }[]; min: number; max: number; caption: string; callouts: { k: string; v: string }[] }
  | { kind: 'stats'; items: { n: string; label: string }[]; note?: string }
  | { kind: 'copilot' };
export type CaseSection = { id: string; title: string; blocks: CaseBlock[] };
export type CaseStudy = {
  slug: string; crumb: string; h1: [string, string, string]; seoTitle: string; description: string;
  subtitle: string[]; published: string; readMinutes: number; findings: string[];
  meta: { label: string; value: string; href?: string }[];
  sections: CaseSection[];
  related: { label: string; sub: string; href: string }[];
  sources: { label: string; href: string }[];
  cta: string;
};

const SB = 'https://github.com/sipratt-p/scribe-bench';
const VR = 'https://github.com/sipratt-p/video-rsi';
const UF = 'https://github.com/sipratt-p/ugc-factory-core';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'scribe-bench', crumb: 'Evals',
    h1: ['When ROUGE goes up and the notes ', 'get worse', ''],
    seoTitle: 'scribe-bench: When ROUGE Goes Up and Clinical Notes Get Worse',
    description: 'scribe-bench, an open benchmark for ambient clinical documentation: a LoRA fine-tune raised ROUGE-L by 8.6 points while misattributions rose and follow-up recall fell; a claim verifier caught 98.7–99.6% of injected errors.',
    subtitle: ['scribe-bench', 'an open benchmark for ambient clinical documentation', 'Sep 2026', '9 min read'],
    published: '2026-09-16', readMinutes: 9,
    findings: [
      'A one-epoch LoRA raised ROUGE-L by 8.6 points [7.2, 10.0] on 120 ACI-Bench encounters, while misattributions rose by 0.11 per note and follow-up recall fell from 97.4% to 92.9%.',
      'Across seven open speech recognizers, word error rate alone hid how many medical terms each one dropped. The best, MOSS-TD 0.9B, missed 8.4% of medical terms [7.1, 9.7] at a 10.3% word error rate.',
      'An overnight search over 131 pipeline variants reported +4.2 on held-out visits. On the writer’s official weights the gain was +1.3 [−3.8, +6.2], and plan recall became a measurable loss.',
      'A claim-level verifier caught 98.7–99.6% of deliberately injected errors across three splits (2,764 claims), measured on synthetic corruptions only.',
    ],
    meta: [
      { label: 'Data', value: 'PriMock57 · ACI-Bench · MTS-Dialog · a 7,092-term lexicon' },
      { label: 'Systems', value: '7 speech recognizers · LoRA · claim verifier · search loop' },
      { label: 'Code', value: 'scribe-bench, MIT', href: SB },
      { label: 'Status', value: 'Public · paper draft, Sep 2026' },
    ],
    sections: [
      { id: 'question', title: 'The question', blocks: [
        { kind: 'p', text: 'Ambient scribes are judged on the finished note, but the note inherits every upstream error: a dropped medication name, a line credited to the wrong speaker, a follow-up instruction that never reached the summary. I wanted to know which stage of an open pipeline actually hurts the note, and whether the metrics teams usually report would notice.' },
        { kind: 'p', text: 'scribe-bench is a non-commercial study built on public data to learn the domain. It isn’t a product, and nothing in it is clinical advice.' },
      ] },
      { id: 'setup', title: 'The setup', blocks: [
        { kind: 'p', text: 'Transcription is scored on the 57 recorded mock primary-care consultations in PriMock57. Notes are scored on ACI-Bench encounters, with a 7,092-term primary-care lexicon for medical terms. The writer is Qwen3.8-27B; the fine-tune is one epoch of LoRA on 2,804 open transcript-and-note pairs. Each stage is scored on held-out data before the next stage uses its output.' },
        { kind: 'steps', label: 'The study pipeline', items: ['Transcribe and label speakers', 'Score the transcript', 'Write the note', 'Verify each claim', 'Keep only what holds on held-out'] },
      ] },
      { id: 'scorers', title: 'How the scorers work', blocks: [
        { kind: 'p', text: 'Overlap metrics such as ROUGE-L compare a draft with a reference note. Beside them sit the dimensions clinicians care about: lexicon term recall and precision, plan-item recall, misattributions per note (a claim credited to the wrong speaker), follow-up recall, and grounding, meaning whether each sentence is supported by the transcript. The judged dimensions use LLM judges.' },
        { kind: 'p', text: 'Every comparison is a paired bootstrap over encounters with a 95% interval, so a difference counts only when its interval excludes zero. The verifier is tested by injecting known errors into otherwise correct notes: negations, changed numbers, swapped drugs, fabricated findings and third-party leaks.' },
      ] },
      { id: 'speech', title: 'Speech recognition: same accuracy, different terms', blocks: [
        { kind: 'p', text: 'Seven open speech recognizers transcribed the same 57 recordings. Word error rate would rank the usable ones as nearly equal; the share of medical terms they missed did not, so for a scribe the term-miss rate is the number to watch. The best, MOSS-TD 0.9B, had a 10.3% word error rate, missed 8.4% of 1,741 lexicon terms [7.1, 9.7] and had an 11.4% diarization error with a 250 ms collar.' },
      ] },
      { id: 'finetune', title: 'The fine-tune that won every overlap metric', blocks: [
        { kind: 'p', text: 'One epoch of LoRA lifted ROUGE-L by 8.6 points, the kind of result that gets announced. Judged on the clinician dimensions, the same notes got worse: more claims credited to the wrong speaker, and fewer follow-up instructions carried into the note. Every interval excludes zero.' },
        { kind: 'deltas', title: 'LoRA minus base, 120 ACI-Bench encounters', legend: ['looks better', 'is worse'], min: -10, max: 14, rows: [
          { label: 'Term precision', value: 10.2, lo: 7.9, hi: 12.6, good: true, fmt: '+10.2' },
          { label: 'ROUGE-L', value: 8.6, lo: 7.2, hi: 10.0, good: true, fmt: '+8.6' },
          { label: 'Term recall', value: 4.8, lo: 2.9, hi: 6.6, good: true, fmt: '+4.8' },
          { label: 'Follow-up recall', value: -4.5, lo: -7.3, hi: -2.0, good: false, fmt: '−4.5' },
        ], caption: 'Points, paired-bootstrap mean with 95% interval (whiskers). From the paper draft, Table 5.', callouts: [
          { k: 'Misattributions per note', v: '+0.11 [0.04, 0.18]' },
          { k: 'Follow-up recall', v: '97.4% → 92.9%' },
          { k: 'Sentences with citations', v: '99.6% → 9–16%' },
        ] },
        { kind: 'p', text: 'The fine-tune also erased citations: the training targets carried none, so the tuned writer stopped citing the transcript at all.' },
      ] },
      { id: 'search', title: 'An overnight search, and what the gate couldn’t see', blocks: [
        { kind: 'p', text: 'An autoresearch loop tried 131 pipeline variants overnight: recognizer, speaker mapping, prompts, citations, a verifier gate and the writer model. A change had to hold on 20 development visits, then beat the best score on 37 held-out visits, then survive a second judge. Five changes were accepted, and ten development gains failed on held-out.' },
        { kind: 'p', text: 'The loop reported +4.2 on held-out visits. Re-run with the writer’s official release weights instead of the community build the search had used, the gain shrank to +1.3 [−3.8, +6.2], and two losses became measurable. Roughly three of the four points belonged to the modified build, not the pipeline.' },
        { kind: 'table', caption: 'Search best minus untuned baseline, 37 held-out visits, official weights', note: 'Judge 1; paired bootstrap 95% CI. From the paper draft, Table 2.', headers: ['Metric', 'Difference', 'Baseline → best'], rows: [
          ['Term precision', '+2.5 [0.5, 4.5]', '—'],
          ['ROUGE-L', '+1.5 [0.3, 2.6]', '21.8 → 23.2'],
          ['Composite score', '+1.3 [−3.8, 6.2]', '41.0 → 42.3'],
          ['Grounded sentences', '−3.4 [−6.6, −0.2]', '88.6% → 85.2%'],
          ['Plan recall', '−8.1 [−13.8, −1.7]', '80.8% → 72.7%'],
        ], highlight: [3, 4] },
        { kind: 'p', text: 'The search also rejected citations eight times, because its objective had no verifiability term and citations cost about a point of ROUGE-L. Re-scored with grounding, the cited configuration beats the uncited best by +6.1 grounded [+3.2, +8.9]. A score without the trust dimension removes the trust feature.' },
      ] },
      { id: 'verifier', title: 'A verifier, tested on errors we planted', blocks: [
        { kind: 'p', text: 'The claim verifier, Gemma 4 26B-A4B, checks each claim in a note against the transcript. It was measured by planting known errors in correct notes on three ACI-Bench test splits.' },
        { kind: 'table', caption: 'Claim verifier on injected errors', note: 'Flags on clean claims are false positives. From RESULTS.md.', headers: ['Split', 'Claims', 'Injected', 'Recall', 'Clean flagged'], rows: [
          ['ACI test 1', '905', '232', '98.7%', '5.5%'],
          ['ACI test 2', '968', '247', '99.6%', '3.5%'],
          ['ACI test 3', '891', '229', '98.7%', '4.4%'],
        ] },
        { kind: 'p', text: 'By type, negations were the hardest to catch (85–93%); fabricated findings and third-party leaks were caught 99–100% of the time. The catch is in the setup: these are synthetic corruptions. How many of a model’s own, natural errors the verifier catches is unmeasured.' },
      ] },
      { id: 'copilot', title: 'From benchmark to a live visit copilot', blocks: [
        { kind: 'p', text: 'The same pipeline runs live. The repo includes a copilot that streams the microphone to a self-hosted realtime recognizer and shows, as the visit unfolds, the next question to ask and questions drawn from guideline lookups.' },
        { kind: 'copilot' },
        { kind: 'p', text: 'I later built it out into a fuller private prototype that also drafts a cited note and EHR fields, and stops before anything is signed. It has been measured on synthetic visits only, with no real patients:' },
        { kind: 'stats', items: [
          { n: '99.71%', label: 'speaker labels correct' },
          { n: '289 / 308', label: 'note sentences supported by the transcript' },
          { n: '14 / 15', label: 'held-out “don’t miss” reminders raised' },
          { n: '0 / 419', label: 'wrong values in EHR draft fields' },
          { n: '~$0.07', label: 'model cost per visit' },
        ], note: 'Synthetic visits only. These numbers come from the private build and are not in the public repo.' },
      ] },
      { id: 'missed', title: 'What the metric missed', blocks: [
        { kind: 'p', text: 'ROUGE-L rewards notes that read like the reference. The fine-tune learned the reference style, so overlap rose while attribution and follow-ups slipped and citations vanished. A dashboard tracking overlap alone would have shipped it, and an optimizer scored on overlap removed a trust feature on its own.' },
        { kind: 'p', text: 'The judges have limits too. Two judges rank notes alike (ρ = 0.80) but disagree on the sign of the official-weights difference, and four judges could not agree on who said what: pairwise κ from −0.02 to +0.29, with no note flagged by all four. These evaluations are good for ordering pipelines and catching objective failures, and unsafe as absolute quality claims without clinician calibration.' },
      ] },
      { id: 'limits', title: 'Limits', blocks: [
        { kind: 'bullets', items: [
          'Mock UK primary-care consultations: 57 recordings, cleaner than clinic audio, with terse reference notes and no chart context.',
          'No clinician has read any note, and the judges are not calibrated against clinicians.',
          'The search ran on a community-modified writer build; the official-weights re-run is the number to trust.',
          'Verifier recall is on injected errors only. The live view was evaluated as a replay.',
          'Fairness groups are small (3–26 encounters). A quarter of reference plan items were never spoken in the visit.',
        ] },
      ] },
      { id: 'next', title: 'What I’d do next', blocks: [
        { kind: 'bullets', items: [
          'Calibrate the judges against clinician-labelled misattributions on a small set of real audio.',
          'Score completeness against what was actually said, and put a verifiability term in every objective.',
          'Train against attribution errors directly, then rerun the fine-tune.',
          'Measure the verifier on models’ own mistakes, not only on planted ones.',
        ] },
      ] },
    ],
    related: [
      { label: 'The long-form note', sub: 'every result, with the run history', href: '/writing/ambient-clinical-documentation-open-weights' },
      { label: 'Video evals', sub: 'when the lip-sync score picked the worse take', href: '/work/video-evals' },
      { label: 'coding-agent-bench', sub: '82 scored runs, and the grading bugs', href: '/writing/local-agent-evaluations' },
    ],
    sources: [
      { label: 'scribe-bench repository', href: SB },
      { label: 'RESULTS.md', href: `${SB}/blob/main/RESULTS.md` },
      { label: 'Paper draft (paper/paper.md)', href: `${SB}/blob/main/paper/paper.md` },
      { label: 'Live copilot (demo/livemic.py)', href: `${SB}/blob/main/demo/livemic.py` },
    ],
    cta: 'Questions about this work? Get in touch.',
  },
  {
    slug: 'video-evals', crumb: 'Evals',
    h1: ['When the lip-sync score picked the ', 'worse', ' take'],
    seoTitle: 'Video Evals: When the Lip-Sync Score Picked the Worse Take',
    description: 'Measurement gates for AI-generated video: why ranking takes on SyncNet alone rewarded mouth noise, which image generators lip-sync, and a four-tier suite whose first 59-clip sweep caught 26 extra-speech failures.',
    subtitle: ['video-rsi + ugc-factory-core', 'measurement gates for AI-generated video', 'Aug 2026', '6 min read'],
    published: '2026-08-15', readMinutes: 6,
    findings: [
      'A higher lip-sync score can pick a worse take. SyncNet measures whether the mouth matches the audio, not whether the audio is clean, so ranking regenerated takes on it alone can reward mouth noise.',
      'The evaluator needed evaluating too: an older correlation metric scored 0.77 on a segment SyncNet rated POOR, and 0.36 on one it rated FAIR.',
      'Of the AI image generators tested, only Qwen-Image-2512 gave faces that lip-synced under LTX-2.3. Two such characters each cleared the gate on 12 of 14 segments with a synthetic voice.',
      'A four-tier suite now checks every render. Its first sweep passed all 59 clips on every file check and still flagged 26 for extra speech.',
    ],
    meta: [
      { label: 'Data', value: 'Our own generated characters · a 59-clip story corpus' },
      { label: 'Systems', value: 'LTX-2.3 · MiniMax H3 · SyncNet · Whisper · ECAPA · a VLM judge' },
      { label: 'Code', value: 'video-rsi · ugc-factory-core, MIT', href: VR },
      { label: 'Status', value: 'Public · suite runs on every render' },
    ],
    sections: [
      { id: 'question', title: 'The question', blocks: [
        { kind: 'p', text: 'Generative video pipelines make many takes and something has to choose between them. When the choice is automated, the score that does the choosing becomes the product’s taste. I wanted to know whether the scores I was using could be trusted to pick, and what to check when they can’t.' },
        { kind: 'steps', label: 'The pipeline as it runs now', items: ['Lint the script', 'Generate takes from separate seeds', 'Gate on lip sync + transcript', 'Rank on more than lip sync', 'Keep every candidate'] },
      ] },
      { id: 'best-of', title: 'How best-of-N went wrong', blocks: [
        { kind: 'p', text: 'The talking-head pipeline renders each segment with LTX-2.3, which generates picture and audio together. A best-of-N mode renders several takes from separate seed banks and keeps the winner, ranked by gate status, then SyncNet label, then raw SyncNet confidence (LSE-C).' },
        { kind: 'p', text: 'That ranking has a blind spot. Each take gets a freshly generated audio track, and SyncNet only measures whether mouth movement matches that audio. Mouth noise, such as lip smacks, moves with the mouth, so it can raise the match. In a two-take run, the higher-scoring takes brought back lip smacking that the single-take version didn’t have. Ranking by the GOOD/FAIR label first didn’t fix it: a smacky take can still be labelled GOOD.' },
        { kind: 'p', text: 'The fix was cheap because every candidate stayed on disk: the bad picks were swapped back by reassembling with ffmpeg, with no regeneration. The lasting response is a separate check for mouth noise, now part of the video-rsi suite. A ranking penalty for it in the LTX pipeline is still pending.' },
      ] },
      { id: 'metric', title: 'The evaluator needs evaluating', blocks: [
        { kind: 'p', text: 'Before SyncNet, the gate used a simple correlation between mouth opening and audio energy. It lied. One segment scored 0.770 and another 0.692, and SyncNet rated both POOR; a segment scoring 0.361 was rated FAIR. The gate now relies on SyncNet labels and rejects a POOR label, a transcript word error rate above 0.4, truncation and ghost echo.' },
        { kind: 'table', caption: 'SyncNet labels used by the gate', note: 'From factory/score_sync.py in ugc-factory-core.', headers: ['Label', 'LSE-C (confidence)', 'LSE-D (distance)'], rows: [
          ['GOOD', 'above 5', 'below 7'],
          ['FAIR', 'above 3', 'below 8'],
          ['MEDIOCRE', 'above 1.5', 'below 10'],
          ['POOR', 'anything else', '—'],
        ] },
      ] },
      { id: 'faces', title: 'Which faces can talk', blocks: [
        { kind: 'p', text: 'Lip sync depends on the reference image more than I expected. Of the AI image generators I tested, only Qwen-Image-2512 produced faces that lip-synced under LTX-2.3. A face from Gemini’s image model blinked and moved but never formed speech. Two characters made with Qwen-Image-2512, Elena and Sophia, each passed the gate on 12 of 14 segments with a synthetic text-to-speech voice, at average LSE-C of about 4.8 and 6.8.' },
        { kind: 'p', text: 'The scripts mattered as much as the faces. These rules came out of failed takes and are now lint checks:' },
        { kind: 'bullets', items: [
          'About seven words per segment at 129 frames; longer lines run out of time.',
          'Periods stop the speech; ellipses make it run on. Several sentences in one segment freeze the lips.',
          'Negations leak into speech: a prompt that says “no X” can make the character say “not”.',
          'Re-encoding a finished segment can break its lip sync; assemble without dissolves.',
          'Brand names inflate word error rate: “AutoTalent” transcribed as “Auto Talent” scores 50%.',
        ] },
      ] },
      { id: 'suite', title: 'A tiered suite on every render', blocks: [
        { kind: 'p', text: 'video-rsi turns those lessons into four tiers, cheapest first. A hook runs it after every render and writes a sidecar file with the gate result; drivers only continue when the gate is clean. Rerolls get three attempts, worst first, and the same failure twice is treated as a recipe bug rather than bad luck.' },
        { kind: 'table', textual: true, caption: 'video-rsi tiers', note: 'Counts from the harness code and README.', headers: ['Tier', 'When', 'Checks', 'What it catches'], rows: [
          ['−1 · Spec lint', 'before generating', '22 rules, 9 hard blocks', 'bad prompts, negations in dialogue, overlong lines'],
          ['0 · File checks', 'after render', '13 ffmpeg/numpy checks', 'corrupt files, A/V drift, black or frozen frames, missing cuts, loudness, flicker, seams'],
          ['1 · Speech', 'after render', '10 checks', 'script coverage, extra speech, prompt echo, language, names, voice, mouth-noise clicks, hiss'],
          ['2 · VLM judge', 'after render', '9 verdicts', 'binary visual questions with a fixed JSON schema'],
        ] },
        { kind: 'p', text: 'The mouth-noise check looks for bursts above 4 kHz, shorter than 60 ms, outside speech: three is a warning and eight is a failure. It exists because SyncNet can’t hear them.' },
      ] },
      { id: 'sweep', title: 'The first sweep', blocks: [
        { kind: 'p', text: 'The first full sweep ran the suite over 59 clips from an earlier story corpus. Every clip passed every file check. The speech tier told a different story.' },
        { kind: 'stats', items: [
          { n: '59 / 59', label: 'passed container, black-frame, freeze, clipping and resolution checks' },
          { n: '26', label: 'clips failed for extra speech (8 more warned)' },
          { n: '13', label: 'clips failed for prompt echo (15 more warned)' },
          { n: '~35%', label: 'of scripted shot cuts missing, per the run notes' },
        ], note: 'Flags may overlap; adding them doesn’t give a count of unique failed clips.' },
        { kind: 'p', text: 'The whole corpus took 38 seconds for file checks, 196 seconds for speech and 855 seconds for the VLM judge. One failure was in the harness itself: an offline-mode setting made the speech checks skip silently while file checks still passed, until a human listened.' },
      ] },
      { id: 'limits', title: 'Limits', blocks: [
        { kind: 'bullets', items: [
          'The voice-similarity and VLM thresholds are uncalibrated; a labelled calibration set is the next step.',
          'Cut detection may miss soft cuts, so the missing-cut share is approximate.',
          'The sweep covers one historical corpus. These are check-level flags, not a general failure rate for any model.',
          'The mouth-noise penalty isn’t yet part of take ranking in the LTX pipeline.',
        ] },
      ] },
      { id: 'next', title: 'What I’d do next', blocks: [
        { kind: 'bullets', items: [
          'Label a 100-clip set by hand and calibrate every threshold against it.',
          'Add the mouth-noise score to take ranking, so best-of-N optimises for what a listener hears.',
          'Port SyncNet into the suite as a tier, so lip sync and mouth noise are judged side by side.',
        ] },
      ] },
    ],
    related: [
      { label: 'scribe-bench', sub: 'when ROUGE goes up and the notes get worse', href: '/work/scribe-bench' },
      { label: 'The long-form video note', sub: 'every check and its caveats', href: '/writing/evaluating-agentic-video' },
      { label: 'coding-agent-bench', sub: 'the same habit, on coding agents', href: '/writing/local-agent-evaluations' },
    ],
    sources: [
      { label: 'video-rsi repository', href: VR },
      { label: 'video-rsi README (tiers and checks)', href: `${VR}/blob/main/README.md` },
      { label: 'First-sweep summary (reports/summary.md)', href: `${VR}/blob/main/reports/summary.md` },
      { label: 'ugc-factory-core repository', href: UF },
      { label: 'SyncNet scorer (factory/score_sync.py)', href: `${UF}/blob/main/factory/score_sync.py` },
    ],
    cta: 'Questions about this work? Get in touch.',
  },
];
