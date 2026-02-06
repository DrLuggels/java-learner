import { useMemo, useCallback } from 'react';
import { useProgress } from './useProgress';
import { moduleConfig } from '../components/layout/Sidebar';

export interface ReviewItem {
  topicId: string;
  topicTitle: string;
  moduleId: string;
  urgency: 'overdue' | 'due' | 'fresh' | 'new';
  daysSinceReview: number;
  lastScore: number;
}

// Base spaced repetition intervals in days
const BASE_INTERVALS = [1, 3, 7, 14, 30];

function getReviewNumber(topicId: string, topicScores: Record<string, number>): number {
  // Estimate the review number based on score progression
  // Higher scores suggest more reviews have been done
  const score = topicScores[topicId];
  if (score === undefined) return 0;
  if (score >= 90) return 4;
  if (score >= 75) return 3;
  if (score >= 60) return 2;
  if (score >= 40) return 1;
  return 0;
}

function getAdjustedInterval(baseInterval: number, score: number): number {
  if (score < 60) {
    return Math.max(1, Math.floor(baseInterval / 2));
  }
  if (score > 90) {
    return baseInterval * 2;
  }
  return baseInterval;
}

function getDaysSince(dateStr: string | null): number {
  if (!dateStr) return Infinity;
  const reviewDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - reviewDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function calculateUrgency(
  daysSinceReview: number,
  reviewNumber: number,
  score: number,
  isCompleted: boolean
): 'overdue' | 'due' | 'fresh' | 'new' {
  if (!isCompleted) return 'new';

  const baseIntervalIndex = Math.min(reviewNumber, BASE_INTERVALS.length - 1);
  const baseInterval = BASE_INTERVALS[baseIntervalIndex];
  const adjustedInterval = getAdjustedInterval(baseInterval, score);

  if (daysSinceReview >= adjustedInterval * 1.5) return 'overdue';
  if (daysSinceReview >= adjustedInterval) return 'due';
  return 'fresh';
}

function calculateReviewScore(
  daysSinceReview: number,
  score: number,
  exerciseFailures: number
): number {
  // Higher review score = higher priority for review
  // Factor 1: Time since last review (longer = higher priority)
  const timeFactor = Math.min(daysSinceReview / 30, 3) * 40;

  // Factor 2: Quiz score (lower scores = higher priority)
  const scoreFactor = score >= 0 ? ((100 - score) / 100) * 35 : 35;

  // Factor 3: Exercise failures (more failures = higher priority)
  const failureFactor = Math.min(exerciseFailures * 5, 25);

  return timeFactor + scoreFactor + failureFactor;
}

export function useSpacedRepetition() {
  const { progress, getLastReviewDate, isTopicCompleted } = useProgress();

  // Build a flat list of all topics with their module info
  const allTopics = useMemo(() => {
    const topics: { topicId: string; topicTitle: string; moduleId: string }[] = [];
    for (const mod of moduleConfig) {
      for (const topic of mod.topics) {
        topics.push({
          topicId: topic.id,
          topicTitle: topic.title,
          moduleId: mod.id,
        });
      }
    }
    return topics;
  }, []);

  // Count exercise failures per topic
  const exerciseFailures = useMemo(() => {
    const failures: Record<string, number> = {};
    for (const [, result] of Object.entries(progress.completedExercises)) {
      const topicId = result.exerciseId.split('-').slice(0, -1).join('-');
      if (!result.completed || result.attempts > 1) {
        failures[topicId] = (failures[topicId] || 0) + (result.attempts - 1);
      }
    }
    return failures;
  }, [progress.completedExercises]);

  const getTopicUrgency = useCallback((topicId: string): 'overdue' | 'due' | 'fresh' | 'new' => {
    const completed = isTopicCompleted(topicId);
    if (!completed) return 'new';

    const lastReview = getLastReviewDate(topicId);
    const daysSince = getDaysSince(lastReview);
    const score = progress.topicScores[topicId] ?? 0;
    const reviewNum = getReviewNumber(topicId, progress.topicScores);

    return calculateUrgency(daysSince, reviewNum, score, completed);
  }, [isTopicCompleted, getLastReviewDate, progress.topicScores]);

  const getReviewTopics = useCallback((count: number): ReviewItem[] => {
    const reviewItems: (ReviewItem & { reviewScore: number })[] = [];

    for (const topic of allTopics) {
      const completed = isTopicCompleted(topic.topicId);
      const lastReview = getLastReviewDate(topic.topicId);
      const daysSince = getDaysSince(lastReview);
      const score = progress.topicScores[topic.topicId] ?? 0;
      const reviewNum = getReviewNumber(topic.topicId, progress.topicScores);
      const urgency = calculateUrgency(daysSince, reviewNum, score, completed);
      const failures = exerciseFailures[topic.topicId] ?? 0;

      // Only include completed topics that are not fresh
      if (completed && urgency !== 'fresh') {
        const reviewScore = calculateReviewScore(
          daysSince === Infinity ? 30 : daysSince,
          score,
          failures
        );

        reviewItems.push({
          ...topic,
          urgency,
          daysSinceReview: daysSince === Infinity ? -1 : daysSince,
          lastScore: score,
          reviewScore,
        });
      }
    }

    // Sort by review score (highest priority first)
    reviewItems.sort((a, b) => b.reviewScore - a.reviewScore);

    return reviewItems.slice(0, count).map(({ reviewScore: _, ...item }) => item);
  }, [allTopics, isTopicCompleted, getLastReviewDate, progress.topicScores, exerciseFailures]);

  const getDailyReviewCount = useCallback((): number => {
    let count = 0;
    for (const topic of allTopics) {
      const urgency = getTopicUrgency(topic.topicId);
      if (urgency === 'overdue' || urgency === 'due') {
        count++;
      }
    }
    return count;
  }, [allTopics, getTopicUrgency]);

  return {
    getReviewTopics,
    getTopicUrgency,
    getDailyReviewCount,
  };
}
