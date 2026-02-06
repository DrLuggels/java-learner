import type { Topic } from '../../../types';

export const ioStreams: Topic = {
  id: 'io-streams',
  moduleId: 'fortgeschritten',
  title: 'IO-Streams',
  description: 'Daten lesen und schreiben mit InputStreams, OutputStreams, Readers und Writers.',
  content: `## Byte-Streams vs. Zeichen-Streams

Java unterscheidet:
- **Byte-Streams**: \`InputStream\` / \`OutputStream\` — für Binärdaten (Bilder, etc.)
- **Zeichen-Streams**: \`Reader\` / \`Writer\` — für Text

## Wichtige Klassen

| Klasse | Typ | Verwendung |
|---|---|---|
| \`FileInputStream\` | Byte | Datei lesen (binär) |
| \`FileOutputStream\` | Byte | Datei schreiben (binär) |
| \`FileReader\` | Zeichen | Textdatei lesen |
| \`FileWriter\` | Zeichen | Textdatei schreiben |
| \`BufferedReader\` | Zeichen | Zeilenweises Lesen (effizient) |
| \`BufferedWriter\` | Zeichen | Gepuffertes Schreiben |

## try-with-resources

Streams müssen **immer geschlossen** werden! Am besten mit try-with-resources:

\`\`\`java
try (var reader = new BufferedReader(new FileReader("datei.txt"))) {
    String zeile;
    while ((zeile = reader.readLine()) != null) {
        System.out.println(zeile);
    }
} // reader wird automatisch geschlossen
\`\`\`

## Merke dir
- Immer \`try-with-resources\` verwenden
- \`BufferedReader/Writer\` für bessere Performance
- Seit Java 11: \`Files.readString()\` und \`Files.writeString()\` als einfachere Alternative`,
  codeExamples: [
    {
      title: 'IO-Konzepte demonstrieren',
      description: 'Simulation von Lese/Schreib-Operationen',
      code: `import java.io.*;

public class Main {
    public static void main(String[] args) {
        // IO-Streams koennen im Browser keine echten Dateien lesen
        // Hier das Konzept mit StringReader/StringWriter:

        String daten = "Zeile 1\\nZeile 2\\nZeile 3";

        // Lesen mit BufferedReader (aus String statt Datei)
        try (var reader = new BufferedReader(new StringReader(daten))) {
            String zeile;
            int nr = 1;
            while ((zeile = reader.readLine()) != null) {
                System.out.println(nr + ": " + zeile);
                nr++;
            }
        } catch (IOException e) {
            System.err.println("Lesefehler: " + e.getMessage());
        }

        // Schreiben mit StringWriter
        try (var writer = new StringWriter()) {
            writer.write("Hallo ");
            writer.write("Welt!");
            System.out.println("Geschrieben: " + writer.toString());
        } catch (IOException e) {
            System.err.println("Schreibfehler: " + e.getMessage());
        }
    }
}`,
      expectedOutput: '1: Zeile 1\n2: Zeile 2\n3: Zeile 3\nGeschrieben: Hallo Welt!',
      editable: true,
    },
    {
      title: 'ByteArrayStreams fuer Binaerdaten',
      description: 'Byte-Streams am Beispiel von ByteArrayInputStream und ByteArrayOutputStream.',
      code: `import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // Byte-Daten schreiben
        try (var baos = new ByteArrayOutputStream()) {
            baos.write("Hallo".getBytes());
            baos.write(' ');
            baos.write("Welt".getBytes());

            byte[] daten = baos.toByteArray();
            System.out.println("Geschrieben: " + daten.length + " Bytes");
            System.out.println("Inhalt: " + new String(daten));
        }

        // Byte-Daten lesen
        byte[] quelle = {72, 101, 108, 108, 111}; // "Hello" in ASCII
        try (var bais = new ByteArrayInputStream(quelle)) {
            int b;
            System.out.print("Gelesen: ");
            while ((b = bais.read()) != -1) {
                System.out.print((char) b);
            }
            System.out.println();
        }

        // Kombination: Daten kopieren
        byte[] original = "Java IO Streams".getBytes();
        try (var input = new ByteArrayInputStream(original);
             var output = new ByteArrayOutputStream()) {
            input.transferTo(output); // Seit Java 9
            System.out.println("Kopiert: " + output.toString());
        }
    }
}`,
      expectedOutput: 'Geschrieben: 10 Bytes\nInhalt: Hallo Welt\nGelesen: Hello\nKopiert: Java IO Streams',
      editable: true,
    },
    {
      title: 'PrintWriter und BufferedWriter',
      description: 'Komfortables Schreiben mit PrintWriter und gepuffertem Schreiben.',
      code: `import java.io.*;

public class Main {
    public static void main(String[] args) {
        // PrintWriter: Komfortables Schreiben mit println/printf
        var stringWriter = new StringWriter();
        try (var pw = new PrintWriter(stringWriter)) {
            pw.println("Zeile 1");
            pw.println("Zeile 2");
            pw.printf("Formatiert: %s hat %d Punkte%n", "Anna", 95);
        }
        System.out.println("PrintWriter-Ausgabe:");
        System.out.print(stringWriter.toString());

        // BufferedWriter: Gepuffertes Schreiben
        var sw2 = new StringWriter();
        try (var bw = new BufferedWriter(sw2)) {
            bw.write("Gepuffert Zeile 1");
            bw.newLine(); // Plattformunabhaengiger Zeilenumbruch
            bw.write("Gepuffert Zeile 2");
            bw.newLine();
            bw.flush(); // Puffer explizit leeren
        } catch (IOException e) {
            System.err.println("Fehler: " + e.getMessage());
        }
        System.out.println("\\nBufferedWriter-Ausgabe:");
        System.out.print(sw2.toString());
    }
}`,
      expectedOutput: 'PrintWriter-Ausgabe:\nZeile 1\nZeile 2\nFormatiert: Anna hat 95 Punkte\n\nBufferedWriter-Ausgabe:\nGepuffert Zeile 1\nGepuffert Zeile 2',
      editable: true,
    },
  ],
  quiz: [
    { id: 'io-q1', question: 'Was ist der Unterschied zwischen InputStream und Reader?', options: ['Kein Unterschied', 'InputStream liest Bytes, Reader liest Zeichen', 'Reader ist schneller', 'InputStream ist für Text'], correctIndex: 1, explanation: 'InputStream/OutputStream arbeiten mit Bytes (Binärdaten), Reader/Writer mit Zeichen (Text). Für Textdateien nutze Reader/Writer.' },
    { id: 'io-q2', question: 'Warum nutzt man try-with-resources für Streams?', options: ['Es ist kürzer', 'Streams werden automatisch geschlossen, auch bei Exceptions', 'Es ist schneller', 'Es ist optional'], correctIndex: 1, explanation: 'try-with-resources garantiert dass die Ressource geschlossen wird, auch wenn eine Exception auftritt. Ohne close() gibt es Ressourcen-Leaks.' },
    { id: 'io-q3', question: 'Warum verwendet man BufferedReader statt FileReader direkt?', options: ['BufferedReader kann mehr Dateiformate lesen', 'BufferedReader puffert Daten und ist dadurch deutlich performanter (weniger Festplattenzugriffe)', 'BufferedReader liest nur Zeichen statt Bytes', 'Es gibt keinen Vorteil'], correctIndex: 1, explanation: 'BufferedReader liest Daten in einem internen Puffer (Standard: 8 KB) statt jedes Zeichen einzeln von der Festplatte zu holen. Das reduziert die Anzahl der IO-Operationen drastisch und verbessert die Performance.' },
  ],
  exercises: [],
  keyConceptsDE: ['InputStream', 'OutputStream', 'Reader', 'Writer', 'BufferedReader', 'try-with-resources', 'Byte vs Zeichen'],
  transferKnowledge: 'IO-Streams gibt es überall: Python file objects, Node.js Streams, Go io.Reader/io.Writer. Das Konzept von gepufferten, schließbaren Datenströmen ist universal.',
  order: 44,
};
