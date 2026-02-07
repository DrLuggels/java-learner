import { CheckCircle2, XCircle, Loader2, ChevronDown, ChevronRight, FlaskConical } from 'lucide-react';
import { useState } from 'react';
import type { TestCaseResult, TestRunResult } from '../../types';

interface TestCasePanelProps {
  testRun: TestRunResult | null;
  isRunning: boolean;
  progress: { completed: number; total: number };
}

export default function TestCasePanel({ testRun, isRunning, progress }: TestCasePanelProps) {
  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  if (!testRun && !isRunning) return null;

  return (
    <div className="border border-dark-600 rounded-lg overflow-hidden bg-dark-800">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-dark-700 border-b border-dark-600">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-accent-purple" />
          <span className="text-sm font-medium text-dark-200">Test-Ergebnisse</span>
        </div>
        {isRunning ? (
          <RunningIndicator completed={progress.completed} total={progress.total} />
        ) : testRun ? (
          <SummaryBadge passedCount={testRun.passedCount} totalCount={testRun.totalCount} />
        ) : null}
      </div>

      {/* Test Case List */}
      {testRun && (
        <div className="divide-y divide-dark-700">
          {testRun.results.map((result, i) => (
            <TestCaseRow
              key={i}
              index={i}
              result={result}
              expanded={expandedTest === i}
              onToggle={() => setExpandedTest(expandedTest === i ? null : i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RunningIndicator({ completed, total }: { completed: number; total: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-dark-400">
      <Loader2 className="w-3.5 h-3.5 animate-spin text-accent-blue" />
      Test {completed}/{total} laeuft...
    </div>
  );
}

function SummaryBadge({ passedCount, totalCount }: { passedCount: number; totalCount: number }) {
  const allPassed = passedCount === totalCount;
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
      allPassed ? 'bg-accent-green/15 text-accent-green' : 'bg-accent-red/15 text-accent-red'
    }`}>
      {passedCount}/{totalCount} bestanden
    </span>
  );
}

function TestCaseRow({ index, result, expanded, onToggle }: {
  index: number;
  result: TestCaseResult;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-dark-750 transition-colors"
      >
        {result.passed ? (
          <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0" />
        ) : (
          <XCircle className="w-4 h-4 text-accent-red shrink-0" />
        )}
        <span className="text-sm text-dark-300 flex-1">
          Test {index + 1}: {result.testCase.description}
        </span>
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-dark-500" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-dark-500" />
        )}
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          {result.error ? (
            <ErrorBlock error={result.error} />
          ) : (
            <OutputDiff expected={result.testCase.expectedOutput} actual={result.actualOutput} />
          )}
        </div>
      )}
    </div>
  );
}

function ErrorBlock({ error }: { error: string }) {
  return (
    <div className="bg-accent-red/5 border border-accent-red/20 rounded p-2">
      <pre className="text-xs mono text-accent-red whitespace-pre-wrap">{error}</pre>
    </div>
  );
}

function OutputDiff({ expected, actual }: { expected: string; actual: string }) {
  return (
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div>
        <span className="text-dark-500 text-[10px] uppercase tracking-wider">Erwartet</span>
        <pre className="mt-1 p-2 bg-accent-green/5 border border-accent-green/20 rounded mono text-dark-300 whitespace-pre-wrap">
          {expected}
        </pre>
      </div>
      <div>
        <span className="text-dark-500 text-[10px] uppercase tracking-wider">Deine Ausgabe</span>
        <pre className="mt-1 p-2 bg-dark-700 border border-dark-600 rounded mono text-dark-300 whitespace-pre-wrap">
          {actual || '(Keine Ausgabe)'}
        </pre>
      </div>
    </div>
  );
}
