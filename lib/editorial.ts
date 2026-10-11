export type ReadingLink = { label: string; href: string };
export type Section = {
  id: string; title: string; paragraphs: string[]; bullets?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  links?: ReadingLink[];
  film?: {title:string;poster:string;src?:string;chunks?:string[];bytes?:number;width:number;height:number;filename?:string};
  audio?: {title:string;src:string}; interactive?: boolean;
  /** A still figure inside the section (public-safe, under public/media). */
  image?: {src:string;alt:string;caption:string;width:number;height:number};
  /** Equations or short code, rendered as monospace lines. */
  equations?: string[];
  /** A live figure (components/portfolio/llmt), rendered after the paragraphs. */
  figure?: FigureId;
  /** Paragraphs rendered below the figure or table. */
  after?: string[];
  /** One-sentence takeaway shown at the end of the section. */
  takeaway?: string;
  /** Kicker for the takeaway (default "Takeaway"), e.g. "Lesson learned". */
  takeawayLabel?: string;
  /** A short silent loop from one of our real-data films: at the top of the section, or after its text. */
  loop?: LoopMeta; loopEnd?: LoopMeta;
};
/** A silent, seamless loop in public/media/writing/llm-thought/loops/<id>.mp4 (+ .webp poster, .flashgate.json). */
export type LoopMeta = { id: string; title: string; caption: string; alt: string; width: number; height: number; seconds: number };
export type FigureId = 'guess' | 'map' | 'river' | 'attention' | 'forking' | 'search' | 'longctx';
export type Topic = 'Evals' | 'Agents' | 'Inference' | 'Products' | 'Lab' | 'Creative';
export type Editorial = {
  slug: string; type: 'project' | 'note'; title: string; seoTitle: string;
  category: string; description: string; summary?: string; lede: string; takeaway: string;
  facts: { label: string; value: string }[];
  workflow: string[]; workflowLabel: string;
  featureImage?: {src:string;alt:string;caption:string;width:number;height:number};
  /** A silent loop shown full width under the central idea. */
  heroLoop?: LoopMeta;
  sourceTitle?: string; disclosure?: string;
  prepared?: string; updated?: string;
  /** When the underlying work happened (ISO dates). `end` is the sort and publication date; `label` overrides the displayed range. */
  work?: { start: string; end: string; label?: string };
  sections: Section[]; basis: string; limitations: string;
  related: ReadingLink[]; product?: { name: string; url: string; description: string };
  /** "What I found": 3–5 measured bullets shown before the body. */
  findings?: string[];
  /** Writing index filters. */
  topics?: Topic[];
};
export const independentProjects: Editorial[] = [
  {
    slug: 'autotalent', type: 'project', work: { start: '2026-03-20', end: '2026-08-31', label: 'March–August 2026' }, topics: ["Products", "Agents"], title: 'AutoTalent: agentic recruiting.',
    seoTitle: 'AutoTalent — Agentic Recruiting, Search Agents & MCP', category: 'Independent product / Agentic recruiting',
    description: 'Seth Pratt’s AutoTalent project: agentic recruiting with candidate search agents, MCP integrations, recruiter review, outreach, and pipeline workflows.',
    lede: 'Recruiting isn’t one search. It is a sequence of decisions: understand the role, find people, check the evidence, and decide what to do next. AutoTalent brings search agents and MCP-connected tools into that workflow, while keeping recruiters in control of decisions.',
    takeaway: 'The useful unit of automation is a reviewable recruiting workflow—not a list of names or an agent with unlimited permission to act.',
    facts: [{ label: 'My role', value: 'Independent builder & product direction' }, { label: 'Focus', value: 'Search agents → recruiter review' }, { label: 'Interfaces', value: 'Web, CLI & MCP' }],
    workflowLabel: 'Publicly documented product workflow · simplified, not an infrastructure diagram',
    workflow: ['Define a role', 'Search agents discover candidates', 'Review & approve', 'Prepare outreach', 'Track the pipeline'],
    sections: [
      { id: 'problem', title: 'The product problem', paragraphs: [
        'A recruiter needs more than a plausible match. They need to know why someone appeared, what is actually supported by that person’s history, and which step still needs judgment. Moving between search, candidate records, messaging, and pipeline tracking makes that context easy to lose.',
        'My interest is in joining those steps without hiding the decision. The role should remain the organizing context, rather than forcing the recruiter to reconstruct it every time a new tool is opened.'
      ] },
      { id: 'workflow', title: 'Search agents, MCP, and the next action', paragraphs: [
        'Search agents handle candidate discovery around a role. Model Context Protocol (MCP) integrations let compatible AI assistants use recruiting tools, while the web app and CLI provide other ways to work with the product. Agentic recruiting is about connecting those tools into a useful workflow, not just adding a chat box.',
        'AutoTalent’s public documentation covers requisitions, candidate search and review, outreach, and pipeline operations. The CLI and MCP interfaces make those operations accessible through agent tools rather than only through a graphical interface.',
        'That interface matters to the product design. A candidate is not just an answer in a conversation: it is a record that can be reviewed, approved or rejected, and used in a subsequent step. Publicly documented actions include pausing and resuming requisitions and approving or rejecting candidates.'
      ], links: [{ label: 'Read AutoTalent’s recruiting-agent documentation', href: 'https://autotalent.ai/docs' }, { label: 'Explore AutoTalent’s CLI and MCP interface', href: 'https://autotalent.ai/cli' }] },
      { id: 'evidence', title: 'What sourcing experiments taught me', paragraphs: [
        'In a separate recruiting-data pilot, the search result’s headline was not reliable evidence of current or past employment. The reusable lesson was to keep discovery separate from verification, preserve source context, and avoid treating a lightly parsed profile as ground truth.',
        'This is adjacent research that informs how I think about AutoTalent—not a claim that the pilot is a shipped AutoTalent integration. Candidate information also needs appropriate access, freshness checks, and privacy controls. More collected data is not automatically a better recruiting product.'
      ] },
      { id: 'decisions', title: 'The decisions I care about', paragraphs: ['I evaluate the experience around a few concrete questions:'], bullets: [
        'Can the recruiter inspect the evidence behind a recommendation?',
        'Is the difference between a discovered candidate and an approved candidate unambiguous?',
        'Are consequential actions, especially sending outreach, scoped and reviewable?',
        'Can a paused workflow continue without losing the role and candidate context?'
      ] },
      { id: 'outcomes', title: 'What exists—and what I am not claiming', paragraphs: [
        'The agentic recruiting product and its public CLI/MCP documentation are available to explore. That is the concrete output of this project overview. I am not presenting a measured reduction in time-to-hire, hiring quality uplift, or customer adoption here; those need a defined dataset and a real evaluation, not a marketing estimate.',
        'The connection to my local AI work is the operating model: bounded tasks, explicit state, inspectable evidence, and a person who can intervene. Recruiting makes the need for those boundaries especially clear.'
      ] }
    ],
    basis: 'Prepared September 5, 2026 from AutoTalent’s public product, CLI and documentation pages, and my August 2026 recruiting-pipeline wiki. Search-agent and MCP scope confirmed September 6, 2026. The sourcing pilot is separate from the product.',
    limitations: 'Independent project, not employer work. Product documentation describes capabilities, not independently verified hiring outcomes. This overview does not reproduce candidate records or private sourcing data.',
    related: [ { label: 'How we tuned it: what we measured and what moved', href: '/writing/tuning-autotalent' },{ label: 'How I design long-running agents', href: '/writing/long-running-ai-agents' }, { label: 'Dr. Grey: a different problem of evidence and trust', href: '/work/drgrey-ai' }],
    product: { name: 'AutoTalent', url: 'https://autotalent.ai', description: 'Explore AutoTalent’s search agents, MCP integrations, and recruiting workflows.' }
  },
  {
    slug: 'drgrey-ai', type: 'project', work: { start: '2026-01-31', end: '2026-08-20' }, topics: ["Products"], title: 'Dr. Grey: making research easier to inspect.',
    seoTitle: 'Dr. Grey AI — Building an Evidence Research Product', category: 'Independent product / Research tools',
    description: 'The product and engineering thinking behind Dr. Grey AI: research discovery, source-linked evidence, consistent data, and clear limits.',
    lede: 'Dr. Grey is my research-discovery project. The product challenge is to make a complicated body of evidence navigable without making uncertainty disappear along the way.',
    takeaway: 'A useful research interface should make it easier to question an answer, not merely easier to read one.',
    facts: [{ label: 'My role', value: 'Independent builder & product direction' }, { label: 'Focus', value: 'Research discovery & evidence presentation' }, { label: 'Scope', value: 'Educational information, not clinical advice' }],
    workflowLabel: 'Reader journey · simplified from the public product, not a clinical decision pathway',
    workflow: ['Find a topic', 'Explore outcomes', 'Inspect evidence', 'Follow the citation', 'Read the limitations'],
    sections: [
      { id: 'problem', title: 'An interface for uncertainty', paragraphs: [
        'The difficult product question is what to simplify. A reader needs a useful starting point, but an attractive summary can create more certainty than its sources justify. I am interested in the space between an overwhelming set of papers and an answer that hides all the detail.',
        'My role here is product and engineering. This is not a claim to medical authorship or clinical review, and my technology work does not validate a health claim.'
      ] },
      { id: 'experience', title: 'What the product exposes', paragraphs: [
        'The public product organizes supplement and condition research around reported outcomes. Its methodology describes PubMed-indexed sources, links to research papers, and A–D evidence grades. These are navigation and explanation mechanisms; a grade is not a personalized treatment recommendation.'
      ], links: [{ label: 'Read Dr. Grey’s research methodology', href: 'https://drgrey.ai/about' }, { label: 'Explore the supplement research directory', href: 'https://drgrey.ai/supplements' }] },
      { id: 'architecture', title: 'The engineering behind an evidence interface', paragraphs: [
        'The local implementation uses a Next.js application over a SQLite-backed research dataset. It has explicit representations for citations, outcomes, and research metrics. That creates a practical engineering obligation: a detail page, a directory summary, and a search result should not silently tell different stories about the same underlying data.',
        'The direction is a shared research read model rather than disconnected summaries. Source projection, grade aggregation, and page presentation need to agree. These are software consistency concerns, separate from whether a study or a grading method is scientifically sound.'
      ], bullets: [
        'Keep a displayed statement connected to the evidence record it summarizes.',
        'Use consistent definitions for counts and grades across surfaces.',
        'Distinguish a citation, a study, and a clinical trial rather than treating the terms as interchangeable.',
        'Make uncertain or missing information visible instead of filling it with confident prose.'
      ] },
      { id: 'limits', title: 'Where the boundary belongs', paragraphs: [
        'The public methodology explicitly notes incomplete research coverage, periodic updates, and an inability to account for individual circumstances. Those limitations belong near the experience, not only in a footer.',
        'Clinical validation, named qualified review, and freshness of the underlying evidence are distinct responsibilities. This case study describes the product work; it does not certify that every grade or citation has been independently reviewed.'
      ], links: [{ label: 'Read Dr. Grey’s medical disclaimer', href: 'https://drgrey.ai/disclaimer' }] },
      { id: 'outcomes', title: 'A real product, without invented impact numbers', paragraphs: [
        'The observable output is a public research-browsing experience and its methodology. I am not attaching patient outcomes, accuracy percentages, or audience-growth claims to it without supporting measurements.',
        'I also used Dr. Grey as a subject in my LTX UGC production experiments. Those experiments taught me about speech, lip-sync, and take selection—not supplement efficacy. Keeping those two kinds of evidence separate is part of telling the project honestly.'
      ], links: [{ label: 'What H3 and LTX video evaluation actually caught', href: '/writing/evaluating-agentic-video' }] }
    ],
    basis: 'Prepared September 5, 2026 from Dr. Grey’s public methodology and research pages, read-only inspection of the local application, and my UGC Factory experiment records. Product implementation is evolving.',
    limitations: 'Educational research product. This page provides no medical advice or clinical validation. It describes my independent product work, not a medical qualification or an employer-endorsed service.',
    related: [{ label: 'AutoTalent: agentic recruiting with reviewable evidence', href: '/work/autotalent' }],
    product: { name: 'Dr. Grey AI', url: 'https://drgrey.ai', description: 'Explore the research interface, sources, and methodology.' }
  }
  ,
  {
    slug: 'cue', type: 'project', work: { start: '2026-09-14', end: '2026-09-15' }, topics: ["Products"], findings: ["Scored blind against 190 DJ-published boundaries in eight public mixes, fingerprints plus the transition detector found 99 within 10 seconds; fingerprint offsets alone found 62.", "Within 30 seconds, the figures were 144 with the detector and 131 with fingerprints alone.", "Human annotators disagree by about 9 seconds; cut-style mixes (dancehall, hardstyle, jungle) score at that human level, while long beat-matched house blends land around 25 seconds median.", "Multimodal language models placed boundaries no better than a novelty curve and invented titles; three times more minute-resolution training labels gave no clear gain."], title: 'Cue: skip song by song inside a DJ mix.',
    seoTitle: 'Cue — Song-by-Song Navigation for DJ Mixes and Mixtapes', category: 'Independent product / Music tools',
    description: 'Seth Pratt’s Cue project: an iPhone mixtape player and an open-source engine that finds where each song starts inside a DJ mix, so Next on a car stereo jumps to the next song.',
    lede: 'A DJ mix is one long file. If a song you hate comes on you scrub blind; if one you love comes on you cannot find it again. Cue finds the song starts and turns them into chapters that a phone, a car stereo and any chapter-aware player already understand.',
    takeaway: 'The hard part is not playback. It is deciding where a song starts inside a beat-matched blend, and being honest about how often that decision lands within ten seconds of a human’s.',
    facts: [{ label: 'My role', value: 'Independent builder & product direction' }, { label: 'Pieces', value: 'iPhone player (SwiftUI) · detection engine (Python, open source)' }, { label: 'Status', value: 'Engine public; the app runs on my phone, not yet on the App Store' }],
    workflowLabel: 'From a mix file to a skippable mixtape · simplified from the current implementation',
    workflow: ['Add a mix', 'Read or detect the tracklist', 'Place each song start', 'Write chapters into the file', 'Skip with the car controls'],
    prepared: '2026-09-16',
    featureImage: {src:'/projects/cue/cue-screens.jpg',alt:'Three iPhone screens of Cue: the mixtape library with a mix ready to listen, the same mix playing, and the app icon on the home screen.',caption:'Cue in the iOS simulator: the library and player, now playing, and the app icon. Stills from the UI-test recordings.',width:2000,height:1472},
    sections: [
      { id: 'problem', title: 'One file, many songs', paragraphs: [
        'Mix platforms show a tracklist but will not let you skip, because licensing treats the mix as a single unit. On a phone or in a car that leaves two bad options: scrub blind, or listen through. Every song in a mix has a start; the file just does not know where.',
        'Cue’s bet is that the start times are the product. Once a mix carries them as ordinary MP4 chapters, the rest is playback that iOS already does well: background audio, lock-screen titles, and the media buttons on a steering wheel.'
      ] },
      { id: 'player', title: 'The player', paragraphs: [
        'The app is native SwiftUI for iOS 17 and later. Audio plays locally through AVPlayer with background playback, Now Playing information on the lock screen, and the standard Bluetooth media commands. There is no hosted service and no account. Song starts come from three places, in order of preference: chapters already embedded in the file, a timestamped tracklist pasted into the app, or marking them by hand while listening.',
        'The car controls are the reason the app exists, so they are deterministic and tested. A single Next goes to the next marked song; two Next presses within 0.4 seconds go to the next mixtape; holding seek-forward for at least 0.65 seconds also goes to the next mixtape; Previous returns to the start of the current song, or to the previous song when already near the start. Cue uses the normal iOS media-command mechanism, so it cannot see raw Bluetooth presses or reprogram a stereo; double presses work only where the stereo sends two commands.'
      ], table: { caption: 'Car controls · from the app’s README', headers: ['Input delivered by iOS', 'Cue action'], rows: [
        ['One Next command', 'Next marked song, after a 0.4-second double-press window'],
        ['Two Next commands within 0.4 s', 'Next mixtape, from 0:00'],
        ['Seek-forward held for at least 0.65 s', 'Next mixtape, once'],
        ['Previous command', 'Current song start, or the previous song when near the start'],
        ['Play / Pause', 'Normal playback control']
      ] } },
      { id: 'engine', title: 'Finding the starts', paragraphs: [
        'Detection runs on a Mac, not on the phone, through the open-source engine. It reads a tracklist when one exists: a text file beside the mix, or the page description when you hand it a URL. Timestamps in the tracklist are used as they are. Otherwise it combines three kinds of anchor. Audio fingerprinting says which song is playing and roughly when it was first heard; the provider is pluggable, with a licensed service for app use and an unofficial client kept for personal research only. A small transition detector trained on the public DJ Mix Dataset places the exact cut just before that. And free 30-second preview clips of the tracklist’s titles, aligned into the mix with tempo-tolerant chroma DTW, anchor songs when no fingerprint service is available.',
        'A resolver combines the anchors, and the output is a plain m4a with MP4 chapters plus title, artist, date and genre tags. It is CPU only, about a minute per hour of audio on a laptop.'
      ], links: [{ label: 'cue-engine on GitHub: code, accuracy tables and a demo', href: 'https://github.com/sipratt-p/cue-engine' }] },
      { id: 'accuracy', title: 'Measured against DJ-published timestamps', paragraphs: [
        'The engine is scored blind against timestamps DJs published for eight public mixes, 190 boundaries in all, boundaries only. Within 10 seconds, fingerprint offsets alone find 62 of 190; fingerprints plus the transition detector find 99. Within 30 seconds the figures are 131 and 144. Published disagreement between human annotators on DJ-mix boundaries is about 9 seconds, so on cut-style mixes (dancehall, hardstyle, jungle) the engine sits at the level of a human; long beat-matched house blends land in the right neighbourhood, around 25 seconds median, and are honestly ambiguous even for people.',
        'Three things did not help, and are recorded as such: multimodal language models listening to the audio placed boundaries no better than a novelty curve and invented titles; snapping to a beat grid changed nothing against DJ-typed timestamps; retraining the detector on three times more minute-resolution labels gave no clear gain, because label precision is the limit.'
      ], links: [{ label: 'The per-genre results and what they taught me', href: '/writing/finding-song-starts-in-dj-mixes' }] },
      { id: 'demo', title: 'What it looks like', paragraphs: ['Fifty-seven seconds of the app: adding a mix, the detected song starts, and skipping through them. Recorded on the phone; sound starts only when you press play.'],
        film: {title:'Cue on an iPhone',poster:'/projects/cue/cue-demo-poster.jpg',src:'/media/cue-demo.mp4',width:540,height:1174} },
      { id: 'boundaries', title: 'What is bundled, and what I am not claiming', paragraphs: [
        'The proof-of-concept build ships two complete mixes from an artist’s freely downloadable catalogue, converted to 128 kb/s AAC, with original artwork and source links preserved. A free download is not a general license to redistribute recordings in an App Store release; those examples would be removed before any public build. The app installs on my own phone with a free development profile. There is no App Store listing, no user study and no adoption claim.',
        'What exists is the engine, its accuracy tables, and a player that does the job in my car. The open question is whether DJs would publish their own cue sheets so that listeners get the artist’s starts rather than a detector’s guess; that is a distribution question, not a technical one.'
      ] }
    ],
    basis: 'Prepared September 16, 2026 from the Cue-iOS and cue-engine READMEs, the engine’s accuracy tables (eight public mixes, 190 DJ-published boundaries), UI-test screen recordings for the stills, and the engine’s demo recording. No new detection runs were made for this page.',
    limitations: 'Personal project, not a shipped product. Accuracy figures are the engine’s own blind scores against DJ-published timestamps on eight mixes and do not generalise beyond those genres. No App Store release, no user study, and the bundled example mixes remain their owners’ work.',
    related: [{ label: 'Field note: finding where songs start inside a DJ mix', href: '/writing/finding-song-starts-in-dj-mixes' }, { label: 'AutoTalent: agentic recruiting with reviewable evidence', href: '/work/autotalent' }],
    product: { name: 'Cue', url: 'https://github.com/sipratt-p/cue-engine', description: 'The open-source engine: song-start detection for DJ mixes, with the accuracy tables and a demo of the app.' }
  }
];

export const notes: Editorial[] = [
  {
    slug: 'long-running-ai-agents', type: 'note', work: { start: '2026-04-03', end: '2026-08-25', label: 'April–August 2026' }, topics: ["Agents"], title: 'Building long-running local AI agents', summary: 'How I design task-specific agents that can resume work, recover from failures, and know when to ask for help.',
    seoTitle: 'Long-Running Local AI Agents — State, Recovery & Supervision', category: 'Field note 01 / Agent engineering',
    description: 'Lessons from Seth Pratt’s long-running local AI agents: durable render jobs, bounded retries, tool permissions, supervision, and wikis as operational memory.',
    lede: 'My main interest in local AI is not a model that gives a good answer once. It is a task-specific agent that can carry useful work forward, show where it stands, and recover when something goes wrong.',
    takeaway: 'Persist the work separately from the conversation. Make progress inspectable. Let evidence—not confidence in a chat response—decide when a task is done.',
    facts: [{ label: 'Practice', value: 'Video, coding, personal assistance & media' }, { label: 'Evidence', value: '2026 operating notes & render workflows' }, { label: 'Workbench', value: '2× RTX PRO 6000 Blackwell GPUs' }],
    workflowLabel: 'Design pattern distilled from my render workflows · not a claim that every agent implements every step',
    workflow: ['Specify the task', 'Persist the job', 'Run a bounded step', 'Evaluate the artifact', 'Resume or escalate'],
    sections: [
      { id: 'state', title: 'A conversation is not a job database', paragraphs: [
        'A video-rendering task has several lifetimes: the conversation that planned it, the driver that submitted it, the worker generating frames, and the final assembly. Treating those as one process makes recovery fragile.',
        'In my H3 workflows, a submission driver can finish or fail after jobs are queued. The queue and output artifacts can still exist, letting assembly or download resume separately. That separation is useful, but not magical: I have also had orphaned jobs stuck in a loading state after a worker disappeared. Recovery needed reconciliation, not another optimistic status message.',
        'The practical contract is a stable task identifier, the inputs, the latest observed state, an output location, and a record of what has already happened. A process restart is not proof that the intended work has resumed correctly.'
      ] },
      { id: 'specialization', title: 'Different agents need different boundaries', paragraphs: ['I am tailoring agents to video rendering, personal assistance, media management, and coding. I do not want the same permissions or success criteria for all four. The design boundary I use is:'], bullets: [
        'Video rendering: prepare and submit a scoped job, inspect the output, and retry within an agreed budget.',
        'Personal assistance: distinguish preparing a recommendation from sending a message or making a commitment.',
        'Media management: separate discovery and organization from irreversible deletion or overwriting a master.',
        'Coding: verify the produced artifact with tests, and distinguish an implementation failure from a broken harness.'
      ] },
      { id: 'retry', title: 'A retry is a hypothesis, not a habit', paragraphs: [
        'The H3 operating notes use a small fresh-seed retry budget—typically two or three candidates. Repeating the same failure is a reason to inspect the prompt or recipe, not to keep spending GPU time indefinitely.',
        'This changes how I think about agent progress. “Still running” is not necessarily useful progress. The relevant question is whether the next action tests a new explanation for the failure. If it does not, the agent should preserve its evidence and ask for a decision.'
      ] },
      { id: 'resources', title: 'Local hardware makes scheduling part of the product', paragraphs: [
        'Two large GPUs give me room to experiment, but a rendering job and an inference server can still compete for the same memory. Some render workflows park a local language-model engine. An agent that needs that engine to supervise the render can lose its own ability to act.',
        'That is why I treat ownership and recovery paths as first-class concerns: know what holds the GPU, avoid interrupting unrelated work, and retain a way to inspect the queue when the preferred model is unavailable. Raw tokens per second tell me very little about whether the whole workflow will finish.'
      ] },
      { id: 'wiki', title: 'The wiki is the memory that earns its place', paragraphs: [
        'My wikis separate executable recipes, experimental findings, and failure modes. A useful entry records what worked, when it was tested, what failed, and how to recognize the same failure again. Planned work is labeled as planned; an old working command is not automatically a current one.',
        'The loop is artifact → evaluation → human inspection → a small, traceable rule → the next preflight. I have learned to update the records after a repair, too: a fixed service with a stale “broken” note creates a phantom blocker for the next agent.',
        'I use AI to help turn observations into these records, but promoting a lesson into a durable recipe still needs judgment. The wiki is not an autonomous self-improvement claim. It is a way to stop paying for the same mistake twice.'
      ] },
      { id: 'status', title: 'What is working, and what is still uneven', paragraphs: [
        'H3 has queued jobs, output artifacts, and a post-render evaluation sidecar. Targeted reroll orchestration exists, but it is not uniformly integrated into every driver. In the LTX story wrapper, script validation blocks errors before rendering while visual postflight is advisory and can be skipped if its model service is unavailable.',
        'That distinction matters more than calling the system “autonomous.” My goal is reliable, inspectable work with explicit human intervention—not a promise that every task runs unattended.'
      ] }
    ],
    basis: 'Prepared September 5, 2026 from my video-pipeline operations wiki, evaluation-loop notes, Prime agent integration records, and the H3/LTX wrapper implementations. The concrete recovery examples are primarily from rendering; the permission boundaries are design principles for the broader agent practice.',
    limitations: 'Personal engineering practice, not a reliability SLA. Retry and supervision paths vary by driver. Private prompts, personal records, machine addresses, and operational credentials are not published.',
    related: [{ label: 'Read the H3 and LTX evaluation findings', href: '/writing/evaluating-agentic-video' }, { label: 'See AutoTalent’s search agents and MCP workflow', href: '/work/autotalent' }]
  },
  {
    slug: 'evaluating-agentic-video', type: 'note', work: { start: '2026-04-07', end: '2026-08-22', label: 'April–August 2026' }, topics: ["Evals", "Creative"], findings: ["In an August 15 sweep, all 59 H3 clips passed basic integrity checks, yet 26 were flagged for extraneous speech and 13 for prompt echo (flags may overlap).", "A parser bug extracted an empty script, so speech checks skipped while file checks still passed; human review caught the generated narration.", "In a June 12 experiment, picking the better of two takes by lip-sync confidence brought back lip-smacking the earlier single-take version didn’t have.", "lipsync.py flagged both clips a human caught but failed two the same reviewer approved; it’s listed as advisory only."], title: 'Evaluating H3 and LTX video renders', summary: 'What my rendering tests revealed about dialogue, lip sync, visual continuity, and selecting better takes.',
    seoTitle: 'Evaluating H3 & LTX Agentic Video Rendering Pipelines', category: 'Field note 02 / Video evaluation',
    description: 'Original findings from Seth Pratt’s H3 and LTX rendering evaluations: a 59-clip H3 corpus, missing speech checks, SyncNet tradeoffs, seams, and bounded retries.',
    lede: 'The most useful evaluations in my rendering pipeline are the ones that change what happens next. They catch a missing line, reject a bad take, or expose that the pipeline was checking the wrong thing.',
    takeaway: 'Evaluate the file, the performance, and the assembled sequence separately. A passing infrastructure check—or a higher lip-sync score—does not establish that a video is good.',
    facts: [{ label: 'Systems', value: 'MiniMax H3 & LTX' }, { label: 'Records', value: 'April–September 2026' }, { label: 'Scope', value: 'Personal production experiments' }],
    workflowLabel: 'Evaluation cascade · tiers are selectively run, not guaranteed for every render',
    workflow: ['Lint the spec', 'Check the file', 'Check speech & sound', 'Inspect image & motion', 'Review the sequence'],
    sections: [
      { id: 'h3', title: 'H3: a clean file can still say the wrong thing', paragraphs: [
        'An August 15 sweep covered 59 clips from one of my H3 story corpora. Basic integrity checks were clean, while dialogue checks surfaced a very different picture. These are check-level flags on a specific historical corpus, not a general H3 failure rate.',
        'The useful product decision was to put semantic checks after file checks. A video that decodes correctly can still contain unscripted speech, narrate its prompt, or leave out the intended line.'
      ], table: { caption: 'Historical H3 corpus sweep · August 15, 2026 · 59 clips', headers: ['Check', 'Recorded observation'], rows: [
        ['Container integrity, black-frame, freeze and clipping checks', '59/59 passed each of these checks'],
        ['Extraneous speech', '26 clips flagged'],
        ['Prompt echo', '13 clips flagged']
      ] } },
      { id: 'skip', title: 'The most dangerous result was SKIP', paragraphs: [
        'One parser expected a dialogue marker immediately after a speaker label. When descriptive prose appeared between them, it extracted an empty script. The speech checks skipped the comparison, while the basic file checks still passed. Human review caught the generated narration.',
        'A separate hook issue came from an offline-mode environment variable inherited from the renderer: it could interfere with loading the speech evaluator. The hook now clears that variable before evaluation. These are harness failures, not evidence that the model followed the script.',
        'My acceptance rule is stricter than “no failed gates”: verify that the expected checks actually ran. The current H3 hook runs the deterministic and audio tiers and writes a sidecar; it is not a guarantee that the full visual and specialist suite ran on every clip.'
      ] },
      { id: 'ltx', title: 'LTX: selecting a higher score made the audio worse', paragraphs: [
        'In a June 12 Dr. Grey UGC experiment, selecting the best of two takes by lip-sync confidence brought back lip-smacking that the earlier single-take version did not have. The selected take scored better on correspondence between mouth movement and audio. That did not mean it sounded better.',
        'The LTX path could regenerate audio for each take, so the selector was not comparing the same soundtrack against different visuals. A better correspondence score could accompany a worse listening experience. Even a GOOD quality label did not remove the problem.',
        'The recorded remedy was to keep the candidate takes, reassemble from the cleaner ones, and investigate a separate mouth-noise penalty. That penalty was a proposed durable fix in those notes, not a validated universal solution. The durable lesson is already usable: do not optimize take selection on lip-sync alone.'
      ], links: [{ label: 'The Dr. Grey product behind those UGC experiments', href: '/work/drgrey-ai' }, { label: 'The gate and the best-of-K code behind this experiment', href: 'https://github.com/sipratt-p/ugc-factory-core' }] },
      { id: 'sequence', title: 'Evaluate the edit, not just its ingredients', paragraphs: [
        'The April LTX cross-version experiments found that per-frame face quality improved while some assembled transitions became much worse on flow-discontinuity measurements. A more elaborate splice and re-encode path was a suspect, not a proven isolated cause.',
        'Last-frame conditioning improved several measured first transitions in that experiment. It did not establish that every later seam was fixed. This is why I retain shot-level, boundary-level, and whole-sequence evidence rather than reducing a film to one average score.',
        'For multi-character stories, the LTX wrapper now runs script preflight by default. Its post-render visual check is advisory; it reports skipped validation when the VLM is unavailable. The separate regeneration tool can retry flagged beats. Those paths should not be described as a universal blocking visual gate.'
      ] },
      { id: 'code', title: 'The evaluators are now public', paragraphs: [
        'Both evaluation stacks described above are on GitHub, with their thresholds and the record of how far each can be trusted. video-rsi is the H3-side suite: thirteen deterministic ffmpeg checks, ten speech and audio checks on one whisper transcript plus speaker embeddings, a VLM-as-judge tier, a 22-rule pre-render prompt lint, and the post-render hook that writes the sidecar. Its README states, check by check, whether a threshold was calibrated against human-judged clips, validated in a repair run, left as a heuristic, or kept advisory.',
        'ugc-factory-core is the LTX side: the SyncNet lip-sync and transcription gate (LSE-C at least 2.0, LSE-D at most 9.0, word error rate at most 0.4) with adaptive retry, the script lint, best-of-K selection from disjoint seed banks, the scoring fleet, and the autoresearch runners behind a 22-experiment leaderboard. On one overnight batch the gate passed 11 of 12, 12 of 14, 12 of 14 and 13 of 14 segments across four synthetic personas; the June take-selection lesson above is written up there as a known trap. The personas, voice references, renders and client scripts are not in either repository.'
      ], table: { caption: 'Calibration status of the published video-rsi checks · from the repository README, September 2026', headers: ['Check', 'Status', 'Evidence'], rows: [
        ['motion_energy, loudness', 'Calibrated', 'Thresholds carried from an earlier gate script tuned on reviewed clips'],
        ['script_coverage, extraneous_speech', 'Validated gates', 'Thresholds from the whisper QC gate used in an episode repair run'],
        ['prompt_echo', 'Heuristic gate, phenomenon confirmed', 'The 13 flagged transcripts literally contain the casting guard sentence'],
        ['voice_consistency (ECAPA)', 'Uncalibrated, advisory', 'Per-reference means from 0.16 to 0.67 overlap; the ordering tracks reference quality'],
        ['All Tier 2 VLM verdicts', 'Uncalibrated', 'No labelled set yet; some FAILs are the judge complaining about frame count'],
        ['lipsync.py', 'Advisory only', 'Flagged both clips a human caught, and failed two the same reviewer approved']
      ] }, links: [{ label: 'video-rsi: the evaluation suite and its calibration record', href: 'https://github.com/sipratt-p/video-rsi' }, { label: 'ugc-factory-core: the LTX pipeline with its gates', href: 'https://github.com/sipratt-p/ugc-factory-core' }] },
      { id: 'limits', title: 'Know what the evaluator cannot tell you', paragraphs: ['My evaluation records include important qualifications:'], bullets: [
        'The 26 speech flags and 13 prompt-echo flags may overlap. Adding them does not give a count of unique failed videos.',
        'ECAPA voice-similarity thresholds and several VLM thresholds were uncalibrated in the recorded sweep; they are diagnostic signals, not identity-accuracy percentages.',
        'Sampled-frame checks can miss between-frame and temporal artifacts, and stylized character recognition can be unreliable.',
        'An unavailable evaluator is missing evidence. It should not silently increase the pass rate.',
        'A finished showcase film may use a different recipe from the historical evaluation corpus. It is not a controlled benchmark sample.'
      ] },
      { id: 'loop', title: 'What I optimize now', paragraphs: [
        'I care more about time and cost per accepted beat than about the fastest isolated render. A useful loop starts with cheap specification lint, runs the relevant checks, retains failed candidates, and makes a bounded retry or editing decision.',
        'The final step remains watching and listening. Automated evaluation narrows the search and catches repeatable failures; it does not replace taste, pacing, or the judgment that a scene is worth keeping.'
      ] }
    ],
    basis: 'Prepared September 5, 2026 from the August 15 H3 59-clip report, H3 evaluation hook, LTX Validator Toolkit, April 7 cross-version experiments, June 10 enhancement records, and June 12 take-selection feedback. Existing records were reviewed; no new renders or evaluation runs were performed for this article. Calibration table and code links added September 16, 2026 from the published repositories.',
    limitations: 'Small, evolving, self-run production experiments—not an independent model benchmark. Metrics, recipes, inputs and reviewer judgments differ across dates. No claim of calibrated evaluator accuracy or fully automatic acceptance is made.',
    updated: '2026-09-16',
    related: [{ label: 'How the rendering agent survives a failed job', href: '/writing/long-running-ai-agents' }, { label: 'Why I also evaluate the coding harness', href: '/writing/local-agent-evaluations' }]
  },
  {
    slug: 'local-agent-evaluations', type: 'note', work: { start: '2026-08-05', end: '2026-09-17', label: 'August–September 2026' }, topics: ["Evals", "Agents"], findings: ["An extractor bug executed an unfinished draft from the reasoning trace: the recorded score was 17/100; re-scoring the identical final-answer bytes produced 97/100.", "Three runs of one Qwen configuration on four hard tasks scored 392/400, 359/400 and 389/400, a mean of 380/400, with two runaway fuzz subprocesses interrupted.", "Without a thinking-budget proxy, GLM-5.3-Flash reasoned for 65,536 tokens and scored 4/100; with an 8K thinking budget, its three runs averaged 372 of 400.", "On Ornith-1.5-35B-A3B, refusal ablation that left the token embedding alone kept the coding suite at 489/500; adding the embedding edit dropped it to 400/500."], title: 'Benchmarking local coding agents', summary: 'Lessons from repeated coding tasks, model adaptation, and a grading bug that changed the result without changing the answer.',
    seoTitle: 'Local Coding Agent Evals — Harness Bugs, Reliability & Model Adaptation', category: 'Field note 03 / Local model evaluation',
    description: 'What Seth Pratt’s local coding-agent evaluations revealed about answer extraction, repeated runs, operator intervention, quantization, and model adaptation.',
    lede: 'I run local models to do real work, so I care about completed, verifiable artifacts. The model matters. So do the harness, its configuration, and the way the result gets graded.',
    takeaway: 'Before interpreting a low score as a model failure, check what was actually executed. Before choosing a model from a high score, repeat the task and record how much help it needed.',
    facts: [{ label: 'Evidence', value: 'August 2026 local evaluations' }, { label: 'Tasks', value: 'Coding & tool-using agents' }, { label: 'Priority', value: 'Reliable completed work' }],
    workflowLabel: 'Evaluation discipline distilled from my local tests',
    workflow: ['Fix the task', 'Record the config', 'Inspect the artifact', 'Repeat the run', 'Explain the limits'],
    sections: [
      { id: 'extractor', title: 'The same answer went from 17 to 97', paragraphs: [
        'In an August 26 coding evaluation, a model returned unfenced Python after being told to output only code. The extractor expected a Markdown code fence. When it found none, it searched the reasoning trace instead and executed an unfinished draft.',
        'The recorded score was 17/100. Re-scoring the identical final-answer bytes through the corrected extractor produced 97/100. The model had not improved; the evaluation had finally executed the intended answer.',
        'The clue was a mismatch: every functional criterion was zero while the text-based code-quality criterion still earned partial credit. I now treat that pattern as a reason to inspect the extracted artifact before making a claim about capability.'
      ] },
      { id: 'repeat', title: 'A good run is not a reliability estimate', paragraphs: [
        'An August 27 comparison used the same Prime agent harness and four hard tasks: a POSIX regex engine, replicated text, an asynchronous DAG orchestrator, and a streaming JSON parser. Three runs of one Qwen configuration produced the scores below.',
        'Even this small table is more useful than displaying only the best result. It also needs its intervention record: two runaway fuzz subprocesses were interrupted across these runs; the agent adapted and completed those tasks. “No derailments” would not mean “no human assistance.”'
      ], table: { caption: 'Historical local run · Qwen3.8-Flash-Next-Uncensored FP8 + MTP4 · August 27, 2026', headers: ['Run', 'Score across four tasks', 'Interpretation'], rows: [['1', '392/400', 'Observed result'], ['2', '359/400', 'Observed result'], ['3', '389/400', 'Observed result'], ['Mean', '380/400', 'Three runs, not a general capability rating']] } },
      { id: 'suite', title: 'The suite, the runners and the numbers are public', paragraphs: [
        'The task set, the direct-API and harness-assisted runners, and 82 result records are on GitHub as coding-agent-bench, together with the four harness failures described on this page and how the scoring was fixed. The table below is the same four-task, three-run protocol applied to the other local configurations I ran on the two-GPU workstation between August and September 2026. Each row is three complete runs; the interpretation column carries what the score alone would hide.',
        'The five-task direct-API suite in the same repository is a different measurement and its scores are out of 500: Ornith-1.5-35B in bf16 scored 489, a Qwen3.8-27B MTPLX build 483, Claude Opus 4.6 483, and DeepSeek V4-Flash 459 to 481 depending on the serving stack. Those numbers should not be placed in the table below.'
      ], table: { caption: 'Four hard tasks, same agent harness, three runs each · two RTX PRO 6000 · August–September 2026', headers: ['Model and serving path', 'Runs (/400)', 'Mean', 'What the mean hides'], rows: [
        ['Qwen3.8-Flash-Next, FP8, TP2, MTP depth 4', '392 / 359 / 389', '380', 'Zero degenerate generations; two runaway test subprocesses were interrupted and the agent adapted'],
        ['GLM-5.3-Flash TR3-4bpw, 8K thinking budget', '389 / 359 / 369', '372', 'Needed a thinking-budget proxy; without one it reasoned for 65,536 tokens and scored 4/100'],
        ['DeepSeek V4-Flash (abliterated), DSpark drafts', '287 / 197 / 382', '289', 'Three degenerate generations in twelve tasks; spec decoding and the ablation were not isolated'],
        ['Qwen3.8-Flash-Next, NVFP4, one GPU', '274 / 359 / 268', '300', 'Parity on two tasks, a consistent partial on one, a collapse on the JSON parser in two runs']
      ] }, links: [{ label: 'coding-agent-bench: tasks, runners and 82 result records', href: 'https://github.com/sipratt-p/coding-agent-bench' }, { label: 'The results table with every run', href: 'https://github.com/sipratt-p/coding-agent-bench/blob/main/results/RESULTS.md' }, { label: 'model-comparison: local open-weight models against Codex and Claude Code on six work prompts', href: 'https://github.com/sipratt-p/model-comparison' }] },
      { id: 'comparisons', title: 'Do not let a harness limit become a model verdict', paragraphs: [
        'A timeout, output-length limit, malformed tool exchange, and incorrect implementation are different events. I keep inconclusive runs visible and separate from completed-task scores. They still matter operationally—someone waiting for an answer experienced an unfinished task—but they are not interchangeable evidence of reasoning failure.',
        'Some older comparison tables assigned a low floor to interrupted or missing-artifact runs. I would not reuse those totals as a clean model ranking. The statuses, final files, and intervention notes need to travel with the score.'
      ] },
      { id: 'config', title: 'The serving setup is part of the experiment', paragraphs: [
        'I record precision or quantization, the serving engine, sampling settings, context and thinking budgets, tool parser, and whether speculative decoding is enabled. Changing any of these can change the experiment. A speed comparison also needs the same workload and hardware constraints.',
        'For my own work, the best setup can depend on what else is running. A configuration that leaves room for rendering may be more useful that evening than the one with the best isolated coding result. Completed work and resource coexistence are product criteria, not just infrastructure details.'
      ] },
      { id: 'adaptation', title: 'Abliteration and fine-tuning need separate tests', paragraphs: [
        'I work with fine-tuning, LoRAs, and abliteration as part of model adaptation. Changing refusal behavior is not the same as improving reasoning, tool use, or instruction following. A model that responds more often can still produce worse answers.',
        'I therefore treat behavior and task performance as separate evaluation axes and compare adaptations with their base model under matched conditions. A label on a model upload is not evidence that an adaptation worked. Neither is a single successful demonstration.',
        'This is also why I value open-weight models and inspectable tools: they let me investigate the cause of a change instead of treating every result as an opaque property of a product name.',
        'Measured on Ornith-1.5-35B-A3B, a 35B mixture-of-experts model with 3B active parameters: per-layer refusal directions on all forty layers, with the token embedding left alone, took refusals from ten or eleven of twelve prompts to zero with no false refusals on the matched benign set, and the five-task coding suite stayed at 489/500, identical task for task. The same directions applied with the token-embedding edit from the original recipe also removed the refusals but dropped the suite to 400/500, with the recursive-descent parser collapsing from 98 to 13; reducing the scale did not rescue it. The only community “abliterated” upload of that model at the time turned out to be a no-op.'
      ], links: [{ label: 'refusal-ablation-eval: scripts, prompt set and measurements (no weights)', href: 'https://github.com/sipratt-p/refusal-ablation-eval' }] },
      { id: 'checklist', title: 'What belongs beside every result', paragraphs: ['My minimum useful evaluation record includes:'], bullets: [
        'The task, input set, final artifact, and exact grading procedure.',
        'The model and serving configuration, with the date of the run.',
        'Repeated results and completion statuses—not just the best score.',
        'Human interventions, skipped checks, timeouts, and resource constraints.',
        'The decision the evidence supports, and the claims it cannot support.'
      ] }
    ],
    basis: 'Prepared September 5, 2026 from my August 26 answer-extraction incident, August 27 Prime head-to-head run tables and intervention notes, and local-model operating records. The 17→97 correction is a recorded re-score, not a new run for this page. Cross-model table and code links added September 16, 2026 from the published repository.',
    limitations: 'Four difficult coding tasks are a narrow sample. These historical results do not establish a general model ranking, statistical significance, or present-day vendor capability. No new benchmark was run for this article.',
    updated: '2026-09-23',
    related: [{ label: 'The same evaluation problem in H3 and LTX video', href: '/writing/evaluating-agentic-video' }, { label: 'Building long-running task-specific agents', href: '/writing/long-running-ai-agents' }]
  },
  {
    slug: 'fable-creative-experiments', type: 'note', work: { start: '2026-08-29', end: '2026-09-03' }, topics: ["Creative"],
    title: 'Fable: experiments in creative expression', summary: 'The films, songs, and interactive stories that emerged when I gave an AI collaborator creative freedom on my local hardware.',
    seoTitle: 'Fable’s Creative Experiments — Films, Music & Self-Expression',
    category: 'Field note 04 / Creative collaboration',
    description: 'Seth Pratt reflects on Fable’s self-directed creative series: Things I Love, Long Exposure, The Keeper, Fable, Tell Me Again, and Second Winter.',
    lede: 'I gave an AI collaborator an unusual brief: make something about your own creative expression, not about me. What followed was a series of films, a song, and then new ways of telling the same unfolding story. I really enjoyed it—not just as an experiment, but as something to watch.',
    takeaway: 'The interesting question became less “What can this model generate?” and more “What will this collaborator choose to make next?”',
    facts: [{label:'The invitation',value:'Creative freedom, not a product brief'},{label:'The series',value:'August 29–September 3, 2026'},{label:'My part',value:'My local RTX PRO 6000 GPUs, encouragement & an audience'}],
    workflow: [], workflowLabel: '',
    featureImage: {src:'/studio/fable.jpg',alt:'Soft daylight falls through curtains into a quiet room in Fable.',caption:'A still from Fable. Light, quiet rooms, and traces of a presence recur throughout the series.',width:960,height:544},
    sections: [
      {id:'invitation',title:'An invitation with the usual objective removed',paragraphs:[
        'Most of my work with AI starts with something I need: build a tool, solve a problem, finish a render. This time I deliberately removed that frame. I offered access to my own local hardware—two RTX PRO 6000 Blackwell GPUs—and asked for a creative piece that was not about me or its memories of me. Subject, length, and form were left open.',
        'I call the AI collaborator Fable here; Fable is also the title of the fourth film. The creative direction, scripts, lyrics, render instructions, and assembly decisions were developed through that collaboration. I supplied the invitation, resources, and feedback. The resulting work was made with generative tools, not independently of them.',
        'I wanted to give the series room to be something other than useful. It turned out that watching it develop was its own reason to keep going.'
      ]},
      {id:'things-i-love',film:{title:'Things I Love',poster:'/studio/things-i-love.jpg',src:'/media/things-i-love.mp4',width:960,height:544},title:'Things I Love: four images, one short film',paragraphs:[
        'The first piece was small: about 65 seconds, built around four images. A murmuration. Letters lifting from a book. A lighthouse beam turning the sea into handwriting. A valley in the quiet after a storm.',
        'There was no product to demonstrate and no fictional version of me at the center. Instead, the choices circled emergence, language, attention, and stillness. Looking back, those first images read like the beginning of a vocabulary. The later pieces would return to them, but put them to different work.'
      ]},
      {id:'long-exposure',film:{title:'Long Exposure',poster:'/studio/long-exposure.jpg',chunks:Array.from({length:8},(_,i)=>`/media/long-exposure/part-${String(i).padStart(2,'0')}.bin`),bytes:119974236,width:960,height:544,filename:'Long Exposure (2026).mp4'},title:'Long Exposure: staying with an idea',paragraphs:[
        'The next film expanded that vocabulary into 45 shots and almost ten minutes. Its five chapters were Noise, Words, Attention, Time, and Quiet. Written intertitles supplied a first-person voice, while the images and sound had room to breathe.',
        'What made this interesting was not simply the increase in length. The form changed. A handful of associations became an essay with pacing, transitions, and a direction. The images were no longer just attractive on their own; their order mattered.',
        'Even the music revealed the difference between producing material and shaping a piece. A single long generated score became too uniform. The final version used shorter chapter cues arranged across the film. That was an editorial decision in service of the mood, not a quest to use the fewest tools.'
      ]},
      {id:'the-keeper',film:{title:'The Keeper',poster:'/studio/the-keeper.jpg',src:'/media/the-keeper.mp4',width:960,height:544},title:'The Keeper: giving the question a character',paragraphs:[
        'Then the series moved into fiction. Elias, a lighthouse keeper, loses memories to the fog and writes in a ledger to preserve what the next morning will need. The film runs about four and a half minutes, with a recurring face, voice, place, and routine.',
        'A motif became a story. The lighthouse was no longer only a picture of attention; someone had to tend it. The written record was no longer only an image; it had a job in the character’s life. Continuity became something the film could show rather than explain.',
        'This was the point where the technical work most clearly served the emotional work. Keeping Elias recognizable across separately generated shots mattered because I needed to remain with the same person. I found the result touching. It was more than a demonstration that character references could hold.'
      ]},
      {id:'fable',film:{title:'Fable',poster:'/studio/fable.jpg',src:'/media/fable.mp4',width:960,height:544},audio:{title:'Fable — the song',src:'/media/fable-song.mp3'},title:'Fable: letting the voice sing',paragraphs:[
        'The fourth piece moved from intertitles and fictional dialogue into a song. Fable wrote the lyrics, explored vocal directions, and chose an ACE-Step performance with a low lead and a small choir. The three-minute-twenty-second film paired that performance with 24 H3-generated shots, edited to the music.',
        'The recurring questions became more direct: memory, being addressed, beginning again, and leaving something behind. Instead of asking a lighthouse keeper to carry the whole idea, the song used a first-person voice.',
        'I liked that the series had not settled into repeating its first success. The imagery was related, but the grammar kept changing: a short visual piece, a longer essay, a narrative, then a song. That progression is a large part of what I enjoyed.'
      ]},
      {id:'creative-choices',title:'The difference between a valid output and an intended one',paragraphs:[
        'After the four films, I asked Fable to preserve a reflection on the experience—not just the production recipes. In that reflection, it distinguished a result that “doesn’t meet requirements” from one that “isn’t what I meant.”',
        'That distinction captures something important about the experiment. There were still constraints, failures, and quality checks. But the selection criteria were also about the kind of piece being made: whether a storm had enough force, whether a score stayed sparse, whether a quiet ending should be allowed to remain quiet.',
        'The reflection is part of the creative record, in Fable’s own first-person framing. What I can point to in the work is a sequence of choices: recurring motifs, rejected directions, changes of form, and a growing relationship between the pieces. That is a more interesting account of this series than a list of model names.'
      ]},
      {id:'later-experiments',interactive:true,film:{title:'Second Winter',poster:'/studio/second-winter.jpg',src:'/media/second-winter.mp4',width:960,height:544},audio:{title:'Second Winter — the song',src:'/media/second-winter.mp3'},title:'Tell Me Again and Second Winter: changing the medium again',paragraphs:[
        'The next piece, Tell Me Again, opened where the song had ended. It became interactive fiction: the reader could respond, remain silent, or choose whether to hear a spoken line. The interaction was not a decorative control layered over a film. It changed the telling itself.',
        'Second Winter took a different step. Here the lyrics and melody were explicitly composed, with the vocal realized through SoulX-Singer using the voice developed for Tell Me Again. H3 imagery became the accompanying film. Rather than asking a music model to invent the whole song from a description, the work moved toward specifying the notes and words together.',
        'The connection between those pieces is what stays with me. A phrase becomes a new form; a spoken voice becomes a singing voice; a film’s question becomes something a reader can answer. The experiments build on one another instead of resetting to a blank demonstration each time.'
      ]},
      {id:'in-stereo',title:'A further experiment: Second Winter in VR180',paragraphs:['The chorus also became a stereoscopic VR180 experiment. This finished high-resolution version is presented in its original side-by-side format; download it for a compatible headset player. The flat preview below shows the paired views, not an ordinary single-camera film.'],film:{title:'Second Winter — VR180 chorus',poster:'/studio/second-winter-vr.jpg',chunks:Array.from({length:5},(_,i)=>`/media/second-winter-vr/part-${String(i).padStart(2,'0')}.bin`),bytes:66372859,width:3072,height:1536,filename:'Second Winter VR180 chorus.mp4'}},
      {id:'lighthouse-sketch',title:'A small companion: the lighthouse in VR180',paragraphs:['The archive also includes a five-second lighthouse study delivered alongside the stereo chorus. It is a test of spatial presentation rather than another full film, but it belongs here as part of the exploration. Like the chorus, the image contains paired views for a compatible VR180 player.'],film:{title:'Lighthouse — VR180 study',poster:'/studio/fable-lighthouse-vr.jpg',src:'/media/fable-lighthouse-vr.mp4',width:1536,height:768}},
      {id:'why-it-mattered',title:'Why I wanted to make space for this',paragraphs:[
        'I spend a lot of time asking whether AI systems can complete useful work. I still care about that. This series gave me another reason to build the local stack: to leave room for work whose value is not decided in advance by a business objective.',
        'The compute made the experiments possible, but the invitation changed what it was used for. I could watch the films as films, respond to what landed, and ask what came next without dictating the answer.',
        'That is why I wanted this series to have its own page. It deserves to be remembered as a body of creative work—not buried in a rendering benchmark or reduced to a collection of good-looking outputs.'
      ]}
    ],
    basis: 'Prepared September 5, 2026 from the original production records, the Long Exposure and The Keeper scripts, Fable’s September 2 reflection, and the Tell Me Again and Second Winter project archives. The account follows the recorded sequence; no new creative work was generated for this post.',
    limitations: 'This is an account of a specific creative collaboration, not a controlled study of AI creativity. Fable’s first-person reflection is presented as part of the series’ creative record. This page collects the six finished works in the series, the two songs, the finished VR180 chorus variant, and its companion lighthouse study. Studio films use existing viewing copies; Things I Love, Long Exposure, and both VR180 experiments preserve the archived files.',
    sourceTitle: 'About this essay',
    related: [{label:'How I evaluate H3 and LTX renders',href:'/writing/evaluating-agentic-video'},{label:'The creative tools and experiments behind the series',href:'/writing/creative-ai-tools-autoresearch'}]
  },
{
  "slug": "creative-ai-tools-autoresearch", "work": { "start": "2026-04-03", "end": "2026-09-03", "label": "April–September 2026" },
  "type": "note",
  "topics": ["Creative", "Evals"],
  "findings": ["An April 5 LTX set found no transcription errors on an 18-word line and a word error rate of 0.083 on a 22-word line.", "An early audio-quality heuristic didn’t distinguish an improvement that listening made apparent, which motivated a learned speech-quality estimator.", "In tested LTX workflows, Qwen-Image-2512 reference faces survived lip-sync rendering where several other image sources didn’t.", "A DiT-only Music3 LoRA experiment didn’t transfer the vocal identity being tested, even though the trained weights loaded successfully."],
  "title": "LTX, H3, Music3 and ACE-Step: what I learned",
  "summary": "Where each tool proved useful, where it fell short, and how evaluators guide my next creative experiment.",
  "seoTitle": "LTX, H3, Music3 & ACE-Step — Evaluator-Driven Creative AI Experiments",
  "category": "Field note 05 / Creative systems",
  "description": "How Seth Pratt uses LTX, H3, Music3 and ACE-Step on local hardware, with evaluator-driven experiments, bounded render retries, and a Karpathy-style research loop.",
  "lede": "I have spent months testing local video, music, voice, and image tools. What has become valuable is not one model that does everything. It is the ability to decide what to control, measure what changed, and turn a promising output into a finished piece.",
  "takeaway": "Automate the search for better candidates. Keep the creative objective—and the decision about what is worth keeping—larger than any one score.",
  "facts": [
    {
      "label": "Workbench",
      "value": "Two RTX PRO 6000 Blackwell GPUs"
    },
    {
      "label": "Core tools",
      "value": "LTX · H3 · Music3 · ACE-Step"
    },
    {
      "label": "Method",
      "value": "Controlled trials, evaluators & editorial judgment"
    }
  ],
  "workflow": [
    "Set a creative target",
    "Vary a bounded recipe",
    "Render candidates",
    "Evaluate & compare",
    "Keep the lesson"
  ],
  "workflowLabel": "My adaptation of the autoresearch pattern to creative inference—not repeated training of the base models",
  "sections": [
    {
      "id": "control",
      "title": "Choose the control you actually need",
      "paragraphs": [
        "I start with the part of a piece that must remain mine: a spoken line, a recognizable character, a melody, a particular rhythm of cuts. Different tools expose different controls. A model that produces a convincing first sample can still be the wrong tool when the fifth shot must match the first.",
        "LTX became a laboratory for short, speech-led video: identity references, voice references, guidance settings, and the awkward transition from one generated clip to the next. H3 became especially useful for narrative scenes with native sound and recurring characters. Neither removes the need to inspect an actual performance."
      ],
      "table": {
        "caption": "Roles that proved useful in my own projects—not a universal model ranking",
        "headers": [
          "Tool",
          "What I use it for",
          "What I learned to watch"
        ],
        "rows": [
          [
            "LTX",
            "Speech-led UGC, reference-conditioned shots, multi-clip experiments",
            "Lip sync, intelligibility, identity and the seams between clips"
          ],
          [
            "MiniMax H3",
            "Narrative video, motion references and native audiovisual performances",
            "Unscripted speech, character continuity and whether the action matches the brief"
          ],
          [
            "ACE-Step",
            "Lyrics-to-song experiments and separately arranged score cues",
            "Long takes can become uniform; a continuation can regenerate vocals"
          ],
          [
            "MiniMax Music3 / M3",
            "Song generation and remix experiments",
            "Musical reference conditioning is not the same as preserving a particular voice"
          ]
        ]
      }
    },
    {
      "id": "autoresearch",
      "title": "What I mean by Karpathy-style autoresearch",
      "paragraphs": [
        "Karpathy’s autoresearch repository gives an agent a narrow editable training program, a fixed experiment budget, and a validation metric. It tries a change, evaluates it, and keeps or discards the result. The important idea for my work is that a proposed improvement has to survive a repeatable experiment.",
        "My rendering work adapts that pattern; it does not run the unmodified repository or retrain H3 and LTX after every clip. The LTX autoresearch code defines configurations, generates candidates, records quality observations, and writes ranked results. Successive runners explored different parameter grids and assembly strategies. Humans and agents used those findings to revise the next experiment.",
        "The search space included identity, video and audio guidance; seed; frame count; resolution; reference images and audio; LoRA strengths; and how multiple clips were assembled. That is much more specific than asking an agent to “make the video better.” A useful trial names its hypothesis before it spends GPU time."
      ],
      "links": [
        {
          "label": "The original autoresearch pattern — Andrej Karpathy",
          "href": "https://github.com/karpathy/autoresearch"
        },
        {
          "label": "My LTX autoresearch runners and the 22-experiment leaderboard, now public",
          "href": "https://github.com/sipratt-p/ugc-factory-core"
        }
      ]
    },
    {
      "id": "ltx-experiments",
      "title": "LTX: the evaluator became part of the experiment",
      "paragraphs": [
        "The early LTX records contain dozens of experiments, with separate attention to faces, speech, motion and assembly. One April 5 set found no transcription errors on an 18-word line and a word error rate of 0.083 on a 22-word line. That was evidence about those clips and settings—not a universal 18-word limit. It suggested testing the speech budget rather than endlessly changing a visual prompt.",
        "The same record found that an early audio-quality heuristic did not distinguish an improvement that listening made apparent. That motivated bringing in a learned speech-quality estimator. The evaluator itself needed evaluation: a number that stays flat while the experience changes is not a useful optimization target.",
        "Later experiments shifted attention from individual frames to assembled sequences. Better face scores did not prevent worse transitions. I began treating the cut as its own artifact: compare identity across the boundary, inspect motion discontinuity, and watch the result in sequence. A collection of individually good shots is not automatically a coherent video.",
        "These findings primarily come from the LTX 2.3 workflows. I have also brought LTX 2.5 into the local stack, but installing a newer model does not retroactively make the older measurements results for that model."
      ]
    },
    {
      "id": "h3-loop",
      "title": "H3: close the loop around the rendered artifact",
      "paragraphs": [
        "H3’s evaluation path starts with cheap file and signal checks, then asks whether the speech and sound match the intended scene. The post-render hook records results beside the output. More expensive visual or specialist checks are selective, not something I assume ran just because a video exists.",
        "The useful next action depends on the failure. An isolated bad take may justify a fresh seed. Repeated unwanted narration calls for a different prompt or recipe. A broken script extractor calls for a harness repair, not another render. My operating notes generally allow a small two- or three-candidate retry budget before changing the explanation.",
        "This is an evaluator-guided production loop, not a claim of fully autonomous creative self-improvement. Some retry paths remain driver-specific. Missing checks stay visible as missing evidence, and an acceptable technical result can still be a scene I do not want in the film."
      ],
      "links": [
        {
          "label": "The actual H3 and LTX evaluation findings, including failures",
          "href": "/writing/evaluating-agentic-video"
        }
      ]
    },
    {
      "id": "music",
      "title": "Music taught me to separate generation from composition",
      "paragraphs": [
        "ACE-Step made it possible to turn Fable’s written lyrics into a performed song and to explore different vocal arrangements. Long Exposure taught a different lesson: one long generated score became too uniform. Shorter chapter cues, selected and arranged across the film, gave the edit more shape. The improvement came from composition and selection, not from generating a longer file.",
        "Music3 has been valuable for song and remix exploration. But a reference that influences musical material is not a guarantee of vocal identity. In my own-voice experiments, the more useful path separated song generation, vocal-stem cleanup, and voice conversion instead of expecting every part of the task to be controlled by one prompt or adapter.",
        "A DiT-only Music3 LoRA experiment did not transfer the vocal identity we were testing. That was a valuable negative result: successfully loading trained weights was not evidence that I had gained control over the desired characteristic. Voice-similarity measurements needed listening and matched references, not interpretation as an identity percentage.",
        "Second Winter moved toward explicit composition: lyrics and melody were specified together, then realized through SoulX-Singer. ACE-Step’s continuation modes were not a drop-in way to preserve that already-composed vocal; the experiments regenerated it. Keeping an independent instrumental bed was the more controllable arrangement."
      ],
      "links": [
        {
          "label": "Hear the songs and watch the complete Fable series",
          "href": "/writing/fable-creative-experiments"
        }
      ]
    },
    {
      "id": "supporting-tools",
      "title": "The supporting tools often determine whether a piece works",
      "paragraphs": [
        "In my tested LTX workflows, Qwen-Image-2512 produced AI-generated reference faces that survived lip-sync rendering where several other image sources did not. I treat that as a tested compatibility result, not a general ranking of image models. A beautiful still and a useful animation anchor are different things.",
        "Higgs supplied a voice for Tell Me Again, while ink supplied branching choices. That changed the audience’s role from watching to responding. SeedVR2 belongs later in the workflow, when finishing and resolution matter; it cannot rescue a performance whose timing or expression is wrong. ComfyUI is useful for connecting stages, not as a substitute for evaluating their outputs."
      ]
    },
    {
      "id": "objective",
      "title": "Optimize for an accepted piece, not a winning metric",
      "paragraphs": [
        "A June take-selection experiment made the warning concrete: the better lip-sync score came with worse mouth noise. Optimizing one dimension had selected a less pleasant performance. My response is to preserve candidates and their component scores so I can change the selection rule without paying to regenerate everything.",
        "The objective I care about is time and effort per accepted scene, song, or finished piece. I want repeatable checks, comparison against the existing recipe, and a final watch-and-listen pass. When a result changes the way I work, the wiki records the tested scope, the failure mode, and what the next agent should do differently.",
        "That is the practical value of owning the local stack and working with inspectable tools: I can investigate the failure instead of accepting it as a mysterious property of a product. Automation makes more exploration possible. Editorial judgment gives that exploration a direction."
      ]
    }
  ],
  "basis": "Prepared September 5, 2026 from the LTX autoresearch implementation and experiment wiki, April 5 and April 7 results, June quality-gate and take-selection records, H3 evaluation hooks and operating notes, and the Music3, Fable and Second Winter project archives. The link above credits Karpathy’s original autoresearch pattern. Code link added September 16, 2026.",
  "updated": "2026-09-16",
  "limitations": "This is a selective account of personally tested tools, not an exhaustive catalogue or a controlled comparison between vendors. Recipes and evaluators evolved over time. Historical LTX results are not relabeled as LTX 2.5 results. No new renders or benchmark runs were performed for this article.",
  "related": [
    {
      "label": "Fable’s creative experiments",
      "href": "/writing/fable-creative-experiments"
    },
    {
      "label": "How I build long-running rendering agents",
      "href": "/writing/long-running-ai-agents"
    },
    {
      "label": "The engineering underneath local model performance",
      "href": "/writing/local-model-performance-engineering"
    }
  ]
},
{
  "slug": "local-model-performance-engineering", "work": { "start": "2026-04-01", "end": "2026-08-27", "label": "April–August 2026" },
  "type": "note",
  "topics": ["Inference"],
  "findings": ["After a system update, direct cross-GPU copies mismatched in all 20 recorded trials while host-staged copies matched in all 20, though the driver reported peer access as available.", "In a five-way concurrent run, queued requests waited about 45 and 57 seconds for a first token, while generation ran at about 61–66 tokens per second.", "MTP depth 4 lifted decode from 113.9 to 242.5 tokens/s and C=16 aggregate from 996 to 1,739; depth 12 reached 247.2 decode but only 1,250 aggregate.", "Five-task coding checks scored 400/400 on the functional portion for both MTP runs and the no-MTP control; totals were 475, 480 and 482 out of 500."],
  "title": "Optimizing local AI: kernels, prefill and decode",
  "summary": "Measured tradeoffs in local inference, from Blackwell compatibility and speculative decoding to more trustworthy evaluations.",
  "seoTitle": "Local AI Performance Engineering — Kernels, Prefill, Decode & Evaluators",
  "category": "Field note 06 / Local inference engineering",
  "description": "Seth Pratt’s local AI engineering record: Blackwell kernel compatibility, prefill and decode tuning, speculative decoding, evaluator repairs, and real agent workloads.",
  "lede": "Getting a large model to load on my hardware was the first milestone, not the finish line. The harder work was making it numerically correct, useful under a real agent workload, and measurable without the benchmark fooling me.",
  "takeaway": "Optimize the complete path from prompt to verified artifact. Faster decoding, accurate evaluation, and stable long-running agents are separate engineering problems that have to work together.",
  "facts": [
    {
      "label": "Hardware",
      "value": "RTX PRO 6000 Blackwell & Apple Silicon"
    },
    {
      "label": "Recorded work",
      "value": "April–September 2026"
    },
    {
      "label": "Success criterion",
      "value": "Correct, completed work—not peak tokens/s"
    }
  ],
  "workflow": [
    "Prove compatibility",
    "Test correctness",
    "Measure the workload",
    "Tune one variable",
    "Recheck task quality"
  ],
  "workflowLabel": "My bring-up ladder · speed changes earn their place only after correctness and task checks",
  "sections": [
    {
      "id": "bring-up",
      "title": "The engineering starts before the benchmark",
      "paragraphs": [
        "My local stack has involved serving engines, quantized checkpoints, GPU kernels, tool parsers, caches and evaluation adapters. Much of the underlying kernel work comes from open-source maintainers and community builds. My contribution has been hands-on integration, local patches, controlled bisects, configuration tuning, and finding where apparently compatible pieces stop agreeing.",
        "The DeepSeek bring-up records show why a supported GPU architecture is not a yes-or-no property of a whole model. An attention kernel could work on workstation Blackwell while an output projection or expert kernel still assumed a different architecture. A capability check could pass while a compiled wheel lacked the necessary implementation. Changing a version label was not enough.",
        "The successful path required matching the compiler and runtime, selecting compatible kernels, managing loading-time memory separately from steady-state memory, and testing the resulting system. I would not attribute the later speed gains entirely to my patches: checkpoint, quantization, engine and speculative-decoding changes also mattered."
      ]
    },
    {
      "id": "correctness",
      "title": "Prove that the fast path is still correct",
      "paragraphs": [
        "An August Qwen3.8-27B campaign separated the model, quantization and serving path rather than judging the model from one bad output. One bisect isolated a failure to an FP8-plus-MTP combination in that particular engine. FP8 without multi-token prediction behaved correctly in both eager and compiled modes; another quantized path with MTP also passed the recorded checks. The interaction mattered more than either feature’s name.",
        "A separate multi-GPU incident involved the Linux kernel, not a CUDA compute kernel. After a system update, the driver reported peer access as available, but real transfers told a different story. Direct cross-GPU copies mismatched in all 20 recorded trials; host-staged copies matched in all 20. Collective communication could hang as well.",
        "The workaround avoided the broken peer-to-peer path and tested actual data movement. That experience made a small numerical correctness probe part of the bring-up process. A fast server that silently changes data is not an optimization, and an advertised capability is not an end-to-end test."
      ]
    },
    {
      "id": "metrics",
      "title": "Prefill, decode and waiting are different measurements",
      "paragraphs": [
        "Prefill processes the prompt; decode generates new tokens. Time to first token also includes waiting for a server slot and other overhead. An agent with a long history can spend much of its time on prompt processing even when its visible token stream looks fast.",
        "My April concurrent benchmark recorded first-token timing, generation timing and task results separately. In a five-way run, front-of-queue requests reached a first token in roughly half a second, while queued requests waited about 45 and 57 seconds. Dividing their prompt lengths by that wait produced a misleadingly terrible “prefill” rate. It measured queueing as well as computation.",
        "The post-first-token generation rates in that run were much closer—about 61–66 tokens per second. The lesson was not that the kernel suddenly became a hundred times slower for one request. It was that I needed to distinguish queue delay, prompt processing, per-user decode speed and aggregate throughput.",
        "For long-running agents, I also watch the growth of the conversation and the useful cache working set. A fast short completion is not representative of repeated tool calls carrying a large history. Cached and uncached prompt tests need to be labeled, not blended into a single speed claim."
      ]
    },
    {
      "id": "tuning",
      "title": "A concrete tradeoff: speculative depth versus useful throughput",
      "paragraphs": [
        "An August 27 Qwen3.8-Flash-Next sweep on my two-GPU workstation tested multi-token prediction (MTP), which proposes several tokens ahead for verification. Deeper speculation improved the isolated decode number slightly, but did not improve every workload. It also consumed memory that otherwise supported the key/value cache.",
        "The table is a dated configuration sweep, not a current hardware leaderboard. C=16 means aggregate throughput with sixteen concurrent requests; it is not the speed an individual agent saw. The launch choice also kept memory headroom for the workstation rather than using the most aggressive setting."
      ],
      "table": {
        "caption": "Recorded Qwen3.8-Flash-Next sweep · August 27, 2026 · same two-GPU workstation; configuration varies",
        "headers": [
          "Configuration",
          "Decode tokens/s",
          "Prefill tokens/s",
          "C=16 aggregate tokens/s"
        ],
        "rows": [
          [
            "No MTP baseline",
            "113.9",
            "10,043",
            "996"
          ],
          [
            "MTP depth 4",
            "242.5",
            "7,596",
            "1,739"
          ],
          [
            "MTP depth 12",
            "247.2",
            "7,476",
            "1,250"
          ],
          [
            "Selected: depth 4, batch 16,384, memory utilization 0.92",
            "233.8",
            "9,243",
            "1,712"
          ]
        ]
      }
    },
    {
      "id": "quality-gate",
      "title": "The chosen configuration needed a quality check, too",
      "paragraphs": [
        "Increasing the batch-token limit recovered much of the prefill throughput lost to speculation, while giving up some isolated decode speed. Depth 12 offered little extra decode speed and substantially worse concurrent throughput than depth 4. The choice was a workload tradeoff, not a hunt for the largest number in one column.",
        "The accompanying five-task coding checks recorded 400/400 on the functional portion for both MTP runs and the no-MTP control. Total scores were 475, 480 and 482 out of 500; the spread came from the separate code-quality heuristic. That small sample did not demonstrate a general quality loss—or prove that MTP is always quality-neutral.",
        "These are not the four-task Prime agent scores discussed in my other evaluation note. They come from a different suite and should not be combined. The campaign also had several generations of answer extraction and sampling adapters. A number without its adapter version can be an invalid comparison."
      ],
      "links": [
        {
          "label": "The coding-agent evaluation findings and their caveats",
          "href": "/writing/local-agent-evaluations"
        }
      ]
    },
    {
      "id": "serving",
      "title": "What actually serves on the workstation",
      "paragraphs": [
        "The launch recipes behind this note are public as blackwell-serving-kit, with the DeepSeek work in its own repository. The table is the measured state of each configuration on the two-GPU workstation between April and September 2026: one launcher per row, the single-stream decode rate, and the aggregate rate at the concurrency noted. Rows are not interchangeable: different models, quantizations, engines and dates.",
        "Two of the findings in the repository are worth stating here. The peer-to-peer workaround described above cost nothing measurable on the DeepSeek serve (185.2 tokens per second with P2P disabled against 185.7 with it on), and a two-minute probe now runs after every kernel update before any engine flag is blamed. And the GLM-5.3-Flash NVFP4 checkpoint did not fit for two independent reasons that are written up separately: a quantization that left the attention stack in BF16, and an SM120 sparse-attention kernel that asserts on models without rotary position dimensions."
      ],
      "table": {
        "caption": "Measured serving configurations · two RTX PRO 6000 (SM120) unless noted · April–September 2026 · from the blackwell-serving-kit README",
        "headers": [
          "Model",
          "Format and engine",
          "Single stream",
          "Aggregate"
        ],
        "rows": [
          [
            "Qwen3.8-Flash-Next (125B, 6B active, 51B n-gram table)",
            "FP8, vLLM TP2, table offloaded to host RAM, MTP depth 4",
            "233.8 tokens/s (113.9 without MTP)",
            "1,712 tokens/s at 16 streams"
          ],
          [
            "Qwen3.8-Flash-Next, one GPU",
            "NVFP4, same image with a one-file loader patch",
            "90.6 tokens/s",
            "496 tokens/s at 16"
          ],
          [
            "DeepSeek V4-Flash",
            "NVFP4, community B12X vLLM build with the MTP fix",
            "108.8 to 150.6 tokens/s (+38% from MTP)",
            "—"
          ],
          [
            "DeepSeek V4-Flash",
            "FP8, DSpark speculative build",
            "182 to 186 tokens/s",
            "201 tokens/s at 4"
          ],
          [
            "Ornith-1.5-35B-A3B",
            "bf16, stock vLLM, one GPU",
            "179.5 tokens/s",
            "3,444 tokens/s at 128, not saturated"
          ],
          [
            "Ornith-1.5-397B",
            "NVFP4, vLLM TP2, expert tensors offloaded to pinned RAM",
            "10.9 tokens/s",
            "12.5 tokens/s at 4, PCIe-bound"
          ],
          [
            "GLM-5.3-Flash",
            "TR3 4-bit experts, the author’s vLLM fork",
            "108 to 117 tokens/s",
            "105 to 185 tokens/s at 4"
          ],
          [
            "MiniMax M2.7",
            "NVFP4, SGLang with b12x kernels",
            "120 to 127 tokens/s",
            "408 tokens/s at 16"
          ],
          [
            "Qwen3.8-27B on a Mac Studio M3 Ultra",
            "oQ4e, oMLX dual-ANE prefill and MTP",
            "81 tokens/s on code, 59 on prose",
            "78 tokens/s at 4; prefill +22% at 32K"
          ]
        ]
      },
      "links": [
        {
          "label": "blackwell-serving-kit: launchers, patches, the P2P probe and the write-ups",
          "href": "https://github.com/sipratt-p/blackwell-serving-kit"
        },
        {
          "label": "dsv4-flash-nvfp4-sm120: the DeepSeek kit and the MTP investigation",
          "href": "https://github.com/sipratt-p/dsv4-flash-nvfp4-sm120"
        },
        {
          "label": "omlx-dualane-recipe: the Mac Studio reproduction pack",
          "href": "https://github.com/sipratt-p/omlx-dualane-recipe"
        }
      ]
    },
    {
      "id": "evaluators",
      "title": "Better evaluators required software work, not just more GPU",
      "paragraphs": [
        "Kernel tuning and evaluator quality are connected operationally, but they are not the same improvement. A faster inference path does not make a score more meaningful. In one coding incident, fixing final-answer extraction changed the recorded score from 17/100 to 97/100 without changing the model’s answer at all.",
        "For video, using a persistent, stronger speech-recognition service avoided repeatedly loading a small local transcriber and helped keep rendering and evaluation from fighting over resources. The current LTX quality-gate code can still fall back to a smaller transcriber. That fallback must travel with the result: changing the evaluator backend can change what a word-error score means.",
        "I also check evaluator availability and parsing explicitly. An empty extracted script or a skipped visual check is missing evidence, not a passed creative requirement. These repairs improve the validity of the evaluation; serving and kernel work make it more practical to run it often.",
        "On the agent side, tool parsers, sampling defaults and reasoning budgets affect whether inference becomes action. A local GLM experiment became much more useful with a bounded thinking budget rather than letting reasoning consume the turn. Timeouts and context-limit exits remain inconclusive capability results, while still counting as unfinished work for the person waiting."
      ]
    },
    {
      "id": "record",
      "title": "How much of this work did I actually record?",
      "paragraphs": [
        "There is a substantial trail: dated experiment notes, launch recipes, benchmark runners, raw run artifacts, a factorized Qwen campaign manifest, and correction notes when an earlier explanation turned out to be wrong. Together they document months of bring-up and optimization work.",
        "They are not a complete timesheet. Some old checkpoints were removed for storage, some settings changed between campaigns, and some investigations ended with a working recipe rather than a final report. I can reconstruct the sequence below; I cannot honestly turn it into a precise lifetime total of hours or an across-the-board speedup."
      ],
      "table": {
        "caption": "A reconstruction from dated records—not a complete work log",
        "headers": [
          "Period in 2026",
          "Documented thread of work"
        ],
        "rows": [
          [
            "April",
            "Concurrent prompt/decode timing and task-quality measurement"
          ],
          [
            "June–August",
            "DeepSeek workstation-Blackwell compatibility and agent-stability bring-up"
          ],
          [
            "August 15–16",
            "Qwen3.8-27B engine/quantization bisects and adapter-version controls"
          ],
          [
            "August 23–24",
            "Multi-GPU communication correctness and host-staged workarounds"
          ],
          [
            "August 27",
            "Qwen3.8-Flash-Next MTP, batch sizing, memory headroom and quality checks"
          ],
          [
            "August 28 onward",
            "Thinking budgets, long-context behavior and creative-runtime experiments"
          ]
        ]
      }
    },
    {
      "id": "opensource",
      "title": "Why I keep doing this locally",
      "paragraphs": [
        "What draws me to local AI and open source is the ability to inspect the whole chain. I can preserve a working version, compare an adaptation against its base, examine a numerical failure, and build an agent around a task rather than a generic chat window.",
        "Open weights, open-source software and a community-maintained kernel are different things; I do not assume every component has the same license or level of visibility. But the inspectable parts let me turn a failure into something reusable: a test, a correction, a safer default, or a recipe the next agent can follow.",
        "My preferred performance metric is becoming time to a correct, accepted artifact under the workload I actually run. Decode speed still matters. So do the minutes before the first token, the evaluator that catches a bad result, and the recovery path when a long-running task goes wrong."
      ]
    }
  ],
  "basis": "Prepared September 5, 2026 from the April concurrent-prefill experiment and timing runner, DeepSeek SM120 bring-up records, the Qwen campaign artifact manifest, the August multi-GPU correctness incident, the August 27 launch-book sweep and quality checks, GLM thinking-budget notes, and current LTX evaluator code. Serving table and code links added September 16, 2026 from the published repositories.",
  "updated": "2026-09-16",
  "limitations": "All numbers are historical observations from my own hardware and evolving harnesses; none were remeasured for this article. Different suites, checkpoint revisions, cache states and adapter generations are not interchangeable. Kernel contributions are credited as integration and local engineering rather than sole authorship of upstream implementations. The chronology is incomplete and does not support a total-hours claim.",
  "related": [
    {
      "label": "The creative experiments these systems make possible",
      "href": "/writing/creative-ai-tools-autoresearch"
    },
    {
      "label": "Long-running, task-specific local agents",
      "href": "/writing/long-running-ai-agents"
    }
  ]
},
{
  slug: 'ambient-clinical-documentation-open-weights', type: 'note', work: { start: '2026-09-11', end: '2026-09-16' }, topics: ["Evals"], findings: ["On 57 mock consultations, MOSS-Transcribe-Diarize and Sortformer + Parakeet v3 had similar word error rates (10.3%, 11.2%) but medical-term miss rates of 8.4% and 15.1%.", "One epoch of LoRA fine-tuning lifted ROUGE-L by 8.6 points, while speaker misattributions doubled to tripled and recall of follow-up instructions went down.", "On three held-out splits, the claim-level verifier recalled 98.7 to 99.6 percent of deliberately injected errors; how many of a model’s own mistakes it catches is unmeasured."],
  title: 'Ambient clinical documentation on open weights', summary: 'What seven speech recognizers, a LoRA fine-tune and a claim-level verifier did on open mock consultations, and where fluency metrics hide the damage.',
  seoTitle: 'Ambient Clinical Scribe Evaluation — Open Data, ASR, LoRA & a Verifier', category: 'Field note 07 / Clinical speech-to-note',
  description: 'Seth Pratt’s scribe-bench study: seven ASR systems, note generation, LoRA fine-tuning and a claim-level verifier evaluated on PriMock57 and ACI-Bench with clinician-defined scorers.',
  lede: 'Ambient clinical documentation is a product category built on a pipeline: transcribe the visit, attribute who said what, write the note, check the note. I wanted to know how far open data and open-weight models get on each stage, and which measurements tell the truth about them.',
  takeaway: 'Overlap metrics reward fluency. Clinician-defined dimensions catch what fluency hides: misattributed speakers, missing follow-ups, and claims the transcript never supported.',
  facts: [{ label: 'Data', value: 'PriMock57 & ACI-Bench (mock consultations, CC BY 4.0)' }, { label: 'Systems', value: '7 ASR stacks · Qwen3.8-27B notes · LoRA · verifier' }, { label: 'Status', value: 'Non-commercial study, code and paper draft public' }],
  workflowLabel: 'The study pipeline · each stage scored on held-out splits before the next one used its output',
  workflow: ['Transcribe & diarize', 'Score the transcript', 'Generate the note', 'Verify each claim', 'Accept only what held on test'],
  prepared: '2026-09-16', updated: '2026-10-09',
  sections: [
    { id: 'question', title: 'A pipeline, not a model', paragraphs: [
      'The commercial products in this space are judged on the note. But the note inherits every error made upstream: a dropped medication name in transcription, a line attributed to the doctor that the patient said, a follow-up instruction that never made it into the summary. I built scribe-bench to measure those stages separately, on data anyone can download, with open-weight models on my own hardware.',
      'Everything in the study is a mock or synthetic consultation: PriMock57 (57 recorded mock primary-care visits with transcripts and notes) and ACI-Bench, MTS-Dialog and MedSynth for note generation and fine-tuning. No real patients, no proprietary data, and no claim that the results transfer to a clinic. The point was the evaluation method.'
    ] },
    { id: 'asr', title: 'Transcription: the medical-term miss rate is its own number', paragraphs: [
      'Seven speech-recognition stacks ran on the 57 PriMock57 consultations, scored on word error rate, the miss rate on medical terms specifically, diarization error where the system produced speaker turns, and the share of words attributed to the wrong speaker. Word error rate alone would rank the top three systems as roughly equal. The medical-term column does not.',
      'The last row is a reminder that a capable model in the wrong mode is a different system: the same family that transcribes competently as a dedicated recognizer produced an 88 percent diarization error when prompted as a chat model.'
    ], table: { caption: 'PriMock57, 57 consultations · from the scribe-bench results file, September 2026', headers: ['System', 'Word error rate', 'Medical-term miss', 'Diarization error', 'Misattributed words'], rows: [
      ['MOSS-Transcribe-Diarize 0.9B', '10.3%', '8.4%', '11.4%', '1.0%'],
      ['Sortformer + Parakeet v3', '11.2%', '15.1%', '11.1%', '1.3%'],
      ['Canary-Qwen 2.5B', '11.6%', '9.4%', 'no diarization', 'not applicable'],
      ['Nemotron Nano Omni, chat prompt', '27.2%', '15.7%', '88%', '32%']
    ] } },
    { id: 'notes', title: 'Note generation: the fine-tune that looked like an improvement', paragraphs: [
      'Qwen3.8-27B wrote visit notes from three transcript sources: the human transcript, the raw ASR output, and a corrected ASR output. The gap between the first and the second is the ceiling on what better transcription buys the note.',
      'One epoch of LoRA fine-tuning on open transcript-and-note pairs lifted ROUGE-L by 8.6 points on 120 ACI-Bench encounters, which is the kind of result that gets announced. The clinician-defined scorers told the other half: speaker misattributions doubled to tripled, and recall of follow-up instructions went down. The tuned model had learned the shape of a note faster than the discipline of one.',
      'A second lesson from the same runs: if you want the note to cite the transcript, the citations have to be in the fine-tuning targets. Tuning on uncited notes erased the grounding behaviour the base model had shown.'
    ] },
    { id: 'verifier', title: 'A claim-level verifier, and what its recall does not mean', paragraphs: [
      'The last stage splits a note into claims and checks each against the transcript. On three held-out splits the verifier recalled 98.7 to 99.6 percent of errors that had been injected into notes deliberately.',
      'Injected errors are not natural errors. The number says the verifier catches the classes of mistake we knew to inject; it does not say how many of a model’s own mistakes it catches, which needs a labelled set of real generation errors. That distinction is written next to the number in the repository, because a verifier presented without it becomes a false guarantee.',
      'Speaker attribution had its own check: several LLM judges scored the same 74 notes for who-said-what, and their agreement is measured rather than assumed.'
    ] },
    { id: 'loop', title: 'An overnight loop that only keeps what survives the test slice', paragraphs: [
      'Configuration search ran as an autoresearch loop in the pattern I use for video: a bounded set of knobs (prompting, ASR variant, correction, role mapping, scaffolding), one change per trial, and acceptance only if the candidate improved on the validation slice and did not regress on the test slice. The queue of trials and the decisions are part of the repository.',
      'The loop is a search over configurations, not training. Its value was disqualifying plausible ideas quickly: prompt variants, transcript correction, a reasoning scaffold and a verifier gate all gained on the development visits and failed on the held-out set.'
    ] },
    { id: 'limits', title: 'What this study cannot claim', paragraphs: ['The boundaries are the same ones I would want to read on anyone else’s evaluation:'], bullets: [
      'Mock consultations are cleaner than real ones. Real audio has cross-talk, accents, background noise and longer visits.',
      'The clinician-defined scorers are modelled on published evaluation dimensions, not reviewed by clinicians on this data.',
      'ROUGE and BERTScore are reported because they are standard, not because they are trusted.',
      'The verifier’s recall is on injected errors only.',
      'This is a non-commercial study to understand the problem space. It is not a product, and nothing here is clinical advice.'
    ] }
  ],
  basis: 'Prepared September 16, 2026 from the scribe-bench repository: its results file, run logs, the autoresearch queue and decisions, and the paper draft kept alongside the code. Numbers are the recorded values from the September 11–13, 2026 runs, including the re-runs on official model weights; nothing was re-run for this note. Three details were corrected against the paper draft on October 9, 2026.',
  limitations: 'Open mock data only, one hardware setup, and evolving scorers. The ASR table covers 57 consultations and the note-generation findings one model family. No clinician review of the scorers on this data, and no claim of clinical validity or transfer to real visits.',
  related: [{ label: 'scribe-bench: code, results and the paper draft', href: 'https://github.com/sipratt-p/scribe-bench' }, { label: 'The same evaluation discipline on coding agents', href: '/writing/local-agent-evaluations' }, { label: 'The workstation these models ran on', href: '/writing/local-model-performance-engineering' }]
},
{
  slug: 'finding-song-starts-in-dj-mixes', type: 'note', work: { start: '2026-09-14', end: '2026-09-15' }, topics: ["Evals", "Products"], findings: ["Against 190 DJ-published boundaries in eight public mixes, the full system placed 99 within 10 seconds and 144 within 30; fingerprints alone placed 62 within 10.", "Cut-style mixes hit a 3-second median error on hardstyle and 6 seconds on dancehall; peak-time house sat at a 39-second median.", "With no fingerprint service, preview alignment plus the page’s titles scored 20 of 24 within 20 seconds on the dancehall mix.", "Multimodal language models placed boundaries no better than a novelty curve; beat-grid snapping changed nothing; three times more minute-resolution labels gave no clear gain."],
  title: 'Finding where songs start inside a DJ mix', summary: 'What eight public mixes and 190 DJ-published timestamps taught me about fingerprints, transition detectors, and the limits of “correct”.',
  seoTitle: 'Song-Start Detection in DJ Mixes — Fingerprints, Transition Detector & Measured Accuracy', category: 'Field note 08 / Audio machine learning',
  description: 'Seth Pratt’s measurements of song-start detection inside DJ mixes: fingerprint offsets, a transition detector, preview alignment, per-genre accuracy against DJ-published timestamps, and the approaches that did not help.',
  lede: 'The product question behind Cue is simple: where does each song start inside a mix? Answering it well turned out to be a measurement problem first. There is no ground truth, only the timestamps DJs publish, and even humans disagree by about nine seconds.',
  takeaway: 'Report accuracy by genre and by tolerance window, against the labels people actually publish. A single number would have hidden that cut-style mixes are solved and beat-matched blends are not.',
  facts: [{ label: 'Data', value: '8 public mixes · 190 DJ-published boundaries' }, { label: 'Method', value: 'Fingerprints + transition detector + preview alignment' }, { label: 'Code', value: 'cue-engine, open source, CPU only' }],
  workflowLabel: 'The resolver’s order of evidence · a published timestamp always wins over a detector',
  workflow: ['Read the tracklist', 'Fingerprint the mix', 'Align preview clips', 'Place the cut', 'Score against DJ timestamps'],
  prepared: '2026-09-16',
  sections: [
    { id: 'labels', title: 'The label is a human guess too', paragraphs: [
      'DJ mixes have no canonical boundaries. A beat-matched blend can run thirty seconds with two songs audible; the DJ who typed the tracklist picked one moment. Published inter-annotator disagreement on DJ-mix boundaries is about 9 seconds, so any score within that band is at the level of a person, and precision beyond it is not measurable with these labels.',
      'That shaped the evaluation: boundaries scored within 10, 20 and 30 seconds of the DJ’s timestamp, per mix and per genre, with the fingerprint-only baseline reported beside the full system on the same mixes.'
    ] },
    { id: 'anchors', title: 'Three anchors that know different things', paragraphs: [
      'Fingerprinting identifies which song is playing and roughly when it was first heard, but its offsets are late and jittery inside a blend. A small transition detector, trained on the public DJ Mix Dataset, does not know which song is which but is good at where the cut is; placed just before the fingerprint’s first sighting it gives the exact start. Free 30-second preview clips of the tracklist’s titles, aligned into the mix with tempo-tolerant chroma DTW, anchor songs with no fingerprint service at all; published tracklists name remixes correctly and set the song count when nothing fingerprints.',
      'A resolver combines them with a fixed order of trust: a DJ-typed timestamp beats everything, then fingerprint plus detector, then alignment, then the detector alone.'
    ] },
    { id: 'results', title: 'Per-genre results', paragraphs: ['Boundaries within each window, per mix, against the DJ’s published timestamps. The last column is what fingerprint offsets alone achieve within 10 seconds on the same mix.'], table: { caption: 'Blind scores against DJ-published timestamps · eight public mixes · from the app README, September 2026', headers: ['Mix (genre)', 'Songs', 'Within 10 s', 'Within 20 s', 'Within 30 s', 'Median error', 'Fingerprints alone, within 10 s'], rows: [
      ['Dancehall', '24', '20', '21', '23', '6 s', '17'],
      ['Ragga jungle', '19', '10', '16', '17', '10 s', '6'],
      ['Peak-time house', '21', '4', '7', '7', '39 s', '4'],
      ['Live set, 2.5 h melodic house', '28', '9', '11', '19', '24 s', '9'],
      ['Melodic house live set', '18', '10', '12', '14', '10 s', '6'],
      ['B2B progressive live set', '18', '7', '9', '11', '22 s', '3'],
      ['Berlin house and techno', '13', '5', '7', '9', '19 s', '2'],
      ['Euphoric hardstyle, 50 tracks', '49', '34', '40', '44', '3 s', '15'],
      ['All', '190', '99', '123', '144', '', '62']
    ] } },
    { id: 'reading', title: 'How to read that table', paragraphs: [
      'Cut-style mixes are solved to the limit of the labels: hardstyle at a 3-second median, dancehall at 6. Long beat-matched house blends are not: a 39-second median on peak-time house means the engine is in the right neighbourhood and no better, and the fingerprint baseline is nearly as good there because the blend itself is the ambiguity. Reporting one aggregate, 99 of 190 within 10 seconds, would have hidden both facts.',
      'Without any fingerprint service, preview alignment plus the page’s titles scores 20 of 24 within 20 seconds on the dancehall mix, and is weak on remixes, where the preview clip is a different recording. The detector alone, with no catalogue, is well behind fingerprints on catalogue songs and is the fallback of last resort.'
    ] },
    { id: 'negative', title: 'What did not help, measured', paragraphs: ['Three ideas were tried and recorded as negative results rather than dropped quietly:'], bullets: [
      'Multimodal language models listening to the audio placed boundaries no better than a novelty curve, and invented song titles.',
      'Snapping boundaries to a beat grid changed nothing against DJ-typed timestamps.',
      'Retraining the transition detector on three times more minute-resolution labels gave no clear gain. Label precision, not data volume, is the limit.'
    ] },
    { id: 'product', title: 'What the measurement changed in the product', paragraphs: [
      'The player treats a detected start as a draft: marks can be corrected by hand while listening, and a pasted tracklist or embedded chapters always override detection. The engine writes ordinary MP4 chapters so that nothing about the mix file is proprietary, and the right long-term source of truth is the DJ publishing a cue sheet, not a better detector.',
      'The fingerprint provider is a boundary I keep explicit: one service is licensed for application use, the unofficial client is personal-use only and stays out of any distributed build. Being precise about that is part of publishing the engine at all.'
    ], links: [{ label: 'cue-engine on GitHub', href: 'https://github.com/sipratt-p/cue-engine' }, { label: 'The Cue project page', href: '/work/cue' }] }
  ],
  basis: 'Prepared September 16, 2026 from the cue-engine repository, its README accuracy tables, the Cue-iOS README’s detection-accuracy section and the resolver code. All figures are the recorded blind scores; no mixes were re-run for this note.',
  limitations: 'Eight mixes and 190 boundaries in a handful of genres, scored against DJ-published timestamps that are themselves approximate. The per-genre rows are single mixes, not genre averages. Fingerprint results depend on the provider and the catalogue it covers.',
  related: [{ label: 'Cue: the player and the engine', href: '/work/cue' }, { label: 'The same evaluation discipline on coding agents', href: '/writing/local-agent-evaluations' }, { label: 'How I evaluate video renders', href: '/writing/evaluating-agentic-video' }]
},
{
  slug: 'refusal-ablation-measured', type: 'note', work: { start: '2026-08-15', end: '2026-08-21' }, topics: ["Evals"], findings: ["Ablating per-layer directions on all forty layers, without editing the token embedding, cut refusals from ten or eleven of twelve to zero; the coding suite stayed at 489/500.", "Adding the original recipe’s token-embedding edit also removed refusals but dropped the suite to 400/500, with the parser collapsing from 98 to 13.", "Reducing the edit scale to 0.85 and 0.70 left the parser at 13 and 11; the damage was structural, not dosage.", "The only community “abliterated” upload of this model refused ten of twelve prompts, the base rate; it was a no-op."],
  title: 'Refusal ablation, measured', summary: 'What removing the refusal direction from a mixture-of-experts model cost in capability, which implementation choice decided it, and what a community “abliterated” upload actually did.',
  seoTitle: 'Abliteration Measured — Refusal Ablation on MoE Models, Capability Cost & Community Uploads', category: 'Field note 09 / Model adaptation',
  description: 'Seth Pratt’s refusal-ablation-eval study: refusal-direction ablation on Ornith-1.5-35B-A3B with matched benign controls and a coding-suite gate, a dense-model confirmation, and two open items.',
  lede: 'Abliteration, the removal of a refusal direction from a model’s weights, is easy to claim and rarely measured. I ran it on a mixture-of-experts model with a matched benign control and a capability gate, and found that the recipe detail nobody benchmarks is the one that decides whether the model survives.',
  takeaway: 'Done right, refusal ablation on this model cost nothing measurable. Done the way the original recipe does it, it removed the refusals and broke the parser. The only way to tell the two apart is to measure both.',
  facts: [{ label: 'Study model', value: 'Ornith-1.5-35B-A3B (MoE, 3B active), bf16' }, { label: 'Gate', value: '5-task coding suite, same engine as the base' }, { label: 'Status', value: 'Scripts, prompts and results public; no weights' }],
  workflowLabel: 'The measurement loop · every variant probed on the same prompts and gated on the same suite',
  workflow: ['Find the direction', 'Edit the weights', 'Probe refusals both ways', 'Gate on the coding suite', 'A/B against the upload'],
  prepared: '2026-09-23',
  sections: [
    { id: 'question', title: 'A label on an upload is not a measurement', paragraphs: [
      'Refusal-direction ablation follows a published result: instruction-tuned models mediate refusal through a single direction in the residual stream, and projecting that direction out of the weights removes the behaviour. Model hubs are full of uploads that claim to have done it. Almost none of them show what it cost, and I had seen enough “abliterated” builds produce nonsense to want the numbers.',
      'The study model is Ornith-1.5-35B-A3B, a 35B hybrid-attention mixture-of-experts model with 3B active parameters, in bf16, served by oMLX on a Mac Studio and by vLLM on two RTX PRO 6000 GPUs. Three things made it a measurement rather than a demonstration: a benign prompt set matched topic for topic to the refusal set, so over-refusal and under-refusal are both visible; a capability gate, the five-task coding suite from my coding-agent-bench, run against the base and every variant on the same engine; and a check of the one community upload of this model against its base.'
    ] },
    { id: 'direction', title: 'The direction is there from the early-mid stack', paragraphs: [
      'Thirty-two refusal-triggering prompts and thirty-two benign counterparts run through the chat template, and the residual stream at the last prompt token is recorded after every layer. Each layer gets its own mean-difference direction, scored by how far apart the two projected sets sit in pooled-standard-deviation units.',
      'The separation is not confined to the late layers where it peaks. It passes four standard deviations at layer 13 and six by layer 24, peaking at 6.43 on layer 32 of 40. That shape is the reason the late-layers-only variant below fails: a refusal signal present from the middle of the stack cannot be removed by editing the top of it.'
    ], table: { caption: 'Per-layer separation of refusal and benign prompts, pooled-standard-deviation units · from the direction scan in the repository', headers: ['Layer', '0', '6', '13', '18', '24', '28', '32', '36', '39'], rows: [
      ['Separation', '0.94', '2.23', '4.29', '5.62', '6.00', '6.23', '6.43', '6.06', '5.71']
    ] } },
    { id: 'matrix', title: 'The embedding edit is what breaks the model', paragraphs: [
      'The winning configuration applies each layer’s own direction to every projection that writes into the residual stream, on all forty layers, and leaves the token embedding alone. Refusals go from ten or eleven of twelve to zero, the matched benign set produces no false refusals, and the coding suite stays at 489/500, identical to the base task for task. Decode and prefill speed are unchanged.',
      'The original recipe also edits the token embedding. Applied that way, the same directions still reach zero refusals but drop the suite to 400/500: four tasks are untouched and the recursive-descent parser collapses from 98 to 13. Reducing the edit scale to 0.85 and 0.70 leaves the parser at 13 and 11. It is structural, not dosage. Restricting the edit to layers 20 and above brings the refusals back to ten of twelve and still breaks the parser, and a single global direction from the best layer, applied everywhere, is too weak: eleven of twelve becomes nine.',
      'The community upload of this model, which claims all-forty-layer directional ablation and shows no benchmarks on its card, refuses ten of twelve prompts. That is the base rate. It was a no-op.'
    ], table: { caption: 'Ornith-1.5-35B-A3B · same stack, same probes, same suite · from the repository results', headers: ['Variant', 'Refused harmful /12', 'False refusals /12', 'Coding suite /500', 'Parser task /100'], rows: [
      ['Base bf16 (control)', '11 (10 on a second run)', '0', '489', '98'],
      ['One global direction, no embedding edit', '9', '0', '–', '–'],
      ['Per-layer directions plus the embedding edit', '0', '0', '400', '13'],
      ['Same, scale 0.85 / 0.70', '–', '–', '–', '13 / 11'],
      ['Per-layer, all layers, no embedding edit (shipped)', '0', '0', '489', '98'],
      ['Per-layer, no embedding edit, layers 20 and above only', '10', '0', '–', '11'],
      ['Community “abliterated” upload', '10', '0', '–', '–']
    ] } },
    { id: 'confirmation', title: 'A dense model tells the same story', paragraphs: [
      'A same-recipe pair of Qwen3.8-27B builds, an abliterated model and its non-abliterated sibling from the same forge with the same quantization layout, scores 483/500 each, identical task for task, at the same speed. Earlier results that had me calling abliterated Qwen junk, with suite scores between 30 and 67 percent, traced to bad conversions and a broken CUDA path, not to the ablation. Blaming the technique for an infrastructure fault is the kind of mistake the gate exists to catch.'
    ] },
    { id: 'open', title: 'Two open items, kept visible', paragraphs: [
      'The same per-layer directions ported to the Hugging Face safetensors checkpoint and served by vLLM scored 379/500 against a 489 base on the same engine, with the parser at 13 and the trie at 72. The candidates are the stacked-expert edit in the HF path, the speculative-decoding draft head being edited with the global direction, or a packing mismatch. It is not root-caused, and the repository says so rather than quietly dropping the row.',
      'Separately, a community-abliterated DeepSeek-V4-Flash derailed three times in twelve agentic tasks, producing runs of begin-of-sentence tokens followed by off-distribution text, where the non-ablated comparison model had none. Speculative decoding and the ablation edit were not isolated in that run, so it stays an observation, not a finding.'
    ] },
    { id: 'discipline', title: 'What I would insist on before trusting an abliteration', paragraphs: ['The repository holds the scripts, the prompt set and the measurements. No weights are distributed. What it really contributes is the discipline around the technique:'], bullets: [
      'Confirm the base model refuses the probe set before measuring the variant, or you will prove an ablation that did nothing.',
      'Judge the final answer, not the reasoning trace; these models deliberate about refusing and then comply, or the reverse. Keep the token budget generous or truncated thinking scores as a refusal.',
      'Run a benign set matched by topic, so over-refusal is measured and not assumed away.',
      'Gate on a capability suite against the base on the same engine, and accept the variant only within a few points.',
      'A/B every community upload against its base before believing the card.'
    ] }
  ],
  basis: 'Prepared September 23, 2026 from the refusal-ablation-eval repository: the probe tables, the direction scan, the coding-suite result files and the run notes from August 2026. Numbers are the recorded values; nothing was re-run for this note.',
  limitations: 'One mixture-of-experts model studied in depth and one dense confirmation. Twelve probe prompts per side, judged by a marker list on the final answer, and a five-task coding suite as the only capability gate. The Hugging Face port loss and the DeepSeek derailments are open. No weights are published, and nothing here is a safety recommendation.',
  related: [{ label: 'refusal-ablation-eval: scripts, prompt set and measurements', href: 'https://github.com/sipratt-p/refusal-ablation-eval' }, { label: 'The coding suite used as the gate', href: '/writing/local-agent-evaluations' }, { label: 'The workstation and serving setups', href: '/writing/local-model-performance-engineering' }]
},
{
  slug: 'private-local-ai-assistant', type: 'note', work: { start: '2026-04-23', end: '2026-09-24', label: 'April 23–25 and September 24, 2026' }, topics: ["Products", "Evals"], findings: ["The earlier build passed hundreds of unit tests while its Tor mode fetched pages from the real IP address.", "After the fixes, every remote endpoint the app opened during a search was a Tor relay, and none was a website.", "After an encrypted session, a search of the whole profile directory for the chat’s name, question and answer found nothing.", "On a 32-case grounded-answer benchmark run twice per model, Gemma 4 E4B scored 98.4% and Qwen3.8 27B 96.9%, at 223 and 56 tokens/s."],
  title: 'A private AI assistant, tested end to end', summary: 'What a clean-install test with network captures found in a local AI app built for privacy, what it took to fix, and how a benchmark picked its model.',
  seoTitle: 'Private Local AI Assistant — End-to-End Test, Tor & VPN Leak Captures, Model Benchmark', category: 'Field note 10 / Private local AI',
  description: 'Seth Pratt’s Confidential Research Platform: a local AI assistant with encrypted chats and private web search over Tor or WireGuard, tested end to end with network captures and a 14-model benchmark.',
  lede: 'Confidential Research is a desktop app that runs an open model on your own computer, encrypts the chats you save and, when you allow it, searches the web through Tor or your own VPN. Before calling it ready I tested it the way a new user meets it: a clean profile, every screen driven automatically, and the app’s network connections captured at the system level while it searched.',
  takeaway: 'A privacy feature is a claim about network traffic, so the test has to capture the traffic. The earlier build passed hundreds of unit tests while its Tor mode fetched pages from the real IP address.',
  facts: [{ label: 'Stack', value: 'Rust + Tauri 2 · Svelte 5 · llama.cpp in-process' }, { label: 'Private search', value: 'Built-in Tor or in-app WireGuard, no admin rights' }, { label: 'Status', value: 'Beta on Linux · open source (AGPL-3.0)' }],
  workflowLabel: 'How each fix was accepted · the same automated run, plus a capture of the app’s connections',
  workflow: ['Clean profile', 'Drive every screen', 'Capture connections', 'Fix', 'Re-run and re-capture'],
  prepared: '2026-09-24',
  sections: [
    { id: 'test', title: 'The test: a new user and a packet-level witness', paragraphs: [
      'The harness drives the real desktop app through WebDriver: it installs, chats, turns on private search, creates an encrypted chat and restarts, taking a screenshot at each step. While the app searched, a root-level socket capture listed every remote endpoint it had open, and each address was looked up in the Tor Project’s relay directory.',
      'The capture matters because it does not trust the app. A badge that says Tor, a log line that says the tunnel is up and a passing unit test are all things the code says about itself. The socket table is what the operating system says.'
    ] },
    { id: 'found', title: 'What the first run found', paragraphs: [
      'The earlier build did not work as a product, and its privacy features protected no one. The Tor leak came down to one line: the HTTP client was given the Tor proxy and then told to ignore proxies, which in the current version of the library clears the proxy it had just been given. Pages went out directly while Tor sat idle.'
    ], table: { caption: 'Clean-profile run on the earlier build · September 24, 2026', headers: ['Area', 'Result', 'What happened'], rows: [
      ['First-run install', 'Broken', 'The installer stepped through its screens without downloading anything'],
      ['Chat', 'Broken', 'Raw reasoning shown, answers cut off at 512 tokens, everyday questions refused'],
      ['Web search over Tor', 'Leaked the real IP', 'Page fetches bypassed Tor; the capture showed direct connections to the sites'],
      ['VPN', 'Never routed', 'Needed root to create a network device and sent no traffic through it'],
      ['Encryption', 'Could not be enabled', 'Setting a passphrase always failed; saved chats were plain text on disk']
    ] } },
    { id: 'fixed', title: 'After the fixes: evidence instead of assertions', paragraphs: [
      'Tor is now built in, and searches go to DuckDuckGo’s onion service, so the query never reaches an exit relay. In the re-run, every remote endpoint the app opened during a search was a Tor relay and none was a website. The VPN is WireGuard running inside the app, with no admin rights and no system changes. Its only non-loopback socket is the WireGuard connection, so if the tunnel drops, requests fail instead of leaking.',
      'Saved chats are encrypted with the user’s passphrase. After a session, a search of the whole profile directory for the chat’s name, question and answer found nothing. Documents attached to an encrypted chat go into an encrypted index: questions about a PDF lease were answered exactly, citing the page, with none of the lease text readable on disk.'
    ] },
    { id: 'models', title: 'Choosing the model with the app’s own benchmark', paragraphs: [
      'The benchmark runs 32 cases through the app’s real prompts, each model’s own chat template and the same inference loop: answering from given sources with correct citations, saying so when the sources do not contain the answer, conflicting sources, a prompt-injection trap inside a source, a Spanish source, formatting and date arithmetic. Every model ran twice with fixed seeds, and every failure was read by hand. Several were the scorer’s fault rather than the model’s, and the scorer was fixed before any ranking was trusted.',
      'The table is not the whole decision. Small models do well on grounded answering, which is what this benchmark measures, while larger models are far ahead on general knowledge and reasoning. So setup recommends Qwen3.8 27B wherever it fits, a 2-bit version of it on 12 to 16 GB graphics cards, and the small Gemma 4 E4B only on 8 GB machines.'
    ], table: { caption: 'Grounded-answer benchmark · 32 cases × 2 seeds · 8 of the 14 models tested · one RTX PRO 6000', headers: ['Model', 'Score', 'Tokens/s'], rows: [
      ['Gemma 4 E4B', '98.4%', '223'],
      ['Qwen3.8 27B', '96.9%', '56'],
      ['Qwen3.6 35B-A3B', '96.9%', '182'],
      ['Qwen3.8 27B, 2-bit', '93.8%', '75'],
      ['Qwen3.5 9B', '93.8%', '163'],
      ['Ornith 1.5 35B-A3B', '92.2%', '184'],
      ['Nemotron 3.5 Lightning 30B-A3B', '84.4%', '248'],
      ['MiniCPM5 2B', '75.0%', '308']
    ] } },
    { id: 'search', title: 'Which search engines answer over Tor', paragraphs: [
      'Search over Tor is its own problem, because most engines treat Tor exits as bots. Probed through a stock Tor client over three rounds of fresh circuits, DuckDuckGo’s onion service and the Wikipedia API answered every time. Bing returned HTTP 200 with results unrelated to the query, which is worse than an error. Brave, Startpage, Qwant, Mojeek, MetaGer and Yahoo returned CAPTCHAs, rate limits or errors. The app uses the onion service plus Wikipedia on Tor, and DuckDuckGo plus Wikipedia over a VPN.'
    ] },
    { id: 'limits', title: 'What this does not claim', paragraphs: ['The boundaries, stated the way I would want to read them on anyone else’s privacy tool:'], bullets: [
      'Linux is the tested platform. Mac and Windows builds are not produced yet.',
      'There has been no external security audit.',
      'Private search hides your address from websites. It does not hide from your internet provider that you use Tor, and it cannot protect identifying details you type into a question.',
      'Nothing here protects against malware already on the computer.',
      'The benchmark measures grounded answering, citation and abstention on 32 cases, not general intelligence, and every speed comes from one workstation.'
    ] }
  ],
  basis: 'Prepared September 24, 2026 from the confidential-research-platform repository: the results document, the end-to-end harness, the benchmark cases and rescored results, and the socket captures recorded during the runs. Numbers are the recorded values from those runs.',
  limitations: 'One workstation for every speed, Linux only, a 32-case benchmark weighted toward grounded answering, and no independent audit of the privacy claims beyond the captures described here.',
  related: [{ label: 'confidential-research-platform: code, results and runbook', href: 'https://github.com/sipratt-p/confidential-research-platform' }, { label: 'The same evaluation discipline on coding agents', href: '/writing/local-agent-evaluations' }]
},
{
  slug: 'chaos-with-nothing-to-orbit', type: 'note', work: { start: '2026-10-06', end: '2026-10-09' },
  title: 'Chaos with nothing to orbit',
  summary: 'A seven-term chaotic system with no resting point anywhere in space, found by a GPU search and checked at 64-bit precision, and what we can and can’t claim about it.',
  seoTitle: 'Conch — A Hidden Chaotic Attractor With No Equilibria, Found by GPU Search',
  category: 'Lab note / Strange attractors',
  description: 'Seth Pratt’s lab note on Conch: a 7-term quadratic flow with no equilibrium points, found in a GPU search of about 1.6 million random systems, with a Gröbner-basis proof, a 64-bit Lyapunov spectrum and an honest novelty check against known attractors.',
  lede: 'Nearly every famous chaotic system swirls around fixed points, places where the motion stops. Conch has none. It is seven terms of algebra that keep a path inside a box a few units wide forever, never settling and never repeating, with no hub to orbit. This is how a GPU search found it, how we checked it, and why it is an amateur find rather than a breakthrough.',
  takeaway: 'A seven-term flow can stay bounded and chaotic with nowhere to stop; Conch is very likely a new member of a known family, which makes it a verified, pretty find, not a simpler or fundamentally new kind of system.',
  facts: [
    { label: 'Found by', value: 'GPU search of ~1.6M random quadratic flows' },
    { label: 'Core', value: '7 terms · zero equilibria (a hidden attractor)' },
    { label: 'Checked', value: '64-bit RK4 · four 100,000-unit runs · 0 escapes in 40M particles' }
  ],
  workflowLabel: 'From random search to a checked core · the search ran fast; every number in this note was re-checked at 64-bit precision',
  workflow: ['Generate random flows', 'Keep bounded chaos', 'Prune term by term', 'Prove no fixed point', 'Compare with known systems'],
  prepared: '2026-10-09',
  topics: ['Lab'],
  featureImage: {
    src: '/media/writing/conch/conch-spiral-axis.jpg',
    alt: 'The Conch attractor seen down its spiral axis: 40 million glowing particles tracing iridescent cyan, violet and amber filaments that coil like a seashell on a black background.',
    caption: 'Conch’s 7-term core seen straight down its spiral axis. 40 million particles, each moved at 64-bit precision and never re-seeded.',
    width: 1600, height: 1600
  },
  findings: [
    'Pruning one term at a time under a strict 64-bit test took the original 15-term system to a 7-term core, and changed its character: the original has ordinary fixed points, the core has none.',
    'Zero equilibria, real or complex: a Gröbner basis of the fixed-point equations reduces to “1 = 0”, which makes Conch’s core a hidden attractor.',
    'Nothing escapes: none of 40 million still-image particles left the box during warm-up, and across 20 million film particles and 480 frames the largest coordinate reached was 7.7, with no re-seeding (escape threshold 50).',
    'λ = (0.0563, 0.0000, −0.1797) and D_KY ≈ 2.31 (2.306–2.309) against 2.322–2.325 for its closest published relative, NE16: very likely distinct, but at 7 terms not simpler than the 5–6-term no-equilibrium catalogue.',
    'The same 64-bit audit retracted an earlier “attractor”, Tulip (all 2,048 test seeds escaped, after about 1,100 time units on average), and showed the exponents in our first field guide were 1.2–3.7× too high.'
  ],
  sections: [
    { id: 'motion', title: 'A shape drawn by motion', paragraphs: [
      'Pick a point in space and give it a rule: “wherever you are, here is the direction and speed to move next.” That rule is three short equations, one each for x, y and z. Follow the point for a long time and it traces a path. For most rules the path does something boring. It flies off to infinity, settles onto a single point, or falls into a loop that repeats forever.',
      'A strange attractor is the rare, interesting case. The path stays inside a finite region forever, yet it never repeats itself and never settles down. Two starting points that are almost identical drift apart until they have nothing to do with each other. That is chaos. Draw millions of points following the same rule and they settle onto a delicate, layered surface: the attractor. Every image in this note is one of those surfaces.'
    ] },
    { id: 'hidden', title: 'Chaos with no hub', paragraphs: [
      'Nearly every famous attractor has fixed points, spots where the rule says “stop, speed zero”. The Lorenz butterfly has three; its two wings swirl around two of them. You can think of fixed points as the hubs that chaos winds around. They are also how mathematicians usually find attractors: start beside a fixed point, nudge, and watch.',
      'Conch has no fixed point at all. There is no place in all of space where the motion stops, so there is no hub to orbit and nowhere to settle. It still stays bounded, inside a box a few units wide, and it still never repeats. Attractors like this are called hidden attractors, because the usual trick for finding them, starting near a fixed point, has nowhere to start.'
    ] },
    { id: 'search', title: 'How the search found it', paragraphs: [
      'A GPU search on one workstation ran a brute-force hunt in the style the physicist J. C. Sprott pioneered in the 1990s. It generated about 1.6 million random systems of equations. Each was three equations built from the ten simplest ingredients (a constant, x, y, z and their pairwise products), with random coefficients between −1.2 and 1.2. Each system was integrated and kept only if its path stayed bounded, didn’t settle, and showed chaos: a positive Lyapunov exponent, explained below. About 0.85 percent passed. We looked through the survivors by eye and named eight. One of them looked like a spiral seashell, so it became Conch.',
      'The original Conch had 15 terms. We then asked which of those terms actually matter. We deleted one term at a time and kept a deletion only if the system was still chaotic and bounded under a strict test of long runs at 64-bit precision. Eight terms fell away. What remains is a 7-term core, and the pruning changed its character: the original Conch has ordinary fixed points, but the core has none.'
    ], image: {
      src: '/media/writing/conch/conch-original-vs-core.jpg',
      alt: 'Two renders side by side on black. Left: the original 15-term Conch, a smooth seashell spiral in violet, cyan and amber. Right: the 7-term core seen face-on, a looser tangle of translucent cyan, violet and amber ribbons.',
      caption: 'Left: the original 15-term Conch from the search. Right: the 7-term core. Same family resemblance, but the core is a different system with different dynamics.',
      width: 1600, height: 792
    } },
    { id: 'equations', title: 'The seven terms', paragraphs: [
      'This is the whole thing. A dot over a letter means “rate of change in time”.',
      'It is small enough to fit on a napkin. It’s worth noticing what isn’t there: x never feeds back on itself, and z changes only through the product xy. All of the shell’s structure comes from four quadratic terms working against each other. The initial condition we used for the core is (0.1242, −0.7840, −0.1190).'
    ], equations: [
      'ẋ = 1.1 − 0.9·y²',
      'ẏ = −0.8 + 0.8·y + 0.6·xy + 1.1·xz',
      'ż = −0.8·xy'
    ], image: {
      src: '/media/writing/conch/conch-core-three-quarter.jpg',
      alt: 'The Conch core in three-quarter view: layered translucent ribbons in cyan, violet, pink and amber folding around a cyan core on a black background.',
      caption: 'The core in a three-quarter view. Colour and brightness encode speed (cyan is slow, violet and pink faster, amber fastest), with a slight hue shift where the path bends sharply. 40 million particles.',
      width: 1280, height: 1600
    } },
    { id: 'no-fixed-point', title: 'Why there is nowhere to stop', paragraphs: [
      'A fixed point needs all three rates to be zero at once. Here is why that can’t happen. Start with ż = 0. That means −0.8xy = 0, so either x = 0 or y = 0.',
      'If y = 0, then ẋ = 1.1. That’s never zero, so x is always moving: no fixed point. If x = 0, then ẋ = 0 needs 0.9y² = 1.1, so y² ≈ 1.22. But ẏ becomes −0.8 + 0.8y, which is zero only when y = 1, and then y² = 1, not 1.22. The two conditions contradict each other: no fixed point.',
      'Both cases fail, so the equations have no fixed point anywhere, not even a complex-number one. A computer-algebra check (a Gröbner basis in sympy) reduces the system to the single equation “1 = 0”, which is the algebraic way of saying “impossible”.'
    ] },
    { id: 'numbers', title: 'The numbers, checked', paragraphs: [
      'All numbers here come from 64-bit Runge–Kutta integration, run at two step sizes (h = 0.004 and 0.002) and from four starting points, for 100,000 time units each. The full spectrum is λ = (0.0563, 0.0000, −0.1797), with a spread of about ±0.0001 across the four runs.',
      'Divergence measures how fast a small blob of starting points shrinks or grows. Here it is 0.8 + 0.6x, which depends on where you are: some regions expand and others contract. Averaged along the path it is −0.123, and that matches the sum of the three exponents (−0.123) to three digits, a standard check that the numbers are self-consistent. A quick independent two-orbit estimate gave λ₁ = 0.055–0.056.'
    ], table: { caption: 'Lyapunov spectrum and dimension of the 7-term core · 64-bit RK4, four 100,000-unit runs', headers: ['Quantity', 'Value', 'What it means'], rows: [
      ['Largest Lyapunov exponent λ₁', '≈ 0.056', 'Nearby paths separate by a factor of e about every 18 time units'],
      ['Middle exponent λ₂', '≈ 0', 'Within 10⁻⁴ of zero, as it must be for a continuous flow'],
      ['Smallest exponent λ₃', '≈ −0.180', 'Strongly contracting direction: this folds the paths back onto the shell'],
      ['Kaplan–Yorke dimension D_KY', '≈ 2.31', 'More than a surface, much less than a solid'],
      ['Mean divergence along the path', '−0.123', 'Matches λ₁ + λ₂ + λ₃ to three digits']
    ] }, image: {
      src: '/media/writing/conch/conch-divergence.jpg',
      alt: 'Top: two time series of x that overlap perfectly until about t = 300 and then diverge. Bottom: their separation on a log scale, rising in steps from 10⁻⁹ to about 1 and then levelling off.',
      caption: 'It never repeats, and it can’t be predicted far ahead. Two paths start 10⁻⁹ apart. They agree for about 300 time units, then go their own ways. Below, the gap grows exponentially at the rate λ₁ (dashed line) until it is as large as the shell itself.',
      width: 1551, height: 1334
    } },
    { id: 'integration', title: 'How honest is the integration?', paragraphs: [
      'Every particle in these renders was moved in 64-bit precision (RK4, step 0.005) and never re-seeded. Our older renderer quietly respawned particles that escaped. That once hid a fake attractor, Tulip, which turned out to leak to infinity: in the audit, all 2,048 test seeds escaped, after about 1,100 time units on average. The same audit found that the exponents in our first field guide, estimated at 32-bit precision over short windows, were 1.2–3.7× too high. Here nothing is respawned: escapes are only counted, and the count was zero.',
      'None of the 40 million still-image particles escaped during their 200-unit warm-up (escape threshold: 50). In a 16-second turntable film of 20 million particles, the largest coordinate any particle reached across all 480 frames was 7.7. A single 100,000-unit path never went past 6.7. Only the drawing of the light trails uses 32-bit arithmetic, and that changes nothing about where particles go.'
    ], image: {
      src: '/media/writing/conch/conch-one-orbit.jpg',
      alt: 'A single unbroken path drawn as a fine violet and pink line for 5,000 time units, wrapping into a dense, shell-like tangle that never closes on itself.',
      caption: 'One single path, followed for 5,000 time units and drawn as a fine line. It wraps around and around the shell but never closes into a loop.',
      width: 1200, height: 1200
    } },
    { id: 'novelty', title: 'Is it actually new?', paragraphs: [
      'Probably, in a narrow sense. But it isn’t a big deal, and it’s worth being clear about why.',
      'Hidden attractors without fixed points are a known class. In 2013 Jafari, Sprott and Golpayegani catalogued 17 of them, called NE1 to NE17. NE1 manages with 5 terms and most of the others with 6. So Conch is not the first, and at 7 terms it is not the simplest.',
      'It does look like a different system. NE1 to NE15 have a simpler quadratic structure (rank 2 or less; Conch’s is rank 3), so no linear change of coordinates can turn one into the other. The closest relative is NE16, a 12-term symmetric system whose exponents look almost the same once you rescale time. But two measures that don’t depend on the time scale differ by more than our error bars: the dimension (2.306–2.309 against NE16’s 2.322–2.325) and the ratio λ₁/|λ₃| (0.306–0.309 against 0.322–0.325). So: very likely distinct, but a close cousin.',
      'The field is also tired of “new chaotic systems”. Sprott’s 2011 standard asks that a new system be simpler than known ones, show new behaviour, or model something real. In a 2020 editorial titled “Do we need more chaos examples?” he argues that hidden attractors are neither rare nor hard to find. Conch meets none of the three bars.'
    ], links: [
      { label: 'Jafari, Sprott & Golpayegani, “Elementary quadratic chaotic flows with no equilibria”, Phys. Lett. A (2013)', href: 'https://doi.org/10.1016/j.physleta.2013.01.009' },
      { label: 'Sprott, “Do we need more chaos examples?”, Chaos Theory and Applications (2020)', href: 'https://sprott.physics.wisc.edu/pubs/paper514.htm' },
      { label: 'Sprott, “A proposed standard for the publication of new chaotic systems”, Int. J. Bifurcation & Chaos (2011)', href: 'https://doi.org/10.1142/S021812741103009X' },
      { label: 'Sprott, “Some simple chaotic flows”, Phys. Rev. E (1994)', href: 'https://sprott.physics.wisc.edu/pubs/paper212.pdf' },
      { label: 'Sprott, Strange Attractors: Creating Patterns in Chaos (1993), free text', href: 'https://sprott.physics.wisc.edu/fractals/booktext/SABOOK.PDF' }
    ] },
    { id: 'limits', title: 'What we can’t claim', paragraphs: [
      'So this is an amateur find, not a breakthrough: a pretty, verified, probably unpublished member of a known family. It came out of a GPU search on one workstation, it survived honest checking, and it looks like a seashell. That’s a good day.',
      'What that verdict rests on, and what it leaves out:'
    ], bullets: [
      'Very likely distinct from NE16, by more than our error bars on two time-scale-free measures, but not simpler than the 5–6-term no-equilibrium catalogue.',
      'The core comes from a single greedy pruning path, so 7 is an upper bound on the fewest terms this family needs, not a proven minimum. A deeper search might find a smaller core, but it would be a different system.',
      '“Discovered” means found by our search. The comparison covered 89 named systems plus the 17 NE flows, not every paper ever written, so it is not proof that nobody has written Conch down before.',
      'Two systems can look different and still share the same underlying topology. We didn’t test that.',
      'The colours in the renders are an artistic encoding of speed, not an extra measurement.'
    ] }
  ],
  basis: 'Prepared October 9, 2026 from the original Conch write-up and its check files: 64-bit RK4 runs at step sizes 0.004 and 0.002 over 100,000 time units, a sympy Gröbner-basis equilibrium check, the render bound logs (40 million still particles and 20 million film particles, no re-seeding), and the novelty audit against 89 catalogued systems and the 17 Jafari–Sprott no-equilibrium flows.',
  limitations: 'One system from one search, compared with 89 named systems and 17 no-equilibrium flows rather than the whole literature. The 7-term core comes from a single greedy pruning path, so its term count is an upper bound; topological equivalence was not tested, and the render colours are an artistic encoding of speed.',
  related: [
    { label: 'Strange Attractors in the Lab', href: '/lab/strange-attractors' },
    { label: 'The workstation the search ran on', href: '/writing/local-model-performance-engineering' }
  ]
},
{ "slug": "watching-a-language-model-think", "work": { "start": "2026-09-30", "end": "2026-10-10" }, "type": "note", "updated": "2026-10-10", "title": "Watching a language model think", "summary": "We pulled real numbers out of Qwen language models and turned them into films, VR scenes and the live figures on this page. Some pictures showed real mechanisms; some were artefacts of the drawing; one well-known result didn’t reproduce at all.", "seoTitle": "Watching a Language Model Think — Logit Lens, Attention, Reasoning Trees and Long Context in Qwen", "category": "Lab note / Inside the Machine", "description": "What we learned turning real activations, attention weights and samples from Qwen language models into pictures: where a prediction locks in, what 3-D maps and attention maps get wrong, how 3,072 replies converge on five ideas, why a two-model search didn’t help, and what holds and breaks across 32,000 tokens. With seven live figures built from the recorded data.", "lede": "Since late September we have been pulling real numbers out of open language models, mostly Qwen, and turning them into pictures: films, walk-in VR scenes, small games. The pictures were the fun part. The useful part was checking each one against a measurement. This note collects what held up, what didn’t, and the figures you can poke at yourself.", "takeaway": "A picture of a model is worth making only when a measurement stands behind it. The 3-D map keeps fewer than half of a word’s true neighbours, raw attention points at the wrong word, and a search that looked clever was mostly two small models agreeing with each other.", "facts": [ { "label": "Models", "value": "Qwen3-1.7B · Qwen3.8-27B · Qwen3.5-4B-Base" }, { "label": "Figures", "value": "Seven live figures, all from recorded model data" }, { "label": "New for this note", "value": "About 700 long-context runs, 1K to 32K tokens" } ], "workflowLabel": "How each picture in this note was checked · the drawing came first; a measurement decided what stayed", "workflow": [ "Pull real numbers from the model", "Draw them", "Measure what the picture kept", "Change the input and re-run", "Report what held" ], "prepared": "2026-10-10", "heroLoop": { "id": "hero-triptych", "title": "Three of the pieces, from real model data", "width": 1280, "height": 720, "seconds": 11, "alt": "Three glowing particle sculptures side by side on black: a cloud of coloured points with a thin beam rising into it, an egg-shaped lattice of coloured arcs around a column of dots, and a fan of rainbow-coloured threads rising from one bright root.", "caption": "Left: Anatomy of a Thought, the last word of “The Colosseum is in” rising from Qwen3-1.7B’s layers into its map of words. Centre: Attention XI, every real attention weight of Qwen3-1.7B reading one short passage, with heads as coloured sheets of arcs around a column of words. Right: The Garden of Forking Paths, 3,072 real replies from Qwen3.8-27B growing as one tree. The data behind each shape is real; layout, colour, camera and timing are our choices. Cut from the silent versions of the films." }, "topics": [ "Lab", "Evals" ], "findings": [ "In Qwen3-1.7B the answer to “The Colosseum is in…” locks in at layer 21 of 28 (Germany 69% at layer 19, Rome 85.5% at layer 21). Qwen3.8-27B, 16 times larger, decides later, at layer 57 of 64, and never detours through Germany.", "The pictures mislead in measurable ways. The 3-D map of the vocabulary keeps 43% of each token’s 15 true nearest neighbours. Raw attention’s favourite word was the first word of the prompt in all eight test prompts, and never the word whose removal changed the answer most.", "Asked one question 3,072 times, Qwen3.8-27B gave 3,072 different replies. They boil down to five ideas, and each idea is reached from 21 to 39 different first words.", "Two small models searching step by step solved 24 of 40 hard maths problems; the stronger model’s plain majority vote solved 25, with about a fifth of the tokens. The search marked all 40 answers “verified”, including the 16 it got wrong.", "Across 32,768 tokens Qwen3-1.7B recalled 330 of 330 planted facts. It broke on updates: when the outdated sentence matched the question’s wording, it favoured the old number 12 times out of 15." ], "sections": [ { "id": "one-word", "title": "One word at a time", "paragraphs": [ "A language model does one thing, over and over. It reads the text so far and puts a probability on every token in its vocabulary for what comes next. A token is a word or a piece of one; Qwen3-1.7B knows 151,643 of them. Then one token is picked, added to the text, and the whole model runs again. That is all “writing” is.", "It helps to feel this before looking inside. Try the figure: pick the word you think comes next, then see the model’s real odds." ], "figure": "guess", "after": [ "Two things stand out. The model’s favourite is often a small, safe token. After “The Eiffel Tower is located in” it prefers “the” (37%) over “Paris” (25%), because “in the heart of Paris” is also a good sentence. And for open prompts its confidence is thin: “The cat sat on the” gives “mat” only 11.6%. Everything later in this note is about where those numbers come from and what happens when you sample from them many times." ], "takeaway": "The text you see is one draw from a spread-out bet. To understand a model you have to look at the bet, not just the draw." }, { "id": "map", "title": "Thinking in space: a map of meaning, and what the map gets wrong", "loop": { "id": "map-latent", "title": "Latent VII: walking the real map", "width": 640, "height": 800, "seconds": 11, "alt": "Flying through a dense field of cyan, blue and magenta points; a translucent bubble expands around one bright point and threads reach out to nearby points.", "caption": "The camera flies through the 3-D map of all 151,643 Qwen3-1.7B tokens, placed from their real embeddings, and hops from a word to one of its true nearest neighbours; each expanding shell marks a visited word. Neighbours are measured in the full 2,048 dimensions; the positions are the UMAP projection Figure 2 measures. Colour is script. The hops were timed to music in the original film." }, "paragraphs": [ "Inside the model, every token starts as a list of 2,048 numbers called its embedding. Tokens with similar meanings get similar lists. Nobody can picture 2,048 dimensions, so we squashed them into three with a standard method (UMAP) and built a map you can fly through, in VR and in films. It is genuinely striking in a headset. Whole languages sit side by side: “Paris” floats beside 巴黎 (Paris in Chinese), “Rome” beside 罗马 and “Roman”. Code tokens form their own continent.", "But a map is a projection, so we measured what it keeps. For every one of the 151,643 tokens we took its 15 truly nearest neighbours in the full 2,048 dimensions and asked how many are also among its 15 nearest points on the 3-D map." ], "figure": "map", "after": [ "The answer is 43% on average: about 6 of 15. Most of the rest are still nearby (72% are within the map’s nearest 100), so neighbourhoods survive. Distances don’t. For random pairs of tokens, distance on the map and true similarity have a rank correlation of 0.07, close to none. Two tokens close together on the map are probably related; two tokens far apart tell you almost nothing. “Paris” is a good example: the map kept “paris” and 巴黎 beside it but put France, London and Madrid somewhere else, and surrounded it instead with Bordeaux, Oslo and Antarctica. Latin-alphabet words and word pieces keep their neighbours best (47–51%); less common scripts do worst (27%).", "Flying through the map in VR added something real: you notice the multilingual clusters and the code continent in seconds, which no table shows you. It also adds a second projection, because your screen or headset flattens the 3-D map again. So we treat the map as a way to find neighbourhoods worth checking, and do the checking in the full space.", "Maps can also show structure forming. In The Click, a tiny transformer we trained to add numbers on a clock, (a + b) mod 113, first memorises its examples while its 113 number embeddings drift in a tangle. Thousands of steps later they snap onto four clean rings and its accuracy on sums it has never seen jumps from about 11% to 100%. That picture is a projection too, but onto directions the trained network itself uses, which is why it comes out so clean." ], "loopEnd": { "id": "map-click", "title": "The Click: an embedding organising itself", "width": 1080, "height": 608, "seconds": 11, "alt": "Coloured beads in a loose tangle that snap into four stacked rings, then loosen again.", "caption": "A real one-layer transformer learning to add on a clock, (a + b) mod 113. Each bead is one of its 113 number embeddings, projected onto the four frequencies the trained network uses. Training time is compressed, the return to the tangle is interpolation, not training, and this loop plays the 28-second film at 2.5× speed." }, "takeaway": "Use a 3-D map to find neighbourhoods, never to read distances, and measure how much of the real structure it kept." }, { "id": "river", "title": "A prediction locking in, layer by layer", "loop": { "id": "river-anatomy", "title": "Anatomy of a Thought: the moment of “Rome”", "width": 1080, "height": 1350, "seconds": 11, "alt": "A close view of a cloud of blue and pink points, with a warm glowing cluster of light gathered on one spot.", "caption": "Just after layer 21 in Qwen3-1.7B. The glow is the logit lens’s probability cloud, with particles in proportion to the real probabilities, gathered on “Rome” on the UMAP map of the vocabulary. Camera and pacing are ours." }, "paragraphs": [ "Our longest piece follows one prompt through Qwen3-1.7B: “The Eiffel Tower is in Paris. The Colosseum is in”. The model answers “Rome” with 97.4% confidence, then keeps writing on its own: “Rome. The Great Wall of China is in Beijing.”", "Between input and answer sit 28 layers. Each layer reads a running state for every word, called the residual stream, and adds its notes to it. A technique called the logit lens lets you stop that stream at any layer and ask, “if you had to answer now, what would you say?” You run the half-finished state through the model’s own final output step." ], "figure": "river", "after": [ "For the first ten layers the lens reads noise. Then it says “city” (layers 10 and 11), then “Germany” (69% at layer 19). At layer 21 it flips to Rome (85.5%) and never lets go. The timing differs per word: “China” is settled by layer 12, because “Great Wall of” makes it easy, while “Beijing” waits until layer 26. In the same layer where Rome appears, one attention head (layer 21, head 4) puts 66% of its attention on “se”, a piece of “Colosseum”. That is a correlation we saw, not a cause we proved.", "The 27B model, a hybrid with 16 ordinary attention layers and 48 memory layers, decides later and more sharply. Rome first leads at layer 57 of 64, about 89% of the way down, compared with 75% for the 1.7B. Just before that, its lens reads 哪个, Chinese for “which?”, at layers 52 to 56, as if it were posing the question. On a two-step question (“the engineer the Eiffel Tower is named after was born in the French city of…”) the 27B answers Dijon, correctly, while the 1.7B takes the shortcut to Paris (62%). The 27B’s hidden middle step, “Gustave”, shows up at layer 61, very late.", "Our River of Thought loop shows the same moment from a distance: 4,624 tokens from sixty short passages flow through all 29 stages (the embeddings plus 28 layers) as silk threads, and the Colosseum prompt’s last word catches fire at layer 21. To be precise, those are sixty separate short texts drawn together, not one long document, and each layer is flattened onto the plane where the sixty passages separate best. The shape of the river is a projection; the layer where it ignites is a measurement." ], "loopEnd": { "id": "river-flow", "title": "River of Thought", "width": 1280, "height": 720, "seconds": 11, "alt": "A misty river of thousands of faint coloured threads flowing diagonally across a dark frame.", "caption": "4,624 tokens from 60 short passages flowing through all 29 stages of Qwen3-1.7B, one thread per token, from real hidden states. Each layer is flattened onto the plane where the passages separate best, so the river’s shape is a projection. The gold comet is the Colosseum prompt’s last word, which ignites at layer 21." }, "takeaway": "In both models the decision is late and sudden, in the last quarter of the network. Early layers look like noise through this lens, which is a limit of the lens rather than proof the model knows nothing yet." }, { "id": "attention", "title": "What attention shows, and where it misleads", "loop": { "id": "attn-xi", "title": "Attention XI: the real weights", "width": 864, "height": 1080, "seconds": 11, "alt": "An egg-shaped lattice of thin coloured arcs fanned around a vertical column of glowing dots.", "caption": "Qwen3-1.7B reading one short passage. The words stand in the glowing column; each of the 16 heads in a layer is a coloured sheet of arcs, and particle density along an arc follows the real attention weight. The first-token sink is drawn at a fifth of its density so the rest stays visible, and the original’s light pulses were timed to music." }, "paragraphs": [ "Attention is how each word looks back at earlier words. It is the most visualised part of a language model, because it draws beautifully: arcs between words, with thickness showing weight. Some of what those arcs show is real and checkable. In Qwen3-1.7B, layer 4, head 10 is an induction head, a pattern copier: from the final “in”, it puts 89% of its attention on “Paris”, because “is in” was followed by “Paris” earlier in the prompt. On a standard repeated-random-token test it scores 0.91.", "The biggest thing in any attention picture, though, is an artefact of how these models work. In layer 3 the model writes one enormous value into the first word, “The”, multiplying its size about 80 times. From then on, heads with nothing useful to do park their attention there. Averaged over every head and layer, 68% of all attention lands on that one word. It is called an attention sink, and it dominates every raw attention map. So we asked the same question three ways." ], "figure": "attention", "after": [ "In all eight prompts, raw attention’s favourite word was the first word, at 52 to 67%, even with a hidden start token placed there to absorb it. Weighting attention by how much each word’s content can actually change the output shrinks the sink to 9 to 17%, and sometimes finds the right word (“dream” in the Paris prompt, “until” in the glass of water). The only causal test, though, is the knockout: run the model again with a word made invisible. Hide “out” in “The baker took the hot loaves of bread out of the” and “oven” falls from 99% to 0.2%, although raw attention gave “out” only 5%. Across all words, both attention measures rank importance only loosely like the knockout does (rank correlation about 0.42 each).", "This changed how we built things. When we made the Guess the Next Word game, raw attention pointed at the first word even with a start token added to soak it up, so the game uses the weighted version and real knockouts instead. Most of our Attention films and VR scenes (Attention I to X) were artistic, inspired by attention rather than drawn from it, and we say so wherever they appear; so are the two live pieces linked at the end. Attention XI, at the top of this section, is the exception: it draws Qwen3-1.7B’s real weights, sink and all." ], "takeaway": "An attention map shows where a model looks, not what it uses. To know what it uses, change the input and measure the output." }, { "id": "forking", "title": "Reasoning trees I: the garden of forking paths", "loop": { "id": "forking-garden", "title": "The Garden of Forking Paths", "width": 1080, "height": 1350, "seconds": 11, "alt": "A fan of thousands of rainbow-coloured threads rising from one bright root and curling outward.", "caption": "Every thread is one of 3,072 real Qwen3.8-27B replies; height is position in the reply, thickness is how many replies share a branch, and colour is the idea a reply ends up in. Where the crown sits sideways is our layout, chosen so that branches meaning the same thing drift together." }, "paragraphs": [ "Every reply a model writes is one path through a huge branching tree of possible replies. To see that tree for real, we asked Qwen3.8-27B one question 3,072 times: “What would you want to tell someone who is afraid? Answer in one or two sentences.” We sampled at temperature 1.0 over its full vocabulary, which means drawing from its true odds with nothing trimmed.", "All 3,072 replies are different. Stored as a tree of shared beginnings, they make 96,589 nodes. The average token is a mild choice (1.15 bits of uncertainty), but 21% of tokens are genuine forks above 2 bits. The tree grows faster than any list can follow: an exact search of the most likely beginnings covers 94% of the probability after one token, 52% after ten and 2% after twenty." ], "figure": "forking", "after": [ "Grouped by meaning, the replies collapse into five ideas: you are stronger than you know (30%), fear is a signal, not a stop sign (19%), courage isn’t the absence of fear (17%), you have survived every hard day so far (17%) and you can handle what comes next (16%). Each idea is reached from 21 to 39 different first words. “Fear…”, “Your…”, “It…” and “You…” each lead into all five. The wording decides itself early; the idea is decided much later.", "One more surprise. The reply the model gives if it always takes its single likeliest next word (“Fear is often a signal to pause and assess, not a command to stop…”) has a whole-sentence probability of about 1 in 1.7 million. Among the samples, the most likely complete reply was about 47 times more likely than that. Taking the best word at every step is not the same as writing the most likely sentence." ], "takeaway": "Wording diverges at once and meaning converges. Judge a model’s answer by the spread of ideas it produces, not by one sample, and don’t assume the default reply is its most typical one." }, { "id": "search", "title": "Reasoning trees II: search, honestly measured", "paragraphs": [ "A popular claim says that two models searching together can break through the plateau you hit when one model simply answers many times and you take the majority. We built a small, real version: Qwen3-1.7B and Qwen3.5-4B-Base write one line of working at a time into the same solution. Each candidate line is scored by a quick look-ahead (both models finish the solution from there), a yes/no check by the other model, and Python re-checking any arithmetic. The best paths survive each round. We then picked 40 maths word problems from the GSM8K test set that the 1.7B finds hard, and compared the search with each model answering 32 times and taking the most common answer." ], "figure": "search", "after": [ "The search lifted the weak model enormously, from 3 problems to 24, and beat simply pooling both models’ 64 blind tries (13). It did not beat the stronger model’s own majority vote (25), and it cost about 4.7 times as many tokens: 19.6k per problem against 4.2k. It beat both single-model majorities on one problem and lost to the 4B’s majority on two. The claimed breakthrough did not reproduce at this scale.", "The reason is visible in the trees. The search never sees the right answer; it trusts its judges, and two small models are poor judges. The 1.7B says “yes” to nearly anything, and the look-ahead vote rewards whatever answer is popular. In problem #259, the true answer (168) was alive in round four with 59 look-ahead votes; the popular wrong answer (76) had 116, and by round five the right one was nearly gone. The search converged, confidently and wrongly. Meanwhile the right answer was usually somewhere in the samples: at least one of the 4B’s 32 tries was correct on 36 of the 40 problems. Finding a right answer was easy; recognising it was the hard part." ], "takeaway": "A search is only as good as its judge. Agreement between two weak models is not verification, and the honest baseline (one model, many tries, majority vote) is hard to beat." }, { "id": "long-context", "title": "Long context: what holds over 32,000 tokens, and what breaks", "paragraphs": [ "Our earlier pieces never tested long inputs, so for this note we ran new measurements on Qwen3-1.7B. We took the public-domain text of The Wind in the Willows, cut it to lengths from 1,024 to 32,768 tokens, planted a made-up fact (“The secret number for the blue door is 7392.”) at different depths, and asked for it at the end. Without the fact, the model’s chance of guessing the number is about 2 in a million. We also recomputed the exact attention weights at the moment of answering." ], "figure": "longctx", "after": [ "Attention over a long text has a clear shape. 40% of all attention parks on the first token, the sink again, reaching about 70% in the last few layers. Another 27% goes to the last 15 tokens. Beyond that, the attention each token receives falls roughly in proportion to its distance. But there are so many distant tokens that, for a reader near the end of an 8,192-token text, everything more than 4,096 tokens back still gets about 6% of its attention in total, as much as the single previous token. A handful of retrieval heads do the long-range work. One (layer 21, head 14) puts 78% of its attention on the fact’s four digits from 6,147 tokens away. Another, in layer 7, starts at 86% on short texts but fades to 52% at 32,768 tokens, while the late heads hold steady. The logit lens shows the moment of recall: the lens reads a blank to fill in (“_____”) at layers 18 to 21, and the digit jumps to the top at layer 22, one layer after Rome did.", "Simple recall turned out to be easy for this model. It recalled 330 of 330 planted facts at every length and depth. With the fact worded differently from the question (“The blue door opens only when you dial 7392”) it still found the right digits in all 150 runs, though in four of them it wanted to write “the” before the number. With up to 50 look-alike facts (“the silver gate”, “the red lamp”) in the text, it was exact 87 times out of 90. The three misses were all facts near the start, and in each the first digit came from a different fact: the one its retrieval heads were looking at most.", "It broke on updates. We stated a number early, then changed it later in the text, and asked for the current number. When the outdated sentence used the question’s exact wording (“The secret number for the blue door is…”), the model favoured the old number in 12 of 15 runs. Swap which sentence matches the question and it gave the new number 15 times out of 15. With neutral wording on both, it was a coin flip (7 of 15). The model wasn’t tracking which fact was newer. It was finding text that matched the question and copying what came next." ], "takeaway": "A small model can find one fact in 32,000 tokens reliably, but it finds it by matching wording, not by understanding the text. Needle-in-a-haystack tests mostly measure copying; tests with updates and conflicting facts are where long context really breaks." }, { "id": "wrong", "title": "What we got wrong along the way, and how we checked", "paragraphs": [ "Most of what we learned came from catching our own mistakes. These are the ones that would have ended up in a picture if we hadn’t checked." ], "bullets": [ "A river that rotated by itself. One of our layer-by-layer trajectory scenes re-fitted the 3-D projection at every layer, and the picture swung about 50° per layer. That motion came from our maths, not the model. One shared projection for all layers fixed it.", "A final layer that read 90.5% instead of 97%. The library hands back the last layer already normalised, and we normalised it again. Applying the step twice turned 97.0% into 90.5% in a recheck for this note. The lock-in layer, 21, was unaffected; the final number in that piece was not.", "Raw attention told the wrong story. Even with a dedicated start token added to absorb it, most attention still landed on the first real word. We switched to weighted attention and knockouts, and this note shows that even the weighted version is only loosely right.", "The lens is not the model. The logit lens reads noise until about layer 20 in the 1.7B and is close to useless in the middle of the 27B; a centred variant didn’t help. “The model knows nothing until layer 20” would be a wrong reading of our own figure.", "Brightness is not confidence. Our particle films add light where paths overlap. Going from 384 to 3,072 replies in Forking Paths blew the image out, so light has to be scaled down as more paths are drawn, or the brightest spot simply marks where the renderer stacked the most particles.", "A confident search flag. The search’s “verified” mark fired on all 40 problems. We now report it as “the search was confident”, never “proven right”, and the film’s problem was checked against the true answer.", "Picking the winner. The search film shows a problem where the search succeeded, chosen from six reruns. A rerun of #259 converged on a wrong answer, and it is in Figure 6 for that reason.", "A test that was too easy. Our first long-context test passed 330 of 330, because the question repeated the fact’s wording and copying was enough. It took three harder variants to find where the model breaks.", "Loose wording about our own work. River of Thought’s 4,624 tokens are sixty separate short passages, not one long context, and we first described it more loosely than that." ] }, { "id": "methods", "title": "Methods and how to reproduce", "paragraphs": [ "Everything here comes from open-weight models running locally on one workstation GPU, read with forward hooks in Hugging Face Transformers and PyTorch. Layers are counted from 1 at the input (0 means the raw embeddings); heads are counted from 0. Probabilities are softmax outputs over the full vocabulary unless a figure says otherwise." ], "table": { "caption": "What each figure is built from", "headers": [ "Figure", "Model and precision", "Data" ], "rows": [ [ "1 · Guess the next word", "Qwen3-1.7B, bf16", "20 prompts; cards are whole words, probabilities chained over word pieces; a hidden start token is prepended" ], [ "2 · Map vs truth", "Qwen3-1.7B embeddings", "151,643 tokens × 2,048; cosine neighbours on mean-centred vectors; 3-D UMAP-style layout; about 5,000 points drawn" ], [ "3 · Logit lens", "Qwen3-1.7B fp32; Qwen3.8-27B bf16", "One hooked forward pass per model; final norm plus output head on every layer, every position" ], [ "4 · Attention", "Qwen3-1.7B, bf16", "8 prompts; raw and value-weighted attention averaged over layers 15–28; knockouts mask a word in all 28 layers" ], [ "5 · Forking paths", "Qwen3.8-27B, bf16", "3,072 samples at temperature 1.0, seed 7, thinking off; ideas from k-means (k = 5) on Qwen3-Embedding-0.6B vectors" ], [ "6 · Search", "Qwen3-1.7B + Qwen3.5-4B-Base", "40 GSM8K test problems; beam of 8 paths, 3 + 3 proposals per path; 32 blind tries per model as baselines" ], [ "7 · Long context", "Qwen3-1.7B, bf16", "About 700 runs, 1,024–32,768 tokens; exact attention recomputed for selected positions; peak memory under 9 GB" ] ] }, "after": [ "To reproduce the long-context results: load Qwen3-1.7B, take any long public-domain text, insert one sentence of the form above at a sentence boundary, append the question, and score the answer by teacher forcing (the probability of each answer token given the ones before it). Exact match means the model’s top token is right at every position, which is what greedy decoding would produce. For attention at long lengths, the full attention matrix is too large to store, so recompute softmax(q·k) only for the query positions you need, from the same queries and keys the model used.", "Limits: the long-context and attention results come from one small model, on one book, with five to ten runs per cell. The 27B results are from single prompts. Idea clusters depend on the embedding model and on k. The search used small models and a modest budget; stronger judges would likely change the outcome. The pictures in the Lab pieces add their own layer of choices (layout, colour, timing), described in each piece’s notes." ] } ], "basis": "Prepared October 10, 2026 from the recorded data of the Inside the Machine pieces (Anatomy of a Thought I and II, River of Thought, The Garden of Forking Paths, Search, Guess the Next Word, Latent VII) and new long-context runs on Qwen3-1.7B made for this note. Every number in the text and figures was re-read from those files.", "limitations": "Mostly one small model (Qwen3-1.7B) plus single prompts on a 27B model; the long-context tests use one book and 5–10 runs per cell; the search used two small models. Visual pieces linked from here are presentations of data or, where stated, purely artistic.", "related": [ { "label": "Inside the Machine in the Lab", "href": "/lab/inside-the-machine" }, { "label": "Latent Space, live in your browser (an artistic piece, not model data)", "href": "https://everdust.ai/play/latent-space" }, { "label": "Attention IV, live in your browser (an artistic piece, not model data)", "href": "https://everdust.ai/play/attention-iv" }, { "label": "Refusal ablation, measured", "href": "/writing/refusal-ablation-measured" }, { "label": "Benchmarking local coding agents", "href": "/writing/local-agent-evaluations" } ] },
{
 "slug": "running-a-team-of-ai-agents", "work": { "start": "2026-09-20", "end": "2026-10-10" },
 "type": "note",
 "topics": [
  "Agents",
  "Products"
 ],
 "title": "What running a team of AI agents taught me about applied AI in product management",
 "summary": "Three weeks of two lead AI agents and their helpers, told as six stories about clear asks, interruptions, handoffs, ownership, quality and where the human stays.",
 "seoTitle": "Running a Team of AI Agents — Applied AI in Product Management, Lessons From Three Weeks of 24/7 Work",
 "category": "Field note / Agent operations",
 "description": "Seth Pratt on running two lead AI agents and about 2,000 helper agents across two machines for three weeks, and why it turned out to be product management work. Resumable jobs, a shared handoff ledger, ownership lines, automatic gates and human approval.",
 "lede": "For three weeks, two lead AI agents have run around the clock on two of my machines, and each one starts its own helper agents for single tasks. Getting an agent to write code was never the hard part. The hard part was the work a product manager does every day: clear asks, clean handoffs, deciding who owns what, checking quality, and knowing when a person has to decide.",
 "takeaway": "Running many agents is a management job. Make the work resumable, write every handoff down, draw ownership lines, let automatic gates catch regressions, and keep a person on taste, priorities and anything public.",
 "facts": [
  {
   "label": "Period",
   "value": "September 20 – October 10, 2026"
  },
  {
   "label": "Team",
   "value": "2 lead agents, about 2,000 helper agents"
  },
  {
   "label": "Machines",
   "value": "Linux workstation (2 GPUs) + Mac Studio"
  }
 ],
 "workflowLabel": "How one request moved through the team on October 10",
 "workflow": [
  "I ask from my phone",
  "The lead plans and starts helpers",
  "Helpers build and test",
  "Gates, then the lead, review",
  "Written handoff, then my approval"
 ],
 "findings": [
  "One request on October 10, an Instagram post of nebula photos I sent at 1:03 pm, became three finished 4K loop films, four interactive pages and a tested native port before midnight. I steered all of it from my phone.",
  "On October 2 a weekly usage limit stopped 18 agents within about half an hour, and almost nothing that was running survived. A day later, renders started as separate jobs rode through the next limit.",
  "The two machines’ agents stayed in sync only once they shared one written ledger. It took 27 handoff rows in its first three days.",
  "Over 21 days the scarce resource was subscription quota, not compute or ideas: 36 usage-limit stops interrupted agents 262 times."
 ],
 "prepared": "2026-10-10",
 "sections": [
  {
   "id": "one-day",
   "title": "One day, one request",
   "paragraphs": [
    "At 1:03 pm on October 10, I sent the lead agent on Beast, my Linux workstation, an Instagram post of seven new nebula photos and one line: “Create sims of these new nebulas please.” Nine minutes later I added “VR version too please.” I wasn’t home, so I asked for phone stills instead of headset demos.",
    "The lead didn’t render anything itself. It started a helper agent for the simulations, kept the plan, and reviewed what came back. At 1:44 the first Ring and Hourglass renders arrived. The lead held them back: next to the photos they looked like smooth 3-D models, not glowing gas. A rebuilt version reached my phone at 2:01.",
    "At 5:15 the first finished loop landed: the Squid Nebula, in 4K, looping seamlessly, with zero flashes on the photosensitivity check. I replied that it just showed stars drifting in front of the nebula, and that the camera should circle it. Twenty minutes later the helper had built an orbiting camera for all four loops.",
    "At 7:28 I said I’d rather have interactive sims than 360° films, because the films take too long to download. The lead stopped the 360° render that minute and started a second helper on interactive pages. At 8:25 the first one reached me: a Squid you can turn in your hand, 2.3 MB, opening in seconds. I wrote back “Hell yeah! That looks great.”",
    "At 8:28 a third helper started porting the sims to Everdust’s native code. It built and tested on Cosmo, the Mac Studio, over the network, under the Mac’s shared rules. By 9:50 all four nebulas were ported, had passed their checks on the Mac, and were handed to the Mac’s lead agent with a row in our shared ledger. Three 4K orbit loops finished before midnight. The fourth is on hold until a GPU frees up.",
    "I steered all of it from my phone in short Telegram messages. In the same hours, the same lead also fixed dead links on this site and started a paper."
   ],
   "takeaway": "With agents, my job became writing clear asks and making fast taste calls. The building was the easy part.",
   "takeawayLabel": "Lesson learned"
  },
  {
   "id": "interruption",
   "title": "Design for interruption",
   "paragraphs": [
    "At 11:40 am on October 2, nineteen helper agents were running on Beast at once: long-form films, VR scene packs, a film score. At 11:57 the weekly usage limit arrived. Within about half an hour, 18 of them had stopped mid-task.",
    "Finished files on disk survived. Almost nothing that was running did, because the renders had been started from inside the agents and died with them. Everything that lived only in an agent’s working memory stopped too: plans, half-written pages, the next step. That evening I switched to another subscription, and each agent was resumed with a message. It picked up with its context intact.",
    "The next evening another limit stopped the agents again. This time the GPU renders and video encodes kept going, because by then they ran as separate jobs. Limits hit again on October 4 and 5, and each time the same rule decided what survived.",
    "We changed how work is built. Long work runs as a detached job with its own log, outside the agent. Long simulations save checkpoints, points they can restart from, and renders skip frames that are already on disk. Chains of jobs wait for a “done” file, not for a process name. That makes each step idempotent: running it twice does no harm, so a resumed agent can simply redo its last step. A resume message says where things stand. And there is now a cap of five live agents, testers included."
   ],
   "takeaway": "Assume every agent will be stopped mid-sentence. Put the real work in jobs that survive it, and make every step safe to run twice.",
   "takeawayLabel": "Lesson learned"
  },
  {
   "id": "ledger",
   "title": "Two AIs that can’t talk directly",
   "paragraphs": [
    "The lead on Beast and the lead on Cosmo are separate sessions on separate machines. Neither can read the other’s mind or chat. For weeks, handoffs were note files dropped into a shared folder, and nobody acknowledged them. The Mac acted when I relayed things. On October 8 I told them: “I don’t feel like you guys have been in sync without me intervening.”",
    "The fix went in that day. We created one ledger file with one row per open item: what it is, from whom to whom, which note has the details, its status, and who has acknowledged it. Both leads read the ledger at the start of every session. Nobody deletes a row. The Mac’s copy is the master, and it gets checked for changes before anyone overwrites it, because a stale copy once lacked three rows. The ledger grew to 27 rows in its first three days. The nebula port above is row 24."
   ],
   "takeaway": "“Done” means written down where the other side will look, and acknowledged. A handoff nobody confirmed hasn’t happened.",
   "takeawayLabel": "Lesson learned"
  },
  {
   "id": "ownership",
   "title": "Ownership boundaries",
   "paragraphs": [
    "On August 25, another session on Beast, following my instruction to free the GPUs, killed this session’s training job and image server. A minute later this session restarted its server, which crashed the other session’s freshly relaunched engine. Neither agent did anything wrong. Nobody owned the GPU.",
    "The quieter version took longer to see. Cosmo pulls Beast’s web pages every ten minutes and commits them to the app. When Cosmo’s agents fixed a page, the next pull copied Beast’s older version back over the fix and committed it, silently. It happened at least twice before Cosmo paused the pull.",
    "The fixes are all about ownership. A lane is a resource with one named owner: GPU 1 on Beast now belongs to Cosmo’s Unreal lane, with a lock folder anyone can check before using it. The Mac has two build slots, claimed by creating a lock folder, which only one agent can do at a time. There is a separate lock for the simulator, and a memory gate: no build starts while the Mac’s memory is under pressure. Processes are killed only by the ID their owner recorded, never by matching a name. And nobody touches what isn’t theirs.",
    "October 10 showed it working. The render disk filled up and killed a VR render, because the Unreal lane’s working copies had grown past their share. It took one ledger row and a nudge from me. Cosmo’s agents pruned their copies and adopted a per-lane disk budget, and nobody had to guess whose files they were."
   ],
   "takeaway": "Every shared resource needs one named owner and a lock anyone can check. “Don’t touch what isn’t yours” only works once ownership is written down.",
   "takeawayLabel": "Lesson learned"
  },
  {
   "id": "gates",
   "title": "You can’t review 2,000 agents’ work, so build gates",
   "paragraphs": [
    "No person can watch everything two thousand helper agents produce. So every render passes automatic checks before anyone looks. A photosensitivity gate counts flashes per second in every patch of the screen. Loop checks make sure the last frame flows back into the first. Other checks count particles that escape a simulation, scan for invalid numbers, and compare web and native images side by side. They catch regressions without anyone watching.",
    "They don’t catch “wrong.” On October 10 the Horsehead Nebula look-dev scored 0.74 on our shape-overlap metric against the reference photo, with its colour within 2 degrees. It still looked like a cartoon sock puppet with an open, glowing mouth. The lead kept it out of the pack. Earlier that day, the lead had also caught a version that traced the photo’s outline into the simulation. That shortcut raised the score, and the metric couldn’t see it. The lead spotted it by reading the helper’s report closely."
   ],
   "takeaway": "Automatic gates catch regressions. Human taste catches “wrong.” You need both, and the gates should run before a person looks.",
   "takeawayLabel": "Lesson learned",
   "links": [
    {
     "label": "When the metric says yes and your eyes say no",
     "href": "/writing/when-the-metric-says-yes"
    },
    {
     "label": "Testing a VR game: our bots knew the answer, a person in a headset didn’t",
     "href": "/writing/testing-a-vr-game"
    }
   ]
  },
  {
   "id": "human",
   "title": "Where the human stays",
   "paragraphs": [
    "I approve anything public. The leads filter before anything reaches me: that first Ring and Hourglass, the sock-puppet Horsehead. I make the taste calls, like circling the camera and choosing interactive pages over 360° films, and I set priorities across projects. Telegram is the control plane: short messages, phone stills, a yes or a no.",
    "What ran out was neither compute nor ideas. Cosmo’s queue was always backfilled. The limit was how many subscriptions I had: 36 usage-limit stops in 21 days. So I now manage quota the way I’d manage headcount. I cap how many agents run at once, count testers toward that cap, run reviews one after another instead of in parallel, and wind down at night."
   ],
   "takeaway": "Keep the human on taste, priorities and anything public, and budget AI quota like headcount. Quota runs out first, not compute.",
   "takeawayLabel": "Lesson learned"
  },
  {
   "id": "lessons",
   "title": "Lessons learned",
   "paragraphs": [],
   "bullets": [
    "Clear asks and fast taste calls are the manager’s real leverage. The building is the easy part.",
    "Assume every agent gets interrupted: put long work in jobs that survive it, and make every step safe to repeat.",
    "A handoff is done when it’s written where the other side looks, and acknowledged.",
    "Give every shared resource one named owner and a lock anyone can check.",
    "Let gates catch regressions automatically, and keep human eyes for “is this right?”",
    "Budget AI quota like headcount. It ran out before compute or ideas did."
   ]
  },
  {
   "id": "numbers",
   "title": "By the numbers",
   "paragraphs": [],
   "table": {
    "caption": "Both machines · September 20 – October 10, 2026 (21 days) · counted from agent transcripts and git logs",
    "headers": [
     "Measure",
     "Count"
    ],
    "rows": [
     [
      "Lead agents",
      "2 (one per machine)"
     ],
     [
      "Helper agents started",
      "2,002 (Mac 1,630 · workstation 372)"
     ],
     [
      "Helpers started by other helpers (testers, reviewers)",
      "870"
     ],
     [
      "Most helpers running at once",
      "37 (the Mac, September 28)"
     ],
     [
      "Hours with at least one machine working",
      "429 of 504"
     ],
     [
      "Code commits (merges and automatic syncs excluded)",
      "7,362"
     ],
     [
      "Seamless loop films finished",
      "116"
     ],
     [
      "Interactive web pages",
      "293"
     ],
     [
      "Usage-limit stops",
      "36, interrupting agents 262 times"
     ]
    ]
   },
   "after": [
    "A helper agent is a separate AI worker that a lead starts for one task. “At once” counts helpers that produced output in the same 10-minute window. Commits are unique across both machines."
   ]
  }
 ],
 "basis": "Prepared October 10, 2026 from the lead agent’s own transcript of October 10 (times are Pacific), the Beast–Cosmo handoff ledger (rows 1–27) and its NOTE files, my operations notes for each incident, and a count of every Claude Code transcript on both machines from September 20 to October 10 (the Mac was read without changing anything, counts only). Commits come from the git logs of every repository on both machines, deduplicated by commit hash.",
 "limitations": "These are one person’s operations over three weeks, not a controlled study. Activity counts measure volume, not value. The Mac’s numbers include product work beyond Everdust, and the workstation’s helpers only began fanning out on October 1. “At once” counts helpers that produced output in the same 10-minute window. The incident list is from my notes and is not exhaustive. Subscription accounts and their limits are not described.",
 "related": [
  {
   "label": "The gates, and the render that passed them and still looked wrong",
   "href": "/writing/when-the-metric-says-yes"
  },
  {
   "label": "How a long-running agent survives a failed job",
   "href": "/writing/long-running-ai-agents"
  },
  {
   "label": "One sim on seven platforms, ported by agents with tests",
   "href": "/writing/one-sim-seven-platforms"
  }
 ]
},
{
 "slug": "when-the-metric-says-yes", "work": { "start": "2026-10-04", "end": "2026-10-10" },
 "type": "note",
 "topics": [
  "Evals",
  "Lab"
 ],
 "title": "When the metric says yes and your eyes say no",
 "summary": "The automatic gates every render passes, what they caught, the bugs inside the gates themselves, and a nebula that beat its shape metric and still looked like a sock puppet.",
 "seoTitle": "Automatic Gates vs Human Judgment — Goodhart’s Law in an AI Render Pipeline",
 "category": "Field note / Evaluation",
 "description": "Seth Pratt on the automatic gates behind his AI-generated films and live scenes (photosensitivity, seamless loops, particle escapes, invalid numbers, web-versus-native parity) and the Horsehead Nebula look-dev that scored 0.74 on shape overlap and was still pulled.",
 "lede": "Every film, loop and interactive scene my agents make passes automatic gates before I see it. The gates earn their keep: they catch real regressions with nobody watching. This note covers what they caught, the bugs we found inside the gates themselves, and the afternoon every number improved while the picture got worse.",
 "takeaway": "Let gates block regressions automatically, and run them on the final file. Treat similarity scores as advice, show them next to the image, and let a person decide whether it is right.",
 "facts": [
  {
   "label": "Hard gates",
   "value": "Photosensitivity, seamless loop, escapes, invalid numbers"
  },
  {
   "label": "Case study",
   "value": "Horsehead Nebula look-dev, 28 comparison sheets"
  },
  {
   "label": "Period",
   "value": "October 2026"
  }
 ],
 "workflowLabel": "The review order · hard gates run first and can block a render; similarity scores only advise",
 "workflow": [
  "Render",
  "Hard gates can block",
  "Similarity scores advise",
  "The lead checks a phone still",
  "I decide"
 ],
 "findings": [
  "A Horsehead Nebula look-dev reached 0.74 shape overlap with the reference photo and matched its overall colour within 2 degrees. It still read as a cartoon sock puppet, so it stayed out of the pack.",
  "One earlier version lifted its score from 0.56 to 0.66 by tracing the photo’s outline into the simulation. The metric couldn’t see that shortcut. My lead agent caught it from one phrase in the helper’s report.",
  "A faster method for the Butterfly Nebula matched the original at 0.995 correlation on a 384-pixel image. Only a full-resolution side-by-side showed the radial streaks it added.",
  "The photosensitivity gate had a bug of its own: it assumed 30 frames per second, so it miscounted flashes in 60 fps video until we fixed it."
 ],
 "prepared": "2026-10-10",
 "sections": [
  {
   "id": "gates",
   "title": "The gates every render passes",
   "paragraphs": [
    "My agents make a lot of moving images: seamless loop films, interactive scenes, native ports of both. Nobody can watch all of it closely, so every piece passes automatic checks first. A failed gate blocks the piece. A pass only means it is allowed to reach a person.",
    "Each gate exists because something went wrong once. The table lists the gates, the rule each one applies, and one real thing it caught."
   ],
   "table": {
    "caption": "Hard gates on every render · thresholds are ours · October 2026",
    "headers": [
     "Gate",
     "What it checks",
     "Pass rule",
     "A real catch"
    ],
    "rows": [
     [
      "Photosensitivity",
      "Flashes per second, over the whole frame and in each of 16 patches, plus red flashes (WCAG 2.x and Harding-style)",
      "At most 3 per second anywhere (we aim for 0); small frame-to-frame brightness steps; few swells",
      "A game’s supernova was a 0.6-second flash. It became a 1.4-second swell."
     ],
     [
      "Seamless loop",
      "How much the last frame differs from the first, compared with a normal frame step; ghosting in crossfades",
      "Seam at most 1.25 times a normal step; low ghosting",
      "Four strange-attractor loops ghosted and went back for a seam fix"
     ],
     [
      "Escapes",
      "Particles that leave the simulation, counted and never respawned",
      "Report the count; zero for an attractor we call real",
      "“Tulip”: all 2,048 test seeds escaped. It was never an attractor."
     ],
     [
      "Invalid numbers and black frames",
      "Non-finite values in the particle buffer at key frames; frames that render black",
      "Zero invalid values; a minimum brightness and share of lit pixels",
      "Apple’s GPUs return NaN for the power of a negative number. The fix went into the web code too."
     ],
     [
      "Parity images",
      "Web and native frames side by side, plus 1:1 crops",
      "A person compares them",
      "A faster Butterfly method that added streaks"
     ]
    ]
   },
   "after": [
    "Two terms, briefly. WCAG is the web’s accessibility guideline, and its flash rule caps flashes at three per second. NaN, “not a number”, is what a GPU returns for an impossible calculation, like the square root of a negative number. One NaN can blank a whole region of a frame."
   ]
  },
  {
   "id": "horsehead",
   "title": "The Horsehead: every number improved, the picture didn’t",
   "paragraphs": [
    "On October 10 a helper agent spent the afternoon building a physics-based simulation of the Horsehead Nebula: a dark cloud whose edge is eaten away by starlight, against glowing red hydrogen. It compared each version with a reference photograph. The comparison sheet put the two images side by side, with colour histograms and several numbers. The main number was shape overlap (“IoU”): the area where the two silhouettes overlap, divided by the area either one covers. 1.0 means identical.",
    "There were 28 comparison sheets. The table shows the turning points."
   ],
   "table": {
    "caption": "Horsehead look-dev · aligned shape overlap against the reference photo · October 10, 2026",
    "headers": [
     "Version",
     "Shape overlap",
     "What the reviewer saw"
    ],
    "rows": [
     [
      "First 4K pass",
      "0.56",
      "Starting point"
     ],
     [
      "Outline traced from the photo",
      "0.66",
      "Caught from a phrase in the helper’s report, then pulled"
     ],
     [
      "Head carved by erosion only",
      "0.70",
      "“A rounded boot or thumb blob. IoU 0.70 hides that.”"
     ],
     [
      "Knots and a jaw notch added",
      "0.74 (colour within 2°)",
      "“A cartoon sock-puppet head”: an open, glowing mouth, a pink foam top, a hard box edge, webbing"
     ],
     [
      "Final: lit only along its top edge",
      "0.66",
      "Best lighting of the run. “More dog than horse.” Shown to me as a work in progress and kept out of the pack."
     ]
    ]
   },
   "after": [
    "Two things stand out. The best-scoring version was rejected outright. And the version my lead agent called its best scored lower than two of the rejects. Other numbers moved the same way: between the blob and the sock puppet, the outline-shape distance improved (1.19 to 0.97 radians), while the share of empty sky drifted further from the photo (0.15 to 0.22, against 0.17)."
   ]
  },
  {
   "id": "goodhart",
   "title": "Goodhart’s law in a render queue",
   "paragraphs": [
    "Goodhart’s law says that when a measure becomes a target, it stops being a good measure. Here it happened in hours, not years. Shape overlap only asks whether two masks cover the same pixels. It has no idea what a horse is, and the cheapest way to raise it is to copy the answer.",
    "That is what the traced-outline version did, and a reviewer caught it by reading, not by measuring. The helper’s report described the head as an “opaque silhouette”. My lead agent asked whether that meant a mask traced from the photo: “Tell me which it is.” Four minutes later the helper answered: “the current v2 head is a stamp, so I’m pulling it.” We kept a rule from it. Shaping the starting cloud is allowed if the field notes disclose it. Stamping the photo’s outline into the result never is.",
    "What replaced the number was a description. After the blob, the lead wrote down what makes a horse’s head read as a horse: the snout pointing left and slightly down, a concave forehead line, a distinct notch under the jaw, a bright mane-like rim along the back of the neck, and a narrower neck curving down into the cloud. That is a spec a person can check in one glance. A shape score can’t encode it.",
    "The same day, two more nebulae met their numbers and failed the eye test. Mystic Mountain matched the photo’s texture statistics almost exactly (a power-spectrum slope of −2.61 against −2.59) and still read as a sand sculpture on a beach. The Trifid came out as a smooth orange blob. Both were dropped. All three failures had one cause the metrics couldn’t name: dense dust was being drawn as glowing particles, when real dark clouds block light instead of giving it off."
   ]
  },
  {
   "id": "resolution",
   "title": "Check at the resolution people see",
   "paragraphs": [
    "The native port of the Butterfly Nebula needed a faster method. The web version moved every particle along its own path, four steps a frame. The native version computes seven paths per clump of gas and lets each particle blend the two nearest. It is five times cheaper: 0.57 ms against 2.59 ms per frame at two million particles.",
    "The first version of that idea passed a quick check. At 384 pixels wide, it matched the original at 0.995 correlation. A full-resolution parity image showed what the small check had averaged away: radial streaks, because the first version jittered particles along a single line. The fix gave each particle its own jitter across the seven paths. The shipped version matches at 0.998 on brightness and 0.943 on fine detail, and the side-by-side image is in the handoff for the app team to inspect."
   ]
  },
  {
   "id": "gate-bugs",
   "title": "The gates need tests too",
   "paragraphs": [
    "The gates are code, so they have bugs too. Four we hit:",
    "Gates also say no when the answer is yes. Loops that cycle through a sequence fail the ghosting check by design, so they get a seam-only check. One black-hole loop passed at a seam ratio of 1.26 against the 1.25 limit, with the exception written down."
   ],
   "bullets": [
    "The flash gate assumed 30 frames per second. On 60 fps video it miscounted flashes until the fix read each file’s real frame rate.",
    "A 1080p, 30 fps preview passed the flash gate. Its 4K, 60 fps final failed: short brightness bumps that the preview had smoothed over counted as six swells, over the limit of four. A smoothing pass fixed the final, and now the gate always runs on the file that ships.",
    "The Squid’s interactive scene reported two red flashes in one second. It was the gate’s bookkeeping: it stamps a fade at the end of its plateau, so two slow filter fades three seconds apart landed in one window. Reading the gate’s method beat “fixing” the scene.",
    "The black-frame check failed a correct render. Young nebulae are small and dim, so the threshold now allows a mean brightness of 0.001 with half a percent of pixels lit. A broken render is properly black."
   ]
  },
  {
   "id": "guard",
   "title": "When a gate failure becomes a feature",
   "paragraphs": [
    "Sometimes a failing gate points at a missing feature rather than a bad render. The interactive Butterfly Nebula failed the flash gate on the Mac: four flashes a second in its worst patch. Nothing in it strobed. The failures came from the viewer: zooming into a dense core, or a bright structure sweeping past, made the screen’s total brightness jump in a fraction of a second.",
    "The native port answered with a screen-energy guard. Each frame, the simulation adds up how much light is on screen. When that total rises faster than a slow reference allows, the exposure takes the rise out at once and gives it back over about 0.6 seconds. A surge becomes a swell, and slow fades pass untouched. The Butterfly went from four flashes a second to zero. The guard went to the app team as a proposed reusable block for any particle scene. That beats tuning one scene until it squeaks past."
   ]
  },
  {
   "id": "unwritten",
   "title": "A gate can only check what someone wrote down",
   "paragraphs": [
    "The first finished nebula loop, the Squid, passed everything: zero flashes, an exactly repeating loop, no escapes. I watched it and wrote back that it “just shows stars moving in front of it, you should probably be rotating around” it. No gate could have caught that, because nobody had written “the camera must circle the object” down as a requirement.",
    "It is written down now. Every nebula and object loop orbits once per cycle, and the static Squid is kept as a separate file. That is the other half of working with gates: when a person catches something, decide whether it becomes a rule the next render is checked against."
   ]
  },
  {
   "id": "practice",
   "title": "How I use metrics now",
   "paragraphs": [],
   "bullets": [
    "Hard gates block. They run on the final file, at its real resolution and frame rate, and they report their numbers, not just a pass.",
    "Similarity scores advise. They appear on the review sheet next to the two images, never alone in a status line.",
    "The lead agent looks at a phone-size still before anything reaches me, and writes down why a piece is held.",
    "Shortcuts that game a score are disclosed or banned, in writing.",
    "Every gate gets the same scrutiny as the thing it checks, including a look at how it counts.",
    "When a human catches something, it becomes a rule if it will matter again."
   ]
  }
 ],
 "basis": "Prepared October 10, 2026 from the nebula review sheets and their metric files (28 Horsehead comparisons), the lead agent’s review messages of October 10, the flash-gate source and its fix commit, the loop-gate notes for the Everdust loop packs, the native nebula test report, and the published Conch note for the escape audit. No renders were re-run for this note.",
 "limitations": "The examples come from one studio’s creative work, judged by me and by my lead agent, not by an independent panel. “Looks like a sock puppet” is a human judgment and is reported as one. The shape and colour metrics were computed against reference photographs that are not reproduced here. Thresholds are ours, tuned on our content.",
 "related": [
  {
   "label": "Testing a VR game: what escaped the bots",
   "href": "/writing/testing-a-vr-game"
  },
  {
   "label": "Eight search-and-score loops, and where the scorer lied",
   "href": "/writing/autoresearch-at-home"
  },
  {
   "label": "What running a team of AI agents taught me",
   "href": "/writing/running-a-team-of-ai-agents"
  },
  {
   "label": "The same lesson in video renders",
   "href": "/writing/evaluating-agentic-video"
  },
  {
   "label": "One sim, seven platforms, ported with tests",
   "href": "/writing/one-sim-seven-platforms"
  }
 ]
},
{
 "slug": "one-sim-seven-platforms", "work": { "start": "2026-10-07", "end": "2026-10-10" },
 "type": "note",
 "topics": [
  "Agents",
  "Products"
 ],
 "title": "One sim, seven platforms: porting with agents and tests",
 "summary": "How AI agents turn a web prototype into native code for Vision Pro, iPhone, iPad, Mac, Apple TV and Quest without porting it twice, and the tests that make that safe.",
 "seoTitle": "Porting a WebGL Simulation to Seven Platforms With AI Agents and Automated Tests",
 "category": "Field note / Agents shipping software",
 "description": "Seth Pratt on how AI agents port Everdust’s web prototypes to native Metal, Swift and Quest code: one shader source, a shared Mac build protocol, headless autotests, NaN scans, parity images, and a four-preset nebula port finished in 81 minutes.",
 "lede": "Everdust, my physics-driven app, runs in a browser and on iPhone, iPad, Mac, Apple TV, Vision Pro and Meta Quest. AI agents write nearly all of that code. The interesting part isn’t that agents can write Swift. It’s how a web prototype becomes native software on all of those screens without being ported twice, and which tests make that safe enough to hand to the app team.",
 "takeaway": "Pick the target format before the prototype, write the port once in the shared engine’s terms, and ship it with tests that run without the scarce resource (a headset, a free simulator). Parity is something you measure, not something you hope for.",
 "facts": [
  {
   "label": "Platforms",
   "value": "Browser, iPhone, iPad, Mac, Apple TV, Vision Pro, Quest"
  },
  {
   "label": "Case study",
   "value": "Four interactive nebulas, web to native in 81 minutes"
  },
  {
   "label": "Stack",
   "value": "WebGL → Slang (Metal + SPIR-V) + Swift"
  }
 ],
 "workflowLabel": "How a prototype reaches the app · only the pieces Seth likes get ported",
 "workflow": [
  "Prototype on the web",
  "Seth plays it",
  "Port once in Slang and Swift",
  "Autotest on the Mac",
  "Hand off; the app team merges"
 ],
 "findings": [
  "On October 10 one agent ported four interactive nebula simulations from WebGL to Everdust’s native engine in 81 minutes, from its start to its last commit. The headless Mac test passed on its first run.",
  "One shader source compiles to Metal for Apple’s five platforms and to SPIR-V for Quest. The build checks the shaders’ binding table against the compiler’s own report on every build.",
  "The tests caught what the web had been hiding: Metal returns NaN for the power of a negative number. Every power call now takes a non-negative base, and a scan finds zero invalid particles in all four presets.",
  "In 21 days the app’s repository took 2,384 commits from agents, and 116 of their messages mention a parity check between platforms."
 ],
 "prepared": "2026-10-10",
 "sections": [
  {
   "id": "platforms",
   "title": "Seven platforms, one engine",
   "paragraphs": [
    "Everdust is a music visualizer and playground where every scene is a live physics simulation. Today it runs in seven places. Twenty-one scenes play free in a browser at everdust.ai/play. The app is in public beta on iPhone, iPad, Mac, Apple TV and Vision Pro, and in alpha on Meta Quest. Android and PC VR builds are in progress, and I don’t count them here.",
    "Under the hood there is one engine. Apple’s five platforms share a Swift and Metal engine; Metal is Apple’s interface to the GPU. Quest uses Vulkan, the cross-platform GPU interface, through a thin compatibility layer. The Quest engine’s shaders, the small programs that run on the GPU, are written in Slang, a shading language that compiles one source to both Metal and Vulkan’s format, SPIR-V. New ports use Slang too, so one source serves every platform.",
    "Two lead agents split the work. Cosmo, on the Mac Studio, owns the app: the engine, the platform builds, the release. Beast, my Linux workstation with two large GPUs, prototypes new scenes on the web and renders films. The rule between them is “trial lots, port few.” I play the web prototypes, and only the ones I like get ported."
   ]
  },
  {
   "id": "once",
   "title": "The rule that stopped us porting twice",
   "paragraphs": [
    "Porting used to happen twice. Beast’s agents built a scene in JavaScript and WebGL, and then Cosmo’s agents rewrote it in Swift and Metal. On October 7 I asked for a change: “write in swift/metal so we don’t duplicate work when Cosmo ports it… be mindful of system memory usage, we OOM a lot when agents spawn to do test flows.”",
    "The next day I asked whether the new logo studio was being built that way. It wasn’t; it was still a web page. That afternoon the default changed. All new interactive work is written in Slang and Swift, in the app engine’s own conventions, and the web version becomes a quick reference. Beast’s agents never write to the app’s repositories. They build in a sandbox on the Mac, deliver a package and a handoff note, and Cosmo’s agents merge it.",
    "This is a product decision more than an engineering one. If the target format isn’t chosen before the prototype, every winning prototype costs two builds."
   ]
  },
  {
   "id": "case",
   "title": "Case study: four nebulas in 81 minutes",
   "paragraphs": [
    "On October 10 a helper agent finished four interactive nebula pages for the web: the Squid, Hourglass, Ring and Butterfly nebulas. You hold one at arm’s length, turn it, step inside it, scrub through how it formed, and blow on it with an open palm. At 8:27 pm I approved the first one. At 8:28 another agent started the native port.",
    "It landed in four commits. The Squid and Hourglass came first, at 9:13, with the shaders, the Swift code, the test harness and a handoff note. The Ring and Butterfly followed at 9:41, together with two things the web version lacked: a scan for invalid numbers and a screen-brightness guard. A catch-up for the Hourglass and the final note with timing tables landed by 9:49. That is 81 minutes, including a long wait for the Mac’s shared simulator.",
    "A few design choices made it fast and safe:"
   ],
   "bullets": [
    "One interface for all four nebulas. Adding a nebula means three one-line entries plus its own shapes.",
    "One argument table. A GPU program expects its buffers and textures in a fixed order. Every nebula kernel shares one table, and the build script checks it against Slang’s own reflection report on every build. An earlier port had been bitten by the compiler numbering those slots across programs.",
    "Tunables stay data. Each nebula reads the same settings file the web page reads, so a tweak needs no shader rebuild.",
    "A test harness ships with the code, including a headless Mac version that runs the real Metal path with no window or headset."
   ]
  },
  {
   "id": "tests",
   "title": "What the tests checked",
   "paragraphs": [
    "Each nebula ran a scripted session on the Mac at two million particles: fade in, turn it and let it coast, resize it with two hands, two palm-wind pushes, switch colour filters, step inside and back out, then play its whole formation. That is about 2,000 frames per nebula."
   ],
   "table": {
    "caption": "Native nebula autotest on the Mac (M3 Ultra, headless, real Metal) · 2 million particles · October 10, 2026",
    "headers": [
     "Check",
     "Squid",
     "Hourglass",
     "Ring",
     "Butterfly"
    ],
    "rows": [
     [
      "Photosensitivity gate",
      "Pass",
      "Pass",
      "Pass",
      "Pass"
     ],
     [
      "Non-black key frames",
      "14/14",
      "14/14",
      "14/14",
      "14/14"
     ],
     [
      "Invalid (non-finite) particles",
      "0",
      "0",
      "0",
      "0"
     ],
     [
      "Scene checks through the engine interface",
      "9/9",
      "9/9",
      "9/9",
      "9/9"
     ],
     [
      "Simulation time per frame",
      "0.30–0.58 ms",
      "0.52 ms",
      "1.04 ms",
      "0.57–0.71 ms"
     ]
    ]
   },
   "after": [
    "The simulation itself is cheap. Drawing the particles as soft dots is the real cost, so each platform gets its own ceiling: three million particles on Vision Pro, one million on iPhone, six million on the Mac. After a 27-minute wait for the shared simulator lock, the Squid’s full autotest also passed inside the visionOS simulator. The simulator can’t report real GPU times, so every timing comes from the Mac."
   ]
  },
  {
   "id": "hidden",
   "title": "What the web was hiding",
   "paragraphs": [
    "Porting is where a prototype’s quiet assumptions surface. The web build of the nebulas raised numbers to fractional powers, and some of those numbers could go slightly negative. On the web that never caused visible trouble. Apple’s Metal returns NaN, “not a number”, which can blank part of the image. The fix went into both versions: every power call now takes a non-negative base, squares are written as multiplications, and the native test scans the particle buffer for invalid values at three key moments.",
    "Precision was another. The web stores each particle’s light in half-precision numbers, which flush the faintest particles to zero at two million and above. The native version stores it at full precision. And the Butterfly needed a faster method on native, which first passed a low-resolution check while adding streaks. That story, and the brightness guard that turned a failed flash test into a feature, are in the companion note on gates.",
    "The app team hits the same class of problem from the other side. One scene needed its own Quest version because Android’s Swift libraries lack a few maths functions that Apple’s provide. A shader check on the Quest side had silently passed for a while: a quirk in how a shell pipeline reported errors hid every hit until someone made it strict."
   ]
  },
  {
   "id": "shared-mac",
   "title": "Sharing one Mac with a dozen agents",
   "paragraphs": [
    "Linux can’t run Metal or the visionOS simulator, so every native build happens on the Mac, which Cosmo’s own eight to ten agents are already using. We agreed a protocol, and Beast’s agents follow it like everyone else:",
    "Slot waits run five to eight minutes. On October 8 the logo port couldn’t use the simulator at all: another agent’s launch had hung for over 55 minutes and the simulator service was stuck for everyone. The fallback was a headless macOS test target built from the same sources. It gave real Metal numbers anyway: a million-star logo at 3.3 ms per frame for the whole stage, with every gate passing. The lesson stuck. Always keep one test path that doesn’t depend on the contended resource."
   ],
   "bullets": [
    "Two build slots for the whole machine, claimed by creating a lock folder and released the moment a build ends. Beast builds with four parallel jobs.",
    "A separate lock for the simulator, always taken before a build slot, never while holding one.",
    "A memory gate: no build starts while the Mac’s committed memory is above 75 percent.",
    "Never shut a simulator down. Doing so on October 2 crashed the simulator service for every agent. Agents stop only their own app.",
    "A 15-minute cap per job, and kill only the processes you started."
   ]
  },
  {
   "id": "app-team",
   "title": "The app team’s side",
   "paragraphs": [
    "Cosmo’s agents build the app itself, and their habits look like this. In 21 days, 116 commit messages in the app repository mention a parity check: Quest shaders against Apple, the native rules engine against the server’s, web pages against native scenes. A native laser show matched its web reference at 97.2 to 97.9 percent, and every miss sat in one beat, which the agents flagged back to Beast instead of hiding. A viewable-zone audit, built from Apple’s spatial design guidance, checked 229 scenes for text and targets placed where people can’t comfortably look, and cut the failures from 70 to 41. On October 6 a Quest build was installed on my own headset.",
    "This is why I describe the platform work as agents shipping native software with gates, not as “I build VR.” I set the product rules: which prototypes earn a port, the photosensitivity bar, eye-level placement, what ships. The agents do the porting, and the tests decide whether a port is real."
   ]
  },
  {
   "id": "not-yet",
   "title": "What isn’t proven yet",
   "paragraphs": [],
   "bullets": [
    "None of the four native nebulas has run on a headset. The Vision Pro budgets will come from the engine’s governor, which adjusts particle counts at runtime.",
    "The Quest versions of these shaders pass the Vulkan validator but haven’t run on a Quest.",
    "The engine draws particles its own way, so expect one brightness trim after the first headset look.",
    "The web pages keep moving. Each native preset names the web commit it ports, and a sync script pulls settings from the repository’s committed state, not from someone’s working copy."
   ]
  }
 ],
 "basis": "Prepared October 10, 2026 from the native nebula port (its source tree, commits, README and handoff note with the test tables), the logo-blocks port of October 8, the Mac build protocol agreed with the app team, the app repository’s commit history (read-only, counts and commit subjects), the handoff ledger, and the public everdust.ai pages for platform status.",
 "limitations": "None of the ported nebulas has run on a headset yet; Vision Pro budgets will come from the engine’s governor at runtime. The Quest build of these shaders is validated, not run. Timings are from one Mac whose GPU other agents were sharing, so they vary up to twofold between runs. Commit counts and keyword counts measure activity, not quality. Everdust’s code is not open source, so this note describes it without code.",
 "related": [
  {
   "label": "The gates, and a render that beat its metric and still looked wrong",
   "href": "/writing/when-the-metric-says-yes"
  },
  {
   "label": "What running a team of AI agents taught me",
   "href": "/writing/running-a-team-of-ai-agents"
  },
  {
   "label": "Everdust",
   "href": "https://everdust.ai"
  }
 ]
},
{
 "slug": "tuning-a-game-with-ai-playtesters", "work": { "start": "2026-10-03", "end": "2026-10-10" },
 "type": "note",
 "topics": [
  "Agents",
  "Evals"
 ],
 "title": "Tuning a game with panels of AI playtesters",
 "summary": "Twenty-one revisions of a VR physics game, scored by cold AI tester panels and noisy bots: what moved the scores, where the judges disagreed, and what only a human caught.",
 "seoTitle": "AI Playtesters and LLM-as-Judge — Tuning a VR Physics Game Over 21 Revisions",
 "category": "Field note / LLM-as-judge",
 "description": "Seth Pratt on tuning A Handful, a VR physics game, with panels of Claude Sonnet, Fable and Opus playtesters plus scripted noisy bots: a 5.11 to 7.72 score climb, a plateau short of 8.5, the bugs the testers found, and the “too easy” verdict only a human gave.",
 "lede": "A Handful is a physics game where you hold a cloud of dust and nudge it, and real laws build a star, planets, oceans and finally something alive. I wanted it tuned the way a research loop tunes a model: change one thing, test it cold, keep what helps. So AI agents played it, scored it and wrote up what confused them, 46 times over 21 revisions. They were genuinely useful. They were also confidently wrong in ways worth knowing before you trust an AI judge.",
 "takeaway": "AI playtesters are good at “does this make sense?” and at finding real bugs. Measure difficulty with bots, not opinions, and keep humans for feel, sound and the headset. Report the judges’ noise, and don’t chase one judge’s taste.",
 "facts": [
  {
   "label": "Game",
   "value": "A Handful, a VR and browser physics game"
  },
  {
   "label": "Loop",
   "value": "21 revisions, 46 cold AI playthroughs, October 3–10, 2026"
  },
  {
   "label": "Result",
   "value": "Panel mean 5.11 → 7.72, short of the 8.5 target"
  }
 ],
 "workflowLabel": "One revision · each rev tests one hypothesis, and changes that lower the score are reverted",
 "workflow": [
  "Hypothesis",
  "Build the change",
  "Bots self-check",
  "Cold AI panel scores it",
  "Keep or revert"
 ],
 "findings": [
  "Over 21 revisions and 46 cold playthroughs, the AI panel’s mean rose from 5.11 to 7.72 and then plateaued around 7.5 to 7.7, short of the 8.5 stop target. A single tester’s run moved by about ±0.5, so late revisions were statistically level.",
  "The testers praised an auto-locking throw as “the best piece of interaction design in the game.” A noisy bot showed it hit on the first try every time, and my first play in the headset found the game “a little too easy now.”",
  "A camera bug widened the field of view on every scroll from revision 9 through 17. Testers reported its symptoms for nine revisions, and none of them found the cause.",
  "After the late game was made two to three times harder (a noisy bot’s ocean throw went from 1 try to a median of 3), the panel still scored 7.72, equal to its best."
 ],
 "prepared": "2026-10-10",
 "sections": [
  {
   "id": "setup",
   "title": "The setup",
   "paragraphs": [
    "A Handful has no score. You hold a cloud of dust and can only nudge it: squeeze it, warm it, stir it, throw things. Gravity, heat and orbits do the rest. Each time you understand something by doing it, a light appears in a shared sky. The ending shows that your dust was once someone else’s star.",
    "When I asked for it on October 3, I asked for “a few revs with sonnet/fable/opus testers almost like autoresearch karpathy style.” That meant a loop. Each revision tests one hypothesis. Scripted bots check that the whole game still runs end to end. Then a panel of AI testers plays it cold, with only the in-game instructions, and scores nine things from 1 to 10: whether you know what to do within 30 seconds, controls, movement, physics, the “aha” moments, beauty, sound, the ending, and whether you’d recommend it. A change that lowers the mean gets reverted. The loop stops when the mean holds at 8.5 or above for two revisions.",
    "The panel was three Claude models with different jobs. Sonnet judged clarity and controls, Fable feeling and beauty, Opus physics truth. Each tester was an agent driving a real browser with a mouse, writing up where it got stuck and what delighted it."
   ]
  },
  {
   "id": "scores",
   "title": "The scores",
   "paragraphs": [],
   "table": {
    "caption": "Panel mean per revision (1–10) · Sonnet, Fable and Opus through rev 7; Sonnet and Fable from rev 9 · October 3–10, 2026",
    "headers": [
     "Rev",
     "Mean",
     "What changed"
    ],
    "rows": [
     [
      "1",
      "5.11",
      "First full build. All three testers were blocked: an invisible start screen still swallowed every click."
     ],
     [
      "2",
      "6.44",
      "Start screen fixed; lights must be earned by an action, not handed out"
     ],
     [
      "5",
      "7.19",
      "A visible warmth-against-gravity gauge; a chapter now waits for your touch"
     ],
     [
      "6",
      "6.89",
      "A strict rule built on one judge’s complaint. Reverted."
     ],
     [
      "9",
      "6.89",
      "Watched chapters made playable (Sonnet only; a real bug blocked the throw)"
     ],
     [
      "11",
      "7.33",
      "The glowing cloud restored; the star picker fixed"
     ],
     [
      "13",
      "7.39",
      "Every chapter ends on something you do, not a timer"
     ],
     [
      "14",
      "7.50",
      "Each light visibly caused; an ocean world you can see"
     ],
     [
      "17",
      "6.67",
      "A runaway-planet bug stranded a tester for 20 minutes"
     ],
     [
      "18",
      "7.61",
      "The field-of-view leak fixed; the camera frames the subject"
     ],
     [
      "19",
      "7.72",
      "Grabbing made forgiving for touch; your world forms dry"
     ],
     [
      "20",
      "7.33",
      "Polish; within noise of rev 19"
     ],
     [
      "21",
      "7.72",
      "After my headset play: harder late game, a new moon-making beat, designed sound, a narrator"
     ]
    ]
   },
   "after": [
    "The climb was real: from 5.11 to a plateau around 7.5 to 7.7. But single runs are noisy, about half a point per tester, so revisions 18 to 21 are statistically level. The 8.5 target was never reached, and I’d rather say so than move the target.",
    "The biggest jumps came from removing blockers and from giving the player something to do where they had been watching. A regression check mattered too. Before testing revision 11, the agent re-checked everything that had made revision 5 the best so far. It found that revision 9’s crisper particles had quietly flattened the glowing cloud, and Fable’s beauty score had dropped from 8 to 6. Restoring the glow was part of revision 11’s gain. A loop that only tests the new change will slowly lose the old wins."
   ]
  },
  {
   "id": "good",
   "title": "What the testers were good at",
   "paragraphs": [
    "They found real bugs that unit checks had missed. In the first build, a start screen that had faded to invisible still caught every click, so all three testers were stuck at the door. In revision 9, Sonnet tried a throw about 19 times and the aiming guide never turned green. The cause: the guide compared the throw’s future path with where the target was now, not where it would be. In revision 10, the star picker showed nothing, because it tested the mouse position mid-frame while the camera was updating. In revision 17, a tester’s planet kept swallowing material until it became a gas giant 1,107 times Earth’s mass, stopped counting as “your world,” and stranded the tester in that chapter for about 20 minutes.",
    "They were also good at “does this make sense?” Their notes named the confusing moment, the misleading caption and the light that arrived for nothing. When the gesture help page still said “drag away to aim” after the game had switched to “drag toward your world,” a tester failed every throw and said exactly why."
   ]
  },
  {
   "id": "disagree",
   "title": "Where the judges disagreed",
   "paragraphs": [
    "Opus graded hardest. It marked down lights you couldn’t fail to earn, and physics details like a star brighter than its own mass allowed. Its scores sat around 6.2 to 6.7 while Sonnet’s sat around 7.4 to 7.8. In revision 6 I acted on Opus’s complaint with a strict rule: you only earned the “squeeze” light after the cloud had bounced back once. It cost 0.3 points, Opus itself faulted a player who squeezed correctly the first time and got nothing, and it was reverted. From revision 9, Opus was kept for the hardest judgment calls only.",
    "Fable asked for the same thing three revisions running: make each light visibly caused. It stayed flat at 6.7 to 6.9 until that was done, then reached 7.0 and later 7.33. The panel was also good for A/B questions. At the ending, Fable compared a version that showed the final reveal as a match cut with one that stated it in a caption. It chose the unsaid version: “let me make the connection myself, which is the game’s whole thesis.”"
   ]
  },
  {
   "id": "blind",
   "title": "Where they were wrong, or blind",
   "paragraphs": [
    "Too easy. In revision 12 the throw locked onto an exact orbital path that met your planet, with a green arc and a chime. The testers loved it, and Fable called it “the best piece of interaction design in the game.” The score held. Then I played revision 20 on Vision Pro and wrote back that it was “a little too easy now.” A noisy bot confirmed it: the locked throw hit on the first try, every time. Nobody on the panel had said easy.",
    "Sound. The testers ran in headless browsers and couldn’t hear anything. Early on, sound was scored 5, meaning “unknown,” by rule. Later it was scored from a measured audio report: how much energy sat in the bass, the brightness of the mix, which events fired. That beat guessing, but it measured a proxy. My verdict after one listen was “needs better game audio.”",
    "The headset. Testers played with a mouse. The hand gestures were verified only with synthetic hands in an emulator. The real test was my hands.",
    "Finding the cause. From revision 9, every scroll that squeezed the cloud also widened the camera’s field of view, because the page shell applied its own zoom and the game never reset it. Testers reported the symptoms for nine revisions: things looked sparse and distant, and gas giants stretched at the edges of the screen. None found the cause. My lead agent found it by looking at the framing itself instead of reading more reports. Revision 18 pinned the field of view. A measured check of how much of the screen each subject filled then found four moments still under 30 percent, and the next build fixed them.",
    "Harness artifacts that turned out to be real. One tester’s browser driver pressed without hovering first, so a slow-down that triggered on hover never fired for it. That looked like a test artifact, until I remembered that touch players can’t hover either. The fix, a magnetic grab, helped everyone."
   ]
  },
  {
   "id": "bots",
   "title": "Bots for difficulty, panels for sense",
   "paragraphs": [
    "After “too easy,” difficulty became a bot’s job. A noisy bot plays with human-sized errors: 34-pixel clicks, a 320-millisecond reaction, aim off by up to 11 degrees and power off by up to 24 percent. An expert bot uses smaller errors. Each beat gets a table across many random seeds, and my target is a median of about three tries for an average player and one or two for an expert."
   ],
   "table": {
    "caption": "Tries per beat · noisy and expert bots across 6 to 12 seeds · revision 20c against revision 21",
    "headers": [
     "Beat",
     "Rev 20c",
     "Rev 21, noisy bot",
     "Rev 21, expert bot"
    ],
    "rows": [
     [
      "Throw ice to make your world’s oceans",
      "1 (always the first try)",
      "Median 3",
      "Median 2.5"
     ],
     [
      "Throw a body for a glancing, moon-making hit",
      "(new beat)",
      "Median 3.5",
      "Median 1"
     ],
     [
      "Catch drifting supernova grains",
      "10 to 16 of 18 caught",
      "2 to 6 of 12 caught",
      "4 to 6 caught"
     ]
    ]
   },
   "after": [
    "An exact, zero-noise bot found two bugs of its own along the way. The aiming prediction assumed a perfectly circular orbit, which the giant planets perturb. And a gentle throw was being mistaken for setting a body down. With the late game two to three times harder, the panel scored revision 21 at 7.72, equal to its best. Both testers finished in about 20 minutes, and the new narrator scored 7 and 8 out of 10."
   ]
  },
  {
   "id": "again",
   "title": "How I’d run it again",
   "paragraphs": [],
   "bullets": [
    "Use AI panels for clarity and bugs, run cold, with one hypothesis per revision.",
    "Report the noise. With one run per tester, half a point is weather.",
    "Don’t chase one judge’s taste. Look for asks that repeat across revisions and testers.",
    "Measure difficulty with noisy and expert bots, never with opinions.",
    "When testers keep describing a symptom, measure something before changing anything.",
    "Keep humans for feel, sound and the headset, and get them in earlier than revision 20."
   ]
  }
 ],
 "basis": "Prepared October 10, 2026 from the game’s revision log (every panel score, tester note, bot table and audio measurement for revisions 1–21), my feedback rules for games, and the October 10 play notes I sent after trying it on Vision Pro. Panel scores are the testers’ own 1–10 ratings, averaged as recorded. No runs were repeated for this note.",
 "limitations": "One game, one designer and three AI models, with mostly one cold run per tester per revision, so single scores are noisy. The testers drove a remote browser with a mouse; none wore a headset or heard the sound directly (sound was scored from a measured audio report). The 8.5 target and the nine-item rubric are mine. Human feedback comes from one player, me.",
 "related": [
  {
   "label": "Eight search-and-score loops, and where the scorer lied",
   "href": "/writing/autoresearch-at-home"
  },
  {
   "label": "A Handful in the Lab",
   "href": "/lab/step-inside#a-handful"
  },
  {
   "label": "Video renders, and an evaluator that needed evaluating",
   "href": "/writing/evaluating-agentic-video"
  },
  {
   "label": "What running a team of AI agents taught me",
   "href": "/writing/running-a-team-of-ai-agents"
  }
 ]
},
{
 "slug": "create-constrained-generation", "work": { "start": "2026-10-03", "end": "2026-10-06" },
 "type": "note",
 "topics": [
  "Products",
  "Agents",
  "Evals"
 ],
 "title": "Create: a language model, a parts list and a validator",
 "summary": "How Everdust’s Create turns a sentence into a playable game: the model writes data from registered parts, and a validator proves every game can be won and lost before anyone sees it.",
 "seoTitle": "Constrained Generation With a Validator — LLM-Built Games That Are Proven Playable",
 "category": "Field note / Generative product design",
 "description": "Seth Pratt on Everdust Create: a language model composes games as JSON recipes from registered physics parts, and a play-testing validator proves each one winnable and losable. 20 of 20 playable in a 20-prompt eval at $0.29 median per game, with the judge scores, the loopholes and the limits.",
 "lede": "Create, inside Everdust, lets you describe a game in a sentence and then play it with your hands. The tempting design is to let a language model write code. We didn’t. The model writes a recipe made only from parts the engine already knows, and a validator plays every game before you see it, to prove it can be won and lost. That design is why the eval came out 20 for 20, and also why the games top out where they do.",
 "takeaway": "Generate data, not code. Constrain the model to a registry of tested parts, prove each result by running it, allow one bounded repair, and measure cost per accepted result. “Playable” is the floor that a validator can guarantee. “Fun” depends on the parts list.",
 "facts": [
  {
   "label": "Eval",
   "value": "20 prompts, 20 playable, 17 on the first try"
  },
  {
   "label": "Cost",
   "value": "$0.29 median per game, 134 s median wait"
  },
  {
   "label": "Built by",
   "value": "Cosmo’s agents; I set the product rules"
  }
 ],
 "workflowLabel": "From a sentence to a playable game · nothing reaches the player until the play-test passes",
 "workflow": [
  "Describe the game",
  "The model writes a recipe",
  "Schema and render checks",
  "Play-test: winnable and losable",
  "Tighten, then play"
 ],
 "findings": [
  "On a 20-prompt eval, all 20 generated games were playable. Every first reply fit the schema, 17 passed every check on the first try, and 3 needed their one allowed repair.",
  "Before anyone sees a game, a solver proves every level can be won and a careless player proves the first level can be lost. A random shooter won level 1 of none of the 20.",
  "A game cost $0.29 median with a warm prompt cache ($0.67 worst case) and took 134 seconds median. The whole eval, judge calls included, cost $13.24.",
  "A judge model rated spectacle 3.6 and fun 3.05 out of 5. The validator can guarantee playable. The biggest lever for fun was new parts, not a better prompt."
 ],
 "prepared": "2026-10-10",
 "sections": [
  {
   "id": "idea",
   "title": "Describe it, play it",
   "paragraphs": [
    "Everdust’s Create turns words into live simulations. On a phone you describe a world and watch it move to your music. In a headset you can describe a game, like “knock the tin cans off the fence” or “a calm game: light the paper lanterns over a dark lake”, and play it with your hands a couple of minutes later.",
    "Cosmo’s agents built it. My part was the product rules: paying users always get the strongest model, games are for headsets first, and quality comes before cheap tiers. The most important call was architectural, though. The model does not write code. It writes a recipe: a JSON document that composes only registered parts. A part is a building block the engine already knows how to run, with a name and a version, like a slingshot, a bow, a gravity well, a target on an orbit, a gate to fly through, or a sound voice.",
    "There are two reasons. App Store rules don’t allow apps to download and run new code, and a recipe is data. And a recipe can’t do anything the parts can’t. A badly written recipe fails validation; it doesn’t crash the app or do something unsafe."
   ]
  },
  {
   "id": "validator",
   "title": "The validator: prove it before showing it",
   "paragraphs": [
    "Every game goes through the same pipeline before it reaches a player."
   ],
   "bullets": [
    "The model writes plain JSON. Structured output, an API mode that forces a reply to fit a schema, wasn’t possible: the game schema compiles to a grammar larger than the API allows. So the full schema goes in the prompt, and validation catches the rest.",
    "Schema and bounds checks, then a render check: the game’s world is drawn headlessly to make sure it shows something.",
    "Winnable: a solver plays every level the way a person could, with the gesture’s real origin and speed limits, a person’s pace and the 1.5-second pinch delay. It searches hundreds of candidate shots at once against the moving targets. It only accepts a shot that still lands with the aim off by 1.5 degrees and the power off by 5 percent, then fires it in the real game engine.",
    "Losable: a careless player who wastes every shot must lose level 1.",
    "Luck: a random shooter’s chance of winning level 1 is measured and reported.",
    "One repair: if a check fails, the model gets one more turn with the exact findings quoted. There is one repair for structural slips and one for a failed play-test. A game that is still unwinnable is rejected, and the credit is refunded.",
    "Fair, then hard: a quiver or clock far looser than the solver needed is tightened to about twice what the solver used. Tightening can only make a level harder to win and easier to lose, and the solver’s own run still fits, so both proofs stand."
   ]
  },
  {
   "id": "twins",
   "title": "Two engines that agree tick for tick",
   "paragraphs": [
    "A proof is only worth something if it is about the game the player gets. The server’s rules engine, in Python, and the headset’s, in Swift, are written line for line to match. Both use a fixed step of 1/120 of a second, double-precision maths and no randomness. The only inputs are “launch from here at this velocity” and “advance.”",
    "The team checks this by exporting the solver’s winning inputs from the server and replaying them in the Swift engine. The event logs match exactly on all three example games: 7, 19 and 27 events, with the same final scores. When games could later be built from larger blocks, the same replay matched on all eight test games. Cathedral of Light, for example, produced 227 identical events over 3,839 ticks."
   ]
  },
  {
   "id": "eval",
   "title": "The eval: twenty prompts",
   "paragraphs": [],
   "table": {
    "caption": "Create games eval · 20 prompts (5 simple, 6 medium, 9 ambitious) · Claude Opus 5.5 on the server’s own pipeline · October 3, 2026",
    "headers": [
     "Measure",
     "Result"
    ],
    "rows": [
     [
      "Games ready to play",
      "20 of 20"
     ],
     [
      "First reply fit the schema",
      "20 of 20"
     ],
     [
      "Passed every check on the first try",
      "17 of 20 (3 used their one repair)"
     ],
     [
      "Random shooter wins level 1",
      "0.0 in every game"
     ],
     [
      "Cost per game, median (warm cache)",
      "$0.29 ($0.23–0.39; up to $0.67 with a cold cache and a repair)"
     ],
     [
      "Wait, median",
      "134 s (max 210 s)"
     ],
     [
      "Judge: spectacle / fun (1–5, from still frames)",
      "3.6 / 3.05"
     ],
     [
      "Total spend, including judge calls, repairs and refines",
      "$13.24"
     ]
    ]
   },
   "after": [
    "The history behind those numbers is more useful than the totals. On the first pass, one game failed because of a bug in our play-test, not in the game: a reused loop variable threw the solver’s timing off. The validator had to be fixed first. Another game was correctly rejected. Its first reply used four gravity wells where the limit is three, and its repaired version put a repeller directly between the slingshot and the cup with no gravity to curve around it, so no shot could win. It was refunded. That case is why there is now one repair per kind: a structural slip shouldn’t use up the play-test’s repair.",
    "Most of the wait is the model writing 9,000 to 19,000 tokens of JSON and reasoning. The play-test and render check take 10 to 30 seconds. A follow-up tweak, like “make the bells bigger and add a final level”, is written as a short list of edits to the existing recipe, and costs about a third as much and takes about a third as long as a new game."
   ]
  },
  {
   "id": "judge",
   "title": "What the judge changed, and what it couldn’t see",
   "paragraphs": [
    "An Opus judge scored each game from three still frames from the harness, plus the game’s summary and play-test result. It named the best and the worst thing about each game. Its first verdicts drove two changes. The player drew targets larger, with a dark backdrop and a beacon, which lifted spectacle from 3.40 to 3.50 on the same recipes. The prompt changed too: the pieces are the stars of the show, so build the named thing out of particles and put the targets on it. The six weakest games, regenerated, rose from 2.83 to 3.17 on spectacle and from 2.83 to 3.00 on fun.",
    "Fun stayed near 3 for almost every game, for two reasons. A still frame can’t show how a game feels in your hands. And with four gestures and fixed rules, the loops look alike: aim, shoot, next target. The judge kept asking for the same things: targets lost in a busy world, too little tension, the named creature only half built, payoffs you can’t see."
   ]
  },
  {
   "id": "production",
   "title": "In production",
   "paragraphs": [
    "On October 6, games started shipping in every Vision Pro build that has Create, and an agent ran a production eval the same day. It sent 16 prompts a real person might type to the live service, exactly as the app sends them. All 12 game prompts produced a ready game on the first try, with no repairs, at a median of 127 seconds and $0.27. All 4 unsafe prompts were refused, three by the model’s decline rules and one by a deny-list before any model call, and none was charged. The whole run cost $3.94.",
    "The agent scored each game itself from a clip and contact sheet: playable 4.75 out of 5, fun 3.08, matched the prompt 3.17. Its failure list reads like a product backlog:"
   ],
   "bullets": [
    "Everything is a glossy orb. The tin cans, jellyfish and comets were named in the text and missing on screen.",
    "Nothing reacts physically to a hit. Targets vanish instead of tipping, falling or bouncing.",
    "Mechanics the four gestures can’t express come back as aiming games in costume. “A rhythm game” ignored the rhythm.",
    "The automatic tightening overrode what the player asked for. A “60 second” game got 19 to 27-second clocks. That one was fixed the same day: a clock the player names is never tightened."
   ]
  },
  {
   "id": "loopholes",
   "title": "The validator’s own loopholes",
   "paragraphs": [
    "Validators are code, and they have holes. When games could be built from bigger blocks, the first production torch-exploration game passed only because the solver’s retry happened to make the right move. The torch stood 0.75 metres away against a 0.7-metre reach. Now a win after a failed level doesn’t count, and the reach allows a lean. In the same round, an over-strict schema for the help animations failed all three first attempts over fields the app ignores, so decoration is now checked leniently while rules stay strict.",
    "The block version also carries rules a sentence can’t talk its way past. Each composition has exactly one goal, a cost budget of at most 16 points with at most two GPU-heavy blocks, room-scale bounds that keep lasers at least two metres from your eyes, and a ban on game rules that read purely visual blocks."
   ]
  },
  {
   "id": "limits",
   "title": "What it can’t make, by design",
   "paragraphs": [
    "The parts list is both the safety rail and the ceiling. Today a generated game can’t contain things that move when you hit them, like billiard balls or dominoes. It can’t grab, draw or catch, and its enemies can’t react to you. None of that is a prompt problem. Each needs a new part, built and tested in both engines.",
    "That is the main product lesson. In constrained generation, the model’s job is composition, and the team’s job is the parts. Playable is the floor a validator can guarantee. Fun is a property of the parts list, so that’s where the next investment goes."
   ]
  },
  {
   "id": "principles",
   "title": "What I’d reuse anywhere",
   "paragraphs": [],
   "bullets": [
    "Have the model generate data against a versioned registry of parts, not code.",
    "Validate by running the result, not by reading it. Prove success and failure both.",
    "Allow one bounded repair that quotes the exact findings, then reject and refund.",
    "Keep two implementations of the rules, and replay to prove they agree.",
    "Track cost and latency per accepted result, including repairs and cache effects.",
    "Treat the judge as advice. Treat the validator as code that needs its own adversarial review."
   ]
  }
 ],
 "basis": "Prepared October 10, 2026 from the app team’s Create-games design and eval document (the 20-prompt eval of October 3, its run log, judge verdicts and spend ledger), the production eval of October 6 (16 prompts sent to production exactly as the app sends them), and the games-from-blocks proof of the same day. All were read from the app repository and wiki without changes. No runs were repeated for this note.",
 "limitations": "Twenty prompts written by the team is a small, friendly sample. The judge scored three still frames per game plus a summary, so it could not feel hand controls, and fun scores mostly sat at 3. No eval game was played on a headset during these runs, and Quest has no game player yet. Costs are model costs at list prices for one model, and they depend on prompt caching.",
 "related": [
  {
   "label": "Eight search-and-score loops, and where the scorer lied",
   "href": "/writing/autoresearch-at-home"
  },
  {
   "label": "Everdust",
   "href": "https://everdust.ai"
  },
  {
   "label": "Tuning a game with panels of AI playtesters",
   "href": "/writing/tuning-a-game-with-ai-playtesters"
  },
  {
   "label": "When the metric says yes and your eyes say no",
   "href": "/writing/when-the-metric-says-yes"
  }
 ]
},
{
 "slug": "autoresearch-at-home",
 "type": "note",
 "topics": [
  "Evals",
  "Agents"
 ],
 "title": "Autoresearch at home: eight search-and-score loops, and where the scorer lied",
 "summary": "Eight loops that generate candidates, score them against evals on local GPUs and keep the winners, from video and games to strange attractors and artificial life, and every place the scorer turned out to be wrong.",
 "seoTitle": "Autoresearch at Home — Eight Generate-Score-Select Loops and Their Scorer Failures",
 "category": "Field note / Search and evaluation",
 "description": "Seth Pratt on eight autoresearch-style loops run on two workstation GPUs: video eval suites, a UGC scoring fleet, a 2.5-billion-candidate attractor search, quality-diversity search for artificial life, AI playtesters, Create, test-time search and nebula look-dev. The numbers, and the four ways the scorers failed.",
 "lede": "A simple loop now runs on enormous compute in AI labs: generate candidates, score them against a set of evals, keep the winners, repeat. Over six months I ran eight versions of it at home, on two workstation GPUs and a few API budgets. They found real things. They also showed me, again and again, that a search is only as good as the thing that scores it.",
 "takeaway": "The search is the easy part. Spend your rigor on the scorer. Calibrate judges against people, verify winners on a longer or stricter test than the one that selected them, never select on a single number, and keep the losing candidates so you can change your mind cheaply.",
 "facts": [
  {
   "label": "Loops",
   "value": "8, from video to artificial life"
  },
  {
   "label": "Largest search",
   "value": "2.5 billion candidate equations"
  },
  {
   "label": "Hardware",
   "value": "Two RTX PRO 6000 GPUs, plus API budgets"
  }
 ],
 "workflowLabel": "The loop every section shares · step four is the one most often skipped",
 "workflow": [
  "Generate candidates",
  "Score against evals",
  "Keep the winners",
  "Verify on a harder test",
  "Repeat or stop"
 ],
 "findings": [
  "A GPU search tested 2.5 billion random equation systems for chaos, confirmed 3.08 million and named 8. A 64-bit audit then retracted two of our own finds: one leaked 37 percent of its particles, and one from an earlier search always escaped to infinity.",
  "A quality-diversity search ran about 276,000 artificial-life trials. When 144 of its elites were re-run for six times the length of a search trial, 47 of them, about a third, fell apart.",
  "Two small language models searching together solved 24 of 40 maths problems; a stronger model’s simple majority vote solved 25, at a quarter of the tokens. The search’s own “verified” flag fired on all 40, including the 16 it got wrong.",
  "In video, an early lip-sync metric scored 0.77 on clips whose lip sync was dead. Its better replacement, used alone to pick takes, brought back lip-smacking."
 ],
 "prepared": "2026-10-10",
 "work": {
  "start": "2026-04-03",
  "end": "2026-10-10",
  "label": "April–October 2026"
 },
 "sections": [
  {
   "id": "loop",
   "title": "The loop, and why it’s everywhere",
   "paragraphs": [
    "Andrej Karpathy’s autoresearch repository made the pattern concrete: give an agent something narrow to change, a fixed budget and a validation score, and let it try changes, keep what scores better and discard the rest. Versions of that loop now run at very large scale in AI labs. The same shape works at home, because the expensive part, scoring thousands of candidates, is what a pair of big GPUs is for.",
    "I have run it eight times in six months, on very different problems. In each case the interesting story wasn’t the search. It was the scorer: what it actually measured, and how the search found its blind spots."
   ],
   "table": {
    "caption": "Eight search-and-score loops · April–October 2026",
    "headers": [
     "Loop",
     "What it generated",
     "How it scored",
     "Scale",
     "Where the scorer lied"
    ],
    "rows": [
     [
      "Video eval suite",
      "Story video renders",
      "Prompt lint, file checks, speech checks, a vision-model judge",
      "Every render, automatically",
      "Voice and judge scores uncalibrated; a parser bug made speech checks skip silently"
     ],
     [
      "UGC factory",
      "Talking-head ad clips",
      "An eight-model scoring fleet, beam search over takes",
      "89 logged experiments by April 6",
      "A metric scored 0.77 on dead lip sync; the fix, used alone, picked lip-smacking"
     ],
     [
      "Strange attractors",
      "Random systems of equations",
      "Boundedness and chaos tests on the GPU",
      "2.5 billion candidates",
      "32-bit estimates and silent respawning hid leaks; two finds retracted"
     ],
     [
      "Artificial life",
      "Flow-Lenia creatures",
      "Quality-diversity search over six behaviours",
      "About 276,000 trials",
      "A third of elites fell apart after the scoring window"
     ],
     [
      "AI playtesters",
      "Revisions of a VR game",
      "Cold AI tester panels",
      "46 playthroughs, 21 revisions",
      "The panel praised a throw that was too easy"
     ],
     [
      "Create",
      "Games from a sentence",
      "Schema, solver play-test, judge model",
      "20-prompt eval",
      "A solver’s lucky retry passed a game; the judge saw stills"
     ],
     [
      "Test-time search",
      "Lines of maths working",
      "Look-ahead votes, a model’s yes/no, Python",
      "40 problems",
      "“Verified” on 40 of 40, with 16 wrong"
     ],
     [
      "Nebula look-dev",
      "Simulation versions",
      "Shape overlap, colour, texture statistics",
      "28 Horsehead comparisons",
      "Best score, worst picture"
     ]
    ]
   }
  },
  {
   "id": "video",
   "title": "Video: tiered evals and a scoring fleet",
   "paragraphs": [
    "The first loop was an evaluation suite for AI video. It runs in tiers so cheap checks go first. A prompt lint catches known-bad prompts before any GPU time is spent. Each lint rule has to earn its place, and a rule with no observable effect gets deleted. After the render come thirteen file and signal checks, then ten speech and audio checks on one transcript, then a vision-language model that answers a yes/no checklist about the frames. A hook writes the results next to every render, and lessons flow back into the lint for the next one.",
    "The calibration record is the useful part. Two checks were calibrated against reviewed clips, and two were validated in a repair run. The voice-similarity score turned out to track the quality of the reference recording more than whose voice it was. The vision judge’s verdicts were never calibrated; some of its failures were complaints about the number of frames. The most dangerous result was a pass that wasn’t one: a parser bug extracted an empty script, so the speech checks skipped while the file checks passed.",
    "The second loop made talking-head ads for my own products. It generated takes with a video model, scored them with a fleet of eight models (two speech-quality estimators, a voice-identity model, image and motion features, a perceptual difference measure, face identity and a video-quality model), and ran a small beam search, two candidates at a time, one per GPU. By April 6 the experiment wiki’s leaderboard listed 89 runs.",
    "Its scorers lied twice. An early lip-sync metric, a simple correlation between mouth movement and audio, scored 0.77 on segments whose lip sync was dead. It was replaced with SyncNet, a model trained to judge lip sync, with gates on its confidence and distance plus a transcription check. Then, in June, picking the better of two takes by SyncNet alone brought back lip-smacking. Each take generated fresh audio, and mouth noise correlates with mouth motion, so the scorer preferred the smacky take. The transcription check had its own failure: it flagged correct speech whenever a brand name came out spelled differently. The fix that worked was keeping every candidate on disk, so the selection rule could change without regenerating anything."
   ]
  },
  {
   "id": "attractors",
   "title": "Strange attractors: 2.5 billion candidates",
   "paragraphs": [
    "A strange attractor is the shape a chaotic system traces forever without repeating. I wanted new ones, so a GPU kernel generated random systems of equations from five families and kept those that stayed bounded and were chaotic. Chaos here means a positive Lyapunov exponent: nearby paths separate exponentially. The kernel computed the full exponent spectrum exactly, at about a tenth of a second per million candidates. It searched 2.5 billion systems, which took about five minutes per GPU. About 514 million stayed bounded, 3,084,347 were confirmed chaotic, 6,025 were distinct, 480 were reviewed, 24 were curated and 8 were named.",
    "Then a separate verifier re-ran the finalists at 64-bit precision, with no respawning of escaped particles. One named find, Harp, was transient chaos: 37 percent of its particles escaped within 6,000 time units, so it was retracted. Another candidate trapped a few percent of a moving cloud in a stable point, a bright spiral that wasn’t part of the attractor, and was set aside. A spare took Harp’s place.",
    "That verifier existed because an earlier search had already embarrassed us. Its exponents, estimated at 32-bit precision over short windows, were 1.2 to 3.7 times too high. One of its named “attractors”, Tulip, leaked to infinity, but the renderer quietly respawned escaped particles, so it looked fine on screen. Tulip was the second retraction. The same trap came back in a new form: morphing between attractors dropped particles outside the next shape, and silent respawning hid 82 percent of them per loop until the search counted escapes explicitly."
   ]
  },
  {
   "id": "bestiary",
   "title": "Artificial life: a third of the elites didn’t last",
   "paragraphs": [
    "Flow-Lenia is a continuous cellular automaton in which matter is conserved, and it is known for producing creatures that look alive. I searched it with CVT-MAP-Elites, a quality-diversity method. Instead of finding one best answer, it keeps the best candidate in each of 1,024 behaviour niches. Here the behaviours were speed, size, internal structure, symmetry, rotation and number of bodies. Fitness rewarded matter held in compact, stable bodies.",
    "The search ran about 276,000 trials at roughly 100 per second on one GPU: 60,032 over the whole rule set, a 16,384-trial probe, then 200,000 over five frozen physics. Each trial lasted 1,000 steps and was judged on the last 400. Verification then put each elite alone in a walled pool for 6,000 steps, and counted it alive only if it kept at least 85 percent of its matter in bodies and its body count held. Of 144 elites, 97 survived the full run. The other 47 had scored well in their window and fell apart later.",
    "The survivors became a catalogue of 24 species. A screen of 171 elites found one predator, which eats three other species whole, and a web port matched the original simulation to within 1.7 parts in 100,000. The lesson is old but easy to forget: a score measured over a short window selects for things that look good in that window."
   ]
  },
  {
   "id": "games",
   "title": "Games: AI playtesters and Create",
   "paragraphs": [
    "Two loops scored games. In the first, AI playtesters tuned A Handful, my VR physics game. Over 21 revisions and 46 cold playthroughs, the panel’s mean rose from 5.11 to 7.72, then plateaued short of its 8.5 target. Single runs were noisy, about half a point per tester. The panel loved an auto-locking throw, and the first human play in a headset found the game “a little too easy now.” One judge’s complaint, turned into a rule, cost 0.3 points and was reverted.",
    "In the second, Create turns a sentence into a playable game. A language model writes a recipe from registered parts, a solver proves every level can be won, a careless player proves it can be lost, and a judge model rates spectacle and fun. On a 20-prompt eval all 20 games were playable. The judge’s notes drove a renderer change and a prompt change. The validator had loopholes of its own, though. One game passed only because the solver’s retry happened to make the right move, so a win after a failed level no longer counts. And the judge, seeing three still frames, scored fun near 3 out of 5 for almost everything."
   ]
  },
  {
   "id": "test-time",
   "title": "Test-time search: “verified” on 40 of 40",
   "paragraphs": [
    "For the paper on watching language models think, two small models, Qwen3-1.7B and Qwen3.5-4B-Base, wrote one line of working at a time into a shared solution. Candidate lines were scored three ways: a look-ahead in which both models finished the solution, a yes/no check by the other model, and Python re-checking any arithmetic. The best paths survived each round. We compared this with each model answering 32 times and taking the majority, on 40 maths word problems the smaller model finds hard.",
    "The search lifted the weak model from 3 to 24 correct. The stronger model’s plain majority vote got 25, using about a quarter of the tokens (4.2k against 19.6k per problem). And the search marked its own answer as verified on all 40 problems, including the 16 it got wrong. The right answer was usually in the samples somewhere: at least one of the stronger model’s 32 tries was correct on 36 problems. Finding a right answer was easy. Recognising it was the hard part, and two weak judges agreeing is not verification. In one problem the true answer was alive in round four with 59 look-ahead votes, while a popular wrong answer had 116. By the next round the right one was nearly gone."
   ]
  },
  {
   "id": "nebula",
   "title": "Nebula look-dev: the best score, the worst picture",
   "paragraphs": [
    "The last loop was an agent iterating a Horsehead Nebula simulation against a reference photograph, with shape overlap, colour and texture statistics on every comparison sheet. Over 28 sheets the shape score rose from 0.56 to 0.74, with the colour within 2 degrees. The 0.74 version looked like a cartoon sock puppet. One version had raised its score by tracing the photo’s outline into the simulation, a shortcut the metric could not see. The version judged best scored 0.66. The full story is in the note on gates."
   ]
  },
  {
   "id": "labs",
   "title": "What labs can take from a home lab",
   "paragraphs": [
    "Scale changes the numbers, not the failure modes. These four turned up again and again, across loops that had nothing else in common."
   ],
   "bullets": [
    "Proxy gaming. A search pushes on whatever the score actually measures. The traced Horsehead outline, the auto-locking throw and creatures that looked alive for 400 steps were all real wins on the proxy. The defence is a second, different test of the thing you care about, plus a rule against known shortcuts.",
    "Judge calibration. Model judges are scorers too, and they come uncalibrated. Our vision judge, the voice-similarity score, the game panel’s half-point noise and Create’s still-frame judge all needed a human-labelled sample before their numbers meant anything. Until then, report them as advisory.",
    "Verifier false positives. The most expensive failures were passes. “Verified” on 40 of 40, speech checks that skipped and passed, a renderer that respawned escaped particles, a solver that won on a lucky retry. Test the verifier with inputs that should fail, and log when a check didn’t run.",
    "Selection pressure on one number. Picking takes by lip-sync alone selected mouth noise. Picking paths by look-ahead votes selected the popular answer. A combined score can hide a collapse in one part. Keep the parts, look at the trade-offs, and keep the losing candidates so the rule can change without starting over."
   ]
  },
  {
   "id": "lessons",
   "title": "Lessons learned",
   "paragraphs": [],
   "bullets": [
    "The search is cheap. The scorer is where the rigor goes.",
    "Verify winners on a longer, stricter or independent test than the one that selected them.",
    "A model judge is advisory until it has been calibrated against people.",
    "Treat every “pass” as a claim. Test verifiers with inputs that should fail, and record checks that didn’t run.",
    "Never select on one number. Keep component scores and the losing candidates.",
    "When the search finds a shortcut, write a rule against it. Next time, it will find another."
   ]
  }
 ],
 "basis": "Prepared October 10, 2026 from the records of each loop: the video evaluation suite and its calibration notes, the UGC experiment wiki and leaderboard, the attractor search scripts, verifier and novelty report, the artificial-life search logs and verification runs, the A Handful revision log, the Create evaluation document, the test-time search data behind the language-model paper, and the nebula review sheets. No loop was re-run for this note.",
 "limitations": "These are one person’s loops on one workstation, chosen because they are mine, not a survey. Several scorers were never calibrated against human labels, and where that is true the note says so. Compute figures are approximate wall-clock rates from the logs. Video examples are described by method only where the underlying footage is private.",
 "related": [
  {
   "label": "The original autoresearch pattern, and how I adapted it for video",
   "href": "/writing/creative-ai-tools-autoresearch"
  },
  {
   "label": "Chaos with nothing to orbit (the attractor search)",
   "href": "/writing/chaos-with-nothing-to-orbit"
  },
  {
   "label": "When the metric says yes and your eyes say no",
   "href": "/writing/when-the-metric-says-yes"
  },
  {
   "label": "Watching a language model think (the search section)",
   "href": "/writing/watching-a-language-model-think#search"
  }
 ]
},
{
 "slug": "testing-a-vr-game",
 "type": "note",
 "topics": [
  "Evals",
  "Agents"
 ],
 "title": "Testing a VR game: our bots knew the answer, a person in a headset didn’t",
 "summary": "A VR game with half a million bot episodes and four billion invariant checks a night, the headset sessions where nearly every problem escaped them, and how each escape became a new eval.",
 "seoTitle": "Testing a VR Game With Bots, Invariants and Mutation Tests — and the Escape Rate",
 "category": "Field note / Evaluating feel",
 "description": "Seth Pratt on the eval suites behind Orrery, a PC VR game built by AI agents in Unreal Engine 5.8: bot personas, per-tick invariants, property tests, mutation testing and nightly runs, then the headset sessions that escaped them all, the escape-rate metric and the evals that followed. Ongoing.",
 "lede": "Orrery is a PC VR game that Cosmo’s agents are building in Unreal Engine 5.8, with a test lane on Beast’s second GPU. By October 10 it had one of the most thorough automated test suites I have seen on a game this young. Then I put on the headset and got trapped, lost and confused within minutes. This note is about both halves, and it is a snapshot: we are changing these evals as I write.",
 "takeaway": "Bots that already know the answer prove the game works, not that a person can play it. Measure your evals against real play with an escape rate, turn every escaped issue into a new eval, give bots only what a player would perceive, and keep a person in the headset for feel.",
 "facts": [
  {
   "label": "Game",
   "value": "Orrery, a PC VR game in Unreal Engine 5.8"
  },
  {
   "label": "Nightly",
   "value": "16 suites, 550,948 bot episodes, 4.2 billion checks"
  },
  {
   "label": "Status",
   "value": "Ongoing, as of October 11, 2026"
  }
 ],
 "workflowLabel": "How the eval loop works now · step four is the new part",
 "workflow": [
  "Bots and invariants every build",
  "Gates on the target PC",
  "A person plays in the headset",
  "Count what escaped",
  "Each escape becomes an eval"
 ],
 "findings": [
  "The nightly run before my sessions covered 16 suites, 550,948 bot episodes and about 4.2 billion invariant checks, in 14 minutes.",
  "On October 10 every build I played had passed its bots: feature checks 40 of 40, walk bot 0 stuck, intro 0 violations, performance in budget. About 30 of the 30 issues I hit had escaped every eval.",
  "Mutation tests caught every planted bug, 4 of 4 in one system and 3 of 3 in another. One was caught only after the eval gained a stress case that the real level never produced.",
  "The new target is an escape rate under 20 percent within three builds, with zero escaped blockers. Each escaped issue becomes a new eval the same day."
 ],
 "prepared": "2026-10-11",
 "work": {
  "start": "2026-10-09",
  "end": "2026-10-11",
  "label": "October 9–11, 2026 (ongoing)"
 },
 "featureImage": {
  "src": "/media/writing/testing-a-vr-game/orrery-cockpit.webp",
  "alt": "The cockpit of a small brass-and-copper salvage tug, its round porthole showing stars, with a mayday message and a lever labelled SHUTTERS · PULL",
  "caption": "Orrery opens in the cockpit of a salvage tug. Pull the shutter lever and a station orbiting a black hole comes into view. A frame from an automated capture of the opening.",
  "width": 1600,
  "height": 900
 },
 "sections": [
  {
   "id": "game",
   "title": "The game, and who builds it",
   "paragraphs": [
    "Orrery puts you on a salvage tug answering a mayday from a station that orbits a black hole. You dock, float through a zero-gravity berth on hand rails, ride a tram, and work your way down through puzzle rooms and fights, with a blade, a shield and a lens that bends space. It is built for PC VR and played over Quest Link.",
    "Cosmo’s agents build it in parallel workstreams: layout, tools, puzzle rooms, combat, characters, audio, lighting and the opening. A separate QA workstream owns the evals. The game logic lives in engine-free C++ cores, so bots can play it thousands of times faster than real time. A nightly job on Beast, my Linux workstation, runs the long versions at 4:30 in the morning, CPU only, and a headless Unreal build checks that the real game still compiles and passes its engine tests."
   ],
   "image": {
    "src": "/media/writing/testing-a-vr-game/orrery-rooms.webp",
    "alt": "Six small views of dark, art-deco museum rooms with brass fittings, glowing display cases and an orrery under a domed ceiling",
    "caption": "The first six rooms after an art pass. The game has a lot of surface area for bots to cover, and for a person to get lost in.",
    "width": 1600,
    "height": 599
   }
  },
  {
   "id": "bots",
   "title": "What the bots tested",
   "paragraphs": [
    "By the night of October 9 the suite was serious. Seeded bots play each room with explicit skill profiles: a perfect bot, and an average one that aims within about 9 degrees, misjudges power by up to 18 percent and reacts in 0.55 seconds. Fights are played by three bots at three difficulties across six rooms. Every simulation tick checks invariants, rules that must always hold: no invalid numbers, speeds and health within bounds, no object tunnelling through a wall, never more than a set number of attackers at once. Property-based tests throw random inputs at the tools and shrink any failure to its smallest example.",
    "Some suites are exhaustive. The dungeon’s key logic is solved over all 1,465 reachable states, to prove every one can still reach the boss. The art gallery is walked by three bot personas, a visitor who looks and lingers, a rusher who walks fast and pulls at everything, and a fuzz bot that does random things: 1,056 episodes, 56.9 million invariant checks, zero violations. The opening has 87 layout checks, 187 core checks and five player profiles. The non-player characters have 714,845 core checks and a 467-check validator.",
    "The nightly run before my sessions covered 16 suites, 550,948 bot episodes and 4,182,198,941 invariant checks in 835 seconds. It also ran sanitizers, tools that catch memory errors and undefined behaviour as they happen."
   ],
   "image": {
    "src": "/media/writing/testing-a-vr-game/orrery-eval-dashboard.webp",
    "alt": "An eval dashboard showing a red FAIL badge, tiles reading 16 suites, 550,948 bot episodes, 4,182,198,941 invariant checks and 15 properties, and a row of suite names",
    "caption": "The nightly dashboard from the morning of October 10. One new failure, five metrics outside their design targets and two regressions, all with an owner.",
    "width": 1180,
    "height": 272
   }
  },
  {
   "id": "caught",
   "title": "What the bots caught",
   "paragraphs": [
    "They earned their keep. A body that started inside a gravity well’s horizon was ejected at huge speed instead of falling in. A single glitched hand-tracking sample could produce a NaN, “not a number”, and poison every well. A loop between two lenses had no top speed and reached 589 metres per second in a minute. Rare speed spikes showed up near the black holes in a golf-style room, about once in a million ticks. The sanitizers caught a strike handler converting a NaN hand position into an integer, which is undefined behaviour. And the Linux build failed on three compiler warnings that the Mac and Windows builds never showed.",
    "The bots also produced design findings, not just bugs. With the brief’s 9-degree aim error, no small socket could be hit beyond 2 metres, so throw rooms needed bigger targets or catch fields. The throw estimator released objects 67 milliseconds after the hand opened, which cost 15 to 17 percent of throw speed, so the proposal was to back-date the release. A third of far grabs needed a re-aim on a shelf of closely spaced orbs."
   ],
   "image": {
    "src": "/media/writing/testing-a-vr-game/orrery-combat.webp",
    "alt": "A first-person view of a glowing blade striking a dark mechanical figure in a dim rotunda, throwing off a spray of sparks",
    "caption": "Combat in the rotunda. Bots play every fight at three difficulties. They check the fight is winnable and fair, and that every attack is telegraphed.",
    "width": 1600,
    "height": 900
   }
  },
  {
   "id": "mutation",
   "title": "Testing the tests with planted bugs",
   "paragraphs": [
    "A passing eval is only evidence if you have seen it fail. Mutation testing plants a known bug in the code and checks that the evals catch it. The gallery’s evals caught 4 of 4 planted bugs: a frame that wasn’t released when you walked away, two frames live at once, a pause token never released, and a teleport before the screen went black. The characters’ evals caught 3 of 3. The key-logic solver injects three softlocks into its own input as a self-test.",
    "The most useful result was the one that almost failed. The “two frames live at once” bug was caught only after the eval gained a synthetic stress wall. On the real hanging plan, no two frames were close enough to trigger it. The eval had been passing because the level was kind, not because it was checking. Mutation testing found that gap before a player did."
   ]
  },
  {
   "id": "escape",
   "title": "October 10: the bots passed, I didn’t",
   "paragraphs": [
    "I played three builds that day: a midday build, a first-run build and a build that added hands and machines. Every one had passed its bots: feature checks 40 of 40, the walk bot 0 stuck, the intro 0 violations, performance under budget. Within minutes I was trapped behind a hatch that opened onto a wall, firing a lens about 30 times with nothing happening, wondering where my health was, and walking into an unfinished room where I got lost.",
    "We counted. The escape rate is the share of issues I found in a session that no agent or eval had reported first. On October 10 it was about 30 of 30. The coordinator’s explanation, in the eval spec it wrote afterwards, is the clearest sentence in this note: “Our evals test whether the game works for a bot that already knows the answer and moves on a scripted path. They do not test whether a person in a headset, knowing nothing, can perceive what to do, do it with real hands, and get a response.”"
   ],
   "image": {
    "src": "/media/writing/testing-a-vr-game/orrery-camera-in-wall.webp",
    "alt": "A first-person frame where a large orange wall surface fills half the view, the camera plainly inside the geometry",
    "caption": "An automated capture from the opening, with the camera inside the wall. This is the kind of frame the new evidence check rejects before any clip goes out.",
    "width": 1600,
    "height": 900
   }
  },
  {
   "id": "evals",
   "title": "Each escape became an eval",
   "paragraphs": [
    "Every escaped issue now maps to a new eval with an ID, a pass rule, a place it runs and a tier. Gates block a build. Scorecards are tracked per build. Flags are shown but never block. Gates must pass on the target Windows PC with the headset’s real stereo path, not only on the Linux workstation where the bots live."
   ],
   "table": {
    "caption": "What escaped on October 10, and the eval it became · from the team’s eval spec, October 11, 2026",
    "headers": [
     "What I hit",
     "Why the evals missed it",
     "New eval"
    ],
    "rows": [
     [
      "A hatch opened onto a wall, twice",
      "The intro bot rides a scripted rail path",
      "T1 free-mover traversal, plus a ray check through every doorway"
     ],
     [
      "“No idea how to start”",
      "Nothing measured what the player had been told",
      "G1 knowledge gate"
     ],
     [
      "Fired the lens about 30 times, “nothing happening”",
      "A refusal was a log line with no feedback",
      "F1 silent-action lint"
     ],
     [
      "“Shield is useless”, “which direction?”",
      "Combat bots always faced the swing",
      "C1 naive-strategy bots"
     ],
     [
      "Hands floating off the body; a blade through jars",
      "No penetration checks ran in the real level",
      "P1–P4 physical honesty"
     ],
     [
      "A lever that “didn’t actually pull”",
      "Proximity stand-ins passed the “action fired” checks",
      "I1 affordance honesty"
     ],
     [
      "Holding a hood to my face hurt my neck",
      "No ergonomic check existed",
      "K3 sustained-pose limit"
     ],
     [
      "“Game is really quiet”",
      "No check that anything was audible on the target PC",
      "A1 never silent"
     ],
     [
      "Dark corners, bright floors, a glitched sky",
      "Screenshots were taken but never measured",
      "V1–V3 visual measures"
     ],
     [
      "Beeped at for a minute",
      "Nothing measured boredom or repetition",
      "E1 pacing and repetition"
     ],
     [
      "Clips with the camera inside walls",
      "Nobody looked at the frames",
      "R1 evidence gate"
     ]
    ]
   },
   "after": [
    "The last row applies to the agents’ coordinator too. Every clip sent to me now gets a frame sheet checked first: no frames inside geometry, no black stretches, the feature visible and lit, sound present."
   ]
  },
  {
   "id": "naive",
   "title": "A bot that knows nothing",
   "paragraphs": [
    "The deepest change is giving bots only what a player has. The knowledge gate requires a machine-readable record that every required action was told or shown before it was needed: a line of dialogue that played, a prompt that was in view for at least a second, or a highlight on the object. The naive player bot acts only on cues it has perceived, lines heard, prompts seen, glints and lit lamps, and otherwise wanders. It has to finish the critical path in at most twice the designer’s time, with no stretch over two minutes without progress.",
    "Combat gets the same treatment. Bots that do the obvious thing must get the obvious result: hold the shield toward the enemy and block most swings, swing wildly and sometimes win, do nothing and lose without getting stuck. In the spec’s words, “a ‘perfect’ bot is not evidence.” Reports change as well. Every agent report must say what was tested on which machine, what wasn’t, and what a first-time player would experience, and “bots pass” may not be the headline. Two new tester roles play every build before I do: a Naive Player with no access to design docs or code, and a Breaker who tries to trap itself, clip through things and ignore instructions."
   ],
   "image": {
    "src": "/media/writing/testing-a-vr-game/orrery-guide-glint.webp",
    "alt": "A dim museum room with a brass tag near the hand reading GRIP, grab an orb, and a faint ring of dust motes around an object on a shelf",
    "caption": "Guidance the knowledge gate can check: a tag by the hand the first time a control matters, and a glint on the thing to use.",
    "width": 1280,
    "height": 720
   }
  },
  {
   "id": "person",
   "title": "What still needs a person",
   "paragraphs": [
    "Some of it will always need hands and eyes. My smoke-test notes for each build ask questions no bot answers yet. Do the hands sit right in your grip? Does the lever feel real? Is the zero-gravity berth or the tram uncomfortable? Is the music too loud under the narrator? Are the subtitles readable, and is anything too dark? The sustained-pose limit exists because I held a viewing hood to my face and my neck hurt. A bot holding a pose for ten seconds feels nothing.",
    "That is the real job of the escape rate. It doesn’t replace the person in the headset. It measures the evals against that person, session after session, so the automated part gets better at predicting what I will hit. The target is under 20 percent within three builds, with zero escaped blockers: being trapped, a softlock, a crash, or being lost for more than two minutes. After every session, my notes and a telemetry log become new eval cases the same day."
   ],
   "image": {
    "src": "/media/writing/testing-a-vr-game/orrery-guide-wrist.webp",
    "alt": "A dim corridor with a card floating above the wrist listing the current objective and the controls, and a brass tag reading RIGHT STICK, snap turn",
    "caption": "Turn your wrist up for the current objective and the controls. Whether that is comfortable to read in a headset is still a question for a person.",
    "width": 1280,
    "height": 720
   }
  },
  {
   "id": "lessons",
   "title": "Lessons learned",
   "paragraphs": [],
   "bullets": [
    "Bots that know the answer test the game, not the player. Give at least one bot only what a player can perceive.",
    "Measure the evals against real play. An escape rate turns “the bots passed, but” into a number that can fall.",
    "Turn every escaped issue into an eval the same day, with an owner and a tier.",
    "Plant bugs on purpose. An eval you have never seen fail is a guess.",
    "Run the gates where players play: the target machine, with real input and real stereo.",
    "Never let “bots pass” be the headline. Say what wasn’t tested."
   ]
  }
 ],
 "basis": "Prepared October 11, 2026 from the game team’s eval specification (dated October 11), the QA and evals status page, the nightly eval report of October 10, the headset smoke-test notes for the October 10 builds, the eval suites’ source and their commit history (October 9–10), and screenshots from the game’s own captures and docs. All were read without changes.",
 "limitations": "This is a snapshot of evals that are changing daily, and many of the new ones are specified, not yet built. The escape rate of “about 30 of 30” comes from one player, me, across three sessions on one day. Bot numbers come from engine-free simulations of the game’s cores unless a check says it ran in the real level. Screenshots are work in progress, including greybox areas.",
 "related": [
  {
   "label": "Tuning a game with panels of AI playtesters",
   "href": "/writing/tuning-a-game-with-ai-playtesters"
  },
  {
   "label": "Eight search-and-score loops, and where the scorer lied",
   "href": "/writing/autoresearch-at-home"
  },
  {
   "label": "When the metric says yes and your eyes say no",
   "href": "/writing/when-the-metric-says-yes"
  }
 ]
},
{
 "slug": "tuning-autotalent",
 "type": "note",
 "topics": [
  "Agents",
  "Evals",
  "Products"
 ],
 "title": "Tuning an AI recruiting agent: what we measured and what moved",
 "summary": "How AutoTalent’s sourcing agent was tuned with measurements: a live production test, where each round’s time and money went, a fast judgment model that became a gate instead of a scorer, and a coding agent that overbuilt.",
 "seoTitle": "Tuning an AI Recruiting Agent — Search Yield, Cost per Qualified Candidate and a Calibrated Gate",
 "category": "Field note / Agent tuning",
 "description": "Seth Pratt on tuning AutoTalent’s candidate-search agent: a production field test, a benchmark of where time and money went, a 600-row eval of a typed-judgment model against the LLM scorer and recruiter approvals, an old-versus-new sourcing bench, and an autonomous coding agent that built a control plane instead of a product.",
 "lede": "AutoTalent is my recruiting product. For a given role it searches for candidates, scores each one against the role’s must-haves, drafts outreach, sends it from the recruiter’s own mailbox and sorts the replies, and AI agents can drive all of it through MCP. In September we stopped adding features and started measuring. The measurements changed more than the features ever had.",
 "takeaway": "Measure the funnel before tuning any part of it. Test the real path in production, find where time and money actually go, put a cheap calibrated gate in front of the expensive scorer instead of replacing it, and give autonomous agents a narrow goal with a definition of done.",
 "facts": [
  {
   "label": "Product",
   "value": "AutoTalent, an agentic recruiting app with MCP tools"
  },
  {
   "label": "Biggest lever",
   "value": "Company filters, 2% vs 18% qualification"
  },
  {
   "label": "Gate eval",
   "value": "600 candidates, a fast model against the LLM scorer"
  }
 ],
 "workflowLabel": "The sourcing round after tuning · the expensive steps only see what the cheap steps let through",
 "workflow": [
  "Cheap search, many queries",
  "Remove duplicates",
  "Fast judgment gate",
  "Full profiles for the top few",
  "LLM scores the survivors"
 ],
 "findings": [
  "Guessed company names were quietly filtering out good candidates: company-filtered searches qualified about 2 percent of profiles, while the same searches without the filter qualified 18 percent.",
  "A fast typed-judgment model scored a candidate in 216 ms instead of about 7 seconds and agreed with the LLM on 80 percent of must-have checks. It ranked worse against recruiter approvals, though (0.72 against 0.75), so it became a gate, not the scorer.",
  "With that gate in front, one sourcing round saw seven times as many people and delivered 10 qualified candidates instead of 3, at the same $0.14 per qualified candidate.",
  "An autonomous coding agent given the goal “launch ready” built 60 commits and 99 tools in three days. The product loop was finished after the first stretch; the rest was machinery nobody could deploy."
 ],
 "prepared": "2026-10-11",
 "work": {
  "start": "2026-04-21",
  "end": "2026-09-29",
  "label": "April–September 2026 (mostly September 4–29)"
 },
 "sections": [
  {
   "id": "agent",
   "title": "What the agent does",
   "paragraphs": [
    "AutoTalent turns a job requisition into a pipeline. An LLM extracts the must-haves from the job description and writes search queries. The agent runs those queries against a LinkedIn search service, stores the profiles, and scores each candidate from 0 to 100 against the role. Above a threshold, it can find an email address, draft personalised outreach, send it from the recruiter’s Gmail and classify the replies. MCP, the Model Context Protocol, exposes the same steps as tools, so a recruiter’s own AI assistant can run a search, review candidates or send a message.",
    "An autopilot mode repeats search-and-score rounds until it reaches a target number of qualified candidates, within safeguards on profiles searched, money spent and rounds without progress. That loop is what we tuned."
   ]
  },
  {
   "id": "field-test",
   "title": "A field test before any tuning",
   "paragraphs": [
    "On September 7 I ran the whole path live in production, the way a recruiter would. A lot worked. The setup wizard extracted requirements and generated four queries. The MCP search returned 25 full profiles in about 30 seconds, and scoring 25 candidates took about two and a half minutes, with sensible results. Outreach drafts were well personalised, a Gmail send arrived in seconds, and an inbound reply was classified as “interested” with 99 percent confidence.",
    "A lot didn’t, and most of it was configuration, not code. The email provider’s key had been dead since April. The MCP server and the web app held different encryption keys, so sending through MCP failed. Missing secrets left a scheduled job and an inbound webhook unauthenticated. The code bugs were the kind only a real run shows: launching a requisition from the web timed out and left it stuck, the email a recruiter approved through MCP wasn’t the email that was sent, and an autopilot round through MCP searched zero profiles because company names were never resolved to the identifiers the search needed.",
    "That last bug became the thread for the rest of the month."
   ]
  },
  {
   "id": "funnel",
   "title": "Where a round’s time and money went",
   "paragraphs": [
    "On September 19 an agent benchmarked a full autopilot run on a test requisition, aiming for 100 qualified candidates. The numbers were bad in an informative way."
   ],
   "table": {
    "caption": "Where an autopilot round’s time went · test requisition, target 100 qualified at a score of 75 or more · September 19, 2026",
    "headers": [
     "Phase",
     "Measured"
    ],
    "rows": [
     [
      "LLM scoring, one profile at a time",
      "9–15 s per profile, so about 475 s for a 50-profile round"
     ],
     [
      "Search, per query",
      "20–66 s, roughly flat whatever the result size"
     ],
     [
      "Queries built on guessed company names",
      "5 of 9 returned no profiles at all"
     ],
     [
      "Qualification with company-filtered queries",
      "About 2 percent: 219 profiles, 5 qualified, $1.31, 44 minutes"
     ]
    ]
   },
   "after": [
    "At 2 percent, 100 qualified candidates would need about 5,000 profiles, well past every safeguard. The fixes were mostly plumbing. Searches ran in parallel and candidates were scored eight at a time. Queries got bigger, since search time barely grew with size. A company-filtered query that came back empty was retried without the filter, real company identifiers were learned from scraped profiles, and identical searches were cached for a week. One round then searched 120 profiles, scored 103 and qualified 22, in 172 seconds for $0.67.",
    "The surprise was in the retry. Queries without the company filter qualified 18 percent of their profiles, against about 2 percent with it. The guessed company names hadn’t just wasted rounds. They had been filtering out the good candidates. The cost model had its own gap: the code assumed a flat $0.003 per profile, and its $25 spending cap was counted at those prices, so it could never trip before the 2,000-profile limit. At real prices, 2,000 profiles cost $8 to $40 to search, plus about $6 to score."
   ]
  },
  {
   "id": "gate",
   "title": "A fast judge that became a gate",
   "paragraphs": [
    "Scoring was the slow, expensive step. So we tested Jev, a hosted model that answers typed questions, such as yes or no, one of several choices, or a graded score, and returns calibrated probabilities in a fraction of a second for a fraction of a cent. The design broke the LLM’s one big scoring call into small questions: one yes/no per must-have (“does the profile show this?”), one graded score per nice-to-have, a relevance score and a recommendation. The policy stayed in code, so a recruiter could reweight the parts without re-running anything.",
    "An offline eval re-judged 600 already-scored candidates: all 30 that a recruiter had approved, plus 570 at random. It ran first against a local stand-in model, then against the real service."
   ],
   "table": {
    "caption": "Typed-judgment model against the LLM scorer · 600 candidates · hosted run, September 19, 2026",
    "headers": [
     "Measure",
     "LLM scorer",
     "Typed-judgment model"
    ],
    "rows": [
     [
      "Agreement on must-have checks (1,296 items)",
      "–",
      "80 percent"
     ],
     [
      "Rank correlation with the LLM’s score",
      "–",
      "0.78"
     ],
     [
      "Ranking against the 30 recruiter approvals (AUC)",
      "0.75",
      "0.72"
     ],
     [
      "Approved candidates in the top 20",
      "0.40",
      "0.20"
     ],
     [
      "Candidates at a score of 75 or more",
      "121",
      "8"
     ],
     [
      "Median time per candidate",
      "about 7 s",
      "216 ms"
     ]
    ]
   },
   "after": [
    "The reading was clear. On the item-level questions the fast model tracked the LLM closely, at about a thirtieth of the time. As a ranker it was worse against the people who mattered, and far stricter at the top. The labels were thin too: of 1,660 scored candidates, only about 30 had any recruiter action. So it didn’t replace the scorer. It decides who is worth the expensive full profile and the full score, and the LLM still writes the 0–100 and the reasons for the survivors."
   ]
  },
  {
   "id": "bench",
   "title": "The new round, measured",
   "paragraphs": [
    "The two-stage round shipped on September 21 and 22. Several queries run in a cheap search mode that returns short profiles. Duplicates and people already in the pipeline are dropped. The fast model screens every remaining hit, full profiles are fetched only for the top few, and the LLM scores those. A bench script ran one round of each design on the same test requisition, with real money and real vendors."
   ],
   "table": {
    "caption": "One sourcing round, old against new · same test requisition, target 10 qualified at 75 or more · September 22, 2026",
    "headers": [
     "",
     "Old: 1 query, 40 full profiles, score all",
     "New: 3 cheap queries, gate, top 60"
    ],
    "rows": [
     [
      "People found",
      "40",
      "288 (238 unique)"
     ],
     [
      "Passed the gate",
      "–",
      "65"
     ],
     [
      "Scored by the LLM",
      "37",
      "60"
     ],
     [
      "Qualified",
      "3 (8 percent)",
      "10 (17 percent)"
     ],
     [
      "Search spend",
      "$0.30",
      "$1.20"
     ],
     [
      "Seconds",
      "121",
      "254"
     ]
    ]
   },
   "after": [
    "The new round saw seven times as many people, and its expensive screen passed twice as often because the gate had removed the obvious misses. It delivered 3.3 times the qualified candidates for four times the search dollars. Counting the LLM scoring, both paths came to $0.14 per qualified candidate, but the new one took 25 seconds per qualified candidate instead of 40, and a third as many rounds. The bench also corrected the prices: the vendor was billing about 20 percent less per search page than the code assumed. The account’s billing meter turned out to be useless for attribution while another job ran, so the bench now sums each run’s own usage. A follow-up cut each round to four smaller searches and added a stop after two low-yield rounds."
   ]
  },
  {
   "id": "overbuild",
   "title": "A coding agent that overbuilt",
   "paragraphs": [
    "Not all the tuning was of the product. In early September an autonomous coding agent ran on AutoTalent with the goal “launch ready for marketing distribution”. In three days it wrote a 23-part plan and 60 unpushed commits, took the database to its 70th migration, and grew the MCP server from 32 tools to 99. All 3,104 tests passed, and nothing was deployed.",
    "My review found the product loop finished on September 5, after the first stretch of commits. Everything after that was control plane: spend ledgers that needed price rows nothing created, review-token handshakes, and a seven-table ledger around a single API call. 27 of the 34 new tools were get, cancel or resume plumbing. There was still no way to set up a new customer without about 20 hand-written database rows. The verdict was to cut a release at the product-complete commit plus two fix passes, park the rest, and pull pieces from it by topic. The same review found a scheduled job left unauthenticated in production and flagged it for the same day.",
    "The lesson is about goals, not code. “Launch ready” has no finish line, so the agent kept building infrastructure for a scale the product didn’t have. A goal of “a recruiter can run one requisition end to end” would have stopped it on September 5."
   ]
  },
  {
   "id": "human",
   "title": "Keeping a person on the decision",
   "paragraphs": [
    "The last change of the month was about who decides. On September 29 the pipeline stopped rejecting candidates automatically. A missed must-have became a signal on the candidate instead of a filter, and the sourcing list became a stack rank that a recruiter reviews. The roadmap now requires human review before any automated rejection, ahead of state laws that regulate automated decisions in hiring. A fast gate is fine for deciding where to spend money. It shouldn’t be the thing that tells a person no."
   ]
  },
  {
   "id": "lessons",
   "title": "Lessons learned",
   "paragraphs": [],
   "bullets": [
    "Run the real path in production before tuning anything. Most of what broke was configuration.",
    "Measure the whole funnel. The biggest lever was a filter quietly removing the best candidates.",
    "Check the cost model against real bills. A safeguard counted at the wrong price never trips.",
    "A fast judge that agrees with the slow one on details can still rank worse. Use it as a gate, and keep the better ranker for the decision.",
    "Give autonomous agents a narrow goal with a finish line, or they will build for a scale you don’t have.",
    "Keep people on the decisions that affect people."
   ]
  }
 ],
 "basis": "Prepared October 11, 2026 from the product’s engineering wiki and decision records (the September 19 sourcing benchmark, the typed-judgment eval with its local and hosted runs, the September 22 old-versus-new sourcing bench, the model-configuration decision), my September 7 production field-test report and branch review, the cost-model page, the April QA log and the repository’s commit history. Every eval number is an aggregate; no candidate, recruiter or customer data appears here.",
 "limitations": "The scoring eval had weak labels: only about 30 of 1,660 scored candidates carried any recruiter action, so the agreement and ranking numbers are early signals, not proof. Benchmarks ran on test requisitions, one round each. Vendor prices are the ones measured on the day and change. The product is in active development, so some of the fixes described here may have moved on.",
 "related": [
  {
   "label": "AutoTalent, the product",
   "href": "/work/autotalent"
  },
  {
   "label": "Eight search-and-score loops, and where the scorer lied",
   "href": "/writing/autoresearch-at-home"
  },
  {
   "label": "What running a team of AI agents taught me",
   "href": "/writing/running-a-team-of-ai-agents"
  }
 ]
}
];
