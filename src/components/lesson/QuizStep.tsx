import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizQuestion } from '../../types';

interface QuizStepProps {
  question: QuizQuestion;
  onComplete: () => void;
}

export default function QuizStep({ question, onComplete }: QuizStepProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === question.correctIndex;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-4">
      <div className="bg-dark-800 border border-accent-purple/30 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-accent-purple mb-3">Wissens-Check</h3>
        <p className="text-dark-200 font-medium mb-4">{question.question}</p>

        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let style = 'border-dark-600 hover:border-dark-500';
            if (submitted) {
              if (i === question.correctIndex) style = 'border-accent-green/50 bg-accent-green/5';
              else if (i === selected && !isCorrect) style = 'border-accent-red/50 bg-accent-red/5';
            } else if (i === selected) {
              style = 'border-accent-purple/50 bg-accent-purple/5';
            }

            return (
              <button
                key={i}
                onClick={() => !submitted && setSelected(i)}
                className={`w-full text-left p-3 rounded-lg border ${style} transition-colors text-sm`}
                disabled={submitted}
              >
                <span className="text-dark-300">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {submitted && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${isCorrect ? 'success-box' : 'warning-box'}`}>
          {isCorrect ? (
            <><CheckCircle2 className="w-5 h-5 text-accent-green" /><span className="text-sm text-accent-green font-medium">Richtig!</span></>
          ) : (
            <><XCircle className="w-5 h-5 text-accent-red" /><span className="text-sm text-accent-red font-medium">Falsch.</span></>
          )}
          <span className="text-sm text-dark-400 ml-1">{question.explanation}</span>
        </div>
      )}

      {!submitted ? (
        <button onClick={handleSubmit} disabled={selected === null} className="px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 disabled:opacity-30 transition-colors text-sm font-medium">
          Antwort pruefen
        </button>
      ) : (
        <button onClick={onComplete} className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors text-sm font-medium">
          Weiter
        </button>
      )}
    </div>
  );
}
