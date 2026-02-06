import type { Topic } from '../../../types';

export const pseudozufallszahlen: Topic = {
  id: 'pseudozufallszahlen',
  moduleId: 'grundlagen',
  title: 'Pseudozufallszahlen',
  description: 'Random-Klasse, Math.random(), Seeds und Zufallszahlen in Bereichen.',
  content: `# Pseudozufallszahlen

Computer können keine echten Zufallszahlen erzeugen — sie nutzen **Algorithmen**, die Zahlenfolgen erzeugen, die *zufällig aussehen*. Deshalb heißen sie **Pseudo**zufallszahlen.

## Die Random-Klasse

\`java.util.Random\` ist die Standardklasse für Zufallszahlen:

\`\`\`java
import java.util.Random;
Random random = new Random();
\`\`\`

## Wichtige Methoden

| Methode | Beschreibung | Bereich |
|---------|-------------|---------|
| \`nextInt()\` | Zufälliger int | gesamter int-Bereich |
| \`nextInt(bound)\` | Zufälliger int | 0 bis bound-1 |
| \`nextInt(origin, bound)\` | Zufälliger int (Java 17+) | origin bis bound-1 |
| \`nextDouble()\` | Zufälliger double | 0.0 bis 1.0 (exkl.) |
| \`nextBoolean()\` | Zufälliger boolean | true oder false |
| \`nextLong()\` | Zufälliger long | gesamter long-Bereich |

## Math.random()

\`Math.random()\` gibt einen \`double\` zwischen 0.0 (inkl.) und 1.0 (exkl.) zurück:
\`\`\`java
int wuerfel = (int)(Math.random() * 6) + 1;  // 1 bis 6
\`\`\`

## Der Seed

Ein **Seed** ist der Startwert des Zufallsgenerators. Gleicher Seed = gleiche Zahlenfolge:
\`\`\`java
Random r = new Random(42);  // Immer dieselbe Folge
\`\`\`
Das ist nützlich für **Tests** und **Reproduzierbarkeit**.

## Zufallszahl in einem Bereich [min, max]

\`\`\`java
int zahl = random.nextInt(max - min + 1) + min;
\`\`\``,
  codeExamples: [
    {
      title: 'Random-Klasse und Zufallszahlen',
      description: 'Verschiedene Methoden der Random-Klasse zur Erzeugung von Zufallszahlen.',
      code: `import java.util.Random;

public class ZufallDemo {
    public static void main(String[] args) {
        Random random = new Random();

        System.out.println("=== Zufällige Ganzzahlen ===");
        System.out.println("nextInt():    " + random.nextInt());
        System.out.println("nextInt(100): " + random.nextInt(100));
        System.out.println("nextInt(1,7): " + random.nextInt(1, 7));

        System.out.println("\\n=== Zufällige Kommazahlen ===");
        System.out.println("nextDouble(): " + random.nextDouble());
        System.out.println("nextBoolean(): " + random.nextBoolean());

        // Würfelwurf (1 bis 6)
        System.out.println("\\n=== 5 Würfelwürfe ===");
        for (int i = 1; i <= 5; i++) {
            int wurf = random.nextInt(1, 7); // Java 17+
            System.out.println("Wurf " + i + ": " + wurf);
        }

        // Zufallszahl in einem Bereich [min, max]
        int min = 10, max = 50;
        int bereichsZahl = random.nextInt(max - min + 1) + min;
        System.out.println("\\nZufallszahl [" + min + ", " + max + "]: " + bereichsZahl);

        // Math.random()
        double mathRandom = Math.random();
        int wuerfel = (int)(Math.random() * 6) + 1;
        System.out.println("\\n=== Math.random() ===");
        System.out.println("Math.random(): " + mathRandom);
        System.out.println("Würfel:        " + wuerfel);
    }
}`,
      expectedOutput: `=== Zufällige Ganzzahlen ===
nextInt():    -1284503782
nextInt(100): 47
nextInt(1,7): 3

=== Zufällige Kommazahlen ===
nextDouble(): 0.7231742029971469
nextBoolean(): true

=== 5 Würfelwürfe ===
Wurf 1: 4
Wurf 2: 1
Wurf 3: 6
Wurf 4: 2
Wurf 5: 5

Zufallszahl [10, 50]: 33

=== Math.random() ===
Math.random(): 0.5412456321
Würfel:        3`,
      editable: true,
    },
    {
      title: 'Seed für reproduzierbare Ergebnisse',
      description: 'Mit einem festen Seed erzeugt Random immer die gleiche Zahlenfolge.',
      code: `import java.util.Random;

public class SeedDemo {
    public static void main(String[] args) {
        // Gleicher Seed → gleiche Zahlenfolge
        System.out.println("=== Seed 42 — Durchlauf 1 ===");
        Random r1 = new Random(42);
        for (int i = 0; i < 5; i++) {
            System.out.print(r1.nextInt(100) + " ");
        }

        System.out.println("\\n\\n=== Seed 42 — Durchlauf 2 ===");
        Random r2 = new Random(42);
        for (int i = 0; i < 5; i++) {
            System.out.print(r2.nextInt(100) + " ");
        }

        System.out.println("\\n\\nDie Zahlenfolgen sind identisch!");

        // Anderer Seed → andere Folge
        System.out.println("\\n=== Seed 99 ===");
        Random r3 = new Random(99);
        for (int i = 0; i < 5; i++) {
            System.out.print(r3.nextInt(100) + " ");
        }

        // Praktisches Beispiel: Passwort-Generator
        System.out.println("\\n\\n=== Zufälliges Passwort ===");
        String zeichen = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random pwRandom = new Random();
        var passwort = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            int index = pwRandom.nextInt(zeichen.length());
            passwort.append(zeichen.charAt(index));
        }
        System.out.println("Passwort: " + passwort);
    }
}`,
      expectedOutput: `=== Seed 42 — Durchlauf 1 ===
0 68 54 33 30

=== Seed 42 — Durchlauf 2 ===
0 68 54 33 30

Die Zahlenfolgen sind identisch!

=== Seed 99 ===
19 25 72 8 47

=== Zufälliges Passwort ===
Passwort: kR7mNx2pLqWs`,
      editable: true,
    },
    {
      title: 'Zufallsgesteuerte Anwendung: Lottozahlen',
      description: 'Praktisches Beispiel: 6 aus 49 Lottozahlen ohne Duplikate generieren.',
      code: `import java.util.Random;
import java.util.Arrays;

public class LottoDemo {
    public static void main(String[] args) {
        Random random = new Random();
        int[] lottozahlen = new int[6];
        int gezogen = 0;

        System.out.println("=== Lotto: 6 aus 49 ===");

        // Ziehe 6 verschiedene Zahlen
        while (gezogen < 6) {
            int zahl = random.nextInt(1, 50); // 1 bis 49
            // Prüfen, ob Zahl schon gezogen wurde
            boolean doppelt = false;
            for (int i = 0; i < gezogen; i++) {
                if (lottozahlen[i] == zahl) {
                    doppelt = true;
                    break;
                }
            }
            if (!doppelt) {
                lottozahlen[gezogen] = zahl;
                gezogen++;
            }
        }

        // Sortieren und ausgeben
        Arrays.sort(lottozahlen);
        System.out.print("Lottozahlen: ");
        for (int i = 0; i < lottozahlen.length; i++) {
            if (i > 0) System.out.print(", ");
            System.out.print(lottozahlen[i]);
        }
        System.out.println();

        // Statistik: 1000 Wuerfelwuerfe
        System.out.println("\\n=== Statistik: 1000 Wuerfe ===");
        int[] zaehler = new int[6]; // Index 0-5 fuer Augenzahl 1-6
        for (int i = 0; i < 1000; i++) {
            int wurf = random.nextInt(6); // 0-5
            zaehler[wurf]++;
        }
        for (int i = 0; i < 6; i++) {
            System.out.printf("Augenzahl %d: %d Mal (%.1f%%)%n",
                i + 1, zaehler[i], zaehler[i] / 10.0);
        }
    }
}`,
      expectedOutput: `=== Lotto: 6 aus 49 ===
Lottozahlen: 5, 12, 23, 31, 38, 44

=== Statistik: 1000 Wuerfe ===
Augenzahl 1: 172 Mal (17.2%)
Augenzahl 2: 158 Mal (15.8%)
Augenzahl 3: 169 Mal (16.9%)
Augenzahl 4: 164 Mal (16.4%)
Augenzahl 5: 175 Mal (17.5%)
Augenzahl 6: 162 Mal (16.2%)`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'pseudozufallszahlen-q1',
      question: 'Was erzeugt `new Random(42)` bei jedem Programmstart?',
      options: [
        'Immer die Zahl 42',
        'Immer dieselbe Folge von Zufallszahlen',
        'Jedes Mal andere Zufallszahlen',
        'Einen Compilerfehler',
      ],
      correctIndex: 1,
      explanation: 'Ein fester Seed (hier 42) sorgt dafür, dass der Zufallsgenerator bei jedem Start dieselbe Zahlenfolge erzeugt. Das ist nützlich für Tests und Reproduzierbarkeit.',
    },
    {
      id: 'pseudozufallszahlen-q2',
      question: 'Wie erzeugt man eine Zufallszahl von 1 bis 6 (Würfel)?',
      options: [
        'random.nextInt(6)',
        'random.nextInt(7)',
        'random.nextInt(6) + 1',
        'random.nextInt(1, 6)',
      ],
      correctIndex: 2,
      explanation: 'random.nextInt(6) erzeugt Zahlen von 0 bis 5. Mit +1 verschiebt man den Bereich auf 1 bis 6. Alternativ: random.nextInt(1, 7) seit Java 17.',
    },
    {
      id: 'pseudozufallszahlen-q3',
      question: 'Welchen Wertebereich liefert `Math.random()`?',
      options: [
        '0 bis 1 (inklusive beider Grenzen)',
        '0.0 (inklusive) bis 1.0 (exklusive)',
        '1 bis 100',
        '0 bis Integer.MAX_VALUE',
      ],
      correctIndex: 1,
      explanation: 'Math.random() liefert einen double-Wert >= 0.0 und < 1.0. Die 0.0 ist inklusive, die 1.0 ist exklusive. Um z.B. 1-6 zu erhalten: (int)(Math.random() * 6) + 1.',
    },
  ],
  exercises: ['operators-1', 'operators-2'],
  keyConceptsDE: [
    'Pseudozufallszahlen werden durch Algorithmen erzeugt, nicht durch echten Zufall',
    'Random-Klasse: nextInt(), nextDouble(), nextBoolean()',
    'nextInt(bound) erzeugt Zahlen von 0 bis bound-1',
    'Ein fester Seed erzeugt immer dieselbe Zahlenfolge',
    'Bereich [min, max]: random.nextInt(max - min + 1) + min',
  ],
  transferKnowledge: 'Zufallszahlen gibt es in jeder Programmiersprache. Python hat random.randint(), JavaScript hat Math.random(), C# hat die Random-Klasse. Das Konzept des Seeds für reproduzierbare Ergebnisse ist universell und besonders wichtig für wissenschaftliches Arbeiten und Tests.',
  order: 10,
};
