"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowDown, Mail, Database, Server, MonitorSmartphone, BrainCircuit } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import MagneticButton from "./MagneticButton";

const roles = [
  "Full Stack Engineer",
  "AI & ML Integrator",
  "Enterprise MIS Architect",
  "Interactive UI/UX Designer",
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center w-full max-w-6xl mx-auto"
      >
        {/* Node Network Visual Centerpiece */}
        <motion.div variants={itemVariants} className="relative w-full max-w-2xl h-64 mb-12 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Connecting Lines */}
            <svg className="absolute w-full h-full pointer-events-none stroke-white/20" style={{ zIndex: 0 }}>
              <motion.line x1="20%" y1="50%" x2="40%" y2="50%" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
              <motion.line x1="40%" y1="50%" x2="60%" y2="50%" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.8 }} />
              <motion.line x1="60%" y1="50%" x2="80%" y2="50%" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.1 }} />
              <motion.path d="M 40% 50% Q 50% 20% 60% 50%" fill="none" strokeWidth="1" className="stroke-neon-purple/50" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }} />
            </svg>

            {/* Nodes */}
            <div className="w-full flex justify-between items-center px-[10%] relative z-10">
              <NodeCard icon={<MonitorSmartphone className="w-6 h-6 text-neon-cyan" />} label="Frontend" delay={0.2} />
              <NodeCard icon={<Server className="w-6 h-6 text-white" />} label="API" delay={0.4} />
              <NodeCard icon={<BrainCircuit className="w-6 h-6 text-neon-purple" />} label="AI Models" delay={0.6} />
              <NodeCard icon={<Database className="w-6 h-6 text-emerald-400" />} label="Database" delay={0.8} />
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white">
            Engineering Scalable Systems, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
              Crafting Fluid Interfaces.
            </span>
          </h1>
        </motion.div>

        {/* Dynamic Role Text */}
        <motion.div variants={itemVariants} className="h-10 mb-10 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRole}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="text-xl md:text-2xl text-white/70 font-mono font-medium text-center"
            >
              {roles[currentRole]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-16 items-center">
          <MagneticButton className="group relative px-8 py-4 rounded-full font-medium overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 rounded-full border border-white/20 shadow-[0_0_20px_rgba(0,242,254,0.3)] group-hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] transition-shadow duration-500" />
            <span className="relative text-white z-10 flex items-center gap-3">
              Explore Selected Works
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </MagneticButton>

          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }
            }}
            className="px-8 py-4 rounded-full font-medium glass text-white/90 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Social Links Bar */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <SocialLink href="https://github.com/maabma28818-lang" icon={<FaGithub className="w-5 h-5" />} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/mohammed-abdullah-mahmood" icon={<FaLinkedinIn className="w-5 h-5" />} label="LinkedIn" />
          <SocialLink href="mailto:maabma28818@gmail.com" icon={<Mail className="w-5 h-5" />} label="Email" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function NodeCard({ icon, label, delay }: { icon: React.ReactNode; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
      className="flex flex-col items-center gap-3 group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 rounded-2xl glass flex items-center justify-center relative backdrop-blur-xl border border-white/10 shadow-xl group-hover:border-white/30 transition-colors"
      >
        <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        {icon}
      </motion.div>
      <span className="text-xs font-mono text-white/60 tracking-wider group-hover:text-white/90 transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group"
      aria-label={label}
    >
      <span className="text-white/60 group-hover:text-white transition-colors">{icon}</span>
      <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors hidden sm:block">
        {label}
      </span>
    </a>
  );
}
