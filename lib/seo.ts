import type { Metadata } from 'next';
export const SITE_URL = 'https://www.sethpratt.com';
export const PERSON_ID = `${SITE_URL}/#seth-pratt`;
// Only the approved Vercel production build may opt in. Local/private previews stay excluded.
export const indexingEnabled = process.env.PORTFOLIO_PUBLIC_INDEXING === 'true' && process.env.VERCEL_ENV === 'production';
export function canonical(path: string) { return `${SITE_URL}${path}`; }
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const fullTitle = `${title} — Seth Pratt`;
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: canonical(path) },
    openGraph: { type: 'website', locale: 'en_US', siteName: 'Seth Pratt', url: canonical(path), title: fullTitle, description },
    twitter: { card: 'summary', title: fullTitle, description },
  };
}
export const identityGraph = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'Person', '@id': PERSON_ID, name: 'Seth Pratt', url: `${SITE_URL}/`,
      jobTitle: 'AI Product Leader', worksFor: { '@type': 'Organization', name: 'NVIDIA' },
      sameAs: ['https://www.linkedin.com/in/sethpratt/', 'https://github.com/sipratt-p'],
      knowsAbout: ['AI product leadership', 'AI research', 'Local AI agents', 'Model evaluation', 'Generative video'] },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Seth Pratt', url: `${SITE_URL}/`, publisher: { '@id': PERSON_ID } }
  ]
};
export function breadcrumbs(items: { name: string; path: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({
    '@type': 'ListItem', position: i + 1, name: item.name, item: canonical(item.path)
  })) };
}
