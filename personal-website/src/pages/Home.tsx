import React from 'react';
import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';

const researchPublications = [
  {
    title: 'AssemblyComplete: 3D Combinatorial Construction with Deep Reinforcement Learning',
    authors: 'Chen, A., & Liu, C. (2025)',
    venue: 'IFAC MECC 2025',
    year: '2025',
    link: 'https://doi.org/10.1016/j.ifacol.2025.12.346',
    badge: 'MECC',
  },
  {
    title: 'Physics‑Aware Combinatorial Assembly Sequence Planning using Masking',
    authors: 'Liu, R., Chen, A., Zhao, W., & Liu, C. (2025)',
    venue: 'IEEE RA-L & IROS 2025',
    year: '2025',
    link: 'https://ieeexplore.ieee.org/abstract/document/10938966',
    badge: 'RA-L',
  },
  {
    title: 'Developing an eco-driving strategy in a hybrid traffic network using reinforcement learning',
    authors: 'Jamil, U., Malmir, M., Chen, A., et al. (2024)',
    venue: 'Science Progress 2024',
    year: '2024',
    link: 'https://doi.org/10.1177/00368504241263406',
    badge: 'SciProg',
  },
  {
    title: 'Simulation‑aided Learning from Demo for Construction',
    authors: 'Liu, R., Chen, A., Luo, X., & Liu, C. (2023)',
    venue: 'arXiv 2023',
    year: '2023',
    link: 'https://arxiv.org/abs/2309.11010',
    badge: 'SimLfD',
  },
  {
    title: 'Interactive Data Collection for Reinforcement Learning CAVs',
    authors: 'Chen, A., et al. (2022)',
    venue: 'ICIBM & Tran-Set 2022',
    year: '2022',
    link: 'https://icibm2022.iaibm.org/Schedule_files/ICIBM2022_Program.pdf',
    badge: 'ICIBM',
  },
];

const newsItems = [
  {
    date: 'May 27, 2025',
    title: "Central Texas students excel at world's largest science fair, earn top awards, scholarships",
    url: 'https://cbsaustin.com/news/local/central-texas-students-excel-at-worlds-largest-science-fair-earn-top-awards-scholarships',
  },
  {
    date: 'Jan 2025',
    title: '2025 Regeneron STS Scholars: Alan Jiaqi Chen — AssemblyComplete: Deep Reinforcement Learning-Based Combinatorial 3D Assembly Completion',
    url: 'https://www.societyforscience.org/regeneron-sts/2025-scholars/',
  },
  {
    date: 'Aug 2024',
    title: 'Emergent Ventures 36th Cohort: Alan Chen, Austin — robotics, AI, and assembly',
    url: 'https://marginalrevolution.com/marginalrevolution/2024/08/emergent-ventures-36th-cohort.html',
  },
  {
    date: 'Jan 2024',
    title: 'TJSHS Honorable Mention: Alan Chen — Simulation-aided Learning from Demonstration for Robotic LEGO Construction',
    url: 'https://artscioutreach.tamu.edu/tjshs-event-results',
  },
];

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Minimal top: name, optional image, tagline, links */}
      <section className="pt-28 md:pt-32 pb-12 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-heading font-semibold text-text-dark mb-6 tracking-tight"
          >
            Alan Chen
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <img
              src="/images/alan2.jpg"
              alt="Alan Chen"
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover border border-gray-dark/50"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-text-dark/90 font-sans text-base mb-6"
          >
            Computer Science @ UT Austin · AI Researcher
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SocialLinks />
          </motion.div>
        </div>
      </section>

      {/* Blurb — single column, same copy */}
      <section className="py-8 px-4 md:px-8 border-t border-gray-dark/20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-text-dark font-sans text-[15px] leading-relaxed"
          >
            <p>
              Hello! I'm a freshman @ UT Austin studying computer science and mathematics under the <strong>Turing Scholar Honors program</strong>!
            </p>
            <p>
              In my past life, I represented USA internationally in <strong>Go</strong> at competitions in Shanghai, China, and Osaka, Japan
              as a Top 5 Youth player after placing 3rd at competitions like American Go Association (AGA) YoungLions and US Go Congress in 2019-20. I also led a cult on Scratch as @ac91305 that I barely remember.
            </p>
            <p>
              I'm currently fascinated with <strong>diffusion, reinforcement learning</strong>, and the intersection of <strong>AI and robotics</strong>.
              Right now, I'm researching mobile manipulation using <strong>vision language agents (VLA)</strong> and post-training methods like GRPO and PPO.
            </p>
            <p>
              On campus, I'm apart of the Learning Agents Research Group (LARG), Robot Learning Reading Group, Reinforcement Learning Reading Group (RLRG), and Texas Venture Group (TVG).
            </p>
            <p>
              In the Summer of 2026, I'll be interning at ARM as an AI/ML intern in collaboration with OpenAI.
              In my first semester, I sacrificed my GPA to do a startup with my friends, where I got top 10% @ a16z speedrun, finalist @ ZFellows, and a YC interview / deferral from
              YCombinator (super grateful for Jared Friedman's advice on staying in school and his offer of future mentorship / office hours + a YC fastrack...).
            </p>
            <p>
              In my free time, I play intramural basketball, lift weights, and run up Go games on KGS. I'm also learning fencing from my goated TA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-16 px-4 md:px-8 bg-background-dark/20 border-t border-gray-dark/20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-heading font-semibold text-text-dark mb-2 tracking-tight"
          >
            Publications
          </motion.h2>
          <p className="text-sm text-text-dark/70 font-sans mb-10">
            <a
              href="https://scholar.google.com/citations?user=az-anuwAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-green hover:underline"
            >
              Google Scholar
            </a>
            {' — 19 total citations'}
          </p>
          <div className="space-y-6">
            {researchPublications.map((pub, index) => (
              <motion.article
                key={pub.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex gap-5 items-start group"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-dark/60 border border-gray-dark/50 flex flex-col">
                  <div className="h-6 w-full bg-primary-blue/80 flex items-center justify-center">
                    <span className="text-[10px] font-sans font-semibold text-white tracking-wide">{pub.badge}</span>
                  </div>
                  <div className="flex-1 min-h-0 flex items-center justify-center text-text-dark/40 text-xs font-sans">
                    {pub.year}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-text-dark leading-snug mb-1 group-hover:text-accent-green transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-text-dark/80 font-sans mb-1">{pub.authors}</p>
                  <p className="text-xs text-text-dark/60 font-sans mb-3">{pub.venue}</p>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans border border-accent-green/60 text-accent-green rounded hover:bg-accent-green/10 transition-colors"
                  >
                    PDF
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* News — unchanged */}
      <section className="py-16 px-4 md:px-8 border-t border-gray-dark/20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-heading font-semibold text-text-dark mb-10 tracking-tight"
          >
            News
          </motion.h2>
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.url + index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
              >
                <span className="flex-shrink-0 w-28 text-sm text-text-dark/70 font-sans">{item.date}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-text-dark hover:text-accent-green font-sans text-sm transition-colors"
                >
                  {item.title}
                  <svg className="w-3.5 h-3.5 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal copyright footer */}
      <footer className="py-4 px-4 text-center border-t border-gray-dark/20">
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
  );
};

export default Home;
