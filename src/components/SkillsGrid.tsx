"use client";

import { motion } from "framer-motion";
import { useHoverContext } from "@/context/HoverContext";
import portfolioData from "@/data/portfolio-data.json";

export default function SkillsGrid() {
  const { setHoveredSkill } = useHoverContext();
  const skills = portfolioData.skills;

  // Categorize skills on the fly for the UI
  const categories = [
    {
      title: "Full Stack & UI/UX",
      skills: skills.filter(s => s.toLowerCase().includes("react") || s.toLowerCase().includes("tailwind") || s.toLowerCase().includes("css") || s.toLowerCase().includes("html") || s.toLowerCase().includes("ui") || s.toLowerCase().includes("ux") || s.toLowerCase().includes("front") || s.toLowerCase().includes("javascript") || s.toLowerCase().includes("figma"))
    },
    {
      title: "Cybersecurity",
      skills: skills.filter(s => s.toLowerCase().includes("kali") || s.toLowerCase().includes("vulnerability") || s.toLowerCase().includes("nmap") || s.toLowerCase().includes("burp") || s.toLowerCase().includes("security") || s.toLowerCase().includes("penetration") || s.toLowerCase().includes("incident"))
    },
    {
      title: "Systems & Architecture",
      skills: skills.filter(s => s.toLowerCase().includes("architecture") || s.toLowerCase().includes("object-oriented") || s.toLowerCase().includes("api") || s.toLowerCase().includes("system") || s.toLowerCase().includes("node") || s.toLowerCase().includes("database") || s.toLowerCase().includes("java") || s.toLowerCase().includes("sql") || s.toLowerCase().includes("mongo"))
    }
  ].filter(c => c.skills.length > 0);

  // Fallback if no matching skills found for a category
  if (categories.length === 0) {
    categories.push({
      title: "All Skills",
      skills: skills
    });
  }

  return (
    <div className="w-full h-full flex flex-col justify-center space-y-8">
      {categories.map((category, catIdx) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: catIdx * 0.1 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-mono text-neon-cyan uppercase tracking-widest">
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredSkill(skill)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="px-4 py-2 rounded-lg glass border border-white/10 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-colors cursor-crosshair group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-neon-cyan/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 text-white/80 group-hover:text-white group-hover:text-shadow-[0_0_8px_rgba(0,242,254,0.8)] transition-all font-medium">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
