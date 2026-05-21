import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const phrases = [
    'ESTABLISHING PROTOCOLS...',
    'COMPILING NEURAL SCHEMACS...',
    'SYNCHRONIZING RECONSTRUCTS...',
    'LAUCHING IMMERSIVE EXPERIENCE...',
  ];

  useEffect(() => {
    // Dynamic loading speed up the counter
    const duration = 2400; // ms
    let startTime: number | null = null;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressPercent = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(progressPercent);

      // Rotate phrases periodically
      if (progressPercent > 80) setPhraseIndex(3);
      else if (progressPercent > 50) setPhraseIndex(2);
      else if (progressPercent > 20) setPhraseIndex(1);

      if (elapsed < duration) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 600); // Allow exit animations to finish
        }, 300);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="system-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-100 flex flex-col justify-between bg-[#020617] p-8 md:p-16 select-none overflow-hidden"
        >
          {/* Futuristic ambient corner lights */}
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-500/10 blur-[130px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-[130px] translate-x-1/2 translate-y-1/2" />

          {/* Top Bar */}
          <div className="flex justify-between items-center text-xs font-mono tracking-[0.2em] text-cyan-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              <span>AKASH_KHADANGA_PORTFOLIO / v3.5_MAINNET</span>
            </div>
            <div className="hidden sm:block text-slate-500">SYS_LOC_UTC_2026</div>
          </div>

          {/* Center Counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative">
              {/* Backglow for typography */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500/35 rounded-full blur-[80px] opacity-20" />
              <motion.span 
                className="text-8xl sm:text-9xl md:text-[12rem] font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400 flex select-none"
              >
                {progress.toString().padStart(3, '0')}
                <span className="text-2xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500 flex items-end mb-4 md:mb-8 font-mono ml-1">
                  %
                </span>
              </motion.span>
            </div>

            <div className="h-6 overflow-hidden flex items-center justify-center mt-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="text-xs sm:text-sm font-mono tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 text-center font-medium"
                >
                  {phrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Loading Bar Progress Indicator */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[2px] bg-slate-900 overflow-hidden relative rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 absolute left-0 top-0"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-500 tracking-wider">
              <span>SYSTEM: OK</span>
              <span className="text-cyan-500/70">{progress === 100 ? 'SYSTEMS LOADED' : 'LOADING RESOURCES...'}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
