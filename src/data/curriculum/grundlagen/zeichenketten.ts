import type { Topic } from '../../../types';

export const zeichenketten: Topic = {
  id: 'zeichenketten',
  moduleId: 'grundlagen',
  title: 'Zeichenketten (Strings)',
  description: 'String-Erstellung, wichtige Methoden, StringBuilder und Vergleich mit equals.',
  content: `# Zeichenketten (Strings)

Strings sind **Referenztypen** (keine primitiven Typen) und in Java **unveränderlich (immutable)** — jede Änderung erzeugt ein neues String-Objekt.

## String erstellen

\`\`\`java
String s1 = "Hallo";                    // String-Literal (bevorzugt)
String s2 = new String("Hallo");        // Neues Objekt (vermeiden)
String s3 = "Hallo" + " Welt";          // Konkatenation
\`\`\`

## Wichtige String-Methoden

| Methode | Beschreibung | Beispiel |
|---------|--------------|----------|
| \`length()\` | Länge des Strings | \`"Hallo".length()\` → 5 |
| \`charAt(i)\` | Zeichen an Position i | \`"Hallo".charAt(0)\` → 'H' |
| \`substring(a, b)\` | Teilstring von a bis b (exklusiv) | \`"Hallo".substring(0, 3)\` → "Hal" |
| \`equals(s)\` | Inhaltlicher Vergleich | \`"Hallo".equals("Hallo")\` → true |
| \`equalsIgnoreCase(s)\` | Vergleich ohne Groß-/Kleinschreibung | |
| \`toLowerCase()\` | In Kleinbuchstaben | \`"HALLO".toLowerCase()\` → "hallo" |
| \`toUpperCase()\` | In Großbuchstaben | |
| \`contains(s)\` | Enthält Teilstring? | \`"Hallo".contains("all")\` → true |
| \`indexOf(s)\` | Position des Teilstrings | \`"Hallo".indexOf("ll")\` → 2 |
| \`replace(a, b)\` | Zeichen/Text ersetzen | \`"Hallo".replace("l", "r")\` → "Harro" |
| \`split(regex)\` | In Array aufteilen | \`"a,b,c".split(",")\` → ["a","b","c"] |
| \`trim()\` | Leerzeichen am Rand entfernen | \`" Hi ".trim()\` → "Hi" |

## equals() vs. ==

- \`==\` vergleicht **Referenzen** (ob es dasselbe Objekt ist)
- \`equals()\` vergleicht den **Inhalt** (ob die Zeichenkette gleich ist)
- **Immer \`equals()\` für String-Vergleiche verwenden!**

## StringBuilder

Für viele Verkettungen ist \`StringBuilder\` effizienter als \`+\`:
\`\`\`java
var sb = new StringBuilder();
sb.append("Hallo").append(" ").append("Welt");
String ergebnis = sb.toString();
\`\`\``,
  codeExamples: [
    {
      title: 'String-Methoden in Aktion',
      description: 'Demonstration der wichtigsten String-Methoden mit praktischen Beispielen.',
      code: `public class StringMethoden {
    public static void main(String[] args) {
        String text = "Java Programmierung ist toll!";

        System.out.println("=== String-Methoden ===");
        System.out.println("Text:        " + text);
        System.out.println("Länge:       " + text.length());
        System.out.println("charAt(0):   " + text.charAt(0));
        System.out.println("substring(0,4): " + text.substring(0, 4));
        System.out.println("toLowerCase: " + text.toLowerCase());
        System.out.println("toUpperCase: " + text.toUpperCase());
        System.out.println("contains(\"toll\"): " + text.contains("toll"));
        System.out.println("indexOf(\"ist\"): " + text.indexOf("ist"));
        System.out.println("replace:     " + text.replace("toll", "super"));
        System.out.println("trim:        " + "  Leerzeichen  ".trim());

        // Split
        String csv = "Anna;25;Berlin;Studentin";
        String[] teile = csv.split(";");
        System.out.println("\\n=== Split ===");
        for (int i = 0; i < teile.length; i++) {
            System.out.println("  Teil " + i + ": " + teile[i]);
        }

        // equals vs ==
        String a = new String("Test");
        String b = new String("Test");
        System.out.println("\\n=== Vergleich ===");
        System.out.println("a == b:      " + (a == b));
        System.out.println("a.equals(b): " + a.equals(b));
    }
}`,
      expectedOutput: `=== String-Methoden ===
Text:        Java Programmierung ist toll!
Länge:       28
charAt(0):   J
substring(0,4): Java
toLowerCase: java programmierung ist toll!
toUpperCase: JAVA PROGRAMMIERUNG IST TOLL!
contains("toll"): true
indexOf("ist"): 21
replace:     Java Programmierung ist super!
trim:        Leerzeichen

=== Split ===
  Teil 0: Anna
  Teil 1: 25
  Teil 2: Berlin
  Teil 3: Studentin

=== Vergleich ===
a == b:      false
a.equals(b): true`,
      editable: true,
    },
    {
      title: 'StringBuilder für effiziente Verkettung',
      description: 'StringBuilder verwenden statt wiederholter String-Konkatenation mit +.',
      code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        // StringBuilder für effiziente String-Erstellung
        var sb = new StringBuilder();
        sb.append("Name: Anna Müller\\n");
        sb.append("Alter: 25\\n");
        sb.append("Stadt: Berlin\\n");

        System.out.println("=== StringBuilder ===");
        System.out.println(sb.toString());

        // StringBuilder mit Methoden
        var sb2 = new StringBuilder("Hallo Welt");
        System.out.println("Original:  " + sb2);

        sb2.insert(5, ",");
        System.out.println("insert:    " + sb2);

        sb2.replace(7, 11, "Java");
        System.out.println("replace:   " + sb2);

        sb2.reverse();
        System.out.println("reverse:   " + sb2);

        // Praktisches Beispiel: CSV-Zeile bauen
        String[] namen = {"Anna", "Ben", "Clara", "David"};
        var csv = new StringBuilder();
        for (int i = 0; i < namen.length; i++) {
            if (i > 0) csv.append(", ");
            csv.append(namen[i]);
        }
        System.out.println("\\nCSV: " + csv);
    }
}`,
      expectedOutput: `=== StringBuilder ===
Name: Anna Müller
Alter: 25
Stadt: Berlin

Original:  Hallo Welt
insert:    Hallo, Welt
replace:   Hallo, Java
reverse:   avaJ ,ollaH

CSV: Anna, Ben, Clara, David`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'zeichenketten-q1',
      question: 'Wie vergleicht man in Java den Inhalt zweier Strings korrekt?',
      options: [
        'string1 == string2',
        'string1.equals(string2)',
        'string1.compareTo(string2)',
        'string1.compare(string2)',
      ],
      correctIndex: 1,
      explanation: 'equals() vergleicht den Inhalt zweier Strings. Der ==-Operator vergleicht nur die Referenzen (ob es dasselbe Objekt im Speicher ist), nicht den Inhalt.',
    },
    {
      id: 'zeichenketten-q2',
      question: 'Was gibt `"Hallo".substring(1, 4)` zurück?',
      options: [
        '"Hall"',
        '"all"',
        '"allo"',
        '"Hal"',
      ],
      correctIndex: 1,
      explanation: 'substring(1, 4) gibt die Zeichen von Index 1 (inklusive) bis Index 4 (exklusiv) zurück. "Hallo" → Index 1="a", 2="l", 3="l" → "all".',
    },
  ],
  exercises: ['data-objects-1', 'data-objects-2'],
  keyConceptsDE: [
    'Strings sind unveränderlich (immutable) — jede Änderung erzeugt ein neues Objekt',
    'equals() für Inhaltsvergleich, == nur für Referenzvergleich',
    'Wichtige Methoden: length(), charAt(), substring(), contains(), indexOf(), replace(), split(), trim()',
    'StringBuilder für effiziente String-Verkettung bei vielen Operationen',
    'substring() ist inklusive am Anfang und exklusiv am Ende',
  ],
  transferKnowledge: 'Strings sind in jeder Programmiersprache zentral. Python-Strings sind ebenfalls immutable und haben ähnliche Methoden. JavaScript-Strings haben vergleichbare Funktionalität. In C gibt es keine eingebauten Strings — dort sind sie char-Arrays. Das Konzept der Immutabilität findet sich in vielen Sprachen.',
  order: 7,
};
