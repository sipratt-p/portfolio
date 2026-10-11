// Site-wide identity, navigation and contact. Keep this module free of runtime imports:
// scripts/generate-seo.mjs and the tests load it on its own.
export const SITE_NAME = 'Seth Pratt';
export const TITLE = 'Applied AI Product Leader';
export const EMAIL = 'sipratt@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/sethpratt/';
export const GITHUB = 'https://github.com/sipratt-p';
export const X_URL = 'https://x.com/sethprattsf';
export const EVERDUST = 'https://everdust.ai';

export const nav = [
  { href: '/work', label: 'Work', match: ['/work'] },
  { href: '/lab', label: 'Lab', match: ['/lab'] },
  { href: '/writing', label: 'Writing', match: ['/writing', '/how-i-write'] },
  { href: '/about', label: 'About', match: ['/about', '/start'] },
] as const;

export const contacts = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, external: false },
  { label: 'LinkedIn', value: 'sethpratt', href: LINKEDIN, external: true },
  { label: 'GitHub', value: 'sipratt-p', href: GITHUB, external: true },
  { label: 'X', value: '@sethprattsf', href: X_URL, external: true },
] as const;

/** The reading path on /start. Times are honest estimates and add up to about 18 minutes. */
export const startHere = [
  { n: '01', label: 'The flagship case study: scribe-bench', prefix: '', href: '/work/scribe-bench', minutes: 9, external: false },
  { n: '02', label: 'scribe-bench on GitHub', prefix: 'The repo:', href: 'https://github.com/sipratt-p/scribe-bench', minutes: 2, external: true },
  { n: '03', label: 'The same answer scored 17/100, then 97/100', prefix: 'One post:', href: '/writing/local-agent-evaluations', minutes: 4, external: false },
  { n: '04', label: 'Strange Attractors, from the Lab', prefix: 'One visual piece:', href: '/lab/strange-attractors', minutes: 2, external: false },
  { n: '05', label: 'Résumé', prefix: '', href: '/resume', minutes: 1, external: false },
] as const;
