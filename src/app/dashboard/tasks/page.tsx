"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Target, CheckCircle2, Clock, Flame, ChevronDown } from "lucide-react";
import { TaskCard } from "@/components/dashboard/task-card";
import { XPPopup, LevelUpPopup } from "@/components/dashboard/xp-popup";
import { StatsBar } from "@/components/dashboard/stats-bar";
import { StreakDisplay } from "@/components/dashboard/streak-display";
import { sampleTasks, Task, getLevelFromXP, getXPProgress } from "@/lib/sample-tasks";

const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const completedDates = [
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [showXP, setShowXP] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [streakMonth, setStreakMonth] = useState(new Date());

  const userXP = tasks.reduce((acc, task) => (task.completed ? acc + task.xp : acc), 0);
  const level = getLevelFromXP(userXP);
  const xpProgress = getXPProgress(userXP);
  const currentStreak = 7;

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          if (newCompleted) {
            setXpAmount(task.xp);
            setShowXP(true);

            const newXP = prev.reduce((acc, t) => (t.id === taskId ? acc + t.xp : t.completed ? acc + t.xp : acc), 0) + task.xp;
            const potentialLevel = getLevelFromXP(newXP);
            if (potentialLevel > level) {
              setNewLevel(potentialLevel);
              setShowLevelUp(true);
            }
          }
          return {
            ...task,
            completed: newCompleted,
            completedAt: newCompleted ? new Date() : undefined,
          };
        }
        return task;
      })
    );
  }, [level]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const tasksByType = {
    video: filteredTasks.filter((t) => t.type === "video"),
    article: filteredTasks.filter((t) => t.type === "article"),
    practice: filteredTasks.filter((t) => t.type === "practice"),
    project: filteredTasks.filter((t) => t.type === "project"),
  };

  return (
    <div className="max-w-6xl">
      <XPPopup amount={xpAmount} trigger={showXP} onComplete={() => setShowXP(false)} />
      <LevelUpPopup level={newLevel} trigger={showLevelUp} onComplete={() => setShowLevelUp(false)} />

      <div className="mb-8">
        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formattedDate}</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Daily Tasks</h1>
        <p className="text-slate-400">
          Complete tasks to earn XP and maintain your streak! 🔥
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">Today&apos;s Progress</span>
              </div>
              <span className="text-sm text-slate-400">
                {completedCount} / {totalCount} tasks
              </span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>{completionPercentage.toFixed(0)}% complete</span>
              <span>
                {totalCount - completedCount} tasks remaining
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {(["all", "pending", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  index={index}
                />
              ))}
            </AnimatePresence>

            {filteredTasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <p className="text-lg font-medium text-white">All done!</p>
                <p className="text-sm text-slate-400">
                  {filter === "completed"
                    ? "No completed tasks yet. Start checking them off!"
                    : "You've completed all your tasks for today!"}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <StatsBar
            level={level}
            currentXP={xpProgress.current}
            xpToNextLevel={xpProgress.required}
            streak={currentStreak}
            totalXP={userXP}
          />

          <StreakDisplay
            streak={currentStreak}
            completedDays={completedDates}
            currentMonth={streakMonth}
            onMonthChange={setStreakMonth}
          />

          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              Today&apos;s Tasks by Type
            </h3>
            <div className="space-y-2">
              {Object.entries(tasksByType).map(([type, typeTasks]) => {
                const completed = typeTasks.filter((t) => t.completed).length;
                const total = typeTasks.length;
                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-slate-400 capitalize">{type}</span>
                    <span className="text-sm font-medium text-white">
                      {completed}/{total}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
