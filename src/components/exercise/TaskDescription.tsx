import { useState } from 'react';
import { ChevronRight, Lightbulb, Eye, EyeOff } from 'lucide-react';
import type { Exercise } from '../../types';

interface TaskDescriptionProps {
  exercise: Exercise;
  showHint: number;
  onShowHint: () => void;
}

export default function TaskDescription({ exercise, showHint, onShowHint }: TaskDescriptionProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="lesson-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(exercise.description) }} />

      {/* Requirements */}
      {exercise.requirements.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-dark-200 mb-2">Anforderungen:</h3>
          <ul className="space-y-1.5">
            {exercise.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dark-300">
                <ChevronRight className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tables */}
      {exercise.tables?.map((table, i) => (
        <div key={i}>
          <h3 className="text-sm font-semibold text-dark-200 mb-2">{table.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {table.headers.map((h, hi) => (
                    <th key={hi} className="bg-dark-700 border border-dark-600 px-3 py-2 text-left text-dark-200 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="bg-dark-800 border border-dark-600 px-3 py-2 text-dark-300 mono text-xs">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Expected Output */}
      {exercise.expectedOutput && (
        <div>
          <h3 className="text-sm font-semibold text-dark-200 mb-2">Erwartete Konsolenausgabe:</h3>
          <pre className="bg-dark-800 border border-dark-600 rounded-lg p-3 text-sm mono text-accent-cyan overflow-x-auto">
            {exercise.expectedOutput}
          </pre>
        </div>
      )}

      {/* Hints */}
      <div>
        <button
          onClick={onShowHint}
          disabled={showHint >= exercise.hints.length}
          className="flex items-center gap-2 text-sm text-accent-orange hover:text-accent-orange/80 disabled:text-dark-500 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          {showHint < exercise.hints.length
            ? `Hinweis anzeigen (${showHint}/${exercise.hints.length})`
            : 'Alle Hinweise angezeigt'}
        </button>
        {showHint > 0 && (
          <div className="mt-3 space-y-2">
            {exercise.hints.slice(0, showHint).map((hint, i) => (
              <div key={i} className="hint-box text-sm text-dark-300">
                <span className="text-accent-orange font-medium">Hinweis {i + 1}:</span> {hint}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Solution Toggle */}
      <div>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors"
        >
          {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showSolution ? 'Loesung verbergen' : 'Musterloesung anzeigen'}
        </button>
        {showSolution && (
          <pre className="mt-3 bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm mono text-dark-200 overflow-x-auto">
            {exercise.solutionCode}
          </pre>
        )}
      </div>
    </div>
  );
}

function renderMarkdown(md: string): string {
  let html = md;
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\n{2,}/g, '</p><p>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><\/p>/g, '');
  return html;
}
