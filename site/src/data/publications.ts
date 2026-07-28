export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  year: number;
  summary: string;
  figure?: string;
  figureAlt?: string;
  figureCaption?: string;
  /** Background of the figure plate (paper figures are usually white; use dark for dark figures). */
  figureBg?: string;
  /** Optional looping demo clip; takes precedence over figure/sequence. */
  video?: string;
  /** Optional image sequence that crossfades like an animated figure. */
  sequence?: { src: string; label: string }[];
  links: { label: string; url: string }[];
  tags: string[];
  selected?: boolean;
  note?: string;
}

export const ME = 'Alan Chen';

export const publications: Publication[] = [
  {
    id: 'physics-aware-asp',
    title: 'Physics-Aware Combinatorial Assembly Sequence Planning using Data-free Action Masking',
    authors: ['Ruixuan Liu', 'Alan Chen', 'Weiye Zhao', 'Changliu Liu'],
    venue: 'IEEE Robotics and Automation Letters, 10(5) · presented at IEEE IROS 2025',
    venueShort: 'RA-L · IROS 2025',
    year: 2025,
    summary:
      'In what order should a robot place Lego-like primitives so the build never collapses halfway? We train a deep-RL construction policy guided by an online, data-free action mask that filters physically invalid moves before they happen. The planner sequences 250+ 3D structures with a 100% success rate; the best comparable baseline fails on more than 40 of them.',
    figure: '/research/pa-fig1.png',
    figureAlt:
      'Illustration of physics-aware combinatorial assembly: a valid brick placement vs. placements that collapse or exhaust inventory',
    figureCaption: 'Valid vs. physically invalid placements under inventory constraints (Fig. 1 of the paper)',
    links: [
      { label: 'arXiv', url: 'https://arxiv.org/abs/2408.10162' },
      { label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/10938966' },
      { label: 'code', url: 'https://github.com/intelligent-control-lab/PhysicsAwareCombinatorialASP' },
    ],
    tags: ['deep RL', 'action masking', 'assembly planning'],
    selected: true,
    note: 'Work done at the CMU Intelligent Control Lab, while I was in high school.',
  },
  {
    id: 'assemblycomplete',
    title: 'AssemblyComplete: 3D Combinatorial Construction with Deep Reinforcement Learning',
    authors: ['Alan Chen', 'Changliu Liu'],
    venue: 'Modeling, Estimation and Control Conference (MECC 2025) · IFAC-PapersOnLine 59(30)',
    venueShort: 'MECC 2025',
    year: 2025,
    summary:
      'Hand a robot a half-built chair, and it should figure out what you meant to build, then finish it. AssemblyComplete matches the incomplete structure to an object library with point-cloud registration (RANSAC + ICP), then a PPO agent with an action-validity mask completes the assembly under stability, connectivity, and inventory constraints.',
    figure: '/research/ac-pipeline.png',
    figureAlt:
      'AssemblyComplete pipeline: incomplete voxel structure, object library matching, and PPO agent that completes the build',
    figureCaption: 'The completion pipeline: library matching → scaled registration → constrained PPO construction',
    sequence: [
      { src: '/research/ac-chair-1.png', label: 'incomplete' },
      { src: '/research/ac-chair-2.png', label: 'inferred target' },
      { src: '/research/ac-chair-3.jpg', label: 'completed by the agent' },
    ],
    links: [
      { label: 'arXiv', url: 'https://arxiv.org/abs/2410.15469' },
      { label: 'DOI', url: 'https://doi.org/10.1016/j.ifacol.2025.12.346' },
      { label: 'code', url: 'https://github.com/Jiaqi07/AssemblyCompletion' },
    ],
    tags: ['deep RL', 'point clouds', 'assembly completion'],
    selected: true,
    note: 'First-authored in high school; funded in part by an IFAC student grant.',
  },
  {
    id: 'eco-driving',
    title: 'Developing an Eco-Driving Strategy in a Hybrid Traffic Network Using Reinforcement Learning',
    authors: [
      'Umar Jamil',
      'Mohammadreza Malmir',
      'Alan Chen',
      'Monika Filipovska',
      'Mimi Xie',
      'Caiwen Ding',
      'Yu-Fang Jin',
    ],
    venue: 'Science Progress, 107(3)',
    venueShort: 'Science Progress 2024',
    year: 2024,
    summary:
      'Can a handful of learning-controlled autonomous vehicles calm an entire city grid? We model a Manhattan-style network in SUMO + FLOW and train RLlib agents whose eco-driving policies smooth traffic flow and cut fuel consumption in mixed human/autonomous traffic.',
    figure: '/research/eco-framework.jpg',
    figureAlt: 'System architecture connecting SUMO simulation, FLOW, and RLlib policy training',
    figureCaption: 'The SUMO ↔ FLOW ↔ RLlib training loop behind the eco-driving policies',
    links: [{ label: 'DOI (open access)', url: 'https://doi.org/10.1177/00368504241263406' }],
    tags: ['autonomous vehicles', 'eco-driving', 'traffic networks'],
  },
  {
    id: 'lego-lfd',
    title: 'Simulation-Aided Learning from Demonstration for Robotic LEGO Construction',
    authors: ['Ruixuan Liu', 'Alan Chen', 'Xusheng Luo', 'Changliu Liu'],
    venue: 'arXiv preprint',
    venueShort: 'arXiv 2023',
    year: 2023,
    summary:
      'A human demonstrates a LEGO build; the robot learns the manipulation policy safely in simulation, then reproduces the build in the real world. I worked on the simulation-aided learning-from-demonstration pipeline and its Sim2Real deployment on a FANUC LR Mate arm.',
    figure: '/research/lego-x1.png',
    figureBg: '#050607',
    video: '/research/lego-lfd-demo.mp4',
    figureAlt:
      'Pipeline from human demonstration through simulation-aided robot learning to real-world robotic construction on a FANUC arm',
    figureCaption: 'The learned policy assembling a structure on the real FANUC arm (8x)',
    links: [{ label: 'arXiv', url: 'https://arxiv.org/abs/2309.11010' }],
    tags: ['learning from demonstration', 'sim2real', 'digital twin'],
    selected: true,
  },
  {
    id: 'carla-opencda',
    title: 'Interactive Data Collection Using CARLA and OpenCDA for Reinforcement Learning',
    authors: ['Alan Chen', 'Joseph Clemmons', 'Umar Jamil', 'Ashley Land', 'Sara Ahmed', 'Yu-Fang Jin'],
    venue: 'International Conference on Intelligent Biology and Medicine (ICIBM 2022) · also presented at Tran-SET 2022',
    venueShort: 'ICIBM 2022 & Tran-SET 2022',
    year: 2022,
    summary:
      'My first research project, the summer after freshman year of high school: interactive data-collection tooling on CARLA + OpenCDA co-simulation, so RL agents for connected autonomous vehicles could train on realistic interaction data.',
    links: [{ label: 'program', url: 'https://icibm2022.iaibm.org/Schedule_files/ICIBM2022_Program.pdf' }],
    tags: ['CARLA', 'data collection', 'connected AVs'],
  },
];

export const scholarUrl = 'https://scholar.google.com/citations?user=az-anuwAAAAJ&hl=en';
