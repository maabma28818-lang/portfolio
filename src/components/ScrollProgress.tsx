"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] bg-gradient-to-r from-neon-cyan to-neon-purple origin-left drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]"
      style={{ scaleX }}
    />
  );
}
