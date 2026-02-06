import type { Topic } from '../../../types';

export const slf4j: Topic = {
  id: 'slf4j',
  moduleId: 'fortgeschritten',
  title: 'SLF4J (Logging)',
  description: 'Professionelles Logging mit SLF4J statt System.out.println.',
  content: `## Warum Logging statt println?

\`System.out.println\` ist für Debugging ungeeignet — keine Timestamps, keine Level, nicht konfigurierbar. **SLF4J** ist die Standard-Logging-Fassade in Java.

## Logging-Level (aufsteigend)

| Level | Verwendung |
|---|---|
| TRACE | Sehr detaillierte Debug-Infos |
| DEBUG | Debugging-Informationen |
| INFO | Allgemeine Informationen |
| WARN | Warnungen |
| ERROR | Fehler |

## Merke dir
- Logger pro Klasse: \`LoggerFactory.getLogger(MeineKlasse.class)\`
- Nutze **Platzhalter** statt String-Konkatenation: \`log.info("User {} eingeloggt", name)\`
- In Produktion: Level auf INFO oder höher setzen`,
  codeExamples: [
    {
      title: 'Logging-Konzept',
      description: 'So würde SLF4J-Logging aussehen (konzeptuell)',
      code: `// SLF4J laeuft nicht im Browser, hier das Konzept:
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

public class Main {
    // private static final Logger log = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {
        // Statt: System.out.println("User eingeloggt: " + name);
        // Besser: log.info("User {} eingeloggt", name);

        System.out.println("=== Logging-Level ===");
        System.out.println("TRACE - Sehr detailliert");
        System.out.println("DEBUG - Debugging");
        System.out.println("INFO  - Allgemeine Info");
        System.out.println("WARN  - Warnung");
        System.out.println("ERROR - Fehler");
        System.out.println();
        System.out.println("Vorteil: Level konfigurierbar!");
        System.out.println("In Produktion nur WARN+ERROR anzeigen");
    }
}`,
      editable: true,
    },
    {
      title: 'Platzhalter und strukturiertes Logging',
      description: 'SLF4J nutzt Platzhalter {} statt String-Konkatenation fuer bessere Performance.',
      code: `// SLF4J-Platzhalter-Konzept demonstriert
public class Main {
    // Simulation eines einfachen Loggers
    static void log(String level, String nachricht) {
        String zeit = java.time.LocalDateTime.now()
            .format(java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss"));
        System.out.printf("[%s] %s - %s%n", zeit, level, nachricht);
    }

    public static void main(String[] args) {
        String benutzer = "Anna";
        int versuch = 3;

        // SCHLECHT: String-Konkatenation (wird immer ausgefuehrt!)
        // log.debug("User " + benutzer + " Login-Versuch " + versuch);

        // GUT: Platzhalter (wird nur bei aktivem Level aufgeloest)
        // log.debug("User {} Login-Versuch {}", benutzer, versuch);

        log("INFO", "Anwendung gestartet");
        log("INFO", "User " + benutzer + " hat sich eingeloggt");
        log("DEBUG", "Login-Versuch Nr. " + versuch + " erfolgreich");
        log("WARN", "Passwort laeuft in 5 Tagen ab fuer " + benutzer);
        log("ERROR", "Datenbankverbindung fehlgeschlagen!");

        System.out.println();
        System.out.println("Platzhalter-Vorteil:");
        System.out.println("  log.debug(\"User {} Versuch {}\", name, nr);");
        System.out.println("  -> String wird NUR erzeugt wenn DEBUG aktiv ist!");
    }
}`,
      expectedOutput: '[14:30:00] INFO - Anwendung gestartet\n[14:30:00] INFO - User Anna hat sich eingeloggt\n[14:30:00] DEBUG - Login-Versuch Nr. 3 erfolgreich\n[14:30:00] WARN - Passwort laeuft in 5 Tagen ab fuer Anna\n[14:30:00] ERROR - Datenbankverbindung fehlgeschlagen!\n\nPlatzhalter-Vorteil:\n  log.debug(\"User {} Versuch {}\", name, nr);\n  -> String wird NUR erzeugt wenn DEBUG aktiv ist!',
      editable: true,
    },
    {
      title: 'Logging mit Exceptions',
      description: 'Fehler korrekt loggen: Exception als letzten Parameter uebergeben.',
      code: `// Konzept: Exception-Logging mit SLF4J
// log.error("Fehler beim Speichern", exception);
// -> SLF4J gibt automatisch den Stacktrace aus!

public class Main {
    static void log(String level, String msg, Exception e) {
        String zeit = java.time.LocalDateTime.now()
            .format(java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss"));
        System.out.printf("[%s] %s - %s%n", zeit, level, msg);
        if (e != null) {
            System.out.println("  Caused by: " + e.getClass().getSimpleName()
                + ": " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        try {
            int ergebnis = 10 / 0;
        } catch (ArithmeticException e) {
            // SCHLECHT: Exception-Nachricht verlieren
            // log.error("Fehler!");

            // GUT: Exception als letzten Parameter
            // log.error("Berechnung fehlgeschlagen", e);
            log("ERROR", "Berechnung fehlgeschlagen", e);
        }

        try {
            String text = null;
            text.length();
        } catch (NullPointerException e) {
            log("ERROR", "Unerwarteter Null-Wert", e);
        }

        System.out.println();
        System.out.println("Regel: Exception IMMER als letzten Parameter uebergeben!");
        System.out.println("  log.error(\"Nachricht\", exception);");
    }
}`,
      expectedOutput: '[14:30:00] ERROR - Berechnung fehlgeschlagen\n  Caused by: ArithmeticException: / by zero\n[14:30:00] ERROR - Unerwarteter Null-Wert\n  Caused by: NullPointerException: ...\n\nRegel: Exception IMMER als letzten Parameter uebergeben!\n  log.error(\"Nachricht\", exception);',
      editable: true,
    },
  ],
  quiz: [
    { id: 'slf-q1', question: 'Warum ist Logging besser als System.out.println?', options: ['Es ist schneller', 'Es hat Level, Timestamps und ist konfigurierbar', 'Es gibt keine Ausgabe', 'Es ist farbig'], correctIndex: 1, explanation: 'Logging bietet Level (DEBUG, INFO, WARN, ERROR), Timestamps, konfigurierbare Ausgabe und kann in Dateien geschrieben werden.' },
    { id: 'slf-q2', question: 'Was ist die richtige Reihenfolge der Logging-Level?', options: ['ERROR, WARN, INFO, DEBUG, TRACE', 'TRACE, DEBUG, INFO, WARN, ERROR', 'DEBUG, INFO, WARN, ERROR, TRACE', 'INFO, DEBUG, TRACE, WARN, ERROR'], correctIndex: 1, explanation: 'Von am wenigsten wichtig zu am wichtigsten: TRACE < DEBUG < INFO < WARN < ERROR.' },
    { id: 'slf-q3', question: 'Warum verwendet man Platzhalter {} statt String-Konkatenation beim Logging?', options: ['Es sieht schoener aus', 'Die String-Erzeugung wird nur bei aktivem Level durchgefuehrt (Performance)', 'Platzhalter sind farbig', 'Es gibt keinen Unterschied'], correctIndex: 1, explanation: 'Bei log.debug("User {}", name) wird der String nur erzeugt, wenn DEBUG aktiv ist. Bei log.debug("User " + name) wird die Konkatenation IMMER ausgefuehrt, auch wenn DEBUG deaktiviert ist -- das kostet unnoetig Performance.' },
  ],
  exercises: [],
  keyConceptsDE: ['Logger', 'Logging-Level', 'SLF4J', 'Platzhalter', 'LoggerFactory'],
  transferKnowledge: 'Logging ist universal: Python logging, JavaScript console.log/warn/error, Go log package. Strukturiertes Logging ist in jeder Produktion essentiell.',
  order: 39,
};
