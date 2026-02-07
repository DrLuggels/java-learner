import { Trophy, XCircle } from 'lucide-react';
import type { TestRunResult } from '../../types';

interface ResultBannerProps {
  simpleResult: 'pass' | 'fail' | null;
  testRun: TestRunResult | null;
  parsedErrors: string[];
}

export default function ResultBanner({ simpleResult, testRun, parsedErrors }: ResultBannerProps) {
  const showSuccess = simpleResult === 'pass' || testRun?.allPassed;
  const showFail = simpleResult === 'fail' || (testRun && !testRun.allPassed);

  return (
    <div className="px-4 pt-3 space-y-2 shrink-0">
      {showSuccess && (
        <div className="p-3 rounded-lg success-box flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent-green" />
          <span className="text-sm text-accent-green font-medium">
            {testRun ? `Alle ${testRun.totalCount} Tests bestanden!` : 'Ausgabe korrekt!'} Gut gemacht!
          </span>
        </div>
      )}
      {showFail && !showSuccess && (
        <div className="p-3 rounded-lg warning-box flex items-center gap-2">
          <XCircle className="w-5 h-5 text-accent-red" />
          <span className="text-sm text-accent-red font-medium">
            {testRun ? `${testRun.passedCount}/${testRun.totalCount} Tests bestanden` : 'Ausgabe stimmt nicht ueberein'}. Versuche es nochmal!
          </span>
        </div>
      )}
      {parsedErrors.length > 0 && (
        <div className="p-3 rounded-lg bg-accent-red/5 border border-accent-red/20 space-y-1">
          {parsedErrors.map((err, i) => (
            <p key={i} className="text-xs text-accent-red mono">&#x26A0; {err}</p>
          ))}
        </div>
      )}
    </div>
  );
}
