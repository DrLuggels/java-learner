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
  ],
  quiz: [
    { id: 'opt-q1', question: 'Warum sollte man Optional.get() vermeiden?', options: ['Es ist langsam', 'Es wirft NoSuchElementException wenn leer', 'Es gibt immer null zurück', 'Es ist deprecated'], correctIndex: 1, explanation: 'Optional.get() wirft NoSuchElementException wenn das Optional leer ist. Besser: orElse(), map(), ifPresent().' },
    { id: 'opt-q2', question: 'Was gibt Optional.ofNullable(null) zurück?', options: ['null', 'NullPointerException', 'Optional.empty()', 'Optional.of(null)'], correctIndex: 2, explanation: 'Optional.ofNullable(null) gibt ein leeres Optional zurück. Optional.of(null) würde eine NullPointerException werfen!' },
  ],
  exercises: ['optionals-01'],
  keyConceptsDE: ['Optional', 'orElse', 'map', 'flatMap', 'ifPresent', 'NullPointerException vermeiden'],
  transferKnowledge: 'Optionals gibt es überall: Kotlin null-safety (?.), Swift Optional, Rust Option<T>, TypeScript optional chaining (?.). Null-Sicherheit ist ein modernes Must-Have.',
  order: 42,
};
