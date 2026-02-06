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
    }
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
