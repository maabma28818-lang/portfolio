"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { projects as defaultProjects, type Project } from "@/data/projects";

// Default Data Fallbacks (used if localStorage is empty)
const DEFAULT_SKILLS = [
  "React.js / Next.js", "TypeScript / Node.js", "Tailwind CSS", 
  "Kali Linux", "Vulnerability Assessment", "Nmap / Burp Suite",
  "System Architecture", "Object-Oriented Design", "REST APIs"
];

const DEFAULT_CERTIFICATIONS = [
  {
    id: "cert-1",
    title: "IT Specialist — HTML and CSS",
    issuer: "Certiport (A Pearson VUE Business)",
    date: "May 2025",
    credentialId: "ovW3-uSrs",
    skills: ["Modern Semantic HTML5", "Responsive CSS3", "Grid/Flexbox Systems", "Web Accessibility"],
    link: "#"
  },
  {
    id: "cert-2",
    title: "Concepts and Azure AI Services for Automation and Collaboration",
    issuer: "Microsoft (Code Without Barriers)",
    date: "Feb / Mar 2025",
    credentialId: "2502007375",
    skills: ["Azure AI Services", "Cognitive APIs", "Cloud Automation", "AI Workflow Integration"],
    link: "#"
  },
  {
    id: "cert-3",
    title: "Cybersecurity & Penetration Testing Fundamentals",
    issuer: "Maharashtra State Skills University / Academic Training",
    date: "2025",
    credentialId: "Internal Academic Credential",
    skills: ["Kali Linux", "Nmap", "Vulnerability Assessment", "Network Footprinting", "Incident Response"],
    link: "#"
  },
  {
    id: "cert-4",
    title: "Object-Oriented Software Architecture & Java Systems",
    issuer: "Academic Project Certification / Department of IT",
    date: "2024–2025",
    credentialId: "Academic Verification",
    skills: ["Java Full Stack", "JDBC", "Enterprise Database Normalization", "Systems Design"],
    link: "#"
  }
];

export type Certification = typeof DEFAULT_CERTIFICATIONS[0];

interface CMSContextType {
  skills: string[];
  setSkills: (skills: string[]) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  certifications: Certification[];
  setCertifications: (certs: Certification[]) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [skills, setSkillsState] = useState<string[]>(DEFAULT_SKILLS);
  const [projects, setProjectsState] = useState<Project[]>(defaultProjects);
  const [certifications, setCertificationsState] = useState<Certification[]>(DEFAULT_CERTIFICATIONS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage
    const savedSkills = localStorage.getItem("cms_skills");
    if (savedSkills) setSkillsState(JSON.parse(savedSkills));

    const savedProjects = localStorage.getItem("cms_projects");
    if (savedProjects) setProjectsState(JSON.parse(savedProjects));

    const savedCerts = localStorage.getItem("cms_certifications");
    if (savedCerts) setCertificationsState(JSON.parse(savedCerts));

    setIsMounted(true);
  }, []);

  const setSkills = (newSkills: string[]) => {
    setSkillsState(newSkills);
    if (typeof window !== "undefined") {
      localStorage.setItem("cms_skills", JSON.stringify(newSkills));
    }
  };

  const setProjects = (newProjects: Project[]) => {
    setProjectsState(newProjects);
    if (typeof window !== "undefined") {
      localStorage.setItem("cms_projects", JSON.stringify(newProjects));
    }
  };

  const setCertifications = (newCerts: Certification[]) => {
    setCertificationsState(newCerts);
    if (typeof window !== "undefined") {
      localStorage.setItem("cms_certifications", JSON.stringify(newCerts));
    }
  };

  return (
    <CMSContext.Provider value={{ skills, setSkills, projects, setProjects, certifications, setCertifications }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
