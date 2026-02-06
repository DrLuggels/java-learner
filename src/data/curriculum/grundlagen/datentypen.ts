import type { Topic } from '../../../types';

export const datentypen: Topic = {
  id: 'datentypen',
  moduleId: 'grundlagen',
  title: 'Datentypen',
  description: 'Die 8 primitiven Datentypen, Referenztypen und ihre Wertebereiche.',
  content: `# Datentypen in Java

Java ist eine **stark typisierte** Sprache — jede Variable hat einen festen Datentyp. Es gibt zwei Kategorien: **primitive Typen** und **Referenztypen**.

## Die 8 primitiven Datentypen

| Typ | Größe | Wertebereich | Beispiel |
|-----|-------|-------------|----------|
| \`boolean\` | 1 Bit* | \`true\` / \`false\` | \`true\` |
| \`byte\` | 1 Byte | -128 bis 127 | \`42\` |
| \`short\` | 2 Byte | -32.768 bis 32.767 | \`1000\` |
| \`int\` | 4 Byte | -2.147.483.648 bis 2.147.483.647 | \`100000\` |
| \`long\` | 8 Byte | ca. ±9,2 × 10¹⁸ | \`100000L\` |
| \`float\` | 4 Byte | ca. ±3,4 × 10³⁸ | \`3.14f\` |
| \`double\` | 8 Byte | ca. ±1,7 × 10³⁰⁸ | \`3.14\` |
| \`char\` | 2 Byte | Unicode-Zeichen (0-65.535) | \`'A'\` |

## Referenztypen

Referenztypen sind **Objekte** und beginnen mit einem Großbuchstaben:
- \`String\`, \`Integer\`, \`Double\`, \`Boolean\` (Wrapper-Klassen)
- Arrays, eigene Klassen, Interfaces

## Wichtige Unterschiede

- **Primitive** speichern den Wert direkt → schnell, kein \`null\` möglich
- **Referenztypen** speichern eine Referenz (Adresse) auf das Objekt → können \`null\` sein
- **Wrapper-Klassen** (Integer, Double, ...) sind Referenztypen, die primitive Werte "einwickeln"

## Typumwandlung (Casting)

- **Implizit (Widening)**: kleine → große Typen automatisch (\`int\` → \`long\`)
- **Explizit (Narrowing)**: große → kleine Typen manuell (\`(int) 3.14\`)`,
  codeExamples: [
    {
      title: 'Alle primitiven Datentypen',
      description: 'Deklaration und Ausgabe aller 8 primitiven Typen mit ihren Wertebereichen.',
      code: `public class DatentypenDemo {
    public static void main(String[] args) {
        // Ganzzahl-Typen
        byte   meinByte   = 127;
        short  meinShort  = 32_767;
        int    meinInt    = 2_147_483_647;
        long   meinLong   = 9_223_372_036_854_775_807L;

        // Gleitkomma-Typen
        float  meinFloat  = 3.14f;
        double meinDouble = 3.141592653589793;

        // Zeichen und Wahrheitswert
        char    meinChar    = 'A';
        boolean meinBoolean = true;

        System.out.println("=== Primitive Datentypen ===");
        System.out.println("byte:    " + meinByte + "    (Max: " + Byte.MAX_VALUE + ")");
        System.out.println("short:   " + meinShort + "  (Max: " + Short.MAX_VALUE + ")");
        System.out.println("int:     " + meinInt);
        System.out.println("long:    " + meinLong);
        System.out.println("float:   " + meinFloat);
        System.out.println("double:  " + meinDouble);
        System.out.println("char:    " + meinChar + " (Unicode: " + (int) meinChar + ")");
        System.out.println("boolean: " + meinBoolean);
    }
}`,
      expectedOutput: `=== Primitive Datentypen ===
byte:    127    (Max: 127)
short:   32767  (Max: 32767)
int:     2147483647
long:    9223372036854775807
float:   3.14
double:  3.141592653589793
char:    A (Unicode: 65)
boolean: true`,
      editable: true,
    },
    {
      title: 'Typumwandlung (Casting)',
      description: 'Implizite und explizite Typumwandlung zwischen verschiedenen Datentypen.',
      code: `public class CastingDemo {
    public static void main(String[] args) {
        // Implizites Casting (Widening) — kein Datenverlust
        int ganzzahl = 42;
        long grosseZahl = ganzzahl;        // int → long automatisch
        double kommazahl = ganzzahl;       // int → double automatisch

        System.out.println("=== Implizites Casting ===");
        System.out.println("int:    " + ganzzahl);
        System.out.println("long:   " + grosseZahl);
        System.out.println("double: " + kommazahl);

        // Explizites Casting (Narrowing) — möglicher Datenverlust!
        double pi = 3.99;
        int abgeschnitten = (int) pi;      // Nachkommastellen gehen verloren!
        byte kleineByte = (byte) 200;      // Überlauf! 200 > 127

        System.out.println("\\n=== Explizites Casting ===");
        System.out.println("double: " + pi);
        System.out.println("(int):  " + abgeschnitten + "  ← Nachkomma verloren!");
        System.out.println("(byte) 200: " + kleineByte + "  ← Überlauf!");

        // String → Zahl und zurück
        String text = "123";
        int zahl = Integer.parseInt(text);
        String zurueck = String.valueOf(zahl);
        System.out.println("\\n=== String-Konvertierung ===");
        System.out.println("String → int: " + zahl);
        System.out.println("int → String: " + zurueck);
    }
}`,
      expectedOutput: `=== Implizites Casting ===
int:    42
long:   42
double: 42.0

=== Explizites Casting ===
double: 3.99
(int):  3  ← Nachkomma verloren!
(byte) 200: -56  ← Überlauf!

=== String-Konvertierung ===
String → int: 123
int → String: 123`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'datentypen-q1',
      question: 'Welcher primitive Typ eignet sich am besten für Kommazahlen mit hoher Genauigkeit?',
      options: [
        'float',
        'double',
        'long',
        'int',
      ],
      correctIndex: 1,
      explanation: 'double hat mit 8 Byte eine höhere Genauigkeit als float (4 Byte). In Java ist double der Standard-Typ für Gleitkommazahlen.',
    },
    {
      id: 'datentypen-q2',
      question: 'Was passiert bei `int x = (int) 3.9;`?',
      options: [
        'x wird auf 4 gerundet',
        'x ist 3 — die Nachkommastellen werden abgeschnitten',
        'Es gibt einen Compilerfehler',
        'x wird zu 3.9 als Gleitkommazahl',
      ],
      correctIndex: 1,
      explanation: 'Bei explizitem Casting von double nach int werden die Nachkommastellen einfach abgeschnitten (nicht gerundet). 3.9 wird zu 3.',
    },
  ],
  exercises: ['data-objects-1', 'data-objects-2'],
  keyConceptsDE: [
    'Java hat 8 primitive Datentypen: boolean, byte, short, int, long, float, double, char',
    'Primitive speichern Werte direkt, Referenztypen speichern Adressen',
    'Implizites Casting (Widening): automatisch von klein nach groß',
    'Explizites Casting (Narrowing): manuell mit möglichem Datenverlust',
    'Wrapper-Klassen wie Integer und Double umwickeln primitive Typen',
  ],
  transferKnowledge: 'Fast jede Programmiersprache hat primitive Datentypen. Python unterscheidet zwischen int, float, str und bool. C hat ähnliche Typen wie Java. JavaScript hat nur number (kein int/double-Unterschied) und BigInt. Das Konzept der Typumwandlung existiert überall.',
  order: 5,
};
