export type Project = {
  id: string;
  title: string;
  categories: string[];
  tags: string[];
  description: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  metric?: string;
};

export const projects: Project[] = [
  {
    id: "healthconnect",
    title: "HealthConnect",
    categories: ["AI/ML", "Full Stack"],
    tags: ["Python", "Flask", "Groq API (LLaMA-3.3-70B)", "SQLite", "PIL", "Multimodal AI"],
    description: "Intelligent Digital Healthcare Platform. AI-powered symptom analysis engine generating structured clinical insights, multimodal image diagnostics, and doctor appointment dispatch systems.",
    highlights: [
      "Sub-second inference via Groq Cloud",
      "Custom prompt pipelines",
      "Dual-role security dashboards"
    ],
    githubUrl: "https://github.com/maabma28818-lang/healthconnect",
    liveUrl: "#",
    metric: "< 1s Inference"
  },
  {
    id: "sera",
    title: "SERA",
    categories: ["AI/ML"],
    tags: ["TensorFlow", "CNN", "Librosa", "Mel-Spectrogram", "Flask", "Audio DSP"],
    description: "Speech Emotion Detection System. Deep-learning audio analysis pipeline classifying 8 human emotional states from live microphone streams and WAV inputs.",
    highlights: [
      "99% accuracy on 2,067 test samples",
      "Fast Fourier Transform feature extraction",
      "Real-time waveform visualizer UI"
    ],
    githubUrl: "https://github.com/maabma28818-lang/sera",
    metric: "99% Accuracy"
  },
  {
    id: "nazara-mis",
    title: "Nazara Technologies MIS",
    categories: ["Enterprise", "Full Stack"],
    tags: ["Python (Flask)", "MySQL", "Chart.js", "Bootstrap 5", "Corporate Security"],
    description: "Enterprise MIS Portal. Centralized executive information system unifying cross-title telemetry (Kiddopia, WCC, NODWIN eSports) using Cross-Title Stitching.",
    highlights: [
      "Automated unit economics dashboards (ARPU, LTV, CAC)",
      "M&A compliance scorecards",
      "Secret PIN role authentication"
    ],
    metric: "Enterprise Scale"
  },
  {
    id: "library-system",
    title: "Library Automation System",
    categories: ["Enterprise", "Full Stack"],
    tags: ["Java", "MySQL", "JDBC", "Full Stack Architecture"],
    description: "High-throughput inventory tracking and member lifecycle platform with split role-based access for admins and patrons.",
    highlights: [
      "High-throughput inventory tracking",
      "Role-based access controls",
      "Member lifecycle management"
    ],
    githubUrl: "https://github.com/maabma28818-lang/library-system",
    metric: "High Throughput"
  }
];
