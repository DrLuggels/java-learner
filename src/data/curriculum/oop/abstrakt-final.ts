import type { Topic } from '../../../types';

export const abstraktFinal: Topic = {
  id: 'abstrakt-final',
  moduleId: 'oop',
  title: 'Abstract und Final',
  description: 'abstract class, abstract method, final class, final method, final variable.',
  content: `# Abstract und Final

Java bietet mit \`abstract\` und \`final\` zwei gegensaetzliche Schluesselwoerter: eines **erzwingt** Erweiterung, das andere **verhindert** sie.

## abstract

### Abstrakte Klassen
- Koennen **nicht instanziiert** werden (kein \`new\`)
- Koennen abstrakte **und** konkrete Methoden enthalten
- Dienen als **Basis** fuer Subklassen
- Eine Subklasse **muss alle abstrakten Methoden implementieren** (oder selbst abstrakt sein)

### Abstrakte Methoden
- Haben **keinen Methodenkoerper** (nur Signatur)
- Koennen nur in **abstrakten Klassen** definiert werden
- Erzwingen, dass Subklassen eine **eigene Implementierung** bereitstellen

## final

### final Klasse
- Kann **nicht erweitert** (vererbt) werden
- Beispiel: \`String\`, \`Integer\`, \`Math\`

### final Methode
- Kann in Subklassen **nicht ueberschrieben** werden
- Schuetzt kritische Logik vor Veraenderung

### final Variable
- Kann nach der **Initialisierung nicht mehr geaendert** werden
- Bei Referenztypen: Die Referenz ist unveraenderlich, **nicht das Objekt selbst**
- \`final\`-Attribute muessen im Konstruktor oder bei der Deklaration initialisiert werden`,
  codeExamples: [
    {
      title: 'Abstrakte Klassen und Methoden',
      description: 'Abstrakte Klassen definieren eine gemeinsame Schnittstelle, die Subklassen implementieren muessen.',
      code: `abstract class Geometrie {
    protected String name;

    public Geometrie(String name) {
        this.name = name;
    }

    // Abstrakte Methoden: MUESSEN ueberschrieben werden
    public abstract double flaeche();
    public abstract double umfang();

    // Konkrete Methode: wird vererbt
    public void ausgabe() {
        System.out.printf("%s: Flaeche=%.2f, Umfang=%.2f%n",
            name, flaeche(), umfang());
    }
}

class Kreis extends Geometrie {
    private double radius;

    public Kreis(double radius) {
        super("Kreis(r=" + radius + ")");
        this.radius = radius;
    }

    @Override
    public double flaeche() {
        return Math.PI * radius * radius;
    }

    @Override
    public double umfang() {
        return 2 * Math.PI * radius;
    }
}

class Rechteck extends Geometrie {
    private double breite, hoehe;

    public Rechteck(double breite, double hoehe) {
        super("Rechteck(" + breite + "x" + hoehe + ")");
        this.breite = breite;
        this.hoehe = hoehe;
    }

    @Override
    public double flaeche() {
        return breite * hoehe;
    }

    @Override
    public double umfang() {
        return 2 * (breite + hoehe);
    }
}

public class AbstractDemo {
    public static void main(String[] args) {
        // Geometrie g = new Geometrie("Test"); // FEHLER: abstrakt!

        Geometrie[] formen = {
            new Kreis(5),
            new Rechteck(4, 6),
            new Kreis(3)
        };

        for (Geometrie g : formen) {
            g.ausgabe();
        }
    }
}`,
      expectedOutput: `Kreis(r=5.0): Flaeche=78.54, Umfang=31.42
Rechteck(4.0x6.0): Flaeche=24.00, Umfang=20.00
Kreis(r=3.0): Flaeche=28.27, Umfang=18.85`,
      editable: true,
    },
    {
      title: 'final: Klasse, Methode, Variable',
      description: 'final verhindert Vererbung, Ueberschreibung oder Wertaenderung.',
      code: `class Basis {
    // final Methode: kann NICHT ueberschrieben werden
    public final String getId() {
        return "BASIS-001";
    }

    public String beschreibung() {
        return "Ich bin die Basis.";
    }
}

class Abgeleitet extends Basis {
    // getId() kann hier NICHT ueberschrieben werden!
    // @Override public final String getId() { ... } // FEHLER!

    @Override
    public String beschreibung() {
        return "Ich bin abgeleitet.";
    }
}

// final class: kann NICHT erweitert werden
final class Konstanten {
    public static final double PI = 3.14159265358979;
    public static final int MAX_VERSUCHE = 3;
    public static final String APP_NAME = "Java Learner";
}

// class SubKonstanten extends Konstanten { } // FEHLER: final class!

public class FinalDemo {
    public static void main(String[] args) {
        // final Variable
        final int maxWert = 100;
        // maxWert = 200; // FEHLER: final Variable!
        System.out.println("maxWert: " + maxWert);

        // final bei Referenztypen: Referenz unveraenderlich, Objekt nicht
        final int[] zahlen = {1, 2, 3};
        zahlen[0] = 99; // OK! Das Objekt darf veraendert werden
        // zahlen = new int[]{4, 5, 6}; // FEHLER: Referenz ist final!
        System.out.println("zahlen[0]: " + zahlen[0]);

        Abgeleitet a = new Abgeleitet();
        System.out.println("getId: " + a.getId());       // Von Basis geerbt (final)
        System.out.println("beschreibung: " + a.beschreibung()); // Ueberschrieben

        // final Klasse nutzen
        System.out.println("App: " + Konstanten.APP_NAME);
        System.out.println("PI: " + Konstanten.PI);
    }
}`,
      expectedOutput: `maxWert: 100
zahlen[0]: 99
getId: BASIS-001
beschreibung: Ich bin abgeleitet.
App: Java Learner
PI: 3.14159265358979`,
      editable: true,
    },
    {
      title: 'abstract vs. final im Vergleich',
      description: 'Template-Method-Pattern: abstrakte Klasse mit finaler Schablone und abstrakten Schritten.',
      code: `abstract class Bericht {
    // Template-Methode: final -> Ablauf unveraenderlich
    public final void erstellen() {
        kopfzeile();
        inhalt();     // abstrakt - Subklasse bestimmt
        fusszeile();
    }

    private void kopfzeile() {
        System.out.println("========== BERICHT ==========");
    }

    // Abstrakte Methode: Subklasse MUSS implementieren
    protected abstract void inhalt();

    private void fusszeile() {
        System.out.println("============================");
        System.out.println();
    }
}

class Verkaufsbericht extends Bericht {
    @Override
    protected void inhalt() {
        System.out.println("Verkaeufe Januar: 15.000 EUR");
        System.out.println("Verkaeufe Februar: 18.500 EUR");
        System.out.println("Trend: steigend");
    }
}

class Fehlerbericht extends Bericht {
    @Override
    protected void inhalt() {
        System.out.println("Offene Fehler: 12");
        System.out.println("Behoben diese Woche: 5");
        System.out.println("Kritisch: 2");
    }
}

public class TemplateDemo {
    public static void main(String[] args) {
        Bericht[] berichte = {
            new Verkaufsbericht(),
            new Fehlerbericht()
        };

        for (Bericht b : berichte) {
            b.erstellen(); // Template Method aufrufen
        }
    }
}`,
      expectedOutput: `========== BERICHT ==========
Verkaeufe Januar: 15.000 EUR
Verkaeufe Februar: 18.500 EUR
Trend: steigend
============================

========== BERICHT ==========
Offene Fehler: 12
Behoben diese Woche: 5
Kritisch: 2
============================
`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'abstrakt-final-q1',
      question: 'Was passiert, wenn eine Klasse eine abstrakte Methode hat, die Klasse aber nicht als abstract deklariert ist?',
      options: [
        'Der Code funktioniert normal',
        'Es entsteht ein Kompilierfehler - Klassen mit abstrakten Methoden muessen abstract sein',
        'Die Methode wird automatisch mit einem leeren Koerper implementiert',
        'Eine Warnung wird ausgegeben, aber der Code kompiliert',
      ],
      correctIndex: 1,
      explanation: 'Eine Klasse, die abstrakte Methoden enthaelt, MUSS als abstract deklariert werden. Ansonsten gibt der Compiler einen Fehler aus. Abstrakte Methoden haben keinen Koerper und muessen von Subklassen implementiert werden.',
    },
    {
      id: 'abstrakt-final-q2',
      question: 'Was bedeutet final bei einer Referenzvariable?',
      options: [
        'Das Objekt kann nicht mehr veraendert werden',
        'Die Referenz kann nicht mehr auf ein anderes Objekt zeigen, aber das Objekt selbst kann veraendert werden',
        'Die Variable wird automatisch null',
        'Die Variable wird zu einer Konstante und auf den Stack verschoben',
      ],
      correctIndex: 1,
      explanation: 'final bei einer Referenzvariable bedeutet, dass die Referenz selbst nicht mehr geaendert werden kann (kein erneutes Zuweisen). Das Objekt, auf das die Referenz zeigt, kann aber weiterhin veraendert werden (z.B. Attribute setzen, Array-Elemente aendern).',
    },
    {
      id: 'abstrakt-final-q3',
      question: 'Kann eine abstrakte Klasse einen Konstruktor haben?',
      options: [
        'Nein, abstrakte Klassen koennen keine Konstruktoren haben',
        'Ja, aber er kann nur von Subklassen ueber super() aufgerufen werden',
        'Ja, und er wird automatisch aufgerufen wenn die abstrakte Klasse instanziiert wird',
        'Nur wenn die Klasse keine abstrakten Methoden hat',
      ],
      correctIndex: 1,
      explanation: 'Abstrakte Klassen koennen Konstruktoren haben, obwohl sie selbst nicht instanziiert werden koennen. Der Konstruktor wird von Subklassen ueber `super()` aufgerufen, um den geerbten Teil des Objekts zu initialisieren. Das ist wichtig, wenn die abstrakte Klasse eigene Attribute hat.',
    },
  ],
  exercises: ['abstract-final-01'],
  keyConceptsDE: [
    'abstract class kann nicht instanziiert werden',
    'Abstrakte Methoden haben keinen Koerper und muessen implementiert werden',
    'final class kann nicht erweitert werden (z.B. String)',
    'final method kann nicht ueberschrieben werden',
    'final variable kann nach Initialisierung nicht neu zugewiesen werden',
    'Template Method Pattern kombiniert final und abstract sinnvoll',
  ],
  transferKnowledge: 'Abstraktion und Einschraenkung sind universelle Konzepte: C# hat abstract und sealed, Python nutzt abc.ABC und Konventionen, Kotlin hat abstract und open (Klassen sind standardmaessig final). Das Designprinzip, bestimmte Dinge zu erzwingen und andere einzuschraenken, ist sprachuebergreifend.',
  order: 25,
};
