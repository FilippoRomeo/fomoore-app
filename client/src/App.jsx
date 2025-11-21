import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Cpu,
  Layers,
  ExternalLink,
  Terminal,
  Brain,
  Palette,
  ChevronDown,
  Menu,
  X,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Radio,
  Wifi,
  Disc
} from 'lucide-react';
import Brand3D from './components/Brand3D';
import ThermalModel from './components/ThermalModel';
import TechBackground from './components/TechBackground';
import GlitchSeparator from './components/GlitchSeparator';
import ScrollProgress from './components/ScrollProgress';
import MNISTCanvas from './components/MNISTCanvas';
import MNISTVisual from './components/MNISTVisual';
import MNISTThermal from './components/MNISTThermal';

// --- Utility Components ---

const RedactedText = ({ children, delay = 0 }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      className="relative inline-block cursor-crosshair group"
    >
      <span className={`transition-all duration-500 ${isRevealed ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}>
        {children}
      </span>
      <span
        className={`absolute inset-0 bg-white text-black font-mono text-xs flex items-center justify-center transition-all duration-300 overflow-hidden ${isRevealed ? 'w-0 opacity-0' : 'w-full opacity-100'}`}
      >
        <span className="whitespace-nowrap">CLASSIFIED</span>
      </span>
    </span>
  );
};

const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
  >
    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-green-500 transition-colors"></span>
    {children}
  </a>
);

const SectionTitle = ({ children, id }) => (
  <div className="flex items-end gap-4 mb-16 border-b border-white/10 pb-4">
    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{children}</h2>
    <span className="font-mono text-xs text-gray-500 mb-1.5">ID: {id || Math.floor(Math.random() * 9000) + 1000}</span>
  </div>
);

// "Apple-style" frosted glass card with "CCTV" details
const Card = ({ children, className = "", title, meta }) => (
  <div className={`relative backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] group ${className}`}>
    {/* Corner markings for CCTV vibe */}
    <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-white/20 rounded-tl-lg"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-white/20 rounded-tr-lg"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-white/20 rounded-bl-lg"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-white/20 rounded-br-lg"></div>

    {(title || meta) && (
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
        {title && <h3 className="text-sm font-mono text-gray-300 uppercase tracking-wider">{title}</h3>}
        {meta && <span className="text-xs font-mono text-gray-600">{meta}</span>}
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

const SkillBadge = ({ children }) => (
  <span className="px-2 py-1 text-[10px] font-mono font-medium text-gray-300 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:border-white/30 transition-all cursor-default">
    {children}
  </span>
);

// --- Brand Animation Component (New) ---



// --- CRT Overlay ---
const CRTOverlay = () => (
  <div className="">
    {/* Scanlines */}
    <div className="absolute inset-0 scanline-overlay opacity-20 animate-scanline"></div>

    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(247, 247, 247, 1)_100%)]"></div>

    {/* Grain (simulated) */}
    <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBfiWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]"></div>

    {/* REC Indicator */}


    {/* Timestamp */}
    <div className="absolute bottom-8 right-8 font-mono text-xs text-gray-500/50 tracking-widest tabular-nums">
      <LiveClock />
    </div>
  </div>
);

const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      {time.toISOString().split('T')[0]} <span className="mx-2">|</span> {time.toLocaleTimeString('en-GB')}
    </>
  );
};

// --- Background Effect (Abstract Grid) ---


// --- Main Component ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [showMNIST, setShowMNIST] = useState(false);
  const [mnistTrainingCount, setMnistTrainingCount] = useState(0);
  const [mnistIsTraining, setMnistIsTraining] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Fake boot sequence
    setTimeout(() => setBootSequence(false), 2000);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (bootSequence) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-green-500 font-mono text-sm p-8">
        <div className="max-w-md w-full space-y-2">
          <div className="flex justify-between"><span>INIT_KERNEL...</span><span>[ OK ]</span></div>
          <div className="flex justify-between delay-75"><span>LOADING_ASSETS...</span><span>[ OK ]</span></div>
          <div className="flex justify-between delay-150"><span>ESTABLISHING_SECURE_CONNECTION...</span><span>[ OK ]</span></div>
          <div className="flex justify-between delay-300"><span>DECRYPTING_PROFILE...</span><span className="animate-pulse">_</span></div>
          <div className="w-full bg-gray-900 h-1 mt-4 overflow-hidden">
            <div className="h-full bg-green-500 animate-[width_2s_ease-out_forwards]" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-white/20 selection:text-white relative overflow-x-hidden animate-flicker">
      <TechBackground />
      <ScrollProgress />
      <CRTOverlay />

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="font-mono font-bold text-white flex items-center gap-2 tracking-tighter group cursor-pointer">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            FR_SYS<span className="text-gray-600 group-hover:text-white transition-colors">.v2.5</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {['Log', 'Modules', 'Archive', 'Data', 'Signal'].map((item, i) => {
              const targets = ['about', 'experience', 'projects', 'skills', 'contact'];
              return (
                <NavLink key={item} href={`#${targets[i]}`} onClick={(e) => { e.preventDefault(); scrollToSection(targets[i]); }}>
                  {item}
                </NavLink>
              )
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-30 flex items-center justify-center md:hidden backdrop-blur-xl">
          <div className="flex flex-col items-center gap-8 font-mono">
            {['Log', 'Modules', 'Archive', 'Data', 'Signal'].map((item, i) => {
              const targets = ['about', 'experience', 'projects', 'skills', 'contact'];
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(targets[i])}
                  className="text-xl text-gray-400 hover:text-white uppercase tracking-widest flex items-center gap-3"
                >
                  <span className="text-green-500 text-xs">0{i + 1}</span> {item}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center px-6 pt-20 z-10">
        <div className="max-w-5xl w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-green-400 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              RESIDENCY_ACTIVE
            </div>
            <div className="h-px w-20 bg-gray-800"></div>
            <span className="font-mono text-[10px] text-gray-600">AUTHORIZATION: ALPHA</span>
          </div>

          {/* Replaced Static H1 with Brand Animation */}
          <div className="mb-8 min-h-[200px] flex flex-col justify-center">
            <Brand3D />
          </div>

          <div className="grid md:grid-cols-[1fr_200px] gap-12 items-end">
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Operating at the intersection of <RedactedText>Creative Tech</RedactedText> and <RedactedText>Deep Learning</RedactedText>.
              Prototyping human-centred AI interfaces and engineering immersive digital systems.
            </p>

            <div className="font-mono text-xs space-y-2 text-gray-500 border-l border-gray-800 pl-4">
              <div className="flex justify-between">
                <span>LOC</span>
                <span className="text-gray-300">LDN, UK</span>
              </div>
              <div className="flex justify-between">
                <span>ROLE</span>
                <span className="text-gray-300">DL RESIDENT</span>
              </div>
              <div className="flex justify-between">
                <span>SYS</span>
                <span className="text-gray-300">ONLINE</span>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('projects')} className="px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all flex items-center gap-2 text-sm tracking-widest uppercase">
              Access Archives
              <ChevronDown className="w-4 h-4" />
            </button>
            <a href="mailto:romeofilippo95@gmail.com" className="px-8 py-4 border border-white/20 text-white hover:bg-white/5 rounded transition-all flex items-center gap-2 text-sm tracking-widest uppercase font-mono">
              Initialise Comms
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle id="001">System Log</SectionTitle>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 text-lg text-gray-400 font-light leading-relaxed">
              <p>
                <span className="text-white font-mono text-sm block mb-2 text-green-500">// PROFILE_SUMMARY</span>
                I am a Creative Technologist and Frontend Engineer based in London. My architecture fuses art-direction flair with production-grade engineering.
              </p>
              <p>
                Currently engaged as a <span className="text-white border-b border-green-500/30">Deep Learning Resident</span>, prototyping human-centred AI interfaces and fine-tuning Large Language Models (LLMs).
              </p>
              <p>
                Previously founder of <span className="text-white">CEN SPACE</span>. I architect and ship end-to-end digital products, from bare-metal Linux servers to WebGL frontends.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="hover:border-green-500/30" title="Core Functions">
                <div className="space-y-4">
                  {[
                    { label: 'Engineering', val: 'React, TypeScript, Node.js, Docker, Python' },
                    { label: 'Creative', val: 'Three.js, WebGL, Blender, UI/UX' },
                    { label: 'Intelligence', val: 'PyTorch, NLP, RAG, LLMs' },
                    { label: 'Hardware', val: 'Arduino, Robotics, Sensors' }
                  ].map((item, idx) => (
                    <div key={idx} className="group/item">
                      <div className="flex justify-between text-sm font-mono text-gray-500 mb-1 group-hover/item:text-green-400 transition-colors">
                        <span>{item.label}</span>
                        <span>[ACTIVE]</span>
                      </div>
                      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-500 w-[85%] group-hover/item:bg-green-500 transition-all duration-500"></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{item.val}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <GlitchSeparator />

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 relative z-10 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle id="002">Execution Modules</SectionTitle>

          <div className="space-y-6">

            {/* Job 1 */}
            <Card className="group" meta="2025 — PRESENT">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">Deep Learning Resident</h3>
                  <div className="text-sm font-mono text-gray-500 mt-1">MACHINE LEARNING INSTITUTE</div>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <SkillBadge>Python</SkillBadge>
                  <SkillBadge>PyTorch</SkillBadge>
                  <SkillBadge>LLMs</SkillBadge>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                Conducting applied AI research. Building RAG pipelines, fine-tuning transformer models, and automating model evaluation workflows. Exploring intersections of ML and HCI.
              </p>
            </Card>

            {/* Job 2 */}
            <Card className="group" meta="2020 — PRESENT">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Creative Director & Dev</h3>
                  <div className="text-sm font-mono text-gray-500 mt-1">CEN SPACE LTD</div>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <SkillBadge>MERN Stack</SkillBadge>
                  <SkillBadge>Three.js</SkillBadge>
                  <SkillBadge>Linux</SkillBadge>
                  <SkillBadge>Full Stack</SkillBadge>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                End-to-end product creation. Self-hosting Linux servers for custom deployments. Engineered performant MERN stack architectures and interactive 3D installations.
              </p>
            </Card>

            {/* Job 3 */}
            <Card className="group" meta="2021 — 2022">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Associate Lecturer</h3>
                  <div className="text-sm font-mono text-gray-500 mt-1">UAL — CREATIVE COMPUTING INSTITUTE</div>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <SkillBadge>Algorithms</SkillBadge>
                  <SkillBadge>Game Design</SkillBadge>
                  <SkillBadge>P5.JS</SkillBadge>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                Mentored students in algorithm implementation and experience design. Supported academic projects focused on creative computing.
              </p>
            </Card>

          </div>
        </div>
      </section>

      <GlitchSeparator />

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle id="003">Classified Archives</SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Project 1 */}
            <Card className="h-full flex flex-col p-0 overflow-hidden" title="FILE_01: SKINSUIT">
              <div className="h-48 bg-black relative overflow-hidden group cursor-crosshair border-b border-white/10">
                <ThermalModel shape="knot" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-white mb-3">E-Commerce Architecture</h4>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  Scalable MERN stack app with REST APIs and Shopify integration. Immersive 3D interface tailored for web using Blender assets.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                  <SkillBadge>Three.js</SkillBadge>
                  <SkillBadge>MERN</SkillBadge>
                </div>
                <div className="mt-auto">
                  <a
                    href="https://skinsuit.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition-colors w-full"
                  >
                    View Demo
                  </a>
                </div>
              </div>
            </Card>

            {/* Project 2 */}
            <Card className="h-full flex flex-col p-0 overflow-hidden" title="FILE_02: GLITCH_BOT">
              <div className="h-48 bg-black relative overflow-hidden group cursor-crosshair border-b border-white/10">
                <ThermalModel shape="box" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-white mb-3">Video Sampling Experiment</h4>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  Experimental video art exploring "glitched misbeliefs" - reinterpreting personal recordings and movie scenes to examine delusion and change through video sampling.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                  <SkillBadge>Video Art</SkillBadge>
                  <SkillBadge>Sampling</SkillBadge>
                </div>
                <div className="mt-auto">
                  <a
                    href="https://www.youtube.com/watch?v=f-IxzqylGVI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition-colors w-full"
                  >
                    Watch Video
                  </a>
                </div>
              </div>
            </Card>

            {/* Project 3 */}
            <Card className="h-full flex flex-col p-0 overflow-hidden" title="FILE_03: SPRAY_BOT">
              <div className="h-48 bg-black relative overflow-hidden group cursor-crosshair border-b border-white/10">
                <ThermalModel shape="sphere" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-white mb-3">Robotic Spray Paint Machine</h4>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  Remote-controlled spray paint machine with pan-tilt mechanism, solenoid valve, and laser aiming. Powered by Arduino and controlled via joystick.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                  <SkillBadge>Arduino</SkillBadge>
                  <SkillBadge>Robotics</SkillBadge>
                </div>
                <div className="mt-auto">
                  <a
                    href="https://www.youtube.com/watch?v=zP4An39l2bM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition-colors w-full"
                  >
                    Watch Video
                  </a>
                </div>
              </div>
            </Card>

            {/* Project 4 - MNIST Classifier */}
            <Card
              className="h-full flex flex-col p-0 overflow-hidden"
              title={
                <div className="flex items-center justify-between w-full">
                  <span>FILE_04: MNIST_CLASSIFIER</span>
                  <div className="flex items-center gap-3">
                    {mnistIsTraining && (
                      <span className="text-yellow-500 text-xs animate-pulse">⚡ TRAINING</span>
                    )}
                    <div className="text-right">
                      <div className="text-[8px] text-gray-600">ITERATIONS</div>
                      <div className="text-sm font-bold text-green-500">{mnistTrainingCount}</div>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="h-48 bg-black relative overflow-hidden group cursor-crosshair border-b border-white/10">
                <MNISTThermal />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-white mb-3">MNIST Digit Classifier</h4>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  Deep learning model for handwritten digit recognition with interactive drawing canvas, real-time predictions, and incremental retraining based on user feedback.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <SkillBadge>PyTorch</SkillBadge>
                  <SkillBadge>Streamlit</SkillBadge>
                  <SkillBadge>PostgreSQL</SkillBadge>
                  <SkillBadge>Docker</SkillBadge>
                </div>
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => setShowMNIST(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition-colors"
                  >
                    Try It
                  </button>
                  <a
                    href="https://github.com/FilippoRomeo/mnist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm text-white transition-colors"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </section>

      <GlitchSeparator />

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle id="004">System Capabilities</SectionTitle>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                cat: 'LANGUAGES',
                items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'C++', 'Go', 'Bash']
              },
              {
                cat: 'FRAMEWORKS',
                items: ['React', 'Node.js', 'Three.js', 'Tailwind', 'PyTorch', 'TensorFlow']
              },
              {
                cat: 'INFRASTRUCTURE',
                items: ['Docker', 'Linux (Ubuntu)', 'NGINX', 'AWS', 'Git', 'PostgreSQL']
              },
              {
                cat: 'CREATIVE SUITE',
                items: ['Figma', 'Blender', 'Adobe CC', 'Ableton Live']
              }
            ].map((skillGroup) => (
              <Card key={skillGroup.cat} className="p-6">
                <h3 className="font-mono text-sm text-gray-500 mb-4 border-b border-white/10 pb-2 flex justify-between">
                  {skillGroup.cat}
                  <span className="text-green-500 text-xs">READY</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map(item => (
                    <span key={item} className="text-white text-sm font-light hover:text-green-400 transition-colors cursor-default">
                      {item} <span className="text-gray-700 mx-1">/</span>
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-20 px-6 border-t border-white/10 bg-black relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 animate-pulse">
            <Radio className="w-6 h-6 text-green-500" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Transmission Open</h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            Always scanning for opportunities in collaborative, design-driven teams.
          </p>

          <div className="flex justify-center gap-12 mb-16">
            <a href="mailto:romeofilippo95@gmail.com" className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-2 group">
              <Mail className="w-6 h-6 group-hover:text-green-500 transition-colors" />
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
            </a>

            <a href="https://github.com/FilippoRomeo" className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-2 group">
              <Github className="w-6 h-6 group-hover:text-green-500 transition-colors" />
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
            </a>
            <a href="https://uk.linkedin.com/in/filippo-romeo" className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-2 group">
              <Linkedin className="w-6 h-6 group-hover:text-green-500 transition-colors" />
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
            </a>
          </div>

          <div className="flex justify-between items-end border-t border-white/10 pt-8">
            <div className="text-left">
              <p className="text-[10px] text-gray-600 font-mono">
                SYS.VER.2.5<br />
                ALL RIGHTS RESERVED
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-600 font-mono">
                &copy; {new Date().getFullYear()} FILIPPO ROMEO<br />
                DESIGN: CLASSIFIED
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* MNIST Modal */}
      {showMNIST && (
        <MNISTCanvas
          onClose={() => setShowMNIST(false)}
          onTrainingCountChange={setMnistTrainingCount}
          onTrainingStatusChange={setMnistIsTraining}
        />
      )}
    </div>
  );
}
