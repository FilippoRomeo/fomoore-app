export const projects = [
  {
    id: 'skinsuit',
    fileCode: 'FILE_01',
    title: '3D Web E-Commerce Experience',
    subtitle: 'SKINSUIT',
    type: '3D Web Experience',
    category: 'WebGL',
    status: 'Archived',
    year: 2024,
    cover: '/skinsuit-screenshot.jpg',
    visual: { variant: 'skinsuit' },
    live: {
      mode: 'archived',
      label: 'Archived client project',
      note: 'The original client site is no longer live. A frontend demo may be rehosted here later.'
    },
    summary:
      'SKINSUIT was a custom e-commerce project combining immersive 3D interaction, MERN stack architecture, Shopify integration, and web-optimised Blender assets.',
    longDescription:
      'SKINSUIT was a custom e-commerce project combining immersive 3D interaction, full-stack web development, and Shopify integration. The live site is no longer online, but this archive preserves the interface and design direction.\n\nThe case study pulls together product visuals, interaction notes, backend architecture decisions, and deployment context for future reference. This entry is designed to scale with additional archive assets such as screenshots, design files, and production notes.',
    tags: ['React', 'Three.js', 'MERN', 'Shopify', 'Blender', 'REST API'],
    role:
      'Creative direction, frontend development, backend architecture, 3D web integration, deployment',
    stack: ['React', 'Three.js', 'MERN', 'Shopify', 'Blender', 'REST API'],
    links: [
      {
        label: 'View Archive Screenshot',
        href: '/skinsuit-screenshot.jpg',
        type: 'archive'
      }
    ],
    evidence: ['archive', 'asset-pipeline'],
    ctaLabel: 'Open Archive'
  },
  {
    id: 'glitch-bot',
    fileCode: 'FILE_02',
    title: 'Video Sampling',
    subtitle: 'GLITCH_BOT',
    type: 'Video Art',
    category: 'Archive',
    status: 'Completed',
    year: 2025,
    cover: null,
    visual: { variant: 'glitch-box' },
    live: {
      mode: 'video',
      label: 'Watch video sampling',
      href: 'https://www.youtube.com/watch?v=f-IxzqylGVI',
      embedSrc: 'https://www.youtube.com/embed/f-IxzqylGVI'
    },
    summary:
      'Experimental video art exploring glitched misbeliefs through personal recordings and movie scenes.',
    longDescription:
      'A story-driven video sampling experiment that reinterprets personal recordings and cinematic fragments to examine delusion, change, and visual memory. The piece uses editing, visual modulation, and narrative pacing as its primary interface.\n\nThe work exists as an experimental art direction project rather than a product release, making it a strong example of how media artifacts can be archived in the system.',
    tags: ['Video Art', 'Sampling', 'Experimental Media', 'Creative Direction'],
    role: 'Creative direction, video editing, experimental media design',
    stack: ['Video Editing', 'Creative Coding', 'Art Direction'],
    links: [
      {
        label: 'Watch Video',
        href: 'https://www.youtube.com/watch?v=f-IxzqylGVI',
        type: 'video'
      }
    ],
    evidence: ['video', 'moodboard'],
    ctaLabel: 'View Details'
  },
  {
    id: 'spray-bot',
    fileCode: 'FILE_03',
    title: 'Robotic Spray Paint Machine',
    subtitle: 'SPRAY_BOT',
    type: 'Robotics / Installation',
    category: 'Robotics',
    status: 'Prototype',
    year: 2024,
    cover: null,
    visual: { variant: 'spray-orb' },
    live: {
      mode: 'video',
      label: 'Watch robotics prototype',
      href: 'https://www.youtube.com/watch?v=zP4An39l2bM',
      embedSrc: 'https://www.youtube.com/embed/zP4An39l2bM'
    },
    summary:
      'Remote-controlled spray paint machine with pan-tilt mechanism, solenoid valve, and laser aiming.',
    longDescription:
      'A remote-controlled spray paint machine built with Arduino, pan-tilt mechanics, and a solenoid valve for precision paint release. The project blends physical control systems with a creative robotics workflow.\n\nThis archive entry is a snapshot of the machine and its experimental interface, meant to support later documentation for installation, hardware design, and control logic.',
    tags: ['Arduino', 'Robotics', 'Hardware', 'Interactive'],
    role: 'Hardware design, control system development, prototype delivery',
    stack: ['Arduino', 'Embedded Systems', 'Mechanical Design'],
    links: [
      {
        label: 'Watch Video',
        href: 'https://www.youtube.com/watch?v=zP4An39l2bM',
        type: 'video'
      }
    ],
    evidence: ['video', 'prototype'],
    ctaLabel: 'View Details'
  },
  {
    id: 'mnist-classifier',
    fileCode: 'FILE_04',
    title: 'MNIST Digit Classifier',
    subtitle: 'AI INTERFACE',
    type: 'Interactive Prototype',
    category: 'AI',
    status: 'Live Demo',
    year: 2025,
    cover: null,
    visual: { variant: 'mnist' },
    live: {
      mode: 'component',
      component: 'mnist',
      label: 'Interactive MNIST classifier'
    },
    summary:
      'Deep learning model for handwritten digit recognition with interactive drawing canvas, real-time predictions, and retraining.',
    longDescription:
      'A compact deep learning demo for handwritten digit recognition, built around a responsive drawing interface, model feedback loop, and experiment workflow. The entry is structured to support active testing and iterative training counters.\n\nThis project demonstrates the bridging of AI model behavior with a tangible user experience, and the archive system keeps the interface ready for future production case study updates.',
    tags: ['PyTorch', 'Streamlit', 'PostgreSQL', 'Docker', 'AI Interface'],
    role: 'Prototype design, model training flow, interface integration',
    stack: ['PyTorch', 'React', 'Docker', 'PostgreSQL'],
    links: [
      {
        label: 'Code on GitHub',
        href: 'https://github.com/FilippoRomeo/mnist',
        type: 'github'
      }
    ],
    evidence: ['prototype', 'demo', 'github'],
    ctaLabel: 'Try It'
  },
  {
    id: 'kid-apollo',
    fileCode: 'FILE_05',
    title: 'Kid Apollo Living Visual Direction Bible',
    subtitle: 'KID APOLLO',
    type: '3D Web Experience',
    category: 'WebGL',
    status: 'In development',
    year: 2025,
    cover: null,
    visual: { variant: 'apollo-rocket' },
    live: {
      mode: 'pending',
      label: 'Site in development',
      note: 'The Apollo live site will be linked here when published. Do not embed the visual direction bible inside the modal.'
    },
    summary:
      'Production-direction bible and interactive prototype for a music-world website built around a rocket, porthole transition, companion character, and room-object navigation.',
    longDescription:
      'Kid Apollo is a music-world web experience built around a cohesive visual language: a rocket as the primary navigation hub, porthole transitions between scenes, a companion character guide, and room-based object interactions.\n\nThe visual direction bible captures the aesthetic system, interaction patterns, motion language, and asset hierarchy. This case-study entry preserves the full development context, from concept exploration to prototype refinement, ready for future animation and asset pipeline integration.\n\nThe project demonstrates how to structure immersive web experiences through visual consistency, hierarchical interaction design, and character-driven navigation.',
    tags: ['React', 'Three.js', 'GSAP', 'Art Direction', 'Production Direction', 'WebGL'],
    role: 'Creative direction, visual system design, web prototype architecture, interaction design',
    stack: ['React', 'Three.js', 'GSAP', 'Figma', 'Blender', 'WebGL'],
    links: [
      {
        label: 'Open Visual Direction Bible',
        href: '/projects/kid-apollo/index.html',
        type: 'external',
        external: true,
        note: 'Visual direction reference - opens in a new tab'
      }
    ],
    demo: {
      type: 'iframe',
      label: 'Open Living Visual Direction Bible',
      src: '/projects/kid-apollo/index.html',
      height: 720
    },
    evidence: [
      'visual-direction-bible',
      'motion-prototype',
      'fallback-poster-mode',
      'look-dev-asset-pipeline',
      'pdf-bible'
    ],
    processNotes:
      'The visual direction bible serves as the single source of truth for the project. All interactions, transitions, and asset creation follow this documented system. The motion prototype demonstrates the porthole transition mechanic and character behavior loops.',
    showDemo: false,
    ctaLabel: 'View Case Study'
  }
];
