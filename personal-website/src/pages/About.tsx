import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Programming Languages',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'R', 'LaTeX'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['PyTorch', 'ROS', 'React', 'CARLA', 'SUMO', 'SB3', 'OpenAI Gym', 'Matplotlib'],
  },
  {
    category: 'Tools & Technologies',
    items: ['Git', 'GitHub', 'Linux', 'Overleaf', 'APIs'],
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science & Mathematics',
    school: 'University of Texas at Austin',
    year: '2025 - Present',
    details: 'Turing Honors Program',
  },
  {
    degree: 'High School Diploma',
    school: 'Westlake High School',
    year: '2021 - 2025',
    details: 'Graduated Top 1% Out of +720 Students, CS and APC Club President, Student Council Executive Board Officer',
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
    title: 'Olympiad',
    role: 'Developer',
    period: 'January 2025-April 2025',
    description: 'Creating educational through personalized AI mentorship and training. Using RAG and custom tools for chatbot, raised $2k, and beta-testing.',
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

const About: React.FC = () => {
  return (
    <div className="text-text-dark font-sans pt-24 pb-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-heading mb-8 text-center bg-gradient-to-r from-primary-blue to-teal-400/90 bg-clip-text text-transparent"
        >
          About Me
        </motion.h1>

        {/* Education — moved up */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-heading mb-2 bg-gradient-to-r from-primary-blue to-teal-400/90 bg-clip-text text-transparent text-center">
            Education
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-primary-blue/80 to-teal-400/70 rounded-full" />
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-background-dark/60 rounded-2xl p-6 border border-gray-dark/60 shadow-xl backdrop-blur flex items-start gap-4 border-l-4 border-l-primary-blue/70"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-1 text-teal-400/90">{edu.degree}</h3>
                  <p className="text-text-dark mb-1 font-sans">{edu.school}</p>
                  <p className="text-text-dark mb-2 font-sans">{edu.year}</p>
                  <p className="text-text-dark font-sans">{edu.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Achievements & Recognition */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400/90 to-primary-blue">
            Achievements & Recognition
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Research & Science Fair */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-background-dark/50 p-6 rounded-xl backdrop-blur-sm border border-gray-dark/50"
            >
              <h3 className="text-xl font-semibold mb-4 text-teal-400/90">Research Excellence</h3>
              <ul className="space-y-3 font-sans">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">Regeneron STS Scholar</p>
                    <p className="text-sm text-text-dark">Top 300, Society of Science · Jan 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">4th Place Grand Award @ ISEF</p>
                    <p className="text-sm text-text-dark">Systems Software, Society of Science · May 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">Best of State in Texas</p>
                    <p className="text-sm text-text-dark">Physical Sciences, TXSEF · Mar 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">Finalist @ NJSHS, 4th Place Overall in Texas</p>
                    <p className="text-sm text-text-dark">Junior Science & Humanities Symposium · Jan 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">GARSEF 1st Place</p>
                    <p className="text-sm text-text-dark">Systems Software · 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">TXSEF 1st Place</p>
                    <p className="text-sm text-text-dark">Systems Software · 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">Summus Industries Special Award</p>
                    <p className="text-sm text-text-dark">$1,000 · 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">GARSEF 2nd Place</p>
                    <p className="text-sm text-text-dark">Engineering Technology: Statics and Dynamics · 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">Naval Science Award</p>
                    <p className="text-sm text-text-dark">Office of Naval Research · Jan 2024</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Computing & Technology */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-background-dark/50 p-6 rounded-xl backdrop-blur-sm border border-gray-dark/50"
            >
              <h3 className="text-xl font-semibold mb-4 text-teal-400/90">Computing & Technology</h3>
              <ul className="space-y-3 font-sans">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">USA Computing Olympiad</p>
                    <p className="text-sm text-text-dark">Platinum Rank, USACO · Feb 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">FIRST Robotics</p>
                    <p className="text-sm text-text-dark">Worlds Finalist · May 2023</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">FIRST Technological Challenge</p>
                    <p className="text-sm text-text-dark">Innovation Challenge Semifinalist · May 2021</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">HackNEHs</p>
                    <p className="text-sm text-text-dark">3rd in Novice · June 2021</p>
                  </div>
                </li>
              </ul>
              <ul className="space-y-3 font-sans">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">Turing Endowed Scholarship $5k</p>
                    <p className="text-sm text-text-dark">Awarded by UT Austin Turing Program · August 2025</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Academic & Service */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-background-dark/50 p-6 rounded-xl backdrop-blur-sm border border-gray-dark/50"
            >
              <h3 className="text-xl font-semibold mb-4 text-teal-400/90">Entrepreneurship & Service</h3>
              <ul className="space-y-3 font-sans">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">Emergent Ventures Fellow</p>
                    <p className="text-sm text-text-dark">Selected for innovative ideas · June 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">1517 Medici Group</p>
                    <p className="text-sm text-text-dark">Fellow · July 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">President's Volunteer Service Award</p>
                    <p className="text-sm text-text-dark">Gold Level (4x) · 2021-2024</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Additional Recognition */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-background-dark/50 p-6 rounded-xl backdrop-blur-sm border border-gray-dark/50"
            >
              <h3 className="text-xl font-semibold mb-4 text-teal-400/90">Additional Recognition</h3>
              <ul className="space-y-3 font-sans">
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">DCU for Kids Scholarship</p>
                    <p className="text-sm text-text-dark">$2,500 · Apr 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">NSF Travel Award</p>
                    <p className="text-sm text-text-dark">National Science Foundation · Aug 2022</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">Brawl Stars Masters Rank</p>
                    <p className="text-sm text-text-dark">Top 200 in US, SuperCell · Aug 2022</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-orange mr-2">✦</span>
                  <div>
                    <p className="font-medium text-text-dark">International Federation of Automatic Control Student Grant</p>
                    <p className="text-sm text-text-dark">Awarded by IFAC · May 2025</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        <footer className="py-4 text-center border-t border-gray-dark/20 mt-6">
          <p className="text-text-dark/50 font-sans text-sm">
            © Alan Chen / Alan Jiaqi Chen / Jiaqi07 / 2026
          </p>
          <p className="mt-1 text-text-dark/50 font-sans text-sm">
            <a
              href="https://alanchen.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dark/60 hover:text-text-dark/90 hover:underline transition-colors"
            >
              Previous site
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About; 
