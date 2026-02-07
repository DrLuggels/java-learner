import { useState, useCallback } from 'react';
import { CheckCircle2, XCircle, GripVertical, RotateCcw, Lightbulb } from 'lucide-react';
import type { Exercise } from '../../types';

interface ParsonsExerciseProps {
  exercise: Exercise;
  onComplete: (score: number) => void;
}

export default function ParsonsExercise({ exercise, onComplete }: ParsonsExerciseProps) {
  const correctLines = exercise.parsonsLines || [];
  const distractors = exercise.parsonsDistractors || [];
  const allLines = [...correctLines, ...distractors];

  const [availableLines, setAvailableLines] = useState(() =>
    [...allLines].sort(() => Math.random() - 0.5)
  );
  const [solutionLines, setSolutionLines] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<{ source: 'available' | 'solution'; idx: number } | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleDrop = useCallback((target: 'available' | 'solution', targetIdx?: number) => {
    if (!draggedIdx) return;

    const { source, idx } = draggedIdx;
    const item = source === 'available' ? availableLines[idx] : solutionLines[idx];

    if (source === 'available' && target === 'solution') {
      setAvailableLines(prev => prev.filter((_, i) => i !== idx));
      setSolutionLines(prev => {
        const next = [...prev];
        next.splice(targetIdx ?? prev.length, 0, item);
        return next;
      });
    } else if (source === 'solution' && target === 'available') {
      setSolutionLines(prev => prev.filter((_, i) => i !== idx));
      setAvailableLines(prev => [...prev, item]);
    } else if (source === 'solution' && target === 'solution' && targetIdx !== undefined) {
      setSolutionLines(prev => {
        const next = prev.filter((_, i) => i !== idx);
        next.splice(targetIdx, 0, item);
        return next;
      });
    }

    setDraggedIdx(null);
  }, [draggedIdx, availableLines, solutionLines]);

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect = solutionLines.length === correctLines.length &&
      solutionLines.every((line, i) => line === correctLines[i]);
    if (isCorrect) onComplete(100);
  };

  const reset = () => {
    setAvailableLines([...allLines].sort(() => Math.random() - 0.5));
    setSolutionLines([]);
    setSubmitted(false);
  };

  const isCorrect = submitted && solutionLines.length === correctLines.length &&
    solutionLines.every((line, i) => line === correctLines[i]);

  return (
    <div className="space-y-4">
      <div className="bg-dark-800 border border-accent-purple/30 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-accent-purple mb-2">Code-Zeilen sortieren</h3>
        <p className="text-sm text-dark-300">{exercise.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Available Lines */}
        <div>
          <span className="text-xs text-dark-500 uppercase tracking-wider mb-2 block">Verfuegbare Zeilen</span>
          <div
            className="min-h-[200px] bg-dark-900 border border-dark-600 rounded-lg p-2 space-y-1"
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop('available')}
          >
            {availableLines.map((line, i) => (
              <DraggableLine key={`a-${i}`} line={line} onDragStart={() => setDraggedIdx({ source: 'available', idx: i })} isDistractor={submitted && distractors.includes(line)} submitted={submitted} />
            ))}
            {availableLines.length === 0 && (
              <p className="text-xs text-dark-600 text-center py-8">Alle Zeilen platziert</p>
            )}
          </div>
        </div>

        {/* Solution Area */}
        <div>
          <span className="text-xs text-dark-500 uppercase tracking-wider mb-2 block">Deine Loesung</span>
          <div
            className="min-h-[200px] bg-dark-900 border-2 border-dashed border-dark-500 rounded-lg p-2 space-y-1"
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop('solution')}
          >
            {solutionLines.map((line, i) => (
              <DraggableLine key={`s-${i}`} line={line}
                onDragStart={() => setDraggedIdx({ source: 'solution', idx: i })}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={() => handleDrop('solution', i)}
                correct={submitted ? line === correctLines[i] : undefined}
                submitted={submitted} />
            ))}
            {solutionLines.length === 0 && (
              <p className="text-xs text-dark-600 text-center py-8">Ziehe Code-Zeilen hierher</p>
            )}
          </div>
        </div>
      </div>

      {/* Result */}
      {submitted && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${isCorrect ? 'success-box' : 'warning-box'}`}>
          {isCorrect ? (
            <><CheckCircle2 className="w-5 h-5 text-accent-green" /><span className="text-sm text-accent-green font-medium">Richtige Reihenfolge!</span></>
          ) : (
            <><XCircle className="w-5 h-5 text-accent-red" /><span className="text-sm text-accent-red font-medium">Noch nicht richtig. Pruefe die Reihenfolge.</span></>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {!submitted ? (
          <button onClick={handleSubmit} disabled={solutionLines.length === 0}
            className="px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 disabled:opacity-30 transition-colors text-sm font-medium">
            Pruefen
          </button>
        ) : !isCorrect ? (
          <button onClick={reset} className="flex items-center gap-1 px-4 py-2 bg-dark-700 text-dark-300 rounded-lg hover:bg-dark-600 transition-colors text-sm">
            <RotateCcw className="w-3.5 h-3.5" /> Nochmal
          </button>
        ) : null}
        {!submitted && exercise.hints.length > 0 && (
          <button onClick={() => setShowHint(true)} className="flex items-center gap-1 text-xs text-accent-orange hover:text-accent-orange/80">
            <Lightbulb className="w-3.5 h-3.5" /> Hinweis
          </button>
        )}
      </div>

      {showHint && exercise.hints[0] && (
        <div className="hint-box text-sm text-dark-300">{exercise.hints[0]}</div>
      )}
    </div>
  );
}

function DraggableLine({ line, onDragStart, onDragOver, onDrop, correct, isDistractor, submitted }: {
  line: string; onDragStart: () => void; onDragOver?: (e: React.DragEvent) => void; onDrop?: () => void;
  correct?: boolean; isDistractor?: boolean; submitted?: boolean;
}) {
  let borderColor = 'border-dark-600';
  if (submitted) {
    if (correct === true) borderColor = 'border-accent-green/50 bg-accent-green/5';
    else if (correct === false) borderColor = 'border-accent-red/50 bg-accent-red/5';
    if (isDistractor) borderColor = 'border-accent-orange/50 bg-accent-orange/5 line-through opacity-60';
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`flex items-center gap-2 px-3 py-2 bg-dark-800 border ${borderColor} rounded cursor-grab active:cursor-grabbing transition-colors`}
    >
      <GripVertical className="w-3 h-3 text-dark-600 shrink-0" />
      <code className="text-xs mono text-dark-200 whitespace-pre">{line}</code>
    </div>
  );
}
