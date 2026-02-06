import type { Topic } from '../../../types';

export const optionals: Topic = {
  id: 'optionals',
  moduleId: 'fortgeschritten',
  title: 'Optionals',
  description: 'NullPointerExceptions vermeiden mit Optional<T>.',
  content: `## Das null-Problem

\`NullPointerException\` ist der häufigste Fehler in Java. **Optional<T>** macht explizit, dass ein Wert fehlen kann.

\`\`\`java
Optional<String> name = Optional.of("Max");      // Wert vorhanden
Optional<String> leer = Optional.empty();          // Kein Wert
Optional<String> maybe = Optional.ofNullable(null); // Sicher mit null
\`\`\`

## Wichtige Methoden

- \`isPresent()\` / \`isEmpty()\` — Prüfen ob Wert da ist
- \`get()\` — Wert holen (Vorsicht: Exception wenn leer!)
- \`orElse(default)\` — Wert oder Standardwert
- \`ifPresent(consumer)\` — Aktion wenn vorhanden
- \`map(function)\` — Wert transformieren
- \`flatMap(function)\` — Verschachtelte Optionals vermeiden

## Merke dir
- **Nie** \`get()\` ohne vorherige Prüfung nutzen
- Bevorzuge \`orElse()\`, \`map()\`, \`ifPresent()\`
- Optionals sind für **Rückgabewerte**, nicht für Felder oder Parameter`,
  codeExamples: [
    {
      title: 'Optional Grundlagen',
      description: 'Sicherer Umgang mit möglicherweise fehlenden Werten',
      code: `import java.util.Optional;

public class Main {
    static Optional<String> findUser(int id) {
        if (id == 1) return Optional.of("Anna");
        if (id == 2) return Optional.of("Bob");
        return Optional.empty();
    }

    public static void main(String[] args) {
        // orElse - Standardwert
        String user1 = findUser(1).orElse("Unbekannt");
        String user9 = findUser(9).orElse("Unbekannt");
        System.out.println("User 1: " + user1);
        System.out.println("User 9: " + user9);

        // ifPresent - nur wenn vorhanden
        findUser(2).ifPresent(name -> System.out.println("Gefunden: " + name));

        // map - transformieren
        Optional<Integer> nameLength = findUser(1).map(String::length);
        System.out.println("Namenlaenge: " + nameLength.orElse(0));
    }
}`,
      expectedOutput: 'User 1: Anna\nUser 9: Unbekannt\nGefunden: Bob\nNamenlaenge: 4',
      editable: true,
    },
    {
      title: 'Optional mit map und flatMap',
      description: 'Werte transformieren und verschachtelte Optionals vermeiden.',
      code: `import java.util.Optional;

public class Main {
    record Adresse(String stadt) {}
    record Person(String name, Optional<Adresse> adresse) {}

    public static void main(String[] args) {
        Person mitAdresse = new Person("Anna", Optional.of(new Adresse("Berlin")));
        Person ohneAdresse = new Person("Bob", Optional.empty());

        // map: Wert transformieren
        Optional<String> annaStadt = mitAdresse.adresse()
            .map(Adresse::stadt);
        System.out.println("Anna wohnt in: " + annaStadt.orElse("unbekannt"));

        Optional<String> bobStadt = ohneAdresse.adresse()
            .map(Adresse::stadt);
        System.out.println("Bob wohnt in: " + bobStadt.orElse("unbekannt"));

        // flatMap: Wenn die Funktion selbst Optional zurueckgibt
        Optional<String> stadt = Optional.of("Berlin")
            .flatMap(s -> s.length() > 3 ? Optional.of(s.toUpperCase()) : Optional.empty());
        System.out.println("Grossgeschrieben: " + stadt.orElse("-"));

        // orElseGet: Lazy-Alternative (Lambda wird nur bei leerem Optional aufgerufen)
        String wert = Optional.<String>empty()
            .orElseGet(() -> "Berechnet: " + (40 + 2));
        System.out.println(wert);
    }
}`,
      expectedOutput: 'Anna wohnt in: Berlin\nBob wohnt in: unbekannt\nGrossgeschrieben: BERLIN\nBerechnet: 42',
      editable: true,
    },
    {
      title: 'Optional als Rueckgabetyp in der Praxis',
      description: 'Best Practices: Optional fuer Rueckgabewerte verwenden.',
      code: `import java.util.*;

public class Main {
    record Produkt(String name, double preis) {}

    static List<Produkt> katalog = List.of(
        new Produkt("Laptop", 999.99),
        new Produkt("Maus", 29.99),
        new Produkt("Tastatur", 79.99)
    );

    // Optional als Rueckgabetyp -- macht klar, dass Ergebnis fehlen kann
    static Optional<Produkt> findeProdukt(String name) {
        return katalog.stream()
            .filter(p -> p.name().equalsIgnoreCase(name))
            .findFirst();
    }

    static Optional<Double> berechneRabatt(Produkt p) {
        if (p.preis() > 100) return Optional.of(p.preis() * 0.1);
        return Optional.empty();
    }

    public static void main(String[] args) {
        // Verkettung: Produkt finden -> Rabatt berechnen
        double rabatt = findeProdukt("Laptop")
            .flatMap(Main::berechneRabatt)
            .orElse(0.0);
        System.out.println("Rabatt fuer Laptop: " + rabatt + " EUR");

        double rabattMaus = findeProdukt("Maus")
            .flatMap(Main::berechneRabatt)
            .orElse(0.0);
        System.out.println("Rabatt fuer Maus: " + rabattMaus + " EUR");

        // ifPresentOrElse (Java 9+)
        findeProdukt("Monitor").ifPresentOrElse(
            p -> System.out.println("Gefunden: " + p),
            () -> System.out.println("Monitor nicht im Katalog!")
        );
    }
}`,
      expectedOutput: 'Rabatt fuer Laptop: 99.999 EUR\nRabatt fuer Maus: 0.0 EUR\nMonitor nicht im Katalog!',
      editable: true,
    },
  ],
  quiz: [
    { id: 'opt-q1', question: 'Warum sollte man Optional.get() vermeiden?', options: ['Es ist langsam', 'Es wirft NoSuchElementException wenn leer', 'Es gibt immer null zurück', 'Es ist deprecated'], correctIndex: 1, explanation: 'Optional.get() wirft NoSuchElementException wenn das Optional leer ist. Besser: orElse(), map(), ifPresent().' },
    { id: 'opt-q2', question: 'Was gibt Optional.ofNullable(null) zurück?', options: ['null', 'NullPointerException', 'Optional.empty()', 'Optional.of(null)'], correctIndex: 2, explanation: 'Optional.ofNullable(null) gibt ein leeres Optional zurück. Optional.of(null) würde eine NullPointerException werfen!' },
    { id: 'opt-q3', question: 'Was ist der Unterschied zwischen orElse() und orElseGet()?', options: ['Es gibt keinen Unterschied', 'orElse() nimmt einen festen Wert, orElseGet() nimmt ein Supplier-Lambda das nur bei leerem Optional ausgefuehrt wird', 'orElseGet() ist veraltet', 'orElse() gibt null zurueck'], correctIndex: 1, explanation: 'orElse(wert) wertet den Standardwert IMMER aus. orElseGet(() -> wert) ruft das Lambda nur auf, wenn das Optional leer ist. Bei teuren Berechnungen ist orElseGet() effizienter.' },
  ],
  exercises: ['optionals-01'],
  keyConceptsDE: ['Optional', 'orElse', 'map', 'flatMap', 'ifPresent', 'NullPointerException vermeiden'],
  transferKnowledge: 'Optionals gibt es überall: Kotlin null-safety (?.), Swift Optional, Rust Option<T>, TypeScript optional chaining (?.). Null-Sicherheit ist ein modernes Must-Have.',
  order: 42,
};
