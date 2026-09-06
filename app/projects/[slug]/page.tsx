import { notFound } from 'next/navigation';
import { independentProjects } from '@/lib/editorial';
import { pageMetadata } from '@/lib/seo';
import EditorialPage from '@/components/portfolio/editorial-page';
export const dynamicParams = false;
export function generateStaticParams() { return independentProjects.map(p => ({slug:p.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params; const p = independentProjects.find(p => p.slug === slug);
  if (!p) return {title:'Project not found',robots:{index:false,follow:false}};
  return pageMetadata(`/projects/${slug}`,p.seoTitle,p.description);
}
export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params; const p = independentProjects.find(p => p.slug === slug);
  if (!p) notFound();
  return <EditorialPage entry={p}/>;
}
