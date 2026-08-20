"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ShieldCheck, CheckCircle2, ExternalLink, BadgeCheck } from "lucide-react";
import portfolioData from "@/data/portfolio-data.json";

export default function CertificationsSection() {
  const certifications = portfolioData.certifications;


  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Certifications</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Industry-recognized credentials and academic verifications validating my expertise in frontend architecture, cloud AI integration, and systems security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative w-full rounded-3xl glass border border-white/10 hover:border-cyan-400/40 p-8 overflow-hidden transition-all duration-500"
          >
            {/* Animated Glow Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-emerald-500/0 group-hover:from-cyan-500/10 group-hover:to-emerald-500/10 transition-colors duration-500 rounded-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Award className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400 tracking-wider">VERIFIED</span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-100 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-white/70 font-medium mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white/50" />
                  {cert.issuer}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-white/70 bg-black/20 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>Issued: <strong className="text-white/90">{cert.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70 bg-black/20 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono truncate">Verification ID: <strong className="text-white/90">{cert.credentialId}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs font-mono rounded bg-white/5 text-white/80 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Verify Credential
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Decorative Ambient Corner Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-colors duration-700 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
