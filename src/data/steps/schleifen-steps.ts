import type { LessonStep } from '../../types';

export const schleifenSteps: LessonStep[] = [
  {
    id: 'sl-step-1',
    type: 'content',
    title: 'Einführung in Schleifen',
    content: `## Schleifen in Java

Schleifen ermöglichen es, Code mehrfach auszuführen. Java bietet drei Haupt-Schleifentypen:

### 1. for-Schleife
Die klassische Zählschleife mit Initialisierung, Bedingung und Inkrement:
\`\`\`java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
\`\`\`

### 2. while-Schleife
Wiederholt Code, solange die Bedingung wahr ist. Prüfung am Anfang:
\`\`\`java
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
\`\`\`

### 3. do-while-Schleife
Wie while, aber Prüfung am Ende - wird mindestens einmal ausgeführt:
\`\`\`java
int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 10);
\`\`\`

> **Wichtig:** Achte darauf, dass die Schleife irgendwann endet (keine Endlosschleife)!`,
  },
  {
    id: 'sl-step-2',
    type: 'predict-output',
    title: 'Vorhersage: Einfache for-Schleife',
    predictCode: `for (int i = 0; i < 3; i++) {
    System.out.println(i);
}`,
    predictAnswer: '0\n1\n2',
    predictExplanation: 'Die Schleife startet bei i=0, läuft solange i kleiner als 3 ist, und erhöht i nach jeder Iteration um 1. Somit werden die Werte 0, 1 und 2 ausgegeben (jeweils in einer neuen Zeile).',
  },
  {
    id: 'sl-step-3',
    type: 'fill-blank',
    title: 'Vervollständige die for-Schleife',
    fillBlankCode: `// Zähle von 0 bis 4
for ({{0}} i = 0; i {{1}} 5; i{{2}}) {
    System.out.println(i);
}`,
    fillBlankAnswers: ['int', '<', '++'],
  },
  {
    id: 'sl-step-4',
    type: 'code-example',
    title: 'while vs. do-while',
    codeExample: {
      title: 'Unterschied zwischen while und do-while',
      description: 'Beobachte den Unterschied: while prüft vor der Ausführung, do-while danach.',
      code: `public class SchleifenVergleich {
    public static void main(String[] args) {
        // while-Schleife: Bedingung wird VOR der Ausführung geprüft
        System.out.println("while-Schleife:");
        int i = 5;
        while (i < 3) {
            System.out.println("Wird nie ausgeführt");
            i++;
        }
        System.out.println("while beendet (keine Ausgabe, da Bedingung von Anfang an falsch)");

        // do-while-Schleife: Bedingung wird NACH der Ausführung geprüft
        System.out.println("\\ndo-while-Schleife:");
        int j = 5;
        do {
            System.out.println("Wird einmal ausgeführt: j = " + j);
            j++;
        } while (j < 3);
        System.out.println("do-while beendet");

        // Praktisches Beispiel: Zähle rückwärts
        System.out.println("\\nCountdown:");
        int countdown = 3;
        while (countdown > 0) {
            System.out.println(countdown);
            countdown--;
        }
        System.out.println("Start!");
    }
}`,
      expectedOutput: `while-Schleife:
while beendet (keine Ausgabe, da Bedingung von Anfang an falsch)

do-while-Schleife:
Wird einmal ausgeführt: j = 5
do-while beendet

Countdown:
3
2
1
Start!`,
      editable: true,
    },
  },
  {
    id: 'sl-step-5',
    type: 'challenge',
    title: 'Challenge: Gerade Zahlen ausgeben',
    challenge: {
      instruction: 'Schreibe eine for-Schleife, die alle geraden Zahlen von 2 bis 10 ausgibt (jeweils eine Zahl pro Zeile).',
      starterCode: `public class GeradeZahlen {
    public static void main(String[] args) {
        // Dein Code hier

    }
}`,
      expectedOutput: '2\n4\n6\n8\n10',
      hint: 'Starte bei i=2 und erhöhe i in jedem Schritt um 2 (i += 2).',
    },
  },
  {
    id: 'sl-step-6',
    type: 'content',
    title: 'Erweiterte Schleifenkonzepte',
    content: `## Erweiterte Schleifenkonzepte

### for-each-Schleife
Ideal zum Durchlaufen von Arrays und Collections:
\`\`\`java
String[] namen = {"Anna", "Ben", "Clara"};
for (String name : namen) {
    System.out.println(name);
}
\`\`\`

### break - Schleife sofort beenden
\`\`\`java
for (int i = 0; i < 10; i++) {
    if (i == 5) break;  // Schleife wird bei i=5 beendet
    System.out.println(i);
}
// Ausgabe: 0, 1, 2, 3, 4
\`\`\`

### continue - Aktuelle Iteration überspringen
\`\`\`java
for (int i = 0; i < 5; i++) {
    if (i == 2) continue;  // Bei i=2 wird der Rest übersprungen
    System.out.println(i);
}
// Ausgabe: 0, 1, 3, 4 (2 wird übersprungen)
\`\`\`

> **Tipp:** Verwende for-each, wenn du nicht den Index, sondern nur die Elemente brauchst. Es ist lesbarer und weniger fehleranfällig.`,
  },
  {
    id: 'sl-step-7',
    type: 'predict-output',
    title: 'Vorhersage: break in Aktion',
    predictCode: `for (int i = 0; i < 5; i++) {
    if (i == 3) break;
    System.out.print(i + " ");
}`,
    predictAnswer: '0 1 2 ',
    predictExplanation: 'Die Schleife läuft von 0 bis 4, aber bei i=3 wird break ausgeführt. Das bedeutet, dass nur 0, 1 und 2 ausgegeben werden. Die 3 wird nicht mehr ausgegeben, da break die Schleife sofort beendet, bevor System.out.print erreicht wird.',
  },
  {
    id: 'sl-step-8',
    type: 'quiz',
    title: 'Quiz: Welche Schleife läuft mindestens einmal?',
    quizQuestion: {
      id: 'sl-quiz-1',
      question: 'Welche Schleife wird garantiert mindestens einmal ausgeführt, auch wenn die Bedingung von Anfang an falsch ist?',
      options: [
        'for-Schleife',
        'while-Schleife',
        'do-while-Schleife',
        'for-each-Schleife',
      ],
      correctIndex: 2,
      explanation: 'Die do-while-Schleife prüft die Bedingung erst am Ende des Schleifenkörpers. Daher wird der Code mindestens einmal ausgeführt, selbst wenn die Bedingung von Anfang an falsch ist. Bei for und while wird die Bedingung vor der ersten Ausführung geprüft.',
    },
  },
];
