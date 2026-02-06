import type { Topic } from '../../../types';

export const konsolenanwendungen: Topic = {
  id: 'konsolenanwendungen',
  moduleId: 'grundlagen',
  title: 'Konsolenanwendungen',
  description: 'Scanner-Klasse, System.out.println, printf-Formatierung und Benutzereingaben.',
  content: `# Konsolenanwendungen

Konsolenanwendungen sind textbasierte Programme, die über die **Standardeingabe** (Tastatur) und **Standardausgabe** (Bildschirm) kommunizieren.

## Ausgabe

| Methode | Beschreibung |
|---------|-------------|
| \`System.out.println(x)\` | Gibt x aus und macht einen Zeilenumbruch |
| \`System.out.print(x)\` | Gibt x aus ohne Zeilenumbruch |
| \`System.out.printf(format, args)\` | Formatierte Ausgabe |

## printf-Formatierung

| Platzhalter | Typ | Beispiel |
|------------|-----|---------|
| \`%s\` | String | \`"Hallo"\` |
| \`%d\` | Ganzzahl | \`42\` |
| \`%f\` | Gleitkommazahl | \`3.14\` |
| \`%.2f\` | 2 Nachkommastellen | \`3.14\` |
| \`%n\` | Zeilenumbruch | (plattformunabhängig) |
| \`%10d\` | 10 Zeichen breit, rechtsbündig | \`"        42"\` |
| \`%-10s\` | 10 Zeichen breit, linksbündig | \`"Hallo     "\` |

## Eingabe mit Scanner

\`\`\`java
import java.util.Scanner;
Scanner scanner = new Scanner(System.in);
String name = scanner.nextLine();    // ganze Zeile
int alter = scanner.nextInt();       // Ganzzahl
double preis = scanner.nextDouble(); // Kommazahl
scanner.close();
\`\`\`

**Wichtig**: Nach \`nextInt()\` oder \`nextDouble()\` muss man \`scanner.nextLine()\` aufrufen, um den Zeilumbruch zu verbrauchen, bevor man erneut \`nextLine()\` nutzt.`,
  codeExamples: [
    {
      title: 'Ausgabe und printf-Formatierung',
      description: 'Verschiedene Ausgabemethoden und formatierte Ausgabe mit printf.',
      code: `public class AusgabeDemo {
    public static void main(String[] args) {
        // println vs print
        System.out.println("=== println vs print ===");
        System.out.print("Vorname: ");
        System.out.print("Anna ");
        System.out.println("Müller");

        // printf-Formatierung
        String name = "Anna";
        int alter = 25;
        double schnitt = 1.7345;

        System.out.println("\\n=== printf-Formatierung ===");
        System.out.printf("Name: %s, Alter: %d%n", name, alter);
        System.out.printf("Notenschnitt: %.2f%n", schnitt);
        System.out.printf("Notenschnitt: %.1f%n", schnitt);

        // Tabellarische Ausgabe
        System.out.println("\\n=== Tabelle ===");
        System.out.printf("%-15s %5s %10s%n", "Produkt", "Menge", "Preis");
        System.out.printf("%-15s %5d %10.2f%n", "Kaffee", 3, 2.50);
        System.out.printf("%-15s %5d %10.2f%n", "Tee", 5, 1.80);
        System.out.printf("%-15s %5d %10.2f%n", "Schokolade", 2, 3.99);
        System.out.printf("%-15s %5s %10s%n", "", "", "--------");
        System.out.printf("%-15s %5s %10.2f%n", "Gesamt", "",
                3 * 2.50 + 5 * 1.80 + 2 * 3.99);

        // String.format() — gleiche Syntax, gibt String zurück
        String formatiert = String.format("PI ≈ %.4f", Math.PI);
        System.out.println("\\n" + formatiert);
    }
}`,
      expectedOutput: `=== println vs print ===
Vorname: Anna Müller

=== printf-Formatierung ===
Name: Anna, Alter: 25
Notenschnitt: 1.73
Notenschnitt: 1.7

=== Tabelle ===
Produkt          Menge      Preis
Kaffee               3       2.50
Tee                  5       1.80
Schokolade           2       3.99
                             --------
Gesamt                      24.48`,
      editable: true,
    },
    {
      title: 'Scanner für Benutzereingaben',
      description: 'Eingaben von der Konsole lesen mit der Scanner-Klasse.',
      code: `import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // String-Eingabe
        System.out.print("Wie heißt du? ");
        String name = scanner.nextLine();

        // Ganzzahl-Eingabe
        System.out.print("Wie alt bist du? ");
        int alter = scanner.nextInt();

        // Double-Eingabe
        System.out.print("Wie groß bist du (in m)? ");
        double groesse = scanner.nextDouble();

        // Wichtig: Zeilenumbruch nach nextInt/nextDouble verbrauchen
        scanner.nextLine();

        // Nochmal String-Eingabe
        System.out.print("Was ist dein Hobby? ");
        String hobby = scanner.nextLine();

        // Ausgabe
        System.out.println("\\n=== Dein Profil ===");
        System.out.printf("Name:    %s%n", name);
        System.out.printf("Alter:   %d Jahre%n", alter);
        System.out.printf("Größe:   %.2f m%n", groesse);
        System.out.printf("Hobby:   %s%n", hobby);

        // Berechnung
        String status = (alter >= 18) ? "volljährig" : "minderjährig";
        System.out.printf("Status:  %s%n", status);

        scanner.close();
    }
}`,
      expectedOutput: `Wie heißt du? Anna
Wie alt bist du? 25
Wie groß bist du (in m)? 1.72
Was ist dein Hobby? Programmieren

=== Dein Profil ===
Name:    Anna
Alter:   25 Jahre
Größe:   1.72 m
Hobby:   Programmieren
Status:  volljährig`,
      editable: true,
    },
    {
      title: 'Interaktiver Taschenrechner',
      description: 'Ein einfacher Taschenrechner mit Scanner-Eingabe und formatierter Ausgabe.',
      code: `import java.util.Scanner;

public class TaschenrechnerDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Mini-Taschenrechner ===");
        System.out.print("Erste Zahl: ");
        double zahl1 = scanner.nextDouble();

        System.out.print("Operator (+, -, *, /): ");
        scanner.nextLine(); // Zeilenumbruch verbrauchen
        String operator = scanner.nextLine();

        System.out.print("Zweite Zahl: ");
        double zahl2 = scanner.nextDouble();

        double ergebnis = 0;
        boolean gueltig = true;

        switch (operator) {
            case "+" -> ergebnis = zahl1 + zahl2;
            case "-" -> ergebnis = zahl1 - zahl2;
            case "*" -> ergebnis = zahl1 * zahl2;
            case "/" -> {
                if (zahl2 != 0) {
                    ergebnis = zahl1 / zahl2;
                } else {
                    System.out.println("Fehler: Division durch 0!");
                    gueltig = false;
                }
            }
            default -> {
                System.out.println("Unbekannter Operator: " + operator);
                gueltig = false;
            }
        }

        if (gueltig) {
            System.out.printf("\\n%.2f %s %.2f = %.2f%n",
                zahl1, operator, zahl2, ergebnis);
        }

        scanner.close();
    }
}`,
      expectedOutput: `=== Mini-Taschenrechner ===
Erste Zahl: 15.5
Operator (+, -, *, /): *
Zweite Zahl: 3

15.50 * 3.00 = 46.50`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'konsolenanwendungen-q1',
      question: 'Was ist der Unterschied zwischen `println` und `print`?',
      options: [
        'println gibt Zahlen aus, print gibt Text aus',
        'println macht einen Zeilenumbruch danach, print nicht',
        'print ist schneller als println',
        'Es gibt keinen Unterschied',
      ],
      correctIndex: 1,
      explanation: 'println (print line) fügt automatisch einen Zeilenumbruch am Ende hinzu. print gibt den Text aus, ohne danach in eine neue Zeile zu gehen.',
    },
    {
      id: 'konsolenanwendungen-q2',
      question: 'Was muss man nach `scanner.nextInt()` aufrufen, bevor man `nextLine()` nutzt?',
      options: [
        'scanner.reset()',
        'scanner.close()',
        'scanner.nextLine() (um den Zeilenumbruch zu verbrauchen)',
        'Nichts — es funktioniert direkt',
      ],
      correctIndex: 2,
      explanation: 'nextInt() liest nur die Zahl, nicht den Zeilenumbruch danach. Dieser bleibt im Eingabepuffer. Ein zusätzlicher nextLine()-Aufruf "verbraucht" diesen Zeilenumbruch, damit der nächste nextLine()-Aufruf korrekt funktioniert.',
    },
    {
      id: 'konsolenanwendungen-q3',
      question: 'Was bewirkt der printf-Platzhalter `%.2f`?',
      options: [
        'Gibt eine Ganzzahl mit 2 Stellen aus',
        'Gibt eine Gleitkommazahl mit genau 2 Nachkommastellen aus',
        'Gibt einen String mit maximal 2 Zeichen aus',
        'Gibt eine Zahl im Binärformat aus',
      ],
      correctIndex: 1,
      explanation: '%.2f ist ein printf-Platzhalter für Gleitkommazahlen (f = float/double) mit genau 2 Nachkommastellen. Z.B. wird 3.14159 als 3.14 ausgegeben.',
    },
  ],
  exercises: ['console-apps-1', 'console-apps-2'],
  keyConceptsDE: [
    'System.out.println() gibt Text mit Zeilenumbruch aus',
    'printf() ermöglicht formatierte Ausgabe mit Platzhaltern (%s, %d, %f)',
    'Scanner liest Benutzereingaben von der Konsole',
    'Nach nextInt()/nextDouble() muss nextLine() aufgerufen werden',
    'String.format() hat die gleiche Syntax wie printf(), gibt aber einen String zurück',
  ],
  transferKnowledge: 'Ein-/Ausgabe (I/O) ist fundamental für jede Programmiersprache. Python nutzt input() und print(), JavaScript hat prompt() und console.log(), C hat scanf() und printf() (gleiche Formatierung!). Das Konzept von formatierter Ausgabe existiert überall.',
  order: 11,
};
