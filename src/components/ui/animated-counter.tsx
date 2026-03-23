"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  onComplete?: () => void;
}

export function AnimatedCounter({
  value,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
  decimals = 0,
  onComplete,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });
  const hasCompleted = useRef(false);

  useEffect(() => {
    const targetValue = value;
    
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
      if (latest >= targetValue && !hasCompleted.current) {
        hasCompleted.current = true;
        onComplete?.();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.floor(displayValue).toLocaleString();

  return (
    <motion.span className={className} layout>
      {prefix}{formatted}{suffix}
    </motion.span>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function CountUp({ end, duration = 2, className = "", suffix = "", prefix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    startTime.current = null;
    
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration]);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  showLabel?: boolean;
  height?: string;
  animated?: boolean;
}

export function XPBar({ 
  currentXP, 
  maxXP, 
  showLabel = true, 
  height = "h-3",
  animated = true 
}: XPBarProps) {
  const percentage = Math.min((currentXP / maxXP) * 100, 100);
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });
  const width = useTransform(springValue, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    springValue.set(percentage);
  }, [percentage, springValue]);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">
            <AnimatedCounter value={currentXP} /> / {maxXP.toLocaleString()} XP
          </span>
          <span className="text-sm font-medium text-amber-400">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${height}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
          style={animated ? { width } : { width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.15)_75%)] animate-[slide_1s_infinite_linear]" />
        </motion.div>
      </div>
    </div>
  );
}
