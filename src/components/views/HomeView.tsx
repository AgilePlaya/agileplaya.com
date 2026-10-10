"use client";

import portfolioData from "@/data/portfolio.json";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
};

export default function HomeView() {
  const { developer } = portfolioData;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{developer.name}</span>
        </h1>
        <p className="text-xl md:text-3xl font-medium text-foreground/80">
          {developer.title}
        </p>
      </div>
      
      <p className="max-w-xl text-lg text-foreground/60 leading-relaxed">
        {developer.bio}
      </p>

      <div className="flex gap-4 pt-4">
        {developer.socials.map((social) => {
          const Icon = iconMap[social.icon as keyof typeof iconMap];
          return (
            <Link
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md hover:bg-white/30 dark:hover:bg-black/60 border border-black/5 dark:border-white/10 transition-colors duration-300 shadow-md"
            >
              {Icon && <Icon className="w-6 h-6" />}
              <span className="sr-only">{social.platform}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
