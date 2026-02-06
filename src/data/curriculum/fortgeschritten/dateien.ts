import type { Topic } from '../../../types';

export const dateien: Topic = {
  id: 'dateien',
  moduleId: 'fortgeschritten',
  title: 'Dateien lesen und schreiben',
  description: 'Lerne mit Path, Files.readAllLines, Files.write, Files.exists und Files.createDirectories Dateien zu verarbeiten.',
  content: `
## Dateien lesen und schreiben

Java bietet mit dem \`java.nio.file\`-Paket eine moderne API zur Dateiverarbeitung.
Die wichtigsten Klassen sind **Path** und **Files**.

### Path -- Dateipfade darstellen

Ein \`Path\`-Objekt repraesentiert einen Dateipfad im Dateisystem.
Erstelle Paths mit \`Path.of("pfad/zur/datei.txt")\`.

### Files -- Dateioperationen

Die Klasse \`Files\` bietet statische Methoden fuer alle gaengigen Dateioperationen:
- \`Files.readAllLines(path)\` -- alle Zeilen einer Datei lesen
- \`Files.readString(path)\` -- gesamten Inhalt als String lesen
- \`Files.write(path, inhalt)\` -- Inhalt in eine Datei schreiben
- \`Files.exists(path)\` -- pruefen, ob eine Datei existiert
- \`Files.createDirectories(path)\` -- Verzeichnisse erstellen

### Zeichenkodierung

Standardmaessig verwenden die Methoden **UTF-8**. Du kannst aber auch
eine andere Kodierung angeben, z. B. \`StandardCharsets.ISO_8859_1\`.

### Fehlerbehandlung

Dateioperationen koennen fehlschlagen (Datei nicht gefunden, keine Berechtigung).
Daher erfordern sie eine **Exception-Behandlung** mit try-catch oder throws.
  `,
  codeExamples: [
    {
      title: 'Dateien schreiben und lesen',
      description: 'Grundlegende Dateioperationen mit Path und Files.',
      code: `import java.nio.file.Path;
import java.nio.file.Files;
import java.io.IOException;
import java.util.List;

public class DateienBeispiel {
    public static void main(String[] args) {
        Path datei = Path.of("beispiel.txt");

        try {
            // Datei schreiben
            List<String> zeilen = List.of(
                "Erste Zeile",
                "Zweite Zeile",
                "Dritte Zeile"
            );
            Files.write(datei, zeilen);
            System.out.println("Datei geschrieben!");

            // Pruefen ob Datei existiert
            System.out.println("Existiert: " + Files.exists(datei));
            System.out.println("Groesse: " + Files.size(datei) + " Bytes");

            // Datei lesen -- alle Zeilen
            List<String> gelesen = Files.readAllLines(datei);
            System.out.println("\\nInhalt:");
            for (String zeile : gelesen) {
                System.out.println("  " + zeile);
            }

            // Gesamten Inhalt als String lesen
            String inhalt = Files.readString(datei);
            System.out.println("\\nAnzahl Zeichen: " + inhalt.length());

            // Aufraeumen
            Files.delete(datei);
            System.out.println("Datei geloescht.");

        } catch (IOException e) {
            System.out.println("Fehler: " + e.getMessage());
        }
    }
}`,
      expectedOutput: `Datei geschrieben!
Existiert: true
Groesse: 42 Bytes

Inhalt:
  Erste Zeile
  Zweite Zeile
  Dritte Zeile

Anzahl Zeichen: 42
Datei geloescht.`,
      editable: true,
    },
    {
      title: 'Verzeichnisse erstellen und Dateien anfuegen',
      description: 'Arbeiten mit Verzeichnissen und dem Anfuegen von Inhalten.',
      code: `import java.nio.file.Path;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.io.IOException;
import java.util.List;

public class VerzeichnisBeispiel {
    public static void main(String[] args) {
        Path verzeichnis = Path.of("mein_ordner", "unterordner");
        Path datei = verzeichnis.resolve("notizen.txt");

        try {
            // Verzeichnisse erstellen (inkl. Elternverzeichnisse)
            Files.createDirectories(verzeichnis);
            System.out.println("Verzeichnis erstellt: " + verzeichnis);

            // Datei schreiben
            Files.writeString(datei, "Notiz 1: Java lernen\\n");
            System.out.println("Datei erstellt: " + datei);

            // Text anfuegen (APPEND)
            Files.writeString(datei, "Notiz 2: Ueben!\\n",
                    StandardOpenOption.APPEND);
            Files.writeString(datei, "Notiz 3: Projekt starten\\n",
                    StandardOpenOption.APPEND);

            // Alles lesen
            List<String> zeilen = Files.readAllLines(datei);
            System.out.println("\\nAlle Notizen:");
            for (int i = 0; i < zeilen.size(); i++) {
                System.out.println((i + 1) + ". " + zeilen.get(i));
            }

            // Aufraeumen
            Files.delete(datei);
            Files.delete(verzeichnis);
            Files.delete(Path.of("mein_ordner"));

        } catch (IOException e) {
            System.out.println("Fehler: " + e.getMessage());
        }
    }
}`,
      expectedOutput: `Verzeichnis erstellt: mein_ordner/unterordner
Datei erstellt: mein_ordner/unterordner/notizen.txt

Alle Notizen:
1. Notiz 1: Java lernen
2. Notiz 2: Ueben!
3. Notiz 3: Projekt starten`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'dateien-q1',
      question: 'Welche Methode liest alle Zeilen einer Datei als Liste von Strings?',
      options: ['Files.read(path)', 'Files.readAllLines(path)', 'Files.readString(path)', 'Files.getLines(path)'],
      correctIndex: 1,
      explanation: 'Files.readAllLines(path) gibt eine List<String> zurueck, wobei jedes Listenelement einer Zeile der Datei entspricht.',
    },
    {
      id: 'dateien-q2',
      question: 'Welche Option brauchst du, um Text an eine bestehende Datei anzufuegen statt sie zu ueberschreiben?',
      options: ['StandardOpenOption.CREATE', 'StandardOpenOption.WRITE', 'StandardOpenOption.APPEND', 'StandardOpenOption.ADD'],
      correctIndex: 2,
      explanation: 'StandardOpenOption.APPEND fuegt Inhalte am Ende der Datei an. Ohne diese Option wird die Datei standardmaessig ueberschrieben.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Path.of() erstellt Pfadobjekte, Files bietet statische Methoden fuer Dateioperationen',
    'Files.readAllLines() liest alle Zeilen, Files.write() schreibt Inhalte',
    'Files.exists() prueft Existenz, Files.createDirectories() erstellt Ordnerstrukturen',
    'Dateioperationen erfordern Exception-Behandlung (IOException)',
  ],
  transferKnowledge: 'Dateiverarbeitung ist in jeder Programmiersprache essenziell. Die Konzepte (Pfade, Lesen, Schreiben, Verzeichnisse) sind ueberall aehnlich. In Python nutzt man open(), in JavaScript fs.readFile() -- die Grundidee ist gleich.',
  order: 31,
};
