"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Map, CheckSquare, FolderOpen, Briefcase, Settings, LogOut, Zap, ClipboardList, Flame } from "lucide-react";
import { motion } from "framer-motion";
import type { GeneratedRoadmap } from "@/lib/ai-roadmap";
import { getLevelFromXP } from "@/lib/sample-tasks";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/roadmap", label: "Roadmap", icon: Map },
  { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { href: "/dashboard/career", label: "Career", icon: Briefcase },
];

const bottomNavItems = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const currentUser = {
  name: "Utkarsh",
  totalXP: 2450,
  streak: 7,
};

export function Sidebar() {
  const pathname = usePathname();
  const [hasRoadmap, setHasRoadmap] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkRoadmap() {
      try {
        const response = await fetch("/api/roadmap");
        const data = await response.json();
        setHasRoadmap(!!data.roadmap);
      } catch {
        setHasRoadmap(false);
      }
    }
    checkRoadmap();
  }, []);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900/50 border-r border-slate-800/50 flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            The Devs
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {hasRoadmap === false && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <Link
              href="/onboarding"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                pathname === "/onboarding"
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span className="font-medium">Take Assessment</span>
            </Link>
          </div>
        )}
      </nav>

      <div className="p-3 border-t border-slate-800/50">
        <div className="space-y-1 mb-4">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="px-3 py-2 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-orange-400">{currentUser.streak} day streak</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500">Level {getLevelFromXP(currentUser.totalXP)}</p>
              </div>
            </div>
            <button className="p-1 hover:bg-slate-700 rounded transition-colors">
              <LogOut className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
