import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Programming Languages',
    items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'MATLAB'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['TensorFlow', 'PyTorch', 'ROS', 'React', 'Three.js'],
  },
  {
    category: 'Tools & Technologies',
    items: ['Git', 'Docker', 'Linux', 'AWS', 'Arduino'],
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of Texas at Austin',
    year: '2025 - Present',
    details: 'Turing Honors Program',
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

        {/* Bio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-4">Bio</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              I'm an incoming freshman at UT Austin studying computer science under the Turing Honors program. 
              My passion lies in robotics, artificial intelligence, and their intersection with real-world applications.
            </p>
            <p className="text-gray-300 mb-4">
              Currently, I'm focused on becoming a Davidson Fellow 2025 laureate and winning a grand award at ISEF. 
              I'm also actively seeking opportunities to learn and grow through programs like ZFellows.
            </p>
            <p className="text-gray-300">
              When I'm not coding or researching, you can find me playing basketball, teaching others how to find their passions, 
              playing Brawl Stars, or enjoying a game of Go with friends.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-gray-700/50 rounded-full text-gray-300"
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
          <h2 className="text-2xl font-semibold mb-6">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                <p className="text-gray-300 mb-1">{edu.school}</p>
                <p className="text-gray-400 mb-2">{edu.year}</p>
                <p className="text-gray-300">{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About; 