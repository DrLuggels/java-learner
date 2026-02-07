import { useState } from 'react';
import { CheckCircle2, XCircle, Play, Eye } from 'lucide-react';
import type { Exercise } from '../../types';
import { runJavaCode } from '../../utils/javaRunner';

interface PredictOutputExerciseProps {
  exercise: Exercise;
  onComplete: (score: number) => void;
}

export default function PredictOutputExercise({ exercise, onComplete }: PredictOutputExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [actualOutput, setActualOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const options = exercise.predictOptions || [];
  const correctIdx = exercise.correctPredictIndex ?? 0;
  const isCorrect = selectedOption === correctIdx;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (isCorrect) onComplete(100);
  };

  const handleVerify = async () => {
    setRunning(true);
    const code = exercise.predictCode || exercise.starterCode;
    const result = await runJavaCode(code);
    setActualOutput(result.stdout.trim() || result.stderr.trim());
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      {/* Code to analyze */}
      <div className="bg-dark-800 border border-accent-purple/30 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-accent-purple mb-3">Was gibt dieser Code aus?</h3>
        <pre className="bg-dark-900 rounded-lg p-4 text-sm mono text-dark-200 overflow-x-auto">
          <code>{exercise.predictCode || exercise.starterCode}</code>
        </pre>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt, i) => {
          let style = 'border-dark-600 hover:border-dark-500';
          if (submitted) {
            if (i === correctIdx) style = 'border-accent-green/50 bg-accent-green/5';
            else if (i === selectedOption && !isCorrect) style = 'border-accent-red/50 bg-accent-red/5';
          } else if (i === selectedOption) {
            style = 'border-accent-purple/50 bg-accent-purple/5';
          }

          return (
            <button key={i} onClick={() => !submitted && setSelectedOption(i)}
              className={`w-full text-left p-3 rounded-lg border ${style} transition-colors`} disabled={submitted}>
              <pre className="text-sm mono text-dark-300 whitespace-pre-wrap">{opt}</pre>
            </button>
          );
        })}
      </div>

      {/* Result */}
      {submitted && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${isCorrect ? 'success-box' : 'warning-box'}`}>
          {isCorrect ? (
            <><CheckCircle2 className="w-5 h-5 text-accent-green" /><span className="text-sm text-accent-green font-medium">Richtig!</span></>
          ) : (
            <><XCircle className="w-5 h-5 text-accent-red" /><span className="text-sm text-accent-red font-medium">Falsch. Die korrekte Antwort ist markiert.</span></>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {!submitted ? (
          <button onClick={handleSubmit} disabled={selectedOption === null}
            className="px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 disabled:opacity-30 transition-colors text-sm font-medium">
            Pruefen
          </button>
        ) : (
          <button onClick={handleVerify} disabled={running}
            className="flex items-center gap-1 px-4 py-2 bg-dark-700 text-dark-300 rounded-lg hover:bg-dark-600 transition-colors text-sm">
            {running ? <div className="w-3.5 h-3.5 border-2 border-dark-400/30 border-t-dark-400 rounded-full animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            Code ausfuehren zum Pruefen
          </button>
        )}
      </div>

      {/* Actual output after verification */}
      {actualOutput !== null && (
        <div>
          <span className="text-xs text-dark-500 flex items-center gap-1"><Eye className="w-3 h-3" /> Tatsaechliche Ausgabe:</span>
          <pre className="mt-1 p-2 bg-dark-900 border border-dark-600 rounded text-sm mono text-accent-cyan">{actualOutput}</pre>
        </div>
      )}
    </div>
  );
}
