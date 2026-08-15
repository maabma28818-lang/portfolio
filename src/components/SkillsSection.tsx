"use client";

import SkillsGrid from "./SkillsGrid";
import TerminalSandbox from "./TerminalSandbox";

export default function SkillsSection() {
  return (
    <section id="skills" className="relative w-full max-w-7xl mx-auto px-4 py-24 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Skills & Capabilities
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Hover over the tech stack to illuminate related projects, or interact with the terminal to explore my system vitals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <SkillsGrid />
        <TerminalSandbox />
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
