"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HoverContextType {
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: ReactNode }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredSkill, setHoveredSkill }}>
      {children}
    </HoverContext.Provider>
  );
}

export function useHoverContext() {
  const context = useContext(HoverContext);
  if (context === undefined) {
    throw new Error("useHoverContext must be used within a HoverProvider");
  }
  return context;
}
