'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import type { FC } from 'react';

const About: FC = () => {
  const { scrollYProgress } = useScroll();
  const natureOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 0]);
  const sunsetOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1.1, 1]);

  return (
    <section id="about" className="relative py-20 min-h-screen overflow-hidden">
      {/* Nature Background */}
      <motion.div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{ opacity: natureOpacity, scale }}
      >
        <Image
          src="/images/nature-background.jpg"
          alt="Serene nature landscape"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" style={{filter: 'brightness(1.15)'}} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-gray-200 text-lg">AI Product Leader & Technical Innovator</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Profile Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col items-center space-y-6"
          >
            <div className="relative w-72 h-96 overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/profile.jpg"
                alt="Professional headshot"
                fill
                sizes="(max-width: 768px) 100vw, 288px"
                className="transform hover:scale-105 transition-transform duration-500 object-cover object-center"
                priority
              />
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg w-full text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-300">San Francisco, CA</p>
            </div>
            <div className="flex items-center justify-center space-x-6 w-full">
              <a
                href="https://www.linkedin.com/in/sethpratt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:sipratt@gmail.com"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                aria-label="Email"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a
                href="https://x.com/cryptosedulous"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
                aria-label="Twitter Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Content Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-3">AI & Enterprise Innovation</h3>
                <p className="text-gray-300">
                  Currently leading AI product initiatives at NVIDIA, focusing on Enterprise GenAI, LLM APIs, 
                  and RAG/Agent systems. Passionate about transforming cutting-edge AI technology into 
                  practical business solutions.
                </p>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-3">Technical Product Leadership</h3>
                <p className="text-gray-300">
                  Over a decade of experience in product management across major tech companies, 
                  specializing in developer tools, analytics platforms, and enterprise software. 
                  Strong track record of delivering complex technical products at scale.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-3">Data-Driven Decision Making</h3>
                <p className="text-gray-300">
                  Expertise in analytics and experimentation, having built and managed analytics platforms
                  at Lyft and Facebook. Strong focus on using data to drive product strategy and measure impact.
                </p>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-3">Cross-Functional Leadership</h3>
                <p className="text-gray-300">
                  Proven ability to lead and collaborate with diverse teams, from autonomous vehicle systems 
                  at NVIDIA to search infrastructure at Intuit. Skilled at bridging technical complexity 
                  with business objectives.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 