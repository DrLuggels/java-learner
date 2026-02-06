import type { Topic } from '../../../types';

export const gui: Topic = {
  id: 'gui',
  moduleId: 'frameworks',
  title: 'GUI-Grundlagen',
  description: 'Event-Handling, das MVC-Pattern, GUI-Konzepte und Layout-Manager.',
  content: `# GUI-Grundlagen in Java

Eine **GUI** (Graphical User Interface) ermoeglicht die Interaktion zwischen Benutzer und Programm ueber grafische Elemente wie Buttons, Textfelder und Menues.

## Event-Handling
GUI-Anwendungen sind **ereignisgesteuert**. Ein **Event** (Ereignis) wird ausgeloest, wenn der Benutzer eine Aktion ausfuehrt (Klick, Tastendruck). Ein **Event-Handler** (Listener) reagiert darauf. In Java werden Events ueber das **Observer-Pattern** verarbeitet: Man registriert einen Listener an einer Komponente.

## Das MVC-Pattern
Das **Model-View-Controller**-Pattern trennt die Anwendung in drei Schichten:
- **Model**: Daten und Geschaeftslogik (unabhaengig von der GUI).
- **View**: Darstellung der Daten (die grafische Oberflaeche).
- **Controller**: Vermittler — nimmt Benutzereingaben entgegen und aktualisiert Model und View.

Diese Trennung ermoeglicht **Testbarkeit**, **Wartbarkeit** und **Wiederverwendbarkeit**.

## Layout-Manager
Ein **Layout-Manager** steuert die Anordnung von Komponenten im Fenster. Statt pixelgenauer Positionierung passen sich Layouts dynamisch an die Fenstergroesse an. Typische Layouts: **BorderLayout** (Norden/Sueden/Osten/Westen/Mitte), **FlowLayout** (Zeile fuer Zeile), **GridLayout** (Raster), **VBox/HBox** (vertikal/horizontal in JavaFX).

## Wichtige Konzepte
GUI-Code laeuft im **UI-Thread**. Langwierige Operationen muessen in Hintergrund-Threads ausgelagert werden, um die Oberflaeche responsiv zu halten.`,
  codeExamples: [
    {
      title: 'MVC-Pattern als Konsolenbeispiel',
      description: 'Das MVC-Muster demonstriert ohne GUI-Abhaengigkeit.',
      code: `import java.util.ArrayList;
import java.util.List;

public class MVCBeispiel {

    // MODEL — Daten und Logik
    static class TodoModel {
        private final List<String> aufgaben = new ArrayList<>();

        void hinzufuegen(String aufgabe) { aufgaben.add(aufgabe); }
        void entfernen(int index) { aufgaben.remove(index); }
        List<String> getAufgaben() { return List.copyOf(aufgaben); }
        int getAnzahl() { return aufgaben.size(); }
    }

    // VIEW — Darstellung (hier: Konsole)
    static class TodoView {
        void anzeigen(List<String> aufgaben) {
            System.out.println("=== Todo-Liste ===");
            if (aufgaben.isEmpty()) {
                System.out.println("(keine Aufgaben)");
            } else {
                for (int i = 0; i < aufgaben.size(); i++) {
                    System.out.println((i + 1) + ". " + aufgaben.get(i));
                }
            }
            System.out.println("==================");
        }
    }

    // CONTROLLER — Vermittler
    static class TodoController {
        private final TodoModel model;
        private final TodoView view;

        TodoController(TodoModel model, TodoView view) {
            this.model = model;
            this.view = view;
        }

        void aufgabeHinzufuegen(String aufgabe) {
            model.hinzufuegen(aufgabe);
            view.anzeigen(model.getAufgaben());
        }

        void aufgabeErledigt(int index) {
            model.entfernen(index);
            view.anzeigen(model.getAufgaben());
        }
    }

    public static void main(String[] args) {
        var model = new TodoModel();
        var view = new TodoView();
        var controller = new TodoController(model, view);

        controller.aufgabeHinzufuegen("Java lernen");
        controller.aufgabeHinzufuegen("Unit-Tests schreiben");
        controller.aufgabeHinzufuegen("Projekt abgeben");
        controller.aufgabeErledigt(0); // "Java lernen" erledigt
    }
}`,
      expectedOutput: `=== Todo-Liste ===
1. Java lernen
==================
=== Todo-Liste ===
1. Java lernen
2. Unit-Tests schreiben
==================
=== Todo-Liste ===
1. Java lernen
2. Unit-Tests schreiben
3. Projekt abgeben
==================
=== Todo-Liste ===
1. Unit-Tests schreiben
2. Projekt abgeben
==================`,
      editable: true
    },
    {
      title: 'Event-Handling mit Listener-Pattern',
      description: 'Das Observer/Listener-Pattern als Grundlage fuer GUI-Events.',
      code: `import java.util.ArrayList;
import java.util.List;

public class EventHandlingBeispiel {

    // Event-Klasse
    record ButtonEvent(String quelle, String aktion) {}

    // Listener-Interface (wie ActionListener in Swing)
    interface ButtonListener {
        void onKlick(ButtonEvent event);
    }

    // Button-Simulation
    static class MeinButton {
        private final String name;
        private final List<ButtonListener> listeners = new ArrayList<>();

        MeinButton(String name) { this.name = name; }

        void addListener(ButtonListener listener) {
            listeners.add(listener);
        }

        void klicken() {
            System.out.println("[" + name + "] wurde geklickt!");
            ButtonEvent event = new ButtonEvent(name, "KLICK");
            for (ButtonListener l : listeners) {
                l.onKlick(event);
            }
        }
    }

    public static void main(String[] args) {
        MeinButton speichern = new MeinButton("Speichern");
        MeinButton abbrechen = new MeinButton("Abbrechen");

        // Listener mit Lambda registrieren
        speichern.addListener(e ->
            System.out.println("  -> Daten werden gespeichert! (Quelle: " + e.quelle() + ")")
        );

        speichern.addListener(e ->
            System.out.println("  -> Statusleiste aktualisiert.")
        );

        abbrechen.addListener(e ->
            System.out.println("  -> Vorgang abgebrochen.")
        );

        // Events ausloesen
        speichern.klicken();
        System.out.println();
        abbrechen.klicken();
    }
}`,
      expectedOutput: `[Speichern] wurde geklickt!
  -> Daten werden gespeichert! (Quelle: Speichern)
  -> Statusleiste aktualisiert.

[Abbrechen] wurde geklickt!
  -> Vorgang abgebrochen.`,
      editable: true
    },
    {
      title: 'Layout-Manager als Konsolen-Simulation',
      description: 'Verschiedene Layout-Strategien und deren Verhalten konzeptuell dargestellt.',
      code: `import java.util.*;

public class LayoutBeispiel {

    // Simulation verschiedener Layout-Strategien
    interface Layout {
        void anordnen(List<String> komponenten, int breite);
    }

    // FlowLayout: Elemente nebeneinander, Umbruch bei Zeilenende
    static class FlowLayout implements Layout {
        public void anordnen(List<String> komp, int breite) {
            System.out.println("=== FlowLayout ===");
            int pos = 0;
            StringBuilder zeile = new StringBuilder("| ");
            for (String k : komp) {
                if (pos + k.length() > breite) {
                    System.out.println(zeile + "|");
                    zeile = new StringBuilder("| ");
                    pos = 0;
                }
                zeile.append("[").append(k).append("] ");
                pos += k.length() + 3;
            }
            System.out.println(zeile + "|");
        }
    }

    // BorderLayout: 5 Bereiche (N, S, W, O, Center)
    static class BorderLayout implements Layout {
        public void anordnen(List<String> komp, int breite) {
            System.out.println("=== BorderLayout ===");
            String[] positionen = {"NORTH", "WEST", "CENTER", "EAST", "SOUTH"};
            for (int i = 0; i < Math.min(komp.size(), positionen.length); i++) {
                System.out.printf("  %-8s -> [%s]%n", positionen[i], komp.get(i));
            }
        }
    }

    public static void main(String[] args) {
        List<String> buttons = List.of("Speichern", "Laden", "Neu", "Beenden");

        new FlowLayout().anordnen(buttons, 25);
        System.out.println();
        new BorderLayout().anordnen(
            List.of("Menue", "Navigation", "Inhalt", "Details", "Statusleiste"),
            40);
    }
}`,
      expectedOutput: `=== FlowLayout ===
| [Speichern] [Laden] |
| [Neu] [Beenden] |

=== BorderLayout ===
  NORTH    -> [Menue]
  WEST     -> [Navigation]
  CENTER   -> [Inhalt]
  EAST     -> [Details]
  SOUTH    -> [Statusleiste]`,
      editable: true
    }
  ],
  quiz: [
    {
      id: 'gui-q1',
      question: 'Welche Aufgabe hat der Controller im MVC-Pattern?',
      options: [
        'Er speichert die Daten in einer Datenbank',
        'Er stellt die grafische Oberflaeche dar',
        'Er vermittelt zwischen Model und View',
        'Er verwaltet die Netzwerkverbindungen'
      ],
      correctIndex: 2,
      explanation: 'Der Controller nimmt Benutzereingaben entgegen, aktualisiert das Model und sorgt dafuer, dass die View die neuen Daten anzeigt. Er ist der Vermittler zwischen Datenlogik und Darstellung.'
    },
    {
      id: 'gui-q2',
      question: 'Was ist ein Layout-Manager?',
      options: [
        'Ein Werkzeug zum Zeichnen von Grafiken',
        'Eine Komponente, die die Anordnung von GUI-Elementen steuert',
        'Ein Algorithmus zum Sortieren von Fenstern',
        'Ein Manager fuer Datenbankverbindungen'
      ],
      correctIndex: 1,
      explanation: 'Ein Layout-Manager bestimmt automatisch, wie GUI-Komponenten im Fenster angeordnet werden. Statt fester Pixel-Positionen passt sich das Layout dynamisch an die Fenstergroesse an.'
    },
    {
      id: 'gui-q3',
      question: 'Warum duerfen langwierige Operationen nicht im UI-Thread ausgefuehrt werden?',
      options: [
        'Der UI-Thread hat keinen Zugriff auf das Netzwerk',
        'Die Oberflaeche wuerde einfrieren und nicht mehr reagieren',
        'Langwierige Operationen sind in Java verboten',
        'Es wuerde eine Exception geworfen',
      ],
      correctIndex: 1,
      explanation: 'Der UI-Thread zeichnet die Oberflaeche und verarbeitet Events. Wenn er mit einer langen Berechnung blockiert ist, reagiert die GUI nicht mehr auf Klicks oder Eingaben -- die Anwendung "friert ein". Daher muessen lange Operationen in Hintergrund-Threads ausgefuehrt werden.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Event-Handling: Ereignisgesteuerte Programmierung mit Listenern',
    'MVC: Model (Daten), View (Darstellung), Controller (Vermittler)',
    'Layout-Manager: BorderLayout, FlowLayout, GridLayout, VBox/HBox',
    'Observer-Pattern: Listener registrieren und auf Events reagieren',
    'UI-Thread: GUI-Code im Hauptthread, lange Aufgaben im Hintergrund'
  ],
  transferKnowledge: 'Das MVC-Pattern ist nicht auf GUIs beschraenkt — es ist das Grundprinzip moderner Webanwendungen (Spring MVC, Angular, React). Event-Handling findet sich ueberall: von GUI-Buttons ueber Message-Queues bis zu Webhooks. Layout-Konzepte entsprechen CSS Flexbox/Grid im Web.',
  order: 48
};
