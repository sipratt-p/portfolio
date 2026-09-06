'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from '@/components/portfolio/theme-toggle';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
export default function Header(){
  const [open,setOpen]=useState(false);const pathname=usePathname();
  const links=[{href:'/#work',name:'Work',active:pathname.startsWith('/work')},{href:'/#building',name:'Projects',active:pathname.startsWith('/projects')},{href:'/local-ai',name:'Local AI',active:pathname.startsWith('/local-ai')},{href:'/notes',name:'Notes',active:pathname.startsWith('/notes')},{href:'/#about',name:'About',active:false},{href:'/studio',name:'Studio',active:pathname.startsWith('/studio')}];
  return <header className="site-header"><div className="wrap header-inner"><a href="/" className="brand" aria-label="Seth Pratt — home"><span className="brand-mark" aria-hidden="true">sp.</span>Seth Pratt</a><div className="header-actions"><nav className="desktop-nav" aria-label="Main navigation">{links.map(link=><a href={link.href} key={link.name} aria-current={link.active?'page':undefined}>{link.name}</a>)}<a href="mailto:sipratt@gmail.com" className="contact-link">Let’s talk <ArrowUpRight size={16} aria-hidden="true"/></a></nav><ThemeToggle/><div className="mobile-menu"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger className="menu-trigger" aria-label="Open navigation"><Menu size={23}/></SheetTrigger><SheetContent className="portfolio-menu"><SheetHeader><SheetTitle>Seth Pratt</SheetTitle><SheetDescription>Product leadership & creative work</SheetDescription></SheetHeader><nav aria-label="Mobile navigation" className="mobile-links">{links.map(link=><a key={link.name} href={link.href} onClick={()=>setOpen(false)} aria-current={link.active?'page':undefined}>{link.name}<ArrowUpRight size={22} aria-hidden="true"/></a>)}<a href="mailto:sipratt@gmail.com" onClick={()=>setOpen(false)}>Let’s talk <ArrowUpRight size={22} aria-hidden="true"/></a></nav></SheetContent></Sheet></div></div></div></header>;
}
