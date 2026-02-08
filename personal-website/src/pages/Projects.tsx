import React from 'react';
import { motion } from 'framer-motion';

const otherExperiences = [
  {
    title: 'Austin Great Wall Chinese School',
    organization: 'AGWCS',
    role: 'Teacher, prev. TA (2020) & Ambassador (2023)',
    period: 'May 2020 - August 2024',
    description: 'Taught +130 students and designed custom curriculum. Served as Texas ambassador and partnered with Chinese schools all across the US.',
    tags: ['Teaching', 'Speaking', 'Leadership', 'Mentorship'],
  },
];

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen text-text-dark font-sans py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-heading mb-12 text-center bg-gradient-to-r from-primary-blue to-accent-green bg-clip-text text-transparent"
        >
          Experience
        </motion.h1>

        {/* Other Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading mb-8 text-text-dark">Other Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherExperiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-background-dark/50 rounded-lg overflow-hidden hover:bg-gray-dark/80 transition-colors duration-200 border border-gray-dark"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1 text-text-dark">{experience.title}</h3>
                      <p className="text-lg text-accent-green font-sans">{experience.role}</p>
                      <p className="text-text-dark font-sans">{experience.organization}</p>
                    </div>
                    <span className="text-sm text-text-dark font-sans whitespace-nowrap ml-4">{experience.period}</span>
                  </div>
                  <p className="text-text-dark mb-4 font-sans">{experience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary-blue/30 text-accent-green rounded-full font-sans"
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