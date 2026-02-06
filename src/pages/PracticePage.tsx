import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ChevronRight, CheckCircle2, XCircle, Lightbulb,
  Eye, EyeOff, ArrowLeft, Trophy, GripVertical
} from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import { useProgress } from '../hooks/useProgress';
import { getExerciseById } from '../data/exercises';

export default function PracticePage() {
  const { exerciseId } = useParams();
  const exercise = exerciseId ? getExerciseById(exerciseId) : undefined;
  const { completeExercise, isExerciseCompleted, saveCode, getSavedCode } = useProgress();

  const [showHint, setShowHint] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [, setLastOutput] = useState('');
  const [testResult, setTestResult] = useState<'pass' | 'fail' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());

  // Resizable split state
  const [splitPercent, setSplitPercent] = useState(45);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPercent = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.min(Math.max(newPercent, 20), 80));
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleDragStart = () => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  if (!exercise) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-dark-200 mb-2">Aufgabe nicht gefunden</h2>
          <Link to="/" className="text-accent-blue hover:underline">Zurück zur Übersicht</Link>
        </div>
      </div>
    );
  }

  const savedCode = getSavedCode(exercise.id);
  const completed = isExerciseCompleted(exercise.id);

  const difficultyColor = {
    leicht: 'text-accent-green bg-accent-green/10 border-accent-green/20',
    mittel: 'text-accent-orange bg-accent-orange/10 border-accent-orange/20',
    schwer: 'text-accent-red bg-accent-red/10 border-accent-red/20',
  };

  const handleRunResult = (stdout: string, _stderr: string) => {
    setLastOutput(stdout);
    setAttempts(prev => prev + 1);

    if (exercise.expectedOutput) {
      const normalizedExpected = exercise.expectedOutput.trim().replace(/\r\n/g, '\n');
      const normalizedActual = stdout.trim().replace(/\r\n/g, '\n');

      if (normalizedActual === normalizedExpected) {
        setTestResult('pass');
        const timeSec = Math.round((Date.now() - startTime) / 1000);
        completeExercise({
          exerciseId: exercise.id,
          completed: true,
          attempts: attempts + 1,
          hintsUsed: showHint,
          timeSeconds: timeSec,
          lastAttempt: new Date().toISOString(),
          score: Math.max(100 - (attempts * 10) - (showHint * 15), 10),
        });
      } else {
        setTestResult('fail');
      }
    }
  };

  const handleCodeChange = (code: string) => {
    saveCode(exercise.id, code);
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col lg:flex-row overflow-hidden animate-fade-in">
      {/* Left: Task Description */}
      <div
        className="lg:overflow-y-auto overflow-y-auto p-6 border-b lg:border-b-0 lg:border-r border-dark-600 min-h-[200px] lg:min-h-0"
        style={{ flex: `0 0 ${splitPercent}%` }}
      >
        <Link to="/" className="flex items-center gap-1 text-sm text-dark-400 hover:text-dark-200 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Zurück
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-dark-100">{exercise.title}</h1>
          {completed && <CheckCircle2 className="w-5 h-5 text-accent-green" />}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-0.5 rounded-full text-xs border ${difficultyColor[exercise.difficulty]}`}>
            {exercise.difficulty}
          </span>
          <span className="text-xs text-dark-500">Thema: {exercise.topicId}</span>
        </div>

        <div className="lesson-content mb-6" dangerouslySetInnerHTML={{ __html: renderMarkdown(exercise.description) }} />

        {/* Requirements */}
        {exercise.requirements.length > 0 && (
          <div className="mb-6">
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
          <div key={i} className="mb-6">
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
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-dark-200 mb-2">Erwartete Konsolenausgabe:</h3>
            <pre className="bg-dark-800 border border-dark-600 rounded-lg p-3 text-sm mono text-accent-cyan overflow-x-auto">
              {exercise.expectedOutput}
            </pre>
          </div>
        )}

        {/* Hints */}
        <div className="mb-6">
          <button
            onClick={() => setShowHint(prev => Math.min(prev + 1, exercise.hints.length))}
            disabled={showHint >= exercise.hints.length}
            className="flex items-center gap-2 text-sm text-accent-orange hover:text-accent-orange/80 disabled:text-dark-500 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint < exercise.hints.length ? `Hinweis anzeigen (${showHint}/${exercise.hints.length})` : 'Alle Hinweise angezeigt'}
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
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors"
        >
          {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showSolution ? 'Lösung verbergen' : 'Musterlösung anzeigen'}
        </button>
        {showSolution && (
          <div className="mt-3">
            <pre className="bg-dark-800 border border-dark-600 rounded-lg p-4 text-sm mono text-dark-200 overflow-x-auto">
              {exercise.solutionCode}
            </pre>
          </div>
        )}
      </div>

      {/* Resize Handle */}
      <div
        className="hidden lg:flex items-center justify-center w-2 cursor-col-resize hover:bg-accent-blue/20 active:bg-accent-blue/30 transition-colors group shrink-0"
        onMouseDown={handleDragStart}
      >
        <GripVertical className="w-3 h-3 text-dark-500 group-hover:text-accent-blue transition-colors" />
      </div>

      {/* Right: Code Editor */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 min-h-[300px] lg:min-h-0">
        <div className="flex-1 p-4 overflow-hidden flex flex-col min-h-0">
          {/* Test Result Banner */}
          {testResult && (
            <div className={`mb-3 p-3 rounded-lg flex items-center gap-2 shrink-0 ${
              testResult === 'pass' ? 'success-box' : 'warning-box'
            }`}>
              {testResult === 'pass' ? (
                <>
                  <Trophy className="w-5 h-5 text-accent-green" />
                  <span className="text-sm text-accent-green font-medium">Alle Tests bestanden! Gut gemacht!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-accent-red" />
                  <span className="text-sm text-accent-red font-medium">Ausgabe stimmt nicht überein. Versuche es nochmal!</span>
                </>
              )}
            </div>
          )}

          <div className="flex-1 min-h-0 min-w-0">
            <CodeEditor
              initialCode={savedCode || exercise.starterCode}
              onCodeChange={handleCodeChange}
              onRunResult={handleRunResult}
              height="100%"
            />
          </div>
        </div>
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
