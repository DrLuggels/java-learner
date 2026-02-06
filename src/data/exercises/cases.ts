import type { Exercise } from '../../types';

export const casesExercises: Exercise[] = [
  {
    id: 'cases-01', topicId: 'verzweigungen', title: 'Notenrechner', difficulty: 'leicht',
    description: 'Erstelle ein Programm das eine Punktzahl (0-100) in eine Note (1-6) umrechnet.',
    requirements: ['90-100: Note 1', '75-89: Note 2', '60-74: Note 3', '50-59: Note 4', '30-49: Note 5', '0-29: Note 6'],
    hints: ['Nutze if/else if/else', 'Prüfe von oben nach unten', 'Denke an ungültige Eingaben'],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        int punkte = 85;\n        // TODO: Note berechnen und ausgeben\n    }\n}`,
    solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int punkte = 85;\n        int note;\n        if (punkte >= 90) note = 1;\n        else if (punkte >= 75) note = 2;\n        else if (punkte >= 60) note = 3;\n        else if (punkte >= 50) note = 4;\n        else if (punkte >= 30) note = 5;\n        else note = 6;\n        System.out.println(punkte + " Punkte = Note " + note);\n    }\n}`,
    expectedOutput: '85 Punkte = Note 2',
    testCases: [{ expectedOutput: 'Note 2', description: '85 Punkte = Note 2' }, { expectedOutput: 'Punkte', description: 'Ausgabe enthält Punkte' }],
  },
  {
    id: 'cases-02', topicId: 'verzweigungen', title: 'BMI-Rechner', difficulty: 'mittel',
    description: 'Berechne den BMI und gib die Kategorie aus (Untergewicht/Normal/Übergewicht/Adipositas).',
    requirements: ['BMI = Gewicht / (Größe * Größe)', 'Unter 18.5: Untergewicht', '18.5-24.9: Normalgewicht', '25-29.9: Übergewicht', 'Ab 30: Adipositas'],
    hints: ['BMI-Formel: gewicht / (groesse * groesse)', 'Größe muss in Metern sein!'],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        double gewicht = 75; // kg\n        double groesse = 1.80; // m\n        // TODO: BMI berechnen und Kategorie ausgeben\n    }\n}`,
    solutionCode: `public class Main {\n    public static void main(String[] args) {\n        double gewicht = 75;\n        double groesse = 1.80;\n        double bmi = gewicht / (groesse * groesse);\n        String kategorie;\n        if (bmi < 18.5) kategorie = "Untergewicht";\n        else if (bmi < 25) kategorie = "Normalgewicht";\n        else if (bmi < 30) kategorie = "Uebergewicht";\n        else kategorie = "Adipositas";\n        System.out.printf("BMI: %.1f - %s%n", bmi, kategorie);\n    }\n}`,
    expectedOutput: 'BMI: 23,1 - Normalgewicht',
    testCases: [{ expectedOutput: 'Normalgewicht', description: 'BMI 23.1 = Normalgewicht' }, { expectedOutput: 'BMI', description: 'BMI wird ausgegeben' }],
  },
  {
    id: 'cases-03', topicId: 'verzweigungen', title: 'Wochentag (Switch)', difficulty: 'mittel',
    description: 'Nutze einen switch-Ausdruck (Java 21) um eine Tagesnummer (1-7) in den Wochentag umzuwandeln.',
    requirements: ['Nutze den neuen switch-Ausdruck mit ->', '1=Montag bis 7=Sonntag', 'Ungültige Nummern abfangen'],
    hints: ['switch-Ausdruck: var tag = switch(nr) { case 1 -> "Montag"; ... }', 'default für ungültige Werte'],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        int nr = 3;\n        // TODO: Switch-Ausdruck fuer Wochentag\n    }\n}`,
    solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int nr = 3;\n        String tag = switch (nr) {\n            case 1 -> "Montag";\n            case 2 -> "Dienstag";\n            case 3 -> "Mittwoch";\n            case 4 -> "Donnerstag";\n            case 5 -> "Freitag";\n            case 6 -> "Samstag";\n            case 7 -> "Sonntag";\n            default -> "Ungueltiger Tag";\n        };\n        System.out.println("Tag " + nr + " = " + tag);\n    }\n}`,
    expectedOutput: 'Tag 3 = Mittwoch',
    testCases: [{ expectedOutput: 'Mittwoch', description: 'Tag 3 = Mittwoch' }, { expectedOutput: 'Tag', description: 'Tag wird ausgegeben' }],
  },
];
