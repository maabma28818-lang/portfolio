"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type OutputLine = {
  type: "input" | "output" | "error" | "system";
  content: string;
};

const COMMANDS: Record<string, string> = {
  "cat skills.txt": "Loading skills...\n[OK] Found 20+ specialized technologies.\n[OK] Core focus: Full Stack Engineering & AI Integration.",
  "npm run get-status": "> portfolio@0.1.0 get-status\n> Checking system vitals...\n\nStatus: ONLINE\nCoffee level: 85%\nReady to build: YES",
  "whoami": "Mohammed Abdullah Mahmood - Creative Developer & Tech Enthusiast",
  "help": "Available commands:\n- cat skills.txt\n- npm run get-status\n- whoami\n- clear",
};

export default function TerminalSandbox() {
  const [history, setHistory] = useState<OutputLine[]>([
    { type: "system", content: "Interactive Terminal Emulator v1.0.0" },
    { type: "system", content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setInput("");
    
    // Add user input to history
    setHistory((prev) => [...prev, { type: "input", content: `$ ${cmd}` }]);

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    // Process command
    const response = COMMANDS[cmd];
    
    if (response) {
      // Simulate typing delay for output
      const lines = response.split("\n");
      lines.forEach((line, i) => {
        setTimeout(() => {
          setHistory((prev) => [...prev, { type: "output", content: line }]);
        }, (i + 1) * 150);
      });
    } else {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { 
            type: "error", 
            content: `Command not found: ${cmd}. Type 'help' for valid commands.` 
          }
        ]);
      }, 150);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full rounded-xl overflow-hidden glass border border-white/10 shadow-2xl flex flex-col bg-[#050505]/90 backdrop-blur-2xl h-auto md:h-[500px]"
      onClick={() => { if (!isMobile) inputRef.current?.focus(); }}
    >
      {/* Terminal Header */}
      <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs font-mono text-white/40">developer@sandbox:~</span>
      </div>

      {/* Terminal Body */}
      {isMobile ? (
        <div className="flex-1 p-4 font-mono text-sm space-y-6">
          <div className="text-white/40 mb-4">Static View (Mobile Optimized)</div>
          {Object.entries(COMMANDS).filter(([cmd]) => cmd !== "clear").map(([cmd, res], idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-white"><span className="text-neon-purple mr-2">$</span>{cmd}</div>
              <div className="text-neon-cyan whitespace-pre-wrap">{res}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm sm:text-base">
          {history.map((line, i) => (
            <div
              key={i}
              className={`mb-1 ${
                line.type === "input"
                  ? "text-white"
                  : line.type === "error"
                  ? "text-red-400"
                  : line.type === "system"
                  ? "text-white/40"
                  : "text-neon-cyan"
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {line.content}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-neon-purple mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white font-mono"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      )}
    </motion.div>
  );
}
