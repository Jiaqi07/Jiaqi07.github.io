import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import gsap from 'gsap';
import ImageSlider from '../components/ImageSlider';
import SocialLinks from '../components/SocialLinks';
import { useInView } from 'framer-motion';
import { InteractiveConstellation } from '../components/InteractivePlanets';

const Home: React.FC = () => {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true });

  useEffect(() => {
    if (isInView) {
      gsap.from('.about-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [isInView]);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with 3D Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Canvas className="absolute inset-0" camera={{ position: [0, 0, 10], fov: 60 }}>
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            maxDistance={20}
            minDistance={3}
          />
          <Stars 
            radius={100} 
            depth={50} 
            count={3000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
          <InteractiveConstellation />
        </Canvas>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            Alan Chen
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Computer Science Student @ UT Austin
          </p>
          <SocialLinks />
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="about-content">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 text-gray-300"
            >
              <p>
                Hello! I'm an incoming freshman @ UT Austin studying computer science under the Turing Honors program! 
                I hope to become a Davidson Fellow 2025 laureate, win a grand award at ISEF in May, and land an opportunity 
                to learn under programs like ZFellows.
              </p>
              <p>
                I have many interests that I'm currently exploring such as robotics, reinforcement learning, startups, and research.
              </p>
              <p>
                In my free time, I love playing basketball, teaching others how to find their passions, playing Brawl Stars on my phone, 
                and running up Go games on KGS with friends.
              </p>
            </motion.div>
          </div>
          <div className="relative">
            <ImageSlider />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Skills & Expertise
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Robotics', 'AI/ML', 'Web Development', 'Research'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 p-6 rounded-lg text-center hover:bg-gray-800/80 transition-colors duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 