import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, Mail, Github, Linkedin, Calendar, MapPin, 
  Layers, Database, Code2, Sparkles, Send, CheckCircle2, 
  TrendingUp, Download, Eye, ExternalLink, Menu, X, Terminal,
  MessageSquareCode, Phone, Globe
} from 'lucide-react';
import InteractiveGrid from './components/InteractiveGrid';
import Preloader from './components/Preloader';
import ProjectCard from './components/ProjectCard';
import SkillsGrid from './components/SkillsGrid';
import Timeline from './components/Timeline';
import AboutIllustration from './components/AboutIllustration';
import AiChatbot from './components/AiChatbot';
import MouseTrail from './components/MouseTrail';
import ContactAiChatbot from './components/ContactAiChatbot';
import { Project } from './types';
import resumePdf from './assets/CBK resume  3.pdf';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [typedWord, setTypedWord] = useState('Scalable Platforms');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom contact form states
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [contactTab, setContactTab] = useState<'briefing' | 'ai'>('briefing');

  // Rotating words for typing animation
  const keywords = ['Scalable Platforms', 'Django Backend APIs', 'Responsive Client UIs', 'Real-Time Databases'];
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % keywords.length;
      setTypedWord(keywords[index]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Form submission handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setFormLoading(true);
    setFormError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server transmission failed');
      }

      setFormSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setFormError(err.message || 'A network error occurred. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const projects: Project[] = [
    {
      id: 'grievance-tracker',
      title: 'Smart Grievance & Issue Tracking Suite',
      subtitle: 'Premium Complaint Administration Workspace',
      description: 'A robust, role-based governance system facilitating instantaneous grievance logging. It has full support for administrative analytic tracking dashboards, administrative status review updates, visual file attachments, and Firestore synchronizations.',
      features: [
        'Secure multi-tier Auth workflows',
        'Real-time Firestore sync mechanisms',
        'Diagnostic analytics graphs',
        'Fluid image attachment loaders'
      ],
      tech: ['React.js', 'Firebase', 'Firestore DB', 'Tailwind CSS'],
      liveUrl: 'https://issue-resolve-hub.vercel.app/admin',
      githubUrl: 'https://github.com/AkashKhadanga/issue-resolve-hub',
      category: 'Full-Stack',
      metrics: [
        { label: 'Sync Latency', value: '<50ms' },
        { label: 'Role Types', value: 'User / Admin' }
      ]
    },
    {
      id: 'task-management',
      title: 'Student Task Management Suite',
      subtitle: 'Django Rest API Orchestrated Planner',
      description: 'An expansive task allocation application. Constructed behind clean Django REST model serializations, backed by structured SQLite index maps, and rendered on visual React client tables using Axios connection protocols.',
      features: [
        'REST CRUD model serializations',
        'Secure Axios transaction layers',
        'Fluid mobile workspace styling',
        'SQLite schema design constraints'
      ],
      tech: ['Python', 'Django REST', 'React.js', 'SQLite', 'Axios'],
      githubUrl: 'https://github.com/AkashKhadanga',
      category: 'Django/React',
      metrics: [
        { label: 'DB Indexing', value: 'High Efficiency' },
        { label: 'Client Connection', value: 'Stateless Token' }
      ]
    }
  ];

  // Auto scroll navigation helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="text-slate-200 bg-[#020617] min-h-screen relative font-sans antialiased overflow-x-hidden">
      
      {/* Glassy Noise Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay z-50 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />

      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Intro visual preloader block */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* Render once load finishes successfully */}
      <AnimatePresence>
        {loadingComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full relative min-h-screen"
          >
            {/* INJECT INTERACTIVE MATH GRID CANVAS */}
            <InteractiveGrid />

            {/* DYNAMIC GLOWING MOUSE TRAIL */}
            <MouseTrail />

            {/* HEADER DESIGN WITH LUXURY GLASS NAVIGATION */}
            <header className="fixed top-0 inset-x-0 z-50 p-4 md:p-6 select-none bg-gradient-to-b from-[#020617]/95 via-[#020617]/45 to-transparent backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/[0.03] border border-white/10 backdrop-blur-md px-5 py-3 rounded-full relative">
                {/* Logo */}
                <div 
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                    <span className="text-sm font-semibold tracking-widest uppercase text-white">AK</span>
                  </div>
                  <div className="leading-none select-none ml-1">
                    <span className="text-sm font-sans font-bold text-white tracking-tight">Akash Khadanga</span>
                    <span className="text-[9px] font-mono text-blue-400 block tracking-widest mt-0.5">DEVELOPER_ECOSYSTEM</span>
                  </div>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium opacity-80 text-slate-300">
                  <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 cursor-pointer transition-colors">Ecosystem</button>
                  <button onClick={() => scrollToSection('skills')} className="hover:text-blue-400 cursor-pointer transition-colors">Skills</button>
                  <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 cursor-pointer transition-colors">Case Studies</button>
                  <button onClick={() => scrollToSection('awards')} className="hover:text-blue-400 cursor-pointer transition-colors">Awards</button>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 cursor-pointer transition-colors">Contact</button>
                </nav>

                {/* Desktop CTA actions */}
                <div className="hidden md:flex items-center gap-3">
                  <a 
                    href={resumePdf}
                    download="Akash_Khadanga_Resume.pdf"
                    className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Resume</span>
                    <Download className="w-3 h-3 text-blue-400" />
                  </a>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="px-5 py-2 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider rounded-full hover:bg-blue-400 hover:text-white transition-all cursor-pointer"
                  >
                    Contact
                  </button>
                </div>

                {/* Mobile Hamburger toggle */}
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>

              {/* Mobile Drawer Menu slide in */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-20 left-4 right-4 bg-[#020617]/95 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-5 md:hidden z-80 shadow-2xl shadow-black"
                  >
                    <nav className="flex flex-col gap-4 text-xs font-mono tracking-widest text-slate-300">
                      <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-blue-400 transition-colors">ABOUT</button>
                      <button onClick={() => scrollToSection('skills')} className="text-left py-2 hover:text-blue-400 transition-colors">SKILLS</button>
                      <button onClick={() => scrollToSection('projects')} className="text-left py-2 hover:text-blue-400 transition-colors">PROJECTS</button>
                      <button onClick={() => scrollToSection('awards')} className="text-left py-2 hover:text-blue-400 transition-colors">TIMELINE</button>
                      <button onClick={() => scrollToSection('contact')} className="text-left py-2 hover:text-blue-400 transition-colors">CONTACT</button>
                      <a 
                        href={resumePdf}
                        download="Akash_Khadanga_Resume.pdf"
                        className="text-left py-2 hover:text-blue-400 transition-colors flex items-center gap-2"
                      >
                        <span>DOWNLOAD RESUME</span>
                        <Download className="w-3.5 h-3.5 text-blue-400" />
                      </a>
                    </nav>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <a href="mailto:akashkhadaanga123@gmail.com" className="text-xs font-mono text-blue-400 underline hover:text-purple-400 transition-colors">akashkhadaanga123@gmail.com</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* ===================================
                 HERO SECTION
               =================================== */}
            <section id="hero" className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto relative select-none z-10">
              
              {/* Massive background ambient visual element overlay */}
              <div className="absolute top-[20%] left-[-10%] w-[50%] h-[35%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

              {/* Asymmetric layout grid for hero details & futuristic status panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative">
                
                {/* Left Side: Dynamic Copy and CTAs */}
                <div className="lg:col-span-7 space-y-8 text-left">
                  
                  {/* Visual tech indicator badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)] relative"
                  >
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">Available for collaboration & Placement</span>
                  </motion.div>

                  {/* Big Display Headings */}
                  <div className="space-y-4">
                    <motion.h1 
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white leading-[1.1]"
                    >
                      Crafting High-Performance <br className="hidden sm:inline" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                        Full-Stack Systems
                      </span>
                    </motion.h1>

                    {/* Interactive Ticker styled as terminal line */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="flex flex-wrap items-center gap-2 pt-2 text-xs md:text-sm font-mono text-slate-400"
                    >
                      <div className="flex items-center gap-2.5 bg-slate-900/60 border border-white/5 rounded-xl px-4 py-2.5 backdrop-blur-md">
                        <span className="text-blue-400 font-bold">$</span>
                        <span className="text-slate-300">npx akash --spec</span>
                        <span className="text-slate-600 font-bold">|</span>
                        <AnimatePresence mode="wait">
                          <motion.span 
                            key={typedWord}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="text-purple-400 font-bold"
                          >
                            {typedWord}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>

                  {/* Subheading detail summary */}
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-slate-400 font-sans text-sm md:text-base max-w-xl leading-relaxed font-medium"
                  >
                    I build premium web applications, linking Django REST API backends, real-time Firestore database architectures, and highly interactive React frontends into seamless digital experiences.
                  </motion.p>

                  {/* CTAs Buttons container */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-wrap gap-4 pt-4"
                  >
                    <button 
                      onClick={() => scrollToSection('projects')}
                      className="px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore Projects</span>
                      <Eye className="w-4 h-4" />
                    </button>

                    <a 
                      href={resumePdf}
                      download="Akash_Khadanga_Resume.pdf"
                      className="px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest backdrop-blur-xl hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Download Resume</span>
                      <Download className="w-4 h-4" />
                    </a>

                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="px-6 py-3.5 bg-transparent border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Contact Me</span>
                      <Mail className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>

                {/* Right Side: Futuristic Glass Developer Status Panel */}
                <div className="lg:col-span-5 hidden lg:block">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    {/* Glowing effect inside card */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none transition-transform group-hover:scale-110" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none transition-transform group-hover:scale-110" />

                    {/* Window Controls */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/60" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <span className="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">spec_console_v2.0.1</span>
                    </div>

                    {/* Terminal content */}
                    <div className="space-y-4 font-mono text-xs">
                      
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-500">// DEV CORE DETAILS</p>
                        <p className="text-slate-300">
                          <span className="text-blue-400">const</span> engineer = <span className="text-purple-400">"Akash Khadanga"</span>;
                        </p>
                        <p className="text-slate-300">
                          <span className="text-blue-400">const</span> location = <span className="text-purple-400">"Andhra Pradesh, India"</span>;
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-500">// STACK DIAGNOSTIC</p>
                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                          <div>
                            <span className="text-slate-500">API_LATENCY</span>
                            <span className="block text-emerald-400 font-bold">&lt;35ms (Stable)</span>
                          </div>
                          <div>
                            <span className="text-slate-500">DB_STATUS</span>
                            <span className="block text-blue-400 font-bold">Firestore / SQLite</span>
                          </div>
                          <div>
                            <span className="text-slate-500">FRONTEND</span>
                            <span className="block text-purple-400 font-bold">React.js + TS</span>
                          </div>
                          <div>
                            <span className="text-slate-500">BACKEND</span>
                            <span className="block text-orange-400 font-bold">Django REST API</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-500">// REAL-TIME TELEMETRY</p>
                        <div className="space-y-1.5 bg-slate-950/40 p-2.5 rounded-xl border border-white/5 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Problem Solving (DSA)</span>
                            <span className="text-white font-bold">800+ Solved</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '92%' }} />
                          </div>
                          <div className="flex justify-between pt-1.5">
                            <span className="text-slate-400">Real-Time Sync Systems</span>
                            <span className="text-white font-bold">98% Efficient</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '85%' }} />
                          </div>
                        </div>
                      </div>

                      {/* Compilation line animation simulated */}
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-2 border-t border-white/5">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                        <span>System status check complete.</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>

              {/* Animated grid counters box in footer of hero */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.9 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10"
              >
                {[
                  { value: '12+', label: 'PROJECTS BUILT', desc: 'Django and React platforms' },
                  { value: '16+ Stack', label: 'TECHNOLOGIES USED', desc: 'Frameworks, DBs, and tools' },
                  { value: '3 Run', label: 'HACKATHONS RUNS', desc: 'Collaborative sprint coding' },
                  { value: '800+ Solved', label: 'PROBLEM SOLVED', desc: 'Algorithmic DSA problems' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 backdrop-blur-xl p-5 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/[0.02] rounded-full blur-[20px] pointer-events-none" />
                    <p className="text-2xl sm:text-3xl font-sans font-black text-white group-hover:text-blue-400 transition-colors">{stat.value}</p>
                    <p className="text-[10px] font-mono tracking-wider text-slate-400 mt-1 uppercase">{stat.label}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{stat.desc}</p>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* ===================================
                 ABOUT SECTION
               =================================== */}
            <section id="about" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* LEFT COLUMN: ABOUT ILLUSTRATION */}
                <div className="lg:col-span-5">
                  <AboutIllustration />
                </div>

                {/* RIGHT COLUMN: DETAILED INTRODUCTION */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// ECOSYSTEM OVERVIEW</span>
                    <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                      About Akash Khadanga
                    </h2>
                  </div>

                  <div className="space-y-4 text-slate-300 font-sans font-medium text-base leading-relaxed">
                    <p>
                      I am an ambitious Full Stack Developer and React.js specialist with significant foundations in constructing Django API servers, SQLite schemas, and NoSQL Firestore databases.
                    </p>
                    <p>
                      Rather than settling for standard student projects, I treat every UI layout, component module, and backend routing pipeline as a premium SaaS application interface. My commitment to architectural quality enables me to build software platforms with extremely high-efficiency payload configurations.
                    </p>
                  </div>

                  {/* Highlights Grid bullet details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {[
                      { title: 'Full-Stack Execution', desc: 'Equally skilled across frontend React compositions and Django rest controller engines.' },
                      { title: 'Firestore Syncs', desc: 'Implementing low-latency real-time state nodes for reactive chat suites.' },
                      { title: 'Modern UI Quality', desc: 'Crafting lightweight visual micro-animations and eye-safe twilight glassmorphism.' },
                      { title: 'Problem Solvers', desc: 'Highly experienced modeling data structures to resolve algorithmic issues.' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 rounded-2xl hover:border-white/20 transition-all duration-300">
                        <span className="h-2 w-2 rounded-full bg-blue-400 shrink-0 mt-1.5 animate-pulse" />
                        <div>
                          <h4 className="text-xs font-mono text-slate-200 uppercase tracking-wider">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================
                 SKILLS SECTION
               =================================== */}
            <section id="skills" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10">
              <SkillsGrid />
            </section>

            {/* ===================================
                 PROJECTS SECTION (Apple Product reveal style)
               =================================== */}
            <section id="projects" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto space-y-4 mb-20 md:mb-24">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// CASE STUDIES</span>
                <h2 className="text-3xl sm:text-5xl font-sans font-black text-white tracking-tight">
                  Cinematic Case Studies
                </h2>
                <p className="text-sm text-slate-400 leading-normal">
                  Explore full stack codebases structured behind robust Django servers and highly polished, interactive React.js client wrappers.
                </p>
              </div>

              <div className="space-y-16">
                {projects.map((proj, idx) => (
                  <ProjectCard key={proj.id} project={proj} index={idx} />
                ))}
              </div>
            </section>

            {/* ===================================
                 TIMELINE (ACHIEVEMENTS / TIMELINE)
               =================================== */}
            <section id="awards" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10">
              <Timeline />
            </section>

            {/* ===================================
                 CONTACT SECTION
               =================================== */}
            <section id="contact" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
              
              <div className="absolute top-20 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                
                {/* LEFT BLOCK: INFO DETAIL CARDS */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// SECURE CONNECTION SETUP</span>
                    <h3 className="text-3xl font-sans font-bold text-white tracking-tight leading-tight">
                      Initiate Developer Briefing
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans font-medium">
                      Fill out downstream portal contact inputs or trigger immediate connection links to sync on hiring, contract briefings, or freelance schedules.
                    </p>
                  </div>

                  {/* Connect details glass chips */}
                  <div className="space-y-3 pt-6">
                    <a 
                      href="mailto:akashkhadaanga123@gmail.com"
                      className="flex items-center gap-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 rounded-2xl hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group"
                    >
                      <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-white/5 group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="text-left font-sans">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Direct Email Connection</span>
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">akashkhadaanga123@gmail.com</span>
                      </div>
                    </a>

                    <a 
                      href="tel:+917207174517"
                      className="flex items-center gap-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 rounded-2xl hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group"
                    >
                      <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-white/5 group-hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="text-left font-sans">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Direct Telephony Call</span>
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">+91-7207174517</span>
                      </div>
                    </a>

                    <a 
                      href="https://github.com/AkashKhadanga/issue-resolve-hub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 rounded-2xl hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group"
                    >
                      <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-white/5 group-hover:scale-105 transition-transform">
                        <Github className="w-5 h-5" />
                      </div>
                      <div className="text-left font-sans">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">GitHub Repository Network</span>
                        <span className="text-xs font-semibold text-slate-300 truncate max-w-[200px] sm:max-w-none group-hover:text-white transition-colors">github.com/AkashKhadanga/issue-resolve-hub</span>
                      </div>
                    </a>

                    <a 
                      href="https://www.linkedin.com/in/chinni-bhushana-khadanga-44a748312/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 rounded-2xl hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group"
                    >
                      <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-white/5 group-hover:scale-105 transition-transform">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div className="text-left font-sans">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">LinkedIn Professional Network</span>
                        <span className="text-xs font-semibold text-slate-300 truncate max-w-[200px] sm:max-w-none group-hover:text-white transition-colors">linkedin.com/in/chinni-bhushana-khadanga-44a748312/</span>
                      </div>
                    </a>

                    <a 
                      href="https://issue-resolve-hub.vercel.app/admin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-indigo-900/10 border border-blue-500/20 backdrop-blur-xl p-4 rounded-2xl hover:border-blue-500/40 hover:bg-white/[0.05] transition-all duration-300 group"
                    >
                      <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-white/5 group-hover:scale-105 transition-transform">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="text-left font-sans">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">// SMART GRIEVANCE LIVE ADMIN PANEL</span>
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">issue-resolve-hub.vercel.app/admin</span>
                      </div>
                    </a>
                  </div>

                  <p className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1.5 pt-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                    <span>LOC: Palasa, Srikakulam, Andhra Pradesh, India / REMOTE OK</span>
                  </p>
                </div>

                {/* RIGHT BLOCK: FUTURISTIC GLASSMOPHIC FORM / INTERACTIVE AI CHATBOT */}
                <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[40px] pointer-events-none" />

                  {/* TAB SELECTOR FOR MESSAGE FORM OR AI RECRUITER */}
                  <div className="flex border-b border-white/5 mb-6 relative z-20">
                    <button 
                      type="button"
                      onClick={() => setContactTab('briefing')} 
                      className={`flex-1 pb-3 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${contactTab === 'briefing' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      <span>Direct Message Form_</span>
                      {contactTab === 'briefing' && (
                        <motion.div layoutId="activeContactTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500" />
                      )}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setContactTab('ai')} 
                      className={`flex-1 pb-3 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${contactTab === 'ai' ? 'text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        AI Recruiter Agent_
                      </span>
                      {contactTab === 'ai' && (
                        <motion.div layoutId="activeContactTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500" />
                      )}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {contactTab === 'briefing' ? (
                      !formSuccess ? (
                        <motion.form 
                          key="contact-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onSubmit={handleContactSubmit}
                          className="space-y-5"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1">Name_</label>
                              <div className="relative group/field rounded-xl overflow-visible">
                                {/* Glowing backdrop layer */}
                                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 blur-[6px] transition-all duration-300 pointer-events-none z-0" />
                                {/* Sharp gradient border layer */}
                                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 transition-all duration-300 pointer-events-none z-0" />
                                <input 
                                  type="text" 
                                  required
                                  value={formState.name}
                                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                  placeholder="e.g., Jane Recruiter"
                                  className="relative z-10 w-full bg-[#090d1a] border border-white/10 text-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-transparent transition-all"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1">Email Connection_</label>
                              <div className="relative group/field rounded-xl overflow-visible">
                                {/* Glowing backdrop layer */}
                                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 blur-[6px] transition-all duration-300 pointer-events-none z-0" />
                                {/* Sharp gradient border layer */}
                                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 transition-all duration-300 pointer-events-none z-0" />
                                <input 
                                  type="email" 
                                  required
                                  value={formState.email}
                                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                  placeholder="e.g., jane@company.com"
                                  className="relative z-10 w-full bg-[#090d1a] border border-white/10 text-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-transparent transition-all"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1">Subject_</label>
                            <div className="relative group/field rounded-xl overflow-visible">
                              {/* Glowing backdrop layer */}
                              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 blur-[6px] transition-all duration-300 pointer-events-none z-0" />
                              {/* Sharp gradient border layer */}
                              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 transition-all duration-300 pointer-events-none z-0" />
                              <input 
                                type="text" 
                                required
                                value={formState.subject}
                                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                placeholder="e.g., Django React Project Collaboration"
                                className="relative z-10 w-full bg-[#090d1a] border border-white/10 text-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-transparent transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1">Message Body_</label>
                            <div className="relative group/field rounded-xl overflow-visible">
                              {/* Glowing backdrop layer */}
                              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 blur-[6px] transition-all duration-300 pointer-events-none z-0" />
                              {/* Sharp gradient border layer */}
                              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 transition-all duration-300 pointer-events-none z-0" />
                              <textarea 
                                rows={4}
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                placeholder="Brief us on your pipeline roles, project parameters or contract schedules..."
                                className="relative z-10 w-full bg-[#090d1a] border border-white/10 text-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-transparent transition-all resize-none"
                              />
                            </div>
                          </div>

                          {formError && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-400 font-mono text-center relative z-20">
                              ⚠️ {formError}
                            </div>
                          )}

                          <button 
                            type="submit"
                            disabled={formLoading}
                            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold rounded-xl tracking-wider shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {formLoading ? (
                              <>
                                <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-white animate-spin" />
                                <span className="font-mono text-[10px]">TRANSMITTING_DATA...</span>
                              </>
                            ) : (
                              <>
                                <span>TRANSMIT CONTRACT BRIEFING</span>
                                <Send className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </motion.form>
                      ) : (
                        <motion.div 
                          key="contact-success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center justify-center text-center py-16 space-y-4"
                        >
                          <div className="h-14 w-14 bg-emerald-950/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 animate-pulse" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xl font-sans font-bold text-white">Transmissions Synthesized</h4>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                              Your developer briefing has been logged to Akash Khadanga's communication queue successfully. We will follow up via your email prompt immediately.
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              setFormSuccess(false);
                              setFormError(null);
                            }}
                            className="px-5 py-2.5 bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer animate-pulse"
                          >
                            Send Another Transmission
                          </button>
                        </motion.div>
                      )
                    ) : (
                      <motion.div
                        key="contact-ai"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full"
                      >
                        <ContactAiChatbot />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* PREMIUM MULTI-SECTION FOOTER */}
            <footer className="w-full border-t border-white/10 bg-[#020617] mt-16 relative z-10">
              <div className="max-w-7xl mx-auto pt-16 pb-12 px-4 md:px-8 text-slate-500 text-xs font-mono select-none">
                
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5 mb-10">
                  
                  {/* Brand & Ecosystem Summary */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                        <span className="text-[10px] font-semibold tracking-widest uppercase">AK</span>
                      </div>
                      <div className="leading-none">
                        <span className="text-xs font-sans font-bold text-white tracking-tight block">Akash Khadanga</span>
                        <span className="text-[8px] text-blue-400 block tracking-widest mt-0.5">DEV_ECOSYSTEM</span>
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-400 font-sans font-medium">
                      Constructing high-performance digital architectures, linking Django REST API server engines, SQLite data schemas, and immersive React client frontends into cohesive systems.
                    </p>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/[0.02] border border-white/5 rounded-full text-[9px] text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>NODE_STATUS: ACTIVE // PING &lt; 15ms</span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">// Ecosystem Nav</h4>
                    <ul className="space-y-2 text-[11px] font-sans font-semibold">
                      <li>
                        <button 
                          onClick={() => scrollToSection('about')} 
                          className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer text-left uppercase flex items-center gap-1.5 group"
                        >
                          <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                          About Ecosystem
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => scrollToSection('skills')} 
                          className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer text-left uppercase flex items-center gap-1.5 group"
                        >
                          <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                          Skills Grid
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => scrollToSection('projects')} 
                          className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer text-left uppercase flex items-center gap-1.5 group"
                        >
                          <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                          Case Studies
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => scrollToSection('awards')} 
                          className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer text-left uppercase flex items-center gap-1.5 group"
                        >
                          <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                          Timeline & Awards
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => scrollToSection('contact')} 
                          className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer text-left uppercase flex items-center gap-1.5 group"
                        >
                          <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                          Contact Panel
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Highlight Projects */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">// Highlight Projects</h4>
                    <ul className="space-y-2.5 text-[11px] font-sans">
                      <li>
                        <a 
                          href="https://issue-resolve-hub.vercel.app/admin" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-slate-400 hover:text-blue-400 transition-colors block group"
                        >
                          <span className="font-bold block text-slate-300 group-hover:text-blue-400 transition-colors">SMART GRIEVANCE HUB</span>
                          <span className="text-[9px] text-slate-500 block">Real-time Complaint System</span>
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://github.com/AkashKhadanga/issue-resolve-hub" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-slate-400 hover:text-blue-400 transition-colors block group"
                        >
                          <span className="font-bold block text-slate-300 group-hover:text-blue-400 transition-colors">STUDENT TASK PLANNER</span>
                          <span className="text-[9px] text-slate-500 block">Django REST API + React.js Client</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Connect Channels */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">// Connect Network</h4>
                    <ul className="space-y-2 text-[11px] font-sans font-semibold">
                      <li>
                        <a href="mailto:akashkhadaanga123@gmail.com" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-blue-400" />
                          <span>akashkhadaanga123@gmail.com</span>
                        </a>
                      </li>
                      <li>
                        <a href="tel:+917207174517" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>+91-7207174517</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/AkashKhadanga" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                          <Github className="w-3.5 h-3.5 text-blue-400" />
                          <span>github.com/AkashKhadanga</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/in/chinni-bhushana-khadanga-44a748312/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                          <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                          <span>linkedin.com/in/chinni-bhushana</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Bottom Row */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 bg-white/5 rounded-md border border-white/10 flex items-center justify-center text-blue-400">
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                    <span>CRAFTED IN 2026 / AKASH KHADANGA ECOSYSTEM SPEC</span>
                  </div>
                  
                  <div className="flex gap-6 text-slate-400">
                    <a href="mailto:akashkhadaanga123@gmail.com" className="hover:text-blue-400 transition-colors">EMAIL</a>
                    <a href="https://github.com/AkashKhadanga/issue-resolve-hub" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GITHUB</a>
                    <a href="https://www.linkedin.com/in/chinni-bhushana-khadanga-44a748312/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LINKEDIN</a>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-600">SYS_MAINNET_ONLINE</span>
                  </div>
                </div>

              </div>
            </footer>

            {/* GLOWING RECRUITER WIDGET CHAT */}
            <AiChatbot />

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
