import React from 'react';
import { motion } from 'framer-motion';

const researchProjects = [
  {
    title: 'AssemblyComplete: 3D Combinatorial Construction with Deep Reinforcement Learning',
    authors: 'Chen, A., & Liu, C. (2025)',
    description: '3D combinatorial construction using deep reinforcement learning. Published in 2025 Modeling, Estimation and Control Conference.',
    year: '2025',
    link: 'https://doi.org/10.1016/j.ifacol.2025.12.346',
    tags: ['Deep Learning', 'Reinforcement Learning', '3D Construction', 'MECC'],
  },
  {
    title: 'Physics‑Aware Combinatorial Assembly Sequence Planning using Masking',
    authors: 'Liu, R., Chen, A., Zhao, W., & Liu, C. (2025)',
    description: 'Advanced robotics research focusing on physics-aware combinatorial assembly sequence planning using data-free action masking. Published in IEEE Robotics and Automation Letters (2025) and @ IEEE IROS 2025.',
    year: '2025',
    link: 'https://ieeexplore.ieee.org/abstract/document/10938966',
    tags: ['Robotics', 'AI', 'Assembly', 'PPO', 'DRL', 'IEEE RA-L', 'IEEE IROS'],
  },
  {
    title: 'Developing an eco-driving strategy in a hybrid traffic network using reinforcement learning',
    authors: 'Jamil, U., Malmir, M., Chen, A., Filipovska, M., Xie, M., Ding, C., & Jin, Y. F. (2024)',
    description: 'Research on developing eco-driving strategies in hybrid traffic networks using reinforcement learning. Published in Science Progress (2024).',
    year: '2024',
    link: 'https://doi.org/10.1177/00368504241263406',
    tags: ['Autonomous Vehicles', 'Reinforcement Learning', 'Sustainability'],
  },
  {
    title: 'Simulation‑aided Learning from Demo for Construction',
    authors: 'Liu, R., Chen, A., Luo, X., & Liu, C. (2023)',
    description: 'Innovative approach merging ConvNets with simulation-aided learning with demonstration for robotic LEGO construction. Exploring new methods in robotic assembly.',
    year: '2023',
    link: 'https://arxiv.org/abs/2309.11010',
    tags: ['Robotics', 'Simulation', 'Learning'],
  },
  {
    title: 'Interactive Data Collection for Reinforcement Learning CAVs',
    authors: 'Chen, A., et. al. (2022)',
    description: 'Research on interactive data collection methodologies using CARLA and OpenCDA for reinforcement learning applications in autonomous systems. Presented @ ICIBM and Tran-Set 2022.',
    year: '2022',
    link: 'https://icibm2022.iaibm.org/Schedule_files/ICIBM2022_Program.pdf',
    tags: ['Data Collection', 'Autonomous Systems', 'Simulation', 'ICIBM', 'TranSet'],
  },
];

const startupProjects = [
  {
    title: 'CapyCot (on-pause)',
    role: 'Founder',
    period: 'May 2025-(On Pause to Learn More)',
    description: 'Generative models for creative content design and generation (conditional deferred acceptance to YCombinator and Zfellows).',
    tags: ['SaaS', 'Generative Models', 'LLMs', 'Diffusion Models', 'DreamBooth', 'LoRA'],
  },
  {
    // title: 'Stealth',
    title: 'LearnOlympiad.com',
    role: 'Developer & Founder',
    period: 'January 2025-April 2025',
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

const researchExperiences = [
  {
    title: 'Research Engineer Intern',
    organization: 'Stealth Startup',
    role: 'Research Engineer Intern',
    period: 'December 2025 - Present',
    description: 'Applying state-of-the-art language model research to fine-tune generative video/image models for customers. Working closely with research scientists to develop data curation strategies for refining diffusion models. Experimenting with text and image encoders for conditioning, and using techniques like DreamBooth and LoRA.',
    tags: ['AI/ML', 'Diffusion Models', 'LLMs', 'DreamBooth', 'LoRA', 'Generative Models'],
  },
  {
    title: 'Researcher',
    organization: 'Learning Agents Research Group (LARG) || UT Austin',
    role: 'Researcher',
    period: 'September 2025 - Present',
    description: 'Researching reinforcement learning for vision language agents (VLAs) for mobile robot manipulation tasks. Finetuning robot foundation models (Octo, OpenVLA) using PPO, GRPO, and Diffusion PPO in Maniskill. Leading 4 peers to research on runtime verification of language agents using BERT encodings and temporal logic.',
    tags: ['Reinforcement Learning', 'VLAs', 'Robotics', 'PPO', 'GRPO', 'Diffusion PPO', 'BERT'],
  },
  {
    title: 'Researcher',
    organization: 'Intelligent Control Lab || Carnegie Mellon Robotics Institute',
    role: 'Researcher',
    period: 'October 2022 - October 2024',
    description: '2nd-authored two papers on Sim2Real digital twin and deployed trained algorithms onto a FANUC robot arm. 1st-authored paper using StableBaselines3 reinforcement learning (PPO) to tackle in-process assembly planning. Tested Vision Language Models, Siamese Networks, ConvNets, and Graph Neural Networks for classification. Recognized by former First Lady Biden in collaboration with ARM Institute and the US Gov for manufacturing.',
    tags: ['Robotics', 'Research', 'Assembly', 'Manufacturing', 'Digital Twin', 'PPO', 'Sim2Real'],
  },
  {
    title: 'Research Engineer Intern',
    organization: 'Instinct Robotics',
    role: 'Research Engineer Intern',
    period: 'December 2023 - January 2024',
    description: 'Contributed to early simulation development with real-world physics for precise robot control using Gazebo. Reviewed state-of-the-art reinforcement learning and control papers to create robot arms faster than humans. Collaborated closely with the Ph.D. CEO and founding engineer to deliver AI solutions to contractors.',
    tags: ['Robotics', 'Startup', 'Simulation', 'Gazebo', 'Reinforcement Learning', 'Control'],
  },
  {
    title: 'Researcher',
    organization: 'Research Undergraduate Experience || University of Texas at San Antonio',
    role: 'Researcher',
    period: 'May - August 2022',
    description: 'Participated in autonomous vehicle research with a focus on simulations, sensor fusion, and trajectory planning. Curated training data using car simulators CARLA and SUMO, YAML/JSON processing, and Numpy/Pandas.',
    tags: ['Autonomous Vehicles', 'Research', 'CARLA', 'SUMO', 'Sensor Fusion', 'Trajectory Planning'],
  },
];

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

        {/* Research Publications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading mb-8 text-text-dark">Research Publications <span className="text-lg text-text-dark font-sans">(Google Scholar with 19 Total Citations)</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-background-dark/50 rounded-lg overflow-hidden hover:bg-gray-dark/80 transition-colors duration-200 border border-gray-dark"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold mb-2 text-text-dark">{project.title}</h3>
                    <span className="text-sm text-text-dark font-sans whitespace-nowrap ml-4">{project.year}</span>
                  </div>
                  <p className="text-sm text-text-dark/80 mb-2 font-sans italic">{project.authors}</p>
                  <p className="text-text-dark mb-4 font-sans">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary-blue/30 text-accent-green rounded-full font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent-green hover:text-accent-green transition-colors font-sans"
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
          <h2 className="text-3xl font-heading mb-8 text-text-dark">Startup Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {startupProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-background-dark/50 rounded-lg overflow-hidden hover:bg-gray-dark/80 transition-colors duration-200 border border-gray-dark"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1 text-text-dark">{project.title}</h3>
                      <p className="text-lg text-accent-green font-sans">{project.role}</p>
                    </div>
                    <span className="text-sm text-text-dark font-sans">{project.period}</span>
                  </div>
                  <p className="text-text-dark mb-4 font-sans">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
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

        {/* Research Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading mb-8 text-text-dark">Research Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchExperiences.map((experience, index) => (
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