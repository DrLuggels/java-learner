import type { Topic } from '../../../types';

export const javafx: Topic = {
  id: 'javafx',
  moduleId: 'frameworks',
  title: 'JavaFX',
  description: 'Stage, Scene, Controls (Button, Label, TextField), FXML, CSS-Styling und Event-Handler in JavaFX.',
  content: `# JavaFX — Moderne GUI-Entwicklung

**JavaFX** ist das moderne GUI-Framework fuer Java-Anwendungen. Es ersetzt Swing und bietet CSS-Styling, FXML-basierte Layouts und eine reichhaltige Komponentenbibliothek.

## Stage und Scene
Die **Stage** ist das Hauptfenster der Anwendung. Eine **Scene** enthaelt den Szenegraphen (Scene Graph) — einen Baum aus UI-Knoten (Nodes). Jede Stage zeigt genau eine Scene an, die zur Laufzeit gewechselt werden kann.

## Controls — GUI-Komponenten
JavaFX bietet zahlreiche Controls: \`Button\`, \`Label\`, \`TextField\`, \`TextArea\`, \`ComboBox\`, \`CheckBox\`, \`ListView\`, \`TableView\` und viele mehr. Alle erben von \`javafx.scene.Node\`.

## FXML — Deklarative Layouts
**FXML** ist ein XML-basiertes Format zur Beschreibung von Layouts. Es trennt die GUI-Struktur vom Java-Code. Ein \`FXMLLoader\` laedt die FXML-Datei und verbindet sie mit einem **Controller** per \`fx:controller\`-Attribut.

## CSS-Styling
JavaFX unterstuetzt **CSS** zur Gestaltung von Komponenten. Stile koennen inline, ueber StyleSheets oder per \`getStyleClass().add()\` angewendet werden. Alle CSS-Eigenschaften beginnen mit \`-fx-\` (z.B. \`-fx-background-color\`, \`-fx-font-size\`).

## Event-Handler
Events werden per \`setOnAction()\`, \`setOnMouseClicked()\` oder via FXML (\`onAction="#methode"\`) registriert. Lambdas machen die Event-Verarbeitung kompakt und lesbar.`,
  codeExamples: [
    {
      title: 'JavaFX-Anwendung: Stage, Scene, Controls',
      description: 'Eine einfache JavaFX-Anwendung mit Button, Label und TextField.',
      code: `import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class MeineApp extends Application {

    @Override
    public void start(Stage primaryStage) {
        // Controls erstellen
        Label begruessung = new Label("Willkommen bei JavaFX!");
        TextField nameField = new TextField();
        nameField.setPromptText("Dein Name eingeben...");
        Button button = new Button("Begruessen");
        Label ergebnis = new Label();

        // Event-Handler mit Lambda
        button.setOnAction(event -> {
            String name = nameField.getText();
            if (name.isEmpty()) {
                ergebnis.setText("Bitte einen Namen eingeben!");
            } else {
                ergebnis.setText("Hallo, " + name + "!");
            }
        });

        // Layout (VBox — vertikale Anordnung)
        VBox root = new VBox(10); // 10px Abstand
        root.setPadding(new Insets(20));
        root.setAlignment(Pos.CENTER);
        root.getChildren().addAll(begruessung, nameField, button, ergebnis);

        // Scene und Stage
        Scene scene = new Scene(root, 350, 250);
        primaryStage.setTitle("JavaFX Beispiel");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args); // Startet die JavaFX-Anwendung
    }
}`,
      expectedOutput: `// GUI-Anwendung wird gestartet:
// Fenster mit Titel "JavaFX Beispiel" (350x250)
// Enthaelt: Label, TextField, Button, Ergebnis-Label
// Bei Klick auf "Begruessen" wird der Name angezeigt`,
      editable: true
    },
    {
      title: 'FXML und CSS-Styling',
      description: 'FXML-Layout mit Controller und CSS-Styling.',
      code: `// === MeinController.java ===
import javafx.fxml.FXML;
import javafx.scene.control.*;

public class MeinController {

    @FXML private TextField eingabeField;
    @FXML private ListView<String> todoListe;
    @FXML private Label statusLabel;

    @FXML
    private void hinzufuegen() {
        String text = eingabeField.getText().trim();
        if (!text.isEmpty()) {
            todoListe.getItems().add(text);
            eingabeField.clear();
            statusLabel.setText("Aufgabe hinzugefuegt! (" +
                todoListe.getItems().size() + " Eintraege)");
        }
    }

    @FXML
    private void entfernen() {
        int selected = todoListe.getSelectionModel().getSelectedIndex();
        if (selected >= 0) {
            todoListe.getItems().remove(selected);
            statusLabel.setText("Aufgabe entfernt.");
        }
    }
}

/* === mein_layout.fxml ===
<?xml version="1.0" encoding="UTF-8"?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>

<VBox spacing="10" padding="20"
      fx:controller="MeinController"
      xmlns:fx="http://javafx.com/fxml"
      stylesheets="@style.css">

    <TextField fx:id="eingabeField" promptText="Neue Aufgabe..."/>
    <HBox spacing="10">
        <Button text="Hinzufuegen" onAction="#hinzufuegen"
                styleClass="btn-primary"/>
        <Button text="Entfernen" onAction="#entfernen"
                styleClass="btn-danger"/>
    </HBox>
    <ListView fx:id="todoListe"/>
    <Label fx:id="statusLabel" styleClass="status"/>
</VBox>
*/

/* === style.css ===
.btn-primary {
    -fx-background-color: #2196F3;
    -fx-text-fill: white;
    -fx-font-size: 14px;
    -fx-padding: 8 16;
}
.btn-danger {
    -fx-background-color: #f44336;
    -fx-text-fill: white;
    -fx-font-size: 14px;
}
.status {
    -fx-font-style: italic;
    -fx-text-fill: #666;
}
*/`,
      expectedOutput: `// FXML-basierte Todo-Anwendung:
// - TextField zum Eingeben neuer Aufgaben
// - "Hinzufuegen"- und "Entfernen"-Buttons (gestylt mit CSS)
// - ListView zeigt alle Aufgaben
// - StatusLabel zeigt Feedback`,
      editable: true
    },
    {
      title: 'TableView und ObservableList',
      description: 'Daten in einer Tabelle anzeigen mit JavaFX TableView.',
      code: `import javafx.application.Application;
import javafx.beans.property.*;
import javafx.collections.*;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class TabellenApp extends Application {

    // Datenmodell (braucht JavaFX Properties fuer TableView)
    public static class Produkt {
        private final StringProperty name;
        private final DoubleProperty preis;
        private final IntegerProperty bestand;

        public Produkt(String name, double preis, int bestand) {
            this.name = new SimpleStringProperty(name);
            this.preis = new SimpleDoubleProperty(preis);
            this.bestand = new SimpleIntegerProperty(bestand);
        }

        public String getName() { return name.get(); }
        public double getPreis() { return preis.get(); }
        public int getBestand() { return bestand.get(); }
    }

    @Override
    public void start(Stage stage) {
        // Daten als ObservableList (Aenderungen werden automatisch angezeigt)
        ObservableList<Produkt> daten = FXCollections.observableArrayList(
            new Produkt("Laptop", 999.99, 15),
            new Produkt("Maus", 29.99, 50),
            new Produkt("Tastatur", 79.99, 30)
        );

        // TableView mit Spalten
        TableView<Produkt> tabelle = new TableView<>(daten);

        TableColumn<Produkt, String> nameSpalte = new TableColumn<>("Name");
        nameSpalte.setCellValueFactory(new PropertyValueFactory<>("name"));

        TableColumn<Produkt, Double> preisSpalte = new TableColumn<>("Preis");
        preisSpalte.setCellValueFactory(new PropertyValueFactory<>("preis"));

        TableColumn<Produkt, Integer> bestandSpalte = new TableColumn<>("Bestand");
        bestandSpalte.setCellValueFactory(new PropertyValueFactory<>("bestand"));

        tabelle.getColumns().addAll(nameSpalte, preisSpalte, bestandSpalte);

        // Button zum Hinzufuegen
        Button btn = new Button("Produkt hinzufuegen");
        btn.setOnAction(e -> daten.add(new Produkt("Neues Produkt", 0.0, 0)));

        Scene scene = new Scene(new VBox(10, tabelle, btn), 400, 300);
        stage.setTitle("Produktverwaltung");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}`,
      expectedOutput: `// GUI-Anwendung wird gestartet:
// Fenster "Produktverwaltung" (400x300)
// Tabelle mit Spalten: Name | Preis | Bestand
// Zeilen: Laptop/999.99/15, Maus/29.99/50, Tastatur/79.99/30
// Button: "Produkt hinzufuegen" ergaenzt neue Zeile`,
      editable: true
    }
  ],
  quiz: [
    {
      id: 'javafx-q1',
      question: 'Was ist der Unterschied zwischen Stage und Scene in JavaFX?',
      options: [
        'Stage ist der Inhalt, Scene ist das Fenster',
        'Stage ist das Fenster, Scene enthaelt den Szenegraphen mit UI-Elementen',
        'Stage und Scene sind identisch',
        'Scene wird nur fuer FXML verwendet'
      ],
      correctIndex: 1,
      explanation: 'Die Stage repraesentiert das Betriebssystem-Fenster. Die Scene enthaelt den Szenegraphen — den Baum aus UI-Nodes (Buttons, Labels, etc.). Eine Stage zeigt jeweils eine Scene an.'
    },
    {
      id: 'javafx-q2',
      question: 'Wie beginnen alle JavaFX-spezifischen CSS-Eigenschaften?',
      options: [
        'Mit jfx-',
        'Mit fx-',
        'Mit -fx-',
        'Mit java-'
      ],
      correctIndex: 2,
      explanation: 'Alle JavaFX-CSS-Eigenschaften beginnen mit dem Praefix -fx- (z.B. -fx-background-color, -fx-font-size, -fx-text-fill), um sie von Standard-CSS-Eigenschaften zu unterscheiden.'
    },
    {
      id: 'javafx-q3',
      question: 'Was ist der Vorteil von FXML gegenueber reinem Java-Code fuer die GUI?',
      options: [
        'FXML ist schneller zur Laufzeit',
        'FXML trennt die GUI-Struktur vom Java-Code (Separation of Concerns)',
        'FXML braucht keinen Controller',
        'FXML funktioniert nur mit CSS',
      ],
      correctIndex: 1,
      explanation: 'FXML trennt die UI-Beschreibung (XML) vom Verhalten (Java-Controller). Das verbessert die Wartbarkeit, ermoeglicht Arbeitsteilung (Designer arbeiten an FXML/CSS, Entwickler am Code) und erlaubt die Nutzung von visuellen Editoren wie Scene Builder.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Stage = Fenster, Scene = Inhalt mit Szenegraph',
    'Controls: Button, Label, TextField, ListView, TableView',
    'FXML: Deklarative UI-Beschreibung, getrennt vom Java-Code',
    'CSS-Styling mit -fx-Praefix fuer JavaFX-Eigenschaften',
    'Event-Handler: setOnAction() mit Lambda oder FXML-Binding'
  ],
  transferKnowledge: 'JavaFX-Konzepte aehneln modernen Web-Frameworks: FXML entspricht HTML-Templates, CSS-Styling funktioniert analog zu Web-CSS, und das Event-Handling gleicht DOM-Events. Das MVC-Muster (Controller in FXML) findet sich auch in Angular und React. Das Verstaendnis von Scene Graphs hilft bei 3D-Grafik und Game-Engines.',
  order: 49
};
