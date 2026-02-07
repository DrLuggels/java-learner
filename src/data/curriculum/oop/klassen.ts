import type { Topic } from '../../../types';
import { klassenSteps } from '../../steps/klassen-steps';

export const klassen: Topic = {
  id: 'klassen',
  moduleId: 'oop',
  title: 'Klassen und Objekte',
  description: 'Attribute, Methoden, Konstruktoren, this, Getter/Setter, Ueberladung und static.',
  content: `# Klassen und Objekte

Eine **Klasse** ist ein Bauplan (Blueprint) fuer Objekte. Sie definiert, welche **Attribute** (Daten) und **Methoden** (Verhalten) ein Objekt hat.

## Aufbau einer Klasse

- **Attribute** (Instanzvariablen): Speichern den Zustand eines Objekts
- **Konstruktoren**: Spezielle Methoden zum Erzeugen und Initialisieren von Objekten
- **Methoden**: Definieren das Verhalten eines Objekts
- **\`this\`-Referenz**: Verweist auf das aktuelle Objekt

## Konstruktoren

Ein Konstruktor hat den **gleichen Namen wie die Klasse** und keinen Rueckgabetyp. Er wird mit \`new\` aufgerufen. Gibt es keinen Konstruktor, erstellt Java automatisch einen **Standardkonstruktor** ohne Parameter.

## Getter und Setter

- **Getter**: Gibt den Wert eines privaten Attributs zurueck
- **Setter**: Setzt den Wert eines privaten Attributs (mit optionaler Validierung)

## Methodenueberladung (Overloading)

Mehrere Methoden koennen den **gleichen Namen** haben, wenn sie sich in der **Parameterliste** unterscheiden (Anzahl, Typ oder Reihenfolge der Parameter).

## Static

Mit \`static\` gekennzeichnete Attribute und Methoden gehoeren zur **Klasse selbst**, nicht zu einer Instanz. Sie werden ohne Objekt ueber den Klassennamen aufgerufen.`,
  codeExamples: [
    {
      title: 'Klasse mit Konstruktoren und Methoden',
      description: 'Eine vollstaendige Klasse mit Attributen, Konstruktoren, Getter/Setter und der this-Referenz.',
      code: `public class Student {
    // Attribute (Instanzvariablen)
    private String name;
    private int matrikelnummer;
    private double notenschnitt;

    // Konstruktor mit Parametern
    public Student(String name, int matrikelnummer) {
        this.name = name; // this unterscheidet Attribut von Parameter
        this.matrikelnummer = matrikelnummer;
        this.notenschnitt = 0.0;
    }

    // Ueberladener Konstruktor
    public Student(String name, int matrikelnummer, double notenschnitt) {
        this(name, matrikelnummer); // Aufruf des anderen Konstruktors
        this.notenschnitt = notenschnitt;
    }

    // Getter
    public String getName() { return name; }
    public int getMatrikelnummer() { return matrikelnummer; }
    public double getNotenschnitt() { return notenschnitt; }

    // Setter mit Validierung
    public void setNotenschnitt(double notenschnitt) {
        if (notenschnitt >= 1.0 && notenschnitt <= 5.0) {
            this.notenschnitt = notenschnitt;
        } else {
            System.out.println("Ungueltige Note! Muss zwischen 1.0 und 5.0 liegen.");
        }
    }

    public void info() {
        System.out.println(name + " (Mat.-Nr.: " + matrikelnummer
            + "), Schnitt: " + notenschnitt);
    }

    public static void main(String[] args) {
        Student s1 = new Student("Anna Mueller", 12345);
        Student s2 = new Student("Ben Schmidt", 67890, 1.7);

        s1.setNotenschnitt(2.3);
        s1.info();
        s2.info();

        s1.setNotenschnitt(6.0); // Ungueltig
    }
}`,
      expectedOutput: `Anna Mueller (Mat.-Nr.: 12345), Schnitt: 2.3
Ben Schmidt (Mat.-Nr.: 67890), Schnitt: 1.7
Ungueltige Note! Muss zwischen 1.0 und 5.0 liegen.`,
      editable: true,
    },
    {
      title: 'Methodenueberladung (Overloading)',
      description: 'Methoden mit gleichem Namen aber unterschiedlichen Parametern.',
      code: `public class Rechner {
    // Ueberladene Methoden: gleicher Name, verschiedene Parameter
    public int addiere(int a, int b) {
        return a + b;
    }

    public double addiere(double a, double b) {
        return a + b;
    }

    public int addiere(int a, int b, int c) {
        return a + b + c;
    }

    public String addiere(String a, String b) {
        return a + b; // String-Konkatenation
    }

    public static void main(String[] args) {
        Rechner r = new Rechner();

        System.out.println("int:    " + r.addiere(3, 4));
        System.out.println("double: " + r.addiere(3.5, 4.2));
        System.out.println("3 ints: " + r.addiere(1, 2, 3));
        System.out.println("String: " + r.addiere("Hallo ", "Welt"));
    }
}`,
      expectedOutput: `int:    7
double: 7.7
3 ints: 6
String: Hallo Welt`,
      editable: true,
    },
    {
      title: 'Static: Klassenvariablen und -methoden',
      description: 'Static-Mitglieder gehoeren zur Klasse, nicht zu einzelnen Objekten.',
      code: `public class Zaehler {
    // Static: gehoert zur Klasse, nicht zum Objekt
    private static int anzahlInstanzen = 0;

    private String bezeichnung;

    public Zaehler(String bezeichnung) {
        this.bezeichnung = bezeichnung;
        anzahlInstanzen++; // Jedes neue Objekt erhoeht den Zaehler
    }

    // Static Methode: ohne Objekt aufrufbar
    public static int getAnzahlInstanzen() {
        return anzahlInstanzen;
    }

    // Static Hilfsmethode
    public static double celsiusToFahrenheit(double celsius) {
        return celsius * 9.0 / 5.0 + 32;
    }

    public void info() {
        System.out.println("Objekt: " + bezeichnung
            + " (Gesamt: " + anzahlInstanzen + ")");
    }

    public static void main(String[] args) {
        System.out.println("Instanzen: " + Zaehler.getAnzahlInstanzen());

        Zaehler z1 = new Zaehler("Erster");
        Zaehler z2 = new Zaehler("Zweiter");
        Zaehler z3 = new Zaehler("Dritter");

        z1.info();
        z3.info();

        System.out.println("Instanzen gesamt: " + Zaehler.getAnzahlInstanzen());
        System.out.println("100°C = " + Zaehler.celsiusToFahrenheit(100) + "°F");
    }
}`,
      expectedOutput: `Instanzen: 0
Objekt: Erster (Gesamt: 3)
Objekt: Dritter (Gesamt: 3)
Instanzen gesamt: 3
100°C = 212.0°F`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'klassen-q1',
      question: 'Was passiert, wenn man in einer Klasse keinen Konstruktor definiert?',
      options: [
        'Der Code kompiliert nicht',
        'Java erstellt automatisch einen Standardkonstruktor ohne Parameter',
        'Alle Attribute werden auf null gesetzt und die Klasse kann nicht instanziiert werden',
        'Es wird ein Konstruktor mit allen Attributen als Parameter erstellt',
      ],
      correctIndex: 1,
      explanation: 'Java erstellt automatisch einen parameterlosen Standardkonstruktor (Default Constructor), wenn kein Konstruktor explizit definiert wird. Sobald man jedoch einen eigenen Konstruktor definiert, wird der Standardkonstruktor NICHT mehr automatisch erzeugt.',
    },
    {
      id: 'klassen-q2',
      question: 'Was ist der Unterschied zwischen einer static-Methode und einer Instanzmethode?',
      options: [
        'Static-Methoden sind schneller',
        'Static-Methoden gehoeren zur Klasse und benoetigen kein Objekt, Instanzmethoden gehoeren zum Objekt',
        'Instanzmethoden koennen keine Parameter haben',
        'Es gibt keinen Unterschied, die Begriffe sind austauschbar',
      ],
      correctIndex: 1,
      explanation: 'Static-Methoden gehoeren zur Klasse selbst und werden ueber den Klassennamen aufgerufen (z.B. Math.sqrt()). Instanzmethoden gehoeren zu einem konkreten Objekt und koennen auf dessen Attribute zugreifen.',
    },
    {
      id: 'klassen-q3',
      question: 'Was ist Methodenueberladung (Overloading)?',
      options: [
        'Eine Methode in der Subklasse ueberschreibt eine Methode der Superklasse',
        'Mehrere Methoden mit gleichem Namen aber unterschiedlicher Parameterliste in derselben Klasse',
        'Eine Methode wird mit dem Schluesselwort overload deklariert',
        'Eine Methode ruft sich selbst rekursiv auf',
      ],
      correctIndex: 1,
      explanation: 'Methodenueberladung bedeutet, dass mehrere Methoden denselben Namen haben, sich aber in Anzahl, Typ oder Reihenfolge der Parameter unterscheiden. Der Compiler waehlt zur Kompilierzeit die passende Methode anhand der Argumente aus. Der Rueckgabetyp allein reicht nicht zur Unterscheidung.',
    },
  ],
  exercises: ['oo-02', 'oo-03'],
  keyConceptsDE: [
    'Eine Klasse ist ein Bauplan fuer Objekte mit Attributen und Methoden',
    'Konstruktoren initialisieren Objekte und werden mit new aufgerufen',
    'this verweist auf das aktuelle Objekt',
    'Getter/Setter kontrollieren den Zugriff auf private Attribute',
    'Methodenueberladung: gleicher Name, verschiedene Parameterlisten',
    'static-Mitglieder gehoeren zur Klasse, nicht zu Instanzen',
  ],
  transferKnowledge: 'Klassen und Objekte gibt es in fast jeder modernen Programmiersprache: Python (class), C# (class), JavaScript/TypeScript (class), Kotlin (class), Swift (class/struct). Die Syntax unterscheidet sich, aber die Konzepte sind identisch.',
  order: 20,
  lessonSteps: klassenSteps,
};
