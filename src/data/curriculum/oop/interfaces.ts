import type { Topic } from '../../../types';

export const interfaces: Topic = {
  id: 'interfaces',
  moduleId: 'oop',
  title: 'Interfaces',
  description: 'interface, implements, default methods, static methods, Mehrfachvererbung ueber Interfaces, funktionale Interfaces.',
  content: `# Interfaces

Ein **Interface** definiert einen **Vertrag**: Es legt fest, welche Methoden eine Klasse bereitstellen muss, ohne die Implementierung vorzugeben.

## Grundlagen

- Deklaration mit \`interface\` statt \`class\`
- Klassen implementieren Interfaces mit \`implements\`
- Eine Klasse kann **mehrere Interfaces** implementieren (Loesung fuer fehlende Mehrfachvererbung)
- Alle Methoden eines Interfaces sind implizit \`public abstract\` (vor Java 8)

## Default Methods (seit Java 8)

Interfaces koennen Methoden mit \`default\`-Implementierung enthalten. So koennen bestehende Interfaces erweitert werden, **ohne** alle implementierenden Klassen anzupassen.

## Static Methods (seit Java 8)

Interfaces koennen auch \`static\`-Methoden enthalten — Hilfsmethoden, die ueber den Interface-Namen aufgerufen werden.

## Funktionale Interfaces (seit Java 8)

Ein Interface mit **genau einer abstrakten Methode** ist ein funktionales Interface. Es kann mit **Lambda-Ausdruecken** verwendet werden. Die Annotation \`@FunctionalInterface\` dokumentiert diese Absicht.

## Mehrfachvererbung ueber Interfaces

Java erlaubt keine Mehrfachvererbung bei Klassen, aber eine Klasse kann **beliebig viele Interfaces** implementieren. So werden mehrere Vertraege gleichzeitig erfuellt.`,
  codeExamples: [
    {
      title: 'Interface implementieren und Mehrfachvererbung',
      description: 'Eine Klasse implementiert mehrere Interfaces und erfuellt verschiedene Vertraege.',
      code: `interface Druckbar {
    void drucken();
}

interface Speicherbar {
    void speichern(String pfad);
    void laden(String pfad);
}

interface Exportierbar {
    void exportieren(String format);

    // Default-Methode (seit Java 8)
    default void exportierenAlsPDF() {
        exportieren("PDF");
    }
}

// Klasse implementiert MEHRERE Interfaces
class Dokument implements Druckbar, Speicherbar, Exportierbar {
    private String titel;
    private String inhalt;

    public Dokument(String titel, String inhalt) {
        this.titel = titel;
        this.inhalt = inhalt;
    }

    @Override
    public void drucken() {
        System.out.println("Drucke: " + titel);
    }

    @Override
    public void speichern(String pfad) {
        System.out.println("Speichere '" + titel + "' nach " + pfad);
    }

    @Override
    public void laden(String pfad) {
        System.out.println("Lade Dokument von " + pfad);
    }

    @Override
    public void exportieren(String format) {
        System.out.println("Exportiere '" + titel + "' als " + format);
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Dokument doc = new Dokument("Bericht Q1", "Quartalszahlen...");

        doc.drucken();
        doc.speichern("/dokumente/bericht.txt");
        doc.exportieren("CSV");
        doc.exportierenAlsPDF(); // Default-Methode!

        // Polymorphie ueber Interfaces
        Druckbar druckbar = doc;
        druckbar.drucken();
    }
}`,
      expectedOutput: `Drucke: Bericht Q1
Speichere 'Bericht Q1' nach /dokumente/bericht.txt
Exportiere 'Bericht Q1' als CSV
Exportiere 'Bericht Q1' als PDF
Drucke: Bericht Q1`,
      editable: true,
    },
    {
      title: 'Funktionale Interfaces und Lambda',
      description: 'Funktionale Interfaces haben genau eine abstrakte Methode und koennen mit Lambda-Ausdruecken verwendet werden.',
      code: `import java.util.Arrays;
import java.util.List;

// Funktionales Interface: genau EINE abstrakte Methode
@FunctionalInterface
interface Berechnung {
    double ausfuehren(double a, double b);
}

@FunctionalInterface
interface TextFilter {
    boolean test(String text);
}

public class FunktionalDemo {
    // Methode, die ein funktionales Interface akzeptiert
    static double berechne(double a, double b, Berechnung op) {
        return op.ausfuehren(a, b);
    }

    public static void main(String[] args) {
        // Lambda-Ausdruecke als Implementierung
        Berechnung addieren = (a, b) -> a + b;
        Berechnung multiplizieren = (a, b) -> a * b;
        Berechnung max = (a, b) -> Math.max(a, b);

        System.out.println("10 + 3 = " + berechne(10, 3, addieren));
        System.out.println("10 * 3 = " + berechne(10, 3, multiplizieren));
        System.out.println("max(10,3) = " + berechne(10, 3, max));
        System.out.println();

        // TextFilter mit Lambda
        TextFilter istLang = text -> text.length() > 5;
        TextFilter beginntMitJ = text -> text.startsWith("J");

        List<String> woerter = Arrays.asList("Java", "Python", "Go", "JavaScript", "C");

        System.out.print("Laenger als 5 Zeichen: ");
        woerter.stream().filter(istLang::test).forEach(w -> System.out.print(w + " "));
        System.out.println();

        System.out.print("Beginnt mit J: ");
        woerter.stream().filter(beginntMitJ::test).forEach(w -> System.out.print(w + " "));
        System.out.println();
    }
}`,
      expectedOutput: `10 + 3 = 13.0
10 * 3 = 30.0
max(10,3) = 10.0

Laenger als 5 Zeichen: Python JavaScript
Beginnt mit J: Java JavaScript `,
      editable: true,
    },
    {
      title: 'Static Methods und Default Methods',
      description: 'Interfaces koennen statische Hilfsmethoden und Default-Implementierungen bereitstellen.',
      code: `interface Validierbar {
    boolean istGueltig();

    // Default-Methode mit Standardimplementierung
    default String validierungsStatus() {
        return istGueltig() ? "GUELTIG" : "UNGUELTIG";
    }

    // Static-Methode: ueber Interface-Name aufrufbar
    static void validiereAlle(Validierbar... objekte) {
        for (int i = 0; i < objekte.length; i++) {
            System.out.printf("Objekt %d: %s%n", i + 1, objekte[i].validierungsStatus());
        }
    }
}

class Email implements Validierbar {
    private String adresse;

    public Email(String adresse) { this.adresse = adresse; }

    @Override
    public boolean istGueltig() {
        return adresse != null && adresse.contains("@") && adresse.contains(".");
    }

    @Override
    public String toString() { return "Email(" + adresse + ")"; }
}

class Passwort implements Validierbar {
    private String wert;

    public Passwort(String wert) { this.wert = wert; }

    @Override
    public boolean istGueltig() {
        return wert != null && wert.length() >= 8;
    }

    @Override
    public String toString() { return "Passwort(****)"; }
}

public class StaticDefaultDemo {
    public static void main(String[] args) {
        Email e1 = new Email("max@example.com");
        Email e2 = new Email("ungueltig");
        Passwort p1 = new Passwort("sicheresPasswort123");
        Passwort p2 = new Passwort("kurz");

        System.out.println(e1 + ": " + e1.validierungsStatus());
        System.out.println(e2 + ": " + e2.validierungsStatus());
        System.out.println();

        System.out.println("=== Alle validieren ===");
        Validierbar.validiereAlle(e1, e2, p1, p2);
    }
}`,
      expectedOutput: `Email(max@example.com): GUELTIG
Email(ungueltig): UNGUELTIG

=== Alle validieren ===
Objekt 1: GUELTIG
Objekt 2: UNGUELTIG
Objekt 3: GUELTIG
Objekt 4: UNGUELTIG`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'interfaces-q1',
      question: 'Was ist der Hauptunterschied zwischen einer abstrakten Klasse und einem Interface?',
      options: [
        'Es gibt keinen Unterschied',
        'Interfaces koennen keine Methoden haben',
        'Eine Klasse kann nur ein Interface implementieren',
        'Eine Klasse kann mehrere Interfaces implementieren, aber nur von einer Klasse erben',
      ],
      correctIndex: 3,
      explanation: 'Java erlaubt Einfachvererbung bei Klassen (ein extends), aber Mehrfachimplementierung bei Interfaces (mehrere implements). Ausserdem koennen abstrakte Klassen Zustand (Attribute) speichern, Interfaces traditionell nicht (nur Konstanten).',
    },
    {
      id: 'interfaces-q2',
      question: 'Was ist ein funktionales Interface?',
      options: [
        'Ein Interface ohne Methoden',
        'Ein Interface mit genau einer abstrakten Methode, das mit Lambda-Ausdruecken verwendet werden kann',
        'Ein Interface, das nur static-Methoden hat',
        'Ein Interface, das von java.util.function erbt',
      ],
      correctIndex: 1,
      explanation: 'Ein funktionales Interface hat genau eine abstrakte Methode (SAM - Single Abstract Method). Es kann mit Lambda-Ausdruecken oder Methodenreferenzen implementiert werden. @FunctionalInterface ist die optionale Annotation dafuer.',
    },
    {
      id: 'interfaces-q3',
      question: 'Was sind Default-Methoden in Interfaces (seit Java 8)?',
      options: [
        'Methoden, die automatisch vom Compiler generiert werden',
        'Methoden mit einer Standardimplementierung, die von implementierenden Klassen nicht ueberschrieben werden muessen',
        'Private Hilfsmethoden innerhalb eines Interfaces',
        'Methoden, die nur in abstrakten Klassen erlaubt sind',
      ],
      correctIndex: 1,
      explanation: 'Default-Methoden (mit dem Schluesselwort `default`) bieten eine Standardimplementierung direkt im Interface. Implementierende Klassen koennen sie ueberschreiben, muessen es aber nicht. Sie wurden eingefuehrt, um bestehende Interfaces erweitern zu koennen, ohne alle implementierenden Klassen zu aendern.',
    },
  ],
  exercises: ['interfaces-01'],
  keyConceptsDE: [
    'Ein Interface definiert einen Vertrag (Welche Methoden muss eine Klasse haben?)',
    'implements statt extends zum Implementieren eines Interfaces',
    'Mehrfachvererbung: Eine Klasse kann mehrere Interfaces implementieren',
    'Default-Methoden erlauben Standardimplementierungen in Interfaces',
    'Static-Methoden in Interfaces sind Hilfsmethoden',
    'Funktionale Interfaces haben genau eine abstrakte Methode (fuer Lambdas)',
  ],
  transferKnowledge: 'Interfaces definieren Vertraege zwischen Komponenten. Dieses Konzept existiert in vielen Sprachen: Go nutzt Interfaces implizit (Duck Typing), TypeScript hat Interfaces mit struktureller Typisierung, C# hat Interfaces aehnlich wie Java, Rust hat Traits. Das Prinzip "Programmiere gegen Interfaces, nicht gegen Implementierungen" ist universell.',
  order: 26,
};
