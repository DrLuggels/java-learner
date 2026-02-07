import { useState } from 'react';
import { Sparkles, Loader2, X } from 'lucide-react';
import { sendToAI, isAIConfigured } from '../../utils/aiProvider';
import type { TestRunResult, Exercise } from '../../types';

interface AIHintPanelProps {
  exercise: Exercise;
  code: string;
  testRun: TestRunResult | null;
  simpleResult: 'pass' | 'fail' | null;
}

export default function AIHintPanel({ exercise, code, testRun, simpleResult }: AIHintPanelProps) {
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!isAIConfigured()) return null;

  const hasFailed = simpleResult === 'fail' || (testRun && !testRun.allPassed);
  if (!hasFailed || dismissed) return null;

  const handleGetHint = async () => {
    setLoading(true);
    try {
      const failedTests = testRun?.results
        .filter(r => !r.passed)
        .map(r => `- ${r.testCase.description}: erwartet "${r.testCase.expectedOutput}", bekommen "${r.actualOutput}"`)
        .join('\n') || '';

      const prompt = `Der Student arbeitet an der Aufgabe "${exercise.title}".
Beschreibung: ${exercise.description}
Anforderungen: ${exercise.requirements.join(', ')}

Sein Code:
\`\`\`java
${code}
\`\`\`

${failedTests ? `Fehlgeschlagene Tests:\n${failedTests}` : `Die Ausgabe stimmt nicht mit "${exercise.expectedOutput}" ueberein.`}

Gib einen kurzen, hilfreichen Hinweis (max 3 Saetze) auf Deutsch. Verrate NICHT die Loesung, sondern lenke den Studenten in die richtige Richtung. Fokussiere auf den wahrscheinlichsten Fehler.`;

      const response = await sendToAI([{ role: 'user', content: prompt }]);
      setHint(response);
    } catch {
      setHint('Hinweis konnte nicht geladen werden.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      {!hint && !loading && (
        <button onClick={handleGetHint}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent-purple/10 text-accent-purple rounded-lg hover:bg-accent-purple/20 transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Tutor um Hilfe bitten
        </button>
      )}
      {loading && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-accent-purple/5 border border-accent-purple/20 text-sm text-dark-400">
          <Loader2 className="w-4 h-4 animate-spin text-accent-purple" />
          Analysiere deinen Code...
        </div>
      )}
      {hint && (
        <div className="p-3 rounded-lg bg-accent-purple/5 border border-accent-purple/20 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-accent-purple flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI-Tutor Hinweis
            </span>
            <button onClick={() => setDismissed(true)} className="text-dark-500 hover:text-dark-300">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm text-dark-300 leading-relaxed">{hint}</p>
        </div>
      )}
    </div>
  );
}
