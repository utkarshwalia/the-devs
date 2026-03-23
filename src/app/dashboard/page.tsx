"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Flame,
  Zap,
  Trophy,
  Target,
  CheckCircle2,
  Calendar,
  Map,
  ArrowRight,
  Clock,
  PlayCircle,
  FileText,
  Wrench,
  Code2,
} from "lucide-react";
import type { GeneratedRoadmap, RoadmapWeek, RoadmapTask } from "@/lib/ai-roadmap";

const taskTypeIcons = {
  video: PlayCircle,
  article: FileText,
  practice: Wrench,
  project: Code2,
};

const taskTypeColors = {
  video: "text-blue-400",
  article: "text-purple-400",
  practice: "text-amber-400",
  project: "text-emerald-400",
};

const userData = {
  name: "Utkarsh",
  level: 5,
  xp: 2450,
  xpToNextLevel: 3000,
  streak: 7,
  tasksCompletedToday: 3,
  totalTasksCompleted: 47,
  projectsDone: 4,
};

const todayTasks = [
  { id: 1, title: "Complete React hooks tutorial", completed: true },
  { id: 2, title: "Build a Todo App component", completed: true },
  { id: 3, title: "Practice TypeScript generics", completed: true },
  { id: 4, title: "Read about Next.js App Router", completed: false },
];

const quickStats = [
  { label: "Tasks Today", value: "3/4", icon: Target, color: "text-blue-400" },
  { label: "This Week", value: "21", icon: Calendar, color: "text-emerald-400" },
  { label: "Streak", value: "7 days", icon: Flame, color: "text-orange-400" },
  { label: "Projects", value: "4", icon: Trophy, color: "text-purple-400" },
];

function CurrentWeekTasks({ roadmap }: { roadmap: GeneratedRoadmap }) {
  const currentWeekIndex = 0;
  const currentPhase = roadmap.phases[0];
  const currentWeek: RoadmapWeek | undefined = currentPhase?.weeks[currentWeekIndex];

  if (!currentWeek) return null;

  return (
    <div className="space-y-3">
      {currentWeek.tasks.slice(0, 3).map((task, idx) => {
        const Icon = taskTypeIcons[task.type];
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
            className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
          >
            <Icon className={`w-5 h-5 ${taskTypeColors[task.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{task.title}</p>
              <p className="text-xs text-slate-500">{task.duration}</p>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <Zap className="w-3 h-3" />
              <span className="text-xs">{task.xp} XP</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function RoadmapPreview({ roadmap }: { roadmap: GeneratedRoadmap }) {
  const totalWeeks = roadmap.phases.reduce((acc, p) => acc + p.weeks.length, 0);
  const totalXP = roadmap.phases.reduce(
    (acc, p) => acc + p.weeks.reduce((wAcc, w) => wAcc + w.tasks.reduce((tAcc, t) => tAcc + t.xp, 0), 0),
    0
  );
  const totalProjects = roadmap.phases.reduce(
    (acc, p) => acc + p.weeks.filter((w) => w.project).length,
    0
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <p className="text-2xl font-bold text-white">{totalWeeks}</p>
        <p className="text-xs text-slate-500">Weeks</p>
      </div>
      <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <p className="text-2xl font-bold text-amber-400">{totalXP}</p>
        <p className="text-xs text-slate-500">Total XP</p>
      </div>
      <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <p className="text-2xl font-bold text-emerald-400">{totalProjects}</p>
        <p className="text-xs text-slate-500">Projects</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
  const xpProgress = (userData.xp / userData.xpToNextLevel) * 100;

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const response = await fetch("/api/roadmap");
        const data = await response.json();
        if (data.roadmap) {
          setRoadmap(data.roadmap);
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    }
    fetchRoadmap();
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {userData.name}! 👋
        </h1>
        <p className="text-slate-400">
          Ready to continue your learning journey? You&apos;re on fire! 🔥
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Level Progress
                </h2>
                <p className="text-sm text-slate-500">
                  {userData.xp} / {userData.xpToNextLevel} XP to Level {userData.level + 1}
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">
                  Level {userData.level}
                </span>
              </div>
            </div>

            <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] animate-[slide_1s_infinite_linear]" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Today&apos;s Tasks
              </h2>
              <span className="text-sm text-slate-500">
                {todayTasks.filter((t) => t.completed).length}/{todayTasks.length} done
              </span>
            </div>

            <div className="space-y-3">
              {todayTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    task.completed
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-slate-800/50 border border-slate-700/50"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.completed
                        ? "bg-emerald-500 text-white"
                        : "border-2 border-slate-600"
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span
                    className={`flex-1 ${
                      task.completed ? "text-slate-400 line-through" : "text-white"
                    }`}
                  >
                    {task.title}
                  </span>
                  {!task.completed && (
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      In Progress
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {roadmap && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Map className="w-5 h-5 text-purple-400" />
                  Your Roadmap
                </h2>
                <Link
                  href="/dashboard/roadmap"
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Full Roadmap
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-slate-400 text-sm mb-4">
                {roadmap.specialization.name} • {roadmap.totalDuration}
              </p>

              <RoadmapPreview roadmap={roadmap} />

              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-2">This Week&apos;s Focus</p>
                <CurrentWeekTasks roadmap={roadmap} />
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{userData.streak}</div>
              <div className="text-sm text-slate-400 mb-4">Day Streak!</div>
              <p className="text-xs text-slate-500">
                Keep it up! Complete today&apos;s tasks to maintain your streak.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {!roadmap && (
                <Link
                  href="/onboarding"
                  className="w-full flex items-center gap-2 px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-medium transition-colors"
                >
                  <Map className="w-4 h-4" />
                  Take Assessment
                </Link>
              )}
              <button className="w-full px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-purple-400 text-sm font-medium transition-colors text-left">
                Browse Projects
              </button>
              <button className="w-full px-4 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium transition-colors text-left">
                Check Job Listings
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Next Achievement</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Task Master</p>
                <p className="text-sm text-slate-500">Complete 50 tasks</p>
                <p className="text-xs text-blue-400">10 more to go!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
