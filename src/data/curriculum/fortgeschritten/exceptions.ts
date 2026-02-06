import type { Topic } from '../../../types';

export const exceptions: Topic = {
  id: 'exceptions',
  moduleId: 'fortgeschritten',
  title: 'Exceptions',
  description: 'Fehlerbehandlung mit try-catch, eigene Exceptions und Best Practices.',
  content: `## Was sind Exceptions?

Exceptions sind **unerwartete Ereignisse** während der Programmausführung. Java unterscheidet zwischen:

- **Checked Exceptions** — müssen behandelt werden (z.B. \`IOException\`)
- **Unchecked Exceptions** — Laufzeitfehler (z.B. \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`)
- **Errors** — schwerwiegende Fehler (z.B. \`OutOfMemoryError\`)

## try-catch-finally

\`\`\`java
try {
    int result = 10 / 0; // ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Fehler: " + e.getMessage());
} finally {
    System.out.println("Wird immer ausgeführt");
}
\`\`\`

## Eigene Exceptions

\`\`\`java
public class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}
\`\`\`

## try-with-resources (Java 7+)

Ressourcen die \`AutoCloseable\` implementieren werden automatisch geschlossen:

\`\`\`java
try (var scanner = new Scanner(System.in)) {
    String input = scanner.nextLine();
}
// Scanner wird automatisch geschlossen
\`\`\`

## Merke dir
- **Checked**: Compiler zwingt zur Behandlung → \`throws\` oder \`try-catch\`
- **Unchecked**: Programmierfehler → vermeiden statt fangen
- **finally** wird IMMER ausgeführt (auch bei return)
- Fange immer die **spezifischste** Exception zuerst`,
  codeExamples: [
    {
      title: 'try-catch-finally',
      description: 'Grundlegende Fehlerbehandlung mit verschiedenen Exception-Typen',
      code: `public class Main {
    public static void main(String[] args) {
        // Beispiel 1: ArithmeticException
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Mathe-Fehler: " + e.getMessage());
        }

        // Beispiel 2: Multi-catch
        try {
            String text = null;
            System.out.println(text.length());
        } catch (NullPointerException | ArrayIndexOutOfBoundsException e) {
            System.out.println("Fehler: " + e.getClass().getSimpleName());
        }

        // Beispiel 3: finally
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index ausserhalb!");
        } finally {
            System.out.println("Aufgeraeumt!");
        }
    }
}`,
      expectedOutput: 'Mathe-Fehler: / by zero\nFehler: NullPointerException\nIndex ausserhalb!\nAufgeraeumt!',
      editable: true,
    },
    {
      title: 'Eigene Exception erstellen',
      description: 'Custom Exception mit throw und throws',
      code: `class InvalidAgeException extends Exception {
    public InvalidAgeException(String msg) { super(msg); }
}

public class Main {
    static void setAge(int age) throws InvalidAgeException {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException("Alter muss zwischen 0 und 150 liegen, war: " + age);
        }
        System.out.println("Alter gesetzt: " + age);
    }

    public static void main(String[] args) {
        try {
            setAge(25);
            setAge(-5);
        } catch (InvalidAgeException e) {
            System.out.println("Fehler: " + e.getMessage());
        }
    }
}`,
      expectedOutput: 'Alter gesetzt: 25\nFehler: Alter muss zwischen 0 und 150 liegen, war: -5',
      editable: true,
    },
  ],
  quiz: [
    { id: 'exc-q1', question: 'Was ist der Unterschied zwischen Checked und Unchecked Exceptions?', options: ['Checked müssen behandelt werden, Unchecked nicht', 'Unchecked müssen behandelt werden, Checked nicht', 'Es gibt keinen Unterschied', 'Checked sind schneller'], correctIndex: 0, explanation: 'Checked Exceptions müssen mit try-catch oder throws deklariert werden. Unchecked (RuntimeException) nicht.' },
    { id: 'exc-q2', question: 'Wann wird der finally-Block ausgeführt?', options: ['Nur bei Fehlern', 'Nur wenn kein Fehler auftritt', 'Immer, auch bei return', 'Nie bei return'], correctIndex: 2, explanation: 'Der finally-Block wird IMMER ausgeführt — egal ob Exception, return oder normaler Ablauf.' },
  ],
  exercises: ['exceptions-01', 'exceptions-02'],
  keyConceptsDE: ['try-catch-finally', 'Checked vs Unchecked', 'throw/throws', 'Custom Exception', 'try-with-resources', 'Multi-catch'],
  transferKnowledge: 'Fehlerbehandlung gibt es in jeder Sprache: Python hat try/except, JavaScript hat try/catch, Go hat error-Returns. Das Konzept ist universal.',
  order: 36,
};
