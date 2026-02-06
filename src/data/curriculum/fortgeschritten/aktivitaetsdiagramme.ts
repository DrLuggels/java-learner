import type { Topic } from '../../../types';

export const aktivitaetsdiagramme: Topic = {
  id: 'aktivitaetsdiagramme',
  moduleId: 'fortgeschritten',
  title: 'UML-Aktivitaetsdiagramme',
  description: 'Verstehe Aktivitaetsdiagramme mit Startknoten, Endknoten, Aktionen, Entscheidungen, Parallelitaet und Merge.',
  content: `
## UML-Aktivitaetsdiagramme

**Aktivitaetsdiagramme** modellieren den Ablauf von Prozessen und Algorithmen.
Sie sind besonders nuetzlich, um die Logik eines Programms visuell darzustellen.

### Grundelemente

- **Startknoten** (gefuellter Kreis): Beginn des Ablaufs
- **Endknoten** (gefuellter Kreis mit Ring): Ende des Ablaufs
- **Aktion** (abgerundetes Rechteck): Ein einzelner Arbeitsschritt
- **Kante/Pfeil**: Verbindung zwischen Aktionen (Kontrollfluss)

### Entscheidungen und Merge

- **Entscheidungsknoten** (Raute): Verzweigung basierend auf einer Bedingung
- **Merge-Knoten** (Raute): Zusammenfuehrung von Pfaden ohne Synchronisation
- Bedingungen werden in eckigen Klammern \`[Bedingung]\` geschrieben

### Parallelitaet

- **Fork** (dicker Balken): Aufteilen in parallele Ablaeufe
- **Join** (dicker Balken): Warten bis alle parallelen Ablaeufe fertig sind
- Zeigt an, dass Aktionen gleichzeitig ausgefuehrt werden koennen

### Swimlanes

Aktivitaetsdiagramme koennen in **Swimlanes** aufgeteilt werden, um zu zeigen,
welche Abteilung oder welches System fuer welche Aktion zustaendig ist.
  `,
  codeExamples: [
    {
      title: 'Entscheidungslogik als Java-Code',
      description: 'Ein Aktivitaetsdiagramm mit Entscheidungen in Java umgesetzt: Bestellprozess.',
      code: `public class Bestellprozess {

    static boolean istVerfuegbar = true;
    static double kontostand = 150.0;

    public static void main(String[] args) {
        // START
        System.out.println("[START] Bestellprozess gestartet");

        // Aktion: Bestellung aufgeben
        String produkt = "Java-Buch";
        double preis = 39.99;
        System.out.println("Aktion: Bestellung fuer '" + produkt + "' aufgeben");

        // ENTSCHEIDUNG: Produkt verfuegbar?
        if (istVerfuegbar) {
            System.out.println("[Ja] Produkt ist verfuegbar");

            // ENTSCHEIDUNG: Genug Guthaben?
            if (kontostand >= preis) {
                System.out.println("[Ja] Guthaben reicht aus");

                // Aktion: Zahlung durchfuehren
                kontostand -= preis;
                System.out.println("Aktion: Zahlung durchgefuehrt (" + preis + " EUR)");

                // Aktion: Bestellung bestaetigen
                System.out.println("Aktion: Bestaetigung gesendet");
                System.out.println("Restguthaben: " + kontostand + " EUR");
            } else {
                System.out.println("[Nein] Guthaben reicht nicht");
                System.out.println("Aktion: Fehlermeldung anzeigen");
            }
        } else {
            System.out.println("[Nein] Produkt nicht verfuegbar");
            System.out.println("Aktion: Warteliste anbieten");
        }

        // MERGE: Alle Pfade fuehren hier zusammen
        // ENDE
        System.out.println("[ENDE] Bestellprozess abgeschlossen");
    }
}`,
      expectedOutput: `[START] Bestellprozess gestartet
Aktion: Bestellung fuer 'Java-Buch' aufgeben
[Ja] Produkt ist verfuegbar
[Ja] Guthaben reicht aus
Aktion: Zahlung durchgefuehrt (39.99 EUR)
Aktion: Bestaetigung gesendet
Restguthaben: 110.01 EUR
[ENDE] Bestellprozess abgeschlossen`,
      editable: true,
    },
    {
      title: 'Parallelitaet (Fork/Join) in Java',
      description: 'Parallele Ausfuehrung wie im Aktivitaetsdiagramm: Mehrere Aufgaben gleichzeitig.',
      code: `public class ParallelBeispiel {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("[START] Fruestueck zubereiten\\n");

        // FORK: Drei parallele Aktionen starten
        Thread kaffee = new Thread(() -> {
            System.out.println("  Aktion: Kaffee kochen...");
            pause(200);
            System.out.println("  Erledigt: Kaffee fertig!");
        });

        Thread toast = new Thread(() -> {
            System.out.println("  Aktion: Toast roesten...");
            pause(300);
            System.out.println("  Erledigt: Toast fertig!");
        });

        Thread ei = new Thread(() -> {
            System.out.println("  Aktion: Ei braten...");
            pause(250);
            System.out.println("  Erledigt: Ei fertig!");
        });

        System.out.println("--- FORK: Parallele Ausfuehrung ---");
        kaffee.start();
        toast.start();
        ei.start();

        // JOIN: Auf alle drei warten
        kaffee.join();
        toast.join();
        ei.join();
        System.out.println("--- JOIN: Alle fertig ---");

        // Naechste Aktion nach dem Join
        System.out.println("\\nAktion: Fruehstueck servieren");
        System.out.println("[ENDE] Guten Appetit!");
    }

    static void pause(int ms) {
        try { Thread.sleep(ms); } catch (InterruptedException e) {}
    }
}`,
      expectedOutput: `[START] Fruestueck zubereiten

--- FORK: Parallele Ausfuehrung ---
  Aktion: Kaffee kochen...
  Aktion: Toast roesten...
  Aktion: Ei braten...
  Erledigt: Kaffee fertig!
  Erledigt: Ei fertig!
  Erledigt: Toast fertig!
--- JOIN: Alle fertig ---

Aktion: Fruehstueck servieren
[ENDE] Guten Appetit!`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'aktivitaetsdiagramme-q1',
      question: 'Welches UML-Element stellt eine Verzweigung basierend auf einer Bedingung dar?',
      options: [
        'Ein abgerundetes Rechteck (Aktion)',
        'Eine Raute (Entscheidungsknoten)',
        'Ein dicker Balken (Fork)',
        'Ein gefuellter Kreis (Startknoten)',
      ],
      correctIndex: 1,
      explanation: 'Der Entscheidungsknoten wird als Raute dargestellt. Er verzweigt den Kontrollfluss basierend auf Bedingungen, die in eckigen Klammern geschrieben werden.',
    },
    {
      id: 'aktivitaetsdiagramme-q2',
      question: 'Was ist der Unterschied zwischen Fork/Join und Entscheidung/Merge?',
      options: [
        'Es gibt keinen Unterschied',
        'Fork/Join ist fuer parallele Ausfuehrung, Entscheidung/Merge fuer bedingte Verzweigungen',
        'Fork/Join ist fuer Schleifen, Entscheidung/Merge fuer If-Else',
        'Fork/Join wird nur in Java verwendet',
      ],
      correctIndex: 1,
      explanation: 'Fork/Join (dicker Balken) modelliert parallele Ausfuehrung -- mehrere Aktionen gleichzeitig. Entscheidung/Merge (Raute) modelliert bedingte Verzweigungen -- nur ein Pfad wird gewaehlt.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Aktivitaetsdiagramme modellieren Ablaeufe mit Start, Ende, Aktionen und Kanten',
    'Entscheidungsknoten (Raute) verzweigen den Kontrollfluss basierend auf Bedingungen',
    'Fork/Join (dicker Balken) modellieren parallele Ausfuehrung',
    'Merge-Knoten fuehren alternative Pfade zusammen, Join wartet auf alle parallelen Pfade',
  ],
  transferKnowledge: 'Aktivitaetsdiagramme sind Flussdiagrammen sehr aehnlich und werden in vielen Bereichen verwendet -- von der Softwareentwicklung bis zur Geschaeftsprozessmodellierung. Sie helfen, komplexe Ablaeufe verstaendlich zu visualisieren.',
  order: 34,
};
