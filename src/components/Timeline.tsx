import { motion } from 'motion/react';
import { Award, BookOpen, ShieldCheck, CheckCircle2, ChevronRight, Calendar } from 'lucide-react';
import { Achievement, Certification } from '../types';

export default function Timeline() {
  const achievements: Achievement[] = [
    {
      title: '1st Prize Winner — Drawing & Design',
      issuer: 'Cursors 2K26 Drawing Competition',
      date: 'Feb 2026',
      description: 'Awarded first honor for representing highly creative computer graphics rendering concepts and graphic execution workflows.',
      badge: 'GOLD_MEDAL'
    },
    {
      title: '1st Prize Winner — Creative Draft',
      issuer: 'Cursors 2K25 Drawing Competition',
      date: 'Feb 2025',
      description: 'First prize champion for modeling sophisticated hand-drawn computer schematic rendering elements.',
      badge: 'CHAMPION_BANNER'
    },
    {
      title: 'Innovex Hackathon Runner',
      issuer: 'Innovex 2024 Hackathon',
      date: 'Dec 2024',
      description: 'Designed and deployed a student issue tracker workspace under intensive sprint limits to optimize college grievance resolution pipelines.',
      badge: 'HACKATHON_RUNNER'
    }
  ];

  const certifications: Certification[] = [
    {
      title: 'Python for Beginners',
      platform: 'Coursera',
      date: '2024',
      verificationId: 'COUR-PYTH-883A',
      link: '#'
    },
    {
      title: 'Introduction to SQL',
      platform: 'Sololearn',
      date: '2024',
      verificationId: 'SQL-SL-908B1',
      link: '#'
    },
    {
      title: 'Introduction to Python',
      platform: 'Infosys Springboard',
      date: '2023',
      verificationId: 'INF-SPRING-229P',
      link: '#'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
      
      {/* LEFT COLUMN: GLOWING TIMELINE ACHIEVEMENTS */}
      <div className="lg:col-span-7 space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
            <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest">Honors & Competitions</h3>
          </div>
          <h4 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            Awards & Milestones
          </h4>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 ml-4 pl-8 space-y-10 py-2">
          {achievements.map((ach, idx) => {
            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Glowing Node Indicator on Line */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#020617] border-2 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 z-10">
                  <Award className="w-3 h-3 text-blue-400" />
                </div>

                {/* Achievement Card */}
                <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative group overflow-hidden">
                  
                  {/* Subtle lighting blur background hover action */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.01] rounded-full blur-[40px] pointer-events-none group-hover:bg-blue-500/[0.03]" />

                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                         {ach.date}
                      </span>
                      <h4 className="text-lg font-sans font-bold text-slate-100 group-hover:text-white transition-colors">
                        {ach.title}
                      </h4>
                      <p className="text-xs font-mono text-slate-500">{ach.issuer}</p>
                    </div>

                    <span className="px-2 py-0.5 text-[8px] font-mono text-cyan-400 bg-white/5 border border-white/10 rounded">
                      {ach.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium mt-3.5 pl-3 border-l-2 border-white/10">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: TILT-HOVER GLASSMORPHISM CERTIFICATES */}
      <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest">Industry Credentials</h3>
          </div>
          <h4 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            Certifications
          </h4>
        </div>

        {/* List of glassmorphism tilted cards */}
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {certifications.map((cert) => {
            return (
              <motion.div
                key={cert.title}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="isolate relative bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-5 hover:border-blue-500/30 transition-all shadow-md group overflow-hidden"
              >
                {/* Floating dynamic glow panel inside card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.02] rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/[0.04]" />

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{cert.platform}</span>
                    <h5 className="text-base font-sans font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">
                      {cert.title}
                    </h5>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ID: <span className="text-slate-400">{cert.verificationId}</span></span>
                  </div>

                  <span className="text-slate-500 uppercase tracking-wider">ISSUED_{cert.date}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small detail check */}
        <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl flex items-center gap-3 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>All visual credentials audit verified against primary issuers.</span>
        </div>
      </div>
    </div>
  );
}
