import type { Topic } from '../../../types';

export const oopKonzepte: Topic = {
  id: 'oop-konzepte',
  moduleId: 'oop',
  title: 'OOP-Konzepte: Die 4 Saulen',
  description: 'Kapselung, Abstraktion, Vererbung und Polymorphie als Grundpfeiler der objektorientierten Programmierung.',
  content: `# Die 4 Saulen der objektorientierten Programmierung

Objektorientierte Programmierung (OOP) ist ein **Programmierparadigma**, bei dem Programme aus **Objekten** bestehen, die Daten und Verhalten kapseln.

## Warum OOP?

- **Modularitat**: Code wird in logische Einheiten (Klassen) aufgeteilt
- **Wiederverwendbarkeit**: Einmal geschriebener Code kann in verschiedenen Kontexten genutzt werden
- **Wartbarkeit**: Anderungen an einer Stelle wirken sich nicht auf das gesamte Programm aus
- **Realitatsnah**: Die reale Welt besteht aus Objekten mit Eigenschaften und Verhalten

## Die 4 Saulen

### 1. Kapselung (Encapsulation)
Daten (Attribute) und zugehorige Methoden werden in einer Klasse **gebundelt**. Der Zugriff wird uber **Zugriffsmodifikatoren** (\`private\`, \`public\`, \`protected\`) kontrolliert.

### 2. Abstraktion (Abstraction)
Nur die **wesentlichen Merkmale** eines Objekts werden modelliert. Implementierungsdetails werden **verborgen**. Der Benutzer einer Klasse muss nicht wissen, *wie* etwas intern funktioniert.

### 3. Vererbung (Inheritance)
Eine Klasse kann Eigenschaften und Methoden von einer **Elternklasse erben**. Das vermeidet Code-Duplizierung und bildet Hierarchien ab.

### 4. Polymorphie (Polymorphism)
Objekte verschiedener Klassen konnen uber die **gleiche Schnittstelle** angesprochen werden. Eine Methode kann sich je nach Objekttyp **unterschiedlich verhalten**.`,
  codeExamples: [
    {
      title: 'Kapselung in Aktion',
      description: 'Attribute werden mit private geschuetzt und nur ueber Getter/Setter zugaenglich gemacht.',
      code: `public class Bankkonto {
    // Kapselung: private Attribute
    private String inhaber;
    private double kontostand;

    public Bankkonto(String inhaber, double startguthaben) {
        this.inhaber = inhaber;
        this.kontostand = startguthaben;
    }

    // Kontrollierter Zugriff ueber Methoden
    public void einzahlen(double betrag) {
        if (betrag > 0) {
            kontostand += betrag;
            System.out.println(betrag + " EUR eingezahlt.");
        }
    }

    public void abheben(double betrag) {
        if (betrag > 0 && betrag <= kontostand) {
            kontostand -= betrag;
            System.out.println(betrag + " EUR abgehoben.");
        } else {
            System.out.println("Abhebung nicht moeglich!");
        }
    }

    public double getKontostand() {
        return kontostand;
    }

    public static void main(String[] args) {
        Bankkonto konto = new Bankkonto("Max Mustermann", 1000);
        konto.einzahlen(500);
        konto.abheben(200);
        System.out.println("Kontostand: " + konto.getKontostand() + " EUR");
    }
}`,
      expectedOutput: `500.0 EUR eingezahlt.
200.0 EUR abgehoben.
Kontostand: 1300.0 EUR`,
      editable: true,
    },
    {
      title: 'Die 4 Saulen im Ueberblick',
      description: 'Ein einfaches Beispiel, das alle vier OOP-Prinzipien demonstriert.',
      code: `// Abstraktion: Nur wesentliche Merkmale modellieren
abstract class Fahrzeug {
    private String marke; // Kapselung

    public Fahrzeug(String marke) {
        this.marke = marke;
    }

    public String getMarke() {
        return marke;
    }

    // Abstrakte Methode - Subklassen muessen implementieren
    public abstract void fahren();
}

// Vererbung: Auto erbt von Fahrzeug
class Auto extends Fahrzeug {
    public Auto(String marke) {
        super(marke);
    }

    // Polymorphie: eigene Implementierung
    @Override
    public void fahren() {
        System.out.println(getMarke() + " faehrt auf der Strasse.");
    }
}

class Motorrad extends Fahrzeug {
    public Motorrad(String marke) {
        super(marke);
    }

    @Override
    public void fahren() {
        System.out.println(getMarke() + " faehrt kurvenreich.");
    }
}

public class OopDemo {
    public static void main(String[] args) {
        // Polymorphie: Gleicher Typ, unterschiedliches Verhalten
        Fahrzeug[] fahrzeuge = {
            new Auto("BMW"),
            new Motorrad("Ducati"),
            new Auto("VW")
        };

        for (Fahrzeug f : fahrzeuge) {
            f.fahren(); // Dynamisches Binden
        }
    }
}`,
      expectedOutput: `BMW faehrt auf der Strasse.
Ducati faehrt kurvenreich.
VW faehrt auf der Strasse.`,
      editable: true,
    },
    {
      title: 'Abstraktion: Komplexitaet verbergen',
      description: 'Der Benutzer der Klasse muss nicht wissen, wie die interne Berechnung funktioniert.',
      code: `public class Taschenrechner {
    // Abstraktion: Einfache Schnittstelle, komplexe Logik verborgen
    public double berechneKreisflaeche(double radius) {
        return validiereUndBerechne(radius);
    }

    // Interne Implementierung ist verborgen
    private double validiereUndBerechne(double radius) {
        if (radius < 0) {
            throw new IllegalArgumentException("Radius darf nicht negativ sein!");
        }
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        Taschenrechner rechner = new Taschenrechner();

        // Der Benutzer ruft nur die einfache Methode auf
        double flaeche = rechner.berechneKreisflaeche(5.0);
        System.out.printf("Kreisflaeche (r=5): %.2f%n", flaeche);

        flaeche = rechner.berechneKreisflaeche(10.0);
        System.out.printf("Kreisflaeche (r=10): %.2f%n", flaeche);
    }
}`,
      expectedOutput: `Kreisflaeche (r=5): 78.54
Kreisflaeche (r=10): 314.16`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'oop-konzepte-q1',
      question: 'Welches OOP-Prinzip beschreibt das Verbergen von Implementierungsdetails und die Kontrolle des Zugriffs auf Attribute?',
      options: [
        'Polymorphie',
        'Vererbung',
        'Kapselung',
        'Abstraktion',
      ],
      correctIndex: 2,
      explanation: 'Kapselung (Encapsulation) bedeutet, dass Attribute als private deklariert und nur ueber kontrollierte Methoden (Getter/Setter) zugaenglich gemacht werden. So wird der interne Zustand eines Objekts geschuetzt.',
    },
    {
      id: 'oop-konzepte-q2',
      question: 'Was ermoeglicht Polymorphie in Java?',
      options: [
        'Das Erstellen von privaten Variablen',
        'Das Kopieren von Code zwischen Klassen',
        'Dass Objekte verschiedener Klassen ueber die gleiche Schnittstelle angesprochen werden koennen',
        'Das Kompilieren von Java-Code zu Bytecode',
      ],
      correctIndex: 2,
      explanation: 'Polymorphie erlaubt es, Objekte verschiedener Unterklassen ueber einen gemeinsamen Oberklassen-Typ anzusprechen. Die JVM entscheidet zur Laufzeit, welche konkrete Methode aufgerufen wird (dynamisches Binden).',
    },
  ],
  exercises: ['oo-01'],
  keyConceptsDE: [
    'OOP basiert auf vier Saulen: Kapselung, Abstraktion, Vererbung, Polymorphie',
    'Kapselung schuetzt Daten durch Zugriffsmodifikatoren',
    'Abstraktion verbirgt Implementierungsdetails',
    'Vererbung ermoeglicht Code-Wiederverwendung durch Hierarchien',
    'Polymorphie erlaubt einheitliche Schnittstellen fuer verschiedene Typen',
  ],
  transferKnowledge: 'Die vier OOP-Saulen gelten universell fuer alle objektorientierten Sprachen: Java, C#, Python, C++, Kotlin, Swift, etc. Das Verstaendnis dieser Konzepte ist fundamental und uebertragbar auf jede OOP-Sprache.',
  order: 19,
};
