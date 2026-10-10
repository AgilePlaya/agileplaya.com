"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Home, User, Briefcase, Code } from "lucide-react";
import clsx from "clsx";

export const VIEWS = ["home", "about", "projects", "skills"] as const;
export type View = typeof VIEWS[number];

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "skills", icon: Code, label: "Skills" },
];

function NavigationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentView = (searchParams.get("view") as View) || "home";

  const handleNav = (view: string) => {
    router.push(`/?view=${view}`, { scroll: false });
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-2 p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = currentView === id;
          return (
            <li key={id}>
              <button
                onClick={() => handleNav(id)}
                className={clsx(
                  "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg scale-110"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5"
                )}
                aria-label={label}
                title={label}
              >
                <Icon className="w-5 h-5 z-10" />
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Navigation() {
  return (
    <Suspense fallback={null}>
      <NavigationContent />
    </Suspense>
  );
}
