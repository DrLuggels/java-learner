import { useState, useCallback } from 'react'

const STORAGE_KEY = 'java-mastery-progress'

function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export default function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const recordAnswer = useCallback((moduleId, questionId, correct) => {
    setProgress(prev => {
      const mod = prev[moduleId] || { correct: 0, total: 0, questions: {} }
      const wasAnswered = mod.questions[questionId] !== undefined
      const wasCorrect = mod.questions[questionId]

      const updated = {
        ...prev,
        [moduleId]: {
          correct: mod.correct + (correct ? 1 : 0) - (wasAnswered && wasCorrect ? 1 : 0),
          total: mod.total + (wasAnswered ? 0 : 1),
          questions: { ...mod.questions, [questionId]: correct },
        },
      }
      saveProgress(updated)
      return updated
    })
  }, [])

  const getModuleProgress = useCallback((moduleId) => {
    const mod = progress[moduleId]
    if (!mod || mod.total === 0) return 0
    return Math.round((mod.correct / mod.total) * 100)
  }, [progress])

  const getOverallProgress = useCallback(() => {
    const modules = Object.values(progress)
    if (modules.length === 0) return 0
    const totalCorrect = modules.reduce((s, m) => s + m.correct, 0)
    const totalQuestions = modules.reduce((s, m) => s + m.total, 0)
    if (totalQuestions === 0) return 0
    return Math.round((totalCorrect / totalQuestions) * 100)
  }, [progress])

  const getModuleDetails = useCallback((moduleId) => {
    return progress[moduleId] || { correct: 0, total: 0, questions: {} }
  }, [progress])

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({})
  }, [])

  return { progress, recordAnswer, getModuleProgress, getOverallProgress, getModuleDetails, resetProgress }
}
