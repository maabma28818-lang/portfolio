"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type OutputLine = {
  type: "input" | "output" | "error" | "system";
  content: string;
};

const STATIC_COMMANDS: Record<string, string> = {
  "whoami": "Mohammed Abdullah Mahmood\nDegree: B.Tech Information Technology at Ratan Tata Maharashtra State Skills University\nFocus Areas:\n1. Full Stack Development & UI/UX Design\n2. Cybersecurity & Defensive Engineering\n3. Software Engineering & System Architecture",
  "about": "Mohammed Abdullah Mahmood\nDegree: B.Tech Information Technology at Ratan Tata Maharashtra State Skills University\nFocus Areas:\n1. Full Stack Development & UI/UX Design\n2. Cybersecurity & Defensive Engineering\n3. Software Engineering & System Architecture",
  "skills": "Development: Python (Flask, Django), Java, HTML5/CSS3, JS (ES6+), React\nSecurity: Penetration Testing, Kali Linux, Web & Cloud Security, Incident Response, OWASP\nArchitecture: MySQL, MongoDB, SQLite, SQLAlchemy, OOAD, OS Admin, Cloud Computing\nDesign: Figma, Responsive Design, UI/UX",
  "projects": "- HealthConnect: Intelligent Digital Healthcare Platform (AI/ML, Python, Flask, Groq API) - https://github.com/maabma28818-lang/healthconnect\n- SERA: Speech Emotion Detection System (Deep Learning, TensorFlow, Audio DSP) - https://github.com/maabma28818-lang/sera\n- Nazara MIS: Enterprise MIS Portal (Python, MySQL, Chart.js, Security)\n- LMS: Library Automation System (Java, MySQL, JDBC) - https://github.com/maabma28818-lang/library-system",
  "security": "Focus: Proactive cybersecurity methodologies, Penetration Testing, Web & Cloud Security, Incident Response, Network Footprinting, Vulnerability Analysis.\nTooling: Kali Linux, Custom Bash scripts, Nmap, OWASP best practices.",
  "education": "Degree: B.Tech Information Technology (2024–Present)\nUniversity: Ratan Tata Maharashtra State Skills University",
  "contact": "Email: maabma28818@gmail.com\nGitHub: https://github.com/maabma28818-lang\nLinkedIn: https://linkedin.com/in/mohammed-abdullah-mahmood-a057203a2",
  "help": "Available commands:\n- whoami / about : Displays my background and focus areas.\n- skills         : Categorized list of technical skills.\n- projects       : Summary and links to my major projects.\n- security       : Details on my cybersecurity focus and tooling.\n- education      : My academic background.\n- contact        : How to reach me.\n- ask <query>    : Ask a question about my background, projects, or stack.\n- clear          : Clears the terminal output.",
};

const processAskQuery = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("name") || lowerQuery.includes("who")) {
    return "I am Mohammed Abdullah Mahmood.";
  }
  if (lowerQuery.includes("university") || lowerQuery.includes("college") || lowerQuery.includes("education") || lowerQuery.includes("degree")) {
    return "I am pursuing a B.Tech in Information Technology at Ratan Tata Maharashtra State Skills University (2024–Present).";
  }
  if (lowerQuery.includes("skill") || lowerQuery.includes("tech") || lowerQuery.includes("stack")) {
    return "My core stack includes Python, Java, JavaScript, React, MySQL, MongoDB, and Kali Linux. I bridge Full Stack UI/UX with Cybersecurity and System Architecture.";
  }
  if (lowerQuery.includes("project") || lowerQuery.includes("work") || lowerQuery.includes("portfolio")) {
    return "I've built several systems including HealthConnect (AI healthcare), SERA (Speech Emotion Detection), an Enterprise MIS for Nazara Technologies, and a Library Management System.";
  }
  if (lowerQuery.includes("security") || lowerQuery.includes("hack") || lowerQuery.includes("cyber")) {
    return "I specialize in Penetration Testing, Incident Response, Network Footprinting, and Web/Cloud Security using tools like Kali Linux.";
  }
  if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("hire") || lowerQuery.includes("linkedin")) {
    return "You can reach me at maabma28818@gmail.com, or find me on LinkedIn and GitHub.";
  }
  
  return "I don't have specific information on that. Try asking about my 'education', 'skills', 'projects', or 'security' background. Or type 'help' for standard commands.";
};

export default function TerminalSandbox() {
  const [history, setHistory] = useState<OutputLine[]>([
    { type: "system", content: "Knowledge Shell v2.0 - Verified Fact Engine" },
    { type: "system", content: "Type 'help' to see available commands or try 'ask <question>'." },
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
    const cmdStr = input.trim();
    if (!cmdStr) return;

    setInput("");
    
    setHistory((prev) => [...prev, { type: "input", content: cmdStr }]);

    if (cmdStr === "clear") {
      setHistory([]);
      return;
    }

    let response = "";
    
    if (cmdStr.startsWith("ask ")) {
      const query = cmdStr.substring(4).trim();
      response = processAskQuery(query);
    } else {
      response = STATIC_COMMANDS[cmdStr];
    }
    
    if (response) {
      const lines = response.split("\n");
      lines.forEach((line, i) => {
        setTimeout(() => {
          setHistory((prev) => [...prev, { type: "output", content: line }]);
        }, (i + 1) * 100);
      });
    } else {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { 
            type: "error", 
            content: `Command not found: ${cmdStr}. Type 'help' for valid commands.` 
          }
        ]);
      }, 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full rounded-xl overflow-hidden glass border border-white/10 shadow-2xl flex flex-col bg-[#0d0d18]/80 backdrop-blur-md h-auto md:h-[500px]"
      onClick={() => { if (!isMobile) inputRef.current?.focus(); }}
    >
      {/* Terminal Header */}
      <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs font-mono text-white/40">abdullah@sandbox:~</span>
      </div>

      {/* Terminal Body */}
      {isMobile ? (
        <div className="flex-1 p-4 font-mono text-sm space-y-6">
          <div className="text-white/40 mb-4">Static View (Mobile Optimized)</div>
          {Object.entries(STATIC_COMMANDS).filter(([cmd]) => cmd !== "clear" && cmd !== "about").map(([cmd, res], idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-white"><span className="text-neon-purple mr-2">$</span>{cmd}</div>
              <div className="text-neon-cyan whitespace-pre-wrap leading-relaxed">{res}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm sm:text-base">
          {history.map((line, i) => (
            <div
              key={i}
              className={`mb-2 ${
                line.type === "input"
                  ? "text-white"
                  : line.type === "error"
                  ? "text-red-400"
                  : line.type === "system"
                  ? "text-white/40"
                  : "text-neon-cyan leading-relaxed"
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {line.type === "input" && <span className="text-neon-purple mr-2">$</span>}
              {line.content}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex items-center mt-4">
            <span className="text-neon-purple mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white font-mono"
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
