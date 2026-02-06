import type { Topic } from '../../../types';

export const enums: Topic = {
  id: 'enums',
  moduleId: 'fortgeschritten',
  title: 'Enumerations (Enums)',
  description: 'Erstelle eigene Aufzaehlungstypen mit enum, nutze Werte, Methoden, Konstruktoren, values() und valueOf().',
  content: `
## Enumerations (Enums)

Ein **Enum** (Aufzaehlungstyp) ist ein spezieller Datentyp, der eine feste Menge
von Konstanten definiert. Enums machen Code lesbarer und sicherer als einfache int- oder String-Konstanten.

### Enum erstellen

Enums werden mit dem Schluesselwort \`enum\` definiert. Jeder Wert ist eine Konstante.
Konvention: Enum-Werte werden in **GROSSBUCHSTABEN** geschrieben.

### Nuetzliche Methoden

- \`values()\` -- gibt ein Array aller Enum-Werte zurueck
- \`valueOf("NAME")\` -- gibt den Enum-Wert mit dem angegebenen Namen zurueck
- \`name()\` -- gibt den Namen des Enum-Werts als String zurueck
- \`ordinal()\` -- gibt die Position (Index) des Werts zurueck

### Enums mit Feldern und Methoden

Enums koennen eigene **Felder**, **Konstruktoren** und **Methoden** haben.
Der Konstruktor muss \`private\` sein (oder package-private), da Enum-Werte nur intern erstellt werden.

### Enums in switch-Ausdruecken

Enums eignen sich hervorragend fuer \`switch\`-Ausdruecke, da der Compiler
warnen kann, wenn nicht alle Werte behandelt werden.
  `,
  codeExamples: [
    {
      title: 'Einfache Enums und ihre Methoden',
      description: 'Erstellen und Verwenden eines einfachen Enum-Typs.',
      code: `public class EnumBeispiel {

    enum Wochentag {
        MONTAG, DIENSTAG, MITTWOCH, DONNERSTAG,
        FREITAG, SAMSTAG, SONNTAG
    }

    public static void main(String[] args) {
        Wochentag heute = Wochentag.MITTWOCH;
        System.out.println("Heute ist: " + heute);
        System.out.println("Name: " + heute.name());
        System.out.println("Position: " + heute.ordinal());

        // Alle Werte durchlaufen
        System.out.println("\\nAlle Wochentage:");
        for (Wochentag tag : Wochentag.values()) {
            System.out.println("  " + tag.ordinal() + ": " + tag);
        }

        // valueOf -- String zu Enum
        Wochentag freitag = Wochentag.valueOf("FREITAG");
        System.out.println("\\nParsed: " + freitag);

        // switch mit Enum
        switch (heute) {
            case MONTAG, DIENSTAG, MITTWOCH, DONNERSTAG, FREITAG ->
                System.out.println("Arbeitstag!");
            case SAMSTAG, SONNTAG ->
                System.out.println("Wochenende!");
        }
    }
}`,
      expectedOutput: `Heute ist: MITTWOCH
Name: MITTWOCH
Position: 2

Alle Wochentage:
  0: MONTAG
  1: DIENSTAG
  2: MITTWOCH
  3: DONNERSTAG
  4: FREITAG
  5: SAMSTAG
  6: SONNTAG

Parsed: FREITAG
Arbeitstag!`,
      editable: true,
    },
    {
      title: 'Enums mit Feldern, Konstruktoren und Methoden',
      description: 'Enums koennen wie Klassen eigene Eigenschaften und Methoden haben.',
      code: `public class ErweitertesEnumBeispiel {

    enum Planet {
        MERKUR(3.303e+23, 2.4397e6),
        VENUS(4.869e+24, 6.0518e6),
        ERDE(5.976e+24, 6.37814e6),
        MARS(6.421e+23, 3.3972e6);

        private final double masse;    // in kg
        private final double radius;   // in Metern

        // Konstruktor (immer private bei Enums)
        Planet(double masse, double radius) {
            this.masse = masse;
            this.radius = radius;
        }

        // Methode: Oberflaechen-Schwerkraft berechnen
        double schwerkraft() {
            final double G = 6.67300E-11;
            return G * masse / (radius * radius);
        }

        // Methode: Gewicht auf dem Planeten
        double gewicht(double masseKg) {
            return masseKg * schwerkraft();
        }
    }

    public static void main(String[] args) {
        double meinGewichtKg = 75.0;

        System.out.println("Gewicht auf verschiedenen Planeten:");
        System.out.println("(Masse auf der Erde: " + meinGewichtKg + " kg)\\n");

        for (Planet p : Planet.values()) {
            System.out.printf("%s: %.1f N (g = %.2f m/s2)%n",
                    p, p.gewicht(meinGewichtKg), p.schwerkraft());
        }
    }
}`,
      expectedOutput: `Gewicht auf verschiedenen Planeten:
(Masse auf der Erde: 75.0 kg)

MERKUR: 277.4 N (g = 3.70 m/s2)
VENUS: 667.9 N (g = 8.91 m/s2)
ERDE: 735.8 N (g = 9.81 m/s2)
MARS: 279.2 N (g = 3.72 m/s2)`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'enums-q1',
      question: 'Welche Methode gibt ein Array aller Enum-Werte zurueck?',
      options: ['getValues()', 'values()', 'allValues()', 'toArray()'],
      correctIndex: 1,
      explanation: 'Die Methode values() wird vom Compiler automatisch fuer jedes Enum generiert und gibt ein Array aller definierten Konstanten zurueck.',
    },
    {
      id: 'enums-q2',
      question: 'Welche Sichtbarkeit hat ein Konstruktor in einem Enum?',
      options: ['public', 'protected', 'private (oder package-private)', 'static'],
      correctIndex: 2,
      explanation: 'Enum-Konstruktoren sind immer private (oder package-private). Man kann keine neuen Enum-Instanzen von aussen erstellen -- die Werte werden nur innerhalb des Enums definiert.',
    },
  ],
  exercises: ['enumerations-01'],
  keyConceptsDE: [
    'Enums definieren eine feste Menge von Konstanten mit dem Schluesselwort enum',
    'values() liefert alle Werte, valueOf() wandelt einen String zum Enum-Wert',
    'Enums koennen Felder, Konstruktoren und Methoden haben',
    'Enum-Konstruktoren sind immer private -- Werte werden nur intern erstellt',
  ],
  transferKnowledge: 'Enums gibt es in vielen Sprachen: TypeScript, Python, C#, Rust. Das Konzept eines eingeschraenkten Wertebereichs macht Code sicherer und lesbarer. In der Praxis nutzt man Enums fuer Status-Werte, Konfigurationen und ueberall dort, wo nur bestimmte Werte erlaubt sind.',
  order: 32,
};
