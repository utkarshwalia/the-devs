"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface QuizStepProps {
  children: ReactNode;
  direction: number;
}

export function QuizStep({ children, direction }: QuizStepProps) {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={Math.random()}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function QuizContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {children}
    </div>
  );
}

export function QuizTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-white mb-2">
      {children}
    </h2>
  );
}

export function QuizSubtitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-slate-400 mb-6">
      {children}
    </p>
  );
}

export function QuizOptions({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3">
      {children}
    </div>
  );
}
