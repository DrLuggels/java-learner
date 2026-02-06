import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Clock, Trophy, AlertTriangle, Play, CheckCircle2, RotateCcw } from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import { getExamExercises } from '../data/examExercises';
import type { ExamExercise } from '../types';

export default function ExamPage() {
  const { examId } = useParams();
  const semester = examId === 'java2' ? 'java2' : 'java1';
  const allExercises = getExamExercises(semester);

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [finished, setFinished] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<ExamExercise[]>([]);

  useEffect(() => {
    if (started && !finished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft <= 0) setFinished(true);
  }, [started, finished, timeLeft]);

  const startExam = () => {
    const shuffled = [...allExercises].sort(() => Math.random() - 0.5);
    setSelectedExercises(shuffled.slice(0, Math.min(5, shuffled.length)));
    setStarted(true);
    setTimeLeft(90 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto p-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-dark-100 mb-2">
          <Trophy className="w-8 h-8 text-accent-orange inline mr-2" />
          Klausur-Simulator: {semester === 'java1' ? 'Java 1' : 'Java 2'}
        </h1>
        <p className="text-dark-400 mb-6">
          Simuliere eine echte Klausur unter Prüfungsbedingungen.
        </p>

        <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Prüfungsregeln</h2>
          <ul className="space-y-2 text-dark-300 text-sm">
            <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" /> Zeitlimit: 90 Minuten</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" /> 5 zufällige Aufgaben aus dem Pool</li>
            <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" /> Keine Hilfe, keine Hinweise — wie in der echten Klausur</li>
          </ul>
        </div>

        <div className="mb-6 text-sm text-dark-400">
          Verfügbare Aufgaben im Pool: <span className="text-dark-200 font-medium">{allExercises.length}</span>
        </div>

        <button
          onClick={startExam}
          disabled={allExercises.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-accent-orange/20 text-accent-orange rounded-xl hover:bg-accent-orange/30 transition-colors font-medium disabled:opacity-30"
        >
          <Play className="w-5 h-5" />
          Klausur starten
        </button>

        {allExercises.length === 0 && (
          <p className="mt-4 text-sm text-dark-500">Noch keine Klausuraufgaben verfügbar. Schließe zuerst einige Lektionen ab.</p>
        )}
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto p-6 animate-fade-in text-center">
        <Trophy className="w-16 h-16 text-accent-orange mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-dark-100 mb-2">Klausur beendet!</h1>
        <p className="text-dark-400 mb-6">Du hast alle Aufgaben bearbeitet oder die Zeit ist abgelaufen.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => { setStarted(false); setFinished(false); setCurrentIndex(0); }}
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 text-dark-200 rounded-lg hover:bg-dark-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Nochmal versuchen
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors"
          >
            Zurück zum Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentExercise = selectedExercises[currentIndex];

  return (
    <div className="h-full flex flex-col">
      {/* Timer Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-600">
        <div className="flex items-center gap-4">
          <span className="text-sm text-dark-400">
            Aufgabe {currentIndex + 1}/{selectedExercises.length}
          </span>
          <div className="flex gap-1">
            {selectedExercises.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                  i === currentIndex ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' : 'bg-dark-700 text-dark-400 hover:bg-dark-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className={`flex items-center gap-2 text-sm font-mono font-medium ${timeLeft < 300 ? 'text-accent-red' : 'text-dark-200'}`}>
          <Clock className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
        <button
          onClick={() => setFinished(true)}
          className="px-3 py-1.5 bg-accent-red/20 text-accent-red rounded-lg text-sm hover:bg-accent-red/30 transition-colors"
        >
          Abgeben
        </button>
      </div>

      {/* Exercise Content */}
      {currentExercise && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-[45%] overflow-y-auto p-6 border-b lg:border-b-0 lg:border-r border-dark-600">
            <h2 className="text-xl font-bold text-dark-100 mb-3">{currentExercise.title}</h2>
            <div className="lesson-content text-sm">
              <p className="text-dark-300 mb-4">{currentExercise.description}</p>
              {currentExercise.requirements.map((req, i) => (
                <p key={i} className="text-dark-300 mb-1">• {req}</p>
              ))}
              {currentExercise.expectedOutput && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-dark-200 mb-2">Erwartete Ausgabe:</h3>
                  <pre className="bg-dark-800 border border-dark-600 rounded-lg p-3 text-xs mono text-accent-cyan">
                    {currentExercise.expectedOutput}
                  </pre>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col p-4 overflow-hidden min-w-0">
            <div className="flex-1 min-h-0 min-w-0">
              <CodeEditor
                initialCode={currentExercise.starterCode}
                height="100%"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
