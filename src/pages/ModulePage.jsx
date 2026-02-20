import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getModule } from '../data/modules'
import { getModuleData } from '../data/moduleData'
import TheoryCard from '../components/TheoryCard'
import QuizQuestion from '../components/QuizQuestion'
import QuizResult from '../components/QuizResult'
import useProgress from '../hooks/useProgress'
import useWeakness from '../hooks/useWeakness'
import CodePlayground from '../components/CodePlayground'
import { examples } from '../data/playgroundExamples'
import { shuffle } from '../utils/shuffle'

export default function ModulePage() {
  const { id } = useParams()
  const module = getModule(id)
  const data = getModuleData(Number(id))
  const { recordAnswer, getModuleProgress } = useProgress()
  const { recordWrong, recordCorrectInWeakness } = useWeakness()

  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [results, setResults] = useState({ correct: 0, total: 0 })
  const [quizDone, setQuizDone] = useState(false)

  const questions = useMemo(() => shuffle(data.questions), [id, showQuiz])

  if (!module) return <p className="text-red-400">Modul nicht gefunden.</p>

  const handleAnswer = (isCorrect) => {
    const q = questions[currentQ]
    recordAnswer(Number(id), q.id, isCorrect)
    if (isCorrect) {
      recordCorrectInWeakness(Number(id), q.id)
    } else {
      recordWrong(Number(id), q.id)
    }
    setResults(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setQuizDone(true)
      } else {
        setCurrentQ(prev => prev + 1)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setShowQuiz(false)
    setCurrentQ(0)
    setResults({ correct: 0, total: 0 })
    setQuizDone(false)
    setTimeout(() => setShowQuiz(true), 0)
  }

  return (
    <div>
      <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm no-underline mb-4 inline-block">
        ← Zurück zum Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-white mb-1">
        Modul {module.id}: {module.title}
      </h1>
      <p className="text-slate-400 mb-6">Fortschritt: {getModuleProgress(Number(id))}%</p>

      <TheorySection theory={data.theory} />

      <PlaygroundSection moduleId={Number(id)} />

      {!showQuiz ? (
        <button
          onClick={() => setShowQuiz(true)}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border-none cursor-pointer font-medium text-lg"
        >
          Quiz starten ({questions.length} Fragen)
        </button>
      ) : quizDone ? (
        <div className="mt-6">
          <QuizResult correct={results.correct} total={results.total} moduleId={id} onRetry={resetQuiz} />
        </div>
      ) : (
        <QuizSection current={currentQ} total={questions.length} question={questions[currentQ]} onAnswer={handleAnswer} />
      )}
    </div>
  )
}

function TheorySection({ theory }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-white">Theorie</h2>
      {theory.map((t, i) => (
        <TheoryCard key={i} title={t.title} content={t.content} code={t.code} />
      ))}
    </div>
  )
}

function PlaygroundSection({ moduleId }) {
  const moduleExamples = examples[moduleId]
  if (!moduleExamples || moduleExamples.length === 0) return null
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-lg font-semibold text-white">Code Playground — Probier es aus!</h2>
      <p className="text-sm text-slate-400">Ändere den Code und drücke "Ausführen" um die Ausgabe zu sehen.</p>
      {moduleExamples.map((ex, i) => (
        <CodePlayground key={i} initialCode={ex.code} title={ex.title} />
      ))}
    </div>
  )
}

function QuizSection({ current, total, question, onAnswer }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">Quiz</h2>
        <span className="text-sm text-slate-400">Frage {current + 1} von {total}</span>
      </div>
      <QuizQuestion key={question.id} question={question} onAnswer={onAnswer} />
    </div>
  )
}
