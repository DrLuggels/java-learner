import type { Topic } from '../../../types';

export const arrays: Topic = {
  id: 'arrays',
  moduleId: 'datenstrukturen',
  title: 'Arrays',
  description: 'Deklaration, Initialisierung, Zugriff, Iteration und nützliche Methoden für Arrays in Java.',
  content: `
## Arrays in Java

Ein **Array** ist eine Datenstruktur fester Größe, die mehrere Werte desselben Typs speichert. Jedes Element hat einen **Index**, der bei 0 beginnt.

### Deklaration und Initialisierung
- Deklaration mit Größe: \`int[] zahlen = new int[5];\`
- Direkte Initialisierung: \`int[] zahlen = {10, 20, 30};\`
- Die Größe ist nach der Erstellung **nicht mehr änderbar**.

### Zugriff und Länge
- Zugriff per Index: \`zahlen[0]\` für das erste Element
- Länge: \`zahlen.length\` (Eigenschaft, keine Methode!)
- **ArrayIndexOutOfBoundsException** bei ungültigem Index

### Iteration
- Klassisch mit \`for\`-Schleife und Index
- Elegant mit \`for-each\`: \`for (int z : zahlen)\`

### Mehrdimensionale Arrays
Zweidimensionale Arrays sind Arrays von Arrays: \`int[][] matrix = new int[3][4];\`

### Hilfsklasse java.util.Arrays
- \`Arrays.sort(arr)\` — sortiert das Array aufsteigend
- \`Arrays.toString(arr)\` — gibt eine lesbare String-Darstellung zurück
- \`Arrays.copyOf(arr, length)\` — erstellt eine Kopie mit neuer Länge
- \`Arrays.fill(arr, wert)\` — füllt das Array mit einem Wert

> **Merke:** Arrays haben eine feste Größe. Für dynamische Listen verwende \`ArrayList\`.
  `.trim(),
  codeExamples: [
    {
      title: 'Arrays erstellen und nutzen',
      description: 'Verschiedene Wege, Arrays zu deklarieren, zu füllen und darauf zuzugreifen.',
      code: `import java.util.Arrays;

public class ArrayGrundlagen {
    public static void main(String[] args) {
        // 1. Direkte Initialisierung
        String[] staedte = {"Berlin", "München", "Hamburg", "Köln"};
        System.out.println("Erste Stadt: " + staedte[0]);
        System.out.println("Anzahl: " + staedte.length);

        // 2. Deklaration mit Größe + Befüllung
        int[] fibonacci = new int[7];
        fibonacci[0] = 0;
        fibonacci[1] = 1;
        for (int i = 2; i < fibonacci.length; i++) {
            fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
        }
        System.out.println("Fibonacci: " + Arrays.toString(fibonacci));

        // 3. Iteration mit for-each
        System.out.print("Städte: ");
        for (String stadt : staedte) {
            System.out.print(stadt + " ");
        }
        System.out.println();
    }
}`,
      expectedOutput: `Erste Stadt: Berlin
Anzahl: 4
Fibonacci: [0, 1, 1, 2, 3, 5, 8]
Städte: Berlin München Hamburg Köln`,
      editable: true,
    },
    {
      title: 'Arrays.sort() und Arrays.toString()',
      description: 'Sortierung und formatierte Ausgabe von Arrays mit der Hilfsklasse Arrays.',
      code: `import java.util.Arrays;

public class ArrayMethoden {
    public static void main(String[] args) {
        int[] noten = {3, 1, 4, 2, 5, 1, 2};

        System.out.println("Unsortiert: " + Arrays.toString(noten));

        // Array sortieren (in-place)
        Arrays.sort(noten);
        System.out.println("Sortiert:   " + Arrays.toString(noten));

        // Kopie erstellen
        int[] kopie = Arrays.copyOf(noten, noten.length);
        System.out.println("Kopie:      " + Arrays.toString(kopie));

        // Array mit einem Wert füllen
        int[] nullen = new int[5];
        Arrays.fill(nullen, 42);
        System.out.println("Gefüllt:    " + Arrays.toString(nullen));

        // Vergleichen
        System.out.println("Gleich? " + Arrays.equals(noten, kopie));
    }
}`,
      expectedOutput: `Unsortiert: [3, 1, 4, 2, 5, 1, 2]
Sortiert:   [1, 1, 2, 2, 3, 4, 5]
Kopie:      [1, 1, 2, 2, 3, 4, 5]
Gefüllt:    [42, 42, 42, 42, 42]
Gleich? true`,
      editable: true,
    },
    {
      title: 'Mehrdimensionale Arrays',
      description: 'Zweidimensionale Arrays für Tabellen und Matrizen.',
      code: `import java.util.Arrays;

public class MehrdimensionaleArrays {
    public static void main(String[] args) {
        // 2D-Array: 3 Zeilen, 3 Spalten
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // Ausgabe der Matrix
        System.out.println("Matrix:");
        for (int[] zeile : matrix) {
            System.out.println("  " + Arrays.toString(zeile));
        }

        // Zugriff: matrix[zeile][spalte]
        System.out.println("Element [1][2]: " + matrix[1][2]);

        // Summe aller Elemente
        int summe = 0;
        for (int[] zeile : matrix) {
            for (int wert : zeile) {
                summe += wert;
            }
        }
        System.out.println("Summe aller Elemente: " + summe);
    }
}`,
      expectedOutput: `Matrix:
  [1, 2, 3]
  [4, 5, 6]
  [7, 8, 9]
Element [1][2]: 6
Summe aller Elemente: 45`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'arrays-q1',
      question: 'Was passiert, wenn man auf einen Index zugreift, der außerhalb der Array-Grenzen liegt?',
      options: [
        'Es wird null zurückgegeben',
        'Es wird 0 zurückgegeben',
        'Eine ArrayIndexOutOfBoundsException wird geworfen',
        'Das Array wird automatisch vergrößert',
      ],
      correctIndex: 2,
      explanation: 'Java prüft Array-Grenzen zur Laufzeit. Ein Zugriff auf einen ungültigen Index (negativ oder >= length) löst eine ArrayIndexOutOfBoundsException aus.',
    },
    {
      id: 'arrays-q2',
      question: 'Wie erhält man die Anzahl der Elemente eines Arrays `arr`?',
      options: [
        'arr.size()',
        'arr.length()',
        'arr.length',
        'arr.count()',
      ],
      correctIndex: 2,
      explanation: '`length` ist bei Arrays eine Eigenschaft (kein Methodenaufruf), daher ohne Klammern: `arr.length`. Bei ArrayList hingegen verwendet man `size()`.',
    },
  ],
  exercises: ['arrays-01', 'arrays-02'],
  keyConceptsDE: [
    'Array — Datenstruktur fester Größe für Werte gleichen Typs',
    'Index beginnt bei 0 — erstes Element ist arr[0]',
    'length — Eigenschaft (nicht Methode) für die Array-Länge',
    'Arrays.sort() — Array aufsteigend sortieren',
    'Arrays.toString() — Lesbare Darstellung eines Arrays',
    'Mehrdimensionale Arrays — Arrays von Arrays für Tabellen/Matrizen',
  ],
  transferKnowledge: 'Arrays sind die fundamentalste Datenstruktur in der Informatik. Sie existieren in praktisch jeder Programmiersprache: C/C++ (native Arrays), Python (list als flexiblere Variante), JavaScript (Array-Objekte). Das Verständnis von Index-basiertem Zugriff und fester Größe ist essenziell.',
  order: 14,
};
