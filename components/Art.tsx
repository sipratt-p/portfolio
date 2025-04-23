'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ArtProps {
  className?: string;
}

export default function Art({ className = "py-32" }: ArtProps) {
  return (
    <section id="art" className={`relative overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900 to-black z-0 pointer-events-none" />
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/compressed/selfie.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-10"
        src="/compressed/selfie.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Digital Art</h2>
          <p className="text-gray-400 text-lg">Exploring the intersection of code and creativity</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-visible">
          {/* Headlands Journey Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/art/headlands-journey" className="block group">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group group-hover:scale-110 transition-all duration-500">
                <video
                  src="/compressed/marin.mp4"
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 group-hover:from-blue-500/30 group-hover:to-green-500/30 mix-blend-overlay transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0120 13.118v.764a1 1 0 01-.447.842L15 17v-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                  Headlands Journey
                </h3>
                <p className="text-gray-400">
                  Experimental video art—shifting landscapes and coastal vistas.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">Video</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">Landscape</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Abstract Flow Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/art/abstract-flow"
              className="block group"
            >
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group group-hover:scale-110 transition-all duration-500">
                <Image
                  src="/images/background.gif"
                  alt="Abstract Animation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 mix-blend-overlay transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-200">
                  Abstract Flow
                </h3>
                <p className="text-gray-400">
                  A mesmerizing visualization of fluid dynamics and particle systems creating 
                  ever-changing abstract patterns.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                    Generative
                  </span>
                  <span className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-full text-sm">
                    Animation
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    Flow
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Ego Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/art/ego" className="block group">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group group-hover:scale-110 transition-all duration-500">
                <video
                  src="/compressed/ego.mp4"
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 group-hover:from-indigo-500/30 group-hover:to-cyan-500/30 mix-blend-overlay transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0120 13.118v.764a1 1 0 01-.447.842L15 17v-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-200">
                  Ego
                </h3>
                <p className="text-gray-400">
                  An introspective journey through digital consciousness.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">Video</span>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm">Abstract</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Impressionist Dream Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/art/impressionist-dream" className="block group">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group group-hover:scale-110 transition-all duration-500">
                <video
                  src="/compressed/impressionistdream.mp4"
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20 group-hover:from-amber-500/30 group-hover:to-rose-500/30 mix-blend-overlay transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0120 13.118v.764a1 1 0 01-.447.842L15 17v-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-200">
                  Impressionist Dream
                </h3>
                <p className="text-gray-400">
                  A digital homage to impressionist art through moving light and color.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm">Artistic</span>
                  <span className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full text-sm">Impressionist</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Reflections in Motion Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/art/reflections-in-motion" className="block group">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group group-hover:scale-110 transition-all duration-500">
                <video
                  src="/compressed/selfie.mp4"
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 group-hover:from-orange-500/30 group-hover:to-pink-500/30 mix-blend-overlay transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0120 13.118v.764a1 1 0 01-.447.842L15 17v-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
                  Reflections in Motion
                </h3>
                <p className="text-gray-400">
                  Video self-portrait—digital identity in motion.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm">Video</span>
                  <span className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-full text-sm">Portrait</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 