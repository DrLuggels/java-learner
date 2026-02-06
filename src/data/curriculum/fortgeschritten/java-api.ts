import type { Topic } from '../../../types';

export const javaApi: Topic = {
  id: 'java-api',
  moduleId: 'fortgeschritten',
  title: 'Die Java API Dokumentation',
  description: 'Lerne, die offizielle Java API Dokumentation zu lesen und die wichtigsten Pakete java.lang, java.util und java.io zu nutzen.',
  content: `
## Die Java API Dokumentation

Die **Java API Dokumentation** (Javadoc) ist dein wichtigstes Nachschlagewerk als Java-Entwickler.
Sie beschreibt alle Klassen, Methoden und Interfaces der Java-Standardbibliothek.

### Aufbau der Dokumentation

Die Dokumentation ist in **Pakete** (Packages) gegliedert. Die wichtigsten sind:
- **java.lang** -- Grundlegende Klassen wie \`String\`, \`Math\`, \`System\`, \`Object\` (wird automatisch importiert)
- **java.util** -- Hilfsklassen wie \`ArrayList\`, \`HashMap\`, \`Scanner\`, \`Collections\`
- **java.io** -- Ein-/Ausgabe-Klassen wie \`File\`, \`InputStream\`, \`OutputStream\`

### Javadoc lesen

Jede Klasse in der Dokumentation zeigt:
- Eine **Beschreibung** der Klasse und ihren Zweck
- Die **Vererbungshierarchie** (welche Klasse sie erweitert)
- Eine **Methodenübersicht** mit Parametern, Rückgabetypen und Beschreibung
- **Konstruktoren** und **Felder**

### Eigene Javadoc schreiben

Mit speziellen Kommentaren (\`/** ... */\`) kannst du deine eigene Dokumentation erstellen.
Tags wie \`@param\`, \`@return\` und \`@throws\` beschreiben Parameter, Rückgabewerte und Ausnahmen.
  `,
  codeExamples: [
    {
      title: 'Wichtige Klassen aus java.lang und java.util',
      description: 'Beispiele fuer haeufig genutzte API-Klassen aus den Standardpaketen.',
      code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class JavaApiBeispiel {
    public static void main(String[] args) {
        // java.lang -- automatisch importiert
        String text = "Hallo Java API";
        System.out.println("Laenge: " + text.length());
        System.out.println("Grossbuchstaben: " + text.toUpperCase());

        // Math-Klasse aus java.lang
        System.out.println("Maximum: " + Math.max(10, 20));
        System.out.println("Wurzel von 144: " + Math.sqrt(144));

        // java.util -- ArrayList und Collections
        List<String> namen = new ArrayList<>();
        namen.add("Charlie");
        namen.add("Alice");
        namen.add("Bob");

        Collections.sort(namen);
        System.out.println("Sortiert: " + namen);
    }
}`,
      expectedOutput: `Laenge: 14
Grossbuchstaben: HALLO JAVA API
Maximum: 20
Wurzel von 144: 12.0
Sortiert: [Alice, Bob, Charlie]`,
      editable: true,
    },
    {
      title: 'Eigene Javadoc-Kommentare schreiben',
      description: 'So dokumentierst du deine eigenen Klassen und Methoden mit Javadoc.',
      code: `/**
 * Ein einfacher Taschenrechner fuer Grundrechenarten.
 *
 * @author Entwicklerteam
 * @version 1.0
 */
public class Taschenrechner {

    /**
     * Addiert zwei ganze Zahlen.
     *
     * @param a der erste Summand
     * @param b der zweite Summand
     * @return die Summe von a und b
     */
    public static int addiere(int a, int b) {
        return a + b;
    }

    /**
     * Dividiert zwei Zahlen.
     *
     * @param zaehler der Zaehler
     * @param nenner der Nenner
     * @return das Ergebnis der Division
     * @throws ArithmeticException wenn der Nenner 0 ist
     */
    public static double dividiere(double zaehler, double nenner) {
        if (nenner == 0) {
            throw new ArithmeticException("Division durch Null!");
        }
        return zaehler / nenner;
    }

    public static void main(String[] args) {
        System.out.println("3 + 5 = " + addiere(3, 5));
        System.out.println("10 / 3 = " + dividiere(10, 3));
    }
}`,
      expectedOutput: `3 + 5 = 8
10 / 3 = 3.3333333333333335`,
      editable: true,
    },
    {
      title: 'java.io -- Dateien und System-Eigenschaften',
      description: 'Wichtige Klassen aus java.io und System-Properties abfragen.',
      code: `import java.io.File;

public class SystemInfoBeispiel {
    public static void main(String[] args) {
        // System-Properties aus java.lang.System
        System.out.println("Java-Version: " + System.getProperty("java.version"));
        System.out.println("Betriebssystem: " + System.getProperty("os.name"));
        System.out.println("User-Home: " + System.getProperty("user.home"));

        // java.io.File -- Dateisystem-Informationen
        File aktuellerOrdner = new File(".");
        System.out.println("\\nAktueller Ordner: " + aktuellerOrdner.getAbsolutePath());
        System.out.println("Existiert: " + aktuellerOrdner.exists());
        System.out.println("Ist Verzeichnis: " + aktuellerOrdner.isDirectory());

        // Math-Klasse aus java.lang
        System.out.println("\\nMath.PI: " + Math.PI);
        System.out.println("Math.abs(-42): " + Math.abs(-42));
        System.out.println("Math.round(3.7): " + Math.round(3.7));
        System.out.println("Math.random(): " + Math.random());
    }
}`,
      expectedOutput: `Java-Version: 21.0.1
Betriebssystem: Windows 11
User-Home: C:\\Users\\student

Aktueller Ordner: C:\\projekte\\.
Existiert: true
Ist Verzeichnis: true

Math.PI: 3.141592653589793
Math.abs(-42): 42
Math.round(3.7): 4
Math.random(): 0.7234...`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'java-api-q1',
      question: 'Welches Paket wird in Java automatisch importiert und muss nicht explizit angegeben werden?',
      options: ['java.util', 'java.io', 'java.lang', 'java.net'],
      correctIndex: 2,
      explanation: 'Das Paket java.lang wird automatisch importiert. Es enthaelt grundlegende Klassen wie String, Math, System und Object.',
    },
    {
      id: 'java-api-q2',
      question: 'Welches Javadoc-Tag beschreibt den Rueckgabewert einer Methode?',
      options: ['@param', '@return', '@throws', '@version'],
      correctIndex: 1,
      explanation: '@return beschreibt den Rueckgabewert einer Methode. @param beschreibt Parameter, @throws beschreibt Ausnahmen.',
    },
    {
      id: 'java-api-q3',
      question: 'In welchem Paket findest du die Klassen ArrayList und HashMap?',
      options: ['java.lang', 'java.io', 'java.util', 'java.net'],
      correctIndex: 2,
      explanation: 'java.util enthaelt Hilfsklassen fuer Collections (ArrayList, HashMap, HashSet), Scanner, Random und vieles mehr. java.lang ist fuer Grundklassen wie String und Math.',
    },
  ],
  exercises: ['java-api-01'],
  keyConceptsDE: [
    'Die Java API Dokumentation beschreibt alle Klassen und Methoden der Standardbibliothek',
    'java.lang wird automatisch importiert und enthaelt String, Math, System',
    'java.util enthaelt Hilfsklassen wie ArrayList, HashMap, Collections',
    'Javadoc-Kommentare beginnen mit /** und verwenden Tags wie @param und @return',
  ],
  transferKnowledge: 'Die Faehigkeit, API-Dokumentation zu lesen, ist eine der wichtigsten Kompetenzen als Entwickler. Ob Java, Python oder JavaScript -- jede Sprache hat ihre Dokumentation, und das Muster ist aehnlich: Pakete, Klassen, Methoden, Parameter.',
  order: 28,
};
