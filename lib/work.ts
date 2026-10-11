// The Work index: every piece of evidence, filterable by topic. Self-contained (no runtime imports).
export type WorkTopic = 'Evals' | 'Agents' | 'Inference' | 'Products';
export type WorkLink = { label: string; href: string };
export type WorkItem = {
  slug: string; title: string; topics: WorkTopic[]; date: string; kicker: string;
  summary: string; chips: string[]; links: WorkLink[]; primary: string;
  status?: string; flagship?: boolean; note?: string;
};

export const workTopics: WorkTopic[] = ['Evals', 'Agents', 'Inference', 'Products'];

export const workItems: WorkItem[] = [
  {
    slug: 'scribe-bench', flagship: true, title: 'scribe-bench: when ROUGE goes up and the notes get worse', topics: ['Evals'], date: '2026-09', kicker: 'Flagship · Evals',
    summary: 'An open benchmark for ambient clinical documentation: seven speech recognizers, note generation, a LoRA fine-tune and a claim-level verifier, on open mock consultations.',
    chips: ['ROUGE-L +8.6', '+0.11 misattributions/note', 'verifier 98.7–99.6%'],
    primary: '/work/scribe-bench',
    links: [{ label: 'Case study', href: '/work/scribe-bench' }, { label: 'Code', href: 'https://github.com/sipratt-p/scribe-bench' }],
  },
  {
    slug: 'video-evals', title: 'When the lip-sync score picked the worse take', topics: ['Evals', 'Agents'], date: '2026-08', kicker: 'Evals · Video',
    summary: 'Measurement gates for AI-generated video: why ranking takes on SyncNet alone rewarded mouth noise, and the tiered suite that now checks every render.',
    chips: ['4 tiers · 54 checks', '26 of 59 clips: extra speech'],
    primary: '/work/video-evals',
    links: [{ label: 'Case study', href: '/work/video-evals' }, { label: 'Code', href: 'https://github.com/sipratt-p/video-rsi' }],
  },
  {
    slug: 'coding-agent-bench', title: 'coding-agent-bench', topics: ['Evals', 'Agents'], date: '2026-09', kicker: 'Evals · Agents',
    summary: '82 scored runs of local models and agent harnesses on a fixed task set, and the grading bugs that had to be fixed before any number meant anything.',
    chips: ['82 runs · task set v4', 'grading bug: 17 → 97/100'],
    primary: '/writing/local-agent-evaluations',
    links: [{ label: 'Notes', href: '/writing/local-agent-evaluations' }, { label: 'Code', href: 'https://github.com/sipratt-p/coding-agent-bench' }],
  },
  {
    slug: 'live-copilot', title: 'From benchmark to a live visit copilot', topics: ['Agents', 'Evals'], date: '2026-09', kicker: 'Agents · Evals',
    summary: 'The scribe-bench pipeline turned into a live copilot that listens to a visit, suggests questions, and drafts a cited note and EHR fields for review. Measured on synthetic visits only.',
    chips: ['speaker labels 99.71%', '0/419 wrong EHR fields', '~$0.07 per visit'],
    primary: '/work/scribe-bench#copilot',
    note: 'Synthetic visits only; no real patients.',
    links: [{ label: 'In the case study', href: '/work/scribe-bench#copilot' }, { label: 'Open copilot code', href: 'https://github.com/sipratt-p/scribe-bench' }],
  },
  {
    slug: 'serving-kits', title: 'Serving 100B+ open models on two workstation GPUs', topics: ['Inference'], date: '2026-09', kicker: 'Inference',
    summary: 'NVFP4 and FP8, expert offload and speculative decoding on 2× RTX PRO 6000 Blackwell and a Mac Studio, with the traps written down. Three public recipe repos.',
    chips: ['+38% decode with MTP', 'MTP depth 4: 113.9 → 242.5 tok/s'],
    primary: '/writing/local-model-performance-engineering',
    links: [{ label: 'Notes', href: '/writing/local-model-performance-engineering' }, { label: 'blackwell-serving-kit', href: 'https://github.com/sipratt-p/blackwell-serving-kit' }, { label: 'dsv4-flash-nvfp4-sm120', href: 'https://github.com/sipratt-p/dsv4-flash-nvfp4-sm120' }, { label: 'omlx-dualane-recipe', href: 'https://github.com/sipratt-p/omlx-dualane-recipe' }],
  },
  {
    slug: 'ai-playtesters', title: 'A game tuned by AI playtesters', topics: ['Agents', 'Evals'], date: '2026-10', kicker: 'Agents · Product',
    summary: 'A Handful, a VR physics game, went through 21 revisions scored each round by cold-play AI tester panels and scripted bots. The panel plateaued short of its target, and we say so.',
    chips: ['panel 5.11 → 7.72', 'target 8.5, not reached'],
    primary: '/lab/step-inside#a-handful',
    links: [{ label: 'In the Lab', href: '/lab/step-inside#a-handful' }, { label: 'Notes', href: '/writing/tuning-a-game-with-ai-playtesters' }],
  },
  {
    slug: 'refusal-ablation', title: 'Refusal ablation, measured', topics: ['Evals'], date: '2026-09', kicker: 'Evals · Model adaptation',
    summary: 'Refusal-direction ablation on a mixture-of-experts model with a matched benign set and a capability gate, plus an A/B of a community “abliterated” upload.',
    chips: ['refusals 10–11/12 → 0', 'coding 489/500, as base'],
    primary: '/writing/refusal-ablation-measured',
    links: [{ label: 'Notes', href: '/writing/refusal-ablation-measured' }, { label: 'Code', href: 'https://github.com/sipratt-p/refusal-ablation-eval' }],
  },
  {
    slug: 'confidential-research-platform', title: 'Confidential Research Platform', topics: ['Products', 'Evals'], date: '2026-09', kicker: 'Products · Privacy',
    summary: 'A local, encrypted AI assistant with private search over Tor or your own VPN, tested end to end from clean installs with packet captures.',
    chips: ['584 tests', '32-case model benchmark'],
    primary: '/writing/private-local-ai-assistant',
    links: [{ label: 'Notes', href: '/writing/private-local-ai-assistant' }, { label: 'Code', href: 'https://github.com/sipratt-p/confidential-research-platform' }],
  },
  {
    slug: 'cue', title: 'Cue', topics: ['Products'], date: '2026-09', kicker: 'Products · Audio ML',
    summary: 'A mixtape app for iPhone and an open engine that finds where each song starts inside a DJ mix, scored against DJ-published timestamps.',
    chips: ['99/190 starts within 10 s'],
    primary: '/work/cue',
    links: [{ label: 'Project', href: '/work/cue' }, { label: 'cue-engine', href: 'https://github.com/sipratt-p/cue-engine' }],
  },
  {
    slug: 'autotalent', title: 'AutoTalent', topics: ['Products', 'Agents'], date: '2026-09', kicker: 'Products · Agents',
    summary: 'Agentic recruiting: candidate search agents, MCP integrations, and workflows for outreach and pipeline management, with recruiters in control of decisions.',
    chips: ['web · CLI · MCP'],
    primary: '/work/autotalent',
    links: [{ label: 'Project', href: '/work/autotalent' }, { label: 'autotalent.ai', href: 'https://autotalent.ai' }, { label: 'Tuning notes', href: '/writing/tuning-autotalent' }],
  },
  {
    slug: 'drgrey-ai', title: 'Dr. Grey AI', topics: ['Products'], date: '2026-10', kicker: 'Products · Shipped',
    summary: 'An evidence-focused research tool for exploring supplements, clinical studies and health topics, with evidence grading.',
    chips: ['live', 'evidence grading'],
    primary: '/work/drgrey-ai',
    links: [{ label: 'Project', href: '/work/drgrey-ai' }, { label: 'drgrey.ai', href: 'https://drgrey.ai' }],
  },
  {
    slug: 'elmoseo', title: 'ElmoSEO', topics: ['Products'], date: '2026-10', kicker: 'Products · Shipped',
    summary: 'An SEO service for the age of AI search. Live, with paying customers.',
    chips: ['live · paying customers'],
    primary: 'https://elmoseo.com',
    links: [{ label: 'elmoseo.com', href: 'https://elmoseo.com' }],
  },
  {
    slug: 'everdust', title: 'Everdust', topics: ['Products'], date: '2026-10', kicker: 'Products · Shipped',
    summary: 'A physics-driven music visualizer and playground for Vision Pro, iPhone and Mac, where every world is a live simulation. The Lab pieces live here.',
    chips: ['App Store release pending'],
    primary: 'https://everdust.ai',
    links: [{ label: 'everdust.ai', href: 'https://everdust.ai' }, { label: 'The Lab', href: '/lab' }, { label: 'Notes', href: '/writing/one-sim-seven-platforms' }, { label: 'VR evals', href: '/writing/testing-a-vr-game' }],
  },
  {
    slug: 'create', title: 'Create', topics: ['Products', 'Agents'], date: '2026-10', kicker: 'Products · Agents',
    summary: 'Describe a world, get a playable simulation: a language model writes a recipe from registered physics primitives, and a validator checks it before it runs.',
    chips: ['20/20 playable in our eval', '~$0.29 per game'],
    primary: 'https://everdust.ai',
    links: [{ label: 'everdust.ai', href: 'https://everdust.ai' }, { label: 'Notes', href: '/writing/create-constrained-generation' }],
  },
];

/** The "Shipped" row on the home page. */
export const shipped = [
  { name: 'Everdust', status: 'App Store release pending', body: 'A physics-driven music visualizer and playground for Vision Pro, iPhone and Mac.', href: 'https://everdust.ai', linkLabel: 'everdust.ai' },
  { name: 'Create', status: '20/20 playable in our eval', body: 'Describe a world, get a playable simulation, for about $0.29 a game.', href: 'https://everdust.ai', linkLabel: 'everdust.ai' },
  { name: 'ElmoSEO', status: 'Live, with paying customers', body: 'An SEO service built for AI search.', href: 'https://elmoseo.com', linkLabel: 'elmoseo.com' },
  { name: 'Dr. Grey', status: 'Live', body: 'Pick a goal and see which supplements have the strongest research, in plain words.', href: 'https://drgrey.ai', linkLabel: 'drgrey.ai' },
  { name: 'Cue', status: 'iOS app + open engine', body: 'A mixtape app, and an open engine that finds where songs start in DJ mixes.', href: 'https://github.com/sipratt-p/cue-engine', linkLabel: 'cue-engine' },
] as const;
