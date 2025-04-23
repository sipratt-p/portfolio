'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ExperienceItem {
  company: string;
  logo: string;
  role: string;
  period: string;
  location: string;
  description: string | string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'NVIDIA',
    logo: '/images/NVIDIA_logo.svg',
    role: 'AI Product Lead',
    period: '2022 - Present · 3 yrs 4 mos',
    location: 'Santa Clara, California, United States',
    description: 'Enterprise GenAI, APIs for LLMs, On-prem LLMs, RAG/Agents. Former Product lead for Autonomous Vehicle test management platform (how new features on AVs get tested before being put on the road) and Traceability (requirements, test cases, etc).'
  },
  {
    company: 'Lyft',
    logo: '/images/Lyft_logo.svg',
    role: 'Senior Product Manager',
    period: '2019 - 2022 · 3 yrs',
    location: 'San Francisco, CA',
    description: [
      'Drove analytics and developer productivity initiatives, delivering actionable insights for engineering teams.',
      'Product owner for Internal Universal Search (GCS+Elastic), Lyft Home, Team Org Charts, Go Slash (short links), and People Profiles.',
      'Launched People Search/Filters and Financial Reporting Dashboards, improving internal data access and decision making.',
      'Managed the Corporate Data Warehouse, collaborating with analytics and engineering stakeholders.'
    ]
  },
  {
    company: 'Intuit',
    logo: '/images/Intuit_Logo.svg',
    role: 'Product Manager',
    period: '2017 - 2019 · 2 yrs',
    location: 'Mountain View, CA',
    description: [
      'Enterprise PM for Search (Elastic), Desktop Apps (Electron), and Reconcile (small business finance tool).',
      'Oversaw navigation, platform performance, and industry picker features to enhance user experience.',
      'Internal PM for Intuit Experimentation Platform, enabling rapid testing and learning across Intuit products.'
    ]
  },
  {
    company: 'Facebook',
    logo: '/images/Facebook_Logo.png',
    role: 'Product Management',
    period: '2015 - 2017 · 2 yrs',
    location: 'Menlo Park, CA',
    description: [
      'Led product initiatives for consumer growth, experimentation, and growth analytics.',
      'Product Manager for internal tooling supporting experimentation and data-driven decision making.'
    ]
  },
  {
    company: 'Visa',
    logo: '/images/Visa_logo.svg',
    role: 'Associate Product Manager',
    period: '2014 - 2015 · 1 yr',
    location: 'Boulder, CO',
    description: [
      'Associate Product Manager for payment gateway solutions and hosted order pages.',
      'Collaborated with Solution Architects, Software Engineers, and Quality Analysts to gather requirements and define project plans.',
      'Developed resource forecasting models and contributed to commercial agreements.',
      'Drove process improvements and supported product delivery for enterprise clients.'
    ]
  },
  {
    company: 'Amgen',
    logo: '/images/Amgen.png',
    role: 'Project Manager',
    period: '2013 - 2014 · 1 yr',
    location: 'Thousand Oaks, CA',
    description: [
      'Cost saving Project Manager in the Center for Observational Research.',
      'Partnered with epidemiologists to analyze ROI of medical database subscriptions used in launched drugs.',
      'Identified and eliminated underutilized resources, saving in excess of $1M for the organization.'
    ]
  }
];

export default function Experience() {
  const { scrollYProgress } = useScroll();
  const gifOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  return (
    <section id="experience" className="relative py-20 min-h-screen">
      {/* GIF Background */}
      <motion.div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{ opacity: gifOpacity }}
      >
        <video
          src="https://res.cloudinary.com/dsuu0y1qa/video/upload/v1745368642/background_vyxhqk.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </motion.div>

      {/* GIF Background */}
      <motion.div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{ opacity: gifOpacity }}
      >
        <video
          src="https://res.cloudinary.com/dsuu0y1qa/video/upload/v1745368642/background_vyxhqk.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/20" style={{filter: 'brightness(1.15)'}} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Professional Experience</h2>
          <p className="text-gray-400 text-lg">A decade of product leadership across tech giants</p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-gray-400 mb-4">
                    <span className="font-semibold text-orange-400">{exp.company}</span>
                    <span className="hidden md:inline text-gray-600">•</span>
                    <span>{exp.period}</span>
                    <span className="hidden md:inline text-gray-600">•</span>
                    <span>{exp.location}</span>
                  </div>
                  {Array.isArray(exp.description) ? (
                    <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-1">
                      {exp.description.map((point: string, idx: number) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 