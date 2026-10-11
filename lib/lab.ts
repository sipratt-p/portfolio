// The Lab: five series of physics and AI-internals work. Every piece carries a label:
// Title — TYPE — one measured fact. Only PUBLIC-OK items from the inventory, shown as stills or
// silent loops of at most 6 s that passed the photosensitivity gate. Self-contained (no runtime imports).
//
// Media lives in public/media/lab/ for local testing. Production media moves to Cloudinary
// (the account sethpratt.com already uses); swap these paths for Cloudinary URLs at launch.
export type LabLink = { label: string; href: string };
export type LabPiece = {
  id: string; title: string; type: string; fact: string;
  image?: string; alt?: string; pos?: string; loop?: string; loopSeconds?: number;
  /** Where a tile goes when it is shown outside its series page (home, Lab index). */
  href?: string; status?: string;
  /** Detail view: 2–4 plain sentences on what it is and how it was made, plus an honest note if one applies. */
  about?: string; note?: string;
  /** Real destinations only: a write-up, a case study, or a live version on everdust.ai/play. */
  links?: LabLink[];
  /** In the Everdust app or its loop packs, so the detail offers "See it in Everdust". */
  everdust?: boolean;
};
/** A piece already hosted publicly on everdust.ai/play. Sizes were measured on load (desktop and phone). */
export type LivePiece = { slug: string; title: string; type: string; fact: string; mb: number; alt: string };
export type LabSeries = {
  slug: string; n: string; name: string; em: string; title: string; blurb: string; intro: string;
  hero: LabPiece; pieces: LabPiece[]; more: LabPiece[]; honest: string[];
  live?: LivePiece[];
  funnel?: { n: string; w: string; pct: number }[]; funnelNote?: string;
};

export const img = (name: string, size: 800 | 1600 = 1600) => `/media/lab/img/${name}${size === 800 ? '-800' : ''}.jpg`;
export const loopSrc = (id: string) => `/media/lab/loops/${id}.mp4`;
export const PLAY = 'https://everdust.ai/play';
export const liveHref = (slug: string) => `${PLAY}/${slug}`;
export const liveImg = (slug: string) => `/media/lab/live/${slug}-800.jpg`;
export const liveMeta = (p: LivePiece) => `${p.mb.toFixed(1)} MB · phone + Vision Pro`;

const CONCH = '/writing/chaos-with-nothing-to-orbit';
const LLMT = '/writing/watching-a-language-model-think';

export const labSeries: LabSeries[] = [
  {
    slug: 'strange-attractors', n: '01', name: 'Strange Attractors', em: 'Attractors', title: 'Strange',
    blurb: 'Chaos you can see: famous attractors at 100M+ particles, and eight new ones found by searching 2.5 billion random flows.',
    intro: 'Famous strange attractors rendered at 100 million particles and more, and eight new ones found by a GPU search through 2.5 billion random flows. Every one was re-checked in full 64-bit precision, and the audit retracted two of our own.',
    hero: { id: 'discoveries-ii', title: 'Discoveries II', type: 'Strange attractors, searched', fact: '84 s seamless loop · 160M particles · 4K60 HDR', image: 'attr-discoveries-ii', alt: 'Discoveries II: a translucent violet, teal and gold strange attractor folding through itself on black', loop: 'discoveries-ii', loopSeconds: 6,
      about: 'A seamless 84-second loop in which 160 million particles flow through eight chaotic systems, one after another. The systems came from a GPU search of 2.5 billion random flows that measured each candidate’s Lyapunov exponents and kept only the bounded, chaotic and distinct ones. Every survivor was re-checked in full 64-bit precision, and that audit dropped two of our own picks.',
      note: '“Discovered” means found by our search and inequivalent to 89 catalogued systems, not proven new. Eclipse is bistable: its hold re-seeds particles caught by a stable point.',
      links: [{ label: 'How the search found them', href: CONCH + '#search' }, { label: 'Read: how the search was scored, and what the audit caught', href: '/writing/autoresearch-at-home#attractors' }], everdust: true },
    funnel: [
      { n: '2,500,000,000', w: 'searched', pct: 100 },
      { n: '514,400,710', w: 'bounded', pct: 92.7 },
      { n: '3,084,347', w: 'confirmed chaotic', pct: 69 },
      { n: '6,025', w: 'unique', pct: 40.2 },
      { n: '480', w: 'reviewed', pct: 28.5 },
      { n: '24', w: 'curated', pct: 14.7 },
      { n: '8', w: 'named', pct: 9.6 },
    ],
    funnelNote: 'Then a full-precision audit dropped two of our own: Harp leaks 37% of its seeds, and Tulip, from the first search, turned out to be transient chaos that always escapes. Tulip’s story is in the write-up.',
    pieces: [
      { id: 'aizawa', title: 'Aizawa Metamorphosis', type: 'Loop', fact: '36 s · 200M particles · the sphere with a tunnel', image: 'attr-aizawa', alt: 'The Aizawa attractor: a glowing sphere of violet, gold and teal threads with a tunnel through its axis', loop: 'aizawa', loopSeconds: 5,
        about: '200 million particles ride the Aizawa attractor while its six parameters travel slowly around a closed path, so the shape breathes and the camera dives through the tunnel at its centre. Each particle is stepped with fourth-order Runge–Kutta and drawn as a true path streak, supersampled at twice 4K. The loop closes seamlessly every 36 seconds.',
        note: 'The path through parameter space is ours; the shapes are what the equations do there.', everdust: true },
      { id: 'metamorphosis', title: 'Attractor Metamorphosis', type: 'Loop', fact: '160M particles flow through six classic attractors in one cloud', image: 'attr-metamorphosis', alt: 'A single particle cloud midway between two classic strange attractor shapes',
        about: 'One cloud of 160 million particles flows from Thomas to Aizawa, Halvorsen, the four-wing system, Lorenz-84 and Lorenz, then back again. The in-between shapes come from blending the systems’ normalised vector fields, so every frame is a real flow. It runs as a 48-second seamless loop.',
        note: 'Halvorsen at a = 1.89, the value used here, turns out to be a period-3 limit cycle, not chaos. The in-betweens are blends of real flows, not classical systems.', everdust: true },
      { id: 'butterflies', title: 'The Butterfly series', type: 'Loops', fact: '2M pendulums per frame, released a millionth of a radian apart', image: 'attr-butterflies', alt: 'The Lorenz butterfly attractor drawn in fine glowing threads',
        about: 'The butterfly effect as something you can watch. Millions of double and triple pendulums, or Lorenz trajectories, start a millionth of a radian apart and move as one bundle until the tiny differences grow exponentially and the bundle blooms. Up to 2 million pendulums are integrated per frame in 64-bit precision, across four loops: Fan, Flower, Triple Bloom and Lorenz Butterfly.', everdust: true },
      { id: 'magnetic-basins', title: 'Magnetic Basins', type: 'Loop', fact: '14.7M magnetic pendulums, one per pixel, paint their own fractal', image: 'attr-magnetic-basins', alt: 'Magnetic pendulum basins: interlocking teal, magenta and gold regions around three bright magnets',
        about: 'A pendulum swinging over three magnets comes to rest over one of them, and which one depends chaotically on where it started. Here 14.7 million pendulums, one per pixel, settle at once and paint the fractal map of those basins. The simulation is fully deterministic and runs in 64-bit precision.', everdust: true },
      { id: 'hidden-attractors', title: 'Hidden Attractors', type: 'Live · WebXR', fact: 'four 64-bit-verified attractors with no centre; drop seeds and watch', image: 'attr-hidden-live', alt: 'The Hidden Attractors live exhibit: seeds falling into two chaotic attractors, with on-screen labels', status: 'Live piece · public hosting coming',
        about: 'A walk-in exhibit for phone and Vision Pro: you stand among four attractors that have no fixed point at their centre, Conch’s core among them. Pinch to drop seeds and watch whether chaos catches them or they escape. Each system was verified in 64-bit precision, and the basin slices shown around you are precomputed.',
        note: 'Tested in an emulator, not yet on a headset. Two of the four systems blow up in finite time along one diagonal, and the exhibit says so on screen.',
        links: [{ label: 'Read: chaos with no hub', href: CONCH + '#hidden' }] },
      { id: 'conch', title: 'Conch', type: 'Write-up', fact: '15 terms pruned to 7, with zero fixed points', image: 'conch-post', alt: 'Conch: a hidden attractor of blue and violet threads coiled like a shell', pos: '50% 42%',
        about: 'An illustrated write-up of one attractor from our search. Its 15 terms prune to a 7-term core with no fixed points at all, which makes it a hidden attractor: there is nowhere for it to settle, and it still never repeats. The post shows the checks behind that claim, and what we can’t claim.',
        note: 'It is very likely distinct from its closest published relative, but at 7 terms it is not simpler than the 5- and 6-term systems already catalogued.',
        links: [{ label: 'Read the write-up', href: CONCH }] },
    ],
    more: [
      { id: 'thomas-bloom', title: 'Thomas Bloom', type: 'Loop', fact: 'friction eases 0.20 → 0.075 and back across 150M particles',
        about: 'Thomas’s cyclically symmetric attractor, drawn with 150 million particles while its friction eases from 0.20 to 0.075 and back. As it does, the shape moves from a star knot to a rosette to a tangle, and back to the knot. The parameter sweep is periodic by construction, so the 36-second loop closes exactly.', everdust: true },
      { id: 'discoveries-i', title: 'Discoveries (I)', type: 'Loop', fact: 'six attractors from 1.6M random flows; one later retracted',
        about: 'Our first search, a scan of 1.6 million random flows in the style of Sprott’s, found six shapes: Möbius Bloom, Sail, Conch, Paper Kite, Folded Horn and Tulip. They flow one into the next in a 45-second loop. Conch later got its own write-up.',
        note: 'Tulip is not an attractor: in a 64-bit audit every orbit escaped, after about 1,100 time units. Our old renderer re-seeded escaping particles, which hid it, and the first field guide’s exponents were 1.2–3.7× too high.',
        links: [{ label: 'Read: how honest is the integration?', href: CONCH + '#integration' }], everdust: true },
      { id: 'hyperchaos', title: 'Hyperchaos 4D', type: 'Live threads', fact: 'a four-dimensional flow drawn as about 170 threads you can twist', status: 'Live piece · public hosting coming',
        about: 'A four-dimensional hyperchaotic Lorenz flow, seen as its turning three-dimensional shadow. Chaos that fills a volume renders as fog when drawn as particles, so the live version draws about 170 crisp threads instead, and you can twist them through the fourth axis.',
        note: 'The 4K loop of this flow came out soft, which is why the live thread version is the one shown here. The live page hasn’t been tested on a real headset.', everdust: true },
      { id: 'novelty-report', title: 'Are our attractors new?', type: 'Audit', fact: 'compared with 89 catalogued systems and 17 no-equilibrium flows',
        about: 'An audit of our own discovery claims. Each attractor was compared with 89 catalogued chaotic systems and the 17 known no-equilibrium flows, using shape measures that survive a change of coordinates, Lyapunov spectra and robustness checks. It retracted one claim, corrected our earlier numbers, and concluded, with reasons, that the finds are not journal-worthy on their own.',
        links: [{ label: 'Read: is it actually new?', href: CONCH + '#novelty' }] },
    ],
    live: [
      { slug: 'attractors', title: 'Strange Attractors', type: 'Live · WebXR', fact: '200,000 particles fly from Lorenz to Aizawa, Thomas and Halvorsen', mb: 0.7, alt: 'The live Strange Attractors scene: a Lorenz butterfly of violet and gold particles on black' },
      { slug: 'three-body-ink', title: 'Three-Body Ink 3D', type: 'Live · WebXR', fact: 'three orbs on a real three-body orbit stir glowing ink until one escapes', mb: 0.8, alt: 'Three glowing orbs stirring swirls of teal and blue ink on black' },
    ],
    honest: [
      '“Discovered” means found by our search and inequivalent to 89 catalogued systems under affine invariants. With so many possible systems, someone may have met one before.',
      'Attractor Metamorphosis runs Halvorsen at a = 1.89, which turns out to be a period-3 limit cycle, not chaos. Its in-betweens are blends of real flows, not classical systems.',
      'Eclipse, in Discoveries II, is bistable: its hold re-seeds particles caught by a stable point.',
      'Hidden Attractors has been tested in an emulator, not yet on a headset.',
    ],
  },
  {
    slug: 'cosmos', n: '02', name: 'Cosmos', em: 'Cosmos', title: '',
    blurb: 'Galaxies colliding, black holes feeding and merging, stars and planets. Our own simulations of real physics.',
    intro: 'Galaxies colliding, black holes feeding and merging, dying stars and storm-banded planets. These are our own simulations, inspired by real targets: N-body gravity, hydrodynamics and a general-relativistic ray tracer.',
    hero: { id: 'galaxy-collisions', title: 'Galaxy collisions', type: 'N-body + gas', fact: '34–40M particles · Antennae, Mice, Milky Way + Andromeda', image: 'cosmos-galaxy-collisions', alt: 'Two spiral galaxies colliding, with long tidal tails of stars', pos: '50% 46%', loop: 'galaxy-collisions', loopSeconds: 6,
      about: 'Three galaxy mergers inspired by real pairs: the Antennae, the Mice, and the Milky Way meeting Andromeda. Each uses 34–40 million particles in a particle-mesh N-body simulation on a 512³ grid, with sticky gas that forms stars as the galaxies collide. The films run 36–60 seconds; the preview here is a 6-second excerpt.',
      note: 'Inspired by real targets, not observations or NASA/JWST images. Time is compressed, and colours are physically motivated rather than photographic.',
      links: [{ label: 'Try a live version', href: 'https://everdust.ai/play/galaxy-collision' }], everdust: true },
    pieces: [
      { id: 'bh-merger', title: 'Binary Black Hole Merger', type: 'GR ray tracer', fact: 'two lensing black holes feed, spiral in, merge and ring down', image: 'cosmos-bh-merger', alt: 'Two black holes spiralling inside a bright accretion disk', loop: 'bh-merger', loopSeconds: 6,
        about: 'Two black holes feed from a shared disk of gas, spiral together, merge and ring down. A custom general-relativistic ray tracer bends the light around both holes, so each one lenses the other and the disk behind them. The pacing follows a rule of at least four seconds per orbit, so the eye can follow it.',
        note: 'A simulation inspired by real physics, not an observation; time is compressed.', everdust: true },
      { id: 'bh-feeding', title: 'Planet Eater, Tidal Disruption, Kerr Jet', type: 'Black holes feeding', fact: 'a planet stripped at the Roche limit, then swallowed', image: 'cosmos-bh-feeding', alt: 'A black hole pulling a planet apart into a glowing stream',
        about: 'Three ways a black hole feeds. A planet is stripped at its Roche limit and swallowed, a star is torn into a long stream in a tidal disruption, and a spinning Kerr black hole launches a jet. The disks are drawn with the same relativistic ray tracer as the merger.', everdust: true },
      { id: 'cosmos-iii', title: 'Cosmos III: Stars', type: 'Hydro + tracers', fact: 'a 589M-grain dust spiral, a boiling supergiant, a 640³ remnant', image: 'cosmos-iii-stars', alt: 'A pinwheel spiral of glowing dust around a binary star', loop: 'cosmos-iii-stars', loopSeconds: 6,
        about: 'Four studies of stars: the colliding-wind binary WR 140, whose dust shells repeat as an exact periodic loop; a 589-million-grain dust spiral modelled on Apep; a red supergiant boiling at its surface; and a supernova remnant on a 640³ hydrodynamics grid with 100 million tracer particles. Colour comes from blackbody temperature.',
        note: 'Our simulations inspired by real stars, not observations.', everdust: true },
      { id: 'cosmos-iv', title: 'Cosmos IV: Planets', type: 'Loops', fact: 'shepherd moons sculpt a ring; Jupiter’s bands and storms', image: 'cosmos-iv-planets', alt: 'Jupiter-like bands and storms in a cream and rust palette',
        about: 'Three planet studies: shepherd moons sculpting a narrow ring, Jupiter’s cloud bands and storms, and Io’s volcanic plumes rising at the limb. They are fluid and ballistic simulations tuned to look physically right.',
        note: 'Our simulations, not spacecraft images.', everdust: true },
    ],
    more: [
      { id: 'cosmos-i', title: 'Cosmos I: Collisions', type: 'Loop pack', fact: '20 seamless 10 s loops and 4 hits, seam- and ghost-gated',
        about: 'The first Everdust loop pack: 20 seamless 10-second loops and 4 one-shot hits, from galaxy passes and spinning black-hole disks to spaghettification, a supernova remnant, a ring being born and the cosmic web. Every loop passed automatic seam and ghosting checks before release.', everdust: true },
      { id: 'cosmos-ii', title: 'Cosmos II: Star birth', type: 'Loop pack', fact: '14 loops rendered on a second machine by a second agent',
        about: 'A pack of 14 loops about star birth: twin suns, Herbig–Haro jets, a planet nursery, a Bok globule and a cluster igniting. It was rendered on a second machine by a second AI agent, with the work split under a written ownership file.', everdust: true },
      { id: 'nebulae', title: 'Nebulae in your hand', type: 'Live · WebXR', fact: 'the Ring, Squid, Hourglass and Butterfly nebulae, to turn and look inside', status: 'Live piece · public hosting coming',
        image: 'nebula-ring', alt: 'The simulated Ring Nebula seen face-on: a blue core inside a thick ring of pink and gold gas knots, in a faint violet halo on black', loop: 'nebula-ring', loopSeconds: 6,
        about: 'Four live nebulae for phone and Vision Pro, each built from its physics rather than from a photo: the Ring from a hydrodynamic snapshot of interacting stellar winds, the Squid from thin crumpled oxygen shells, the Hourglass from wind-blown bubbles with fast knots, and the Butterfly from ejecta torn by turbulence around an edge-on torus. You can turn each one in your hand and look inside.',
        note: 'Our simulations inspired by real nebulae, not telescope images. The views from inside are still soft.', everdust: true },
    ],
    live: [
      { slug: 'galaxy-collision', title: 'Galaxy Collision', type: 'Live · WebXR', fact: 'two disk galaxies pass, pull out tidal tails, then fall back together', mb: 0.7, alt: 'Two disk galaxies approaching each other on black' },
      { slug: 'sun-is-born', title: 'The Sun Is Born', type: 'Live · WebXR', fact: 'a spinning gas cloud falls into a disk, a newborn star and twin jets', mb: 0.7, alt: 'A newborn star’s twin jets rising through a field of glowing gas' },
      { slug: 'black-hole-golf', title: 'Black Hole Golf', type: 'Game · WebXR', fact: 'shoot a probe past black holes whose gravity bends its path', mb: 0.7, alt: 'Black Hole Golf: a glowing target ring and the launch ball in a starfield' },
    ],
    honest: [
      'These are our simulations inspired by real targets, not observations or NASA/JWST images.',
      'Time is compressed, and colours are physically motivated rather than photographic.',
    ],
  },
  {
    slug: 'life', n: '03', name: 'Life at Every Scale', em: 'Every Scale', title: 'Life at',
    blurb: 'From atoms to organisms: real molecular machines, molecular dynamics, and lifeforms found by search.',
    intro: 'From atoms to organisms: molecular machines built from real Protein Data Bank structures, true all-atom molecular dynamics, and artificial lifeforms discovered by a quality-diversity search.',
    hero: { id: 'power-plant', title: 'The Power Plant', type: 'Respiratory chain, atomic scale', fact: 'complexes I–IV and ATP synthase from real PDB structures', image: 'molecular-power-plant', alt: 'An atomic-scale model of a mitochondrial membrane studded with respiratory-chain protein complexes',
      about: 'The respiratory chain in a mitochondrial membrane, built atom by atom from real Protein Data Bank structures: complexes I to IV and rows of ATP synthase dimers, with the electron path following real cofactors. It was rebuilt after a biologist’s critique, and it comes with a note on what is real and what is modelled.',
      note: 'The layout is a model: one dimer angle is set by hand, time is slowed, and the morphs between states are inferred.' },
    pieces: [
      { id: 'aquaporin', title: 'Aquaporin and ATP synthase', type: 'Molecular dynamics', fact: '155,975 atoms, 30 ns, 140 water crossings', image: 'molecular-aquaporin-atp', alt: 'A cutaway of the ATP synthase rotor in a membrane',
        about: 'True all-atom molecular dynamics of a water channel: 155,975 atoms simulated for 30 nanoseconds in OpenMM, during which 140 water molecules crossed the membrane. The camera rides along, and colour shows each water molecule’s dipole flipping as it passes through. It is paired with a loop of the ATP synthase rotor.',
        note: 'The ATP synthase loops first spun in the wrong direction; that was corrected after release. The rotor’s motion comes from an elastic-network model, not molecular dynamics.' },
      { id: 'molecular-stills', title: 'Molecular machines', type: 'Stills', fact: '15 structures drawn atom by atom from public PDB data', image: 'molecular-stills', alt: 'A potassium channel selectivity filter rendered atom by atom',
        about: 'Fifteen stills drawn atom by atom from public Protein Data Bank structures: a spike protein and a virion, a ribosome, the HIV capsid, the GroEL chaperone, the proteasome, a potassium channel’s selectivity filter and a crowded cell interior. Each is rendered from the deposited atomic coordinates rather than modelled by hand.',
        note: 'The lipids are generated, the virion layout is invented, and the cell interior is less crowded than a real one.' },
      { id: 'bestiary', title: 'Bestiary', type: 'Lifeforms found by search', fact: '24 species and one predator in Flow-Lenia', image: 'bestiary', alt: 'Plates of glowing Flow-Lenia creatures labelled with Latin names', pos: '50% 0%', loop: 'bestiary', loopSeconds: 6,
        about: 'Artificial lifeforms found by search. A from-scratch Flow-Lenia simulation, in which mass is conserved, was explored by a quality-diversity search at about 100 evaluations a second, and it found 24 stable “species” and a predator. Each was checked over 6,000 steps; they are written up as a Victorian-style field guide and a walk-in tide pool that isn’t publicly hosted yet.',
        note: '“Species” are stable patterns in a parameter search, not biology.',
        links: [{ label: 'Read: a third of the elites didn’t last', href: '/writing/autoresearch-at-home#bestiary' }] },
    ],
    more: [
      { id: 'emergence', title: 'Emergence: No Brain, Morphogen, Generations', type: 'Live', fact: 'slime-mould networks, Turing patterns and Life, running on the GPU', status: 'Live piece · public hosting coming',
        about: 'Three studies of complex behaviour from simple rules, running live on the GPU and reacting to music. In No Brain, slime-mould agents grow transport networks; in Morphogen, Gray–Scott reaction–diffusion makes Turing spots and mazes; Generations is a Game of Life piece.' },
    ],
    honest: [
      'The Power Plant’s layout is a model: one dimer angle is set by hand, time is slowed, and the morphs between states are inferred.',
      'The ATP synthase loops first spun in the wrong direction; that was corrected after release.',
      'The molecular stills use generated lipids, an invented virion layout, and a cell interior less crowded than a real one.',
      'Bestiary “species” are stable patterns in a parameter search, not biology.',
    ],
  },
  {
    slug: 'inside-the-machine', n: '04', name: 'Inside the Machine', em: 'Machine', title: 'Inside the',
    blurb: 'What AI models actually do, drawn from their real weights and activations: grokking, the logit lens, search.',
    intro: 'What AI models actually do, drawn from their real weights, activations and samples rather than from illustrations: a network grokking, a prediction locking in layer by layer, a search that did not help.',
    hero: { id: 'the-click', title: 'The Click', type: 'Grokking, from a real training run', fact: 'test accuracy jumps from ~11% to 100% as beads snap onto four rings', image: 'machine-click', alt: 'Coloured beads snapping onto four stacked rings as a small transformer groks modular addition', loop: 'the-click', loopSeconds: 6,
      about: 'A real one-layer transformer learning modular addition. While it memorises, the beads tangle; when it generalises, they snap onto four rings, the network’s own Fourier frequencies, and test accuracy jumps from about 11% to 100%. Everything is drawn from a real 25,000-step training run.',
      note: 'Training time is compressed, and the return to the tangle at the end is interpolation, not training.', everdust: true },
    pieces: [],
    more: [
      { id: 'river-of-thought', title: 'River of Thought', type: 'Logit lens', fact: '4,624 tokens from 60 short passages through every layer of Qwen3-1.7B; one thread locks onto “Rome” at layer 21',
        about: '4,624 tokens from 60 short passages flow through every layer of Qwen3-1.7B, drawn from its real hidden states. Each layer is flattened onto the plane where the passages separate best. One gold thread, the last word of “The Colosseum is in”, ignites at layer 21, where the logit lens locks onto “Rome”.',
        links: [{ label: 'Read: a prediction locking in', href: LLMT + '#river' }], everdust: true },
      { id: 'condensation', title: 'Condensation', type: 'Diffusion model', fact: 'a model we trained dreams a jellyfish into a nautilus, in 30M points',
        about: 'A small diffusion model we trained dreams a jellyfish into a nautilus, a coral and a manta, drawn as 30 million points. It is class-conditional, and the transitions use deterministic DDIM inversion, so each morph passes through the model’s own noise space.', everdust: true },
      { id: 'minds-i', title: 'Minds I', type: 'Loop pack', fact: '13 silent loops of attention, latent space and evolution',
        about: 'Thirteen silent loops from the pieces that started this series: Attention, Latent Space and Evolution. Motes gather into constellations of threads, points stream over a surface that morphs from sphere to torus to knot, and line-drawn creatures evolve.',
        note: 'Unlike the rest of this series, these are artistic pieces, not drawn from a real model’s data.', everdust: true },
      { id: 'search', title: 'Search, honestly measured', type: 'Negative result', fact: 'two-model beam search scored 24/40 against majority voting’s 25/40, at about 4.7× the tokens',
        about: 'Does letting small models search help? A two-model beam search with Qwen3-1.7B and Qwen3.5-4B was run on 40 hard GSM8K maths problems and visualised. It solved 24 of the 40; simple majority voting over 32 samples from the larger model solved 25, with about a fifth of the tokens.',
        note: 'The search’s “verified” signal fired on all 40 problems, so it couldn’t tell good answers from bad ones.',
        links: [{ label: 'Read: search, honestly measured', href: LLMT + '#search' }] },
      { id: 'forking-paths', title: 'The Garden of Forking Paths', type: 'Sampling', fact: '3,072 answers to one question: all distinct, five ideas', status: 'Live piece · public hosting coming',
        about: 'One question, “What would you want to tell someone who is afraid?”, asked 3,072 times of Qwen3.8-27B. Every answer is different, yet they cluster into five ideas. Drawn as a tree of 96,589 nodes, it also shows that always picking the likeliest next word does not give the likeliest answer.',
        links: [{ label: 'Read: walk the garden of forking paths', href: LLMT + '#forking' }] },
      { id: 'ai-games', title: 'Guess the Next Word, Make It Say “Rome”', type: 'Games', fact: 'bet against a real model’s odds; rewire heads to force an answer', status: 'Live piece · public hosting coming',
        about: 'Two games built on a real model’s internals. In Guess the Next Word you bet chips against Qwen3-1.7B’s real odds and watch its layers decide; in Make It Say “Rome” you rewire attention heads, neurons and steering vectors to force an answer. The odds and knock-out passes are precomputed from the real model.',
        links: [{ label: 'Read: guess the next word', href: LLMT + '#one-word' }], everdust: true },
    ],
    honest: [
      'The Click is time-mapped: training is compressed, and the return to the tangle is interpolation, not training.',
      'Test-time search did not beat simple majority voting here (24/40 against 25/40), and its “verified” signal fired on all 40 problems.',
    ],
  },
  {
    slug: 'step-inside', n: '05', name: 'Step Inside', em: 'Inside', title: 'Step',
    blurb: 'Live worlds for phone and Vision Pro: relativity you can walk through, a game about where you came from.',
    intro: 'Live worlds for phone and Vision Pro: a garden where light crawls at walking pace, a game about where you came from, and calm loops of light and water.',
    hero: { id: 'slower-light', title: 'Slower Light', type: 'Live · WebXR', fact: 'a moonlit garden where light crawls at about 3 m/s, rendered with exact aberration and Doppler', image: 'slower-light', alt: 'A moonlit garden of cypress trees and lanterns, painted in a Van Gogh style', pos: '50% 60%', status: 'Live piece · public hosting coming',
      about: 'Walk through a moonlit garden, painted in an Impressionist style, where light travels at about 3 metres per second. What you see is rendered with exact special relativity: aberration, light arriving late from distant objects, Doppler colour shifts and light echoes. Each eye’s view is solved every frame in WebXR, in about 0.5–2.2 ms.',
      note: 'Like most live pieces here, it has been tested in emulators rather than on real headsets, and the fireflies’ light on the ground is still exaggerated.' },
    pieces: [
      { id: 'a-handful', title: 'A Handful', type: 'VR game', fact: '21 revisions tuned by AI playtester panels, 5.11 → 7.72', image: 'a-handful', alt: 'A Handful: dust gathering into a young star in a dark field', status: 'In the Everdust app',
        about: 'A VR game in which you can only nudge a handful of dust. Real gravity, fusion and chemistry do the rest: a star, then a planet with a moon, water and finally a protocell, with no score. Over 21 revisions it was tuned by panels of AI playtesters and scripted bots, whose mean rating rose from 5.11 to 7.72.',
        note: 'The panel plateaued at about 7.7 out of 10, short of its 8.5 target, and single runs vary by about ±0.5. Hand gestures were tested on synthetic hands and in one headset session.',
        links: [{ label: 'Read: tuning it with AI playtesters', href: '/writing/tuning-a-game-with-ai-playtesters' }], everdust: true },
      { id: 'soap-film', title: 'Soap & Film', type: 'Loop pack', fact: '16 loops of thin-film interference', image: 'soap-film', alt: 'Soap film: swirling bands of magenta, green and gold thin-film interference', loop: 'soap-film', loopSeconds: 6,
        about: 'The colours of a soap bubble, simulated on a two-dimensional film: drainage bands, Marangoni swirls, black film, bubble rafts and bursts. Colour comes from exact thin-film optics, and every loop closes to within a fraction of a nanometre of film thickness. There are 13 loops and 3 one-shot hits.', everdust: true },
      { id: 'caustics', title: 'Light I: Caustics', type: 'Loop pack', fact: '20 loops of water light, from bit-exact periodic waves', image: 'caustics', alt: 'Bright caustic light patterns rippling across a pool floor',
        about: 'Twenty loops of light on water: sun-showers at the waterline, Snell’s window seen from below, wine-glass caustics and an ink drop. The light is traced as spectral photons through waves that repeat bit for bit, so each loop closes perfectly, and the renders were checked against CPU references.', everdust: true },
    ],
    more: [
      { id: 'rain-on-glass', title: 'Rain on Glass', type: 'Film · original score', fact: 'droplets pin, merge and lens a night city, to an original lo-fi track',
        about: 'A three-and-a-half-minute film of rain on a night window. Droplets pin, merge and slide, and each one lenses the city behind it with exact optics. The lo-fi score is original, composed with an open-source AI music model.' },
      { id: 'surround', title: 'Surround', type: 'WebXR scenes', fact: '45+ walk-in scenes, from the Hopf fibration to a hurricane eye', status: 'Live piece · public hosting coming',
        about: 'More than 45 scenes you stand inside on a phone or Vision Pro: hyperbolic rooms, the Hopf fibration, the inside of a cell, the double slit, every attention head of a model at once, a hurricane eye and a Kerr black hole. One small WebXR shell handles quality tiers, hands and free movement.',
        note: 'Most scenes haven’t been tested on a real phone or Vision Pro yet.', everdust: true },
      { id: 'spiderwebs', title: 'Spiderwebs', type: 'Live', fact: '11 silk-physics webs you can pluck like an instrument', status: 'Live piece · public hosting coming',
        about: 'Eleven interactive webs on a silk-physics solver. You can pluck an orb web like an instrument, with the note following each strand’s length, watch dew bead along the threads, throw moths at a ladder web, or watch a spider build overnight. The web geometry is fitted from arachnology papers.',
        note: 'The silk constants are calibrated to published abstracts, not raw measurements.', everdust: true },
      { id: 'games', title: 'Everdust physics games', type: 'Prototypes', fact: '25+ hands-first VR games, each with bot campaigns and cold AI playtests',
        about: 'More than 25 hands-first VR game prototypes on the same physics: smoke-ring archery, black-hole golf, galaxy billiards, a siege game played with real optics, orbital docking and a rain piano among them. Each has fixed-step physics, scripted bot campaigns and cold playtests by AI testers.',
        links: [{ label: 'Play Black Hole Golf', href: 'https://everdust.ai/play/black-hole-golf' }], everdust: true },
    ],
    honest: [
      'Most live pieces have been tested in emulators, not yet on real phones and headsets.',
      'A Handful’s AI-panel score plateaued at about 7.7 out of 10, short of its 8.5 target.',
      'Slower Light, Surround and Spiderwebs aren’t publicly hosted yet, so they aren’t linked here.',
    ],
  },
];

export const lab = {
  intro: 'Physics simulations, discovered lifeforms and live worlds, held to the same standard as the evals: exact equations, measured checks, and a photosensitivity gate on every render.',
  recent: [
    { id: 'conch', title: 'Conch', type: 'Write-up', fact: '7 terms, zero fixed points', image: 'conch-post', alt: 'Conch: a hidden attractor of blue and violet threads coiled like a shell', pos: '50% 42%', href: '/writing/chaos-with-nothing-to-orbit' },
    { id: 'discoveries-ii', title: 'Discoveries II', type: 'Strange attractors, searched', fact: '8 found in 2.5 billion random flows', image: 'attr-discoveries-ii', alt: 'Discoveries II: a translucent violet and gold strange attractor on black', loop: 'discoveries-ii', loopSeconds: 6, href: '/lab/strange-attractors#discoveries-ii' },
    { id: 'soap-film', title: 'Soap & Film', type: 'Loop pack', fact: '16 loops of thin-film interference', image: 'soap-film', alt: 'Soap film: swirling bands of magenta, green and gold', href: '/lab/step-inside#soap-film' },
    { id: 'power-plant', title: 'The Power Plant', type: 'Respiratory chain, atomic scale', fact: 'complexes I–IV from real PDB structures', image: 'molecular-power-plant', alt: 'Respiratory-chain complexes on a mitochondrial membrane', pos: '30% 50%', href: '/lab/life#power-plant' },
  ] as LabPiece[],
  /** Ours, not on everdust.ai/play yet: shown with their status and a link to their detail, never a private URL. */
  coming: [
    { label: 'Hidden Attractors', href: '/lab/strange-attractors#hidden-attractors' },
    { label: 'Slower Light', href: '/lab/step-inside#slower-light' },
    { label: 'four nebulae', href: '/lab/cosmos#nebulae' },
  ],
};

/** Every live piece across the series, for the Lab index. */
export const livePieces = labSeries.flatMap(s => (s.live ?? []).map(p => ({ ...p, series: s.slug })));

export const pieceCount = (s: LabSeries) => 1 + s.pieces.length + s.more.length;
