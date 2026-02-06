import type { Topic } from '../../../types';

export const schleifen: Topic = {
  id: 'schleifen',
  moduleId: 'kontrollstrukturen',
  title: 'Schleifen',
  description: 'Wiederholte Ausführung mit for, while, do-while, for-each sowie break und continue.',
  content: `
## Schleifen in Java

Schleifen wiederholen einen Code-Block, solange eine Bedingung erfüllt ist oder über eine Sammlung iteriert wird.

### for-Schleife
Die klassische Zählschleife mit Initialisierung, Bedingung und Inkrement: \`for (int i = 0; i < n; i++)\`.

### while-Schleife
Führt den Block aus, **solange** die Bedingung \`true\` ist. Die Bedingung wird **vor** jedem Durchlauf geprüft.

### do-while-Schleife
Wie \`while\`, aber die Bedingung wird **nach** dem ersten Durchlauf geprüft — der Block wird mindestens einmal ausgeführt.

### for-each (Enhanced for)
Iteriert direkt über Arrays oder Collections: \`for (Typ element : sammlung)\`. Kein Index nötig.

### Steuerung mit break und continue
- \`break\` — beendet die gesamte Schleife sofort
- \`continue\` — überspringt den Rest des aktuellen Durchlaufs und springt zur nächsten Iteration

### Verschachtelte Schleifen
Schleifen können ineinander verschachtelt werden, z. B. für zweidimensionale Strukturen wie Tabellen oder Matrizen.

> **Achtung:** Endlosschleifen entstehen, wenn die Abbruchbedingung nie erreicht wird. Prüfe immer, ob die Schleifenvariable sich verändert!
  `.trim(),
  codeExamples: [
    {
      title: 'for, while und do-while',
      description: 'Die drei grundlegenden Schleifentypen in Java im Vergleich.',
      code: `public class SchleifenTypen {
    public static void main(String[] args) {
        // 1. for-Schleife: Summe von 1 bis 5
        int summe = 0;
        for (int i = 1; i <= 5; i++) {
            summe += i;
        }
        System.out.println("Summe (for): " + summe);

        // 2. while-Schleife: Countdown
        int countdown = 5;
        System.out.print("Countdown (while): ");
        while (countdown > 0) {
            System.out.print(countdown + " ");
            countdown--;
        }
        System.out.println("Start!");

        // 3. do-while: Mindestens ein Durchlauf
        int zahl = 1;
        System.out.print("do-while: ");
        do {
            System.out.print(zahl + " ");
            zahl *= 2;
        } while (zahl <= 16);
        System.out.println();
    }
}`,
      expectedOutput: `Summe (for): 15
Countdown (while): 5 4 3 2 1 Start!
do-while: 1 2 4 8 16`,
      editable: true,
    },
    {
      title: 'for-each und break/continue',
      description: 'Iteration über Arrays mit for-each und Schleifensteuerung mit break und continue.',
      code: `public class ForEachUndSteuerung {
    public static void main(String[] args) {
        // for-each über ein Array
        String[] sprachen = {"Java", "Python", "C++", "JavaScript", "Rust"};

        System.out.println("Alle Sprachen:");
        for (String sprache : sprachen) {
            System.out.println("  - " + sprache);
        }

        // continue: nur Sprachen mit mehr als 4 Zeichen
        System.out.println("\\nLange Namen (> 4 Zeichen):");
        for (String sprache : sprachen) {
            if (sprache.length() <= 4) {
                continue; // überspringe kurze Namen
            }
            System.out.println("  - " + sprache);
        }

        // break: Suche nach einem Element
        System.out.print("\\nSuche nach C++: ");
        for (String sprache : sprachen) {
            if (sprache.equals("C++")) {
                System.out.println("Gefunden!");
                break; // Schleife sofort verlassen
            }
        }
    }
}`,
      expectedOutput: `Alle Sprachen:
  - Java
  - Python
  - C++
  - JavaScript
  - Rust

Lange Namen (> 4 Zeichen):
  - Python
  - JavaScript

Suche nach C++: Gefunden!`,
      editable: true,
    },
    {
      title: 'Verschachtelte Schleifen',
      description: 'Schleifen in Schleifen zur Erzeugung von Mustern und Tabellen.',
      code: `public class VerschachtelteSchleifen {
    public static void main(String[] args) {
        // Multiplikationstabelle 1-4
        System.out.println("Multiplikationstabelle:");
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= 4; j++) {
                System.out.printf("%4d", i * j);
            }
            System.out.println();
        }

        // Dreiecksmuster mit Sternen
        System.out.println("\\nDreieck:");
        int zeilen = 5;
        for (int i = 1; i <= zeilen; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      expectedOutput: `Multiplikationstabelle:
   1   2   3   4
   2   4   6   8
   3   6   9  12
   4   8  12  16

Dreieck:
*
* *
* * *
* * * *
* * * * *`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'schleifen-q1',
      question: 'Welche Schleife wird garantiert mindestens einmal ausgeführt?',
      options: [
        'for-Schleife',
        'while-Schleife',
        'do-while-Schleife',
        'for-each-Schleife',
      ],
      correctIndex: 2,
      explanation: 'Die do-while-Schleife prüft die Bedingung erst nach dem ersten Durchlauf. Daher wird der Schleifenkörper mindestens einmal ausgeführt, selbst wenn die Bedingung von Anfang an false ist.',
    },
    {
      id: 'schleifen-q2',
      question: 'Was bewirkt das Schlüsselwort `continue` in einer Schleife?',
      options: [
        'Es beendet die Schleife sofort',
        'Es überspringt den Rest des aktuellen Durchlaufs und springt zur nächsten Iteration',
        'Es startet die Schleife von vorne',
        'Es pausiert die Schleife für eine Sekunde',
      ],
      correctIndex: 1,
      explanation: '`continue` überspringt den restlichen Code im aktuellen Schleifendurchlauf und springt direkt zur Bedingungsprüfung der nächsten Iteration. Die Schleife selbst wird nicht beendet (das wäre `break`).',
    },
    {
      id: 'schleifen-q3',
      question: 'Was gibt die folgende for-Schleife aus: `for (int i = 0; i < 3; i++) { System.out.print(i + " "); }`?',
      options: [
        '1 2 3',
        '0 1 2',
        '0 1 2 3',
        '1 2',
      ],
      correctIndex: 1,
      explanation: 'Die Schleife startet bei i=0, läuft solange i<3 (also für i=0, 1, 2) und gibt bei jedem Durchlauf den Wert von i aus. Bei i=3 ist die Bedingung i<3 false, und die Schleife endet. Ausgabe: 0 1 2.',
    },
  ],
  exercises: ['loops-01', 'loops-02', 'loops-03'],
  keyConceptsDE: [
    'for-Schleife — Zählschleife mit Initialisierung, Bedingung und Inkrement',
    'while-Schleife — Bedingungsprüfung vor jedem Durchlauf',
    'do-while — Mindestens ein Durchlauf garantiert',
    'for-each — Elegante Iteration über Arrays und Collections',
    'break — Sofortiges Beenden der Schleife',
    'continue — Aktuellen Durchlauf überspringen',
    'Verschachtelte Schleifen — Schleifen in Schleifen für mehrdimensionale Strukturen',
  ],
  transferKnowledge: 'Schleifen sind universelle Konstrukte in jeder Programmiersprache. Python hat for/while (kein do-while), JavaScript bietet for, while, do-while und for...of. Das Konzept der Iteration ist fundamental für die gesamte Informatik.',
  order: 13,
};
