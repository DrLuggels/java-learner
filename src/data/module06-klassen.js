export const theory = [
  {
    title: 'Klasse vs. Objekt',
    content: 'Eine Klasse ist ein Bauplan (Template), ein Objekt ist eine konkrete Instanz dieser Klasse. Aus einer Klasse können beliebig viele Objekte erstellt werden.',
    code: 'public class Auto {\n    String marke;\n}\nAuto a1 = new Auto(); // Objekt/Instanz\nAuto a2 = new Auto(); // weiteres Objekt'
  },
  {
    title: 'Attribute und Methoden',
    content: 'Attribute (Instanzvariablen) speichern den Zustand eines Objekts und sollten private sein. Methoden definieren das Verhalten und sind typischerweise public. Das nennt man Kapselung (Encapsulation).',
    code: 'public class Person {\n    private String name;\n    public String getName() { return name; }\n    public void setName(String name) {\n        this.name = name;\n    }\n}'
  },
  {
    title: 'Konstruktoren und Überladung',
    content: 'Konstruktoren initialisieren Objekte. Sie haben den gleichen Namen wie die Klasse und keinen Rückgabetyp. Überladung: mehrere Konstruktoren mit verschiedenen Parameterlisten. Ohne eigenen Konstruktor erzeugt Java einen Default-Konstruktor.',
    code: 'public class Person {\n    private String name;\n    public Person() { this.name = "Unbekannt"; }\n    public Person(String name) { this.name = name; }\n}'
  },
  {
    title: 'Konstruktor-Verkettung mit this()',
    content: 'Mit this() kann ein Konstruktor einen anderen Konstruktor derselben Klasse aufrufen. this() muss die erste Anweisung im Konstruktor sein.',
    code: 'public Person() {\n    this("Unbekannt"); // ruft Person(String) auf\n}\npublic Person(String name) {\n    this.name = name;\n}'
  },
  {
    title: 'Sichtbarkeiten',
    content: 'public: überall sichtbar. private: nur innerhalb der Klasse. protected: Unterklassen und gleiches Paket. package-private (kein Modifier): nur im gleichen Paket. UML: + = public, - = private, # = protected, ~ = package-private.'
  },
  {
    title: 'static Attribute und Methoden',
    content: 'static-Mitglieder gehören zur Klasse, nicht zu einzelnen Objekten. Sie werden über den Klassennamen aufgerufen und zwischen allen Instanzen geteilt. Statische Methoden können nicht auf Instanz-Attribute zugreifen.',
    code: 'public class Auto {\n    private static int anzahl = 0;\n    public Auto() { anzahl++; }\n    public static int getAnzahl() {\n        return anzahl;\n    }\n}'
  },
  {
    title: 'Static ArrayList Pattern (Klausurrelevant!)',
    content: 'Ein häufiges Muster: Eine statische ArrayList speichert alle erstellten Instanzen. Im Konstruktor wird this zur Liste hinzugefügt.',
    code: 'public class Vehicle {\n    private static ArrayList<Vehicle> allVehicles = new ArrayList<>();\n    public Vehicle() {\n        allVehicles.add(this);\n    }\n    public static ArrayList<Vehicle> getAll() {\n        return allVehicles;\n    }\n}'
  },
  {
    title: 'toString() und equals()',
    content: 'toString() liefert eine String-Repräsentation des Objekts. equals() vergleicht den Inhalt zweier Objekte. Beide Methoden werden von Object geerbt und sollten überschrieben werden.',
    code: '@Override\npublic String toString() {\n    return "Person{name=" + name + "}";\n}'
  }
];

export const questions = [
  { id: 'm6q1', type: 'mc', question: 'Was ist der Unterschied zwischen einer Klasse und einem Objekt?', options: ['Kein Unterschied', 'Klasse = Bauplan, Objekt = konkrete Instanz', 'Objekt = Bauplan, Klasse = Instanz', 'Klasse ist eine Methode'], answer: 'Klasse = Bauplan, Objekt = konkrete Instanz', explanation: 'Eine Klasse definiert die Struktur (Bauplan), ein Objekt ist eine konkrete Ausprägung (Instanz) davon.' },
  { id: 'm6q2', type: 'mc', question: 'Was macht das Schlüsselwort this?', options: ['Erstellt ein neues Objekt', 'Referenziert die Elternklasse', 'Referenziert das aktuelle Objekt', 'Beendet die Methode'], answer: 'Referenziert das aktuelle Objekt', explanation: 'this ist eine Referenz auf das aktuelle Objekt, in dem der Code ausgeführt wird.' },
  { id: 'm6q3', type: 'mc', question: 'Was ist ein Konstruktor?', options: ['Eine normale Methode', 'Eine spezielle Methode zur Objekterstellung und Initialisierung', 'Ein Datentyp', 'Eine statische Variable'], answer: 'Eine spezielle Methode zur Objekterstellung und Initialisierung', explanation: 'Ein Konstruktor hat denselben Namen wie die Klasse, keinen Rückgabetyp und wird bei new aufgerufen.' },
  { id: 'm6q4', type: 'mc', question: 'Was passiert, wenn keine Konstruktoren definiert werden?', options: ['Compilerfehler', 'Java erstellt einen Default-Konstruktor', 'Die Klasse kann nicht instanziiert werden', 'Es wird null zurückgegeben'], answer: 'Java erstellt einen Default-Konstruktor', explanation: 'Wenn kein Konstruktor definiert ist, erzeugt der Compiler automatisch einen parameterlosen Default-Konstruktor.' },
  { id: 'm6q5', type: 'mc', question: 'Was bedeutet der Zugriffsmodifier private?', options: ['Überall sichtbar', 'Nur innerhalb der Klasse sichtbar', 'Nur im gleichen Paket sichtbar', 'Nur für Unterklassen sichtbar'], answer: 'Nur innerhalb der Klasse sichtbar', explanation: 'private beschränkt den Zugriff auf die Klasse selbst. Kein Zugriff von außen möglich.' },
  { id: 'm6q6', type: 'mc', question: 'Was bedeutet das Schlüsselwort static?', options: ['Das Mitglied ist unveränderlich', 'Das Mitglied gehört zur Klasse, nicht zu Instanzen', 'Das Mitglied ist privat', 'Das Mitglied wird automatisch gelöscht'], answer: 'Das Mitglied gehört zur Klasse, nicht zu Instanzen', explanation: 'static-Mitglieder existieren unabhängig von Objekten und gehören zur Klasse selbst.' },
  { id: 'm6q7', type: 'mc', question: 'Warum verwendet man Getter und Setter?', options: ['Weil Java das vorschreibt', 'Für Kapselung und kontrollierte Datenzugriffe', 'Um Code länger zu machen', 'Für bessere Performance'], answer: 'Für Kapselung und kontrollierte Datenzugriffe', explanation: 'Getter/Setter ermöglichen Kapselung: Attribute sind private, der Zugriff erfolgt kontrolliert mit Validierungsmöglichkeit.' },
  { id: 'm6q8', type: 'mc', question: 'Ein static-Attribut wird geteilt zwischen...?', options: ['Nur dem ersten Objekt', 'Allen Instanzen der Klasse', 'Keinem Objekt', 'Nur Unterklassen'], answer: 'Allen Instanzen der Klasse', explanation: 'Statische Attribute existieren nur einmal pro Klasse und werden von allen Instanzen gemeinsam genutzt.' },
  { id: 'm6q9', type: 'mc', question: 'Was macht die Methode toString()?', options: ['Konvertiert String zu int', 'Liefert eine String-Repräsentation des Objekts', 'Löscht das Objekt', 'Vergleicht zwei Strings'], answer: 'Liefert eine String-Repräsentation des Objekts', explanation: 'toString() wird aufgerufen, wenn ein Objekt als String benötigt wird, z.B. bei System.out.println().' },
  { id: 'm6q10', type: 'mc', question: 'Was ist Konstruktor-Überladung?', options: ['Ein Konstruktor mit return-Wert', 'Mehrere Konstruktoren mit verschiedenen Parameterlisten', 'Ein Konstruktor ohne Parameter', 'Vererbung von Konstruktoren'], answer: 'Mehrere Konstruktoren mit verschiedenen Parameterlisten', explanation: 'Überladung bedeutet, dass eine Klasse mehrere Konstruktoren mit unterschiedlichen Parametern haben kann.' },
  { id: 'm6q11', type: 'truefalse', question: 'Ein Konstruktor kann private sein.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Private Konstruktoren sind möglich, z.B. beim Singleton-Pattern, um die Objekterstellung zu kontrollieren.' },
  { id: 'm6q12', type: 'truefalse', question: 'this() muss die erste Anweisung im Konstruktor sein.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Ein this()-Aufruf zur Konstruktor-Verkettung muss immer die allererste Anweisung im Konstruktor sein.' },
  { id: 'm6q13', type: 'mc', question: 'Was bewirkt allVehicles.add(this) im Konstruktor des Static ArrayList Patterns?', options: ['Erstellt eine Kopie des Objekts', 'Fügt die aktuelle Instanz zur statischen Liste hinzu', 'Löscht das Objekt aus der Liste', 'Erstellt eine neue ArrayList'], answer: 'Fügt die aktuelle Instanz zur statischen Liste hinzu', explanation: 'this referenziert das gerade erstellte Objekt, das zur statischen Liste aller Instanzen hinzugefügt wird.' },
  { id: 'm6q14', type: 'truefalse', question: 'Eine statische Methode kann direkt auf Instanz-Attribute zugreifen.', options: ['Wahr', 'Falsch'], answer: 'Falsch', explanation: 'Statische Methoden haben kein this und können daher nicht direkt auf Instanz-Attribute zugreifen.' },
  { id: 'm6q15', type: 'mc', question: 'Was bedeutet package-private (Standard-Sichtbarkeit)?', options: ['Wie public', 'Wie private', 'Zugriff nur im gleichen Paket, kein Modifier nötig', 'Zugriff nur für Unterklassen'], answer: 'Zugriff nur im gleichen Paket, kein Modifier nötig', explanation: 'Ohne Modifier ist ein Mitglied package-private: sichtbar für alle Klassen im gleichen Paket.' },
  { id: 'm6q16', type: 'mc', question: 'Der Modifier protected erlaubt Zugriff für...?', options: ['Nur die eigene Klasse', 'Alle Klassen', 'Unterklassen und Klassen im selben Paket', 'Nur Klassen im selben Paket'], answer: 'Unterklassen und Klassen im selben Paket', explanation: 'protected erlaubt Zugriff aus Unterklassen (auch in anderen Paketen) und aus dem gleichen Paket.' },
  { id: 'm6q17', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'public class Person {\n    private String name;\n    public Person(String name) { this.name = name; }\n    public String getName() { return name; }\n}\n// Aufruf:\nSystem.out.println(new Person("Max").getName());', options: ['null', 'Person', 'Max', 'Compilerfehler'], answer: 'Max', explanation: 'Der Konstruktor setzt name auf "Max". getName() gibt diesen Wert zurück.' },
  { id: 'm6q18', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'public class Zaehler {\n    private static int count = 0;\n    public Zaehler() { count++; }\n    public static int getCount() { return count; }\n}\nnew Zaehler(); new Zaehler(); new Zaehler();\nSystem.out.println(Zaehler.getCount());', options: ['0', '1', '2', '3'], answer: '3', explanation: 'count ist statisch und wird bei jedem new Zaehler() um 1 erhöht. Nach 3 Instanzen ist count = 3.' },
  { id: 'm6q19', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'public class Box {\n    private int wert;\n    public Box() { this(42); }\n    public Box(int w) { this.wert = w; }\n    public int getWert() { return wert; }\n}\nSystem.out.println(new Box().getWert());', options: ['0', '42', 'null', 'Compilerfehler'], answer: '42', explanation: 'Der parameterlose Konstruktor ruft this(42) auf, was den Konstruktor Box(int) mit wert=42 aufruft.' },
  { id: 'm6q20', type: 'truefalse', question: 'In UML steht + für public, - für private und # für protected.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'UML-Notation: + = public, - = private, # = protected, ~ = package-private.' }
];
