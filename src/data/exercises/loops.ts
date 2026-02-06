import type { Exercise } from '../../types';

export const loopsExercises: Exercise[] = [
  {
    id: 'loops-01', topicId: 'schleifen', title: 'Kleines Einmaleins', difficulty: 'leicht',
    description: 'Gib das kleine Einmaleins (1x1 bis 10x10) aus.',
    requirements: ['Nutze verschachtelte for-Schleifen', 'Format: "a x b = c"'],
    hints: ['Äußere Schleife: i von 1 bis 10', 'Innere Schleife: j von 1 bis 10', 'System.out.println(i + " x " + j + " = " + (i*j))'],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        // TODO: Kleines Einmaleins ausgeben\n    }\n}`,
    solutionCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            for (int j = 1; j <= 10; j++) {\n                System.out.println(i + " x " + j + " = " + (i * j));\n            }\n        }\n    }\n}`,
    expectedOutput: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3',
    testCases: [{ expectedOutput: '1 x 1 = 1', description: 'Startet bei 1x1' }, { expectedOutput: '10 x 10 = 100', description: 'Endet bei 10x10' }],
  },
  {
    id: 'loops-02', topicId: 'schleifen', title: 'Primzahlen finden', difficulty: 'mittel',
    description: 'Finde und gib alle Primzahlen von 2 bis 100 aus.',
    requirements: ['Eine Primzahl ist nur durch 1 und sich selbst teilbar', 'Gib alle Primzahlen in einer Zeile aus, getrennt durch Leerzeichen'],
    hints: ['Prüfe für jede Zahl ob sie durch eine kleinere teilbar ist', 'Du musst nur bis zur Wurzel der Zahl prüfen', 'Nutze eine boolean Variable isPrime'],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        // TODO: Alle Primzahlen von 2 bis 100 finden\n    }\n}`,
    solutionCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.print("Primzahlen: ");\n        for (int i = 2; i <= 100; i++) {\n            boolean isPrime = true;\n            for (int j = 2; j * j <= i; j++) {\n                if (i % j == 0) { isPrime = false; break; }\n            }\n            if (isPrime) System.out.print(i + " ");\n        }\n        System.out.println();\n    }\n}`,
    expectedOutput: 'Primzahlen: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97',
    testCases: [{ expectedOutput: '2 3 5 7', description: 'Erste Primzahlen korrekt' }, { expectedOutput: '97', description: '97 ist enthalten' }],
  },
  {
    id: 'loops-03', topicId: 'schleifen', title: 'Zahlenraten', difficulty: 'mittel',
    description: 'Implementiere ein Zahlenraten-Spiel. Der Computer denkt sich eine Zahl zwischen 1-100 aus, der User rät.',
    requirements: ['Zufallszahl zwischen 1 und 100', 'Hinweise: "Zu hoch!" oder "Zu niedrig!"', 'Anzahl Versuche zählen'],
    hints: ['Random random = new Random(); int zahl = random.nextInt(100) + 1;', 'Nutze eine while-Schleife die läuft bis geraten wurde'],
    starterCode: `import java.util.Random;\n\npublic class Main {\n    public static void main(String[] args) {\n        Random random = new Random();\n        int geheimeZahl = random.nextInt(100) + 1;\n        int versuche = 0;\n        // TODO: Zahlenraten implementieren\n        // Tipp: Da wir keinen Scanner im Browser haben,\n        // simuliere einige Rateversuche\n        int[] rateversuche = {50, 75, 63, 69, 66, 67};\n    }\n}`,
    solutionCode: `import java.util.Random;\n\npublic class Main {\n    public static void main(String[] args) {\n        int geheimeZahl = 67; // Feste Zahl fuer reproduzierbare Ausgabe\n        int versuche = 0;\n        int[] rateversuche = {50, 75, 63, 69, 66, 67};\n        System.out.println("Ich denke an eine Zahl zwischen 1 und 100...");\n        for (int tipp : rateversuche) {\n            versuche++;\n            if (tipp < geheimeZahl) System.out.println("Tipp " + tipp + ": Zu niedrig!");\n            else if (tipp > geheimeZahl) System.out.println("Tipp " + tipp + ": Zu hoch!");\n            else { System.out.println("Tipp " + tipp + ": Richtig! In " + versuche + " Versuchen!"); break; }\n        }\n    }\n}`,
    expectedOutput: 'Ich denke an eine Zahl zwischen 1 und 100...\nTipp 50: Zu niedrig!\nTipp 75: Zu hoch!\nTipp 63: Zu niedrig!\nTipp 69: Zu hoch!\nTipp 66: Zu niedrig!\nTipp 67: Richtig! In 6 Versuchen!',
    testCases: [{ expectedOutput: 'Richtig!', description: 'Zahl wird erraten' }, { expectedOutput: 'Versuchen', description: 'Versuche werden gezählt' }],
  },
];
