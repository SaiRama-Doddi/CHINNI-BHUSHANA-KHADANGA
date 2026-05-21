import { motion } from 'motion/react';
import { Database, Laptop, Network, Terminal, Cpu } from 'lucide-react';

export default function AboutIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square bg-slate-950/20 border border-slate-900 rounded-3xl p-6 flex flex-col justify-between overflow-hidden group select-none">
      
      {/* Background neon flares */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none" />

      {/* Grid structure overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* 1. Header Terminal Wireframe */}
      <div className="border border-slate-900 bg-slate-950/80 rounded-xl p-3 space-y-2 relative z-10 shadow-lg shadow-black/80">
        <div className="flex justify-between items-center pb-2 border-b border-slate-900 text-[9px] font-mono text-slate-500">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
          </div>
          <span>django_model.py</span>
        </div>
        <div className="font-mono text-[9px] text-slate-400 space-y-1">
          <p className="text-purple-400"><span className="text-slate-600">from</span> django.db <span className="text-slate-600">import</span> models</p>
          <p className="text-slate-500 mt-2">// CREATE SCHEMAS FOR MAIN WORKSPACE</p>
          <p className="text-blue-300">class Grievance(models.Model):</p>
          <p className="pl-3 text-cyan-400">status = models.CharField(max_length=20)</p>
          <p className="pl-3 text-cyan-400">category = models.ForeignKey(Topic)</p>
        </div>
      </div>

      {/* 2. Connected Nodes in Center Vector Grid */}
      <div className="my-auto py-8 relative flex items-center justify-center z-10 w-full">
        <svg className="absolute inset-0 w-full h-full" overflow="visible">
          {/* Animated SVG Lines connecting servers */}
          <motion.line
            x1="20%" y1="50%" x2="50%" y2="50%"
            stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
          <motion.line
            x1="50%" y1="50%" x2="80%" y2="50%"
            stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, 20] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
          <motion.line
            x1="50%" y1="15%" x2="50%" y2="50%"
            stroke="#10b981" strokeWidth="1" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </svg>

        {/* Central Core React component representation */}
        <div className="relative flex justify-between items-center w-full px-4">
          {/* Left client box */}
          <div className="w-16 h-16 rounded-xl border border-slate-800 bg-slate-950 p-2 flex flex-col items-center justify-center space-y-1 shadow-md shadow-cyan-950/20">
            <Laptop className="w-4 h-4 text-cyan-400" />
            <span className="text-[7px] font-mono text-slate-500">REACT_SPA</span>
          </div>

          <div className="flex flex-col gap-6">
            {/* Top Database node */}
            <div className="w-14 h-14 rounded-xl border border-slate-800 bg-slate-950 p-2 flex flex-col items-center justify-center space-y-1 shadow-md shadow-emerald-950/20">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-[7px] font-mono text-slate-500">FIRESTORE</span>
            </div>

            {/* Center Core chip */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
              className="w-12 h-12 rounded-xl border-2 border-slate-700/60 bg-slate-950 flex items-center justify-center animate-pulse"
            >
              <Cpu className="w-5 h-5 text-indigo-400" />
            </motion.div>
          </div>

          {/* Right database node */}
          <div className="w-16 h-16 rounded-xl border border-slate-800 bg-slate-950 p-2 flex flex-col items-center justify-center space-y-1 shadow-md shadow-purple-950/20">
            <Network className="w-4 h-4 text-purple-400" />
            <span className="text-[7px] font-mono text-slate-500">DJANGO_REST</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Terminal Logger */}
      <div className="border border-slate-900/60 bg-slate-950/70 rounded-xl p-3 flex justify-between items-center text-[9px] font-mono text-slate-500 relative z-10 shadow-md">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">SERVER STATUS: <span className="text-emerald-400 font-semibold uppercase">active_connection</span></span>
        </div>
        <div className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}
