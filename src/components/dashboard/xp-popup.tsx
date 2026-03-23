"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Star, Trophy } from "lucide-react";

interface XPPopupProps {
  amount: number;
  trigger: boolean;
  onComplete?: () => void;
}

export function XPPopup({ amount, trigger, onComplete }: XPPopupProps) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      setKey((prev) => prev + 1);
    }
  }, [trigger]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
                repeatType: "reverse",
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-2xl shadow-amber-500/30"
            >
              <Zap className="w-6 h-6 text-white" />
              <span className="text-2xl font-bold text-white">+{amount} XP</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -top-2 -right-2"
            >
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </motion.div>

            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                animate={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 100,
                  y: Math.random() * -60 - 20,
                  scale: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.05,
                }}
                className="absolute top-1/2 left-1/2"
              >
                <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface LevelUpPopupProps {
  level: number;
  trigger: boolean;
  onComplete?: () => void;
}

export function LevelUpPopup({ level, trigger, onComplete }: LevelUpPopupProps) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      setKey((prev) => prev + 1);
    }
  }, [trigger]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="relative text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/40"
            >
              <Trophy className="w-20 h-20 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-2"
            >
              Level Up!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-2xl font-bold text-white mb-4"
            >
              Level {level}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 mb-6"
            >
              Congratulations! Keep up the great work!
            </motion.p>

            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0.8,
                  x: Math.cos((i / 20) * Math.PI * 2) * 50,
                  y: Math.sin((i / 20) * Math.PI * 2) * 50,
                  scale: 1,
                }}
                animate={{
                  opacity: 0,
                  x: Math.cos((i / 20) * Math.PI * 2) * 200,
                  y: Math.sin((i / 20) * Math.PI * 2) * 200 - 50,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.2 + i * 0.02,
                  ease: "easeOut",
                }}
                className="absolute top-1/2 left-1/2"
              >
                {i % 3 === 0 ? (
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ) : i % 3 === 1 ? (
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                ) : (
                  <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                )}
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShow(false);
                onComplete?.();
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Continue Learning
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
