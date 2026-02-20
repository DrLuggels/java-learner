import { useState } from 'react'
import CodeBlock from './CodeBlock'

export default function QuizQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (answer) => {
    if (submitted) return
    setSubmitted(true)
    const isCorrect = checkAnswer(question, answer)
    setSelected(answer)
    onAnswer(isCorrect)
  }

  const handleTextSubmit = () => {
    if (submitted || !textInput.trim()) return
    handleSubmit(textInput.trim())
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-5">
      <p className="text-white font-medium mb-3">{question.question}</p>
      {question.code && (
        <div className="mb-4">
          <CodeBlock code={question.code} />
        </div>
      )}
      {question.type === 'text' ? (
        <TextInput
          value={textInput}
          onChange={setTextInput}
          onSubmit={handleTextSubmit}
          submitted={submitted}
          correct={submitted && checkAnswer(question, textInput.trim())}
          answer={question.answer}
        />
      ) : (
        <OptionsList
          options={question.options}
          selected={selected}
          submitted={submitted}
          correctAnswer={question.answer}
          onSelect={handleSubmit}
        />
      )}
      {submitted && question.explanation && (
        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-blue-400">Erklärung: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}

function checkAnswer(question, answer) {
  const correct = String(question.answer).toLowerCase().trim()
  const given = String(answer).toLowerCase().trim()
  return correct === given
}

function OptionsList({ options, selected, submitted, correctAnswer, onSelect }) {
  return (
    <div className="space-y-2">
      {options.map((opt, i) => {
        const isSelected = selected === opt
        const isCorrect = opt === correctAnswer
        let cls = 'border-slate-600 hover:border-slate-500 cursor-pointer'
        if (submitted) {
          if (isCorrect) cls = 'border-green-500 bg-green-500/10'
          else if (isSelected) cls = 'border-red-500 bg-red-500/10'
          else cls = 'border-slate-700 opacity-50'
        }
        return (
          <button
            key={i}
            onClick={() => onSelect(opt)}
            disabled={submitted}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors bg-transparent text-slate-200 ${cls}`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function TextInput({ value, onChange, onSubmit, submitted, correct, answer }) {
  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          disabled={submitted}
          placeholder="Deine Antwort..."
          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        {!submitted && (
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border-none cursor-pointer"
          >
            Prüfen
          </button>
        )}
      </div>
      {submitted && (
        <p className={`mt-2 text-sm ${correct ? 'text-green-400' : 'text-red-400'}`}>
          {correct ? 'Richtig!' : `Falsch! Richtige Antwort: ${answer}`}
        </p>
      )}
    </div>
  )
}
