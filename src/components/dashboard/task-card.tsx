"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PlayCircle, FileText, Wrench, Code2, Zap, Clock } from "lucide-react";
import { Task, taskTypeConfig } from "@/lib/sample-tasks";

const taskTypeIcons = {
  video: PlayCircle,
  article: FileText,
  practice: Wrench,
  project: Code2,
};

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  index?: number;
}

export function TaskCard({ task, onToggleComplete, index = 0 }: TaskCardProps) {
  const config = taskTypeConfig[task.type];
  const Icon = taskTypeIcons[task.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`group relative p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
      }`}
    >
      <div className="flex items-start gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-slate-600 hover:border-blue-500 hover:bg-blue-500/10"
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle2 className="w-4 h-4" />
            </motion.div>
          )}
        </motion.button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={`font-medium transition-all duration-200 ${
                task.completed
                  ? "text-slate-500 line-through"
                  : "text-white group-hover:text-blue-300"
              }`}
            >
              {task.title}
            </h3>
          </div>

          <p
            className={`text-sm mb-3 line-clamp-2 ${
              task.completed ? "text-slate-600" : "text-slate-400"
            }`}
          >
            {task.description}
          </p>

          <div className="flex items-center flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${config.bgColor} ${config.color}`}
            >
              <span>{config.icon}</span>
              <span>{config.label}</span>
            </span>

            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {task.duration}
            </span>

            {!task.completed && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 ml-auto"
              >
                <Zap className="w-3 h-3" />
                +{task.xp} XP
              </motion.span>
            )}

            {task.completed && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 ml-auto">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {task.completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-r from-emerald-500/5 to-transparent"
        />
      )}
    </motion.div>
  );
}
