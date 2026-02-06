import type { Topic } from '../../../types';

export const mockito: Topic = {
  id: 'mockito',
  moduleId: 'frameworks',
  title: 'Mockito',
  description: 'Mocking-Konzept, mock(), when/thenReturn, verify, @Mock, @InjectMocks und ArgumentMatchers.',
  content: `# Mockito — Mocking in Unit-Tests

**Mockito** ist das beliebteste Mocking-Framework fuer Java. Es ermoeglicht das Erstellen von **Mock-Objekten** — simulierte Abhaengigkeiten, die das Verhalten realer Objekte nachahmen.

## Warum Mocking?
Unit-Tests sollen Klassen **isoliert** testen. Wenn eine Klasse von einer Datenbank, einem Webservice oder einer anderen Klasse abhaengt, ersetzt man diese Abhaengigkeit durch einen **Mock**. So testet man nur die eigene Logik.

## mock() und when/thenReturn
Mit \`Mockito.mock(Klasse.class)\` erstellt man ein Mock-Objekt. Mit \`when(mock.methode()).thenReturn(wert)\` definiert man, was der Mock bei einem Aufruf zurueckgeben soll (**Stubbing**).

## verify — Aufrufe pruefen
\`verify(mock).methode()\` prueft, ob eine Methode auf dem Mock aufgerufen wurde. Mit \`verify(mock, times(2))\`, \`never()\` oder \`atLeastOnce()\` kann die Anzahl der Aufrufe geprueft werden.

## Annotationen: @Mock und @InjectMocks
\`@Mock\` erstellt automatisch ein Mock-Objekt. \`@InjectMocks\` erstellt die zu testende Klasse und injiziert alle Mocks automatisch. Aktiviert mit \`@ExtendWith(MockitoExtension.class)\`.

## ArgumentMatchers
\`any()\`, \`anyString()\`, \`eq()\`, \`argThat()\` erlauben flexible Argument-Pruefungen beim Stubbing und Verifizieren. Wichtig: Sobald ein Matcher verwendet wird, muessen **alle** Argumente Matcher sein.`,
  codeExamples: [
    {
      title: 'Mockito Grundlagen: mock, when, verify',
      description: 'Mock-Objekte erstellen, Verhalten definieren und Aufrufe verifizieren.',
      code: `import org.mockito.Mockito;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

// Abhaengigkeit (wird gemockt)
interface BenutzerRepository {
    String findeName(int id);
    boolean speichern(String name);
    void loeschen(int id);
}

// Zu testende Klasse
class BenutzerService {
    private final BenutzerRepository repo;

    BenutzerService(BenutzerRepository repo) {
        this.repo = repo;
    }

    String begruessung(int benutzerId) {
        String name = repo.findeName(benutzerId);
        if (name == null) return "Benutzer nicht gefunden!";
        return "Hallo, " + name + "!";
    }

    boolean registrieren(String name) {
        if (name == null || name.isBlank()) return false;
        return repo.speichern(name);
    }
}

// Testklasse
class BenutzerServiceTest {

    @Test
    void begruessungMitGueltigemBenutzer() {
        // Arrange: Mock erstellen und Verhalten definieren
        BenutzerRepository mockRepo = mock(BenutzerRepository.class);
        when(mockRepo.findeName(1)).thenReturn("Anna");

        BenutzerService service = new BenutzerService(mockRepo);

        // Act: Methode ausfuehren
        String ergebnis = service.begruessung(1);

        // Assert: Ergebnis und Aufrufe pruefen
        assertEquals("Hallo, Anna!", ergebnis);
        verify(mockRepo).findeName(1);          // Wurde aufgerufen?
        verify(mockRepo, never()).speichern(anyString()); // Nicht aufgerufen?
    }

    @Test
    void begruessungMitUnbekanntemBenutzer() {
        BenutzerRepository mockRepo = mock(BenutzerRepository.class);
        when(mockRepo.findeName(99)).thenReturn(null);

        BenutzerService service = new BenutzerService(mockRepo);
        String ergebnis = service.begruessung(99);

        assertEquals("Benutzer nicht gefunden!", ergebnis);
        verify(mockRepo).findeName(99);
    }
}`,
      expectedOutput: `// JUnit 5 + Mockito Testergebnisse:
// BenutzerServiceTest
//   [OK] begruessungMitGueltigemBenutzer
//   [OK] begruessungMitUnbekanntemBenutzer
// 2 Tests erfolgreich`,
      editable: true
    },
    {
      title: '@Mock, @InjectMocks und ArgumentMatchers',
      description: 'Annotationsbasiertes Mocking und flexible Argument-Pruefungen.',
      code: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;
import static org.junit.jupiter.api.Assertions.*;

// Abhaengigkeiten
interface EmailService {
    boolean senden(String empfaenger, String betreff, String text);
}

interface BenutzerDB {
    boolean existiert(String name);
}

// Zu testende Klasse
class RegistrierungsService {
    private final BenutzerDB db;
    private final EmailService email;

    RegistrierungsService(BenutzerDB db, EmailService email) {
        this.db = db;
        this.email = email;
    }

    String registrieren(String name, String emailAddr) {
        if (db.existiert(name)) return "Name bereits vergeben!";
        email.senden(emailAddr, "Willkommen", "Hallo " + name);
        return "Registrierung erfolgreich!";
    }
}

// Testklasse mit Annotationen
@ExtendWith(MockitoExtension.class)
class RegistrierungsServiceTest {

    @Mock BenutzerDB mockDB;
    @Mock EmailService mockEmail;
    @InjectMocks RegistrierungsService service;

    @Test
    void erfolgreicheRegistrierung() {
        // Stubbing mit ArgumentMatcher
        when(mockDB.existiert(anyString())).thenReturn(false);
        when(mockEmail.senden(anyString(), anyString(), anyString()))
            .thenReturn(true);

        String ergebnis = service.registrieren("Max", "max@test.de");

        assertEquals("Registrierung erfolgreich!", ergebnis);

        // Verify mit konkreten Werten
        verify(mockDB).existiert("Max");
        verify(mockEmail).senden(
            eq("max@test.de"),       // Genauer Wert
            eq("Willkommen"),        // Genauer Wert
            argThat(text -> text.contains("Max"))  // Flexibler Matcher
        );
    }

    @Test
    void registrierungFehlgeschlagenBeiDuplikat() {
        when(mockDB.existiert("Max")).thenReturn(true);

        String ergebnis = service.registrieren("Max", "max@test.de");

        assertEquals("Name bereits vergeben!", ergebnis);
        verify(mockEmail, never()).senden(anyString(), anyString(), anyString());
    }
}`,
      expectedOutput: `// JUnit 5 + Mockito Testergebnisse:
// RegistrierungsServiceTest
//   [OK] erfolgreicheRegistrierung
//   [OK] registrierungFehlgeschlagenBeiDuplikat
// 2 Tests erfolgreich`,
      editable: true
    },
    {
      title: 'thenThrow, doAnswer und Capture',
      description: 'Fortgeschrittene Mockito-Techniken: Exceptions werfen, benutzerdefinierte Antworten und Argument-Capture.',
      code: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

interface Datenbank {
    void speichern(String key, String value);
    String laden(String key);
}

class CacheService {
    private final Datenbank db;

    CacheService(Datenbank db) { this.db = db; }

    String ladeOderBerechne(String key) {
        try {
            String wert = db.laden(key);
            return wert != null ? wert : "berechnet:" + key;
        } catch (RuntimeException e) {
            return "fallback:" + key;
        }
    }

    void speichernMitLog(String key, String value) {
        db.speichern(key, value);
    }
}

@ExtendWith(MockitoExtension.class)
class CacheServiceTest {

    @Mock Datenbank mockDB;
    @InjectMocks CacheService service;

    @Test
    void thenThrow_fallbackBeiDatenbankfehler() {
        // Mock wirft Exception
        when(mockDB.laden("fehler")).thenThrow(new RuntimeException("DB down"));

        String ergebnis = service.ladeOderBerechne("fehler");

        assertEquals("fallback:fehler", ergebnis);
    }

    @Test
    void doAnswer_benutzerdefinierteAntwort() {
        // doAnswer: Flexibles Verhalten definieren
        when(mockDB.laden(anyString())).thenAnswer(invocation -> {
            String key = invocation.getArgument(0);
            return key.startsWith("cache:") ? "gecached!" : null;
        });

        assertEquals("gecached!", service.ladeOderBerechne("cache:user1"));
        assertEquals("berechnet:user2", service.ladeOderBerechne("user2"));
    }

    @Test
    void argumentCaptor_argumentePruefen() {
        // ArgumentCaptor: Argumente einfangen und pruefen
        ArgumentCaptor<String> keyCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> valueCaptor = ArgumentCaptor.forClass(String.class);

        service.speichernMitLog("user1", "Anna");
        service.speichernMitLog("user2", "Bob");

        verify(mockDB, times(2)).speichern(keyCaptor.capture(), valueCaptor.capture());

        assertEquals(java.util.List.of("user1", "user2"), keyCaptor.getAllValues());
        assertEquals(java.util.List.of("Anna", "Bob"), valueCaptor.getAllValues());
    }
}`,
      expectedOutput: `// JUnit 5 + Mockito Testergebnisse:
// CacheServiceTest
//   [OK] thenThrow_fallbackBeiDatenbankfehler
//   [OK] doAnswer_benutzerdefinierteAntwort
//   [OK] argumentCaptor_argumentePruefen
// 3 Tests erfolgreich`,
      editable: true
    }
  ],
  quiz: [
    {
      id: 'mockito-q1',
      question: 'Was bewirkt when(mock.methode()).thenReturn(wert)?',
      options: [
        'Es ruft die echte Methode auf und speichert den Rueckgabewert',
        'Es definiert, welchen Wert der Mock bei einem Aufruf zurueckgibt',
        'Es prueft, ob die Methode aufgerufen wurde',
        'Es erstellt einen neuen Mock'
      ],
      correctIndex: 1,
      explanation: 'when/thenReturn definiert das Verhalten eines Mocks (Stubbing). Wenn die angegebene Methode mit den angegebenen Argumenten aufgerufen wird, gibt der Mock den definierten Wert zurueck, statt die echte Implementierung auszufuehren.'
    },
    {
      id: 'mockito-q2',
      question: 'Was macht verify(mock, never()).methode()?',
      options: [
        'Es prueft, ob die Methode mindestens einmal aufgerufen wurde',
        'Es prueft, ob die Methode genau einmal aufgerufen wurde',
        'Es prueft, ob die Methode nie aufgerufen wurde',
        'Es verhindert zukuenftige Aufrufe der Methode'
      ],
      correctIndex: 2,
      explanation: 'verify(mock, never()).methode() stellt sicher, dass die angegebene Methode auf dem Mock kein einziges Mal aufgerufen wurde. Das ist nuetzlich, um zu pruefen, dass bestimmte Seiteneffekte (z.B. E-Mail senden) unter bestimmten Bedingungen nicht stattfinden.'
    },
    {
      id: 'mockito-q3',
      question: 'Was ist der Unterschied zwischen @Mock und @InjectMocks?',
      options: [
        'Es gibt keinen Unterschied',
        '@Mock erstellt ein Mock-Objekt, @InjectMocks erstellt die zu testende Klasse und injiziert die Mocks automatisch',
        '@InjectMocks erstellt Mocks, @Mock die echte Klasse',
        '@Mock ist fuer Interfaces, @InjectMocks fuer Klassen',
      ],
      correctIndex: 1,
      explanation: '@Mock erstellt ein Mock-Objekt (simulierte Abhaengigkeit). @InjectMocks erstellt eine echte Instanz der zu testenden Klasse und injiziert alle mit @Mock annotierten Objekte automatisch in deren Konstruktor oder Felder.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Mock-Objekte: Simulierte Abhaengigkeiten fuer isolierte Tests',
    'when/thenReturn: Verhalten des Mocks definieren (Stubbing)',
    'verify: Pruefen, ob und wie oft Methoden aufgerufen wurden',
    '@Mock und @InjectMocks: Annotationsbasiertes Mocking',
    'ArgumentMatchers: any(), eq(), argThat() fuer flexible Pruefungen'
  ],
  transferKnowledge: 'Mocking ist eine Kernkompetenz in der professionellen Entwicklung. In Spring Boot-Projekten werden Services, Repositories und externe APIs gemockt. Das Dependency-Injection-Prinzip macht Code testbar durch austauschbare Abhaengigkeiten. Aehnliche Konzepte gibt es in Jest (JavaScript), unittest.mock (Python) und Moq (.NET).',
  order: 52
};
