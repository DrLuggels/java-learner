import type { Topic } from '../../../types';

export const unitTests: Topic = {
  id: 'unit-tests',
  moduleId: 'frameworks',
  title: 'Unit-Tests mit JUnit 5',
  description: 'JUnit 5, @Test, Assertions (assertEquals, assertTrue, assertThrows), @BeforeEach und @ParameterizedTest.',
  content: `# Unit-Tests mit JUnit 5

**JUnit 5** ist das Standard-Testframework fuer Java. Es besteht aus drei Modulen: **JUnit Platform** (Testausfuehrung), **JUnit Jupiter** (Programmiermodell) und **JUnit Vintage** (Abwaertskompatibilitaet).

## @Test — Testmethoden
Jede Methode mit \`@Test\` wird als Testfall ausgefuehrt. Testmethoden sind \`void\`, nicht \`static\` und haben keine Parameter.

## Assertions — Ergebnisse pruefen
- \`assertEquals(erwartet, tatsaechlich)\` — prueft Gleichheit.
- \`assertTrue(bedingung)\` / \`assertFalse(bedingung)\` — prueft boolesche Werte.
- \`assertNull(objekt)\` / \`assertNotNull(objekt)\` — prueft auf null.
- \`assertThrows(ExceptionClass, () -> ...)\` — prueft, ob eine Exception geworfen wird.
- \`assertAll()\` — fuehrt mehrere Assertions zusammen aus.

## @BeforeEach und @AfterEach
\`@BeforeEach\` wird **vor jedem** Testfall ausgefuehrt (Setup). \`@AfterEach\` nach jedem Testfall (Cleanup). Damit wird redundanter Setup-Code vermieden.

## @ParameterizedTest — Parametrisierte Tests
Mit \`@ParameterizedTest\` und \`@ValueSource\`, \`@CsvSource\` oder \`@MethodSource\` kann derselbe Test mit verschiedenen Eingabewerten ausgefuehrt werden — ideal fuer Grenzwerttests.

## Testbenennung
\`@DisplayName\` gibt Tests lesbare, beschreibende Namen. Konvention: Tests beschreiben das **erwartete Verhalten**, nicht die Implementierung.`,
  codeExamples: [
    {
      title: 'JUnit 5 Grundlagen: @Test, Assertions, @BeforeEach',
      description: 'Testklasse mit verschiedenen Assertion-Methoden und Setup.',
      code: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

// Produktivcode
class Warenkorb {
    private final java.util.List<String> artikel = new java.util.ArrayList<>();
    private double gesamtpreis = 0.0;

    void hinzufuegen(String artikel, double preis) {
        this.artikel.add(artikel);
        this.gesamtpreis += preis;
    }

    void leeren() {
        artikel.clear();
        gesamtpreis = 0.0;
    }

    int getAnzahl() { return artikel.size(); }
    double getGesamtpreis() { return gesamtpreis; }
    boolean istLeer() { return artikel.isEmpty(); }
}

// Testklasse
class WarenkorbTest {

    private Warenkorb warenkorb;

    @BeforeEach
    void setUp() {
        warenkorb = new Warenkorb(); // Frischer Warenkorb vor jedem Test
    }

    @Test
    @DisplayName("Neuer Warenkorb ist leer")
    void neuerWarenkorbIstLeer() {
        assertTrue(warenkorb.istLeer());
        assertEquals(0, warenkorb.getAnzahl());
        assertEquals(0.0, warenkorb.getGesamtpreis());
    }

    @Test
    @DisplayName("Artikel hinzufuegen erhoeht Anzahl und Preis")
    void artikelHinzufuegen() {
        warenkorb.hinzufuegen("Laptop", 999.99);
        warenkorb.hinzufuegen("Maus", 29.99);

        assertAll("Warenkorb nach Hinzufuegen",
            () -> assertFalse(warenkorb.istLeer()),
            () -> assertEquals(2, warenkorb.getAnzahl()),
            () -> assertEquals(1029.98, warenkorb.getGesamtpreis(), 0.01)
        );
    }

    @Test
    @DisplayName("Leeren setzt Warenkorb zurueck")
    void leerenSetztZurueck() {
        warenkorb.hinzufuegen("Buch", 19.99);
        warenkorb.leeren();

        assertTrue(warenkorb.istLeer());
        assertEquals(0.0, warenkorb.getGesamtpreis());
    }
}`,
      expectedOutput: `// JUnit 5 Testergebnisse:
// WarenkorbTest
//   [OK] Neuer Warenkorb ist leer
//   [OK] Artikel hinzufuegen erhoeht Anzahl und Preis
//   [OK] Leeren setzt Warenkorb zurueck
// 3 Tests erfolgreich`,
      editable: true
    },
    {
      title: '@ParameterizedTest und assertThrows',
      description: 'Parametrisierte Tests und Exception-Tests mit JUnit 5.',
      code: `import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.*;
import static org.junit.jupiter.api.Assertions.*;

// Produktivcode
class PasswortValidator {

    static boolean istGueltig(String passwort) {
        if (passwort == null) {
            throw new IllegalArgumentException("Passwort darf nicht null sein");
        }
        return passwort.length() >= 8
            && passwort.chars().anyMatch(Character::isUpperCase)
            && passwort.chars().anyMatch(Character::isDigit);
    }
}

// Testklasse
class PasswortValidatorTest {

    @ParameterizedTest(name = "Gueltiges Passwort: {0}")
    @ValueSource(strings = {"Passwort1", "MeinGeheim99", "Stark1234"})
    @DisplayName("Gueltige Passwoerter werden akzeptiert")
    void gueltigePasswoerter(String passwort) {
        assertTrue(PasswortValidator.istGueltig(passwort));
    }

    @ParameterizedTest(name = "Ungueltiges Passwort: {0}")
    @ValueSource(strings = {"kurz", "keinezahl", "12345678", "Kurz1"})
    @DisplayName("Ungueltige Passwoerter werden abgelehnt")
    void ungueltigePasswoerter(String passwort) {
        assertFalse(PasswortValidator.istGueltig(passwort));
    }

    @ParameterizedTest(name = "Passwort ''{0}'' hat Mindestlaenge {1}")
    @CsvSource({
        "Test1234, true",
        "Ab1, false",
        "LangesPasswort9, true"
    })
    @DisplayName("CSV-basierte Parametrisierung")
    void csvParametrisiert(String passwort, boolean erwartet) {
        assertEquals(erwartet, PasswortValidator.istGueltig(passwort));
    }

    @Test
    @DisplayName("Null-Passwort wirft IllegalArgumentException")
    void nullPasswortWirftException() {
        IllegalArgumentException ex = assertThrows(
            IllegalArgumentException.class,
            () -> PasswortValidator.istGueltig(null)
        );
        assertEquals("Passwort darf nicht null sein", ex.getMessage());
    }
}`,
      expectedOutput: `// JUnit 5 Testergebnisse:
// PasswortValidatorTest
//   [OK] Gueltige Passwoerter werden akzeptiert
//     [OK] Gueltiges Passwort: Passwort1
//     [OK] Gueltiges Passwort: MeinGeheim99
//     [OK] Gueltiges Passwort: Stark1234
//   [OK] Ungueltige Passwoerter werden abgelehnt (4 Tests)
//   [OK] CSV-basierte Parametrisierung (3 Tests)
//   [OK] Null-Passwort wirft IllegalArgumentException
// 11 Tests erfolgreich`,
      editable: true
    }
  ],
  quiz: [
    {
      id: 'unit-tests-q1',
      question: 'Wofuer wird @BeforeEach in JUnit 5 verwendet?',
      options: [
        'Um einen Test zu ueberspringen',
        'Um Code vor jedem einzelnen Testfall auszufuehren',
        'Um den Test als parametrisiert zu markieren',
        'Um die Testergebnisse zu loggen'
      ],
      correctIndex: 1,
      explanation: '@BeforeEach markiert eine Methode, die vor jedem Testfall ausgefuehrt wird. Typischerweise wird sie fuer Setup-Code verwendet: z.B. ein neues Objekt erstellen, damit jeder Test mit einem sauberen Zustand startet.'
    },
    {
      id: 'unit-tests-q2',
      question: 'Wie prueft man in JUnit 5, ob eine Methode eine bestimmte Exception wirft?',
      options: [
        'try-catch im Test verwenden',
        'assertEquals(Exception.class, methode())',
        'assertThrows(ExceptionClass.class, () -> methode())',
        '@ExpectedException Annotation verwenden'
      ],
      correctIndex: 2,
      explanation: 'assertThrows() nimmt den erwarteten Exception-Typ und ein Lambda (Executable). Es prueft, ob die Ausfuehrung des Lambdas genau diese Exception wirft, und gibt die geworfene Exception zurueck, um weitere Pruefungen (z.B. Nachricht) zu ermoeglichen.'
    }
  ],
  exercises: ['unit-tests-01'],
  keyConceptsDE: [
    'JUnit 5: @Test markiert Testmethoden',
    'Assertions: assertEquals, assertTrue, assertThrows, assertAll',
    '@BeforeEach: Setup vor jedem Test, @AfterEach: Cleanup danach',
    '@ParameterizedTest: Derselbe Test mit verschiedenen Eingaben',
    '@DisplayName: Lesbare, beschreibende Testnamen'
  ],
  transferKnowledge: 'JUnit 5 ist der Standard fuer Java-Tests in der Industrie. Jedes Build-Tool (Maven, Gradle) integriert JUnit. In CI/CD-Pipelines werden JUnit-Tests automatisch ausgefuehrt. Die Assertions-Konzepte finden sich in allen Testframeworks wieder: Jest (JavaScript), pytest (Python), NUnit (C#). @ParameterizedTest entspricht Data-Driven Testing.',
  order: 51
};
