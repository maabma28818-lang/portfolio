"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.8 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.8 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() === "button" || 
          (e.target as HTMLElement).tagName.toLowerCase() === "a" ||
          (e.target as HTMLElement).closest("button") || 
          (e.target as HTMLElement).closest("a")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", () => setIsVisible(true));
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY, isVisible, isMobile]);

  if (!isVisible || isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`w-full h-full rounded-full border border-neon-cyan shadow-[0_0_15px_#00f2fe] transition-all duration-300 ${isHovered ? 'bg-neon-cyan/20 backdrop-blur-md' : 'bg-transparent'}`} />
      <div className={`absolute w-2 h-2 rounded-full bg-neon-cyan transition-all duration-300 ${isHovered ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
    </motion.div>
  );
}
