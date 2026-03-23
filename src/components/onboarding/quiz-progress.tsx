"use client";

import { motion } from "framer-motion";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-400">Step {currentStep + 1} of {totalSteps}</span>
        <span className="text-sm text-blue-400 font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </div>
  );
}
