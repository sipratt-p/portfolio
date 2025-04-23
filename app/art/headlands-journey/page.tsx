'use client';
import Link from 'next/link';

export default function HeadlandsJourney() {
  return (
    <main className="min-h-screen bg-black relative">
      {/* Full-screen Video */}
      <div className="fixed inset-0">
        <video
          src="https://res.cloudinary.com/dsuu0y1qa/video/upload/marin_fgijx2.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-10">
        <Link
          href="/#art"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Gallery</span>
        </Link>
      </div>

      {/* Title */}
      <div className="fixed bottom-4 left-4 z-10">
        <div className="px-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-white">
          <h1 className="text-xl font-bold">Headlands Journey</h1>
          <p className="text-sm text-white/70">Coastal Landscapes in Motion</p>
        </div>
      </div>
    </main>
  );
} 