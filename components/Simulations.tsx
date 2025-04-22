'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FractalBackground from './FractalBackground';

export default function Simulations() {
  return (
    <section id="simulations" className="relative min-h-screen py-20">
      {/* Dark semi-transparent overlay */}
      <div className="absolute inset-0 bg-gray-900/70" />
      
      {/* Fractal Background */}
      <FractalBackground />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Interactive Simulations</h2>
          <p className="text-gray-300 text-lg">Explore complex systems through interactive 3D visualizations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/simulations/fractal-tunnel"
              className="block group"
            >
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src="/images/simulations/fractal.jpg"
                  alt="Fractal Tunnel Visualization"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  style={{
                    objectFit: 'cover',
                    transform: 'scale(1)',
                    transition: 'transform 500ms'
                  }}
                  className="group-hover:!scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 group-hover:from-green-500/30 group-hover:to-blue-500/30 mix-blend-overlay transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-200">
                  Fractal Tunnel
                </h3>
                <p className="text-gray-400">
                  An immersive journey through an infinite fractal tunnel with real-time parameter controls 
                  and mesmerizing animations.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                    Interactive
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    3D Graphics
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                    Fractals
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/simulations/solar-system"
              className="block group"
            >
              <div className="relative aspect-[16/10] bg-black rounded-lg overflow-hidden">
                <Image
                  src="/images/simulations/solar.jpg"
                  alt="Solar System Simulation"
                  fill
                  className="object-contain transform group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40 mix-blend-multiply transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 mix-blend-overlay transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
                  Solar System
                </h3>
                <p className="text-gray-400">
                  Explore our cosmic neighborhood with an accurate 3D model of the solar system, featuring 
                  planets, moons, and orbital mechanics.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                    Interactive
                  </span>
                  <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm">
                    3D Graphics
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    Physics
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 