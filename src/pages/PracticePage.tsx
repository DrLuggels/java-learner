import { useParams, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ArrowLeft, CheckCircle2, FlaskConical, GripVertical } from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import TestCasePanel from '../components/exercise/TestCasePanel';
import TaskDescription from '../components/exercise/TaskDescription';
import ParsonsExercise from '../components/exercise/ParsonsExercise';
import FixBugExercise from '../components/exercise/FixBugExercise';
import PredictOutputExercise from '../components/exercise/PredictOutputExercise';
import AIHintPanel from '../components/exercise/AIHintPanel';
import CodeReviewPanel from '../components/exercise/CodeReviewPanel';
import ResultBanner from '../components/exercise/ResultBanner';
import { useProgress } from '../hooks/useProgress';
import { useResizableSplit } from '../hooks/useResizableSplit';
import { getExerciseById } from '../data/exercises';
import { runTestCases, compareOutput } from '../utils/testRunner';
import { parseErrors } from '../utils/errorParser';
import type { TestRunResult } from '../types';

export default function PracticePage() {
  const { exerciseId } = useParams();
  const exercise = exerciseId ? getExerciseById(exerciseId) : undefined;
  const { completeExercise, isExerciseCompleted, saveCode, getSavedCode } = useProgress();
  const { splitPercent, containerRef, startDrag } = useResizableSplit(45);

  const [showHint, setShowHint] = useState(0);
  const [testRun, setTestRun] = useState<TestRunResult | null>(null);
  const [testRunning, setTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState({ completed: 0, total: 0 });
  const [simpleResult, setSimpleResult] = useState<'pass' | 'fail' | null>(null);
  const [parsedErrors, setParsedErrors] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const currentCode = useRef('');

  if (!exercise) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-dark-200 mb-2">Aufgabe nicht gefunden</h2>
          <Link to="/" className="text-accent-blue hover:underline">Zurueck zur Uebersicht</Link>
        </div>
      </div>
    );
  }

  const savedCode = getSavedCode(exercise.id);
  const completed = isExerciseCompleted(exercise.id);
  const hasTestCases = exercise.testCases.length > 0;
  const exerciseType = exercise.exerciseType || 'code';

  // Non-code exercise types get a simpler layout
  if (exerciseType !== 'code') {
    const handleSpecialComplete = (score: number) => {
      completeExercise({
        exerciseId: exercise.id, completed: true, attempts: 1,
        hintsUsed: 0, timeSeconds: Math.round((Date.now() - startTime) / 1000),
        lastAttempt: new Date().toISOString(), score,
      });
    };
    return (
      <div className="max-w-3xl mx-auto p-6 animate-fade-in">
        <Link to="/" className="flex items-center gap-1 text-sm text-dark-400 hover:text-dark-200 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Zurueck
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-dark-100">{exercise.title}</h1>
          {completed && <CheckCircle2 className="w-5 h-5 text-accent-green" />}
        </div>
        {exerciseType === 'parsons' && <ParsonsExercise exercise={exercise} onComplete={handleSpecialComplete} />}
        {exerciseType === 'fix-bug' && <FixBugExercise exercise={exercise} onComplete={handleSpecialComplete} />}
        {exerciseType === 'predict-output' && <PredictOutputExercise exercise={exercise} onComplete={handleSpecialComplete} />}
      </div>
    );
  }

  const markComplete = () => {
    completeExercise({
      exerciseId: exercise.id, completed: true, attempts: attempts + 1,
      hintsUsed: showHint, timeSeconds: Math.round((Date.now() - startTime) / 1000),
      lastAttempt: new Date().toISOString(),
      score: Math.max(100 - (attempts * 10) - (showHint * 15), 10),
    });
  };

  const handleRunResult = (stdout: string, stderr: string) => {
    setAttempts(prev => prev + 1);
    if (stderr) {
      setParsedErrors(parseErrors(stderr).map(e => e.friendlyMessage));
    } else {
      setParsedErrors([]);
    }
    if (exercise.expectedOutput && !hasTestCases) {
      const passed = compareOutput(stdout, exercise.expectedOutput);
      setSimpleResult(passed ? 'pass' : 'fail');
      if (passed) markComplete();
    }
  };

  const handleRunTests = async () => {
    if (!hasTestCases || testRunning) return;
    setTestRunning(true);
    setTestProgress({ completed: 0, total: exercise.testCases.length });
    setSimpleResult(null);
    const result = await runTestCases(
      currentCode.current || savedCode || exercise.starterCode,
      exercise.testCases,
      (done, total) => setTestProgress({ completed: done, total })
    );
    setTestRun(result);
    setTestRunning(false);
    setAttempts(prev => prev + 1);
    if (result.allPassed) markComplete();
  };

  const handleCodeChange = (code: string) => {
    currentCode.current = code;
    saveCode(exercise.id, code);
  };

  const difficultyColor = {
    leicht: 'text-accent-green bg-accent-green/10 border-accent-green/20',
    mittel: 'text-accent-orange bg-accent-orange/10 border-accent-orange/20',
    schwer: 'text-accent-red bg-accent-red/10 border-accent-red/20',
  };

  const codeForAI = currentCode.current || savedCode || exercise.starterCode;

  return (
    <div ref={containerRef} className="h-full flex flex-col lg:flex-row overflow-hidden animate-fade-in">
      {/* Left: Task */}
      <div className="lg:overflow-y-auto overflow-y-auto p-6 border-b lg:border-b-0 lg:border-r border-dark-600 min-h-[200px] lg:min-h-0" style={{ flex: `0 0 ${splitPercent}%` }}>
        <Link to="/" className="flex items-center gap-1 text-sm text-dark-400 hover:text-dark-200 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Zurueck
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-dark-100">{exercise.title}</h1>
          {completed && <CheckCircle2 className="w-5 h-5 text-accent-green" />}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-0.5 rounded-full text-xs border ${difficultyColor[exercise.difficulty]}`}>{exercise.difficulty}</span>
          <span className="text-xs text-dark-500">Thema: {exercise.topicId}</span>
        </div>
        <TaskDescription exercise={exercise} showHint={showHint} onShowHint={() => setShowHint(prev => Math.min(prev + 1, exercise.hints.length))} />
      </div>

      {/* Resize Handle */}
      <div className="hidden lg:flex items-center justify-center w-2 cursor-col-resize hover:bg-accent-blue/20 active:bg-accent-blue/30 transition-colors group shrink-0" onMouseDown={startDrag}>
        <GripVertical className="w-3 h-3 text-dark-500 group-hover:text-accent-blue transition-colors" />
      </div>

      {/* Right: Editor + Tests */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 min-h-[300px] lg:min-h-0">
        <ResultBanner simpleResult={simpleResult} testRun={testRun} parsedErrors={parsedErrors} />
        {hasTestCases && (
          <div className="px-4 pt-3 shrink-0">
            <button onClick={handleRunTests} disabled={testRunning} className="flex items-center gap-2 px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 disabled:opacity-50 transition-colors text-sm font-medium">
              <FlaskConical className="w-4 h-4" />
              {testRunning ? 'Tests laufen...' : 'Tests ausfuehren'}
            </button>
          </div>
        )}
        <div className="flex-1 p-4 overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 min-h-0 min-w-0">
            <CodeEditor initialCode={savedCode || exercise.starterCode} onCodeChange={handleCodeChange} onRunResult={handleRunResult} height="100%" />
          </div>
        </div>
        <div className="px-4 flex items-start gap-2 shrink-0">
          <AIHintPanel exercise={exercise} code={codeForAI} testRun={testRun} simpleResult={simpleResult} />
          <CodeReviewPanel exercise={exercise} code={codeForAI} />
        </div>
        {hasTestCases && (
          <div className="px-4 pb-4 shrink-0">
            <TestCasePanel testRun={testRun} isRunning={testRunning} progress={testProgress} />
          </div>
        )}
      </div>
    </div>
  );
}
