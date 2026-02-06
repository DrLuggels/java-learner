import type { Topic } from '../../../types';

export const klassenaufbau: Topic = {
  id: 'klassenaufbau',
  moduleId: 'grundlagen',
  title: 'Klassenaufbau',
  description: 'Aufbau einer Java-Klasse: main-Methode, Pakete, Imports und Syntax-Grundlagen.',
  content: `# Klassenaufbau in Java

Jedes Java-Programm besteht aus mindestens einer **Klasse**. Der Dateiname muss exakt dem Klassennamen entsprechen (Groß-/Kleinschreibung beachten!).

## Grundstruktur

\`\`\`
package de.beispiel;        // optionale Paket-Deklaration (Zeile 1)

import java.util.Scanner;   // Imports für externe Klassen

public class MeineKlasse {  // Klassen-Deklaration
    // Hier steht der Code
}
\`\`\`

## Die main-Methode — der Einstiegspunkt

Jedes ausführbare Java-Programm braucht eine **main-Methode**:
\`\`\`java
public static void main(String[] args) { ... }
\`\`\`
- \`public\` — von überall aufrufbar
- \`static\` — gehört zur Klasse, nicht zu einem Objekt
- \`void\` — gibt keinen Wert zurück
- \`String[] args\` — Kommandozeilenargumente

## Syntax-Grundregeln

- Jede Anweisung endet mit einem **Semikolon** \`;\`
- Codeblöcke werden in **geschweifte Klammern** \`{ }\` eingeschlossen
- Java ist **case-sensitive**: \`Main\` ≠ \`main\`
- **Einrückung** (Indentation) ist Konvention, nicht Pflicht — aber unverzichtbar für Lesbarkeit
- Paketnamen sind **kleingeschrieben**, Klassennamen beginnen mit einem **Großbuchstaben**`,
  codeExamples: [
    {
      title: 'Vollständiger Klassenaufbau',
      description: 'Eine Klasse mit allen wichtigen Bestandteilen: Konstante, Variable, Methode und main.',
      code: `public class Klassenaufbau {

    // Konstante (unveränderlich)
    static final String APP_NAME = "Mein Programm";

    // Statische Variable
    static int aufrufZaehler = 0;

    // Eigene Methode
    static void begruesse(String name) {
        aufrufZaehler++;
        System.out.println("Hallo, " + name + "!");
        System.out.println("Aufruf Nr. " + aufrufZaehler);
    }

    // Einstiegspunkt
    public static void main(String[] args) {
        System.out.println("=== " + APP_NAME + " ===");
        begruesse("Anna");
        begruesse("Ben");
        System.out.println("Fertig!");
    }
}`,
      expectedOutput: `=== Mein Programm ===
Hallo, Anna!
Aufruf Nr. 1
Hallo, Ben!
Aufruf Nr. 2
Fertig!`,
      editable: true,
    },
    {
      title: 'Kommandozeilenargumente',
      description: 'Zugriff auf Argumente, die beim Programmstart übergeben werden.',
      code: `public class ArgsDemo {
    public static void main(String[] args) {
        System.out.println("Anzahl Argumente: " + args.length);

        if (args.length > 0) {
            System.out.println("Erstes Argument: " + args[0]);
            for (int i = 0; i < args.length; i++) {
                System.out.println("  args[" + i + "] = " + args[i]);
            }
        } else {
            System.out.println("Keine Argumente übergeben.");
            System.out.println("Nutzung: java ArgsDemo <name> <alter>");
        }
    }
}`,
      expectedOutput: `Anzahl Argumente: 0
Keine Argumente übergeben.
Nutzung: java ArgsDemo <name> <alter>`,
      editable: true,
    },
    {
      title: 'Pakete und Imports',
      description: 'Verwendung von Paketen zur Strukturierung und Import externer Klassen.',
      code: `// In einer echten Anwendung steht hier: package de.beispiel.app;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class PaketDemo {
    // Statische Konstante
    static final String APP_VERSION = "1.0.0";

    // Statische Hilfsmethode
    static String heuteDatum() {
        LocalDate heute = LocalDate.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        return heute.format(format);
    }

    public static void main(String[] args) {
        System.out.println("=== PaketDemo v" + APP_VERSION + " ===");
        System.out.println("Datum: " + heuteDatum());
        System.out.println();
        System.out.println("Pakete organisieren Klassen in Namensraeume.");
        System.out.println("Imports machen externe Klassen verfuegbar.");
        System.out.println("java.lang wird automatisch importiert.");
    }
}`,
      expectedOutput: `=== PaketDemo v1.0.0 ===
Datum: 06.02.2026

Pakete organisieren Klassen in Namensraeume.
Imports machen externe Klassen verfuegbar.
java.lang wird automatisch importiert.`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'klassenaufbau-q1',
      question: 'Welche Signatur hat die main-Methode in Java?',
      options: [
        'public void main(String args)',
        'public static void main(String[] args)',
        'static void main()',
        'public static int main(String[] args)',
      ],
      correctIndex: 1,
      explanation: 'Die korrekte Signatur ist "public static void main(String[] args)". Sie muss public, static und void sein und ein String-Array als Parameter akzeptieren.',
    },
    {
      id: 'klassenaufbau-q2',
      question: 'Was muss in Java am Ende jeder Anweisung stehen?',
      options: [
        'Ein Doppelpunkt (:)',
        'Ein Punkt (.)',
        'Ein Semikolon (;)',
        'Nichts — die Einrückung reicht',
      ],
      correctIndex: 2,
      explanation: 'In Java muss jede Anweisung mit einem Semikolon (;) enden. Anders als in Python, wo die Einrückung die Struktur bestimmt.',
    },
    {
      id: 'klassenaufbau-q3',
      question: 'Welche Aussage über den Dateinamen einer Java-Klasse ist korrekt?',
      options: [
        'Der Dateiname kann beliebig gewählt werden',
        'Der Dateiname muss exakt dem Namen der öffentlichen Klasse entsprechen (inkl. Groß-/Kleinschreibung)',
        'Der Dateiname muss immer klein geschrieben werden',
        'Der Dateiname muss mit einem Unterstrich beginnen',
      ],
      correctIndex: 1,
      explanation: 'In Java muss der Dateiname exakt dem Namen der öffentlichen Klasse (public class) entsprechen, inklusive Groß- und Kleinschreibung. Die Klasse "MeineKlasse" muss in der Datei "MeineKlasse.java" stehen.',
    },
  ],
  exercises: ['class-structure-1', 'class-structure-2'],
  keyConceptsDE: [
    'Jede Java-Datei enthält genau eine öffentliche Klasse',
    'Der Dateiname muss dem Klassennamen entsprechen',
    'Die main-Methode ist der Einstiegspunkt jedes Programms',
    'Anweisungen enden mit Semikolon, Blöcke stehen in geschweiften Klammern',
    'Pakete organisieren Klassen in Namensräume',
  ],
  transferKnowledge: 'Jede Programmiersprache hat einen Entry Point. In Python ist es `if __name__ == "__main__":`, in C/C++ die Funktion `int main()`, in C# `static void Main()`. Die Syntax unterscheidet sich, aber das Konzept bleibt gleich.',
  order: 3,
};
