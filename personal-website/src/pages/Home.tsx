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
        <Canvas className="absolute inset-y-0 right-0 w-1/2" camera={{ position: [0, 0, 10], fov: 60 }}>
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
          className="relative text-center px-24 ml-[140px]"
        >
          <h1 className="text-6xl md:text-8xl font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-accent-green mb-4">
            Alan Chen
          </h1>
          <p className="text-xl md:text-2xl text-text-dark mb-8">
            Computer Science Student @ UT Austin
          </p>
          <SocialLinks />
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-40 items-center">
          <div className="about-content">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-heading mb-6"
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 text-text-dark"
            >
              <p>
                Hello! I'm an incoming freshman @ UT Austin studying computer science under the Turing Honors program! 
              </p>
              <p>
                My top 3 achievements are: Being named a Regeneron Science Talent Search Scholar and ISEF Grand Award Winner, publishing research in journals with 14 total Google Scholar citations, and passing to the USA Computing Olympiad Platinum rank.
              </p>
              <p>
                In my past life, I represented USA internationally in Go at competitions in Shanghai, China, and Osaka, Japan 
                as a Top 5 Youth player after placing 3rd at competitions like American Go Association (AGA) YoungLions and US Go Congress in 2019-20. I also led a cult on Scratch as @ac91305 that I barely remember.
              </p>
              <p>
                In 2025-2026, I hope to become an AI/ML intern at a sick company, launch my startup and get accepted into ZFellows and YCombinator, 
                and publish sick research in reasoning, LLMs, and interpretability.
              </p>
              <p>
                I have many interests that I am currently exploring, such as LLMs, reinforcement learning, startups, and research.
              </p>
              <p>
                In my free time, I play basketball, teach others how to find their passions, play Brawl Stars, 
                and run up Go games on KGS.
              </p>
            </motion.div>
          </div>
          <div className="relative">
            <ImageSlider />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 md:px-8 bg-background-dark/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-heading mb-12 text-center"
          >
            Greatest Strengths
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Grinding', 'AI/ML', 'Yapping', 'Research'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-dark/50 p-6 rounded-lg text-center hover:bg-gray-dark/80 transition-colors duration-200"
              >
                <h3 className="text-xl font-sans mb-2">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 