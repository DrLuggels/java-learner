const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  signal: string | null;
}

export async function runJavaCode(code: string, input?: string): Promise<RunResult> {
  try {
    const response = await fetch(PISTON_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        version: '15.0.2',
        files: [{ name: 'Main.java', content: code }],
        stdin: input || '',
        run_timeout: 10000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Fehler: ${response.status}`);
    }

    const data = await response.json();
    const run = data.run;

    return {
      stdout: run.stdout || '',
      stderr: run.stderr || '',
      exitCode: run.code ?? 0,
      signal: run.signal || null,
    };
  } catch (error) {
    return {
      stdout: '',
      stderr: error instanceof Error ? error.message : 'Unbekannter Fehler bei der Ausführung',
      exitCode: 1,
      signal: null,
    };
  }
}

export function extractClassName(code: string): string {
  const match = code.match(/public\s+class\s+(\w+)/);
  return match ? match[1] : 'Main';
}

export function wrapInMainIfNeeded(code: string): string {
  if (code.includes('public static void main')) return code;
  if (code.includes('class ')) return code;
  return `public class Main {\n    public static void main(String[] args) {\n        ${code.replace(/\n/g, '\n        ')}\n    }\n}`;
}
