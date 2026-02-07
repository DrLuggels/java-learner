import { useState } from 'react';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';

interface PredictOutputStepProps {
  code: string;
  answer: string;
  explanation?: string;
  onComplete: () => void;
}

export default function PredictOutputStep({ code, answer, explanation, onComplete }: PredictOutputStepProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const normalize = (s: string) => s.trim().replace(/\s+/g, ' ');
  const isCorrect = normalize(userAnswer) === normalize(answer);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-4">
      <div className="bg-dark-800 border border-accent-purple/30 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-accent-purple mb-3">Was gibt dieser Code aus?</h3>
        <pre className="bg-dark-900 rounded-lg p-4 text-sm mono text-dark-200 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-dark-300">Deine Antwort:</label>
        <textarea
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          disabled={submitted}
          placeholder="Schreibe hier die erwartete Ausgabe..."
          className="w-full bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm mono text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-accent-purple/50 resize-none"
          rows={3}
        />
      </div>

      {!submitted ? (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 disabled:opacity-30 transition-colors text-sm font-medium"
          >
            Pruefen
          </button>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center gap-1 text-xs text-dark-500 hover:text-dark-300"
          >
            <Eye className="w-3.5 h-3.5" />
            {showAnswer ? 'Verbergen' : 'Loesung zeigen'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`flex items-center gap-2 p-3 rounded-lg ${isCorrect ? 'success-box' : 'warning-box'}`}>
            {isCorrect ? (
              <><CheckCircle2 className="w-5 h-5 text-accent-green" /><span className="text-sm text-accent-green font-medium">Richtig!</span></>
            ) : (
              <><XCircle className="w-5 h-5 text-accent-red" /><span className="text-sm text-accent-red font-medium">Nicht ganz. Korrekte Ausgabe:</span></>
            )}
          </div>
          {!isCorrect && (
            <pre className="bg-dark-700 rounded-lg p-3 text-sm mono text-accent-cyan">{answer}</pre>
          )}
          {explanation && (
            <p className="text-sm text-dark-400">{explanation}</p>
          )}
          <button onClick={onComplete} className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors text-sm font-medium">
            Weiter
          </button>
        </div>
      )}

      {showAnswer && !submitted && (
        <pre className="bg-dark-700 rounded-lg p-3 text-sm mono text-accent-cyan">{answer}</pre>
      )}
    </div>
  );
}
