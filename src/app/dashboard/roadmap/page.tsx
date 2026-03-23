"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  Wrench,
  Code2,
  CheckCircle2,
  Circle,
  Clock,
  Zap,
  ArrowLeft,
  Calendar,
  Award,
  ChevronRight,
} from "lucide-react";
import type { GeneratedRoadmap, RoadmapPhase, RoadmapWeek, RoadmapTask } from "@/lib/ai-roadmap";

const taskTypeIcons = {
  video: PlayCircle,
  article: FileText,
  practice: Wrench,
  project: Code2,
};

const taskTypeColors = {
  video: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  article: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  practice: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  project: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

function WeekCard({ week, isCompleted }: { week: RoadmapWeek; isCompleted: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalXP = week.tasks.reduce((acc, t) => acc + t.xp, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-900/50 border rounded-xl overflow-hidden transition-all ${
        isCompleted ? "border-emerald-500/30" : "border-slate-800"
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isCompleted
                ? "bg-emerald-500 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <span className="text-sm font-bold">{week.week}</span>
            )}
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-white">Week {week.week}</h4>
            <p className="text-sm text-slate-400">{week.theme}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-1 text-amber-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">{totalXP} XP</span>
            </div>
            <div className="text-xs text-slate-500">{week.tasks.length} tasks</div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {week.tasks.map((task, idx) => (
                <TaskItem key={idx} task={task} />
              ))}
              {week.project && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <Code2 className="w-4 h-4" />
                    <span>Capstone: {week.project}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TaskItem({ task }: { task: RoadmapTask }) {
  const Icon = taskTypeIcons[task.type];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${taskTypeColors[task.type]}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h5 className="font-medium text-white text-sm">{task.title}</h5>
        </div>
        <p className="text-xs text-slate-400 mb-2 line-clamp-2">{task.description}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {task.duration}
          </span>
          {task.resource && (
            <span className="text-blue-400 truncate max-w-[150px]">{task.resource}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 text-amber-400 flex-shrink-0">
        <Zap className="w-3 h-3" />
        <span className="text-xs font-medium">{task.xp}</span>
      </div>
    </motion.div>
  );
}

function PhaseTab({ phase, isActive, onClick }: { phase: RoadmapPhase; isActive: boolean; onClick: () => void }) {
  const completedWeeks = 0;
  const totalWeeks = phase.weeks.length;
  const progress = (completedWeeks / totalWeeks) * 100;

  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl transition-all ${
        isActive
          ? "bg-blue-500/10 text-blue-400"
          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div>
          <h3 className="font-semibold text-sm">{phase.name}</h3>
          <p className="text-xs text-slate-500">{phase.duration}</p>
        </div>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"
          />
        )}
      </div>
      <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </button>
  );
}

export default function RoadmapPage() {
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load from localStorage first
    const stored = localStorage.getItem("userRoadmap");
    if (stored) {
      setRoadmap(JSON.parse(stored));
      setLoading(false);
      return;
    }
    // If not found, redirect to onboarding
    router.push("/onboarding");
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin" />
          <p className="text-slate-400">Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return null;
  }

  const totalXP = roadmap.phases.reduce(
    (acc, phase) =>
      acc + phase.weeks.reduce((wAcc, week) => wAcc + week.tasks.reduce((tAcc, t) => tAcc + t.xp, 0), 0),
    0
  );

  const currentPhase = roadmap.phases[activePhase];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{roadmap.specialization.name}</h1>
            <p className="text-slate-400">{roadmap.specialization.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-400">{totalXP}</div>
              <div className="text-xs text-slate-500">Total XP</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{roadmap.totalDuration}</div>
              <div className="text-xs text-slate-500">Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {roadmap.phases.reduce((acc, p) => acc + p.weeks.length, 0)}
              </p>
              <p className="text-xs text-slate-400">Total Weeks</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {roadmap.phases.length}
              </p>
              <p className="text-xs text-slate-400">Phases</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {roadmap.phases.reduce(
                  (acc, p) => acc + p.weeks.filter((w) => w.project).length,
                  0
                )}
              </p>
              <p className="text-xs text-slate-400">Projects</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {roadmap.phases.map((phase, idx) => (
            <PhaseTab
              key={phase.name}
              phase={phase}
              isActive={activePhase === idx}
              onClick={() => setActivePhase(idx)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{currentPhase.name}</h2>
          <span className="text-sm text-slate-400">{currentPhase.duration}</span>
        </div>

        <div className="space-y-4">
          {currentPhase.weeks.map((week, idx) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <WeekCard week={week} isCompleted={false} />
            </motion.div>
          ))}
        </div>
      </div>

      {roadmap.resources.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Resources</h2>
          <div className="grid grid-cols-2 gap-4">
            {roadmap.resources.map((resource, idx) => (
              <motion.a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                    {resource.title}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">{resource.type}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
