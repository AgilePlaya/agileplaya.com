"use client";

import portfolioData from "@/data/portfolio.json";
import { ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import Link from "next/link";

export default function ProjectsView() {
  const { projects } = portfolioData;

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
        <p className="mt-2 text-lg text-foreground/60">A selection of my recent work.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-col bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-6 hover:bg-white/30 dark:hover:bg-black/50 transition-colors duration-300 shadow-xl"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-3 flex-grow text-sm text-foreground/70 leading-relaxed">
              {project.description}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary-foreground/80 dark:bg-white/10 dark:text-white border border-primary/20 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="mt-6 flex gap-4 pt-4 border-t border-white/10">
              {project.link && (
                <Link 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live
                </Link>
              )}
              {project.github && (
                <Link 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  <Github className="w-4 h-4" /> Code
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
