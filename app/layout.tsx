import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/portfolio/header';
import Footer from '@/components/portfolio/footer';
import MediaCoordinator from '@/components/portfolio/media-coordinator';
import Reveal from '@/components/portfolio/reveal';
import { SITE_URL, identityGraph, indexingEnabled } from '@/lib/seo';
import JsonLd from '@/components/portfolio/json-ld';
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Seth Pratt — Applied AI Product Leader', template: '%s — Seth Pratt' },
  description: 'Seth Pratt builds AI systems and measures what they actually do: clinical-scribe and coding-agent benchmarks, open models on workstation GPUs, and physics at 100 million particles.',
  robots: { index: indexingEnabled, follow: indexingEnabled },
  alternates: { types: { 'application/rss+xml': '/rss.xml' } },
  icons:{icon:[{url:'/favicon-sp-192.png',type:'image/png',sizes:'192x192'},{url:'/favicon.ico?v=sp-20260905',sizes:'16x16 32x32 48x48'},{url:'/favicon-sp-32.png',type:'image/png',sizes:'32x32'},{url:'/favicon-sp.svg',type:'image/svg+xml',sizes:'any'}],shortcut:'/favicon.ico?v=sp-20260905',apple:[{url:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'}]}
};
export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fbf6f0' }, { media: '(prefers-color-scheme: dark)', color: '#05060a' }], colorScheme: 'light dark' };
// Keep this public ownership tag: Google rechecks it after initial verification.
const googleSiteVerification = 'eU3Mq1W15xn1LLI1cfJbt8kskPqNP2pAp2vR-5E10Lg';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><head><meta name="google-site-verification" content={googleSiteVerification}/><script src="/theme-init.js"/>
    <link rel="preload" href="/fonts/geist-400.woff2" as="font" type="font/woff2" crossOrigin=""/>
    <link rel="preload" href="/fonts/geist-600.woff2" as="font" type="font/woff2" crossOrigin=""/>
  </head><body><a href="#main" className="skip">Skip to content</a><JsonLd data={identityGraph}/><Header/><MediaCoordinator/><Reveal/>{children}<Footer/></body></html>;
}
