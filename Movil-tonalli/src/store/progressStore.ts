import { create } from "zustand";

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

interface ProgressState {
  lessonsProgress: Record<string, LessonProgress>;
  currentStreak: number;
  totalXP: number;
  completeLesson: (lessonId: string, score: number, xpReward: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonScore: (lessonId: string) => number | undefined;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  lessonsProgress: {
    l1: { lessonId: "l1", completed: true, score: 100, completedAt: "2024-01-10" },
    l2: { lessonId: "l2", completed: true, score: 75, completedAt: "2024-01-11" },
    l3: { lessonId: "l3", completed: true, score: 90, completedAt: "2024-01-12" },
    l6: { lessonId: "l6", completed: true, score: 85, completedAt: "2024-01-20" },
  },
  currentStreak: 7,
  totalXP: 3400,

  completeLesson: (lessonId: string, score: number, xpReward: number) => {
    const { lessonsProgress, totalXP } = get();
    if (!lessonsProgress[lessonId]?.completed) {
      set({
        lessonsProgress: {
          ...lessonsProgress,
          [lessonId]: {
            lessonId,
            completed: true,
            score,
            completedAt: new Date().toISOString(),
          },
        },
        totalXP: totalXP + xpReward,
      });
    }
  },

  isLessonCompleted: (lessonId: string) => {
    return get().lessonsProgress[lessonId]?.completed ?? false;
  },

  getLessonScore: (lessonId: string) => {
    return get().lessonsProgress[lessonId]?.score;
  },
}));
