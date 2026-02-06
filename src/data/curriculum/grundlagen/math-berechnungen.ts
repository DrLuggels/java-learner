import type { Topic } from '../../../types';

export const mathBerechnungen: Topic = {
  id: 'math-berechnungen',
  moduleId: 'grundlagen',
  title: 'Math-Berechnungen',
  description: 'Die Math-Klasse: abs, pow, sqrt, max, min, round, ceil, floor und PI.',
  content: `# Die Math-Klasse

Die Klasse \`java.lang.Math\` bietet statische Methoden für mathematische Berechnungen. Sie muss **nicht importiert** werden (gehört zum \`java.lang\`-Paket).

## Wichtige Math-Methoden

| Methode | Beschreibung | Beispiel | Ergebnis |
|---------|-------------|----------|----------|
| \`Math.abs(x)\` | Betrag (Absolutwert) | \`Math.abs(-7)\` | 7 |
| \`Math.pow(b, e)\` | Potenz b^e | \`Math.pow(2, 10)\` | 1024.0 |
| \`Math.sqrt(x)\` | Quadratwurzel | \`Math.sqrt(144)\` | 12.0 |
| \`Math.max(a, b)\` | Größerer Wert | \`Math.max(5, 9)\` | 9 |
| \`Math.min(a, b)\` | Kleinerer Wert | \`Math.min(5, 9)\` | 5 |
| \`Math.round(x)\` | Kaufmännisch runden | \`Math.round(3.6)\` | 4 |
| \`Math.ceil(x)\` | Aufrunden | \`Math.ceil(3.1)\` | 4.0 |
| \`Math.floor(x)\` | Abrunden | \`Math.floor(3.9)\` | 3.0 |

## Wichtige Konstanten

- \`Math.PI\` = 3.141592653589793 (Kreiszahl)
- \`Math.E\` = 2.718281828459045 (Eulersche Zahl)

## Rückgabetypen beachten

- \`Math.pow()\`, \`Math.sqrt()\`, \`Math.ceil()\`, \`Math.floor()\` geben **double** zurück
- \`Math.round(double)\` gibt **long** zurück
- \`Math.round(float)\` gibt **int** zurück
- \`Math.abs()\`, \`Math.max()\`, \`Math.min()\` geben den Typ der Eingabe zurück`,
  codeExamples: [
    {
      title: 'Math-Methoden im Überblick',
      description: 'Alle wichtigen Methoden der Math-Klasse mit praktischen Beispielen.',
      code: `public class MathDemo {
    public static void main(String[] args) {
        System.out.println("=== Grundlegende Math-Methoden ===");
        System.out.println("Math.abs(-42):     " + Math.abs(-42));
        System.out.println("Math.pow(2, 10):   " + Math.pow(2, 10));
        System.out.println("Math.sqrt(144):    " + Math.sqrt(144));
        System.out.println("Math.max(17, 42):  " + Math.max(17, 42));
        System.out.println("Math.min(17, 42):  " + Math.min(17, 42));

        System.out.println("\\n=== Rundungsmethoden ===");
        double wert = 3.567;
        System.out.println("Wert:              " + wert);
        System.out.println("Math.round:        " + Math.round(wert));
        System.out.println("Math.ceil:         " + Math.ceil(wert));
        System.out.println("Math.floor:        " + Math.floor(wert));

        System.out.println("\\n=== Konstanten ===");
        System.out.println("Math.PI:           " + Math.PI);
        System.out.println("Math.E:            " + Math.E);

        // Praktisch: Auf 2 Nachkommastellen runden
        double preis = 19.99 * 1.19;
        double gerundet = Math.round(preis * 100.0) / 100.0;
        System.out.println("\\n=== Praxis ===");
        System.out.println("Brutto (roh):      " + preis);
        System.out.println("Brutto (gerundet): " + gerundet);
    }
}`,
      expectedOutput: `=== Grundlegende Math-Methoden ===
Math.abs(-42):     42
Math.pow(2, 10):   1024.0
Math.sqrt(144):    12.0
Math.max(17, 42):  42
Math.min(17, 42):  17

=== Rundungsmethoden ===
Wert:              3.567
Math.round:        4
Math.ceil:         4.0
Math.floor:        3.0

=== Konstanten ===
Math.PI:           3.141592653589793
Math.E:            2.718281828459045

=== Praxis ===
Brutto (roh):      23.7881
Brutto (gerundet): 23.79`,
      editable: true,
    },
    {
      title: 'Geometrische Berechnungen',
      description: 'Praktische Anwendung der Math-Klasse für Flächen, Umfänge und Abstände.',
      code: `public class GeometrieDemo {
    public static void main(String[] args) {
        // Kreis
        double radius = 5.0;
        double kreisFlaeche = Math.PI * Math.pow(radius, 2);
        double kreisUmfang = 2 * Math.PI * radius;

        System.out.println("=== Kreis (r = " + radius + ") ===");
        System.out.println("Fläche: " + Math.round(kreisFlaeche * 100.0) / 100.0);
        System.out.println("Umfang: " + Math.round(kreisUmfang * 100.0) / 100.0);

        // Pythagoras: Abstand zwischen zwei Punkten
        double x1 = 1, y1 = 2;
        double x2 = 4, y2 = 6;
        double abstand = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        System.out.println("\\n=== Abstand zweier Punkte ===");
        System.out.println("P1(" + x1 + ", " + y1 + ")");
        System.out.println("P2(" + x2 + ", " + y2 + ")");
        System.out.println("Abstand: " + Math.round(abstand * 100.0) / 100.0);

        // Hypotenuse (Pythagoras)
        double seiteA = 3, seiteB = 4;
        double hypotenuse = Math.sqrt(Math.pow(seiteA, 2) + Math.pow(seiteB, 2));

        System.out.println("\\n=== Pythagoras ===");
        System.out.println("a = " + seiteA + ", b = " + seiteB);
        System.out.println("c = " + hypotenuse);

        // Min/Max von mehreren Werten
        int a = 42, b = 17, c = 85, d = 3;
        int maximum = Math.max(Math.max(a, b), Math.max(c, d));
        int minimum = Math.min(Math.min(a, b), Math.min(c, d));
        System.out.println("\\n=== Min/Max ===");
        System.out.println("Werte: " + a + ", " + b + ", " + c + ", " + d);
        System.out.println("Max: " + maximum);
        System.out.println("Min: " + minimum);
    }
}`,
      expectedOutput: `=== Kreis (r = 5.0) ===
Fläche: 78.54
Umfang: 31.42

=== Abstand zweier Punkte ===
P1(1.0, 2.0)
P2(4.0, 6.0)
Abstand: 5.0

=== Pythagoras ===
a = 3.0, b = 4.0
c = 5.0

=== Min/Max ===
Werte: 42, 17, 85, 3
Max: 85
Min: 3`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'math-berechnungen-q1',
      question: 'Was gibt `Math.round(3.5)` zurück?',
      options: [
        '3',
        '4',
        '3.0',
        '3.5',
      ],
      correctIndex: 1,
      explanation: 'Math.round() rundet kaufmännisch: Bei .5 wird aufgerundet. Math.round(3.5) ergibt 4 (als long).',
    },
    {
      id: 'math-berechnungen-q2',
      question: 'Welchen Rückgabetyp hat `Math.pow(2, 3)`?',
      options: [
        'int (Wert: 8)',
        'long (Wert: 8)',
        'double (Wert: 8.0)',
        'float (Wert: 8.0)',
      ],
      correctIndex: 2,
      explanation: 'Math.pow() gibt immer double zurück, auch wenn das Ergebnis eine Ganzzahl ist. Math.pow(2, 3) ergibt 8.0 als double.',
    },
  ],
  exercises: ['operators-1', 'operators-2'],
  keyConceptsDE: [
    'Math-Methoden sind statisch — Aufruf über Math.methodenName()',
    'Math.pow() und Math.sqrt() geben immer double zurück',
    'Math.round() rundet kaufmännisch, Math.ceil() rundet auf, Math.floor() ab',
    'Math.PI und Math.E sind vordefinierte Konstanten',
    'Auf n Nachkommastellen runden: Math.round(x * 10^n) / 10^n',
  ],
  transferKnowledge: 'Math-Bibliotheken gibt es in jeder Programmiersprache. Python hat das math-Modul, JavaScript hat Math (gleiche Syntax!), C# hat System.Math. Die Methodennamen und die Funktionsweise sind nahezu identisch.',
  order: 9,
};
