import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/cases';
import { independentProjects } from '@/lib/editorial';
import { pageMetadata } from '@/lib/seo';
import CaseStudyPage from '@/components/portfolio/case-study-page';
import EditorialPage from '@/components/portfolio/editorial-page';
export const dynamicParams = false;
export function generateStaticParams() { return [...caseStudies.map(c => ({ slug: c.slug })), ...independentProjects.map(p => ({ slug: p.slug }))]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudies.find(c => c.slug === slug);
  if (c) return pageMetadata(`/work/${slug}`, c.seoTitle, c.description, { type: 'article' });
  const p = independentProjects.find(p => p.slug === slug);
  if (p) return pageMetadata(`/work/${slug}`, p.seoTitle, p.description);
  return { title: 'Not found', robots: { index: false, follow: false } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudies.find(c => c.slug === slug);
  if (c) return <CaseStudyPage c={c}/>;
  const p = independentProjects.find(p => p.slug === slug);
  if (!p) notFound();
  return <EditorialPage entry={p}/>;
}
