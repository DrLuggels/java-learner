import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { modules } from '../data/modules'
import { getModuleData } from '../data/moduleData'
import QuizQuestion from '../components/QuizQuestion'
import QuizResult from '../components/QuizResult'
import useWeakness from '../hooks/useWeakness'
import useProgress from '../hooks/useProgress'
import { shuffle } from '../utils/shuffle'

const relevanceOrder = { KRITISCH: 0, HOCH: 1, MITTEL: 2 }

export default function WeaknessPage() {
  const { getWeakQuestions, recordWrong, recordCorrectInWeakness, getWeakCount } = useWeakness()
  const { recordAnswer } = useProgress()
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [results, setResults] = useState({ correct: 0, total: 0 })
  const [done, setDone] = useState(false)

  const questions = useMemo(() => {
    const weak = getWeakQuestions()
    const withData = weak.map(w => {
      const data = getModuleData(w.moduleId)
      const q = data.questions.find(q => q.id === w.questionId)
      const mod = modules.find(m => m.id === w.moduleId)
      return q ? { ...q, moduleId: w.moduleId, relevance: mod?.relevance || 'MITTEL' } : null
    }).filter(Boolean)
    withData.sort((a, b) => (relevanceOrder[a.relevance] ?? 2) - (relevanceOrder[b.relevance] ?? 2))
    return withData
  }, [started])

  const weakCount = getWeakCount()

  if (weakCount === 0 && !started) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-white mb-4">Keine Schwächen!</h1>
        <p className="text-slate-400 mb-6">Du hast keine falsch beantworteten Fragen. Mach weiter so!</p>
        <Link to="/" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-underline font-medium">
          Zum Dashboard
        </Link>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-white mb-4">Schwächen üben</h1>
        <p className="text-slate-400 mb-2">{weakCount} Fragen, die du falsch beantwortet hast</p>
        <p className="text-slate-500 text-sm mb-6">Fragen verschwinden nach 2x richtig beantworten</p>
        <button onClick={() => setStarted(true)} className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors border-none cursor-pointer font-medium text-lg">
          Schwächen üben
        </button>
        <div className="mt-4">
          <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm no-underline">← Zurück</Link>
        </div>
      </div>
    )
  }

  if (done || questions.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Ergebnis Schwächen-Training</h1>
        <QuizResult correct={results.correct} total={results.total} onRetry={() => { setStarted(false); setCurrentQ(0); setResults({ correct: 0, total: 0 }); setDone(false) }} />
      </div>
    )
  }

  const handleAnswer = (isCorrect) => {
    const q = questions[currentQ]
    recordAnswer(q.moduleId, q.id, isCorrect)
    if (isCorrect) recordCorrectInWeakness(q.moduleId, q.id)
    else recordWrong(q.moduleId, q.id)
    setResults(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }))
    setTimeout(() => {
      if (currentQ + 1 >= questions.length) setDone(true)
      else setCurrentQ(prev => prev + 1)
    }, 1500)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white">Schwächen üben</h1>
        <span className="text-sm text-slate-400">Frage {currentQ + 1}/{questions.length}</span>
      </div>
      <QuizQuestion key={questions[currentQ].id} question={questions[currentQ]} onAnswer={handleAnswer} />
    </div>
  )
}
