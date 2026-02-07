import { runJavaCode } from './javaRunner';
import type { TestCase, TestCaseResult, TestRunResult } from '../types';

function normalize(s: string): string {
  return s.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
}

async function runSingleTest(code: string, testCase: TestCase): Promise<TestCaseResult> {
  try {
    const result = await runJavaCode(code, testCase.input);

    if (result.stderr && result.exitCode !== 0) {
      return {
        testCase,
        passed: false,
        actualOutput: result.stderr,
        error: result.stderr,
      };
    }

    const expected = normalize(testCase.expectedOutput);
    const actual = normalize(result.stdout);

    // Exact match first, then line-by-line containment
    const passed = actual === expected || actual.includes(expected);

    return { testCase, passed, actualOutput: result.stdout };
  } catch (e) {
    return {
      testCase,
      passed: false,
      actualOutput: '',
      error: e instanceof Error ? e.message : 'Unbekannter Fehler',
    };
  }
}

export type TestProgressCallback = (completed: number, total: number) => void;

export async function runTestCases(
  code: string,
  testCases: TestCase[],
  onProgress?: TestProgressCallback
): Promise<TestRunResult> {
  const results: TestCaseResult[] = [];

  // Run sequentially to avoid API rate limiting
  for (let i = 0; i < testCases.length; i++) {
    const result = await runSingleTest(code, testCases[i]);
    results.push(result);
    onProgress?.(i + 1, testCases.length);
  }

  const passedCount = results.filter(r => r.passed).length;

  return {
    results,
    allPassed: passedCount === results.length,
    passedCount,
    totalCount: results.length,
  };
}

// Fallback: single output comparison (for exercises without testCases)
export function compareOutput(actual: string, expected: string): boolean {
  return normalize(actual) === normalize(expected);
}
