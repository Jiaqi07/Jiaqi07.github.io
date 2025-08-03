import React from 'react';
import { motion } from 'framer-motion';

const researchProjects = [
  {
    title: 'AssemblyComplete',
    description: 'Pioneering work in 3D combinatorial construction using deep reinforcement learning. Developing novel approaches for automated assembly planning and execution. Published in Modeling, Estimation, Control Conference 2025.',
    year: '2024, 2025',
    link: 'https://arxiv.org/abs/2410.15469',
    tags: ['Deep Learning', 'Reinforcement Learning', '3D Construction'],
  },
  {
    title: 'Physics-Aware Assembly Planning',
    description: 'Advanced robotics research focusing on physics-aware combinatorial assembly sequence planning using data-free action masking. Published in IEEE Robotics and Automation Letters (2025). Presenting @ IROS 2025.',
    year: '2024, 2025',
    link: 'https://ieeexplore.ieee.org/abstract/document/10938966',
    tags: ['Robotics', 'AI', 'Assembly', 'PPO', 'DRL'],
  },
  {
    title: 'Eco-Driving Strategy',
    description: 'Research on developing eco-driving strategies in hybrid traffic networks using reinforcement learning. Published in Science Progress (2024).',
    year: '2023, 2024',
    link: 'https://doi.org/10.1177/00368504241263406',
    tags: ['Autonomous Vehicles', 'Reinforcement Learning', 'Sustainability'],
  },
  {
    title: 'SaLfD',
    description: 'Innovative approach merging ConvNets with simulation-aided learning with demonstration for robotic LEGO construction. Exploring new methods in robotic assembly.',
    year: '2023',
    link: 'https://arxiv.org/abs/2309.11010',
    tags: ['Robotics', 'Simulation', 'Learning'],
  },
  {
    title: 'Interactive Modeling of Autonomous Vehicles',
    description: 'Research on interactive data collection methodologies using CARLA and OpenCDA for reinforcement learning applications in autonomous systems. Presented @ ICIBM and Tran-Set 2022',
    year: '2022',
    link: 'https://icibm2022.iaibm.org/Schedule_files/ICIBM2022_Program.pdf',
    tags: ['Data Collection', 'Autonomous Systems', 'Simulation'],
  },
];

const startupProjects = [
  {
    title: 'Stealth (Seeking funding + building)',
    role: 'Founder',
    period: 'May 2025-Present',
    description: 'Helping teachers teach better while appealing to and protecting students.',
    tags: ['SaaS', 'EdTech', 'Students', 'Teachers'],
  },
  {
    // title: 'Stealth',
    title: 'LearnOlympiad.com (building w/ friends)',
    role: 'Developer & Founder',
    period: 'January 2025-Present',
    description: 'Democritizing education through personalized AI mentorship and training. Using RAG and custom tools for chatbot, raised $2k, and beta-testing.',
    tags: ['React', 'Firebase', 'SaaS', 'RAG', 'Chatbot'],
  },
  {
    title: 'AssembleIt',
    role: 'Researcher & Founder',
    period: 'May 2024-April 2025',
    description: 'Founded startup with my research. Raised $11k from Emergent Ventures and 1517 Medici to build ideas. Currently on-pause and planning to pivot.',
    tags: ['Startup', 'Research', 'Patent Pending'],
  },
];

const internships = [
  {
    title: 'Intelligent Control Lab',
    organization: 'Carnegie Mellon University Robotics Institute',
    role: 'Research Intern',
    period: 'October 2022-October 2024',
    description: 'Worked in-person at Carnegie Mellon in partnership with the ARM Institute and the US Government. Deployed research onto live FANUC robot arm.',
    tags: ['Robotics', 'Research', 'Assembly', 'Manufacturing', 'Digital Twin'],
  },
  {
    title: 'UTSA Research Undergraduate Experience',
    organization: 'University of Texas at San Antonio',
    role: 'Research Intern',
    period: 'May-August 2022',
    description: 'Attended lab meetings, worked under a PhD mentor on autonomous vehicle research, and learned to use Linux Ubuntu.',
    tags: ['Autonomous Vehicles', 'Research', 'Linux'],
  },
  {
    title: 'Robotics Grinding Startup',
    organization: 'Stealth Startup',
    role: 'Research and Development Intern & Software Engineer',
    period: 'December 2023-January 2024',
    description: 'Contributed to early simulation development, focusing on autonomous manipulation for robot grinding in a 3-week sprint. Reviewed state-of-the-art reinforcement learning and control papers to create robotic arms that are 2x faster than humans.',
    tags: ['Robotics', 'Startup', 'Government', 'Manufacturing', 'Simulation'],
  },
  {
    title: 'Austin Great Wall Chinese School',
    organization: 'AGWCS',
    role: 'Teacher, prev. TA (2020) & Ambassador (2023)',
    period: 'May 2020-August 2024',
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

        {/* Research Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading mb-8 text-text-light dark:text-text-dark">Research Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-background-light dark:bg-background-dark/50 rounded-lg overflow-hidden hover:bg-gray-light dark:hover:bg-gray-dark/80 transition-colors duration-200 border border-gray-light dark:border-gray-dark"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark">{project.title}</h3>
                    <span className="text-sm text-text-light dark:text-text-dark font-sans">{project.year}</span>
                  </div>
                  <p className="text-text-light dark:text-text-dark mb-4 font-sans">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary-blue/10 dark:bg-primary-blue/30 text-primary-blue dark:text-accent-green rounded-full font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-blue hover:text-primary-blue dark:text-accent-green dark:hover:text-accent-green transition-colors font-sans"
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
          <h2 className="text-3xl font-heading mb-8 text-text-light dark:text-text-dark">Startup Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {startupProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-background-light dark:bg-background-dark/50 rounded-lg overflow-hidden hover:bg-gray-light dark:hover:bg-gray-dark/80 transition-colors duration-200 border border-gray-light dark:border-gray-dark"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1 text-text-light dark:text-text-dark">{project.title}</h3>
                      <p className="text-lg text-primary-blue dark:text-accent-green font-sans">{project.role}</p>
                    </div>
                    <span className="text-sm text-text-light dark:text-text-dark font-sans">{project.period}</span>
                  </div>
                  <p className="text-text-light dark:text-text-dark mb-4 font-sans">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary-blue/10 dark:bg-primary-blue/30 text-primary-blue dark:text-accent-green rounded-full font-sans"
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
          <h2 className="text-3xl font-heading mb-8 text-text-light dark:text-text-dark">Internships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-background-light dark:bg-background-dark/50 rounded-lg overflow-hidden hover:bg-gray-light dark:hover:bg-gray-dark/80 transition-colors duration-200 border border-gray-light dark:border-gray-dark"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1 text-text-light dark:text-text-dark">{internship.title}</h3>
                      <p className="text-lg text-primary-blue dark:text-accent-green font-sans">{internship.role}</p>
                      <p className="text-text-light dark:text-text-dark font-sans">{internship.organization}</p>
                    </div>
                    <span className="text-sm text-text-light dark:text-text-dark font-sans">{internship.period}</span>
                  </div>
                  <p className="text-text-light dark:text-text-dark mb-4 font-sans">{internship.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary-blue/10 dark:bg-primary-blue/30 text-primary-blue dark:text-accent-green rounded-full font-sans"
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