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
    {
      title: 'Wrapper-Klassen und Autoboxing',
      description: 'Wrapper-Klassen für primitive Typen und automatische Konvertierung (Autoboxing/Unboxing).',
      code: `public class WrapperDemo {
    public static void main(String[] args) {
        // Autoboxing: primitiv → Wrapper-Objekt (automatisch)
        Integer zahl = 42;             // int → Integer
        Double komma = 3.14;           // double → Double
        Boolean wahr = true;           // boolean → Boolean
        Character buchstabe = 'A';     // char → Character

        System.out.println("=== Wrapper-Klassen ===");
        System.out.println("Integer: " + zahl);
        System.out.println("Double:  " + komma);
        System.out.println("Boolean: " + wahr);
        System.out.println("Character: " + buchstabe);

        // Unboxing: Wrapper-Objekt → primitiv (automatisch)
        int primitiv = zahl;           // Integer → int
        System.out.println("\\nUnboxing: " + primitiv);

        // Nützliche Methoden der Wrapper-Klassen
        System.out.println("\\n=== Nuetzliche Methoden ===");
        System.out.println("Integer.MAX_VALUE: " + Integer.MAX_VALUE);
        System.out.println("Integer.MIN_VALUE: " + Integer.MIN_VALUE);
        System.out.println("Integer.parseInt(\"123\"): " + Integer.parseInt("123"));
        System.out.println("Double.parseDouble(\"3.14\"): " + Double.parseDouble("3.14"));
        System.out.println("Integer.toBinaryString(255): " + Integer.toBinaryString(255));

        // null ist nur bei Wrapper-Klassen moeglich
        Integer nullbar = null;  // OK — Referenztyp
        // int nichtNull = null;  // Compilerfehler — primitiver Typ!
        System.out.println("\\nnullbar ist null: " + (nullbar == null));
    }
}`,
      expectedOutput: `=== Wrapper-Klassen ===
Integer: 42
Double:  3.14
Boolean: true
Character: A

Unboxing: 42

=== Nuetzliche Methoden ===
Integer.MAX_VALUE: 2147483647
Integer.MIN_VALUE: -2147483648
Integer.parseInt("123"): 123
Double.parseDouble("3.14"): 3.14
Integer.toBinaryString(255): 11111111

nullbar ist null: true`,
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
    {
      id: 'datentypen-q3',
      question: 'Welcher der folgenden Typen ist KEIN primitiver Datentyp in Java?',
      options: [
        'int',
        'boolean',
        'String',
        'char',
      ],
      correctIndex: 2,
      explanation: 'String ist ein Referenztyp (eine Klasse), kein primitiver Datentyp. Die 8 primitiven Typen sind: boolean, byte, short, int, long, float, double und char.',
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
