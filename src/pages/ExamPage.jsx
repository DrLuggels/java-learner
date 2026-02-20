import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { modules } from '../data/modules'
import { getModuleData } from '../data/moduleData'
import { examQuestions } from '../data/exam-questions'
import QuizQuestion from '../components/QuizQuestion'
import QuizResult from '../components/QuizResult'
import ProgressBar from '../components/ProgressBar'
import useProgress from '../hooks/useProgress'
import useWeakness from '../hooks/useWeakness'
import { shuffle } from '../utils/shuffle'

const EXAM_SIZE = 30

function buildExam() {
  const weights = { KRITISCH: 4, HOCH: 2, MITTEL: 1 }
  let pool = []
  modules.forEach(mod => {
    const data = getModuleData(mod.id)
    const w = weights[mod.relevance] || 1
    data.questions.forEach(q => {
      for (let i = 0; i < w; i++) pool.push({ ...q, moduleId: mod.id })
    })
  })
  examQuestions.forEach(q => { pool.push(q) })
  const shuffled = shuffle(pool)
  const seen = new Set()
  return shuffled.filter(q => {
    if (seen.has(q.id)) return false
    seen.add(q.id)
    return true
  }).slice(0, EXAM_SIZE)
}

export default function ExamPage() {
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [results, setResults] = useState({ correct: 0, total: 0, byModule: {} })
  const [done, setDone] = useState(false)
  const [timer, setTimer] = useState(0)
  const questions = useMemo(() => buildExam(), [started])
  const { recordAnswer } = useProgress()
  const { recordWrong, recordCorrectInWeakness } = useWeakness()

  useEffect(() => {
    if (!started || done) return
    const interval = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [started, done])

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  if (!started) return <ExamIntro onStart={() => setStarted(true)} />

  const handleAnswer = (isCorrect) => {
    const q = questions[currentQ]
    if (q.moduleId) {
      recordAnswer(q.moduleId, q.id, isCorrect)
      if (isCorrect) recordCorrectInWeakness(q.moduleId, q.id)
      else recordWrong(q.moduleId, q.id)
    }
    setResults(prev => {
      const modKey = q.moduleId || 'misc'
      const modStats = prev.byModule[modKey] || { correct: 0, total: 0 }
      return {
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
        byModule: { ...prev.byModule, [modKey]: { correct: modStats.correct + (isCorrect ? 1 : 0), total: modStats.total + 1 } },
      }
    })
    setTimeout(() => {
      if (currentQ + 1 >= questions.length) setDone(true)
      else setCurrentQ(prev => prev + 1)
    }, 1500)
  }

  if (done) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Klausur-Ergebnis</h1>
        <p className="text-slate-400 mb-4">Zeit: {formatTime(timer)}</p>
        <QuizResult correct={results.correct} total={results.total} onRetry={() => { setStarted(false); setCurrentQ(0); setResults({ correct: 0, total: 0, byModule: {} }); setDone(false); setTimer(0) }} />
        <ModuleBreakdown byModule={results.byModule} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white">Klausur-Simulation</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">⏱ {formatTime(timer)}</span>
          <span className="text-sm text-slate-400">Frage {currentQ + 1}/{questions.length}</span>
        </div>
      </div>
      <ProgressBar value={(currentQ / questions.length) * 100} size="sm" showLabel={false} />
      <div className="mt-4">
        <QuizQuestion key={questions[currentQ].id} question={questions[currentQ]} onAnswer={handleAnswer} />
      </div>
    </div>
  )
}

function ExamIntro({ onStart }) {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-white mb-4">Klausur-Simulation</h1>
      <p className="text-slate-400 mb-2">{EXAM_SIZE} Fragen aus allen Modulen</p>
      <p className="text-slate-400 mb-6">Gewichtet nach Klausur-Relevanz</p>
      <button onClick={onStart} className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors border-none cursor-pointer font-medium text-lg">
        Klausur starten
      </button>
      <div className="mt-4">
        <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm no-underline">← Zurück</Link>
      </div>
    </div>
  )
}

function ModuleBreakdown({ byModule }) {
  return (
    <div className="mt-6 bg-slate-800 rounded-lg border border-slate-700 p-4">
      <h3 className="text-white font-semibold mb-3">Aufschlüsselung nach Modul</h3>
      <div className="space-y-2">
        {Object.entries(byModule).map(([modId, stats]) => {
          const mod = modules.find(m => m.id === Number(modId))
          const pct = Math.round((stats.correct / stats.total) * 100)
          return (
            <div key={modId} className="flex items-center justify-between">
              <span className="text-sm text-slate-300">{mod ? mod.title : `Modul ${modId}`}</span>
              <span className={`text-sm font-medium ${pct >= 75 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {stats.correct}/{stats.total} ({pct}%)
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
