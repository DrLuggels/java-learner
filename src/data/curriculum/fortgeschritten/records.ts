import type { Topic } from '../../../types';

export const records: Topic = {
  id: 'records',
  moduleId: 'fortgeschritten',
  title: 'Records (Datenklassen)',
  description: 'Kompakte, unveränderliche Datenklassen mit Java Records.',
  content: `## Was sind Records?

Records (seit Java 16) sind **kompakte Datenklassen**. Sie erzeugen automatisch Konstruktor, Getter, toString(), equals() und hashCode().

\`\`\`java
record Point(int x, int y) {}
// Ersetzt ~30 Zeilen herkömmliche Klasse!
\`\`\`

## Merke dir
- Records sind **implizit final** — keine Vererbung
- Alle Felder sind **implizit final** — unveränderlich
- Perfekt für DTOs und Werteobjekte`,
  codeExamples: [
    {
      title: 'Record vs. klassische Klasse',
      description: 'Vergleich: Wie viel Code du mit Records sparst',
      code: `// Record - 1 Zeile!
record Student(String name, int matrikelNr, double note) {}

public class Main {
    public static void main(String[] args) {
        var s1 = new Student("Anna", 12345, 1.3);
        var s2 = new Student("Anna", 12345, 1.3);

        System.out.println(s1);
        System.out.println(s1.name());       // Getter ohne "get"
        System.out.println(s1.equals(s2));    // true - Wertevergleich
    }
}`,
      expectedOutput: 'Student[name=Anna, matrikelNr=12345, note=1.3]\nAnna\ntrue',
      editable: true,
    },
    {
      title: 'Record mit Validierung',
      description: 'Kompakter Konstruktor für Eingabevalidierung',
      code: `record Temperatur(double celsius) {
    // Kompakter Konstruktor
    Temperatur {
        if (celsius < -273.15) {
            throw new IllegalArgumentException("Unter absolutem Nullpunkt!");
        }
    }

    public double fahrenheit() {
        return celsius * 9.0 / 5.0 + 32;
    }
}

public class Main {
    public static void main(String[] args) {
        var t = new Temperatur(100);
        System.out.println(t.celsius() + " C = " + t.fahrenheit() + " F");
        System.out.println(t);
    }
}`,
      expectedOutput: '100.0 C = 212.0 F\nTemperatur[celsius=100.0]',
      editable: true,
    },
    {
      title: 'Record mit Interface und Pattern Matching',
      description: 'Records koennen Interfaces implementieren und mit Sealed Classes kombiniert werden.',
      code: `import java.util.List;

public class Main {
    // Records koennen Interfaces implementieren
    interface Form {
        double flaeche();
    }

    record Kreis(double radius) implements Form {
        public double flaeche() { return Math.PI * radius * radius; }
    }

    record Rechteck(double breite, double hoehe) implements Form {
        public double flaeche() { return breite * hoehe; }
    }

    record Dreieck(double grundseite, double hoehe) implements Form {
        public double flaeche() { return grundseite * hoehe / 2; }
    }

    public static void main(String[] args) {
        List<Form> formen = List.of(
            new Kreis(5),
            new Rechteck(4, 6),
            new Dreieck(3, 8)
        );

        for (Form f : formen) {
            // Pattern Matching mit instanceof (Java 16+)
            if (f instanceof Kreis k) {
                System.out.printf("Kreis (r=%.0f): Flaeche=%.2f%n", k.radius(), k.flaeche());
            } else if (f instanceof Rechteck r) {
                System.out.printf("Rechteck (%.0fx%.0f): Flaeche=%.2f%n", r.breite(), r.hoehe(), r.flaeche());
            } else if (f instanceof Dreieck d) {
                System.out.printf("Dreieck (g=%.0f,h=%.0f): Flaeche=%.2f%n", d.grundseite(), d.hoehe(), d.flaeche());
            }
        }
    }
}`,
      expectedOutput: 'Kreis (r=5): Flaeche=78.54\nRechteck (4x6): Flaeche=24.00\nDreieck (g=3,h=8): Flaeche=12.00',
      editable: true,
    },
  ],
  quiz: [
    { id: 'rec-q1', question: 'Was generiert ein Record automatisch?', options: ['Nur Konstruktor', 'Konstruktor, Getter, toString, equals, hashCode', 'Nur toString', 'Konstruktor und Setter'], correctIndex: 1, explanation: 'Records generieren automatisch: Konstruktor, Getter (ohne get-Präfix), toString(), equals() und hashCode().' },
    { id: 'rec-q2', question: 'Kann man von einem Record erben?', options: ['Ja, wie bei normalen Klassen', 'Nein, Records sind implizit final', 'Nur mit dem Keyword extends', 'Nur von anderen Records'], correctIndex: 1, explanation: 'Records sind implizit final und können nicht erweitert werden. Sie können aber Interfaces implementieren.' },
    { id: 'rec-q3', question: 'Was ist ein kompakter Konstruktor in einem Record?', options: ['Ein Konstruktor ohne Parameter', 'Ein Konstruktor, der die Parameter implizit hat und fuer Validierung genutzt wird', 'Ein privater Konstruktor', 'Ein Konstruktor mit varargs'], correctIndex: 1, explanation: 'Der kompakte Konstruktor laesst die Parameterliste weg (sie wird implizit uebernommen). Er wird typischerweise fuer Validierung verwendet: Record { if (x < 0) throw new IllegalArgumentException(); }' },
  ],
  exercises: [],
  keyConceptsDE: ['record', 'Kompakter Konstruktor', 'Unveränderlichkeit', 'Wertesemantik', 'DTO'],
  transferKnowledge: 'Ähnliche Konzepte: Kotlin data class, Python @dataclass, C# record. Unveränderliche Datenklassen sind ein modernes Pattern.',
  order: 37,
};
