'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Simulations() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 group transition-colors duration-200"
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
          
          <h1 className="text-5xl font-bold text-white mb-4">Interactive Simulations</h1>
          <p className="text-xl text-gray-400">Explore complex systems through interactive 3D visualizations</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/simulations/fractal-tunnel"
              className="block group"
            >
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
                  Fractal Tunnel
                </h2>
                <p className="text-gray-400">
                  An immersive journey through an infinite fractal tunnel with real-time parameter controls 
                  and mesmerizing animations.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="/simulations/solar-system"
              className="block group"
            >
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 group-hover:from-yellow-500/30 group-hover:to-orange-500/30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
                  Solar System
                </h2>
                <p className="text-gray-400">
                  Explore our cosmic neighborhood with an accurate 3D model of the solar system, featuring 
                  planets, moons, and orbital mechanics.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 