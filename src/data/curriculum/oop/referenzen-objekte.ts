import type { Topic } from '../../../types';

export const referenzenObjekte: Topic = {
  id: 'referenzen-objekte',
  moduleId: 'oop',
  title: 'Referenzen und Objekte im Speicher',
  description: 'Stack vs Heap, Referenzvariablen, new, null, NullPointerException, Garbage Collection, == vs equals.',
  content: `# Referenzen und Objekte im Speicher

In Java werden Objekte und primitive Datentypen **unterschiedlich** im Speicher verwaltet.

## Stack vs. Heap

- **Stack**: Speichert lokale Variablen und Referenzen. Arbeitet nach dem LIFO-Prinzip (Last In, First Out). Jeder Thread hat seinen eigenen Stack.
- **Heap**: Speichert die tatsaechlichen Objekte. Wird von allen Threads geteilt. Objekte auf dem Heap existieren, solange eine Referenz auf sie zeigt.

## Referenzvariablen

Eine Variable eines Referenztyps speichert **nicht das Objekt selbst**, sondern eine **Referenz** (Adresse) auf das Objekt im Heap. Mehrere Referenzen koennen auf dasselbe Objekt zeigen.

## null und NullPointerException

- \`null\` bedeutet: Die Referenzvariable zeigt auf **kein Objekt**
- Ein Methodenaufruf auf \`null\` fuehrt zu einer **NullPointerException** (NPE)
- NPE ist einer der haeufigsten Laufzeitfehler in Java

## Garbage Collection

Die JVM raeumt nicht mehr referenzierte Objekte **automatisch** auf. Der **Garbage Collector** (GC) gibt den Speicher frei, wenn kein Verweis mehr auf ein Objekt existiert. Man muss Speicher in Java nie manuell freigeben.

## == vs. equals()

- **\`==\`** vergleicht bei Referenztypen die **Referenzen** (Adressen), nicht die Inhalte
- **\`equals()\`** vergleicht den **inhaltlichen Wert** (wenn korrekt ueberschrieben)`,
  codeExamples: [
    {
      title: 'Referenzen und Speicher',
      description: 'Demonstration, wie Referenzen auf Objekte im Heap zeigen und wie mehrere Referenzen auf dasselbe Objekt verweisen koennen.',
      code: `public class ReferenzDemo {
    public static void main(String[] args) {
        // p1 zeigt auf ein neues Objekt im Heap
        int[] p1 = {10, 20, 30};
        // p2 ist eine KOPIE der Referenz - zeigt auf DASSELBE Objekt
        int[] p2 = p1;

        System.out.println("p1[0] = " + p1[0]);
        System.out.println("p2[0] = " + p2[0]);

        // Aenderung ueber p2 betrifft auch p1 (selbes Objekt!)
        p2[0] = 99;
        System.out.println("Nach p2[0] = 99:");
        System.out.println("p1[0] = " + p1[0]); // Auch 99!
        System.out.println("p2[0] = " + p2[0]);

        // Sind es dieselben Referenzen?
        System.out.println("p1 == p2: " + (p1 == p2)); // true

        // Neues Objekt fuer p2
        p2 = new int[]{10, 20, 30};
        System.out.println("Nach p2 = new int[]{...}:");
        System.out.println("p1 == p2: " + (p1 == p2)); // false
    }
}`,
      expectedOutput: `p1[0] = 10
p2[0] = 10
Nach p2[0] = 99:
p1[0] = 99
p2[0] = 99
p1 == p2: true
Nach p2 = new int[]{...}:
p1 == p2: false`,
      editable: true,
    },
    {
      title: 'null und NullPointerException',
      description: 'Umgang mit null-Referenzen und Vermeidung von NullPointerExceptions.',
      code: `public class NullDemo {
    public static void main(String[] args) {
        String text = null; // Referenz zeigt auf kein Objekt

        System.out.println("text ist null: " + (text == null));

        // Sichere Pruefung vor dem Zugriff
        if (text != null) {
            System.out.println("Laenge: " + text.length());
        } else {
            System.out.println("text ist null - kein Zugriff moeglich!");
        }

        // Jetzt zuweisen
        text = "Hallo Java";
        System.out.println("text ist null: " + (text == null));
        System.out.println("Laenge: " + text.length());

        // NullPointerException demonstrieren
        try {
            String leer = null;
            leer.toUpperCase(); // BOOM: NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("NullPointerException gefangen: " + e.getMessage());
        }
    }
}`,
      expectedOutput: `text ist null: true
text ist null - kein Zugriff moeglich!
text ist null: false
Laenge: 10
NullPointerException gefangen: Cannot invoke "String.toUpperCase()" because "leer" is null`,
      editable: true,
    },
    {
      title: '== vs. equals()',
      description: 'Der wichtige Unterschied zwischen Referenzvergleich (==) und Inhaltsvergleich (equals).',
      code: `public class EqualsDemo {
    public static void main(String[] args) {
        // String-Vergleich
        String s1 = new String("Hallo");
        String s2 = new String("Hallo");

        System.out.println("== Vergleich:     " + (s1 == s2));      // false!
        System.out.println("equals Vergleich: " + s1.equals(s2));   // true

        // String-Pool (Sonderfall)
        String s3 = "Welt";
        String s4 = "Welt";
        System.out.println("String-Pool ==:   " + (s3 == s4));      // true (Pool!)

        // Primitive vs. Wrapper
        Integer a = 200;
        Integer b = 200;
        System.out.println("Integer == :      " + (a == b));        // false
        System.out.println("Integer equals:   " + a.equals(b));     // true

        // Integer-Cache (-128 bis 127)
        Integer c = 100;
        Integer d = 100;
        System.out.println("Integer Cache ==: " + (c == d));        // true (Cache!)
    }
}`,
      expectedOutput: `== Vergleich:     false
equals Vergleich: true
String-Pool ==:   true
Integer == :      false
Integer equals:   true
Integer Cache ==: true`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'referenzen-q1',
      question: 'Was passiert, wenn zwei Referenzvariablen auf dasselbe Objekt zeigen und das Objekt ueber eine Referenz veraendert wird?',
      options: [
        'Nur die Variable, ueber die geaendert wurde, sieht die Aenderung',
        'Beide Variablen sehen die Aenderung, da sie auf dasselbe Objekt zeigen',
        'Java erstellt automatisch eine Kopie des Objekts',
        'Es wird eine Exception ausgeloest',
      ],
      correctIndex: 1,
      explanation: 'Wenn zwei Referenzvariablen auf dasselbe Objekt zeigen, sehen beide Variablen jede Aenderung am Objekt. Es gibt nur EIN Objekt im Heap, auf das beide Referenzen verweisen.',
    },
    {
      id: 'referenzen-q2',
      question: 'Was ist der Unterschied zwischen == und equals() bei Referenztypen?',
      options: [
        'Es gibt keinen Unterschied',
        '== vergleicht Inhalte, equals() vergleicht Referenzen',
        '== vergleicht Referenzen (Adressen), equals() vergleicht Inhalte (wenn korrekt ueberschrieben)',
        '== funktioniert nur mit primitiven Typen',
      ],
      correctIndex: 2,
      explanation: 'Der ==-Operator vergleicht bei Referenztypen die Speicheradressen (ob es dasselbe Objekt ist). Die equals()-Methode vergleicht den inhaltlichen Wert, sofern sie in der Klasse korrekt ueberschrieben wurde (z.B. in String, Integer).',
    },
  ],
  exercises: ['oo-04'],
  keyConceptsDE: [
    'Objekte liegen auf dem Heap, Referenzen auf dem Stack',
    'Mehrere Referenzen koennen auf dasselbe Objekt zeigen',
    'null bedeutet: keine Referenz auf ein Objekt',
    'NullPointerException entsteht bei Methodenaufruf auf null',
    'Garbage Collector raeumt nicht mehr referenzierte Objekte auf',
    '== vergleicht Referenzen, equals() vergleicht Inhalte',
  ],
  transferKnowledge: 'Speicherverwaltung ist ein fundamentales Konzept in allen Programmiersprachen. Python und C# nutzen ebenfalls Garbage Collection. C/C++ erfordern manuelle Speicherverwaltung. Das Verstaendnis von Referenzen vs. Werten ist in jeder Sprache essentiell.',
  order: 21,
};
