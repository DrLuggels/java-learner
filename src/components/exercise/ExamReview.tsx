import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronRight, Trophy, Eye, EyeOff } from 'lucide-react';
import type { ExamExercise } from '../../types';

export interface ExamResult {
  exercise: ExamExercise;
  submittedCode: string;
  actualOutput: string;
  passed: boolean;
}

interface ExamReviewProps {
  results: ExamResult[];
  timeUsed: number;
  onRetry: () => void;
}

export default function ExamReview({ results, timeUsed, onRetry }: ExamReviewProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const score = total > 0 ? Math.round((passed / total) * 100) : 0;
  const minutes = Math.floor(timeUsed / 60);

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in">
      {/* Score Header */}
      <div className="text-center mb-8">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${score >= 50 ? 'text-accent-green' : 'text-accent-orange'}`} />
        <h1 className="text-3xl font-bold text-dark-100 mb-2">Klausur-Ergebnis</h1>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${score >= 50 ? 'text-accent-green' : 'text-accent-red'}`}>{score}%</div>
            <div className="text-xs text-dark-500 mt-1">Gesamtscore</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-dark-200">{passed}/{total}</div>
            <div className="text-xs text-dark-500 mt-1">Bestanden</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-dark-200">{minutes} Min</div>
            <div className="text-xs text-dark-500 mt-1">Bearbeitungszeit</div>
          </div>
        </div>
      </div>

      {/* Per-Question Review */}
      <div className="space-y-3 mb-8">
        {results.map((result, i) => (
          <ReviewItem key={i} index={i} result={result} expanded={expandedIdx === i} onToggle={() => setExpandedIdx(expandedIdx === i ? null : i)} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button onClick={onRetry} className="px-6 py-3 bg-accent-orange/20 text-accent-orange rounded-xl hover:bg-accent-orange/30 transition-colors font-medium">
          Nochmal versuchen
        </button>
      </div>
    </div>
  );
}

function ReviewItem({ index, result, expanded, onToggle }: { index: number; result: ExamResult; expanded: boolean; onToggle: () => void }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="border border-dark-600 rounded-lg overflow-hidden bg-dark-800">
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-dark-750 transition-colors">
        {result.passed ? <CheckCircle2 className="w-5 h-5 text-accent-green shrink-0" /> : <XCircle className="w-5 h-5 text-accent-red shrink-0" />}
        <span className="text-sm text-dark-200 flex-1 text-left">Aufgabe {index + 1}: {result.exercise.title}</span>
        {expanded ? <ChevronDown className="w-4 h-4 text-dark-500" /> : <ChevronRight className="w-4 h-4 text-dark-500" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-dark-700">
          {/* Student's output */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <span className="text-[10px] text-dark-500 uppercase tracking-wider">Deine Ausgabe</span>
              <pre className="mt-1 p-2 bg-dark-700 border border-dark-600 rounded text-xs mono text-dark-300 whitespace-pre-wrap max-h-32 overflow-auto">
                {result.actualOutput || '(Keine Ausgabe)'}
              </pre>
            </div>
            <div>
              <span className="text-[10px] text-dark-500 uppercase tracking-wider">Erwartet</span>
              <pre className="mt-1 p-2 bg-accent-green/5 border border-accent-green/20 rounded text-xs mono text-dark-300 whitespace-pre-wrap max-h-32 overflow-auto">
                {result.exercise.expectedOutput || '(Nicht definiert)'}
              </pre>
            </div>
          </div>

          {/* Solution toggle */}
          <button onClick={() => setShowSolution(!showSolution)} className="flex items-center gap-1 text-xs text-dark-400 hover:text-dark-200">
            {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showSolution ? 'Loesung verbergen' : 'Musterloesung anzeigen'}
          </button>
          {showSolution && (
            <pre className="p-3 bg-dark-900 border border-dark-600 rounded-lg text-xs mono text-dark-300 whitespace-pre-wrap max-h-64 overflow-auto">
              {result.exercise.solutionCode}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
