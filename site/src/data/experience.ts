export interface Experience {
  org: string;
  role: string;
  period: string;
  detail?: string;
  /** Rendered as HTML when present (for inline links); keep it hand-written and trusted. */
  detailHtml?: string;
  status?: 'now' | 'upcoming';
  logo?: string;
  link?: string;
}

export const experience: Experience[] = [
  {
    org: 'Arm',
    role: 'LLM Research Engineering Intern, Central Engineering AI',
    period: 'Summer 2026',
    detailHtml:
      'Independently developed a <a class="squiggle" href="https://arxiv.org/abs/2512.24601" target="_blank" rel="noopener">recursive language model</a> approach and analyzed complex workloads to optimize uArch. Nominated by management to write an engineering blog post, coming soon.',
    logo: '/images/logos/arm.svg',
    link: 'https://www.arm.com',
  },
  {
    org: 'Learning Agents Research Group, UT Austin',
    role: 'Undergraduate Researcher',
    period: 'Sep 2025 – present',
    detail:
      'Reinforcement learning for vision-language-action models on mobile robot manipulation tasks. Finetuning robot foundation models (Octo, OpenVLA) using PPO/GRPOPPO in Maniskill. Also working with some peers to research on further applications of recursive language models.',
    status: 'now',
    logo: '/images/logos/larg.svg',
    link: 'https://larg.cs.utexas.edu/',
  },
  {
    org: 'Intelligent Control Lab, CMU Robotics Institute',
    role: 'Student Researcher',
    period: 'Oct 2022 – Oct 2024',
    detail:
      'Three papers on robotic assembly (RA-L/IROS, MECC, arXiv) while in high school. Built Sim2Real digital-twin pipelines deployed on a FANUC arm; the lab’s manufacturing work was recognized by former First Lady Jill Biden alongside the ARM Institute.',
    logo: '/images/logos/icl.png',
    link: 'http://icontrol.ri.cmu.edu/',
  },
  {
    org: 'University of Texas at San Antonio',
    role: 'Summer REU Researcher',
    period: 'May – Aug 2022',
    detail:
      'Autonomous-vehicle research the summer after my freshman year of high school: CARLA/SUMO simulation, sensor fusion, and trajectory planning.',
  },
];

export const honorSpotlight = [
  { title: 'Regeneron STS Scholar', detail: 'Top 300, Society for Science', year: '2025' },
  { title: 'ISEF Grand Award', detail: '4th place, Systems Software', year: '2025' },
  { title: 'USACO Platinum', detail: 'USA Computing Olympiad', year: '2024' },
  { title: 'Best of State, TXSEF', detail: 'Physical Sciences', year: '2025' },
];

export const honorList = [
  { title: 'Emergent Ventures Fellow', meta: 'Mercatus Center · 2024' },
  { title: 'Turing Endowed Scholarship', meta: 'UT Austin · 2025' },
  { title: 'DCU for Kids Scholarship', meta: '$2,500 · 2025' },
  { title: 'NSF Travel Grant', meta: 'National Science Foundation · 2022' },
  { title: 'Brawl Stars Masters Rank', meta: 'top 200 US · 2022' },
  { title: '1517 Medici Project Fellow', meta: '1517 Fund · 2024' },
  { title: 'IFAC Student Grant', meta: 'International Federation of Automatic Control · 2025' },
  { title: 'FIRST Robotics Worlds Finalist', meta: 'FRC World Championship · 2023' },
];
