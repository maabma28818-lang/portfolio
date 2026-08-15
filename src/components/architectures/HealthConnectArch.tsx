"use client";

import { motion, Variants } from "framer-motion";
import { Brain, Database, Image as ImageIcon, ArrowDown, Cpu, Activity } from "lucide-react";

export default function HealthConnectArch() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      className="w-full flex flex-col items-center gap-4 py-4"
    >
      {/* Top Layer: Multimodal Input */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <div className="w-32 h-20 rounded-xl glass border border-white/10 flex flex-col items-center justify-center gap-2 bg-black/40">
          <ImageIcon className="w-6 h-6 text-neon-cyan" />
          <span className="text-xs text-white/60 font-mono">Image Input</span>
        </div>
        <div className="w-32 h-20 rounded-xl glass border border-white/10 flex flex-col items-center justify-center gap-2 bg-black/40">
          <Activity className="w-6 h-6 text-neon-cyan" />
          <span className="text-xs text-white/60 font-mono">Symptom Text</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="text-white/20">
        <ArrowDown className="w-6 h-6" />
      </motion.div>

      {/* Middle Layer: LLM Processing */}
      <motion.div variants={itemVariants} className="w-full max-w-sm p-4 rounded-xl glass border border-neon-purple/50 bg-neon-purple/10 flex items-center justify-between shadow-[0_0_20px_rgba(107,33,168,0.2)]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neon-purple/20 rounded-lg">
            <Brain className="w-6 h-6 text-neon-purple" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Groq API LLaMA-3.3-70B</span>
            <span className="text-xs text-white/60 font-mono">Multimodal Inference Engine</span>
          </div>
        </div>
        <Cpu className="w-6 h-6 text-neon-purple animate-pulse" />
      </motion.div>

      <motion.div variants={itemVariants} className="text-white/20">
        <ArrowDown className="w-6 h-6" />
      </motion.div>

      {/* Bottom Layer: Storage */}
      <motion.div variants={itemVariants} className="w-full max-w-sm p-4 rounded-xl glass border border-emerald-500/50 bg-emerald-500/10 flex items-center gap-3">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Database className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">SQLite ORM Layer</span>
          <span className="text-xs text-white/60 font-mono">Structured Clinical Insights</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
