"use client";

import { motion } from "framer-motion";
import { Flame, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface StreakDisplayProps {
  streak: number;
  completedDays?: Date[];
  currentMonth?: Date;
  onMonthChange?: (month: Date) => void;
}

export function StreakDisplay({
  streak,
  completedDays = [],
  currentMonth = new Date(),
  onMonthChange,
}: StreakDisplayProps) {
  const completedDates = completedDays.map((d) => d.toDateString());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    onMonthChange?.(prev);
  };

  const nextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    onMonthChange?.(next);
  };

  const today = new Date().toDateString();
  const isCurrentMonth =
    currentMonth.getMonth() === new Date().getMonth() &&
    currentMonth.getFullYear() === new Date().getFullYear();

  return (
    <div className="p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center"
          >
            <Flame className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <div className="text-3xl font-bold text-white">{streak}</div>
            <div className="text-sm text-slate-400">Day Streak</div>
          </div>
        </div>
      </div>

      {streak > 0 && (
        <p className="text-sm text-orange-300 mb-4 flex items-center gap-1">
          <span className="text-lg">🔥</span>
          Keep it going! Complete today&apos;s tasks!
        </p>
      )}

      <div className="bg-slate-900/50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Calendar className="w-4 h-4 text-slate-400" />
            {monthName}
          </div>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div
              key={i}
              className="text-xs font-medium text-slate-500 py-1"
            >
              {day}
            </div>
          ))}

          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="py-1" />;
            }

            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );
            const dateString = date.toDateString();
            const isCompleted = completedDates.includes(dateString);
            const isToday = dateString === today;
            const isFuture = date > new Date();

            return (
              <motion.div
                key={day}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: index * 0.01,
                }}
                className={`
                  relative py-1 text-xs rounded-md transition-all
                  ${isFuture ? "text-slate-600" : "text-white"}
                  ${isCompleted ? "bg-emerald-500/20 text-emerald-400" : ""}
                  ${isToday && !isCompleted ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50" : ""}
                `}
              >
                {day}
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-emerald-400">✓</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-emerald-500/50" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-blue-500/50 ring-1 ring-blue-500" />
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
