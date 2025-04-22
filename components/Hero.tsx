'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { FC } from 'react';

import { useRef, useEffect } from 'react';

const Hero: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/marin.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" style={{filter: 'brightness(1.15)'}} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="block text-5xl md:text-7xl font-extrabold text-white mb-4">
            Seth Pratt
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Product Manager & 
            <span className="text-orange-400"> Strategic Leader</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Transforming ideas into impactful products through user-centered design
            and data-driven decision making
          </p>
        </motion.div>
      </div>

      {/* Section Navigation */}
      <motion.div 
        className="absolute bottom-12 left-0 right-0 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="flex justify-center gap-8 px-4">

        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 