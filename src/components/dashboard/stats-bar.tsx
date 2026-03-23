"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Trophy } from "lucide-react";
import { AnimatedCounter, XPBar } from "@/components/ui/animated-counter";

interface StatsBarProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  streak: number;
  totalXP: number;
}

export function StatsBar({
  level,
  currentXP,
  xpToNextLevel,
  streak,
  totalXP,
}: StatsBarProps) {
  return (
    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-400">Your Stats</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-amber-400">
            Level {level}
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-400">XP Progress</span>
          </div>
          <motion.span
            key={currentXP}
            initial={{ scale: 1.2, color: "#fbbf24" }}
            animate={{ scale: 1, color: "#fbbf24" }}
            className="text-sm font-semibold text-amber-400"
          >
            +{currentXP.toLocaleString()}
          </motion.span>
        </div>
        <XPBar currentXP={currentXP} maxXP={xpToNextLevel} showLabel={false} height="h-2" />
        <p className="text-xs text-slate-500 mt-1">
          {currentXP.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP to Level {level + 1}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center"
          >
            <Flame className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <div className="text-xl font-bold text-white flex items-baseline gap-1">
              <AnimatedCounter value={streak} />
              <span className="text-sm font-normal text-slate-400">days</span>
            </div>
            <div className="text-xs text-slate-500">Current Streak</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl font-bold text-white flex items-baseline gap-1">
              <AnimatedCounter value={totalXP} />
            </div>
            <div className="text-xs text-slate-500">Total XP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
