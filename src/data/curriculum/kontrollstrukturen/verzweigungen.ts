import type { Topic } from '../../../types';

export const verzweigungen: Topic = {
  id: 'verzweigungen',
  moduleId: 'kontrollstrukturen',
  title: 'Verzweigungen',
  description: 'Bedingte Anweisungen mit if/else, switch-Ausdrücken und dem ternären Operator in Java 21.',
  content: `
## Verzweigungen in Java

Verzweigungen steuern den Programmfluss anhand von Bedingungen. Java bietet mehrere Konstrukte:

### if / else if / else
Die grundlegendste Form der Verzweigung. Der Code-Block wird nur ausgeführt, wenn die Bedingung \`true\` ergibt.

### switch-Ausdrücke (Java 21)
Java 21 bietet moderne **switch-Ausdrücke** mit Pfeilsyntax (\`->\`). Diese benötigen kein \`break\` und können direkt Werte zurückgeben. Mehrere Werte pro Case werden mit Komma getrennt. Mit \`yield\` kann man in Blöcken Werte zurückgeben.

### Ternärer Operator
Der ternäre Operator \`bedingung ? wertWennTrue : wertWennFalse\` ist eine kompakte Kurzform für einfache if/else-Zuweisungen.

### Vergleichsoperatoren
- \`==\`, \`!=\` — Gleichheit / Ungleichheit
- \`<\`, \`>\`, \`<=\`, \`>=\` — Vergleiche
- \`&&\` (UND), \`||\` (ODER), \`!\` (NICHT) — Logische Operatoren

> **Tipp:** Verwende \`equals()\` statt \`==\` beim Vergleich von Strings und Objekten.
  `.trim(),
  codeExamples: [
    {
      title: 'if / else if / else',
      description: 'Klassische Verzweigung mit mehreren Bedingungen zur Notenberechnung.',
      code: `public class Verzweigung {
    public static void main(String[] args) {
        int punkte = 85;

        if (punkte >= 90) {
            System.out.println("Note: Sehr gut (1)");
        } else if (punkte >= 75) {
            System.out.println("Note: Gut (2)");
        } else if (punkte >= 60) {
            System.out.println("Note: Befriedigend (3)");
        } else if (punkte >= 50) {
            System.out.println("Note: Ausreichend (4)");
        } else {
            System.out.println("Note: Nicht bestanden (5)");
        }

        // Logische Operatoren kombinieren
        boolean bestanden = punkte >= 50;
        boolean bonusErhalten = punkte > 80 && bestanden;
        System.out.println("Bestanden: " + bestanden);
        System.out.println("Bonus erhalten: " + bonusErhalten);
    }
}`,
      expectedOutput: `Note: Gut (2)
Bestanden: true
Bonus erhalten: true`,
      editable: true,
    },
    {
      title: 'Switch-Ausdrücke (Java 21)',
      description: 'Moderne switch-Ausdrücke mit Pfeilsyntax und yield für komplexe Blöcke.',
      code: `public class SwitchAusdruck {
    public static void main(String[] args) {
        String wochentag = "Mittwoch";

        // Moderner switch-Ausdruck mit Pfeilsyntax (Java 21)
        String typ = switch (wochentag) {
            case "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag" -> "Arbeitstag";
            case "Samstag", "Sonntag" -> "Wochenende";
            default -> "Unbekannt";
        };
        System.out.println(wochentag + " ist ein " + typ);

        // Switch mit yield für komplexere Logik
        int monat = 4;
        int tage = switch (monat) {
            case 2 -> 28;
            case 4, 6, 9, 11 -> 30;
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            default -> {
                System.out.println("Ungültiger Monat!");
                yield -1;
            }
        };
        System.out.println("Monat " + monat + " hat " + tage + " Tage");
    }
}`,
      expectedOutput: `Mittwoch ist ein Arbeitstag
Monat 4 hat 30 Tage`,
      editable: true,
    },
    {
      title: 'Ternärer Operator',
      description: 'Kompakte Kurzform für einfache Bedingungen mit dem ternären Operator.',
      code: `public class TernaererOperator {
    public static void main(String[] args) {
        int alter = 20;

        // Ternärer Operator: bedingung ? wennTrue : wennFalse
        String status = (alter >= 18) ? "volljährig" : "minderjährig";
        System.out.println("Status: " + status);

        // Verschachtelt (sparsam verwenden!)
        int punkte = 72;
        String note = (punkte >= 90) ? "Sehr gut"
                    : (punkte >= 75) ? "Gut"
                    : (punkte >= 60) ? "Befriedigend"
                    : "Nicht bestanden";
        System.out.println("Note: " + note);

        // Praktischer Einsatz: Null-Prüfung
        String name = null;
        String anzeige = (name != null) ? name : "Unbekannt";
        System.out.println("Name: " + anzeige);
    }
}`,
      expectedOutput: `Status: volljährig
Note: Befriedigend
Name: Unbekannt`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'verzweigungen-q1',
      question: 'Was ist der Vorteil der neuen switch-Ausdrücke (Pfeilsyntax) in Java 21 gegenüber dem klassischen switch?',
      options: [
        'Sie sind schneller in der Ausführung',
        'Sie benötigen kein break und können direkt Werte zurückgeben',
        'Sie funktionieren nur mit Strings',
        'Sie ersetzen if/else komplett',
      ],
      correctIndex: 1,
      explanation: 'Die modernen switch-Ausdrücke mit Pfeilsyntax (->) benötigen kein break-Statement (kein Fall-Through) und können als Ausdruck direkt einen Wert zurückgeben, was den Code kürzer und sicherer macht.',
    },
    {
      id: 'verzweigungen-q2',
      question: 'Was gibt der folgende Ausdruck zurück: `(5 > 3) ? "Ja" : "Nein"`?',
      options: [
        '"Nein"',
        'true',
        '"Ja"',
        'Ein Kompilierfehler tritt auf',
      ],
      correctIndex: 2,
      explanation: 'Der ternäre Operator prüft die Bedingung (5 > 3), die true ergibt. Daher wird der Wert nach dem Fragezeichen zurückgegeben: "Ja".',
    },
    {
      id: 'verzweigungen-q3',
      question: 'Was passiert, wenn in einem klassischen switch-Statement das `break` fehlt?',
      options: [
        'Es gibt einen Compilerfehler',
        'Es wird nur der erste Case ausgeführt',
        'Es tritt ein Fall-Through auf: alle nachfolgenden Cases werden ebenfalls ausgeführt',
        'Das Programm stürzt ab',
      ],
      correctIndex: 2,
      explanation: 'Ohne break im klassischen switch-Statement tritt ein Fall-Through auf: Nach dem passenden Case werden alle nachfolgenden Cases bis zum nächsten break oder Ende des switch ausgeführt. Die modernen switch-Ausdrücke mit Pfeilsyntax (->) haben dieses Problem nicht.',
    },
  ],
  exercises: ['cases-01', 'cases-02', 'cases-03'],
  keyConceptsDE: [
    'if/else — grundlegende bedingte Verzweigung',
    'else if — Verkettung mehrerer Bedingungen',
    'switch-Ausdruck — Pattern Matching mit Pfeilsyntax (Java 21)',
    'yield — Wertrückgabe in switch-Blöcken',
    'Ternärer Operator — Kurzform für einfache Bedingungen',
    'Logische Operatoren: && (UND), || (ODER), ! (NICHT)',
  ],
  transferKnowledge: 'Verzweigungen gibt es in jeder Programmiersprache. Die Konzepte if/else und switch finden sich in Python (if/elif/else, match-case), JavaScript (if/else, switch), C# und vielen anderen Sprachen. Der ternäre Operator existiert in fast allen C-ähnlichen Sprachen.',
  order: 12,
};
