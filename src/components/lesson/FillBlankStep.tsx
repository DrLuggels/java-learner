import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FillBlankStepProps {
  code: string;           // Code with {{0}}, {{1}}, ... placeholders
  answers: string[];      // Correct values for each blank
  onComplete: () => void;
}

export default function FillBlankStep({ code, answers, onComplete }: FillBlankStepProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(answers.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const parts = code.split(/(\{\{\d+\}\})/g);

  const handleChange = (index: number, value: string) => {
    setUserAnswers(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const normalize = (s: string) => s.trim().toLowerCase();
  const results = answers.map((ans, i) => normalize(userAnswers[i]) === normalize(ans));
  const allCorrect = results.every(Boolean);
  const filledAll = userAnswers.every(a => a.trim().length > 0);

  return (
    <div className="space-y-4">
      <div className="bg-dark-800 border border-accent-green/30 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-accent-green mb-3">Fuelle die Luecken aus</h3>
        <pre className="text-sm mono leading-relaxed whitespace-pre-wrap">
          {parts.map((part, i) => {
            const match = part.match(/\{\{(\d+)\}\}/);
            if (!match) {
              return <span key={i} className="text-dark-300">{part}</span>;
            }
            const idx = parseInt(match[1], 10);
            const isCorrect = submitted && results[idx];
            const isWrong = submitted && !results[idx];
            return (
              <input
                key={i}
                type="text"
                value={userAnswers[idx]}
                onChange={e => handleChange(idx, e.target.value)}
                disabled={submitted}
                className={`inline-block w-32 mx-1 px-2 py-0.5 rounded text-sm mono text-center border transition-colors ${
                  isCorrect ? 'bg-accent-green/10 border-accent-green/50 text-accent-green' :
                  isWrong ? 'bg-accent-red/10 border-accent-red/50 text-accent-red' :
                  'bg-dark-900 border-dark-500 text-dark-100 focus:border-accent-green/50 focus:outline-none'
                }`}
                placeholder="..."
              />
            );
          })}
        </pre>
      </div>

      {submitted && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${allCorrect ? 'success-box' : 'warning-box'}`}>
          {allCorrect ? (
            <><CheckCircle2 className="w-5 h-5 text-accent-green" /><span className="text-sm text-accent-green font-medium">Alle Luecken richtig!</span></>
          ) : (
            <><XCircle className="w-5 h-5 text-accent-red" /><span className="text-sm text-accent-red font-medium">
              {results.filter(Boolean).length}/{answers.length} richtig. Korrekte Antworten: {answers.join(', ')}
            </span></>
          )}
        </div>
      )}

      {!submitted ? (
        <button onClick={handleSubmit} disabled={!filledAll} className="px-4 py-2 bg-accent-green/20 text-accent-green rounded-lg hover:bg-accent-green/30 disabled:opacity-30 transition-colors text-sm font-medium">
          Pruefen
        </button>
      ) : (
        <button onClick={onComplete} className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors text-sm font-medium">
          Weiter
        </button>
      )}
    </div>
  );
}
