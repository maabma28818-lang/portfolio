"use client";

import { motion, Variants } from "framer-motion";
import { Mic, Waves, ArrowRight, Layers, Activity } from "lucide-react";

export default function SeraArch() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" } },
  };

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="flex items-center min-w-[600px] gap-2 py-8 px-4"
      >
        {/* Input */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 shrink-0">
          <div className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center bg-black/40">
            <Mic className="w-6 h-6 text-white/80" />
          </div>
          <span className="text-xs text-white/60 font-mono">Audio Input</span>
        </motion.div>

        <motion.div variants={itemVariants}><ArrowRight className="w-4 h-4 text-white/20" /></motion.div>

        {/* Preprocessing */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 shrink-0">
          <div className="w-32 h-16 rounded-xl glass border border-neon-cyan/50 bg-neon-cyan/5 flex flex-col items-center justify-center">
            <Waves className="w-5 h-5 text-neon-cyan mb-1" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Librosa</span>
          </div>
          <span className="text-xs text-white/60 font-mono text-center leading-tight">Mel-spectrogram<br/>(128x130)</span>
        </motion.div>

        <motion.div variants={itemVariants}><ArrowRight className="w-4 h-4 text-white/20" /></motion.div>

        {/* CNN Blocks */}
        <motion.div variants={itemVariants} className="flex gap-2 p-3 rounded-xl border border-neon-purple/30 bg-neon-purple/5 shrink-0 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a0a0f] border border-neon-purple/30 rounded text-[10px] text-neon-purple font-mono font-bold">
            CNN PIPELINE
          </div>
          {[1, 2, 3].map((block) => (
            <motion.div
              key={block}
              animate={{
                boxShadow: ["0px 0px 0px rgba(107,33,168,0)", "0px 0px 15px rgba(107,33,168,0.5)", "0px 0px 0px rgba(107,33,168,0)"],
                borderColor: ["rgba(107,33,168,0.2)", "rgba(107,33,168,0.8)", "rgba(107,33,168,0.2)"]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: block * 0.5 }}
              className="w-16 h-20 rounded-lg border border-neon-purple/20 bg-neon-purple/10 flex flex-col items-center justify-center gap-1"
            >
              <Layers className="w-5 h-5 text-neon-purple/80" />
              <span className="text-[10px] text-white/70 font-mono">Conv2D</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}><ArrowRight className="w-4 h-4 text-white/20" /></motion.div>

        {/* Output */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 shrink-0">
          <div className="w-24 h-24 rounded-full glass border border-emerald-500/50 bg-emerald-500/10 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Activity className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-xl font-bold text-white leading-none">8</span>
            <span className="text-[10px] text-white/60 uppercase">Emotions</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold">Classification</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
