import React from 'react';
import { motion } from 'framer-motion';

const researchProjects = [
  {
    title: 'Physics-Aware Assembly Planning',
    description: 'Advanced robotics research focusing on physics-aware combinatorial assembly sequence planning using innovative data-free action masking techniques. Published in IEEE Robotics and Automation Letters (2025).',
    year: '2025',
    link: 'https://arxiv.org/pdf/2408.10162',
    tags: ['Robotics', 'AI', 'Assembly'],
  },
  {
    title: 'AssemblyComplete',
    description: 'Pioneering work in 3D combinatorial construction using deep reinforcement learning. Developing novel approaches for automated assembly planning and execution.',
    year: '2024',
    link: 'https://arxiv.org/abs/2410.15469',
    tags: ['Deep Learning', 'Reinforcement Learning', '3D Construction'],
  },
  {
    title: 'Eco-Driving Strategy',
    description: 'Research on developing eco-driving strategies in hybrid traffic networks using reinforcement learning. Published in Science Progress (2024).',
    year: '2024',
    link: 'https://doi.org/10.1177/00368504241263406',
    tags: ['Autonomous Vehicles', 'Reinforcement Learning', 'Sustainability'],
  },
  {
    title: 'Robotic LEGO Construction',
    description: 'Innovative approach combining simulation-aided learning with demonstration for robotic LEGO construction. Exploring new methods in robotic assembly.',
    year: '2023',
    link: 'https://arxiv.org/abs/2309.11010',
    tags: ['Robotics', 'Simulation', 'Learning'],
  },
  {
    title: 'Interactive Data Collection',
    description: 'Research on interactive data collection methodologies using CARLA and OpenCDA for reinforcement learning applications in autonomous systems.',
    year: '2022',
    link: 'https://arxiv.org/abs/2309.11010',
    tags: ['Data Collection', 'Autonomous Systems', 'Simulation'],
  },
];

const startupProjects = [
  {
    title: 'LearnOlympiad.com',
    role: 'Developer & Founder',
    period: 'January 2025-Present',
    description: 'Used React, Firebase, and APIs to develop a SaaS with a RAG chatbot, raised $2k in investment, and began beta-testing.',
    tags: ['React', 'Firebase', 'SaaS', 'RAG', 'Chatbot'],
  },
  {
    title: 'AssembleIt',
    role: 'Researcher & Founder',
    period: 'May 2024-Present',
    description: 'Founded startup with my research. Raised $11k from Emergent Ventures and 1517 Medici to build ideas. Patent pending.',
    tags: ['Startup', 'Research', 'Patent Pending'],
  },
];

const internships = [
  {
    title: 'Intelligent Control Lab',
    organization: 'Carnegie Mellon University Robotics Institute',
    role: 'Research Assistant',
    period: 'October 2022-August 2024',
    description: 'Worked in-person at Carnegie Mellon in partnership with the ARM Institute and the US Government.',
    tags: ['Robotics', 'Research', 'ARM Institute'],
  },
  {
    title: 'UTSA Research Undergraduate Experience',
    organization: 'University of Texas at San Antonio',
    role: 'Research Assistant',
    period: 'May-August 2022',
    description: 'Attended lab meetings, worked under a PhD mentor on autonomous vehicle research, and learned to use Linux Ubuntu.',
    tags: ['Autonomous Vehicles', 'Research', 'Linux'],
  },
];

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Experience
        </motion.h1>

        {/* Research Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Research Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    View Publication
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Startup Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Startup Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {startupProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400">{project.role}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Internships Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Internships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white">{internship.title}</h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400">{internship.role}</p>
                      <p className="text-gray-600 dark:text-gray-400">{internship.organization}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{internship.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{internship.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects; 