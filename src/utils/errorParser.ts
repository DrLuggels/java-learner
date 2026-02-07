import type { ParsedError } from '../types';

const ERROR_PATTERNS: { pattern: RegExp; friendly: (m: RegExpMatchArray) => string }[] = [
  {
    pattern: /';' expected/,
    friendly: () => 'Semikolon fehlt am Zeilenende',
  },
  {
    pattern: /cannot find symbol.*symbol:\s*(variable|method|class)\s+(\w+)/s,
    friendly: (m) => `${m[1] === 'variable' ? 'Variable' : m[1] === 'method' ? 'Methode' : 'Klasse'} "${m[2]}" nicht gefunden`,
  },
  {
    pattern: /incompatible types:.*found:\s*(\S+).*required:\s*(\S+)/s,
    friendly: (m) => `Falscher Datentyp: erwartet ${m[2]}, gefunden ${m[1]}`,
  },
  {
    pattern: /class .+ is public, should be declared in a file named/,
    friendly: () => 'Die public-Klasse muss "Main" heissen (Dateiname = Main.java)',
  },
  {
    pattern: /reached end of file while parsing/,
    friendly: () => 'Geschweifte Klammer } fehlt - Code nicht vollstaendig geschlossen',
  },
  {
    pattern: /illegal start of expression/,
    friendly: () => 'Ungueltiger Ausdruck - pruefe Klammern und Syntaxfehler',
  },
  {
    pattern: /not a statement/,
    friendly: () => 'Kein gueltiges Statement - fehlt ein Operator oder Methodenaufruf?',
  },
  {
    pattern: /variable (\w+) might not have been initialized/,
    friendly: (m) => `Variable "${m[1]}" muss vor der Verwendung initialisiert werden`,
  },
  {
    pattern: /array required but (\w+) found/,
    friendly: (m) => `Array erwartet, aber ${m[1]} gefunden - ist das wirklich ein Array?`,
  },
  {
    pattern: /method (\w+)\(.+\) is already defined/,
    friendly: (m) => `Methode "${m[1]}" existiert bereits mit gleicher Signatur`,
  },
];

const RUNTIME_PATTERNS: { pattern: RegExp; friendly: (m: RegExpMatchArray) => string }[] = [
  {
    pattern: /NullPointerException/,
    friendly: () => 'Null-Referenz: Eine Variable hat keinen Wert (ist null)',
  },
  {
    pattern: /ArrayIndexOutOfBoundsException.*Index (\d+)/,
    friendly: (m) => `Array-Index ${m[1]} liegt ausserhalb der Array-Grenzen`,
  },
  {
    pattern: /StringIndexOutOfBoundsException/,
    friendly: () => 'String-Index ausserhalb der Grenzen - pruefe die Laenge',
  },
  {
    pattern: /StackOverflowError/,
    friendly: () => 'Endlose Rekursion - die Methode ruft sich unendlich oft selbst auf',
  },
  {
    pattern: /NumberFormatException.*"(.+)"/,
    friendly: (m) => `"${m[1]}" kann nicht in eine Zahl umgewandelt werden`,
  },
  {
    pattern: /ClassCastException/,
    friendly: () => 'Ungueltiger Typecast - das Objekt hat nicht den erwarteten Typ',
  },
];

function extractLineNumber(errorLine: string): number {
  const match = errorLine.match(/Main\.java:(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function parseErrors(stderr: string): ParsedError[] {
  if (!stderr.trim()) return [];

  const errors: ParsedError[] = [];
  const lines = stderr.split('\n');

  for (const line of lines) {
    const lineNum = extractLineNumber(line);

    // Check compile-time errors
    for (const { pattern, friendly } of ERROR_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        errors.push({
          line: lineNum,
          message: line.trim(),
          friendlyMessage: friendly(match),
          severity: 'error',
        });
        break;
      }
    }

    // Check runtime errors
    for (const { pattern, friendly } of RUNTIME_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        errors.push({
          line: lineNum || 1,
          message: line.trim(),
          friendlyMessage: friendly(match),
          severity: 'error',
        });
        break;
      }
    }
  }

  // If no patterns matched but there's stderr, return raw error
  if (errors.length === 0 && stderr.trim()) {
    const firstLine = stderr.trim().split('\n')[0];
    errors.push({
      line: extractLineNumber(firstLine) || 1,
      message: firstLine,
      friendlyMessage: firstLine.length > 100 ? firstLine.slice(0, 100) + '...' : firstLine,
      severity: 'error',
    });
  }

  return errors;
}
