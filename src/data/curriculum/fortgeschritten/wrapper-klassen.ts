import type { Topic } from '../../../types';

export const wrapperKlassen: Topic = {
  id: 'wrapper-klassen',
  moduleId: 'fortgeschritten',
  title: 'Wrapper-Klassen',
  description: 'Lerne die Wrapper-Klassen Integer, Double, Boolean kennen sowie Autoboxing, Unboxing und parse-Methoden.',
  content: `
## Wrapper-Klassen

In Java gibt es fuer jeden **primitiven Datentyp** eine entsprechende **Wrapper-Klasse**.
Diese Klassen verpacken ("wrappen") den primitiven Wert in ein Objekt.

### Uebersicht der Wrapper-Klassen

| Primitiv | Wrapper-Klasse |
|----------|---------------|
| int      | Integer        |
| double   | Double         |
| boolean  | Boolean        |
| char     | Character      |
| long     | Long           |
| float    | Float          |

### Autoboxing und Unboxing

**Autoboxing** ist die automatische Umwandlung eines primitiven Werts in sein Wrapper-Objekt.
**Unboxing** ist der umgekehrte Vorgang -- vom Objekt zurueck zum primitiven Wert.
Java fuehrt diese Umwandlung automatisch durch, wenn noetig.

### Parse-Methoden

Jede Wrapper-Klasse bietet eine \`parseXxx()\`-Methode, um Strings in den entsprechenden
primitiven Typ umzuwandeln. Z. B. \`Integer.parseInt("42")\` oder \`Double.parseDouble("3.14")\`.

### Nuetzliche Methoden

Wrapper-Klassen bieten Konstanten wie \`Integer.MAX_VALUE\` und \`Integer.MIN_VALUE\`
sowie Methoden wie \`Integer.valueOf()\`, \`Integer.toString()\` und \`Integer.compare()\`.
  `,
  codeExamples: [
    {
      title: 'Autoboxing und Unboxing',
      description: 'Java wandelt automatisch zwischen primitiven Typen und Wrapper-Objekten um.',
      code: `import java.util.ArrayList;
import java.util.List;

public class AutoboxingBeispiel {
    public static void main(String[] args) {
        // Autoboxing: int -> Integer
        Integer zahl = 42; // automatische Umwandlung
        System.out.println("Integer-Objekt: " + zahl);

        // Unboxing: Integer -> int
        int primitiv = zahl; // automatische Umwandlung zurueck
        System.out.println("Primitiver Wert: " + primitiv);

        // Wichtig bei Collections: nur Objekte erlaubt!
        List<Integer> zahlen = new ArrayList<>();
        zahlen.add(10);   // Autoboxing
        zahlen.add(20);   // Autoboxing
        zahlen.add(30);   // Autoboxing

        int summe = 0;
        for (int z : zahlen) {  // Unboxing
            summe += z;
        }
        System.out.println("Summe: " + summe);

        // Vorsicht mit null!
        Integer nullWert = null;
        // int fehler = nullWert; // NullPointerException!
        System.out.println("Null-Check ist wichtig!");
    }
}`,
      expectedOutput: `Integer-Objekt: 42
Primitiver Wert: 42
Summe: 60
Null-Check ist wichtig!`,
      editable: true,
    },
    {
      title: 'Parse-Methoden und nuetzliche Konstanten',
      description: 'Strings in Zahlen umwandeln und Grenzen der Datentypen abfragen.',
      code: `public class ParseBeispiel {
    public static void main(String[] args) {
        // String zu primitiven Typen parsen
        int ganzeZahl = Integer.parseInt("123");
        double kommaZahl = Double.parseDouble("3.14");
        boolean wahrheit = Boolean.parseBoolean("true");
        long grosseZahl = Long.parseLong("9999999999");

        System.out.println("int: " + ganzeZahl);
        System.out.println("double: " + kommaZahl);
        System.out.println("boolean: " + wahrheit);
        System.out.println("long: " + grosseZahl);

        // Nuetzliche Konstanten
        System.out.println("\\nInt-Maximum: " + Integer.MAX_VALUE);
        System.out.println("Int-Minimum: " + Integer.MIN_VALUE);
        System.out.println("Double-Maximum: " + Double.MAX_VALUE);

        // Vergleichen mit compare
        int ergebnis = Integer.compare(10, 20);
        System.out.println("\\n10 vs 20: " + ergebnis); // negativ = kleiner

        // String zu Integer-Objekt
        Integer obj = Integer.valueOf("99");
        System.out.println("valueOf: " + obj);
    }
}`,
      expectedOutput: `int: 123
double: 3.14
boolean: true
long: 9999999999

Int-Maximum: 2147483647
Int-Minimum: -2147483648
Double-Maximum: 1.7976931348623157E308

10 vs 20: -1
valueOf: 99`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'wrapper-q1',
      question: 'Was passiert beim Autoboxing?',
      options: [
        'Ein Objekt wird in einen primitiven Typ umgewandelt',
        'Ein primitiver Wert wird automatisch in ein Wrapper-Objekt umgewandelt',
        'Ein String wird in eine Zahl umgewandelt',
        'Zwei Objekte werden verglichen',
      ],
      correctIndex: 1,
      explanation: 'Autoboxing ist die automatische Umwandlung eines primitiven Werts (z. B. int) in sein entsprechendes Wrapper-Objekt (z. B. Integer). Der umgekehrte Vorgang heisst Unboxing.',
    },
    {
      id: 'wrapper-q2',
      question: 'Welche Methode wandelt den String "42" in einen int um?',
      options: ['Integer.valueOf("42")', 'Integer.parseInt("42")', 'Integer.toInt("42")', 'Integer.convert("42")'],
      correctIndex: 1,
      explanation: 'Integer.parseInt() wandelt einen String in einen primitiven int um. Integer.valueOf() liefert dagegen ein Integer-Objekt zurueck.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Wrapper-Klassen verpacken primitive Typen als Objekte (int -> Integer)',
    'Autoboxing wandelt primitiv zu Objekt, Unboxing umgekehrt',
    'parseXxx()-Methoden wandeln Strings in primitive Typen um',
    'Collections wie ArrayList koennen nur Objekte speichern, keine primitiven Typen',
  ],
  transferKnowledge: 'Wrapper-Klassen sind ein Beispiel fuer das Konzept des "Boxing" in vielen Sprachen. C# hat ebenfalls Boxing/Unboxing, und in Python sind alle Werte ohnehin Objekte. Das Verstaendnis hilft dir bei Generics und Collections.',
  order: 29,
};
