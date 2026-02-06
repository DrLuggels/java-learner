import type { Topic } from '../../../types';

export const algorithmen: Topic = {
  id: 'algorithmen',
  moduleId: 'frameworks',
  title: 'Algorithmen',
  description: 'Sortieralgorithmen (BubbleSort, SelectionSort, InsertionSort), BinarySearch und die O-Notation.',
  content: `# Algorithmen und Komplexitaet

Ein **Algorithmus** ist eine endliche Folge von Anweisungen zur Loesung eines Problems. Die **Effizienz** eines Algorithmus wird mit der **O-Notation** (Big-O) beschrieben.

## O-Notation — Laufzeitkomplexitaet
- **O(1)** — konstant: Zugriff auf Array-Element per Index.
- **O(log n)** — logarithmisch: Binary Search halbiert den Suchraum.
- **O(n)** — linear: Einmal durch alle Elemente iterieren.
- **O(n²)** — quadratisch: Verschachtelte Schleifen (z.B. BubbleSort).

## Sortieralgorithmen
**BubbleSort** vergleicht benachbarte Elemente und tauscht sie bei falscher Reihenfolge. Komplexitaet: O(n²). **SelectionSort** sucht in jedem Durchlauf das Minimum und tauscht es an die richtige Position. Komplexitaet: O(n²). **InsertionSort** fuegt jedes Element an der richtigen Stelle in den bereits sortierten Bereich ein. Komplexitaet: O(n²) im Worst Case, aber O(n) bei fast sortierten Daten.

## BinarySearch — Binaere Suche
BinarySearch arbeitet auf **sortierten** Arrays. In jedem Schritt wird das mittlere Element geprueft und der Suchbereich halbiert. Komplexitaet: **O(log n)**. Java bietet \`Arrays.binarySearch()\` und \`Collections.binarySearch()\`.

## Praxis
In der Praxis nutzt man \`Arrays.sort()\` (Dual-Pivot Quicksort, O(n log n)) und \`Collections.sort()\` (TimSort, O(n log n)). Das Verstaendnis einfacher Algorithmen ist dennoch fundamental fuer das algorithmische Denken.`,
  codeExamples: [
    {
      title: 'Sortieralgorithmen: Bubble, Selection, Insertion',
      description: 'Drei klassische Sortieralgorithmen im Vergleich.',
      code: `import java.util.Arrays;

public class Sortieralgorithmen {

    // BubbleSort — O(n²)
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // SelectionSort — O(n²)
    static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    // InsertionSort — O(n²) worst case, O(n) best case
    static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] daten1 = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(daten1);
        System.out.println("BubbleSort:    " + Arrays.toString(daten1));

        int[] daten2 = {64, 34, 25, 12, 22, 11, 90};
        selectionSort(daten2);
        System.out.println("SelectionSort: " + Arrays.toString(daten2));

        int[] daten3 = {64, 34, 25, 12, 22, 11, 90};
        insertionSort(daten3);
        System.out.println("InsertionSort: " + Arrays.toString(daten3));
    }
}`,
      expectedOutput: `BubbleSort:    [11, 12, 22, 25, 34, 64, 90]
SelectionSort: [11, 12, 22, 25, 34, 64, 90]
InsertionSort: [11, 12, 22, 25, 34, 64, 90]`,
      editable: true
    },
    {
      title: 'BinarySearch — Binaere Suche',
      description: 'Eigene Implementierung und Nutzung von Arrays.binarySearch().',
      code: `import java.util.Arrays;

public class BinaereSuche {

    // Eigene BinarySearch-Implementierung — O(log n)
    static int binarySearch(int[] arr, int ziel) {
        int links = 0;
        int rechts = arr.length - 1;

        while (links <= rechts) {
            int mitte = links + (rechts - links) / 2;

            if (arr[mitte] == ziel) {
                return mitte;
            } else if (arr[mitte] < ziel) {
                links = mitte + 1;
            } else {
                rechts = mitte - 1;
            }
        }
        return -1; // Nicht gefunden
    }

    public static void main(String[] args) {
        int[] sortiert = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        // Eigene Implementierung
        int index = binarySearch(sortiert, 23);
        System.out.println("23 gefunden bei Index: " + index);

        int nichtDa = binarySearch(sortiert, 50);
        System.out.println("50 gefunden bei Index: " + nichtDa);

        // Java-Standard: Arrays.binarySearch()
        int stdIndex = Arrays.binarySearch(sortiert, 38);
        System.out.println("Arrays.binarySearch(38): " + stdIndex);

        // Vergleich: Linear vs. Binaer bei 1000 Elementen
        int[] grossesArray = new int[1000];
        for (int i = 0; i < 1000; i++) grossesArray[i] = i * 2;

        long start = System.nanoTime();
        Arrays.binarySearch(grossesArray, 998);
        long binaer = System.nanoTime() - start;
        System.out.println("BinarySearch ist O(log n) — extrem effizient!");
    }
}`,
      expectedOutput: `23 gefunden bei Index: 5
50 gefunden bei Index: -1
Arrays.binarySearch(38): 6
BinarySearch ist O(log n) — extrem effizient!`,
      editable: true
    },
    {
      title: 'O-Notation praktisch: Laufzeit messen',
      description: 'Verschiedene Komplexitaeten vergleichen und deren Auswirkung auf die Laufzeit verstehen.',
      code: `import java.util.*;

public class KomplexitaetBeispiel {
    // O(1) - Konstant: Zugriff per Index
    static int zugriffPerIndex(int[] arr, int index) {
        return arr[index];
    }

    // O(n) - Linear: Suche in unsortiertem Array
    static int lineareSuche(int[] arr, int ziel) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == ziel) return i;
        }
        return -1;
    }

    // O(n^2) - Quadratisch: Alle Paare finden
    static int zaehleGleichePaare(int[] arr) {
        int paare = 0;
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) paare++;
            }
        }
        return paare;
    }

    public static void main(String[] args) {
        int[] daten = {5, 3, 8, 3, 1, 5, 9, 3};

        // O(1)
        System.out.println("O(1) Index-Zugriff: arr[2] = " + zugriffPerIndex(daten, 2));

        // O(n)
        System.out.println("O(n) Lineare Suche nach 9: Index " + lineareSuche(daten, 9));

        // O(n^2)
        System.out.println("O(n^2) Gleiche Paare: " + zaehleGleichePaare(daten));

        // O(n log n) - Java-Standard-Sortierung
        int[] kopie = Arrays.copyOf(daten, daten.length);
        Arrays.sort(kopie);
        System.out.println("\\nO(n log n) Sortiert: " + Arrays.toString(kopie));

        // O(log n) - BinarySearch auf sortiertem Array
        int idx = Arrays.binarySearch(kopie, 8);
        System.out.println("O(log n) BinarySearch(8): Index " + idx);

        System.out.println("\\n=== Zusammenfassung ===");
        System.out.println("O(1) < O(log n) < O(n) < O(n log n) < O(n^2)");
    }
}`,
      expectedOutput: `O(1) Index-Zugriff: arr[2] = 8
O(n) Lineare Suche nach 9: Index 6
O(n^2) Gleiche Paare: 4

O(n log n) Sortiert: [1, 3, 3, 3, 5, 5, 8, 9]
O(log n) BinarySearch(8): Index 6

=== Zusammenfassung ===
O(1) < O(log n) < O(n) < O(n log n) < O(n^2)`,
      editable: true
    }
  ],
  quiz: [
    {
      id: 'algorithmen-q1',
      question: 'Welche Laufzeitkomplexitaet hat BinarySearch?',
      options: [
        'O(1)',
        'O(n)',
        'O(log n)',
        'O(n²)'
      ],
      correctIndex: 2,
      explanation: 'BinarySearch halbiert in jedem Schritt den Suchbereich. Dadurch werden bei n Elementen maximal log₂(n) Vergleiche benoetigt, was einer Komplexitaet von O(log n) entspricht.'
    },
    {
      id: 'algorithmen-q2',
      question: 'Welcher Sortieralgorithmus ist bei fast sortierten Daten am effizientesten?',
      options: [
        'BubbleSort',
        'SelectionSort',
        'InsertionSort',
        'Alle drei sind gleich schnell'
      ],
      correctIndex: 2,
      explanation: 'InsertionSort hat im Best Case (bereits sortierte Daten) eine Laufzeit von O(n), weil die innere Schleife kaum ausgefuehrt wird. BubbleSort und SelectionSort bleiben bei O(n²) — SelectionSort prueft immer alle verbleibenden Elemente.'
    },
    {
      id: 'algorithmen-q3',
      question: 'Welchen Sortieralgorithmus verwendet Arrays.sort() intern fuer primitive Typen?',
      options: ['BubbleSort', 'MergeSort', 'Dual-Pivot Quicksort', 'InsertionSort'],
      correctIndex: 2,
      explanation: 'Arrays.sort() verwendet fuer primitive Typen den Dual-Pivot Quicksort mit O(n log n) durchschnittlicher Laufzeit. Fuer Objekte wird TimSort (eine Kombination aus MergeSort und InsertionSort) verwendet, da TimSort stabil sortiert.',
    },
  ],
  exercises: ['algorithms-01'],
  keyConceptsDE: [
    'O-Notation: O(1) < O(log n) < O(n) < O(n²)',
    'BubbleSort: Nachbarelemente tauschen, O(n²)',
    'SelectionSort: Minimum suchen und tauschen, O(n²)',
    'InsertionSort: Einfuegen an richtiger Stelle, O(n) best case',
    'BinarySearch: Suchraum halbieren, O(log n), nur auf sortierten Daten'
  ],
  transferKnowledge: 'Algorithmisches Denken ist die Grundlage der Softwareentwicklung. In der Praxis nutzt man zwar Arrays.sort() und Collections.sort(), aber das Verstaendnis von Komplexitaet hilft bei Architekturentscheidungen: Soll ich eine Liste oder eine HashMap verwenden? Brauche ich einen Index? Frameworks wie Spring Data nutzen intern B-Baeume und Hash-Indizes — genau diese Konzepte.',
  order: 47
};
