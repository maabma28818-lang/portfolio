"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("maabma28818@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = true;
    if (!formData.projectType) newErrors.projectType = true;
    if (!formData.message.trim()) newErrors.message = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Fire confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00f2fe", "#4facfe", "#6b21a8"]
    });

    // Reset form after a while
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", projectType: "", message: "" });
    }, 5000);
  };

  // Error shake animation variants
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="contact" className="relative w-full max-w-7xl mx-auto px-4 py-24 min-h-[80vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
        
        {/* Left Column: Direct Reach Out */}
        <div className="flex flex-col justify-center space-y-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Let's Build Something <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                Exceptional Together.
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Whether you need a scalable enterprise system or an interactive UI, I'm ready to bring your vision to life.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col space-y-3">
              <span className="text-sm font-mono text-white/40 uppercase tracking-widest">Direct Reach Out</span>
              
              <button
                onClick={handleCopyEmail}
                className="group relative px-6 py-4 rounded-2xl glass border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all flex items-center justify-between overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <span className="relative z-10 font-mono text-white/90">maabma28818@gmail.com</span>
                <div className="relative z-10 p-2 rounded-xl bg-white/5 group-hover:bg-neon-cyan/20 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neon-cyan" />}
                </div>
                {/* Tooltip */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-10 right-4 px-3 py-1 rounded bg-white text-black text-xs font-bold"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/mohammed-abdullah-mahmood"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center p-6 rounded-2xl glass border border-white/10 hover:border-[#0077b5] hover:bg-[#0077b5]/10 transition-all group"
              >
                <FaLinkedinIn className="w-8 h-8 text-white/50 group-hover:text-[#0077b5] mb-3 transition-colors" />
                <span className="text-sm font-medium text-white/80">LinkedIn</span>
              </a>
              
              <a
                href="https://github.com/maabma28818-lang"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center p-6 rounded-2xl glass border border-white/10 hover:border-white/40 hover:bg-white/10 transition-all group"
              >
                <FaGithub className="w-8 h-8 text-white/50 group-hover:text-white mb-3 transition-colors" />
                <span className="text-sm font-medium text-white/80">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 blur-3xl -z-10 rounded-full opacity-50" />
          
          <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden bg-[#0d0d18]/80 backdrop-blur-md">
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md rounded-3xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60">I'll get back to you as soon as possible.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  variants={shakeVariants}
                  animate={errors.name ? "shake" : ""}
                  className="flex flex-col space-y-2"
                >
                  <label className="text-sm font-medium text-white/60 ml-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: false });
                    }}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border outline-none transition-all ${
                      errors.name ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-neon-cyan focus:bg-white/10 text-white"
                    }`}
                  />
                </motion.div>

                <motion.div
                  variants={shakeVariants}
                  animate={errors.email ? "shake" : ""}
                  className="flex flex-col space-y-2"
                >
                  <label className="text-sm font-medium text-white/60 ml-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: false });
                    }}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border outline-none transition-all ${
                      errors.email ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-neon-cyan focus:bg-white/10 text-white"
                    }`}
                  />
                </motion.div>
              </div>

              <motion.div
                variants={shakeVariants}
                animate={errors.projectType ? "shake" : ""}
                className="flex flex-col space-y-2"
              >
                <label className="text-sm font-medium text-white/60 ml-1">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => {
                    setFormData({ ...formData, projectType: e.target.value });
                    if (errors.projectType) setErrors({ ...errors, projectType: false });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border outline-none transition-all appearance-none cursor-pointer ${
                    errors.projectType ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-neon-cyan focus:bg-white/10 text-white"
                  }`}
                >
                  <option value="" disabled className="bg-black text-white/50">Select an option...</option>
                  <option value="fullstack" className="bg-[#1a1a24] text-white">Full Stack Development</option>
                  <option value="uiux" className="bg-[#1a1a24] text-white">UI/UX Design</option>
                  <option value="ai" className="bg-[#1a1a24] text-white">AI Integration</option>
                  <option value="consulting" className="bg-[#1a1a24] text-white">Technical Consultation</option>
                </select>
              </motion.div>

              <motion.div
                variants={shakeVariants}
                animate={errors.message ? "shake" : ""}
                className="flex flex-col space-y-2"
              >
                <label className="text-sm font-medium text-white/60 ml-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: false });
                  }}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border outline-none transition-all resize-none ${
                    errors.message ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-neon-cyan focus:bg-white/10 text-white"
                  }`}
                />
              </motion.div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative py-4 rounded-xl font-medium overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
