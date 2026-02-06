import type { Topic } from '../../../types';

export const datumZeit: Topic = {
  id: 'datum-zeit',
  moduleId: 'fortgeschritten',
  title: 'Datum und Zeit',
  description: 'Arbeite mit der modernen Java Date/Time API: LocalDate, LocalTime, LocalDateTime, Period, Duration und DateTimeFormatter.',
  content: `
## Datum und Zeit in Java

Seit Java 8 gibt es die moderne **Date/Time API** im Paket \`java.time\`.
Sie ersetzt die alten, fehleranfaelligen Klassen \`Date\` und \`Calendar\`.

### Die wichtigsten Klassen

- **LocalDate** -- nur ein Datum (z. B. 2024-03-15), ohne Uhrzeit
- **LocalTime** -- nur eine Uhrzeit (z. B. 14:30:00), ohne Datum
- **LocalDateTime** -- Datum und Uhrzeit kombiniert
- **Period** -- Zeitspanne in Jahren, Monaten und Tagen
- **Duration** -- Zeitspanne in Stunden, Minuten und Sekunden

### Unveraenderlich (Immutable)

Alle Klassen der Date/Time API sind **unveraenderlich**. Methoden wie \`plusDays()\`
oder \`minusHours()\` geben immer ein **neues Objekt** zurueck, ohne das Original zu veraendern.

### Formatierung

Mit \`DateTimeFormatter\` kannst du Datum und Zeit in beliebige Formate umwandeln.
Verwende \`ofPattern()\` fuer eigene Muster wie \`"dd.MM.yyyy"\` oder \`"HH:mm"\`.

### Vergleiche und Berechnungen

Methoden wie \`isBefore()\`, \`isAfter()\` und \`isEqual()\` ermoeglichen Vergleiche.
Mit \`Period.between()\` und \`Duration.between()\` berechnest du Zeitspannen.
  `,
  codeExamples: [
    {
      title: 'LocalDate, LocalTime und LocalDateTime',
      description: 'Erstellen und Manipulieren von Datums- und Zeitobjekten.',
      code: `import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.Month;

public class DatumZeitBeispiel {
    public static void main(String[] args) {
        // Aktuelles Datum und Zeit
        LocalDate heute = LocalDate.now();
        LocalTime jetzt = LocalTime.now();
        LocalDateTime aktuellerZeitpunkt = LocalDateTime.now();

        System.out.println("Heute: " + heute);
        System.out.println("Jetzt: " + jetzt);
        System.out.println("Aktuell: " + aktuellerZeitpunkt);

        // Bestimmtes Datum erstellen
        LocalDate geburtstag = LocalDate.of(2000, Month.MARCH, 15);
        System.out.println("\\nGeburtstag: " + geburtstag);

        // Rechnen mit Datumswerten (immutable!)
        LocalDate naechsteWoche = heute.plusWeeks(1);
        LocalDate vorEinemMonat = heute.minusMonths(1);
        System.out.println("Naechste Woche: " + naechsteWoche);
        System.out.println("Vor einem Monat: " + vorEinemMonat);

        // Vergleiche
        System.out.println("\\nGeburtstag vor heute? " + geburtstag.isBefore(heute));
        System.out.println("Tag des Jahres: " + heute.getDayOfYear());
        System.out.println("Wochentag: " + heute.getDayOfWeek());
    }
}`,
      expectedOutput: `Heute: 2024-11-20
Jetzt: 14:30:00.123456
Aktuell: 2024-11-20T14:30:00.123456

Geburtstag: 2000-03-15
Naechste Woche: 2024-11-27
Vor einem Monat: 2024-10-20

Geburtstag vor heute? true
Tag des Jahres: 325
Wochentag: WEDNESDAY`,
      editable: true,
    },
    {
      title: 'Period, Duration und DateTimeFormatter',
      description: 'Zeitspannen berechnen und Datum/Zeit formatieren.',
      code: `import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.time.Duration;
import java.time.format.DateTimeFormatter;

public class FormatierungBeispiel {
    public static void main(String[] args) {
        // Period -- Zeitspanne in Jahren/Monaten/Tagen
        LocalDate geburt = LocalDate.of(2000, 6, 15);
        LocalDate heute = LocalDate.of(2024, 11, 20);
        Period alter = Period.between(geburt, heute);
        System.out.println("Alter: " + alter.getYears() + " Jahre, "
                + alter.getMonths() + " Monate, "
                + alter.getDays() + " Tage");

        // Duration -- Zeitspanne in Stunden/Minuten/Sekunden
        LocalTime start = LocalTime.of(8, 0);
        LocalTime ende = LocalTime.of(16, 30);
        Duration arbeitszeit = Duration.between(start, ende);
        System.out.println("Arbeitszeit: " + arbeitszeit.toHours()
                + " Stunden, " + arbeitszeit.toMinutesPart() + " Minuten");

        // DateTimeFormatter -- eigene Formate
        DateTimeFormatter deutschFormat = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        String formatiert = heute.format(deutschFormat);
        System.out.println("\\nDeutsches Format: " + formatiert);

        // String zurueck zu LocalDate parsen
        LocalDate geparst = LocalDate.parse("25.12.2024", deutschFormat);
        System.out.println("Geparst: " + geparst);

        // Zeit formatieren
        DateTimeFormatter zeitFormat = DateTimeFormatter.ofPattern("HH:mm 'Uhr'");
        System.out.println("Startzeit: " + start.format(zeitFormat));
    }
}`,
      expectedOutput: `Alter: 24 Jahre, 5 Monate, 5 Tage
Arbeitszeit: 8 Stunden, 30 Minuten

Deutsches Format: 20.11.2024
Geparst: 2024-12-25
Startzeit: 08:00 Uhr`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'datum-zeit-q1',
      question: 'Was passiert, wenn du auf einem LocalDate-Objekt plusDays(5) aufrufst?',
      options: [
        'Das bestehende Objekt wird um 5 Tage veraendert',
        'Ein neues LocalDate-Objekt wird zurueckgegeben, das 5 Tage spaeter liegt',
        'Es wird eine Exception geworfen',
        'Das Datum wird als String formatiert',
      ],
      correctIndex: 1,
      explanation: 'Alle Klassen der Date/Time API sind immutable (unveraenderlich). plusDays() gibt ein neues Objekt zurueck, das Original bleibt unveraendert.',
    },
    {
      id: 'datum-zeit-q2',
      question: 'Welche Klasse verwendest du, um eine Zeitspanne in Jahren und Monaten darzustellen?',
      options: ['Duration', 'Period', 'LocalDateTime', 'DateTimeFormatter'],
      correctIndex: 1,
      explanation: 'Period stellt Zeitspannen in Jahren, Monaten und Tagen dar. Duration wird fuer Stunden, Minuten und Sekunden verwendet.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'LocalDate, LocalTime und LocalDateTime sind die modernen Datums-/Zeitklassen',
    'Alle Date/Time-Objekte sind immutable -- Methoden geben neue Objekte zurueck',
    'Period misst Zeitspannen in Jahren/Monaten/Tagen, Duration in Stunden/Minuten/Sekunden',
    'DateTimeFormatter.ofPattern() ermoeglicht eigene Formatierungsmuster',
  ],
  transferKnowledge: 'Immutable Objekte sind ein wichtiges Designprinzip in der modernen Softwareentwicklung. Das Konzept findest du auch bei Strings in Java und in funktionalen Programmiersprachen. Es macht Code sicherer und einfacher zu verstehen.',
  order: 30,
};
