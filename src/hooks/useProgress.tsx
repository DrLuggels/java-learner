import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProgress, ExerciseResult } from '../types';

const defaultProgress: UserProgress = {
  completedTopics: [],
  completedExercises: {},
  topicScores: {},
  moduleScores: {},
  streakDays: 0,
  totalTimeMinutes: 0,
  lastActive: new Date().toISOString(),
  weakTopics: [],
  savedCode: {},
};

interface ProgressContextType {
  progress: UserProgress;
  completeTopic: (topicId: string) => void;
  completeExercise: (result: ExerciseResult) => void;
  updateTopicScore: (topicId: string, score: number) => void;
  saveCode: (exerciseId: string, code: string) => void;
  getSavedCode: (exerciseId: string) => string | undefined;
  isTopicCompleted: (topicId: string) => boolean;
  isExerciseCompleted: (exerciseId: string) => boolean;
  getModuleProgress: (moduleId: string, topicIds: string[]) => number;
  getOverallProgress: (totalTopics: number) => number;
  getWeakTopics: () => string[];
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = 'javapath-progress';

function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultProgress, ...parsed };
    }
  } catch { /* ignore */ }
  return { ...defaultProgress };
}

function saveProgress(progress: UserProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* ignore */ }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    const last = new Date(progress.lastActive);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - last.getTime()) / 86400000);
    if (diffDays === 1) {
      setProgress(p => ({ ...p, streakDays: p.streakDays + 1, lastActive: now.toISOString() }));
    } else if (diffDays > 1) {
      setProgress(p => ({ ...p, streakDays: 1, lastActive: now.toISOString() }));
    }
  }, []);

  const completeTopic = useCallback((topicId: string) => {
    setProgress(p => {
      if (p.completedTopics.includes(topicId)) return p;
      return { ...p, completedTopics: [...p.completedTopics, topicId] };
    });
  }, []);

  const completeExercise = useCallback((result: ExerciseResult) => {
    setProgress(p => ({
      ...p,
      completedExercises: { ...p.completedExercises, [result.exerciseId]: result },
    }));
  }, []);

  const updateTopicScore = useCallback((topicId: string, score: number) => {
    setProgress(p => {
      const newScores = { ...p.topicScores, [topicId]: score };
      const weakTopics = Object.entries(newScores)
        .filter(([, s]) => s < 50)
        .map(([id]) => id);
      return { ...p, topicScores: newScores, weakTopics: weakTopics };
    });
  }, []);

  const saveCode = useCallback((exerciseId: string, code: string) => {
    setProgress(p => ({
      ...p,
      savedCode: { ...p.savedCode, [exerciseId]: code },
    }));
  }, []);

  const getSavedCode = useCallback((exerciseId: string) => {
    return progress.savedCode[exerciseId];
  }, [progress.savedCode]);

  const isTopicCompleted = useCallback((topicId: string) => {
    return progress.completedTopics.includes(topicId);
  }, [progress.completedTopics]);

  const isExerciseCompleted = useCallback((exerciseId: string) => {
    return progress.completedExercises[exerciseId]?.completed ?? false;
  }, [progress.completedExercises]);

  const getModuleProgress = useCallback((_moduleId: string, topicIds: string[]) => {
    if (topicIds.length === 0) return 0;
    const completed = topicIds.filter(id => progress.completedTopics.includes(id)).length;
    return Math.round((completed / topicIds.length) * 100);
  }, [progress.completedTopics]);

  const getOverallProgress = useCallback((totalTopics: number) => {
    if (totalTopics === 0) return 0;
    return Math.round((progress.completedTopics.length / totalTopics) * 100);
  }, [progress.completedTopics]);

  const getWeakTopics = useCallback(() => {
    return progress.weakTopics;
  }, [progress.weakTopics]);

  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <ProgressContext.Provider value={{
      progress,
      completeTopic,
      completeExercise,
      updateTopicScore,
      saveCode,
      getSavedCode,
      isTopicCompleted,
      isExerciseCompleted,
      getModuleProgress,
      getOverallProgress,
      getWeakTopics,
      resetProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
