import type { Exercise } from '../../types';

export const consoleAppsExercises: Exercise[] = [
  {
    id: 'console-apps-01',
    topicId: 'konsolenanwendungen',
    title: 'Begrüßungsprogramm',
    difficulty: 'leicht',
    description: 'Erstelle ein Programm das den Benutzer nach seinem Namen fragt und ihn begrüßt.',
    requirements: ['Nutze Scanner für die Eingabe', 'Gib eine personalisierte Begrüßung aus'],
    hints: ['Erstelle einen Scanner mit new Scanner(System.in)', 'Nutze scanner.nextLine() für die Eingabe'],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // TODO: Frage nach dem Namen und gib eine Begruessung aus
    }
}`,
    solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Wie heisst du? ");
        String name = scanner.nextLine();
        System.out.println("Hallo " + name + ", willkommen bei Java!");
        scanner.close();
    }
}`,
    expectedOutput: 'Hallo Max, willkommen bei Java!',
    testCases: [
      { input: 'Max', expectedOutput: 'Hallo Max, willkommen bei Java!', description: 'Begrüßung mit Name' },
      { input: 'Anna', expectedOutput: 'Hallo Anna, willkommen bei Java!', description: 'Begrüßung mit anderem Name' },
    ],
  },
  {
    id: 'console-apps-02',
    topicId: 'konsolenanwendungen',
    title: 'Formatierte Ausgabe',
    difficulty: 'mittel',
    description: 'Erstelle eine formatierte Preisliste mit printf.',
    requirements: ['Nutze System.out.printf für formatierte Ausgabe', 'Rechtsbündige Zahlen, 2 Dezimalstellen'],
    hints: ['printf nutzt Formatierungszeichen: %s für Strings, %.2f für Dezimalzahlen', 'Mit %10s kannst du rechtsbündig ausrichten'],
    starterCode: `public class Main {
    public static void main(String[] args) {
        String[] produkte = {"Milch", "Brot", "Butter"};
        double[] preise = {1.29, 2.49, 1.99};
        // TODO: Formatierte Preisliste ausgeben
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        String[] produkte = {"Milch", "Brot", "Butter"};
        double[] preise = {1.29, 2.49, 1.99};
        System.out.println("=== PREISLISTE ===");
        double summe = 0;
        for (int i = 0; i < produkte.length; i++) {
            System.out.printf("%-10s %6.2f EUR%n", produkte[i], preise[i]);
            summe += preise[i];
        }
        System.out.println("-----------------");
        System.out.printf("%-10s %6.2f EUR%n", "GESAMT", summe);
    }
}`,
    expectedOutput: '=== PREISLISTE ===\nMilch        1,29 EUR\nBrot         2,49 EUR\nButter       1,99 EUR\n-----------------\nGESAMT       5,77 EUR',
    testCases: [
      { expectedOutput: 'PREISLISTE', description: 'Überschrift vorhanden' },
      { expectedOutput: 'GESAMT', description: 'Summe vorhanden' },
    ],
  },
];
