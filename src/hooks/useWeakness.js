import { useState, useCallback } from 'react'

const STORAGE_KEY = 'java-mastery-weakness'

function loadWeakness() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

function saveWeakness(weakness) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(weakness))
}

export default function useWeakness() {
  const [weakness, setWeakness] = useState(loadWeakness)

  const recordWrong = useCallback((moduleId, questionId) => {
    setWeakness(prev => {
      const key = `${moduleId}_${questionId}`
      const entry = prev[key] || { moduleId, questionId, correctStreak: 0 }
      const updated = { ...prev, [key]: { ...entry, correctStreak: 0 } }
      saveWeakness(updated)
      return updated
    })
  }, [])

  const recordCorrectInWeakness = useCallback((moduleId, questionId) => {
    setWeakness(prev => {
      const key = `${moduleId}_${questionId}`
      if (!prev[key]) return prev
      const entry = prev[key]
      const newStreak = entry.correctStreak + 1
      let updated
      if (newStreak >= 2) {
        updated = { ...prev }
        delete updated[key]
      } else {
        updated = { ...prev, [key]: { ...entry, correctStreak: newStreak } }
      }
      saveWeakness(updated)
      return updated
    })
  }, [])

  const getWeakQuestions = useCallback(() => {
    return Object.values(weakness)
  }, [weakness])

  const isWeak = useCallback((moduleId, questionId) => {
    return !!weakness[`${moduleId}_${questionId}`]
  }, [weakness])

  const getWeakCount = useCallback(() => {
    return Object.keys(weakness).length
  }, [weakness])

  return { recordWrong, recordCorrectInWeakness, getWeakQuestions, isWeak, getWeakCount }
}
