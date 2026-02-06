import type { Topic } from '../../../types';

export const klassendiagramme: Topic = {
  id: 'klassendiagramme',
  moduleId: 'fortgeschritten',
  title: 'UML-Klassendiagramme',
  description: 'Lerne die UML-Notation fuer Klassen, Beziehungen (Assoziation, Aggregation, Komposition, Vererbung) und Multiplizitaeten.',
  content: `
## UML-Klassendiagramme

**UML** (Unified Modeling Language) ist eine standardisierte Notation zur Visualisierung
von Software-Designs. **Klassendiagramme** zeigen die Struktur eines Systems.

### Aufbau einer Klasse im UML

Eine Klasse wird als Rechteck mit drei Bereichen dargestellt:
1. **Klassenname** (oben, fett)
2. **Attribute** (Mitte) -- mit Sichtbarkeit und Typ
3. **Methoden** (unten) -- mit Sichtbarkeit, Parametern und Rueckgabetyp

### Sichtbarkeitsmodifikatoren

- \`+\` public, \`-\` private, \`#\` protected, \`~\` package-private

### Beziehungstypen

- **Assoziation** (durchgezogene Linie): Klassen kennen sich gegenseitig
- **Aggregation** (leere Raute): "hat ein" -- Teil kann ohne Ganzes existieren
- **Komposition** (volle Raute): "besteht aus" -- Teil existiert nicht ohne Ganzes
- **Vererbung** (leerer Pfeil): "ist ein" -- Unterklasse erbt von Oberklasse
- **Implementierung** (gestrichelter Pfeil): Klasse implementiert Interface

### Multiplizitaeten

Multiplizitaeten geben an, wie viele Objekte an einer Beziehung beteiligt sind:
\`1\`, \`0..1\`, \`*\` (viele), \`1..*\` (mindestens eins), \`0..*\`
  `,
  codeExamples: [
    {
      title: 'Assoziation und Komposition in Java',
      description: 'UML-Beziehungen in Java-Code umgesetzt: Ein Auto besteht aus einem Motor (Komposition) und hat einen Fahrer (Assoziation).',
      code: `import java.util.ArrayList;
import java.util.List;

// Komposition: Motor existiert nicht ohne Auto
class Motor {
    private int ps;
    private String typ;

    public Motor(int ps, String typ) {
        this.ps = ps;
        this.typ = typ;
    }

    @Override
    public String toString() {
        return typ + " (" + ps + " PS)";
    }
}

// Assoziation: Fahrer existiert unabhaengig vom Auto
class Fahrer {
    private String name;

    public Fahrer(String name) {
        this.name = name;
    }

    public String getName() { return name; }
}

// Auto hat Komposition zu Motor, Assoziation zu Fahrer
class Auto {
    private String marke;
    private Motor motor;         // Komposition (1:1)
    private Fahrer fahrer;       // Assoziation (0..1)

    public Auto(String marke, int ps, String motorTyp) {
        this.marke = marke;
        this.motor = new Motor(ps, motorTyp);  // Motor wird im Auto erstellt
    }

    public void setFahrer(Fahrer fahrer) {
        this.fahrer = fahrer;
    }

    public void info() {
        System.out.println("Auto: " + marke + ", Motor: " + motor);
        if (fahrer != null) {
            System.out.println("  Fahrer: " + fahrer.getName());
        } else {
            System.out.println("  Kein Fahrer zugewiesen");
        }
    }
}

public class KlassendiagrammBeispiel {
    public static void main(String[] args) {
        Auto bmw = new Auto("BMW", 200, "V6");
        bmw.info();

        Fahrer anna = new Fahrer("Anna");
        bmw.setFahrer(anna);
        bmw.info();
    }
}`,
      expectedOutput: `Auto: BMW, Motor: V6 (200 PS)
  Kein Fahrer zugewiesen
Auto: BMW, Motor: V6 (200 PS)
  Fahrer: Anna`,
      editable: true,
    },
    {
      title: 'Vererbung und Aggregation',
      description: 'Vererbung (ist-ein) und Aggregation (hat-ein, Teil lebt weiter) in Java.',
      code: `import java.util.ArrayList;
import java.util.List;

// Vererbung: Tier ist die Basisklasse
abstract class Tier {
    protected String name;

    public Tier(String name) {
        this.name = name;
    }

    public abstract String laut();

    @Override
    public String toString() {
        return name + " sagt: " + laut();
    }
}

class Hund extends Tier {
    public Hund(String name) { super(name); }
    public String laut() { return "Wuff!"; }
}

class Katze extends Tier {
    public Katze(String name) { super(name); }
    public String laut() { return "Miau!"; }
}

// Aggregation: Zoo hat Tiere, aber Tiere koennen ohne Zoo existieren
class Zoo {
    private String name;
    private List<Tier> tiere = new ArrayList<>();  // Aggregation (0..*)

    public Zoo(String name) {
        this.name = name;
    }

    public void tierHinzufuegen(Tier tier) {
        tiere.add(tier);
    }

    public void alleZeigen() {
        System.out.println("=== " + name + " ===");
        System.out.println("Anzahl Tiere: " + tiere.size());
        for (Tier t : tiere) {
            System.out.println("  " + t);
        }
    }
}

public class VererbungBeispiel {
    public static void main(String[] args) {
        Hund rex = new Hund("Rex");
        Katze mimi = new Katze("Mimi");
        Hund buddy = new Hund("Buddy");

        Zoo zoo = new Zoo("Stadtzoo");
        zoo.tierHinzufuegen(rex);
        zoo.tierHinzufuegen(mimi);
        zoo.tierHinzufuegen(buddy);
        zoo.alleZeigen();
    }
}`,
      expectedOutput: `=== Stadtzoo ===
Anzahl Tiere: 3
  Rex sagt: Wuff!
  Mimi sagt: Miau!
  Buddy sagt: Wuff!`,
      editable: true,
    },
    {
      title: 'Interface-Implementierung und Multiplizitaeten',
      description: 'Ein Interface wird implementiert und Multiplizitaeten werden als Code umgesetzt.',
      code: `import java.util.ArrayList;
import java.util.List;

// Interface (wird mit gestricheltem Pfeil dargestellt)
interface Bezahlbar {
    double getPreis();
    String getBeschreibung();
}

// Implementierung: Klasse -> Interface
class Produkt implements Bezahlbar {
    private String name;
    private double preis;

    public Produkt(String name, double preis) {
        this.name = name;
        this.preis = preis;
    }

    public double getPreis() { return preis; }
    public String getBeschreibung() { return name + " (" + preis + " EUR)"; }
}

// Multiplizitaet: Warenkorb hat 0..* Produkte
class Warenkorb {
    private List<Bezahlbar> artikel = new ArrayList<>(); // 0..*

    public void hinzufuegen(Bezahlbar artikel) {
        this.artikel.add(artikel);
    }

    public double getGesamt() {
        return artikel.stream().mapToDouble(Bezahlbar::getPreis).sum();
    }

    public void anzeigen() {
        System.out.println("Warenkorb (" + artikel.size() + " Artikel):");
        for (Bezahlbar b : artikel) {
            System.out.println("  - " + b.getBeschreibung());
        }
        System.out.printf("  Gesamt: %.2f EUR%n", getGesamt());
    }
}

public class InterfaceBeispiel {
    public static void main(String[] args) {
        Warenkorb korb = new Warenkorb();
        korb.hinzufuegen(new Produkt("Java-Buch", 39.99));
        korb.hinzufuegen(new Produkt("USB-Kabel", 9.99));
        korb.hinzufuegen(new Produkt("Laptop-Staender", 29.99));
        korb.anzeigen();
    }
}`,
      expectedOutput: `Warenkorb (3 Artikel):
  - Java-Buch (39.99 EUR)
  - USB-Kabel (9.99 EUR)
  - Laptop-Staender (29.99 EUR)
  Gesamt: 79.97 EUR`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'klassendiagramme-q1',
      question: 'Was ist der Unterschied zwischen Aggregation und Komposition?',
      options: [
        'Es gibt keinen Unterschied',
        'Bei Aggregation kann der Teil ohne das Ganze existieren, bei Komposition nicht',
        'Aggregation ist fuer Vererbung, Komposition fuer Interfaces',
        'Aggregation nutzt Pfeile, Komposition nutzt Linien',
      ],
      correctIndex: 1,
      explanation: 'Bei der Aggregation (leere Raute) kann der Teil unabhaengig existieren (z. B. Spieler in einem Team). Bei der Komposition (volle Raute) existiert der Teil nicht ohne das Ganze (z. B. Motor ohne Auto).',
    },
    {
      id: 'klassendiagramme-q2',
      question: 'Was bedeutet die UML-Multiplizitaet "0..*"?',
      options: [
        'Genau null Objekte',
        'Genau ein Objekt',
        'Null bis beliebig viele Objekte',
        'Mindestens ein Objekt',
      ],
      correctIndex: 2,
      explanation: '"0..*" bedeutet, dass null bis beliebig viele Objekte an der Beziehung beteiligt sein koennen. "1..*" wuerde mindestens eins bedeuten.',
    },
    {
      id: 'klassendiagramme-q3',
      question: 'Welches UML-Symbol steht fuer "private" Sichtbarkeit?',
      options: ['+ (Plus)', '- (Minus)', '# (Raute)', '~ (Tilde)'],
      correctIndex: 1,
      explanation: 'In UML steht "-" fuer private, "+" fuer public, "#" fuer protected und "~" fuer package-private. Die Sichtbarkeit wird vor dem Attribut- oder Methodennamen geschrieben.',
    },
  ],
  exercises: ['class-diagrams-01'],
  keyConceptsDE: [
    'UML-Klassendiagramme zeigen Klassen mit Attributen, Methoden und Sichtbarkeiten',
    'Assoziation = "kennt", Aggregation = "hat" (Teil lebt weiter), Komposition = "besteht aus" (Teil stirbt mit)',
    'Vererbung wird mit leerem Pfeil, Implementierung mit gestricheltem Pfeil dargestellt',
    'Multiplizitaeten geben an, wie viele Objekte beteiligt sind (1, 0..1, 0..*)',
  ],
  transferKnowledge: 'UML ist nicht Java-spezifisch, sondern ein universeller Standard fuer Software-Design. Klassendiagramme werden in jedem groesseren Softwareprojekt verwendet, unabhaengig von der Programmiersprache.',
  order: 33,
};
