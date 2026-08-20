"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectGallery from "@/components/ProjectGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const WebGLBackground = dynamic(() => import("@/components/WebGLBackground"), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[-1] bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-full h-full bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 animate-pulse" />
    </div>
  )
});

export default function Home() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full flex flex-col items-center overflow-x-hidden min-h-screen pt-[var(--header-height)]">
      <WebGLBackground />
      <Hero />
      
      {/* Skills & Sandbox Section */}
      <SkillsSection />

      {/* Verified Certifications */}
      <CertificationsSection />
      
      {/* Dynamic Project Gallery Section */}
      <div id="projects">
        <ProjectGallery />
      </div>
      
      {/* Contact Hub */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
