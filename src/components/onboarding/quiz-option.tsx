"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface QuizOptionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  multiSelect?: boolean;
}

export function QuizOption({
  title,
  description,
  icon,
  selected,
  onClick,
  multiSelect = false,
}: QuizOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 relative",
        selected
          ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
          : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
              selected ? "bg-blue-500/20 text-blue-400" : "bg-slate-700 text-slate-400"
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold mb-1", selected ? "text-white" : "text-slate-200")}>
            {title}
          </h3>
          {description && (
            <p className="text-sm text-slate-400 line-clamp-2">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            selected
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-slate-600"
          )}
        >
          {selected && <Check className="w-4 h-4" />}
        </div>
      </div>
      {selected && (
        <motion.div
          layoutId="selectedIndicator"
          className="absolute inset-0 rounded-xl border-2 border-blue-500 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}

interface QuizMultiOptionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function QuizMultiOption({
  title,
  description,
  icon,
  selected,
  onClick,
}: QuizMultiOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 relative",
        selected
          ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
          : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
              selected ? "bg-blue-500/20 text-blue-400" : "bg-slate-700 text-slate-400"
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold mb-1", selected ? "text-white" : "text-slate-200")}>
            {title}
          </h3>
          {description && (
            <p className="text-sm text-slate-400 line-clamp-2">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            selected
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-slate-600"
          )}
        >
          {selected && <Check className="w-4 h-4" />}
        </div>
      </div>
    </motion.button>
  );
}
