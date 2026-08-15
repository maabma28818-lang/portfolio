"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Map scroll progress (0 to 1) to SVG strokeDashoffset (100 to 0)
  // Assuming a strokeDasharray of 100 for easy percentage mapping
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/5 bg-[#0a0a0f] pt-12 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-white/80 font-medium text-lg">Mohammed Abdullah Mahmood</span>
          <span className="text-white/40 text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        {/* Right Side: Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 bg-white/5">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-xs text-white/60 font-mono">Built with Next.js & Framer Motion</span>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.5,
          pointerEvents: isVisible ? "auto" : "none"
        }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 group flex items-center justify-center w-14 h-14 bg-[#0a0a0f]/80 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors shadow-2xl"
        aria-label="Back to top"
      >
        {/* SVG Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
            className="drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]"
          />
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#4facfe" />
            </linearGradient>
          </defs>
        </svg>

        <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    </footer>
  );
}
