import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Server, Wrench, Shield, CheckCircle } from 'lucide-react';

interface Skill {
  name: string;
  desc: string;
  rating: number; // 0-100
  info: string;
}

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<'frontend' | 'backend' | 'tools' | 'core'>('frontend');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const skillCategories = {
    frontend: {
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      title: 'Frontend Architecture',
      subtitle: 'Component structures and luxury styling',
      skills: [
        { name: 'React.js', rating: 95, desc: 'Hook engines, State optimizations, Component architectures', info: 'Expertise in building high performance single page apps with clean virtual DOM sync.' },
        { name: 'Tailwind CSS', rating: 98, desc: 'Utility architectures, Custom design configs, Responsive layouts', info: 'Mastery over fluid desktop-first layouts and bespoke system design styling.' },
        { name: 'JavaScript', rating: 92, desc: 'Asynchronous event engines, Modern frameworks integration', info: 'Solid foundations in closures, event phases, and functional programming.' },
        { name: 'HTML5', rating: 96, desc: 'Semantic layouts, Accessibility markup, SEO structural rules', info: 'Fully semantic and descriptive HTML structure to optimize cross-platform styling.' },
        { name: 'CSS3', rating: 90, desc: 'Animations, Flexbox pipelines, Grid layouts', info: 'Bespoke CSS grids and high fidelity transitions without external bloating.' },
      ],
    },
    backend: {
      icon: <Server className="w-4 h-4 text-purple-400" />,
      title: 'Backend & Cloud System',
      subtitle: 'Performant servers and database orchestration',
      skills: [
        { name: 'Python', rating: 90, desc: 'Algorithmic programming, Script pipelines', info: 'Extensive use in system automation, Django endpoints, and data structures.' },
        { name: 'Django', rating: 88, desc: 'MVC paradigms, REST frameworks, SQL query routing', info: 'Constructing modular web applications and REST APIs backed by secure token layers.' },
        { name: 'Firebase', rating: 92, desc: 'Firestore NoSQL, Auth setups, Serverless models', info: 'Implementing real-time database nodes and secure rule-based read/writes.' },
        { name: 'REST APIs', rating: 95, desc: 'Payload structure design, API documentation schema', info: 'Familiarity with clean separation of routes, status responses, and validation.' },
        { name: 'SQLite', rating: 85, desc: 'Query indexing procedures, Schema relationship maps', info: 'Lightweight database structures customized for quick student information logs.' },
      ],
    },
    tools: {
      icon: <Wrench className="w-4 h-4 text-amber-400" />,
      title: 'Developer Enablers & Tools',
      subtitle: 'Workflows, CI/CD pipelines and deployment tooling',
      skills: [
        { name: 'GitHub', rating: 94, desc: 'Collaborative pipelines, Branch triggers, Action workflows', info: 'Figma and code synchronization, source code version controls and PR routines.' },
        { name: 'Postman', rating: 90, desc: 'REST testing, Headers configurations, Endpoint validation', info: 'Rigorous API pipeline test routines before deploying to frontends.' },
        { name: 'VS Code', rating: 96, desc: 'Custom workspace profiling, Refactoring utilities', info: 'High speed keyboard setups, ESLint rules, and TypeScript profiling.' },
      ],
    },
    core: {
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      title: 'Computer Science Core',
      subtitle: 'Core algorithms and full-stack execution principles',
      skills: [
        { name: 'Problem Solving', rating: 92, desc: 'Algorithmic strategy, Code debugging speeds', info: 'Elite capabilities analyzing visual and mathematical program challenges.' },
        { name: 'DSA', rating: 88, desc: 'Complex structures, Performance optimization logic', info: 'Highly skilled in Array structures, Pointer states, Recursions and Map indexing.' },
        { name: 'Full Stack Development', rating: 93, desc: 'Component lifecycle loops, Unified system delivery', info: 'Capable of handling database migrations, secure backends, and flawless frontends.' },
      ],
    },
  };

  const activeCategoryData = skillCategories[activeCategory];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
      
      {/* LEFT COLUMN: CATEGORIES SELECTOR */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// DEEP STACK SELECTION</p>
          <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            Comprehensive Tech Engine
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Click categories below. Our custom interactive panels will display granular skills with real-time detail projection on hover.
          </p>
        </div>

        {/* Categories Glass Track buttons */}
        <div className="space-y-3">
          {(Object.keys(skillCategories) as Array<keyof typeof skillCategories>).map((key) => {
            const cat = skillCategories[key];
            const isSelected = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(key);
                  setHoveredSkill(null);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 border-white/20 shadow-lg shadow-blue-500/10'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h4 className={`text-xs font-mono uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      {key}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5">{cat.title}</p>
                  </div>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-400 animate-ping' : 'bg-slate-800'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* CENTER COLUMN: INTERACTIVE TECH CARDS LIST */}
      <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 rounded-2xl flex flex-col justify-between">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" />
            <h4 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
              {activeCategoryData.title}
            </h4>
          </div>
          <p className="text-xs text-slate-400 font-sans italic leading-tight">
            {activeCategoryData.subtitle}
          </p>

          {/* Cards Track */}
          <div className="space-y-3 pt-3">
            {activeCategoryData.skills.map((skill) => {
              const matchesHover = hoveredSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  className={`p-3.5 rounded-xl border transition-all cursor-crosshair duration-300 relative overflow-hidden group ${
                    matchesHover
                      ? 'bg-white/[0.08] border-blue-500/40 translate-x-1.5'
                      : 'bg-white/[0.01] border-white/5'
                  }`}
                >
                  {/* Subtle skill progress highlight layout grid projection */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none transition-all duration-300"
                    style={{ width: `${skill.rating}%` }}
                  />

                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-xs font-sans font-semibold text-white tracking-wide">{skill.name}</span>
                    <span className="text-[10px] font-mono text-blue-400 pr-1">{skill.rating}%</span>
                  </div>

                  <p className="text-[10px] text-slate-400 font-mono mt-1 relative z-10 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: DETAIL PROJECTION HUD */}
      <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden">
        {/* Glowing Backlights */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />

        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">// HUD SCREEN</span>
            <span className="text-[9px] font-mono text-blue-400 px-1.5 py-0.5 bg-blue-950/25 rounded border border-blue-900/40">ACTIVE</span>
          </div>

          <AnimatePresence mode="wait">
            {hoveredSkill ? (
              <motion.div
                key={hoveredSkill.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-blue-400 tracking-wider">SKILL_ENGINEERED</span>
                  <h4 className="text-xl font-sans font-bold text-white">{hoveredSkill.name}</h4>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">EXPERTISE_LVL:</span>
                    <span className="text-emerald-400 font-semibold">
                      {hoveredSkill.rating >= 92 ? 'EXPERT' : 'IN-DEPTH'}
                    </span>
                  </div>
                  {/* Glowing Meter Bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${hoveredSkill.rating}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Description Projection</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                    {hoveredSkill.info}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Production Ready</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-hud"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center space-y-4"
              >
                <div className="relative">
                  {/* Central orbiting rings mockup */}
                  <div className="w-16 h-16 rounded-full border border-white/5 border-dashed animate-spin flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-blue-800 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-mono text-slate-400">AWAITING STACK HOVER</h5>
                  <p className="text-[10px] text-slate-500 font-sans max-w-[180px]">
                    Position your cursor over any skill cards to pull detailed node statistics.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cinematic console footer details */}
        <div className="text-[9px] font-mono text-slate-600 space-y-0.5 border-t border-white/5 pt-4 mt-6">
          <p>ST_BUFF_XPR: OK</p>
          <p>ST_NODE: ACTIVE_SYS</p>
        </div>
      </div>
    </div>
  );
}
