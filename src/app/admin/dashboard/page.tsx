"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import portfolioData from "@/data/portfolio-data.json";
import { LogOut, Save, Plus, Trash2, ShieldCheck, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"skills" | "certifications" | "projects">("skills");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Local state for editing
  const [localSkills, setLocalSkills] = useState(portfolioData.skills);
  const [localCerts, setLocalCerts] = useState(portfolioData.certifications);
  const [localProjects, setLocalProjects] = useState(portfolioData.projects);

  useEffect(() => {
    // Route Guard
    const token = sessionStorage.getItem("admin_session");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    router.replace("/");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setToastMessage("");
    try {
      const data = {
        skills: localSkills,
        certifications: localCerts,
        projects: localProjects,
      };

      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save data");

      setToastMessage("Changes pushed to repository! Vercel is syncing your live site globally.");
      setTimeout(() => setToastMessage(""), 5000);
    } catch (error) {
      console.error(error);
      setToastMessage("Error pushing changes. Check console.");
      setTimeout(() => setToastMessage(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans selection:bg-cyan-500/30 pt-[var(--header-height)]">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              CMS Dashboard <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </h1>
            <p className="text-sm text-white/50">Manage public portfolio content in real-time</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 border border-red-500/20 transition-colors flex items-center gap-2 text-sm font-semibold"
        >
          <LogOut className="w-4 h-4" /> Lock & Logout
        </button>
      </div>

      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-6xl mx-auto flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {(["skills", "certifications", "projects"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl capitalize font-semibold transition-all whitespace-nowrap
              ${activeTab === tab ? "bg-white/10 text-white shadow-lg border border-white/20" : "text-white/50 hover:bg-white/5 hover:text-white/80"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto">
        
        {/* SKILLS TAB */}
        {activeTab === "skills" && (
          <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl bg-[#0d0d18]/80 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Skills Matrix</h2>
              <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 flex items-center gap-2 text-sm disabled:opacity-50">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {localSkills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg group">
                  <input 
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...localSkills];
                      newSkills[i] = e.target.value;
                      setLocalSkills(newSkills);
                    }}
                    className="bg-transparent border-none outline-none text-sm w-40 focus:w-48 transition-all"
                  />
                  <button 
                    onClick={() => setLocalSkills(localSkills.filter((_, idx) => idx !== i))}
                    className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setLocalSkills([...localSkills, "New Skill"])}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-cyan-400 hover:bg-white/10"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === "certifications" && (
          <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl bg-[#0d0d18]/80 backdrop-blur-md space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Certifications Manager</h2>
              <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 flex items-center gap-2 text-sm disabled:opacity-50">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
              </button>
            </div>

            <div className="space-y-4">
              {localCerts.map((cert, i) => (
                <div key={cert.id} className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row gap-4 relative group">
                  <button 
                    onClick={() => setLocalCerts(localCerts.filter((_, idx) => idx !== i))}
                    className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex-1 space-y-3">
                    <input 
                      value={cert.title} 
                      onChange={(e) => { const c = [...localCerts]; c[i].title = e.target.value; setLocalCerts(c); }}
                      className="w-full bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none text-lg font-bold pb-1"
                      placeholder="Title"
                    />
                    <div className="flex gap-4">
                      <input 
                        value={cert.issuer} 
                        onChange={(e) => { const c = [...localCerts]; c[i].issuer = e.target.value; setLocalCerts(c); }}
                        className="flex-1 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none text-sm text-white/70"
                        placeholder="Issuer"
                      />
                      <input 
                        value={cert.date} 
                        onChange={(e) => { const c = [...localCerts]; c[i].date = e.target.value; setLocalCerts(c); }}
                        className="w-32 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none text-sm text-white/70"
                        placeholder="Date"
                      />
                    </div>
                    <div className="flex gap-4">
                      <input 
                        value={cert.credentialId} 
                        onChange={(e) => { const c = [...localCerts]; c[i].credentialId = e.target.value; setLocalCerts(c); }}
                        className="flex-1 bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none text-sm text-white/70"
                        placeholder="Credential ID"
                      />
                      <input 
                        value={cert.skills.join(", ")} 
                        onChange={(e) => { const c = [...localCerts]; c[i].skills = e.target.value.split(",").map(s => s.trim()).filter(Boolean); setLocalCerts(c); }}
                        className="flex-[2] bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none text-sm text-white/70"
                        placeholder="Skills (comma separated)"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setLocalCerts([...localCerts, { id: `cert-${Date.now()}`, title: "New Cert", issuer: "Issuer", date: "Date", credentialId: "ID", skills: [], link: "#" }])}
                className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 border-dashed py-4 rounded-xl text-cyan-400 hover:bg-white/10 transition-colors"
              >
                <Plus className="w-5 h-5" /> Add New Certification
              </button>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl bg-[#0d0d18]/80 backdrop-blur-md space-y-6">
             <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Projects Editor</h2>
              <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 flex items-center gap-2 text-sm disabled:opacity-50">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
              </button>
            </div>

            <div className="space-y-4">
              {localProjects.map((project, i) => (
                <div key={project.id} className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col gap-3 relative">
                   <button 
                    onClick={() => setLocalProjects(localProjects.filter((_, idx) => idx !== i))}
                    className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <input 
                    value={project.title} 
                    onChange={(e) => { const p = [...localProjects]; p[i].title = e.target.value; setLocalProjects(p); }}
                    className="w-[90%] bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none text-xl font-bold pb-1"
                    placeholder="Project Title"
                  />
                  <textarea 
                    value={project.description} 
                    onChange={(e) => { const p = [...localProjects]; p[i].description = e.target.value; setLocalProjects(p); }}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-cyan-400 outline-none text-sm text-white/70 min-h-[80px]"
                    placeholder="Project Description"
                  />
                  <input 
                    value={project.tags?.join(", ") || ""} 
                    onChange={(e) => { const p = [...localProjects]; p[i].tags = e.target.value.split(",").map(s => s.trim()).filter(Boolean); setLocalProjects(p); }}
                    className="w-full bg-transparent border-b border-white/10 focus:border-cyan-400 outline-none text-sm text-white/70 mt-1 pb-1"
                    placeholder="Technologies Used (comma separated, e.g. React, Next.js, Tailwind)"
                  />
                  <div className="text-xs text-white/40 mt-1">Edit categories directly in the data structure for advanced schema validation.</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
