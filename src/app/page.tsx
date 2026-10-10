"use client";

import { useSearchParams } from "next/navigation";
import PageTransition from "@/components/transitions/PageTransition";
import HomeView from "@/components/views/HomeView";
import AboutView from "@/components/views/AboutView";
import ProjectsView from "@/components/views/ProjectsView";
import SkillsView from "@/components/views/SkillsView";
import { Suspense } from "react";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "home";

  const renderView = () => {
    switch (view) {
      case "about":
        return <AboutView />;
      case "projects":
        return <ProjectsView />;
      case "skills":
        return <SkillsView />;
      case "home":
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-hidden">
      
      <main className="relative w-full max-w-5xl mx-auto h-full p-6 pb-32 overflow-y-auto custom-scrollbar z-10">
        <PageTransition viewKey={view}>
          {renderView()}
        </PageTransition>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
