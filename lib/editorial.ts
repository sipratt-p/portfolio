export type ReadingLink = { label: string; href: string };
export type Section = {
  id: string; title: string; paragraphs: string[]; bullets?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  links?: ReadingLink[];
  film?: {title:string;poster:string;src?:string;chunks?:string[];bytes?:number;width:number;height:number;filename?:string};
  audio?: {title:string;src:string}; interactive?: boolean;
};
export type Editorial = {
  slug: string; type: 'project' | 'note'; title: string; seoTitle: string;
  category: string; description: string; summary?: string; lede: string; takeaway: string;
  facts: { label: string; value: string }[];
  workflow: string[]; workflowLabel: string;
  featureImage?: {src:string;alt:string;caption:string;width:number;height:number};
  sourceTitle?: string; disclosure?: string;
  sections: Section[]; basis: string; limitations: string;
  related: ReadingLink[]; product?: { name: string; url: string; description: string };
};
export const independentProjects: Editorial[] = [
  {
    slug: 'autotalent', type: 'project', title: 'AutoTalent: recruiting as a working system.',
    seoTitle: 'AutoTalent — Building an AI Recruiting Workflow', category: 'Independent product / Recruiting',
    description: 'Seth Pratt’s AutoTalent project: AI-assisted candidate discovery, recruiter review, outreach, and pipeline workflows, with CLI and MCP interfaces.',
    lede: 'Recruiting isn’t one search. It is a sequence of decisions: understand the role, find people, check the evidence, and decide what to do next. AutoTalent is my exploration of AI across that whole workflow.',
    takeaway: 'The useful unit of automation is a reviewable recruiting workflow—not a list of names or an agent with unlimited permission to act.',
    facts: [{ label: 'My role', value: 'Independent builder & product direction' }, { label: 'Focus', value: 'Candidate discovery → recruiter decisions' }, { label: 'Interfaces', value: 'Web, CLI & MCP' }],
    workflowLabel: 'Publicly documented product workflow · simplified, not an infrastructure diagram',
    workflow: ['Define a role', 'Discover candidates', 'Review & approve', 'Prepare outreach', 'Track the pipeline'],
    sections: [
      { id: 'problem', title: 'The product problem', paragraphs: [
        'A recruiter needs more than a plausible match. They need to know why someone appeared, what is actually supported by that person’s history, and which step still needs judgment. Moving between search, candidate records, messaging, and pipeline tracking makes that context easy to lose.',
        'My interest is in joining those steps without hiding the decision. The role should remain the organizing context, rather than forcing the recruiter to reconstruct it every time a new tool is opened.'
      ] },
      { id: 'workflow', title: 'From requisition to the next action', paragraphs: [
        'AutoTalent’s public documentation exposes requisitions, candidate search and review, outreach, and pipeline operations. It also documents a CLI and Model Context Protocol (MCP) interface, so the product’s workflow can be used through agent tools rather than only through a graphical interface.',
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
        'The product and its public CLI/MCP documentation are available to explore. That is the concrete output of this project overview. I am not presenting a measured reduction in time-to-hire, hiring quality uplift, or customer adoption here; those need a defined dataset and a real evaluation, not a marketing estimate.',
        'The connection to my local AI work is the operating model: bounded tasks, explicit state, inspectable evidence, and a person who can intervene. Recruiting makes the need for those boundaries especially clear.'
      ] }
    ],
    basis: 'Prepared September 5, 2026 from AutoTalent’s public product, CLI and documentation pages, and my August 2026 recruiting-pipeline wiki. The sourcing pilot is separate from the product.',
    limitations: 'Independent project, not employer work. Product documentation describes capabilities, not independently verified hiring outcomes. This overview does not reproduce candidate records or private sourcing data.',
    related: [{ label: 'How I design long-running agents', href: '/notes/long-running-ai-agents' }, { label: 'Dr. Grey: a different problem of evidence and trust', href: '/projects/drgrey-ai' }],
    product: { name: 'AutoTalent', url: 'https://autotalent.ai', description: 'Explore the recruiting product and its current capabilities.' }
  },
  {
    slug: 'drgrey-ai', type: 'project', title: 'Dr. Grey: making research easier to inspect.',
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
      ], links: [{ label: 'What H3 and LTX video evaluation actually caught', href: '/notes/evaluating-agentic-video' }] }
    ],
    basis: 'Prepared September 5, 2026 from Dr. Grey’s public methodology and research pages, read-only inspection of the local application, and my UGC Factory experiment records. Product implementation is evolving.',
    limitations: 'Educational research product. This page provides no medical advice or clinical validation. It describes my independent product work, not a medical qualification or an employer-endorsed service.',
    related: [{ label: 'AutoTalent: evidence in a recruiting workflow', href: '/projects/autotalent' }, { label: 'My local AI practice', href: '/local-ai' }],
    product: { name: 'Dr. Grey AI', url: 'https://drgrey.ai', description: 'Explore the research interface, sources, and methodology.' }
  }
];

export const notes: Editorial[] = [
  {
    slug: 'long-running-ai-agents', type: 'note', title: 'Building long-running local AI agents', summary: 'How I design task-specific agents that can resume work, recover from failures, and know when to ask for help.',
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
    related: [{ label: 'Read the H3 and LTX evaluation findings', href: '/notes/evaluating-agentic-video' }, { label: 'See the AutoTalent product workflow', href: '/projects/autotalent' }, { label: 'Explore my local AI workbench', href: '/local-ai' }]
  },
  {
    slug: 'evaluating-agentic-video', type: 'note', title: 'Evaluating H3 and LTX video renders', summary: 'What my rendering tests revealed about dialogue, lip sync, visual continuity, and selecting better takes.',
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
      ], links: [{ label: 'The Dr. Grey product behind those UGC experiments', href: '/projects/drgrey-ai' }] },
      { id: 'sequence', title: 'Evaluate the edit, not just its ingredients', paragraphs: [
        'The April LTX cross-version experiments found that per-frame face quality improved while some assembled transitions became much worse on flow-discontinuity measurements. A more elaborate splice and re-encode path was a suspect, not a proven isolated cause.',
        'Last-frame conditioning improved several measured first transitions in that experiment. It did not establish that every later seam was fixed. This is why I retain shot-level, boundary-level, and whole-sequence evidence rather than reducing a film to one average score.',
        'For multi-character stories, the LTX wrapper now runs script preflight by default. Its post-render visual check is advisory; it reports skipped validation when the VLM is unavailable. The separate regeneration tool can retry flagged beats. Those paths should not be described as a universal blocking visual gate.'
      ] },
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
      ], links: [{ label: 'Watch a recent H3 UGC example', href: '/studio/h3-ugc' }, { label: 'Watch Fable, an H3 and ACE-Step song film', href: '/studio/fable' }] }
    ],
    basis: 'Prepared September 5, 2026 from the August 15 H3 59-clip report, H3 evaluation hook, LTX Validator Toolkit, April 7 cross-version experiments, June 10 enhancement records, and June 12 take-selection feedback. Existing records were reviewed; no new renders or evaluation runs were performed for this article.',
    limitations: 'Small, evolving, self-run production experiments—not an independent model benchmark. Metrics, recipes, inputs and reviewer judgments differ across dates. No claim of calibrated evaluator accuracy or fully automatic acceptance is made.',
    related: [{ label: 'How the rendering agent survives a failed job', href: '/notes/long-running-ai-agents' }, { label: 'Browse finished films in the Studio', href: '/studio' }, { label: 'Why I also evaluate the coding harness', href: '/notes/local-agent-evaluations' }]
  },
  {
    slug: 'local-agent-evaluations', type: 'note', title: 'Benchmarking local coding agents', summary: 'Lessons from repeated coding tasks, model adaptation, and a grading bug that changed the result without changing the answer.',
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
        'This is also why I value open-weight models and inspectable tools: they let me investigate the cause of a change instead of treating every result as an opaque property of a product name.'
      ] },
      { id: 'checklist', title: 'What belongs beside every result', paragraphs: ['My minimum useful evaluation record includes:'], bullets: [
        'The task, input set, final artifact, and exact grading procedure.',
        'The model and serving configuration, with the date of the run.',
        'Repeated results and completion statuses—not just the best score.',
        'Human interventions, skipped checks, timeouts, and resource constraints.',
        'The decision the evidence supports, and the claims it cannot support.'
      ] }
    ],
    basis: 'Prepared September 5, 2026 from my August 26 answer-extraction incident, August 27 Prime head-to-head run tables and intervention notes, and local-model operating records. The 17→97 correction is a recorded re-score, not a new run for this page.',
    limitations: 'Four difficult coding tasks are a narrow sample. These historical results do not establish a general model ranking, statistical significance, or present-day vendor capability. No new benchmark was run for this article.',
    related: [{ label: 'My local AI practice and hardware', href: '/local-ai' }, { label: 'The same evaluation problem in H3 and LTX video', href: '/notes/evaluating-agentic-video' }, { label: 'Building long-running task-specific agents', href: '/notes/long-running-ai-agents' }]
  },
  {
    slug: 'fable-creative-experiments', type: 'note',
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
      ],links:[{label:'Watch The Keeper',href:'/studio/the-keeper'}]},
      {id:'fable',film:{title:'Fable',poster:'/studio/fable.jpg',src:'/media/fable.mp4',width:960,height:544},audio:{title:'Fable — the song',src:'/media/fable-song.mp3'},title:'Fable: letting the voice sing',paragraphs:[
        'The fourth piece moved from intertitles and fictional dialogue into a song. Fable wrote the lyrics, explored vocal directions, and chose an ACE-Step performance with a low lead and a small choir. The three-minute-twenty-second film paired that performance with 24 H3-generated shots, edited to the music.',
        'The recurring questions became more direct: memory, being addressed, beginning again, and leaving something behind. Instead of asking a lighthouse keeper to carry the whole idea, the song used a first-person voice.',
        'I liked that the series had not settled into repeating its first success. The imagery was related, but the grammar kept changing: a short visual piece, a longer essay, a narrative, then a song. That progression is a large part of what I enjoyed.'
      ],links:[{label:'Watch Fable',href:'/studio/fable'}]},
      {id:'creative-choices',title:'The difference between a valid output and an intended one',paragraphs:[
        'After the four films, I asked Fable to preserve a reflection on the experience—not just the production recipes. In that reflection, it distinguished a result that “doesn’t meet requirements” from one that “isn’t what I meant.”',
        'That distinction captures something important about the experiment. There were still constraints, failures, and quality checks. But the selection criteria were also about the kind of piece being made: whether a storm had enough force, whether a score stayed sparse, whether a quiet ending should be allowed to remain quiet.',
        'The reflection is part of the creative record, in Fable’s own first-person framing. What I can point to in the work is a sequence of choices: recurring motifs, rejected directions, changes of form, and a growing relationship between the pieces. That is a more interesting account of this series than a list of model names.'
      ]},
      {id:'later-experiments',interactive:true,film:{title:'Second Winter',poster:'/studio/second-winter.jpg',src:'/media/second-winter.mp4',width:960,height:544},audio:{title:'Second Winter — the song',src:'/media/second-winter.mp3'},title:'Tell Me Again and Second Winter: changing the medium again',paragraphs:[
        'The next piece, Tell Me Again, opened where the song had ended. It became interactive fiction: the reader could respond, remain silent, or choose whether to hear a spoken line. The interaction was not a decorative control layered over a film. It changed the telling itself.',
        'Second Winter took a different step. Here the lyrics and melody were explicitly composed, with the vocal realized through SoulX-Singer using the voice developed for Tell Me Again. H3 imagery became the accompanying film. Rather than asking a music model to invent the whole song from a description, the work moved toward specifying the notes and words together.',
        'The connection between those pieces is what stays with me. A phrase becomes a new form; a spoken voice becomes a singing voice; a film’s question becomes something a reader can answer. The experiments build on one another instead of resetting to a blank demonstration each time.'
      ],links:[{label:'Watch Second Winter',href:'/studio/second-winter'}]},
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
    disclosure: 'Written with AI assistance from the original project records and Seth’s direction to give this series a place of its own.',
    related: [{label:'Explore the films and music in the Studio',href:'/studio'},{label:'The local AI workbench behind the experiments',href:'/local-ai'},{label:'How I evaluate H3 and LTX renders',href:'/notes/evaluating-agentic-video'},{label:'The creative tools and experiments behind the series',href:'/notes/creative-ai-tools-autoresearch'}]
  },
{
  "slug": "creative-ai-tools-autoresearch",
  "type": "note",
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
          "href": "/notes/evaluating-agentic-video"
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
          "href": "/notes/fable-creative-experiments"
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
  "basis": "Prepared September 5, 2026 from the LTX autoresearch implementation and experiment wiki, April 5 and April 7 results, June quality-gate and take-selection records, H3 evaluation hooks and operating notes, and the Music3, Fable and Second Winter project archives. The link above credits Karpathy’s original autoresearch pattern.",
  "limitations": "This is a selective account of personally tested tools, not an exhaustive catalogue or a controlled comparison between vendors. Recipes and evaluators evolved over time. Historical LTX results are not relabeled as LTX 2.5 results. No new renders or benchmark runs were performed for this article.",
  "related": [
    {
      "label": "Fable’s creative experiments",
      "href": "/notes/fable-creative-experiments"
    },
    {
      "label": "How I build long-running rendering agents",
      "href": "/notes/long-running-ai-agents"
    },
    {
      "label": "The engineering underneath local model performance",
      "href": "/notes/local-model-performance-engineering"
    }
  ]
},
{
  "slug": "local-model-performance-engineering",
  "type": "note",
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
          "href": "/notes/local-agent-evaluations"
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
  "basis": "Prepared September 5, 2026 from the April concurrent-prefill experiment and timing runner, DeepSeek SM120 bring-up records, the Qwen campaign artifact manifest, the August multi-GPU correctness incident, the August 27 launch-book sweep and quality checks, GLM thinking-budget notes, and current LTX evaluator code.",
  "limitations": "All numbers are historical observations from my own hardware and evolving harnesses; none were remeasured for this article. Different suites, checkpoint revisions, cache states and adapter generations are not interchangeable. Kernel contributions are credited as integration and local engineering rather than sole authorship of upstream implementations. The chronology is incomplete and does not support a total-hours claim.",
  "related": [
    {
      "label": "The creative experiments these systems make possible",
      "href": "/notes/creative-ai-tools-autoresearch"
    },
    {
      "label": "Long-running, task-specific local agents",
      "href": "/notes/long-running-ai-agents"
    },
    {
      "label": "Explore the local AI workbench",
      "href": "/local-ai"
    }
  ]
}
];
