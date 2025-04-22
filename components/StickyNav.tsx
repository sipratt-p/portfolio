"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const sections = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#simulations", label: "Simulations" },
  { href: "#art", label: "Digital Art" },
];

export default function StickyNav() {
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      for (const section of sections) {
        const el = document.querySelector(section.href);
        if (el) {
          const rect = (el as HTMLElement).getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActive(section.href);
            found = true;
            break;
          }
        }
      }
      if (!found) setActive("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change or scroll
  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    window.addEventListener('scroll', closeMenu);
    return () => {
      window.removeEventListener('resize', closeMenu);
      window.removeEventListener('scroll', closeMenu);
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-1 px-4 md:px-0">
        {/* Logo or Title (optional) */}
        <div className="flex-1 flex md:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-orange-400 hover:bg-gray-800/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-400"
            aria-label="Open main menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center gap-4 flex-1">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`text-xs md:text-sm font-medium uppercase tracking-wider px-1.5 py-0.5 rounded transition-colors duration-200 ${
                active === section.href
                  ? "text-orange-400 bg-gray-900/50"
                  : "text-gray-200 hover:text-orange-300 hover:bg-gray-800/20"
              }`}
            >
              {section.label}
            </Link>
          ))}
        </div>
        {/* Mobile Dropdown Nav */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 border-b border-gray-800 md:hidden animate-fade-in z-50">
            <div className="flex flex-col items-center gap-2 py-4">
              {sections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className={`block w-full text-center text-base font-medium uppercase tracking-wider px-4 py-2 rounded transition-colors duration-200 ${
                    active === section.href
                      ? "text-orange-400 bg-gray-900/50"
                      : "text-gray-200 hover:text-orange-300 hover:bg-gray-800/20"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {section.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
