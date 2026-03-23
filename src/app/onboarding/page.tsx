"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Cloud,
  Database,
  Smartphone,
  Clock,
  Target,
  Briefcase,
  Code2,
  BookOpen,
  PlayCircle,
  FileText,
  Wrench,
  Sparkles,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useQuizStore } from "@/store/quiz-store";
import { QuizProgress } from "@/components/onboarding/quiz-progress";
import { QuizOption, QuizMultiOption } from "@/components/onboarding/quiz-option";
import { QuizStep, QuizContainer, QuizTitle, QuizSubtitle, QuizOptions } from "@/components/onboarding/quiz-step";
import { generateRoadmap } from "@/lib/ai-roadmap";

const steps = [
  { key: "level", title: "What's your current knowledge level?", subtitle: "Be honest - this helps us personalize your roadmap" },
  { key: "interests", title: "What interests you the most?", subtitle: "Select one or more areas you'd like to explore" },
  { key: "timeCommitment", title: "How much time can you dedicate?", subtitle: "We'll adjust your roadmap based on your availability" },
  { key: "goals", title: "What are your main goals?", subtitle: "This helps us prioritize what to focus on" },
  { key: "learningStyle", title: "How do you learn best?", subtitle: "We'll suggest resources that match your style" },
];

const levelOptions = [
  { id: "beginner", title: "Beginner", description: "New to programming or just getting started", icon: <Sparkles className="w-6 h-6" /> },
  { id: "some-experience", title: "Some Experience", description: "Know the basics, ready to dive deeper", icon: <Zap className="w-6 h-6" /> },
  { id: "intermediate", title: "Intermediate", description: "Comfortable with fundamentals, want to level up", icon: <Target className="w-6 h-6" /> },
];

const interestOptions = [
  { id: "full-stack", title: "Full Stack", description: "Build complete web applications from scratch", icon: <Code className="w-6 h-6" /> },
  { id: "ai-ml", title: "AI & ML", description: "Machine learning, neural networks, and AI", icon: <Brain className="w-6 h-6" /> },
  { id: "devops", title: "DevOps & Cloud", description: "Deployment, automation, and infrastructure", icon: <Cloud className="w-6 h-6" /> },
  { id: "data-science", title: "Data Science", description: "Data analysis, visualization, and insights", icon: <Database className="w-6 h-6" /> },
  { id: "mobile", title: "Mobile Development", description: "iOS, Android, and cross-platform apps", icon: <Smartphone className="w-6 h-6" /> },
];

const timeOptions = [
  { id: "few-hours", title: "Few hours a week", description: "Casual learning, ~5-8 hours per week", icon: <Clock className="w-6 h-6" /> },
  { id: "10-15-hrs", title: "10-15 hours a week", description: "Serious commitment, good progress", icon: <Clock className="w-6 h-6" /> },
  { id: "20-plus", title: "20+ hours a week", description: "Intensive learning, fast-track mode", icon: <Clock className="w-6 h-6" /> },
];

const goalOptions = [
  { id: "job", title: "Get a Job", description: "Land your first tech role", icon: <Briefcase className="w-6 h-6" /> },
  { id: "projects", title: "Build Projects", description: "Create an impressive portfolio", icon: <Code2 className="w-6 h-6" /> },
  { id: "career-switch", title: "Switch Career", description: "Transition from another field", icon: <Target className="w-6 h-6" /> },
  { id: "freelance", title: "Freelance", description: "Work independently as a developer", icon: <Zap className="w-6 h-6" /> },
];

const styleOptions = [
  { id: "videos", title: "Video Tutorials", description: "Learn from courses on YouTube, Udemy, Coursera", icon: <PlayCircle className="w-6 h-6" /> },
  { id: "docs", title: "Documentation", description: "Read official docs and technical articles", icon: <FileText className="w-6 h-6" /> },
  { id: "projects", title: "Project-Based", description: "Learn by building real applications", icon: <Wrench className="w-6 h-6" /> },
  { id: "mixed", title: "Mixed Approach", description: "Combine videos, docs, and hands-on practice", icon: <BookOpen className="w-6 h-6" /> },
];

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-slate-400 text-lg"
      >
        Generating your personalized roadmap...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-2 text-slate-500 text-sm"
      >
        This may take a few seconds
      </motion.p>
    </motion.div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { currentStep, answers, setAnswer, nextStep, prevStep, reset } = useQuizStore();
  const [direction, setDirection] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const canProceed = () => {
    const step = steps[currentStep];
    if (step.key === "interests") return answers.interests.length > 0;
    if (step.key === "goals") return answers.goals.length > 0;
    return !!answers[step.key as keyof typeof answers];
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      nextStep();
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      prevStep();
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setError("");
    
    try {
      // Generate roadmap client-side (no API call needed)
      const roadmap = generateRoadmap(
        answers.level,
        answers.interests,
        answers.timeCommitment,
        answers.goals,
        answers.learningStyle
      );
      
      // Store in localStorage for the roadmap page to use
      localStorage.setItem("userRoadmap", JSON.stringify(roadmap));
      
      // Redirect to dashboard roadmap
      setTimeout(() => {
        router.push("/dashboard/roadmap");
      }, 1500);
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Please try again.");
      setGenerating(false);
    }
  };

  const renderStep = () => {
    const step = steps[currentStep];

    if (generating) {
      return <LoadingSpinner />;
    }

    switch (step.key) {
      case "level":
        return (
          <QuizOptions>
            {levelOptions.map((option) => (
              <QuizOption
                key={option.id}
                selected={answers.level === option.id}
                onClick={() => setAnswer("level", option.id)}
                icon={option.icon}
                title={option.title}
                description={option.description}
              />
            ))}
          </QuizOptions>
        );

      case "interests":
        return (
          <QuizOptions>
            {interestOptions.map((option) => (
              <QuizMultiOption
                key={option.id}
                selected={answers.interests.includes(option.id)}
                onClick={() => {
                  const newInterests = answers.interests.includes(option.id)
                    ? answers.interests.filter((i) => i !== option.id)
                    : [...answers.interests, option.id];
                  setAnswer("interests", newInterests);
                }}
                icon={option.icon}
                title={option.title}
                description={option.description}
              />
            ))}
          </QuizOptions>
        );

      case "timeCommitment":
        return (
          <QuizOptions>
            {timeOptions.map((option) => (
              <QuizOption
                key={option.id}
                selected={answers.timeCommitment === option.id}
                onClick={() => setAnswer("timeCommitment", option.id)}
                icon={option.icon}
                title={option.title}
                description={option.description}
              />
            ))}
          </QuizOptions>
        );

      case "goals":
        return (
          <QuizOptions>
            {goalOptions.map((option) => (
              <QuizMultiOption
                key={option.id}
                selected={answers.goals.includes(option.id)}
                onClick={() => {
                  const newGoals = answers.goals.includes(option.id)
                    ? answers.goals.filter((g) => g !== option.id)
                    : [...answers.goals, option.id];
                  setAnswer("goals", newGoals);
                }}
                icon={option.icon}
                title={option.title}
                description={option.description}
              />
            ))}
          </QuizOptions>
        );

      case "learningStyle":
        return (
          <QuizOptions>
            {styleOptions.map((option) => (
              <QuizOption
                key={option.id}
                selected={answers.learningStyle === option.id}
                onClick={() => setAnswer("learningStyle", option.id)}
                icon={option.icon}
                title={option.title}
                description={option.description}
              />
            ))}
          </QuizOptions>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            The Devs
          </h1>
        </div>
      </header>

      {/* Progress */}
      {!generating && (
        <div className="px-6">
          <div className="max-w-4xl mx-auto">
            <QuizProgress currentStep={currentStep} totalSteps={steps.length} />
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuizContainer>
              <QuizTitle>{steps[currentStep].title}</QuizTitle>
              <QuizSubtitle>{steps[currentStep].subtitle}</QuizSubtitle>
              
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400">
                  <XCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {renderStep()}
            </QuizContainer>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      {!generating && (
        <footer className="p-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === 0
                  ? "text-slate-600 cursor-not-allowed"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Generate Roadmap
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
