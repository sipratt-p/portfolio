import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/portfolio/header';
import Footer from '@/components/portfolio/footer';
import MediaCoordinator from '@/components/portfolio/media-coordinator';
import { SITE_URL, identityGraph, indexingEnabled } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {default:'Seth Pratt — AI Product Leader & Local AI Builder',template:'%s — Seth Pratt'},
  description:'Seth Pratt is an AI Product Leader at NVIDIA and an independent builder of local AI agents, research tools, and creative systems.',
  robots:{index:indexingEnabled,follow:indexingEnabled},icons:{icon:[{url:'/favicon.ico?v=sp-20260905',sizes:'16x16 32x32 48x48'},{url:'/favicon-sp-32.png',type:'image/png',sizes:'32x32'},{url:'/favicon-sp.svg',type:'image/svg+xml',sizes:'any'}],shortcut:'/favicon.ico?v=sp-20260905',apple:[{url:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'}]}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><head><script src="/theme-init.js"/></head><body><a href="#main" className="skip">Skip to content</a><JsonLd data={identityGraph}/><Header/><MediaCoordinator/>{children}<Footer/></body></html>}
