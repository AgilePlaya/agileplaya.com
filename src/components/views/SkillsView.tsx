"use client";

import portfolioData from "@/data/portfolio.json";
import { CheckCircle2 } from "lucide-react";

export default function SkillsView() {
  const { skills } = portfolioData;

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Technical Skills</h2>
        <p className="mt-2 text-lg text-foreground/60">Technologies and tools I work with.</p>
      </div>
      
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 pb-8">
        {skills.map((skill) => (
          <div 
            key={skill} 
            className="flex items-center gap-3 bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-xl p-4 hover:bg-white/30 dark:hover:bg-black/50 transition-colors duration-300 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="font-medium text-sm">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
