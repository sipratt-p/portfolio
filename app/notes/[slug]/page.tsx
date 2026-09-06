import { notFound } from 'next/navigation';
import { notes } from '@/lib/editorial';
import { pageMetadata } from '@/lib/seo';
import EditorialPage from '@/components/portfolio/editorial-page';
export const dynamicParams = false;
export function generateStaticParams() { return notes.map(p => ({slug:p.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params; const p = notes.find(p => p.slug === slug);
  if (!p) return {title:'Note not found',robots:{index:false,follow:false}};
  return pageMetadata(`/notes/${slug}`,p.seoTitle,p.description);
}
export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params; const p = notes.find(p => p.slug === slug);
  if (!p) notFound();
  return <EditorialPage entry={p}/>;
}
