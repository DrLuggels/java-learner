import type { Topic } from '../../../types';

export const innereKlassen: Topic = {
  id: 'innere-klassen',
  moduleId: 'oop',
  title: 'Innere Klassen',
  description: 'Member-Klasse, lokale Klasse, anonyme Klasse, static nested class und deren Einsatzgebiete.',
  content: `# Innere Klassen (Inner Classes)

Java erlaubt es, Klassen **innerhalb** anderer Klassen zu definieren. Es gibt vier Arten von inneren Klassen, jede mit eigenem Einsatzgebiet.

## 1. Member-Klasse (Innere Klasse)
- Definiert als **nicht-statisches Mitglied** einer aeusseren Klasse
- Hat Zugriff auf **alle Mitglieder** der aeusseren Klasse (auch private)
- Benoetigt eine **Instanz der aeusseren Klasse** zum Erstellen
- Verwendung: Wenn die innere Klasse eng mit der aeusseren verbunden ist

## 2. Statische geschachtelte Klasse (Static Nested Class)
- Deklariert mit \`static\` innerhalb einer Klasse
- Hat **keinen Zugriff** auf Instanzmitglieder der aeusseren Klasse
- Kann ohne Instanz der aeusseren Klasse erstellt werden
- Verwendung: Logische Gruppierung, die keine Verbindung zur aeusseren Instanz braucht

## 3. Lokale Klasse
- Definiert **innerhalb einer Methode**
- Nur innerhalb dieser Methode sichtbar
- Kann auf \`final\` oder effektiv finale lokale Variablen zugreifen
- Verwendung: Selten, einmalige Hilfsklassen in einer Methode

## 4. Anonyme Klasse
- Klasse **ohne Namen**, die inline definiert und instanziiert wird
- Wird oft fuer **einmalige Implementierungen** von Interfaces oder abstrakten Klassen verwendet
- Seit Java 8 oft durch **Lambda-Ausdruecke** ersetzt (bei funktionalen Interfaces)`,
  codeExamples: [
    {
      title: 'Member-Klasse und Static Nested Class',
      description: 'Die zwei haeufigsten Arten innerer Klassen im Vergleich.',
      code: `public class Aussen {
    private String name = "Aeussere Klasse";
    private int wert = 42;

    // 1. Member-Klasse (nicht-statisch)
    class Innen {
        void anzeigen() {
            // Zugriff auf ALLE Mitglieder der aeusseren Klasse
            System.out.println("Member-Klasse sieht: " + name + ", wert=" + wert);
        }
    }

    // 2. Statische geschachtelte Klasse
    static class StatischInnen {
        void anzeigen() {
            // KEIN Zugriff auf Instanzmitglieder (name, wert)
            System.out.println("Static Nested Class: Unabhaengig von aeusserer Instanz");
        }

        // Kann eigene Attribute und Methoden haben
        static void hilfe() {
            System.out.println("Statische Hilfsmethode der geschachtelten Klasse");
        }
    }

    void demo() {
        // Member-Klasse innerhalb der aeusseren Klasse erstellen
        Innen i = new Innen();
        i.anzeigen();
    }

    public static void main(String[] args) {
        // Member-Klasse braucht aeussere Instanz
        Aussen aussen = new Aussen();
        Aussen.Innen innen = aussen.new Innen();
        innen.anzeigen();

        System.out.println();

        // Static Nested Class braucht KEINE aeussere Instanz
        Aussen.StatischInnen statisch = new Aussen.StatischInnen();
        statisch.anzeigen();
        Aussen.StatischInnen.hilfe();
    }
}`,
      expectedOutput: `Member-Klasse sieht: Aeussere Klasse, wert=42

Static Nested Class: Unabhaengig von aeusserer Instanz
Statische Hilfsmethode der geschachtelten Klasse`,
      editable: true,
    },
    {
      title: 'Anonyme Klassen',
      description: 'Klassen ohne Namen fuer einmalige Implementierungen, oft bei Interfaces und abstrakten Klassen.',
      code: `interface Begruessung {
    void gruss(String name);
}

abstract class Formatierer {
    abstract String formatiere(String text);

    void ausgabe(String text) {
        System.out.println(formatiere(text));
    }
}

public class AnonymDemo {
    public static void main(String[] args) {
        // Anonyme Klasse: Interface inline implementieren
        Begruessung formal = new Begruessung() {
            @Override
            public void gruss(String name) {
                System.out.println("Sehr geehrte(r) " + name + ",");
            }
        };

        Begruessung locker = new Begruessung() {
            @Override
            public void gruss(String name) {
                System.out.println("Hey " + name + "!");
            }
        };

        formal.gruss("Herr Mueller");
        locker.gruss("Max");
        System.out.println();

        // Anonyme Klasse: Abstrakte Klasse inline implementieren
        Formatierer grossbuchstaben = new Formatierer() {
            @Override
            String formatiere(String text) {
                return text.toUpperCase();
            }
        };

        Formatierer mitRahmen = new Formatierer() {
            @Override
            String formatiere(String text) {
                return "*** " + text + " ***";
            }
        };

        grossbuchstaben.ausgabe("hallo welt");
        mitRahmen.ausgabe("Wichtig");

        System.out.println();

        // Seit Java 8: Lambda ist kuerzer (bei funktionalen Interfaces)
        Begruessung lambda = name -> System.out.println("Lambda sagt: Hallo " + name + "!");
        lambda.gruss("Java 21");
    }
}`,
      expectedOutput: `Sehr geehrte(r) Herr Mueller,
Hey Max!

HALLO WELT
*** Wichtig ***

Lambda sagt: Hallo Java 21!`,
      editable: true,
    },
    {
      title: 'Praxisbeispiel: Iterator mit innerer Klasse',
      description: 'Ein typischer Anwendungsfall: Eine innere Klasse implementiert ein Interface fuer die aeussere Klasse.',
      code: `import java.util.Iterator;

class Nummernliste implements Iterable<Integer> {
    private int[] zahlen;

    public Nummernliste(int... zahlen) {
        this.zahlen = zahlen;
    }

    // Member-Klasse als Iterator
    private class NummernIterator implements Iterator<Integer> {
        private int index = 0;

        @Override
        public boolean hasNext() {
            return index < zahlen.length; // Zugriff auf aeusseres Attribut!
        }

        @Override
        public Integer next() {
            return zahlen[index++];
        }
    }

    @Override
    public Iterator<Integer> iterator() {
        return new NummernIterator();
    }

    // Static Nested Class als Fabrik
    static class Fabrik {
        static Nummernliste erstelle(int von, int bis) {
            int[] werte = new int[bis - von + 1];
            for (int i = 0; i < werte.length; i++) {
                werte[i] = von + i;
            }
            return new Nummernliste(werte);
        }
    }
}

public class IteratorDemo {
    public static void main(String[] args) {
        Nummernliste liste = new Nummernliste(10, 20, 30, 40, 50);

        System.out.print("Manuell: ");
        for (int zahl : liste) {
            System.out.print(zahl + " ");
        }
        System.out.println();

        // Static Nested Class als Fabrik
        Nummernliste bereich = Nummernliste.Fabrik.erstelle(1, 5);
        System.out.print("Fabrik:  ");
        for (int zahl : bereich) {
            System.out.print(zahl + " ");
        }
        System.out.println();
    }
}`,
      expectedOutput: `Manuell: 10 20 30 40 50
Fabrik:  1 2 3 4 5 `,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'innere-klassen-q1',
      question: 'Was ist der Hauptunterschied zwischen einer Member-Klasse und einer static nested class?',
      options: [
        'Es gibt keinen Unterschied',
        'Eine Member-Klasse hat Zugriff auf Instanzmitglieder der aeusseren Klasse, eine static nested class nicht',
        'Eine static nested class kann keine Methoden haben',
        'Member-Klassen koennen nur in abstrakten Klassen definiert werden',
      ],
      correctIndex: 1,
      explanation: 'Eine Member-Klasse (nicht-statisch) ist an eine Instanz der aeusseren Klasse gebunden und hat Zugriff auf alle deren Mitglieder (auch private). Eine static nested class hat keinen Zugriff auf Instanzmitglieder und kann unabhaengig von einer aeusseren Instanz erstellt werden.',
    },
    {
      id: 'innere-klassen-q2',
      question: 'Wann werden anonyme Klassen seit Java 8 typischerweise durch Lambda-Ausdruecke ersetzt?',
      options: [
        'Immer',
        'Nie, Lambdas und anonyme Klassen sind unabhaengig',
        'Wenn ein funktionales Interface (genau eine abstrakte Methode) implementiert wird',
        'Nur bei der Implementierung von Runnable',
      ],
      correctIndex: 2,
      explanation: 'Lambda-Ausdruecke koennen anonyme Klassen ersetzen, wenn ein funktionales Interface implementiert wird (genau eine abstrakte Methode). Bei Interfaces mit mehreren Methoden oder bei abstrakten Klassen sind weiterhin anonyme Klassen noetig.',
    },
  ],
  exercises: ['inner-classes-01'],
  keyConceptsDE: [
    'Member-Klasse: Zugriff auf alle Mitglieder der aeusseren Klasse',
    'Static Nested Class: Unabhaengig von aeusserer Instanz',
    'Lokale Klasse: Definiert innerhalb einer Methode',
    'Anonyme Klasse: Namenlose Einmal-Implementierung',
    'Lambdas ersetzen anonyme Klassen bei funktionalen Interfaces',
    'Innere Klassen sind nuetzlich fuer enge logische Kopplung',
  ],
  transferKnowledge: 'Verschachtelte Typen gibt es in vielen Sprachen: Python hat verschachtelte Klassen, C# hat nested classes, Kotlin hat inner und nested classes (aehnlich wie Java), JavaScript/TypeScript erlaubt Klassen in Klassen. Das Konzept der logischen Gruppierung und Kapselung ist sprachuebergreifend.',
  order: 27,
};
