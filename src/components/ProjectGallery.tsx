"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "@/data/portfolio-data.json";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/projects";

const FILTERS = ["All", "AI/ML", "Enterprise", "Full Stack"];

export default function ProjectGallery() {
  const projects = portfolioData.projects;
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) =>
    activeFilter === "All" ? true : project.categories.includes(activeFilter)
  );

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
          Selected Works
        </h2>
        
        {/* Dynamic Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  : "glass text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1000px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            >
              <ProjectCard 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expandable Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
