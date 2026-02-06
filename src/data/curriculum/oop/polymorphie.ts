import type { Topic } from '../../../types';

export const polymorphie: Topic = {
  id: 'polymorphie',
  moduleId: 'oop',
  title: 'Polymorphie',
  description: 'Dynamisches Binden, Ueberschreiben vs Ueberladen, instanceof, Typ-Casting, Liskovsches Substitutionsprinzip.',
  content: `# Polymorphie (Vielgestaltigkeit)

Polymorphie bedeutet, dass ein Objekt **verschiedene Formen** annehmen kann. Eine Variable vom Typ der Superklasse kann auf ein Objekt einer Subklasse verweisen und das Verhalten der Subklasse ausfuehren.

## Dynamisches Binden (Late Binding)

Welche Methode tatsaechlich aufgerufen wird, entscheidet die **JVM zur Laufzeit** — basierend auf dem tatsaechlichen Typ des Objekts, nicht auf dem deklarierten Typ der Variablen.

## Ueberschreiben vs. Ueberladen

- **Ueberschreiben (Override)**: Subklasse definiert eine Methode **mit gleicher Signatur** wie die Superklasse neu → Polymorphie (Laufzeit)
- **Ueberladen (Overload)**: Methoden mit **gleichem Namen aber unterschiedlicher Parameterliste** in derselben Klasse → Kompilierzeit

## instanceof

Der **\`instanceof\`**-Operator prueft, ob ein Objekt eine Instanz einer bestimmten Klasse oder eines Interfaces ist. Seit Java 16 gibt es **Pattern Matching** fuer instanceof.

## Typ-Casting

- **Upcast** (automatisch): Subklasse → Superklasse (immer sicher)
- **Downcast** (explizit): Superklasse → Subklasse (kann ClassCastException ausloesen)

## Liskovsches Substitutionsprinzip (LSP)

Objekte einer Subklasse muessen ueberall dort einsetzbar sein, wo Objekte der Superklasse erwartet werden — **ohne dass sich das Programmverhalten aendert**.`,
  codeExamples: [
    {
      title: 'Dynamisches Binden',
      description: 'Die JVM entscheidet zur Laufzeit, welche ueberschriebene Methode aufgerufen wird.',
      code: `class Instrument {
    public String name() { return "Instrument"; }

    public void spielen() {
        System.out.println(name() + " spielt einen Ton.");
    }
}

class Klavier extends Instrument {
    @Override
    public String name() { return "Klavier"; }

    @Override
    public void spielen() {
        System.out.println(name() + " spielt eine Melodie auf den Tasten.");
    }
}

class Gitarre extends Instrument {
    @Override
    public String name() { return "Gitarre"; }

    @Override
    public void spielen() {
        System.out.println(name() + " zupft an den Saiten.");
    }
}

class Schlagzeug extends Instrument {
    @Override
    public String name() { return "Schlagzeug"; }

    @Override
    public void spielen() {
        System.out.println(name() + " gibt den Rhythmus vor.");
    }
}

public class PolymorphieDemo {
    // Methode akzeptiert den Supertyp
    static void konzert(Instrument[] band) {
        for (Instrument i : band) {
            i.spielen(); // Dynamisches Binden!
        }
    }

    public static void main(String[] args) {
        Instrument[] band = {
            new Klavier(),
            new Gitarre(),
            new Schlagzeug()
        };

        System.out.println("=== Konzert beginnt ===");
        konzert(band);
    }
}`,
      expectedOutput: `=== Konzert beginnt ===
Klavier spielt eine Melodie auf den Tasten.
Gitarre zupft an den Saiten.
Schlagzeug gibt den Rhythmus vor.`,
      editable: true,
    },
    {
      title: 'instanceof und Pattern Matching (Java 16+)',
      description: 'Typpruefung und sicheres Downcasting mit instanceof und dem modernen Pattern Matching.',
      code: `class Tier {
    String name;
    Tier(String name) { this.name = name; }
}

class Katze extends Tier {
    Katze(String name) { super(name); }
    void schnurren() { System.out.println(name + " schnurrt..."); }
}

class Hund extends Tier {
    Hund(String name) { super(name); }
    void bellen() { System.out.println(name + " bellt: Wuff!"); }
}

class Papagei extends Tier {
    Papagei(String name) { super(name); }
    void sprechen() { System.out.println(name + " sagt: Hallo!"); }
}

public class InstanceofDemo {
    static void tierAktion(Tier tier) {
        // Pattern Matching fuer instanceof (Java 16+)
        if (tier instanceof Katze k) {
            k.schnurren();
        } else if (tier instanceof Hund h) {
            h.bellen();
        } else if (tier instanceof Papagei p) {
            p.sprechen();
        } else {
            System.out.println(tier.name + " macht nichts Besonderes.");
        }
    }

    public static void main(String[] args) {
        Tier[] tiere = {
            new Katze("Minka"),
            new Hund("Rex"),
            new Papagei("Koko"),
            new Katze("Luna")
        };

        for (Tier t : tiere) {
            System.out.print(t.name + ": ");
            tierAktion(t);
        }
    }
}`,
      expectedOutput: `Minka: Minka schnurrt...
Rex: Rex bellt: Wuff!
Koko: Koko sagt: Hallo!
Luna: Luna schnurrt...`,
      editable: true,
    },
    {
      title: 'Upcasting und Downcasting',
      description: 'Automatisches Upcasting und explizites Downcasting mit Sicherheitspruefung.',
      code: `class Fahrzeug {
    void fahren() {
        System.out.println("Fahrzeug faehrt.");
    }
}

class Sportwagen extends Fahrzeug {
    @Override
    void fahren() {
        System.out.println("Sportwagen rast mit 300 km/h!");
    }

    void turboAktivieren() {
        System.out.println("TURBO aktiviert!");
    }
}

class LKW extends Fahrzeug {
    @Override
    void fahren() {
        System.out.println("LKW faehrt schwer beladen.");
    }

    void ladungInfo() {
        System.out.println("Ladung: 20 Tonnen");
    }
}

public class CastingDemo {
    public static void main(String[] args) {
        // Upcast (automatisch): Subklasse -> Superklasse
        Fahrzeug f1 = new Sportwagen(); // Upcast
        Fahrzeug f2 = new LKW();        // Upcast

        f1.fahren(); // Dynamisches Binden -> Sportwagen.fahren()
        f2.fahren(); // Dynamisches Binden -> LKW.fahren()

        // f1.turboAktivieren(); // FEHLER! Fahrzeug kennt turboAktivieren() nicht

        // Downcast (explizit): Superklasse -> Subklasse
        if (f1 instanceof Sportwagen sw) {
            sw.turboAktivieren(); // Sicher!
        }

        if (f2 instanceof LKW lkw) {
            lkw.ladungInfo(); // Sicher!
        }

        // Unsicherer Downcast wuerde ClassCastException ausloesen:
        try {
            LKW falsch = (LKW) f1; // f1 ist ein Sportwagen!
        } catch (ClassCastException e) {
            System.out.println("ClassCastException: Sportwagen ist kein LKW!");
        }
    }
}`,
      expectedOutput: `Sportwagen rast mit 300 km/h!
LKW faehrt schwer beladen.
TURBO aktiviert!
Ladung: 20 Tonnen
ClassCastException: Sportwagen ist kein LKW!`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'polymorphie-q1',
      question: 'Was ist dynamisches Binden (Late Binding)?',
      options: [
        'Der Compiler entscheidet, welche Methode aufgerufen wird',
        'Die JVM entscheidet zur Laufzeit basierend auf dem tatsaechlichen Objekttyp, welche Methode aufgerufen wird',
        'Methoden werden zur Kompilierzeit verknuepft',
        'Variablen werden dynamisch an Typen gebunden',
      ],
      correctIndex: 1,
      explanation: 'Beim dynamischen Binden wird erst zur Laufzeit entschieden, welche ueberschriebene Methode aufgerufen wird. Die JVM schaut auf den tatsaechlichen Typ des Objekts (nicht den deklarierten Typ der Variablen) und ruft die entsprechende Methode auf.',
    },
    {
      id: 'polymorphie-q2',
      question: 'Was ist das Liskovsche Substitutionsprinzip (LSP)?',
      options: [
        'Jede Klasse muss von Object erben',
        'Objekte einer Subklasse muessen ueberall einsetzbar sein, wo die Superklasse erwartet wird',
        'Jede Methode muss ueberschrieben werden',
        'Nur abstrakte Klassen duerfen Subklassen haben',
      ],
      correctIndex: 1,
      explanation: 'Das LSP besagt, dass ein Programm korrekt funktionieren muss, wenn Objekte der Superklasse durch Objekte der Subklasse ersetzt werden. Eine Subklasse darf die Erwartungen an die Superklasse nicht verletzen.',
    },
    {
      id: 'polymorphie-q3',
      question: 'Was passiert bei einem ungültigen Downcast, z.B. `Hund h = (Hund) einObjektDasEineKatzeIst;`?',
      options: [
        'Der Compiler meldet einen Fehler',
        'Das Objekt wird automatisch in einen Hund umgewandelt',
        'Es wird zur Laufzeit eine ClassCastException geworfen',
        'Die Variable wird auf null gesetzt',
      ],
      correctIndex: 2,
      explanation: 'Ein falscher Downcast kompiliert ohne Fehler, fuehrt aber zur Laufzeit zu einer ClassCastException. Deshalb sollte man vor einem Downcast immer mit `instanceof` pruefen, ob das Objekt tatsaechlich vom gewuenschten Typ ist. Seit Java 16 kann man Pattern Matching verwenden: `if (obj instanceof Hund h) { ... }`.',
    },
  ],
  exercises: ['polymorphism-01', 'polymorphism-02'],
  keyConceptsDE: [
    'Polymorphie: Ein Objekt kann verschiedene Formen annehmen',
    'Dynamisches Binden: Methodenaufruf wird zur Laufzeit aufgeloest',
    'Ueberschreiben (Runtime) vs. Ueberladen (Compiletime)',
    'instanceof prueft den Typ eines Objekts',
    'Upcast (automatisch) vs. Downcast (explizit, mit instanceof pruefen)',
    'LSP: Subklassen muessen die Superklasse korrekt ersetzen koennen',
  ],
  transferKnowledge: 'Polymorphie macht Code flexibel und erweiterbar. Dieses Prinzip ist das Herzschlag jeder gut designten OOP-Anwendung und gilt fuer alle OOP-Sprachen. In dynamisch typisierten Sprachen wie Python existiert Polymorphie natuerlich durch Duck Typing.',
  order: 23,
};
