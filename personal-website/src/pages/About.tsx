import React from 'react';
import { motion } from 'framer-motion';
import { ThankYouAnimation } from '../components/ThankYouAnimation';

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
    degree: 'Bachelor of Science in Computer Science',
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

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          About Me
        </motion.h1>

        {/* Accomplishments Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Achievements & Recognition
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Research & Science Fair */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Research Excellence</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">Regeneron STS Scholar</p>
                    <p className="text-sm text-gray-400">Top 300, Society of Science · Jan 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">4th Place Grand Award @ ISEF</p>
                    <p className="text-sm text-gray-400">Systems Software, Society of Science · May 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">Best of State in Texas</p>
                    <p className="text-sm text-gray-400">Physical Sciences, TXSEF · Mar 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">Finalist @ NJSHS, 4th Place Overall in Texas</p>
                    <p className="text-sm text-gray-400">Junior Science & Humanities Symposium · Jan 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">GARSEF 1st Place</p>
                    <p className="text-sm text-gray-400">Systems Software · 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">TXSEF 1st Place</p>
                    <p className="text-sm text-gray-400">Systems Software · 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">Summus Industries Special Award</p>
                    <p className="text-sm text-gray-400">$1,000 · 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">GARSEF 2nd Place</p>
                    <p className="text-sm text-gray-400">Engineering Technology: Statics and Dynamics · 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">Naval Science Award</p>
                    <p className="text-sm text-gray-400">Office of Naval Research · Jan 2024</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Computing & Technology */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Computing & Technology</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">USA Computing Olympiad</p>
                    <p className="text-sm text-gray-400">Platinum Rank, USACO · Feb 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">FIRST Robotics</p>
                    <p className="text-sm text-gray-400">Worlds Finalist · May 2023</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">FIRST Technological Challenge</p>
                    <p className="text-sm text-gray-400">Innovation Challenge Semifinalist · May 2021</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">HackNEHs</p>
                    <p className="text-sm text-gray-400">3rd in Novice · June 2021</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Academic & Service */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Entrepreneurship & Service</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">Emergent Ventures Fellow</p>
                    <p className="text-sm text-gray-400">Selected for innovative ideas · June 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">1517 Medici Group</p>
                    <p className="text-sm text-gray-400">Fellow · July 2024</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">President's Volunteer Service Award</p>
                    <p className="text-sm text-gray-400">Gold Level (4x) · 2021-2024</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Additional Recognition */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Additional Recognition</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">DCU for Kids Scholarship</p>
                    <p className="text-sm text-gray-400">$2,500 · Apr 2025</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">NSF Travel Award</p>
                    <p className="text-sm text-gray-400">National Science Foundation · Aug 2022</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <div>
                    <p className="font-medium">Brawl Stars Masters Rank</p>
                    <p className="text-sm text-gray-400">Top 200 in US, SuperCell · Aug 2022</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
            Skills
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/60 shadow-xl backdrop-blur"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-300">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-700/60 to-purple-700/60 border border-blue-500/30 text-blue-100 shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
            Education
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/60 shadow-xl backdrop-blur flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {edu.degree.includes('Bachelor') ? '🎓' : '🏫'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-blue-200">{edu.degree}</h3>
                  <p className="text-gray-300 mb-1">{edu.school}</p>
                  <p className="text-gray-400 mb-2">{edu.year}</p>
                  <p className="text-gray-300">{edu.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="my-16" />
        {/* Thank You Animation Section */}
        <section className="max-w-3xl mx-auto bg-gray-800/60 rounded-2xl border border-gray-700/60 shadow-xl backdrop-blur p-6 mb-20">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
            Supporters & Believers
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
          <ThankYouAnimation message="Thank you to all my supporters!" />
        </section>
      </div>
    </div>
  );
};

export default About; 