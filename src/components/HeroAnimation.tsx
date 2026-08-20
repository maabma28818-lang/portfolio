"use client";

import { motion } from "framer-motion";

export default function HeroAnimation({ typedText }: { typedText: string }) {
  return (
    <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center perspective-1000">
      <motion.svg
        viewBox="0 0 600 600"
        className="w-full h-full drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <defs>
          <linearGradient id="screenGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4facfe" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="hoodieGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#16213e" />
          </linearGradient>
          <radialGradient id="deskAmbient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Desk Glow */}
        <ellipse cx="300" cy="350" rx="250" ry="80" fill="url(#deskAmbient)" />

        {/* Desk Surface (Isometric Angle) */}
        <path d="M 50 350 L 550 350 L 600 450 L 0 450 Z" fill="#1f2937" />
        
        {/* Desk Underglow */}
        <path d="M 0 450 L 600 450 L 580 470 L 20 470 Z" fill="#111827" />
        
        {/* Center Monitor (Ultra-wide) */}
        <motion.g transform="translate(150, 100)">
          {/* Stand */}
          <rect x="130" y="160" width="40" height="60" fill="#374151" />
          <path d="M 100 220 L 200 220 L 220 230 L 80 230 Z" fill="#4b5563" />
          {/* Bezel */}
          <rect x="0" y="0" width="300" height="160" rx="8" fill="#111827" stroke="#374151" strokeWidth="4" />
          {/* Screen */}
          <rect x="5" y="5" width="290" height="150" rx="4" fill="#050505" />
          <rect x="5" y="5" width="290" height="150" rx="4" fill="url(#screenGlow)" />
          
          {/* Rendered Terminal Output on Screen */}
          <foreignObject x="15" y="15" width="270" height="130">
            <div className="w-full h-full font-mono text-[10px] sm:text-[11px] leading-tight overflow-hidden text-emerald-400 whitespace-pre-wrap">
              {typedText}
              <motion.div 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-2 h-3 bg-emerald-400 align-middle ml-1"
              />
            </div>
          </foreignObject>
        </motion.g>

        {/* Left Monitor (VS Code Style) */}
        <motion.g transform="translate(10, 120) rotate(15)">
          {/* Stand */}
          <rect x="55" y="140" width="20" height="50" fill="#374151" />
          <path d="M 30 190 L 100 190 L 110 200 L 20 200 Z" fill="#4b5563" />
          {/* Bezel */}
          <rect x="0" y="0" width="130" height="150" rx="8" fill="#111827" stroke="#374151" strokeWidth="4" />
          {/* Screen */}
          <rect x="5" y="5" width="120" height="140" rx="4" fill="#1e1e1e" />
          {/* VS Code MiniMap/Sidebar */}
          <rect x="5" y="5" width="20" height="140" fill="#252526" />
          {/* Code Lines */}
          <rect x="35" y="20" width="70" height="4" fill="#569cd6" />
          <rect x="35" y="30" width="50" height="4" fill="#ce9178" />
          <rect x="45" y="40" width="60" height="4" fill="#dcdcaa" />
          <rect x="45" y="50" width="40" height="4" fill="#9cdcfe" />
          <rect x="35" y="70" width="80" height="4" fill="#4ec9b0" />
          <rect x="45" y="80" width="50" height="4" fill="#dcdcaa" />
        </motion.g>

        {/* Right Monitor (Network Telemetry) */}
        <motion.g transform="translate(450, 120) rotate(-15)">
          {/* Stand */}
          <rect x="55" y="140" width="20" height="50" fill="#374151" />
          <path d="M 30 190 L 100 190 L 110 200 L 20 200 Z" fill="#4b5563" />
          {/* Bezel */}
          <rect x="0" y="0" width="130" height="150" rx="8" fill="#111827" stroke="#374151" strokeWidth="4" />
          {/* Screen */}
          <rect x="5" y="5" width="120" height="140" rx="4" fill="#050505" />
          {/* Animated Sine Waves */}
          <motion.path 
            d="M 5 70 Q 35 20, 65 70 T 125 70" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="3"
            animate={{ d: ["M 5 70 Q 35 20, 65 70 T 125 70", "M 5 70 Q 35 120, 65 70 T 125 70", "M 5 70 Q 35 20, 65 70 T 125 70"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 5 100 Q 35 50, 65 100 T 125 100" 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth="2"
            animate={{ d: ["M 5 100 Q 35 50, 65 100 T 125 100", "M 5 100 Q 35 150, 65 100 T 125 100", "M 5 100 Q 35 50, 65 100 T 125 100"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Illuminated Mechanical Keyboard */}
        <motion.g transform="translate(220, 370)">
          <path d="M 10 0 L 150 0 L 170 40 L -10 40 Z" fill="#111827" stroke="#374151" strokeWidth="2" />
          <path d="M 15 5 L 145 5 L 160 35 L -5 35 Z" fill="#0f172a" />
          {/* Keyboard RGB Glow */}
          <path d="M 15 5 L 145 5 L 160 35 L -5 35 Z" fill="none" stroke="#00f2fe" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" />
        </motion.g>

        {/* Developer (Seen from Behind) */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          {/* Gaming Chair Back */}
          <path d="M 230 300 L 370 300 L 400 550 L 200 550 Z" fill="#0f172a" stroke="#00f2fe" strokeWidth="2" />
          {/* Chair Lumbar/Cushioning */}
          <path d="M 260 280 L 340 280 L 360 400 L 240 400 Z" fill="#1e293b" />
          {/* Chair Neon Accents */}
          <path d="M 260 280 L 340 280" fill="none" stroke="#00f2fe" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
          
          {/* Developer Shoulders & Hoodie */}
          <path d="M 180 340 Q 300 280 420 340 L 440 550 L 160 550 Z" fill="url(#hoodieGlow)" />
          
          {/* Head (Hoodie Back) */}
          <ellipse cx="300" cy="250" rx="60" ry="65" fill="#0f172a" />
          <ellipse cx="300" cy="245" rx="50" ry="55" fill="#1a1a2e" />
          
          {/* Left Arm/Sleeve */}
          <motion.g
            animate={{ rotate: [-1, 2, -1], x: [0, 3, 0], y: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 0.2, ease: "easeInOut" }}
            style={{ transformOrigin: "180px 340px" }}
          >
            <path d="M 180 340 Q 150 400 220 400" fill="none" stroke="#16213e" strokeWidth="40" strokeLinecap="round" />
            <circle cx="230" cy="395" r="18" fill="#fca5a5" />
          </motion.g>

          {/* Right Arm/Sleeve */}
          <motion.g
            animate={{ rotate: [1, -2, 1], x: [0, -3, 0], y: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 0.18, ease: "easeInOut" }}
            style={{ transformOrigin: "420px 340px" }}
          >
            <path d="M 420 340 Q 450 400 380 400" fill="none" stroke="#16213e" strokeWidth="40" strokeLinecap="round" />
            <circle cx="370" cy="395" r="18" fill="#fca5a5" />
          </motion.g>
          
          {/* Headphones Band */}
          <path d="M 235 240 A 65 65 0 0 1 365 240" fill="none" stroke="#00f2fe" strokeWidth="8" strokeLinecap="round" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
