'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Product Management",
    skills: [
      "Product Strategy",
      "Roadmap Planning",
      "Portfolio Management",
      "Cross-Functional Leadership",
      "Executive Communication",
      "Change Management",
      "Org Design & Team Building",
      "Strategic Partnerships",
      "Go-to-Market Strategy",
      "Product Vision & Evangelism",
      "Budgeting & P&L Ownership",
      "Agile Methodologies",
      "Product Analytics",
      "Feature Prioritization",
      "Stakeholder Management"
    ]
  },
  {
    title: "User Experience",
    skills: [
      "User Research",
      "Usability Testing",
      "Journey Mapping",
      "Wireframing",
      "Prototyping",
      "A/B Testing",
      "UX Strategy",
      "Design Systems",
      "Accessibility (a11y)",
      "Service Design",
      "UX Metrics & Analytics",
      "UX Research Leadership",
      "Cross-Platform Experience",
      "Design Thinking Facilitation",
      "Customer Journey Orchestration"
    ]
  },
  {
    title: "Business & Strategy",
    skills: [
      "Market Analysis",
      "Competitive Research",
      "Business Modeling",
      "Growth Strategy",
      "KPI Definition",
      "ROI Analysis"
    ]
  },
  {
    title: "Technical Skills",
    skills: [
      "SQL",
      "Python",
      "Pandas",
      "Data Analysis",
      "Data Visualization",
      "Data Modeling",
      "ETL Pipelines",
      "API Integration",
      "Analytics Instrumentation",
      "Technical Documentation",
      "Documentation Writing",
      "JIRA",
      "Figma",
      "Product Analytics Tools",
      "Project Management Tools"
    ]
  },
  {
    title: "Artificial Intelligence",
    skills: [
      "Vibe Coding",
      "AI Workflows",
      "AI Infrastructure",
      "APIs for LLMs",
      "AI Catalog",
      "Enterprise GenAI",
      "Prompt Engineering",
      "Model Evaluation & Selection",
      "Responsible AI / AI Ethics",
      "RAG Pipelines",
      "AI Productization"
    ]
  }
];

export default function Skills() {
  const { scrollYProgress } = useScroll();
  const gifOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);

  return (
    <section id="skills" className="relative py-20 min-h-screen">
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-900/50 text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-700 hover:border-orange-500/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 