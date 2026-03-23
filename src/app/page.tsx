"use client";

import { motion } from "framer-motion";
import { Brain, Target, Zap, Rocket, ChevronRight, Code, Database, Cloud, Cpu, Flame, Trophy, Star } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI Roadmap Generator",
    description: "Get a personalized learning path tailored to your goals. Multiple specializations from Full Stack to AI/ML.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Target,
    title: "Daily Tasks",
    description: "Structured daily tasks aligned with your roadmap. Stay focused and track your progress every single day.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Code,
    title: "Real Projects",
    description: "Build portfolio-worthy projects with step-by-step guidance. From beginner to advanced complexity.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Rocket,
    title: "Career Launchpad",
    description: "Access curated job listings for freshers and interns. Get AI assistance to build your perfect resume.",
    color: "from-orange-500 to-amber-600",
  },
];

const specializations = [
  { name: "Full Stack", icon: Code, count: "120+ Tasks" },
  { name: "AI / ML", icon: Cpu, count: "100+ Tasks" },
  { name: "DevOps", icon: Cloud, count: "80+ Tasks" },
  { name: "Data Science", icon: Database, count: "90+ Tasks" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              The Devs
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-300">Structured Execution System</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Devs
            </span>
            <br />
            <span className="text-slate-100">Structured Execution System</span>
            <br />
            <span className="text-3xl md:text-4xl text-slate-400">for Future Developers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          >
            Stop wandering. Start building. Get AI-powered roadmaps, daily tasks, 
            and real-world projects designed to take you from beginner to hireable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/sign-up"
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Start Your Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <div>
              <div className="text-3xl font-bold text-white">2.5k+</div>
              <div className="text-sm text-slate-500">Active Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-slate-500">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-sm text-slate-500">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Become Job-Ready
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A complete learning system designed for engineering students who want structured, 
              measurable progress toward their dream tech career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Specialization
              </span>
            </h2>
            <p className="text-slate-400">
              Master one domain or explore multiple — we have structured paths for everything
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors cursor-pointer group"
              >
                <spec.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-1">{spec.name}</h3>
                <p className="text-sm text-slate-500">{spec.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Stay Motivated with{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Gamification
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Earn XP, unlock levels, maintain streaks, and collect achievements. 
              Learning should be rewarding, not boring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">XP & Levels</h3>
              <p className="text-slate-400 mb-4">
                Earn experience points for every task you complete. Level up to unlock new content and achievements.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 rounded-full">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">+50 XP</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 rounded-full">
                  <Trophy className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Level 5</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Daily Streaks</h3>
              <p className="text-slate-400 mb-4">
                Build a learning habit with daily streaks. Miss a day and your streak resets to zero. Stay consistent!
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-1 bg-orange-500/20 rounded-full">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-orange-400">7 Day Streak</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Achievements</h3>
              <p className="text-slate-400 mb-4">
                Unlock badges and achievements as you reach milestones. Show off your progress to friends and employers.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-slate-500" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Star className="w-4 h-4 text-slate-500" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/30 border border-amber-500/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl"
          >
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">2,450 XP</p>
                  <p className="text-sm text-slate-400">Average learner earns 500+ XP per week</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-amber-400">12 Days</p>
                  <p className="text-xs text-slate-500">Longest Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-400">47</p>
                  <p className="text-xs text-slate-500">Tasks Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-400">4</p>
                  <p className="text-xs text-slate-500">Projects Built</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,blue-500/10,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,purple-500/10,transparent_50%)]" />
            
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Level Up?
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-xl mx-auto">
                Join thousands of engineering students who went from confused to career-ready 
                with structured, AI-powered learning.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Create Free Account
                <ChevronRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-slate-500">
                No credit card required • Start learning in 30 seconds
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-300">The Devs</span>
          </div>
          <p className="text-sm text-slate-500">
            Built for engineering students who want to actually ship.
          </p>
        </div>
      </footer>
    </div>
  );
}
