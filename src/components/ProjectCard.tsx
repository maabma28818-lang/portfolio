"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { useHoverContext } from "@/context/HoverContext";
import dynamic from "next/dynamic";

const WaveVisualizer = dynamic(() => import("./WaveVisualizer"), { ssr: false });

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const PROJECT_COLORS: Record<string, { active: string; idle: string; bgClass: string }> = {
  healthconnect: { active: "#10b981", idle: "#00f2fe", bgClass: "group-hover:from-cyan-500/10 group-hover:to-emerald-500/10" },
  sera: { active: "#dc143c", idle: "#8a2be2", bgClass: "group-hover:from-violet-500/10 group-hover:to-rose-500/10" },
  "nazara-mis": { active: "#f59e0b", idle: "#ef4444", bgClass: "group-hover:from-red-500/10 group-hover:to-amber-500/10" },
  "library-system": { active: "#4f46e5", idle: "#0ea5e9", bgClass: "group-hover:from-sky-500/10 group-hover:to-indigo-500/10" }
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { hoveredSkill } = useHoverContext();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isHighlighted = hoveredSkill && project.tags.some(tag => tag.toLowerCase().includes(hoveredSkill.toLowerCase()));
  const isDimmed = hoveredSkill && !isHighlighted;
  const colors = PROJECT_COLORS[project.id] || { active: "#00f2fe", idle: "#8a2be2", bgClass: "group-hover:from-neon-cyan/10 group-hover:to-neon-purple/10" };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-[400px] rounded-3xl glass cursor-pointer border transition-all duration-500 p-8 flex flex-col justify-between overflow-hidden
        ${isMobile ? 'hover:border-white/5 active:scale-95' : 'hover:border-white/20 group'}
        ${isHighlighted ? 'border-neon-cyan/50 shadow-[0_0_30px_rgba(0,242,254,0.3)] scale-[1.02]' : 'border-white/5'}
        ${isDimmed ? 'opacity-40 grayscale-[50%]' : 'opacity-100'}
      `}
    >
      <WaveVisualizer activeColor={colors.active} idleColor={colors.idle} />

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${colors.bgClass} transition-all duration-500 rounded-3xl pointer-events-none`} />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 pointer-events-none">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-black/40 text-white/90 border border-white/20 uppercase tracking-wider backdrop-blur-md"
            >
              {cat}
            </span>
          ))}
        </div>
        
        <motion.h3 
          layoutId={`title-${project.id}`} 
          className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-md"
        >
          {project.title}
        </motion.h3>
        
        <p className="text-white/80 line-clamp-3 leading-relaxed drop-shadow-md bg-black/20 p-2 rounded-lg backdrop-blur-sm inline-block">
          {project.description}
        </p>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 mt-6 pointer-events-none">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono rounded bg-black/40 text-white/80 border border-white/10 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-mono rounded bg-black/40 text-white/80 border border-white/10 backdrop-blur-md">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 blur-2xl rounded-full transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}
