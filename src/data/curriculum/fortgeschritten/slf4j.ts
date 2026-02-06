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
  ],
  quiz: [
    { id: 'slf-q1', question: 'Warum ist Logging besser als System.out.println?', options: ['Es ist schneller', 'Es hat Level, Timestamps und ist konfigurierbar', 'Es gibt keine Ausgabe', 'Es ist farbig'], correctIndex: 1, explanation: 'Logging bietet Level (DEBUG, INFO, WARN, ERROR), Timestamps, konfigurierbare Ausgabe und kann in Dateien geschrieben werden.' },
    { id: 'slf-q2', question: 'Was ist die richtige Reihenfolge der Logging-Level?', options: ['ERROR, WARN, INFO, DEBUG, TRACE', 'TRACE, DEBUG, INFO, WARN, ERROR', 'DEBUG, INFO, WARN, ERROR, TRACE', 'INFO, DEBUG, TRACE, WARN, ERROR'], correctIndex: 1, explanation: 'Von am wenigsten wichtig zu am wichtigsten: TRACE < DEBUG < INFO < WARN < ERROR.' },
  ],
  exercises: [],
  keyConceptsDE: ['Logger', 'Logging-Level', 'SLF4J', 'Platzhalter', 'LoggerFactory'],
  transferKnowledge: 'Logging ist universal: Python logging, JavaScript console.log/warn/error, Go log package. Strukturiertes Logging ist in jeder Produktion essentiell.',
  order: 39,
};
