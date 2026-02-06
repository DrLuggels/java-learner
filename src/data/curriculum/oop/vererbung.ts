import type { Topic } from '../../../types';

export const vererbung: Topic = {
  id: 'vererbung',
  moduleId: 'oop',
  title: 'Vererbung',
  description: 'extends, super, Konstruktorkette, Methodenueberschreibung, @Override, protected.',
  content: `# Vererbung (Inheritance)

Vererbung ermoeglicht es, eine neue Klasse auf Basis einer bestehenden Klasse zu erstellen. Die neue Klasse **erbt** alle Attribute und Methoden der Elternklasse.

## Grundlagen

- **\`extends\`**: Schluesselwort, um von einer Klasse zu erben
- **Elternklasse** (Superklasse): Die Klasse, von der geerbt wird
- **Kindklasse** (Subklasse): Die Klasse, die erbt
- Java unterstuetzt nur **Einfachvererbung**: Eine Klasse kann nur von EINER Klasse erben

## super

- **\`super()\`**: Ruft den Konstruktor der Elternklasse auf (muss erste Anweisung im Konstruktor sein)
- **\`super.methode()\`**: Ruft eine Methode der Elternklasse auf

## Konstruktorkette

Wenn ein Objekt einer Subklasse erstellt wird, wird **immer zuerst** der Konstruktor der Superklasse aufgerufen. Wenn kein expliziter \`super()\`-Aufruf vorhanden ist, ruft Java automatisch den parameterlosen Konstruktor der Elternklasse auf.

## Methodenueberschreibung (Override)

Eine Subklasse kann eine Methode der Superklasse **ueberschreiben**, um eigenes Verhalten zu definieren. Die Annotation **\`@Override\`** sollte immer verwendet werden — sie sorgt fuer Compiler-Pruefung.

## protected

Der Zugriffsmodifikator \`protected\` erlaubt Zugriff innerhalb der eigenen Klasse, im selben Paket und in **Subklassen** (auch in anderen Paketen).`,
  codeExamples: [
    {
      title: 'Vererbung und Konstruktorkette',
      description: 'Grundlegende Vererbung mit extends, super und der Konstruktorkette.',
      code: `class Tier {
    protected String name;
    protected int alter;

    public Tier(String name, int alter) {
        this.name = name;
        this.alter = alter;
        System.out.println("Tier-Konstruktor: " + name);
    }

    public void vorstellen() {
        System.out.println("Ich bin " + name + ", " + alter + " Jahre alt.");
    }
}

class Hund extends Tier {
    private String rasse;

    public Hund(String name, int alter, String rasse) {
        super(name, alter); // Elternkonstruktor aufrufen (muss erste Zeile sein!)
        this.rasse = rasse;
        System.out.println("Hund-Konstruktor: " + rasse);
    }

    public void bellen() {
        System.out.println(name + " bellt: Wuff wuff!");
    }
}

class Welpe extends Hund {
    public Welpe(String name, String rasse) {
        super(name, 0, rasse); // Welpen sind 0 Jahre alt
        System.out.println("Welpe-Konstruktor");
    }
}

public class VererbungDemo {
    public static void main(String[] args) {
        System.out.println("=== Konstruktorkette ===");
        Welpe w = new Welpe("Buddy", "Labrador");
        System.out.println();
        w.vorstellen(); // geerbt von Tier
        w.bellen();     // geerbt von Hund
    }
}`,
      expectedOutput: `=== Konstruktorkette ===
Tier-Konstruktor: Buddy
Hund-Konstruktor: Labrador
Welpe-Konstruktor

Ich bin Buddy, 0 Jahre alt.
Buddy bellt: Wuff wuff!`,
      editable: true,
    },
    {
      title: 'Methodenueberschreibung mit @Override',
      description: 'Subklassen ueberschreiben Methoden der Superklasse fuer eigenes Verhalten.',
      code: `class Form {
    protected String farbe;

    public Form(String farbe) {
        this.farbe = farbe;
    }

    public double flaeche() {
        return 0; // Standardimplementierung
    }

    public void beschreiben() {
        System.out.printf("%s (Farbe: %s, Flaeche: %.2f)%n",
            getClass().getSimpleName(), farbe, flaeche());
    }
}

class Kreis extends Form {
    private double radius;

    public Kreis(String farbe, double radius) {
        super(farbe);
        this.radius = radius;
    }

    @Override
    public double flaeche() {
        return Math.PI * radius * radius;
    }
}

class Rechteck extends Form {
    private double breite, hoehe;

    public Rechteck(String farbe, double breite, double hoehe) {
        super(farbe);
        this.breite = breite;
        this.hoehe = hoehe;
    }

    @Override
    public double flaeche() {
        return breite * hoehe;
    }
}

public class OverrideDemo {
    public static void main(String[] args) {
        Form[] formen = {
            new Kreis("Rot", 5),
            new Rechteck("Blau", 4, 6),
            new Kreis("Gruen", 3)
        };

        for (Form f : formen) {
            f.beschreiben();
        }
    }
}`,
      expectedOutput: `Kreis (Farbe: Rot, Flaeche: 78.54)
Rechteck (Farbe: Blau, Flaeche: 24.00)
Kreis (Farbe: Gruen, Flaeche: 28.27)`,
      editable: true,
    },
    {
      title: 'super-Aufruf in ueberschriebenen Methoden',
      description: 'Mit super.methode() kann man die Implementierung der Elternklasse aufrufen und erweitern.',
      code: `class Mitarbeiter {
    protected String name;
    protected double gehalt;

    public Mitarbeiter(String name, double gehalt) {
        this.name = name;
        this.gehalt = gehalt;
    }

    public void info() {
        System.out.println("Name: " + name);
        System.out.println("Gehalt: " + gehalt + " EUR");
    }
}

class Manager extends Mitarbeiter {
    private double bonus;

    public Manager(String name, double gehalt, double bonus) {
        super(name, gehalt);
        this.bonus = bonus;
    }

    @Override
    public void info() {
        super.info(); // Erst die Eltern-Implementierung aufrufen
        System.out.println("Bonus: " + bonus + " EUR");
        System.out.println("Gesamt: " + (gehalt + bonus) + " EUR");
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        Mitarbeiter m = new Mitarbeiter("Anna", 3500);
        Manager mgr = new Manager("Klaus", 5000, 2000);

        System.out.println("=== Mitarbeiter ===");
        m.info();
        System.out.println();
        System.out.println("=== Manager ===");
        mgr.info();
    }
}`,
      expectedOutput: `=== Mitarbeiter ===
Name: Anna
Gehalt: 3500.0 EUR

=== Manager ===
Name: Klaus
Gehalt: 5000.0 EUR
Bonus: 2000.0 EUR
Gesamt: 7000.0 EUR`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'vererbung-q1',
      question: 'Was passiert, wenn eine Subklasse keinen expliziten super()-Aufruf im Konstruktor hat?',
      options: [
        'Der Code kompiliert nicht',
        'Java ruft automatisch den parameterlosen Konstruktor der Elternklasse auf',
        'Die Elternklasse wird nicht initialisiert',
        'Es wird eine NullPointerException ausgeloest',
      ],
      correctIndex: 1,
      explanation: 'Java fuegt automatisch einen Aufruf von super() (ohne Parameter) als erste Anweisung im Konstruktor ein, wenn kein expliziter super()-Aufruf vorhanden ist. Wenn die Elternklasse keinen parameterlosen Konstruktor hat, fuehrt das zu einem Kompilierfehler.',
    },
    {
      id: 'vererbung-q2',
      question: 'Welche Aussage ueber @Override ist korrekt?',
      options: [
        '@Override ist zwingend erforderlich, um eine Methode zu ueberschreiben',
        '@Override ist optional, hilft aber dem Compiler zu pruefen, ob tatsaechlich eine Methode ueberschrieben wird',
        '@Override verhindert, dass eine Methode ueberschrieben wird',
        '@Override kann nur bei abstrakten Methoden verwendet werden',
      ],
      correctIndex: 1,
      explanation: '@Override ist eine optionale Annotation, die den Compiler anweist zu pruefen, ob die Methode tatsaechlich eine Methode der Elternklasse ueberschreibt. Ohne @Override wuerde ein Tippfehler im Methodennamen unbemerkt eine neue Methode erstellen statt zu ueberschreiben.',
    },
    {
      id: 'vererbung-q3',
      question: 'Welchen Zugriffsmodifikator sollte man fuer Attribute verwenden, die in Subklassen sichtbar, aber ausserhalb der Vererbungshierarchie verborgen sein sollen?',
      options: [
        'private',
        'public',
        'protected',
        'default (kein Modifikator)',
      ],
      correctIndex: 2,
      explanation: 'Der Modifikator `protected` erlaubt Zugriff innerhalb der eigenen Klasse, im selben Paket und in allen Subklassen (auch in anderen Paketen). Er bietet damit einen Mittelweg zwischen `private` (nur eigene Klasse) und `public` (ueberall sichtbar).',
    },
  ],
  exercises: ['oo-05'],
  keyConceptsDE: [
    'extends erstellt eine Kindklasse, die von einer Elternklasse erbt',
    'super() ruft den Konstruktor der Elternklasse auf',
    'Java unterstuetzt nur Einfachvererbung (eine Klasse, ein extends)',
    '@Override kennzeichnet ueberschriebene Methoden',
    'protected erlaubt Zugriff in Subklassen und im selben Paket',
    'Konstruktorkette: Elternkonstruktor wird immer zuerst aufgerufen',
  ],
  transferKnowledge: 'Vererbung ist ein Kernkonzept der OOP und existiert in allen objektorientierten Sprachen. Python und C++ erlauben sogar Mehrfachvererbung. C# und Kotlin nutzen ebenfalls extends/super-aehnliche Mechanismen. Das Verstaendnis von Vererbung ist universell uebertragbar.',
  order: 22,
};
