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
                href="https://github.com/sipratt-p"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://codepen.io/Seth-Pratt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
                aria-label="CodePen Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.001zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z"/>
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
                href="https://x.com/sethprattsf"
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