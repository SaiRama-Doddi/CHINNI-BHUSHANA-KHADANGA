import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, CheckCircle, Clock, AlertTriangle, ShieldCheck, Database, Layers, BarChart3, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isAlt = index % 2 === 1;
  const [activeTab, setActiveTab] = useState<'preview' | 'architecture' | 'features'>('preview');
  
  // Custom states for Project 1 Mockup Interactive elements
  const [activeTicketStatus, setActiveTicketStatus] = useState<'pending' | 'in_progress' | 'resolved'>('in_progress');
  const [activeChartFilter, setActiveChartFilter] = useState<'weekly' | 'monthly'>('monthly');

  // Custom states for Project 2 Mockup Interactive elements
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Integrate Django REST endpoints', rating: 'High', completed: true },
    { id: 2, title: 'Optimize SQLite index for latency', rating: 'Medium', completed: false },
    { id: 3, title: 'Implement Axios error interceptors', rating: 'High', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isAlt ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-stretch mb-24 md:mb-32`}
    >
      {/* LEFT / INFO COLUMN */}
      <div className="flex-1 flex flex-col justify-between p-1">
        <div className="space-y-6">
          {/* Tag & Category */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 rounded-full">
              {project.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="text-xs font-mono text-slate-400">PROJECT_0{index + 1}</span>
          </div>

          {/* Heading */}
          <h3 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white leading-tight">
            {project.title}
          </h3>

          <p className="text-sm font-mono text-slate-400 uppercase tracking-widest leading-none">
            {project.subtitle}
          </p>

          <p className="text-slate-300 text-base leading-relaxed">
            {project.description}
          </p>

          {/* Tab Selector for deep case-study exploration */}
          <div className="flex bg-slate-950/80 border border-slate-900/80 p-1 h-10 rounded-lg max-w-sm gap-1">
            {(['preview', 'architecture', 'features'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-[11px] font-mono tracking-wider uppercase rounded-md transition-all ${
                  activeTab === tab
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Panel with Interactive Animation */}
          <div className="h-56 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'preview' && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <p className="text-xs font-mono text-cyan-400/80 uppercase">Key Focus Areas</p>
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics?.map((m) => (
                      <div key={m.label} className="border border-slate-900/50 bg-slate-950/40 rounded-lg p-3">
                        <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{m.label}</p>
                        <p className="text-sm font-sans font-semibold text-white mt-1">{m.value}</p>
                      </div>
                    )) || (
                      <>
                        <div className="border border-slate-900/50 bg-slate-950/40 rounded-lg p-3">
                          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Framework</p>
                          <p className="text-xs font-sans font-semibold text-white mt-1">React 18 + SPA</p>
                        </div>
                        <div className="border border-slate-900/50 bg-slate-950/40 rounded-lg p-3">
                          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Database</p>
                          <p className="text-xs font-sans font-semibold text-white mt-1">Firebase / SQLite</p>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    Click tabs on the interactive workspace (right) to engage live prototypes.
                  </p>
                </motion.div>
              )}

              {activeTab === 'architecture' && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-3"
                >
                  <p className="text-xs font-mono text-purple-400/80 uppercase">Pipeline Stack Structure</p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center gap-3 bg-slate-950/40 border border-slate-900 px-3 py-2 rounded-lg">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <div className="flex-1">
                        <span className="text-slate-400">Client Tier:</span> React Component Engine, Tailwind V4 Styling
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-950/40 border border-slate-900 px-3 py-2 rounded-lg">
                      <Database className="w-4 h-4 text-purple-400" />
                      <div className="flex-1">
                        <span className="text-slate-400">Data Tier:</span> {project.title.includes('Grievance') ? 'NoSQL Firebase-Firestore, Authentication Auth' : 'SQLite DB, Django REST API Model'}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-950/40 border border-slate-900 px-3 py-2 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <div className="flex-1">
                        <span className="text-slate-400">Auth Tier:</span> {project.title.includes('Grievance') ? 'Role-Based Authorization Rules' : 'Stateless Token validation'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  {project.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2 bg-slate-950/30 border border-slate-900/40 px-3 py-2 rounded-lg text-xs text-slate-300"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] font-mono tracking-widest text-slate-400 bg-slate-950/40 border border-slate-900 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons / CTA */}
        <div className="flex gap-4 pt-8 border-t border-slate-900/60 mt-8">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener referrer"
              id={`live-link-proj-${index}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-sans text-xs font-semibold rounded-lg tracking-wide shadow-md shadow-blue-900/10 hover:shadow-lg transition-all"
            >
              <span>Explore Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener referrer"
              id={`github-link-proj-${index}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-sans text-xs font-semibold rounded-lg tracking-wide transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Deploy Repo</span>
            </a>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN - VISUALLY IMMERSIVE INTERACTIVE WORKSPACE MOCKUPS */}
      <div className="flex-1 flex justify-center items-center relative min-h-[460px] lg:min-h-0 bg-slate-950/30 border border-slate-900/60 p-6 md:p-8 rounded-2xl overflow-hidden group">
        
        {/* Cinematic gradient spotlight backglow behind device */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)] opacity-80 pointer-events-none group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-purple-500/5 blur-[80px]" />

        {/* MOCKUP CONTAINER */}
        <div className="w-full max-w-lg z-10 select-none">
          {project.title.includes('Grievance') ? (
            /* PROJECT 1: SMART GRIEVANCE HUB INTERACTIVE WIREFRAME */
            <div className="relative">
              {/* MacBook screen design mockup (simulated browser view) */}
              <div className="border border-slate-800 bg-[#090a12] rounded-xl shadow-2xl shadow-black/80 overflow-hidden relative">
                
                {/* Simulated browser titlebar bar */}
                <div className="bg-[#0b0c16] border-b border-slate-800 px-4 py-2.5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <div className="bg-slate-950 border border-slate-900 rounded px-4 py-0.5 text-slate-400 w-1/2 text-center text-[9px] truncate">
                    https://issue-resolve-hub.app/admin
                  </div>
                  <div className="w-10" />
                </div>

                {/* Simulated Webpage Content */}
                <div className="p-4 space-y-4">
                  {/* Dashboard stats headers */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-950/80 border border-slate-900 p-2.5 rounded-lg text-center space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">PENDING_JOBS</span>
                      <span className="text-sm font-sans font-bold text-amber-500">14 Active</span>
                    </div>
                    <div className="flex-1 bg-slate-950/80 border border-slate-900 p-2.5 rounded-lg text-center space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">TICKETS_RESOLVED</span>
                      <span className="text-sm font-sans font-bold text-emerald-400">238 Done</span>
                    </div>
                    <div className="flex-1 bg-slate-950/80 border border-slate-900 p-2.5 rounded-lg text-center space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">RESPONSE_LAG</span>
                      <span className="text-sm font-sans font-bold text-sky-400">1.4 hrs Fast</span>
                    </div>
                  </div>

                  {/* Interconnected interactive system analytics */}
                  <div className="bg-slate-950/60 border border-slate-900/60 rounded-lg p-3 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 text-xs text-white">
                        <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-sans font-semibold">Grievance Traffic Analysis</span>
                      </div>
                      <div className="flex gap-1 bg-slate-900 p-0.5 rounded text-[8px] font-mono">
                        <button
                          onClick={() => setActiveChartFilter('weekly')}
                          className={`px-1.5 py-0.5 rounded ${activeChartFilter === 'weekly' ? 'bg-slate-800 text-cyan-300' : 'text-slate-500'}`}
                        >
                          WK
                        </button>
                        <button
                          onClick={() => setActiveChartFilter('monthly')}
                          className={`px-1.5 py-0.5 rounded ${activeChartFilter === 'monthly' ? 'bg-slate-800 text-cyan-300' : 'text-slate-500'}`}
                        >
                          MO
                        </button>
                      </div>
                    </div>

                    {/* Interactive SVG dynamic chart */}
                    <div className="h-20 w-full relative flex items-end">
                      <svg className="absolute inset-0 w-full h-full" overflow="visible">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Dynamic path based on filter state */}
                        <motion.path
                          key={activeChartFilter}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6 }}
                          d={activeChartFilter === 'weekly' 
                            ? "M0,60 L70,35 L140,50 L210,15 L280,45 L350,30 L420,10"
                            : "M0,50 L70,55 L140,25 L210,40 L280,10 L350,20 L420,5"
                          }
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="2"
                        />
                        <motion.path
                          key={`${activeChartFilter}-fill`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          d={activeChartFilter === 'weekly' 
                            ? "M0,60 L70,35 L140,50 L210,15 L280,45 L350,30 L420,10 L420,80 L0,80 Z"
                            : "M0,50 L70,55 L140,25 L210,40 L280,10 L350,20 L420,5 L420,80 L0,80 Z"
                          }
                          fill="url(#chartGrad)"
                        />
                        {/* Interactive Dot */}
                        <circle cx={activeChartFilter === 'weekly' ? 210 : 280} cy={10} r="4" fill="#a855f7" className="animate-pulse" />
                      </svg>
                      {/* Grid Indicators */}
                      <span className="absolute bottom-0 left-0 text-[7px] font-mono text-slate-600">00:00hr</span>
                      <span className="absolute bottom-0 right-0 text-[7px] font-mono text-slate-600">23:59hr</span>
                    </div>
                  </div>

                  {/* Complaint list preview tracker with state switcher */}
                  <div className="bg-slate-950/70 border border-slate-900 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-400 font-semibold uppercase">Real-Time Tracker Workflow</span>
                      <span className="text-slate-600">ID_98A82</span>
                    </div>

                    <div className="flex gap-1 bg-slate-900 p-0.5 rounded text-[9px] font-mono">
                      <button
                        onClick={() => setActiveTicketStatus('pending')}
                        className={`flex-1 flex items-center justify-center gap-1 py-1 rounded transition-all ${
                          activeTicketStatus === 'pending' ? 'bg-amber-950/40 text-amber-400 border border-amber-800' : 'text-slate-500'
                        }`}
                      >
                        <Clock className="w-2.5 h-2.5" />
                        <span>Pending</span>
                      </button>
                      <button
                        onClick={() => setActiveTicketStatus('in_progress')}
                        className={`flex-1 flex items-center justify-center gap-1 py-1 rounded transition-all ${
                          activeTicketStatus === 'in_progress' ? 'bg-sky-950/40 text-sky-400 border border-sky-800' : 'text-slate-500'
                        }`}
                      >
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>In Dev</span>
                      </button>
                      <button
                        onClick={() => setActiveTicketStatus('resolved')}
                        className={`flex-1 flex items-center justify-center gap-1 py-1 rounded transition-all ${
                          activeTicketStatus === 'resolved' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800' : 'text-slate-500'
                        }`}
                      >
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>Approved</span>
                      </button>
                    </div>

                    {/* Step visualization */}
                    <div className="flex items-center justify-between text-[9px] pt-1">
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${activeTicketStatus === 'pending' || activeTicketStatus === 'in_progress' || activeTicketStatus === 'resolved' ? 'bg-amber-400' : 'bg-slate-800'}`} />
                        <span className="text-slate-400 text-[8px] font-mono">Received</span>
                      </div>
                      <div className="flex-1 h-[1px] bg-slate-800 mx-1" />
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${activeTicketStatus === 'in_progress' || activeTicketStatus === 'resolved' ? 'bg-sky-400 animate-pulse' : 'bg-slate-800'}`} />
                        <span className="text-slate-400 text-[8px] font-mono">Assigned</span>
                      </div>
                      <div className="flex-1 h-[1px] bg-slate-800 mx-1" />
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${activeTicketStatus === 'resolved' ? 'bg-emerald-400' : 'bg-slate-800'}`} />
                        <span className="text-slate-400 text-[8px] font-mono">Resolved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING MOBILE LAYOUT PREVIEW DEVICE overlapping on bottom-right */}
              <div className="absolute -bottom-10 -right-4 w-44 hover:-translate-y-2 transition-transform duration-500 hidden sm:block">
                <div className="border-4 border-slate-800 bg-[#07080f] rounded-2xl shadow-2xl overflow-hidden relative">
                  {/* Camera notch */}
                  <div className="absolute top-0 inset-x-0 h-4 flex justify-center z-10">
                    <div className="bg-slate-800 w-16 h-2 rounded-b-md" />
                  </div>
                  {/* Content */}
                  <div className="pt-6 p-2.5 space-y-2 text-[9px]">
                    <span className="text-[6px] font-mono text-cyan-400 uppercase tracking-widest block">ADMIN_PORTAL</span>
                    <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg space-y-1.5">
                      <div className="flex justify-between text-[8px]">
                        <span className="text-white font-sans font-semibold">User Grievance</span>
                        <span className="text-amber-500">NEW_UPLOADS</span>
                      </div>
                      <div className="w-full bg-[#030307] border border-slate-950 p-1.5 rounded flex items-center gap-1.5">
                        {/* Miniature mock uploaded grievance ticket image */}
                        <div className="w-6 h-6 bg-slate-900 rounded border border-slate-900 relative overflow-hidden flex items-center justify-center">
                          <span className="text-[5px] text-slate-500 font-mono">IMG</span>
                        </div>
                        <div className="flex-1 leading-none text-[7px] text-slate-400 space-y-0.5">
                          <span>Faulty System Wiring</span>
                          <span className="text-slate-600 block text-[6px]">Admin panel audit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* PROJECT 2: STUDENT TASK MANAGEMENT CODE INTERACTIVE WIREFRAME */
            <div>
              {/* Dev styled container */}
              <div className="border border-slate-800 bg-[#05060c] rounded-xl shadow-2xl shadow-black/80 overflow-hidden relative">
                {/* Code Window top bar */}
                <div className="bg-[#0b0c13] border-b border-slate-900/80 px-4 py-3 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-slate-300">django_api_service.py</span>
                  </div>
                  <div className="text-[9px] text-slate-600 bg-slate-950 px-2 py-0.5 rounded">SQLite backend</div>
                </div>

                <div className="divide-y divide-slate-900/60 font-mono text-[10px] md:text-xs">
                  {/* Model endpoint preview */}
                  <div className="p-4 bg-slate-950/30 text-slate-300 space-y-2">
                    <p className="text-slate-500 font-mono text-[9px]">// FETCH TASK LIST FROM SQLITE ENGINE</p>
                    <code className="block text-emerald-400">
                      GET /api/v1/tasks/
                    </code>
                    <div className="border border-slate-900/60 bg-slate-950/80 rounded p-2.5 space-y-1 text-slate-400 text-[10px]">
                      <span className="text-slate-600 font-bold block bg-slate-900/40 p-1 rounded-sm">X-API_RESPONSE_STATUS: 200 OK</span>
                      <pre className="text-purple-300">
{`{
  "total": ${tasks.length},
  "completed": ${tasks.filter(t => t.completed).length},
  "db_driver": "sqlite3"
}`}
                      </pre>
                    </div>
                  </div>

                  {/* Django task manager visual client mock */}
                  <div className="p-4 space-y-3">
                    <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-wider">// Responsive Core Client UI Prototype</span>

                    <div className="space-y-2">
                      {tasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => toggleTask(t.id)}
                          className="flex items-center justify-between bg-slate-950 border border-slate-900 hover:border-slate-800 px-3 py-2 rounded-lg cursor-pointer transition-all active:scale-[0.98]"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-3.5 h-3.5 rounded border border-slate-700 flex items-center justify-center ${t.completed ? 'bg-indigo-600/30 border-indigo-500' : 'bg-slate-900'}`}>
                              {t.completed && <span className="w-1.5 h-1.5 bg-indigo-400 rounded-sm" />}
                            </span>
                            <span className={`text-[10px] font-sans ${t.completed ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>
                              {t.title}
                            </span>
                          </div>
                          <span className={`px-1.5 py-0.5 text-[8px] font-mono rounded ${t.completed ? 'bg-slate-900 text-slate-600' : t.rating === 'High' ? 'bg-rose-950/40 text-rose-400 border border-rose-800/40' : 'bg-amber-950/40 text-amber-400 border border-amber-800/40'}`}>
                            {t.rating}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 justify-end text-[9px] text-slate-500">
                      <span>Click items to toggle completion values</span>
                      <ArrowRight className="w-3 h-3 text-indigo-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
