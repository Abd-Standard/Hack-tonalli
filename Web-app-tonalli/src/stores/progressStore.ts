import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressState, Lesson, Module } from '../types';
import { mockModules, MOCK_MODE } from '../data/mockData';

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: ['lesson-1', 'lesson-2'],
      currentLesson: null,
      modules: [],
      dailyStreak: 7,
      lastActivity: new Date().toISOString(),

      markLessonComplete: (lessonId: string) => {
        const completed = get().completedLessons;
        if (!completed.includes(lessonId)) {
          set({ completedLessons: [...completed, lessonId], lastActivity: new Date().toISOString() });
        }
      },

      setCurrentLesson: (lesson: Lesson | null) => set({ currentLesson: lesson }),

      loadModules: () => {
        if (MOCK_MODE) {
          const completed = get().completedLessons;
          const modules: Module[] = mockModules.map((mod) => ({
            ...mod,
            lessons: mod.lessons.map((lesson) => ({
              ...lesson,
              status: completed.includes(lesson.id) ? 'completed' : lesson.status,
            })),
          }));
          set({ modules });
        }
      },
    }),
    {
      name: 'tonalli-progress',
      partialize: (state) => ({ completedLessons: state.completedLessons, dailyStreak: state.dailyStreak, lastActivity: state.lastActivity }),
    }
  )
);
