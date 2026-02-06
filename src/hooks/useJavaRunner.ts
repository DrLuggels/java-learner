import { useState, useCallback } from 'react';
import { runJavaCode, type RunResult } from '../utils/javaRunner';

interface UseJavaRunnerReturn {
  output: RunResult | null;
  isRunning: boolean;
  error: string | null;
  run: (code: string, input?: string) => Promise<RunResult>;
  clear: () => void;
}

export function useJavaRunner(): UseJavaRunnerReturn {
  const [output, setOutput] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (code: string, input?: string): Promise<RunResult> => {
    setIsRunning(true);
    setError(null);
    try {
      const result = await runJavaCode(code, input);
      setOutput(result);
      if (result.exitCode !== 0 && result.stderr) {
        setError(result.stderr);
      }
      return result;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Fehler bei der Ausführung';
      setError(msg);
      const errResult: RunResult = { stdout: '', stderr: msg, exitCode: 1, signal: null };
      setOutput(errResult);
      return errResult;
    } finally {
      setIsRunning(false);
    }
  }, []);

  const clear = useCallback(() => {
    setOutput(null);
    setError(null);
  }, []);

  return { output, isRunning, error, run, clear };
}
