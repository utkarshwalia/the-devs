"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { useQuizStore } from "@/store/quiz-store";
import { QuizProgress } from "@/components/onboarding/quiz-progress";
import { QuizOption, QuizMultiOption } from "@/components/onboarding/quiz-option";
import { QuizStep, QuizContainer, QuizTitle, QuizSubtitle, QuizOptions } from "@/components/onboarding/quiz-step";

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
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 mb-6"
      >
        <div className="w-full h-full rounded-full border-4 border-slate-700 border-t-blue-500" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-white mb-2">
          Generating Your Personalized Roadmap
        </h3>
        <p className="text-slate-400 text-center max-w-md">
          Our AI is analyzing your preferences and creating a custom learning path tailored just for you...
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center gap-2"
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </motion.div>
    </motion.div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { currentStep, answers, isGenerating, setAnswer, nextStep, prevStep, setGenerating } = useQuizStore();
  const [direction, setDirection] = useState(1);

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

  const handleGenerate = async () => {
    setGenerating(true);
    
    try {
      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/dashboard/roadmap");
      } else {
        console.error("Failed to generate roadmap");
        setGenerating(false);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setGenerating(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return answers.level !== "";
      case 1:
        return answers.interests.length > 0;
      case 2:
        return answers.timeCommitment !== "";
      case 3:
        return answers.goals.length > 0;
      case 4:
        return answers.learningStyle !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    if (isGenerating) {
      return <LoadingSpinner />;
    }

    switch (currentStep) {
      case 0:
        return (
          <QuizStep direction={direction}>
            <QuizTitle>{steps[0].title}</QuizTitle>
            <QuizSubtitle>{steps[0].subtitle}</QuizSubtitle>
            <QuizOptions>
              {levelOptions.map((option) => (
                <QuizOption
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  selected={answers.level === option.id}
                  onClick={() => setAnswer("level", option.id)}
                />
              ))}
            </QuizOptions>
          </QuizStep>
        );
      case 1:
        return (
          <QuizStep direction={direction}>
            <QuizTitle>{steps[1].title}</QuizTitle>
            <QuizSubtitle>{steps[1].subtitle}</QuizSubtitle>
            <QuizOptions>
              {interestOptions.map((option) => (
                <QuizMultiOption
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  selected={answers.interests.includes(option.id)}
                  onClick={() => {
                    const newInterests = answers.interests.includes(option.id)
                      ? answers.interests.filter((i) => i !== option.id)
                      : [...answers.interests, option.id];
                    setAnswer("interests", newInterests);
                  }}
                />
              ))}
            </QuizOptions>
          </QuizStep>
        );
      case 2:
        return (
          <QuizStep direction={direction}>
            <QuizTitle>{steps[2].title}</QuizTitle>
            <QuizSubtitle>{steps[2].subtitle}</QuizSubtitle>
            <QuizOptions>
              {timeOptions.map((option) => (
                <QuizOption
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  selected={answers.timeCommitment === option.id}
                  onClick={() => setAnswer("timeCommitment", option.id)}
                />
              ))}
            </QuizOptions>
          </QuizStep>
        );
      case 3:
        return (
          <QuizStep direction={direction}>
            <QuizTitle>{steps[3].title}</QuizTitle>
            <QuizSubtitle>{steps[3].subtitle}</QuizSubtitle>
            <QuizOptions>
              {goalOptions.map((option) => (
                <QuizMultiOption
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  selected={answers.goals.includes(option.id)}
                  onClick={() => {
                    const newGoals = answers.goals.includes(option.id)
                      ? answers.goals.filter((g) => g !== option.id)
                      : [...answers.goals, option.id];
                    setAnswer("goals", newGoals);
                  }}
                />
              ))}
            </QuizOptions>
          </QuizStep>
        );
      case 4:
        return (
          <QuizStep direction={direction}>
            <QuizTitle>{steps[4].title}</QuizTitle>
            <QuizSubtitle>{steps[4].subtitle}</QuizSubtitle>
            <QuizOptions>
              {styleOptions.map((option) => (
                <QuizOption
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  selected={answers.learningStyle === option.id}
                  onClick={() => setAnswer("learningStyle", option.id)}
                />
              ))}
            </QuizOptions>
          </QuizStep>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to The Devs</h1>
          <p className="text-slate-400">Let&apos;s create your personalized learning roadmap</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl">
          {!isGenerating && <QuizProgress currentStep={currentStep} totalSteps={steps.length} />}
          
          <QuizContainer key={currentStep}>
            {renderStep()}
          </QuizContainer>

          {!isGenerating && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentStep === 0
                    ? "text-slate-600 cursor-not-allowed"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Takes about 2 minutes • No account required yet
        </p>
      </motion.div>
    </div>
  );
}
