"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDown, Mail, Shield, Code, Layers } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import MagneticButton from "./MagneticButton";
import { useEffect, useState } from "react";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "root@abdullah:~# nmap -sV --script vuln 10.0.0.1\n[+] Target scan active: 100% complete\nroot@abdullah:~# ./deploy_architecture.sh\n[+] System status: Secure & Operational";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto items-center"
      >
        {/* Left Column: Intro Copy */}
        <div className="flex flex-col items-start text-left space-y-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-2 leading-tight">
              Mohammed <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                Abdullah Mahmood
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mt-4">
              Information Technology undergraduate at Ratan Tata Maharashtra State Skills University. I bridge full-stack system architecture and interactive UI/UX design with proactive cybersecurity methodologies, building resilient, human-centered digital platforms.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full max-w-md">
            <PillarBadge icon={<Code className="w-5 h-5 text-neon-cyan" />} label="Full Stack Development & UI/UX Design" />
            <PillarBadge icon={<Shield className="w-5 h-5 text-neon-purple" />} label="Cybersecurity & Defensive Engineering" />
            <PillarBadge icon={<Layers className="w-5 h-5 text-emerald-400" />} label="Software Engineering & System Architecture" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center pt-4">
            <MagneticButton className="group relative px-8 py-4 rounded-full font-medium overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-full border border-white/20 shadow-[0_0_20px_rgba(0,242,254,0.3)] group-hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] transition-shadow duration-500" />
              <span className="relative text-white z-10 flex items-center gap-3 whitespace-nowrap">
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
              className="px-8 py-4 rounded-full font-medium glass text-white/90 hover:bg-white/10 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Social Links Bar */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
            <SocialLink href="https://github.com/maabma28818-lang" icon={<FaGithub className="w-5 h-5" />} label="GitHub" />
            <SocialLink href="https://linkedin.com/in/mohammed-abdullah-mahmood-a057203a2" icon={<FaLinkedinIn className="w-5 h-5" />} label="LinkedIn" />
            <SocialLink href="mailto:maabma28818@gmail.com" icon={<Mail className="w-5 h-5" />} label="Email" />
          </motion.div>
        </div>

        {/* Right Column: Cartoonic Coding Illustration */}
        <motion.div variants={itemVariants} className="relative w-full h-[500px] flex items-center justify-center">
          <HeroAnimation typedText={typedText} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function PillarBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl glass border border-white/10 hover:border-neon-cyan/50 hover:bg-white/5 transition-all w-full group shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,242,254,0.15)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
      <div className="p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-sm md:text-base font-medium text-white/90">
        {label}
      </span>
    </div>
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
