import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import CodeEditor from '../editor/CodeEditor';

interface MiniChallengeStepProps {
  instruction: string;
  starterCode: string;
  expectedOutput?: string;
  validationPattern?: string;
  hint?: string;
  onComplete: () => void;
}

export default function MiniChallengeStep({
  instruction, starterCode, expectedOutput, validationPattern, hint, onComplete,
}: MiniChallengeStepProps) {
  const [result, setResult] = useState<'pass' | 'fail' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleRunResult = (stdout: string, _stderr: string) => {
    const output = stdout.trim();

    if (validationPattern) {
      const regex = new RegExp(validationPattern);
      setResult(regex.test(output) ? 'pass' : 'fail');
    } else if (expectedOutput) {
      const normalize = (s: string) => s.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
      setResult(normalize(output) === normalize(expectedOutput) ? 'pass' : 'fail');
    } else {
      // No validation - just running is enough
      setResult(output.length > 0 ? 'pass' : 'fail');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-dark-800 border border-accent-orange/30 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-accent-orange mb-2">Mini-Challenge</h3>
        <p className="text-sm text-dark-200">{instruction}</p>
        {expectedOutput && (
          <p className="text-xs text-dark-500 mt-2">
            Erwartete Ausgabe: <code className="bg-dark-700 px-1 rounded text-accent-cyan">{expectedOutput}</code>
          </p>
        )}
      </div>

      <CodeEditor
        initialCode={starterCode}
        height="200px"
        showRunButton={true}
        onRunResult={handleRunResult}
      />

      {result && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${result === 'pass' ? 'success-box' : 'warning-box'}`}>
          {result === 'pass' ? (
            <><CheckCircle2 className="w-5 h-5 text-accent-green" /><span className="text-sm text-accent-green font-medium">Richtig! Gut gemacht.</span></>
          ) : (
            <><XCircle className="w-5 h-5 text-accent-red" /><span className="text-sm text-accent-red font-medium">Noch nicht ganz richtig. Versuche es nochmal!</span></>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {result === 'pass' && (
          <button onClick={onComplete} className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors text-sm font-medium">
            Weiter
          </button>
        )}
        {hint && !showHint && result === 'fail' && (
          <button onClick={() => setShowHint(true)} className="flex items-center gap-1 text-xs text-accent-orange hover:text-accent-orange/80">
            <Lightbulb className="w-3.5 h-3.5" /> Hinweis
          </button>
        )}
      </div>

      {showHint && hint && (
        <div className="hint-box text-sm text-dark-300">
          <span className="text-accent-orange font-medium">Hinweis:</span> {hint}
        </div>
      )}
    </div>
  );
}
