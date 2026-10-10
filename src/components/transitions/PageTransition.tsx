"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  viewKey: string;
}

const variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
};

export default function PageTransition({ children, viewKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 lg:p-24"
      >
        <div className="w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/5 dark:bg-black/10 border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 h-full max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
