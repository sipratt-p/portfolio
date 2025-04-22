'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { FC } from 'react';
import type { ImageProps } from 'next/image';
import ImageModal from './ImageModal';

// Import project images
import nvidiangc from '@/public/images/nvidiangc.jpg';
import kebana from '@/public/images/kebana.jpg';
import lyftProject from '@/public/images/lyftproject.jpg';
import nav from '@/public/images/nav.jpg';
import wasabi from '@/public/images/wasabi.jpg';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  impact: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'Enterprise GenAI Platform',
    description: 'UI/UX Lead for NGC Catalog enabling the distribution of on-prem NVIDAI GenAI ecosystem, analytics lead for API Catalog activating AI development at scale via API access to a variety of LLMs & Agentic Blueprints.',
    technologies: ['LLMs', 'RAG', 'Agents', 'Enterprise AI'],
    impact: 'Empowered Fortune 500 companies to leverage AI while maintaining data security and compliance.',
    image: '/images/nvidiangc.jpg'
  },
  {
    title: 'AV Test Management & Traceability Platform',
    description: 'Developed a comprehensive platform for testing autonomous vehicle features and their performance against regulatory system level and vehicle level functional requirements before deployment, ensuring safety and reliability of self-driving technology.',
    technologies: ['Autonomous Systems', 'Test Automation', 'Safety Validation'],
    impact: 'Streamlined the testing process for autonomous vehicle features, reducing validation time by 40%.',
    image: '/images/kebana.jpg'
  },
  {
    title: 'Universal Search Infrastructure',
    description: 'Built Lyft\'s internal universal search system using Google Cloud Search and Elasticsearch, providing unified access to company-wide information.',
    technologies: ['GCS', 'Elasticsearch', 'Full-text Search'],
    impact: 'Improved employee productivity by reducing information discovery time by 60%.',
    image: '/images/lyftproject.jpg'
  },
  {
    title: 'Reconcile Redesign',
    description: 'Drove the redesign of Reconcile, a tool for small businesses to reconcile their transactions, focusing on improving user experience and efficiency.',
    technologies: ['UX Design', 'Financial Software', 'User Research'],
    impact: 'Simplified transaction reconciliation workflow for small businesses, improving accuracy and reducing processing time.',
    image: '/images/nav.jpg'
  },
  {
    title: 'Analytics & Experimentation Platform',
    description: 'Drove organizational change through creation of new experimentation and analytics tooling as I shipped a variety of features for search, navigation, and platform performance.',
    technologies: ['Analytics', 'A/B Testing', 'Data Visualization'],
    impact: 'Facilitated over 1000+ experiments annually, driving product improvements through data.',
    image: '/images/wasabi.jpg'
  }
];

export default function Projects() {
  const { scrollYProgress } = useScroll();
  const firstImageOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.6, 0.7], [1.1, 1]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  return (
    <section id="projects" className="relative py-20 min-h-screen">
      {/* First Parallax Background */}
      <motion.div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{ opacity: firstImageOpacity, scale }}
      >
        <Image
          src="/images/nature-background.jpg"
          alt="Projects background"
          fill
          className="object-cover"
          priority
          quality={80}
        />
      </motion.div>

      {/* Second Parallax Background */}
      <motion.div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{ opacity: firstImageOpacity, scale }}
      >
        <Image
          src="/images/nature-background.jpg"
          alt="Serene nature landscape"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-black/10" style={{filter: 'brightness(1.15)'}} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-gray-300 text-lg">Key technical achievements and product innovations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden"
            >
              <div 
                className="relative h-48 md:h-64 lg:h-80 cursor-pointer group"
                onClick={() => setSelectedImage({ url: project.image, alt: project.title })}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-orange-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800/80 text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-orange-400 mb-2">Impact</h4>
                  <p className="text-gray-300">{project.impact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        imageUrl={selectedImage?.url || ''}
        altText={selectedImage?.alt || ''}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
} 