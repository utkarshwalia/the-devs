import { create } from "zustand";

export interface QuizState {
  currentStep: number;
  answers: {
    level: string;
    interests: string[];
    timeCommitment: string;
    goals: string[];
    learningStyle: string;
  };
  isGenerating: boolean;
  setAnswer: (key: keyof QuizState["answers"], value: string | string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  setGenerating: (value: boolean) => void;
  reset: () => void;
}

const initialAnswers = {
  level: "",
  interests: [],
  timeCommitment: "",
  goals: [],
  learningStyle: "",
};

export const useQuizStore = create<QuizState>((set) => ({
  currentStep: 0,
  answers: { ...initialAnswers },
  isGenerating: false,

  setAnswer: (key, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [key]: value,
      },
    })),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 4),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  setGenerating: (value) =>
    set(() => ({
      isGenerating: value,
    })),

  reset: () =>
    set(() => ({
      currentStep: 0,
      answers: { ...initialAnswers },
      isGenerating: false,
    })),
}));
