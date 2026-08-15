"use client";

import { motion } from "framer-motion";
import { X, ExternalLink, Activity } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/data/projects";
import dynamic from "next/dynamic";

const HealthConnectArch = dynamic(() => import("./architectures/HealthConnectArch"), { ssr: false });
const SeraArch = dynamic(() => import("./architectures/SeraArch"), { ssr: false });
const NazaraArch = dynamic(() => import("./architectures/NazaraArch"), { ssr: false });

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
      />
      <motion.div
        layoutId={`project-${project.id}`}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl z-50 border border-white/10 shadow-2xl bg-[#0a0a0f]/95 flex flex-col"
      >
        {/* Header Section */}
        <div className="relative p-8 pb-0 flex justify-between items-start">
          <motion.div layoutId={`title-${project.id}`} className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors bg-white/5"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white/90 mb-3 border-b border-white/10 pb-2">
                Overview
              </h3>
              <p className="text-white/70 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white/90 mb-3 border-b border-white/10 pb-2">
                Key Highlights
              </h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Workflow */}
            <div>
               <h3 className="text-xl font-semibold text-white/90 mb-3 border-b border-white/10 pb-2">
                Architecture Workflow
              </h3>
              <div className="w-full rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden relative group min-h-[12rem] p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 opacity-50 pointer-events-none" />
                <div className="w-full relative z-10 flex flex-col items-center justify-center">
                  {project.id === "healthconnect" ? (
                    <HealthConnectArch />
                  ) : project.id === "sera" ? (
                    <SeraArch />
                  ) : project.id === "nazara-mis" ? (
                    <NazaraArch />
                  ) : (
                    <div className="text-white/40 font-mono text-sm flex flex-col items-center gap-2 py-8">
                      <Activity className="w-8 h-8 text-white/20 group-hover:text-neon-cyan transition-colors" />
                      <span>Architecture Diagram Unavailable</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
             {project.metric && (
                <div className="p-6 rounded-2xl glass border border-neon-purple/30 bg-neon-purple/5 text-center">
                  <span className="block text-3xl font-bold text-white text-glow-cyan mb-1">
                    {project.metric.split(" ")[0]}
                  </span>
                  <span className="text-sm text-white/60 font-mono uppercase tracking-wider">
                    {project.metric.substring(project.metric.indexOf(" ") + 1)}
                  </span>
                </div>
             )}

             <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl font-medium bg-white text-black hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Preview
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span className="text-sm font-medium">Source Code</span>
                  </a>
                )}
             </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
