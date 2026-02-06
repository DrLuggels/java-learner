import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import type { UserProgress, ExerciseResult } from '../types';
import { isLoggedIn, saveProgressToGist, loadProgressFromGist } from '../utils/githubAuth';

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
  lastReviewDates: {},
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
  getLastReviewDate: (topicId: string) => string | null;
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
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save to localStorage immediately, debounce Gist sync
  useEffect(() => {
    saveProgress(progress);
    if (isLoggedIn()) {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
      syncTimerRef.current = setTimeout(() => {
        saveProgressToGist(progress);
      }, 5000);
    }
  }, [progress]);

  // On mount: try loading from Gist if logged in
  useEffect(() => {
    if (isLoggedIn()) {
      loadProgressFromGist().then(remote => {
        if (remote && typeof remote === 'object') {
          const remoteProgress = remote as UserProgress;
          // Merge: take whichever has more completed topics
          setProgress(local => {
            if ((remoteProgress.completedTopics?.length ?? 0) > local.completedTopics.length) {
              return { ...defaultProgress, ...remoteProgress };
            }
            return local;
          });
        }
      });
    }
  }, []);

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
      return {
        ...p,
        completedTopics: [...p.completedTopics, topicId],
        lastReviewDates: { ...p.lastReviewDates, [topicId]: new Date().toISOString() },
      };
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
      return {
        ...p,
        topicScores: newScores,
        weakTopics: weakTopics,
        lastReviewDates: { ...p.lastReviewDates, [topicId]: new Date().toISOString() },
      };
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

  const getLastReviewDate = useCallback((topicId: string): string | null => {
    return progress.lastReviewDates[topicId] ?? null;
  }, [progress.lastReviewDates]);

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
      getLastReviewDate,
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
