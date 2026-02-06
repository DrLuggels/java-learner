import type { Topic } from '../../../types';

export const softwaretests: Topic = {
  id: 'softwaretests',
  moduleId: 'frameworks',
  title: 'Softwaretests',
  description: 'Warum testen? Testpyramide, Testarten (Unit, Integration, E2E), TDD und Red-Green-Refactor.',
  content: `# Softwaretests — Qualitaet sichern

**Softwaretests** stellen sicher, dass Code korrekt funktioniert und auch nach Aenderungen fehlerfrei bleibt. Ohne Tests ist jede Codeaenderung ein Risiko.

## Warum testen?
- **Fehler frueh finden**: Je spaeter ein Fehler entdeckt wird, desto teurer ist die Behebung.
- **Refactoring ermoeglichen**: Tests geben Sicherheit, dass Umstrukturierungen nichts kaputt machen.
- **Dokumentation**: Tests beschreiben, wie sich der Code verhalten soll.
- **Vertrauen**: Automatisierte Tests schaffen Vertrauen in die Software.

## Die Testpyramide
Die **Testpyramide** beschreibt das ideale Verhaeltnis von Testarten:
- **Unit-Tests** (Basis, viele): Testen einzelne Methoden/Klassen isoliert. Schnell und guenstig.
- **Integrationstests** (Mitte, maessig): Testen das Zusammenspiel mehrerer Komponenten.
- **End-to-End-Tests** (Spitze, wenige): Testen das gesamte System aus Benutzersicht. Langsam und teuer.

## TDD — Test-Driven Development
Bei **TDD** schreibt man den Test **vor** dem Produktivcode. Der Zyklus heisst **Red-Green-Refactor**:
1. **Red**: Einen fehlschlagenden Test schreiben.
2. **Green**: Den minimalen Code schreiben, damit der Test besteht.
3. **Refactor**: Den Code verbessern, ohne die Tests zu brechen.

TDD fuehrt zu besser strukturiertem, testbarem Code und verhindert Ueberengineering.`,
  codeExamples: [
    {
      title: 'TDD-Zyklus: Red-Green-Refactor',
      description: 'Ein Taschenrechner wird testgetrieben entwickelt.',
      code: `// Schritt 1: RED — Test schreiben (schlaegt fehl, weil Klasse noch nicht existiert)
// Schritt 2: GREEN — Minimalen Code schreiben
// Schritt 3: REFACTOR — Code verbessern

// === Taschenrechner.java (Produktivcode) ===
public class Taschenrechner {

    public int addiere(int a, int b) {
        return a + b;
    }

    public int subtrahiere(int a, int b) {
        return a - b;
    }

    public int dividiere(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Division durch Null!");
        }
        return a / b;
    }

    // Demonstration des TDD-Zyklus
    public static void main(String[] args) {
        Taschenrechner calc = new Taschenrechner();

        // Simulierte Tests (normalerweise mit JUnit)
        // RED: Test schreiben -> GREEN: Implementierung -> REFACTOR
        assert calc.addiere(2, 3) == 5 : "Addition fehlgeschlagen";
        assert calc.subtrahiere(10, 4) == 6 : "Subtraktion fehlgeschlagen";
        assert calc.dividiere(10, 2) == 5 : "Division fehlgeschlagen";

        // Exception-Test
        try {
            calc.dividiere(10, 0);
            System.out.println("FEHLER: Exception erwartet!");
        } catch (ArithmeticException e) {
            System.out.println("Korrekt: " + e.getMessage());
        }

        System.out.println("Alle Tests bestanden!");
        System.out.println("TDD-Zyklus: RED -> GREEN -> REFACTOR");
    }
}`,
      expectedOutput: `Korrekt: Division durch Null!
Alle Tests bestanden!
TDD-Zyklus: RED -> GREEN -> REFACTOR`,
      editable: true
    },
    {
      title: 'Testpyramide: Verschiedene Testebenen',
      description: 'Demonstration der drei Testebenen: Unit, Integration, E2E.',
      code: `import java.util.ArrayList;
import java.util.List;

public class TestpyramideBeispiel {

    // --- Produktivcode ---
    static class BenutzerService {
        private final BenutzerRepository repo;

        BenutzerService(BenutzerRepository repo) { this.repo = repo; }

        String begruessung(String name) {
            if (name == null || name.isBlank()) {
                return "Hallo, Gast!";
            }
            return "Hallo, " + name + "!";
        }

        boolean registrieren(String name) {
            if (name == null || name.isBlank()) return false;
            return repo.speichern(name);
        }
    }

    static class BenutzerRepository {
        private final List<String> datenbank = new ArrayList<>();

        boolean speichern(String name) {
            if (datenbank.contains(name)) return false;
            return datenbank.add(name);
        }

        boolean existiert(String name) { return datenbank.contains(name); }
    }

    public static void main(String[] args) {
        System.out.println("=== UNIT-TEST (isoliert) ===");
        BenutzerService service = new BenutzerService(new BenutzerRepository());
        assert service.begruessung("Anna").equals("Hallo, Anna!");
        assert service.begruessung("").equals("Hallo, Gast!");
        System.out.println("  begruessung() funktioniert korrekt.");

        System.out.println("\\n=== INTEGRATIONS-TEST (Komponenten zusammen) ===");
        BenutzerRepository repo = new BenutzerRepository();
        BenutzerService intService = new BenutzerService(repo);
        assert intService.registrieren("Max") == true;
        assert repo.existiert("Max") == true;
        assert intService.registrieren("Max") == false; // Duplikat
        System.out.println("  Registrierung + Repository funktionieren zusammen.");

        System.out.println("\\n=== E2E-TEST (gesamter Ablauf) ===");
        BenutzerRepository e2eRepo = new BenutzerRepository();
        BenutzerService e2eService = new BenutzerService(e2eRepo);
        e2eService.registrieren("Lisa");
        String gruss = e2eService.begruessung("Lisa");
        boolean existiert = e2eRepo.existiert("Lisa");
        System.out.println("  " + gruss + " | Existiert: " + existiert);

        System.out.println("\\nTestpyramide: Viele Unit > Einige Integration > Wenige E2E");
    }
}`,
      expectedOutput: `=== UNIT-TEST (isoliert) ===
  begruessung() funktioniert korrekt.

=== INTEGRATIONS-TEST (Komponenten zusammen) ===
  Registrierung + Repository funktionieren zusammen.

=== E2E-TEST (gesamter Ablauf) ===
  Hallo, Lisa! | Existiert: true

Testpyramide: Viele Unit > Einige Integration > Wenige E2E`,
      editable: true
    }
  ],
  quiz: [
    {
      id: 'softwaretests-q1',
      question: 'Was ist die richtige Reihenfolge im TDD-Zyklus?',
      options: [
        'Green -> Red -> Refactor',
        'Refactor -> Red -> Green',
        'Red -> Green -> Refactor',
        'Red -> Refactor -> Green'
      ],
      correctIndex: 2,
      explanation: 'Der TDD-Zyklus lautet Red-Green-Refactor: Zuerst einen fehlschlagenden Test schreiben (Red), dann den minimalen Code fuer das Bestehen (Green), danach den Code sauber umstrukturieren (Refactor) — immer mit gruenen Tests.'
    },
    {
      id: 'softwaretests-q2',
      question: 'Welche Testebene bildet die Basis der Testpyramide?',
      options: [
        'End-to-End-Tests',
        'Integrationstests',
        'Unit-Tests',
        'Manuelle Tests'
      ],
      correctIndex: 2,
      explanation: 'Unit-Tests bilden die breite Basis der Testpyramide. Sie sind schnell, guenstig und testen isolierte Einheiten. Es sollte viele Unit-Tests, maessig viele Integrationstests und wenige E2E-Tests geben.'
    }
  ],
  exercises: [],
  keyConceptsDE: [
    'Testen: Fehler frueh finden, Refactoring ermoeglichen, Dokumentation',
    'Testpyramide: Unit (viele) > Integration (maessig) > E2E (wenige)',
    'Unit-Test: Einzelne Methode/Klasse isoliert testen',
    'TDD: Test vor Code schreiben — Red-Green-Refactor',
    'Integrationstests pruefen das Zusammenspiel von Komponenten'
  ],
  transferKnowledge: 'Softwaretests sind in der professionellen Entwicklung unverzichtbar. CI/CD-Pipelines (Jenkins, GitHub Actions) fuehren Tests automatisch bei jedem Commit aus. TDD wird in agilen Teams (Scrum, XP) praktiziert. Die Testpyramide hilft, die richtige Balance zu finden und teure E2E-Tests zu minimieren.',
  order: 50
};
