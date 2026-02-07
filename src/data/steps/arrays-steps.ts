import type { LessonStep } from '../../types';

export const arraysSteps: LessonStep[] = [
  {
    id: 'ar-step-1',
    type: 'content',
    title: 'Arrays: Die Grundlagen',
    content: `## Arrays in Java
Ein **Array** ist eine Datenstruktur mit **fester Größe** für Werte desselben Typs.

### Eigenschaften
- Gleicher Datentyp, unveränderliche Größe, Index ab 0

### Deklaration & Initialisierung
\`\`\`java
int[] zahlen = new int[5];  // Mit Größe
int[] zahlen = {10, 20, 30};  // Mit Werten
\`\`\`

### Zugriff & Länge
\`\`\`java
zahlen[0] = 100;  // Zugriff
System.out.println(zahlen.length);  // Länge (ohne Klammern!)
\`\`\``,
  },
  {
    id: 'ar-step-2',
    type: 'fill-blank',
    title: 'Vervollständige die Array-Deklaration',
    fillBlankCode: `// Erstelle ein Array für 5 ganze Zahlen
{{0}}[] zahlen = {{1}} int[{{2}}];

// Setze das erste Element auf 100
zahlen[0] = 100;`,
    fillBlankAnswers: ['int', 'new', '5'],
  },
  {
    id: 'ar-step-3',
    type: 'predict-output',
    title: 'Vorhersage: Array-Zugriff',
    predictCode: `int[] arr = {10, 20, 30};
System.out.println(arr[1]);
System.out.println(arr.length);`,
    predictAnswer: '20\n3',
    predictExplanation: 'arr[1] greift auf das zweite Element zu (Index 1), das den Wert 20 hat. arr.length gibt die Anzahl der Elemente zurück, also 3. Beachte: Der Index beginnt bei 0, also ist arr[0]=10, arr[1]=20, arr[2]=30.',
  },
  {
    id: 'ar-step-4',
    type: 'code-example',
    title: 'Arrays durchlaufen',
    codeExample: {
      title: 'Iteration über Arrays',
      description: 'Zwei Methoden, um Arrays zu durchlaufen: klassische for-Schleife mit Index und elegante for-each-Schleife.',
      code: `public class ArrayIteration {
    public static void main(String[] args) {
        String[] staedte = {"Berlin", "München", "Hamburg", "Köln", "Frankfurt"};

        // Methode 1: Klassische for-Schleife mit Index
        System.out.println("Mit klassischer for-Schleife:");
        for (int i = 0; i < staedte.length; i++) {
            System.out.println((i + 1) + ". " + staedte[i]);
        }

        // Methode 2: for-each-Schleife (eleganter, wenn Index nicht benötigt)
        System.out.println("\\nMit for-each-Schleife:");
        for (String stadt : staedte) {
            System.out.println("- " + stadt);
        }

        // Summe eines Arrays berechnen
        int[] zahlen = {5, 10, 15, 20, 25};
        int summe = 0;
        for (int zahl : zahlen) {
            summe += zahl;
        }
        System.out.println("\\nSumme: " + summe);
    }
}`,
      expectedOutput: `Mit klassischer for-Schleife:
1. Berlin
2. München
3. Hamburg
4. Köln
5. Frankfurt

Mit for-each-Schleife:
- Berlin
- München
- Hamburg
- Köln
- Frankfurt

Summe: 75`,
      editable: true,
    },
  },
  {
    id: 'ar-step-5',
    type: 'challenge',
    title: 'Challenge: Array-Summe berechnen',
    challenge: {
      instruction: 'Erstelle ein Array mit den Werten 5, 10, 15, 20, 25. Berechne die Summe aller Elemente und gib sie im Format "Summe: X" aus.',
      starterCode: `public class ArraySumme {
    public static void main(String[] args) {
        // Erstelle das Array


        // Berechne die Summe


        // Gib die Summe aus

    }
}`,
      expectedOutput: 'Summe: 75',
      hint: 'Verwende eine for-each-Schleife und addiere jedes Element zu einer Summen-Variable.',
    },
  },
  {
    id: 'ar-step-6',
    type: 'content',
    title: 'Mehrdimensionale Arrays und Arrays-Klasse',
    content: `## Mehrdimensionale Arrays
\`\`\`java
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int wert = matrix[1][2];  // Zeile 1, Spalte 2 (= 6)
\`\`\`

## java.util.Arrays - Nützliche Methoden
- \`Arrays.sort(arr)\` - Sortiert aufsteigend
- \`Arrays.toString(arr)\` - Gibt [1, 2, 3] aus
- \`Arrays.copyOf(arr, length)\` - Erstellt Kopie
- \`Arrays.fill(arr, wert)\` - Füllt Array
- \`Arrays.equals(arr1, arr2)\` - Vergleicht Arrays

> **Wichtig:** \`import java.util.Arrays;\` nicht vergessen!`,
  },
  {
    id: 'ar-step-7',
    type: 'predict-output',
    title: 'Vorhersage: Arrays.sort() und toString()',
    predictCode: `int[] a = {3, 1, 2};
java.util.Arrays.sort(a);
System.out.println(java.util.Arrays.toString(a));`,
    predictAnswer: '[1, 2, 3]',
    predictExplanation: 'Arrays.sort() sortiert das Array aufsteigend (in-place), sodass aus {3, 1, 2} → {1, 2, 3} wird. Arrays.toString() wandelt das Array in eine lesbare String-Darstellung um: [1, 2, 3].',
  },
  {
    id: 'ar-step-8',
    type: 'quiz',
    title: 'Quiz: Array-Fehler',
    quizQuestion: {
      id: 'ar-quiz-1',
      question: 'Was passiert, wenn man versucht, auf einen Index außerhalb der Array-Grenzen zuzugreifen (z.B. arr[10] bei einem Array mit 5 Elementen)?',
      options: [
        'Es wird automatisch 0 oder null zurückgegeben',
        'Das Array wird automatisch vergrößert',
        'Eine ArrayIndexOutOfBoundsException wird geworfen',
        'Der Compiler verhindert das Kompilieren',
      ],
      correctIndex: 2,
      explanation: 'Java prüft zur Laufzeit die Array-Grenzen. Ein Zugriff auf einen ungültigen Index (negativ oder >= length) löst eine ArrayIndexOutOfBoundsException aus. Der Compiler kann dies nicht im Voraus erkennen, da der Index oft erst zur Laufzeit bekannt ist.',
    },
  },
];
