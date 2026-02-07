import { useState } from 'react';
import { Bug, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import CodeEditor from '../editor/CodeEditor';
import type { Exercise } from '../../types';
import { compareOutput } from '../../utils/testRunner';

interface FixBugExerciseProps {
  exercise: Exercise;
  onComplete: (score: number) => void;
}

export default function FixBugExercise({ exercise, onComplete }: FixBugExerciseProps) {
  const [result, setResult] = useState<'pass' | 'fail' | null>(null);
  const [showHint, setShowHint] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleRunResult = (stdout: string, _stderr: string) => {
    setAttempts(prev => prev + 1);

    if (exercise.expectedOutput) {
      const passed = compareOutput(stdout, exercise.expectedOutput);
      setResult(passed ? 'pass' : 'fail');
      if (passed) {
        const score = Math.max(100 - (attempts * 10) - (showHint * 15), 10);
        onComplete(score);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Bug description */}
      <div className="bg-dark-800 border border-accent-red/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Bug className="w-5 h-5 text-accent-red" />
          <h3 className="text-sm font-semibold text-accent-red">Bug finden und fixen!</h3>
        </div>
        <p className="text-sm text-dark-300">{exercise.bugDescription || exercise.description}</p>
        {exercise.expectedOutput && (
          <div className="mt-3">
            <span className="text-xs text-dark-500">Erwartete Ausgabe:</span>
            <pre className="mt-1 bg-dark-900 rounded p-2 text-xs mono text-accent-cyan">{exercise.expectedOutput}</pre>
          </div>
        )}
      </div>

      {/* Buggy code editor */}
      <CodeEditor
        initialCode={exercise.buggyCode || exercise.starterCode}
        height="250px"
        showRunButton={true}
        onRunResult={handleRunResult}
      />

      {/* Result */}
      {result && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${result === 'pass' ? 'success-box' : 'warning-box'}`}>
          {result === 'pass' ? (
            <><CheckCircle2 className="w-5 h-5 text-accent-green" /><span className="text-sm text-accent-green font-medium">Bug gefixt! Gut gemacht!</span></>
          ) : (
            <><XCircle className="w-5 h-5 text-accent-red" /><span className="text-sm text-accent-red font-medium">Noch nicht gefixt. Schau nochmal genau hin!</span></>
          )}
        </div>
      )}

      {/* Hints */}
      {exercise.hints.length > 0 && showHint < exercise.hints.length && (
        <button
          onClick={() => setShowHint(prev => prev + 1)}
          className="flex items-center gap-1 text-xs text-accent-orange hover:text-accent-orange/80"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          Hinweis ({showHint}/{exercise.hints.length})
        </button>
      )}
      {showHint > 0 && (
        <div className="space-y-2">
          {exercise.hints.slice(0, showHint).map((hint, i) => (
            <div key={i} className="hint-box text-sm text-dark-300">
              <span className="text-accent-orange font-medium">Hinweis {i + 1}:</span> {hint}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
