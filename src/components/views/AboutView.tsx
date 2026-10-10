"use client";

import portfolioData from "@/data/portfolio.json";

export default function AboutView() {
  const { developer } = portfolioData;

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">About Me</h2>
        <p className="mt-2 text-lg text-foreground/60">A brief introduction.</p>
      </div>
      
      <div className="bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="prose prose-invert max-w-none text-foreground/80 leading-loose">
          <p className="text-lg">
            {developer.bio}
          </p>
          <p className="text-lg mt-4">
            I am a passionate software engineer with a strong focus on building scalable, performant, and beautifully animated user interfaces. I believe that a great user experience comes from the careful balance of aesthetics, fluid transitions, and underlying structural integrity.
          </p>
          <p className="text-lg mt-4">
            When I'm not writing code, you can find me exploring new design trends, contributing to open-source projects, or learning about the next big thing in web technologies.
          </p>
        </div>
      </div>
    </div>
  );
}
