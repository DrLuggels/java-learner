import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Clock, Trophy, AlertTriangle, Play, CheckCircle2 } from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import ExamReview from '../components/exercise/ExamReview';
import type { ExamResult } from '../components/exercise/ExamReview';
import { getExamExercises } from '../data/examExercises';
import { runJavaCode } from '../utils/javaRunner';
import type { ExamExercise } from '../types';

export default function ExamPage() {
  const { examId } = useParams();
  const semester = examId === 'java2' ? 'java2' : 'java1';
  const allExercises = getExamExercises(semester);

  const [phase, setPhase] = useState<'start' | 'running' | 'grading' | 'review'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [exercises, setExercises] = useState<ExamExercise[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<ExamResult[]>([]);

  // Timer
  useEffect(() => {
    if (phase !== 'running' || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => {
      if (t <= 1) { submitExam(); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const startExam = () => {
    const shuffled = [...allExercises].sort(() => Math.random() - 0.5);
    setExercises(shuffled.slice(0, Math.min(5, shuffled.length)));
    setAnswers({});
    setPhase('running');
    setTimeLeft(90 * 60);
    setCurrentIndex(0);
  };

  const handleCodeChange = useCallback((code: string) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: code }));
  }, [currentIndex]);

  const submitExam = async () => {
    setPhase('grading');
    const examResults: ExamResult[] = [];

    for (let i = 0; i < exercises.length; i++) {
      const ex = exercises[i];
      const code = answers[i] || ex.starterCode;
      try {
        const run = await runJavaCode(code);
        const actual = run.stdout.trim();
        const expected = (ex.expectedOutput || '').trim();
        const passed = expected ? actual === expected : run.exitCode === 0;
        examResults.push({ exercise: ex, submittedCode: code, actualOutput: actual, passed });
      } catch {
        examResults.push({ exercise: ex, submittedCode: code, actualOutput: 'Ausfuehrungsfehler', passed: false });
      }
    }

    setResults(examResults);
    setPhase('review');
  };

  const retry = () => {
    setPhase('start');
    setCurrentIndex(0);
    setAnswers({});
    setResults([]);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (phase === 'start') return <ExamStart count={allExercises.length} semester={semester} onStart={startExam} />;
  if (phase === 'grading') return <GradingScreen />;
  if (phase === 'review') return <ExamReview results={results} timeUsed={90 * 60 - timeLeft} onRetry={retry} />;

  const currentExercise = exercises[currentIndex];

  return (
    <div className="h-full flex flex-col">
      {/* Timer Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-600 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-sm text-dark-400">Aufgabe {currentIndex + 1}/{exercises.length}</span>
          <div className="flex gap-1">
            {exercises.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)}
                className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                  i === currentIndex ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' :
                  answers[i] ? 'bg-accent-green/10 text-accent-green' : 'bg-dark-700 text-dark-400 hover:bg-dark-600'
                }`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className={`flex items-center gap-2 text-sm font-mono font-medium ${timeLeft < 300 ? 'text-accent-red' : 'text-dark-200'}`}>
          <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
        </div>
        <button onClick={submitExam} className="px-3 py-1.5 bg-accent-red/20 text-accent-red rounded-lg text-sm hover:bg-accent-red/30 transition-colors">
          Abgeben
        </button>
      </div>

      {/* Content */}
      {currentExercise && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-[45%] overflow-y-auto p-6 border-b lg:border-b-0 lg:border-r border-dark-600">
            <h2 className="text-xl font-bold text-dark-100 mb-3">{currentExercise.title}</h2>
            <p className="text-dark-300 text-sm mb-4">{currentExercise.description}</p>
            {currentExercise.requirements.map((req, i) => (
              <p key={i} className="text-dark-300 text-sm mb-1">• {req}</p>
            ))}
            {currentExercise.expectedOutput && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-dark-200 mb-2">Erwartete Ausgabe:</h3>
                <pre className="bg-dark-800 border border-dark-600 rounded-lg p-3 text-xs mono text-accent-cyan">{currentExercise.expectedOutput}</pre>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col p-4 overflow-hidden min-w-0">
            <div className="flex-1 min-h-0 min-w-0">
              <CodeEditor key={currentIndex} initialCode={answers[currentIndex] || currentExercise.starterCode} onCodeChange={handleCodeChange} height="100%" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExamStart({ count, semester, onStart }: { count: number; semester: string; onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-dark-100 mb-2">
        <Trophy className="w-8 h-8 text-accent-orange inline mr-2" />
        Klausur-Simulator: {semester === 'java1' ? 'Java 1' : 'Java 2'}
      </h1>
      <p className="text-dark-400 mb-6">Simuliere eine echte Klausur unter Pruefungsbedingungen.</p>
      <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Pruefungsregeln</h2>
        <ul className="space-y-2 text-dark-300 text-sm">
          <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" /> Zeitlimit: 90 Minuten</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" /> 5 zufaellige Aufgaben aus dem Pool</li>
          <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" /> Keine Hilfe — wie in der echten Klausur</li>
        </ul>
      </div>
      <p className="mb-6 text-sm text-dark-400">Aufgaben im Pool: <span className="text-dark-200 font-medium">{count}</span></p>
      <button onClick={onStart} disabled={count === 0} className="flex items-center gap-2 px-6 py-3 bg-accent-orange/20 text-accent-orange rounded-xl hover:bg-accent-orange/30 transition-colors font-medium disabled:opacity-30">
        <Play className="w-5 h-5" /> Klausur starten
      </button>
    </div>
  );
}

function GradingScreen() {
  return (
    <div className="flex items-center justify-center h-full animate-fade-in">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent-orange/30 border-t-accent-orange rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-dark-100 mb-2">Klausur wird ausgewertet...</h2>
        <p className="text-dark-400 text-sm">Deine Antworten werden ausgefuehrt und geprueft.</p>
      </div>
    </div>
  );
}
